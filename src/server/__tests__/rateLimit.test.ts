import { describe, it, expect } from 'vitest';
import type { NextRequest } from 'next/server';
import { checkRateLimit, rateLimitHeaders } from '@/server/rateLimit';

// Minimal NextRequest stub — the limiter only reads .headers and .nextUrl.
function fakeReq(ip: string): NextRequest {
  return {
    headers: new Headers({ 'x-forwarded-for': ip }),
  } as unknown as NextRequest;
}

describe('checkRateLimit', () => {
  it('allows requests under the limit', () => {
    const req = fakeReq('1.1.1.1');
    const config = { limit: 3, windowMs: 60_000 };
    expect(checkRateLimit(req, 'test:a', config).allowed).toBe(true);
    expect(checkRateLimit(req, 'test:a', config).allowed).toBe(true);
    expect(checkRateLimit(req, 'test:a', config).allowed).toBe(true);
  });

  it('rejects after the limit', () => {
    const req = fakeReq('2.2.2.2');
    const config = { limit: 2, windowMs: 60_000 };
    expect(checkRateLimit(req, 'test:b', config).allowed).toBe(true);
    expect(checkRateLimit(req, 'test:b', config).allowed).toBe(true);
    const third = checkRateLimit(req, 'test:b', config);
    expect(third.allowed).toBe(false);
    expect(third.remaining).toBe(0);
    expect(third.retryAfterSeconds).toBeGreaterThan(0);
  });

  it('isolates buckets per IP', () => {
    const config = { limit: 1, windowMs: 60_000 };
    expect(checkRateLimit(fakeReq('3.3.3.3'), 'test:c', config).allowed).toBe(true);
    expect(checkRateLimit(fakeReq('4.4.4.4'), 'test:c', config).allowed).toBe(true);
  });

  it('isolates buckets per route key', () => {
    const req = fakeReq('5.5.5.5');
    const config = { limit: 1, windowMs: 60_000 };
    expect(checkRateLimit(req, 'test:d-read', config).allowed).toBe(true);
    expect(checkRateLimit(req, 'test:d-write', config).allowed).toBe(true);
  });

  it('emits rate-limit headers in standard form', () => {
    const result = {
      allowed: false,
      limit: 10,
      remaining: 0,
      resetAt: Date.now() + 30_000,
      retryAfterSeconds: 30,
    };
    const h = rateLimitHeaders(result);
    expect(h['X-RateLimit-Limit']).toBe('10');
    expect(h['X-RateLimit-Remaining']).toBe('0');
    expect(h['X-RateLimit-Reset']).toBeDefined();
    expect(h['Retry-After']).toBe('30');
  });

  it('omits Retry-After when allowed', () => {
    const h = rateLimitHeaders({
      allowed: true,
      limit: 10,
      remaining: 5,
      resetAt: Date.now() + 30_000,
      retryAfterSeconds: 30,
    });
    expect(h['Retry-After']).toBeUndefined();
  });
});
