// Server-side Organization Scope Enforcement (HARDENED)
// NEVER accepts organization_id from client input (query/body)
// Only derives org from server-side context

import { cookies, headers } from 'next/headers';

// Dev bypass check (server-side env)
// CRITICAL: must require BOTH the explicit flag AND non-production NODE_ENV.
// In production, the misconfigured flag must NEVER grant access — fail closed.
function isDevBypassEnabled(): boolean {
  if (process.env.NODE_ENV === 'production') {
    if (process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS === 'true') {
      // Visible boot-time signal that the flag is being ignored.
      console.error(
        '[security] NEXT_PUBLIC_DEV_AUTH_BYPASS=true ignored in production build'
      );
    }
    return false;
  }
  return process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS === 'true';
}

// Context returned by requireOrgContext
export interface OrgContext {
  organizationId: string;
  actorUserId: string;
}

/**
 * Require organization context from server-side sources ONLY.
 * NEVER reads org from query params or request body.
 * Returns 401-style error if context unavailable.
 */
export async function requireOrgContext(): Promise<OrgContext | null> {
  // DEV BYPASS MODE (local development only)
  if (isDevBypassEnabled()) {
    const devOrgId = process.env.NEXT_PUBLIC_DEV_ORGANIZATION_ID;
    const devUserId = process.env.NEXT_PUBLIC_DEV_USER_ID;
    
    if (devOrgId && devUserId) {
      return {
        organizationId: devOrgId,
        actorUserId: devUserId,
      };
    }
  }

  // PRODUCTION: Read from server-managed cookies/headers set by auth middleware
  // These are set by the auth system, NOT by client requests
  const headersList = await headers();
  const cookieStore = await cookies();

  // Try headers first (set by server middleware after auth verification)
  const orgIdHeader = headersList.get('x-verified-organization-id');
  const userIdHeader = headersList.get('x-verified-user-id');

  if (orgIdHeader && userIdHeader) {
    return {
      organizationId: orgIdHeader,
      actorUserId: userIdHeader,
    };
  }

  // Fallback to secure cookies (httpOnly, set by auth system)
  const orgIdCookie = cookieStore.get('organization_id');
  const userIdCookie = cookieStore.get('user_id');

  if (orgIdCookie?.value && userIdCookie?.value) {
    return {
      organizationId: orgIdCookie.value,
      actorUserId: userIdCookie.value,
    };
  }

  // No valid context available
  return null;
}

/**
 * Legacy compatibility: get org ID only
 */
export async function getServerOrgId(): Promise<string | null> {
  const ctx = await requireOrgContext();
  return ctx?.organizationId || null;
}

/**
 * Legacy compatibility: get user ID only
 */
export async function getServerUserId(): Promise<string | null> {
  const ctx = await requireOrgContext();
  return ctx?.actorUserId || null;
}

/**
 * Assert that a record's organization_id matches the expected org.
 * Throws on mismatch to prevent cross-tenant data access.
 */
export function assertOrgScope(recordOrgId: string | null | undefined, expectedOrgId: string): void {
  if (!recordOrgId) {
    throw new Error('Record has no organization_id');
  }
  if (recordOrgId !== expectedOrgId) {
    throw new Error('Organization scope violation - access denied');
  }
}

// Standard API response envelope
export interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: string;
  };
  meta?: Record<string, unknown>;
}

export function successResponse<T>(data: T, meta?: Record<string, unknown>): ApiResponse<T> {
  return { ok: true, data, ...(meta ? { meta } : {}) };
}

export function errorResponse(code: string, message: string, details?: string): ApiResponse<never> {
  return { ok: false, error: { code, message, ...(details ? { details } : {}) } };
}
