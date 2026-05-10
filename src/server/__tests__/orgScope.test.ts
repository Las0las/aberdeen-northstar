import { describe, it, expect } from 'vitest';
import { assertOrgScope, successResponse, errorResponse } from '@/server/orgScope';

describe('assertOrgScope', () => {
  const ORG_A = '11111111-1111-1111-1111-111111111111';
  const ORG_B = '22222222-2222-2222-2222-222222222222';

  it('passes when record belongs to expected org', () => {
    expect(() => assertOrgScope(ORG_A, ORG_A)).not.toThrow();
  });

  it('throws on cross-tenant access', () => {
    expect(() => assertOrgScope(ORG_A, ORG_B)).toThrow(/scope violation/i);
  });

  it('throws when record has no org_id (defense in depth)', () => {
    expect(() => assertOrgScope(null, ORG_A)).toThrow();
    expect(() => assertOrgScope(undefined, ORG_A)).toThrow();
  });
});

describe('response envelopes', () => {
  it('successResponse always sets ok=true', () => {
    const r = successResponse({ x: 1 });
    expect(r.ok).toBe(true);
    expect(r.data).toEqual({ x: 1 });
  });

  it('errorResponse always sets ok=false', () => {
    const r = errorResponse('CODE', 'msg', 'details');
    expect(r.ok).toBe(false);
    expect(r.error).toEqual({ code: 'CODE', message: 'msg', details: 'details' });
  });

  it('errorResponse omits details when not provided', () => {
    const r = errorResponse('CODE', 'msg');
    expect(r.error).toEqual({ code: 'CODE', message: 'msg' });
    expect((r.error as Record<string, unknown>).details).toBeUndefined();
  });
});
