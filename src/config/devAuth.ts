/**
 * Development Auth Bypass Configuration
 * 
 * ONLY active when:
 * - NODE_ENV === 'development'
 * - NEXT_PUBLIC_DEV_AUTH_BYPASS === 'true'
 * 
 * Production builds will ALWAYS use real Supabase auth.
 */

export interface DevSession {
  userId: string;
  email: string;
  organizationId: string;
}

/**
 * Check if dev bypass mode is enabled
 * Only works in development with explicit env flag
 */
export function isDevBypassEnabled(): boolean {
  if (typeof window !== 'undefined') {
    // Client-side check
    return (
      process.env.NODE_ENV === 'development' &&
      process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS === 'true'
    );
  }
  // Server-side check
  return (
    process.env.NODE_ENV === 'development' &&
    process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS === 'true'
  );
}

/**
 * Get the dev session when bypass is enabled
 * Returns null if bypass is not enabled
 */
export function getDevSession(): DevSession | null {
  if (!isDevBypassEnabled()) {
    return null;
  }

  const userId = process.env.NEXT_PUBLIC_DEV_USER_ID || '00000000-0000-0000-0000-000000000001';
  const email = process.env.NEXT_PUBLIC_DEV_USER_EMAIL || 'dev@localhost';
  const organizationId = process.env.NEXT_PUBLIC_DEV_ORGANIZATION_ID || '00000000-0000-0000-0000-000000000001';

  return {
    userId,
    email,
    organizationId,
  };
}

/**
 * Get organization ID - works in both dev bypass and production
 */
export function getDevOrganizationId(): string | null {
  const session = getDevSession();
  return session?.organizationId || null;
}
