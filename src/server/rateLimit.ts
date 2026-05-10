// Per-IP, per-route rate limiter — STOPGAP IN-MEMORY IMPLEMENTATION.
//
// This is a single-instance fixed-window counter. It works on Vercel/Node
// because each Lambda invocation has a warm container that persists state
// for its own lifetime. It does NOT coordinate across instances, so:
//   - cold starts reset the window
//   - a horizontally-scaled deploy can let a client through N times the
//     declared limit (where N = number of instances)
//
// Replace with @upstash/ratelimit + Redis (or equivalent) before public
// launch. The route-level call site (`await checkRateLimit(req, 'notes:get')`)
// is intentionally identical to the Upstash-backed API so the swap is a
// one-line change inside this module.

import { NextRequest } from 'next/server';

interface Bucket {
  count: number;
  resetAt: number;
}

// Module-level map persists across requests within a single instance.
const buckets = new Map<string, Bucket>();

// Periodic cleanup so the map doesn't grow unbounded across long-lived runtimes.
let lastSweep = Date.now();
const SWEEP_INTERVAL_MS = 60_000;

function sweep(now: number): void {
  if (now - lastSweep < SWEEP_INTERVAL_MS) return;
  lastSweep = now;
  // forEach avoids the for-of-on-Map iteration that needs downlevelIteration
  // under the project's current tsconfig.
  buckets.forEach((b, key) => {
    if (b.resetAt <= now) buckets.delete(key);
  });
}

export interface RateLimitConfig {
  /** Max requests in the window. */
  limit: number;
  /** Window length in ms. */
  windowMs: number;
}

export const RATE_LIMITS = {
  // Reads — generous; the dashboard fans out 4 calls per detail page.
  read: { limit: 120, windowMs: 60_000 },
  // Writes — tighter; create/update/delete on notes etc.
  write: { limit: 30, windowMs: 60_000 },
} as const satisfies Record<string, RateLimitConfig>;

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  /** Unix ms when the current window resets. */
  resetAt: number;
  /** Seconds until reset, suitable for Retry-After header. */
  retryAfterSeconds: number;
}

function clientKey(req: NextRequest): string {
  // Behind a proxy: prefer x-forwarded-for first hop. Fall back to x-real-ip.
  // NextRequest.ip exists on some platforms (Vercel) but not all.
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  const real = req.headers.get('x-real-ip');
  if (real) return real.trim();
  return 'unknown';
}

export function checkRateLimit(
  req: NextRequest,
  routeKey: string,
  config: RateLimitConfig = RATE_LIMITS.read
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const key = `${routeKey}|${clientKey(req)}`;
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    const resetAt = now + config.windowMs;
    buckets.set(key, { count: 1, resetAt });
    return {
      allowed: true,
      limit: config.limit,
      remaining: config.limit - 1,
      resetAt,
      retryAfterSeconds: Math.ceil(config.windowMs / 1000),
    };
  }

  bucket.count += 1;
  const allowed = bucket.count <= config.limit;
  return {
    allowed,
    limit: config.limit,
    remaining: Math.max(0, config.limit - bucket.count),
    resetAt: bucket.resetAt,
    retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
  };
}

/**
 * Build the standard set of rate-limit response headers.
 * Spec follows draft-ietf-httpapi-ratelimit-headers conventions.
 */
export function rateLimitHeaders(result: RateLimitResult): Record<string, string> {
  const headers: Record<string, string> = {
    'X-RateLimit-Limit': String(result.limit),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(Math.ceil(result.resetAt / 1000)),
  };
  if (!result.allowed) {
    headers['Retry-After'] = String(result.retryAfterSeconds);
  }
  return headers;
}
