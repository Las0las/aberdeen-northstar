// Supabase Client with Organization Context and Dev Bypass Support
import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database.types';
import { isDevBypassEnabled, getDevSession } from '@/config/devAuth';

const PLACEHOLDER_URL = 'https://placeholder.supabase.co';
const PLACEHOLDER_KEY = 'placeholder-key';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const rawAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// Defer hard-fail until request time — `next build` evaluates this module
// during page-data collection where production env may legitimately be unset.
const isProductionRuntime =
  process.env.NODE_ENV === 'production' &&
  process.env.NEXT_PHASE !== 'phase-production-build';

if (
  isProductionRuntime &&
  (!rawUrl || rawUrl === PLACEHOLDER_URL || !rawAnon || rawAnon === PLACEHOLDER_KEY)
) {
  throw new Error(
    'Supabase client misconfigured: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required in production'
  );
}

const supabaseUrl = rawUrl || PLACEHOLDER_URL;
const supabaseAnonKey = rawAnon || PLACEHOLDER_KEY;

// Browser client for client-side usage
export const supabase = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);

// Server client factory
export function createServerClient() {
  return createClient<Database>(supabaseUrl, supabaseAnonKey);
}

// Get current organization ID from JWT claims OR dev bypass
export async function getOrganizationId(): Promise<string> {
  // Check dev bypass first
  if (isDevBypassEnabled()) {
    const devSession = getDevSession();
    if (devSession) {
      return devSession.organizationId;
    }
  }

  // Normal auth flow
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) {
    throw new Error('No authenticated user');
  }
  const orgId = session.user.user_metadata?.organization_id;
  if (!orgId) {
    throw new Error('No organization_id in user metadata');
  }
  return orgId;
}

// Get current user ID
export async function getCurrentUserId(): Promise<string> {
  // Check dev bypass first
  if (isDevBypassEnabled()) {
    const devSession = getDevSession();
    if (devSession) {
      return devSession.userId;
    }
  }

  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user?.id) {
    throw new Error('No authenticated user');
  }
  return session.user.id;
}

// Get current user email
export async function getCurrentUserEmail(): Promise<string> {
  // Check dev bypass first
  if (isDevBypassEnabled()) {
    const devSession = getDevSession();
    if (devSession) {
      return devSession.email;
    }
  }

  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user?.email) {
    throw new Error('No authenticated user');
  }
  return session.user.email;
}

// Check if user is authenticated (real or dev bypass)
export async function isAuthenticated(): Promise<boolean> {
  if (isDevBypassEnabled()) {
    return true;
  }
  const { data: { session } } = await supabase.auth.getSession();
  return !!session?.user;
}

// Wrapper for org-scoped queries
export async function withOrgContext<T>(
  fn: (client: typeof supabase, orgId: string) => Promise<T>
): Promise<T> {
  const orgId = await getOrganizationId();
  return fn(supabase, orgId);
}

// Type-safe table helper
export type TableName = keyof Database['public']['Tables'];
export type TableRow<T extends TableName> = Database['public']['Tables'][T]['Row'];
export type TableInsert<T extends TableName> = Database['public']['Tables'][T]['Insert'];
export type TableUpdate<T extends TableName> = Database['public']['Tables'][T]['Update'];
