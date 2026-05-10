// Auth middleware: refreshes the Supabase session on every request and
// forwards verified identity to server code via REQUEST headers that
// src/server/orgScope.ts:requireOrgContext consumes.
//
// IMPORTANT: response.headers are visible to clients, but request.headers
// (re-set via NextResponse.next({ request: { headers } })) flow into Server
// Components and API routes. We use the request-headers path so identity
// cannot be spoofed by a client setting its own X-Verified-* headers.

import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

const PUBLIC_PATHS = [
  '/login',
  '/auth/callback',
];

function isPublic(pathname: string): boolean {
  if (PUBLIC_PATHS.includes(pathname)) return true;
  if (pathname.startsWith('/_next')) return true;
  if (pathname.startsWith('/favicon')) return true;
  if (pathname === '/') return true;
  return false;
}

function isDevBypass(): boolean {
  return (
    process.env.NODE_ENV !== 'production' &&
    process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS === 'true'
  );
}

export async function middleware(request: NextRequest) {
  // Strip any client-supplied X-Verified-* to prevent identity spoofing.
  // Only THIS middleware is allowed to set those headers.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.delete('x-verified-organization-id');
  requestHeaders.delete('x-verified-user-id');

  // Dev bypass: requireOrgContext handles this directly via env vars.
  // Skip Supabase calls entirely so dev works without a real project.
  if (isDevBypass()) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  let response = NextResponse.next({ request: { headers: requestHeaders } });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If env is unset (e.g. in placeholder local builds), fall through.
  // The downstream API routes will reject with 401 from requireOrgContext.
  if (!supabaseUrl || !supabaseAnonKey) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        // Update both the inbound request (so getUser sees the refresh)
        // and the outbound response (so the browser persists rotation).
        request.cookies.set({ name, value, ...options });
        response = NextResponse.next({ request: { headers: requestHeaders } });
        response.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({ name, value: '', ...options });
        response = NextResponse.next({ request: { headers: requestHeaders } });
        response.cookies.set({ name, value: '', ...options });
      },
    },
  });

  // getUser() validates the JWT against Supabase auth — getSession() does not.
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    const orgId =
      (user.user_metadata?.organization_id as string | undefined) ??
      (user.app_metadata?.organization_id as string | undefined);

    if (orgId) {
      requestHeaders.set('x-verified-organization-id', orgId);
      requestHeaders.set('x-verified-user-id', user.id);
      response = NextResponse.next({ request: { headers: requestHeaders } });
    }
  }

  // Protect dashboard + api routes when unauthenticated.
  const { pathname } = request.nextUrl;
  if (!user && !isPublic(pathname)) {
    if (pathname.startsWith('/api/')) {
      // Let the API route return its standard 401 envelope.
      return response;
    }
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  // Run on everything except static assets and Next internals.
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
