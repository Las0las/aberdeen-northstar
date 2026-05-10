// Server-only Supabase Admin Client (Service Role)
// NEVER import this from client-side code
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const PLACEHOLDER_URL = 'https://placeholder.supabase.co';
const PLACEHOLDER_KEY = 'placeholder-service-role-key';

const urlIsPlaceholder = !supabaseUrl || supabaseUrl === PLACEHOLDER_URL;
const keyIsPlaceholder = !serviceRoleKey || serviceRoleKey === PLACEHOLDER_KEY;

// We can't throw at module-load time because `next build` evaluates this module
// during page-data collection (NEXT_PHASE === 'phase-production-build'), where
// production env may legitimately be unset. Instead: warn at load, fail at use
// via a Proxy that intercepts the first .from()/.rpc() call in a real request.
const isProductionRuntime =
  process.env.NODE_ENV === 'production' &&
  process.env.NEXT_PHASE !== 'phase-production-build';

if (urlIsPlaceholder) {
  console.warn('SUPABASE_URL not configured (using placeholder)');
}
if (keyIsPlaceholder) {
  console.warn('SUPABASE_SERVICE_ROLE_KEY not configured - admin operations will fail');
}

const realClient = createClient<Database>(
  supabaseUrl || PLACEHOLDER_URL,
  serviceRoleKey || PLACEHOLDER_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

function failClosed(): never {
  throw new Error(
    'Supabase admin client misconfigured: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required in production'
  );
}

// In production runtime with placeholder env, every property access throws.
// In build phase or non-production, the real (possibly placeholder-backed) client passes through.
export const supabaseAdmin: typeof realClient =
  isProductionRuntime && (urlIsPlaceholder || keyIsPlaceholder)
    ? (new Proxy(realClient, { get: () => failClosed() }) as typeof realClient)
    : realClient;

export default supabaseAdmin;
