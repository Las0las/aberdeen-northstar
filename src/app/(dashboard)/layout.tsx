// Server-side dashboard layout. Middleware already redirects unauthenticated
// requests to /login, so by the time this renders we either have a real
// Supabase user or dev-bypass is on. We resolve the display email server-side
// and hand off to a client shell for interactive sidebar behavior.

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import DashboardShell from './DashboardShell';

function isDevBypassEnabled(): boolean {
  return (
    process.env.NODE_ENV !== 'production' &&
    process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS === 'true'
  );
}

async function resolveUserEmail(): Promise<string | null> {
  if (isDevBypassEnabled()) {
    return process.env.NEXT_PUBLIC_DEV_USER_EMAIL || 'dev@localhost';
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) return null;

  const cookieStore = await cookies();
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      // Layout is read-only — these are no-ops, present only to satisfy the type.
      set(_name: string, _value: string, _options: CookieOptions) {},
      remove(_name: string, _options: CookieOptions) {},
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  return user?.email ?? null;
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDevMode = isDevBypassEnabled();
  const userEmail = await resolveUserEmail();

  // Defense in depth: middleware should have redirected already, but if it
  // didn't run (e.g. matcher edge case), enforce the redirect server-side.
  if (!isDevMode && !userEmail) {
    redirect('/login');
  }

  return (
    <DashboardShell userEmail={userEmail} isDevMode={isDevMode}>
      {children}
    </DashboardShell>
  );
}
