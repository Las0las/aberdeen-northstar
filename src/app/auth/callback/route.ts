// Supabase magic-link OTP callback: exchanges the auth `code` for a session
// and writes Supabase's session cookies to the response. After this completes
// the middleware will see an authenticated user on subsequent requests.

import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const redirectTo = searchParams.get('redirect') || '/dashboard';

  // Default landing if no code or exchange fails — back to login with reason.
  const failureUrl = new URL('/login', origin);

  if (!code) {
    failureUrl.searchParams.set('error', 'missing_code');
    return NextResponse.redirect(failureUrl);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    failureUrl.searchParams.set('error', 'auth_unconfigured');
    return NextResponse.redirect(failureUrl);
  }

  // Build the success response up front so the cookie setters can mutate it.
  let response = NextResponse.redirect(new URL(redirectTo, origin));

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        response.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        response.cookies.set({ name, value: '', ...options });
      },
    },
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    failureUrl.searchParams.set('error', 'exchange_failed');
    return NextResponse.redirect(failureUrl);
  }

  return response;
}
