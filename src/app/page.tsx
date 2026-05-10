'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { isDevBypassEnabled } from '@/config/devAuth';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      // Dev bypass mode - go straight to dashboard
      if (isDevBypassEnabled()) {
        router.push('/dashboard');
        return;
      }

      // Normal auth check
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    };
    checkAuth();
  }, [router]);

  return (
    <div
      className="flex min-h-screen items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="animate-pulse text-muted-foreground">Loading...</div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
