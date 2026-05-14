import { describe, it, expect } from 'vitest';
import {
  resolveEntity,
  resolveRelationship,
  resolveVerb,
} from '@/server/runtime/ontology/semanticResolver';

describe('semanticResolver', () => {
  it('passes through registered canonical entities', () => {
    const r = resolveEntity('worker', 'employee');
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.canonical).toEqual({ domain: 'worker', subtype: 'employee' });
    }
  });

  it('maps known synonyms to canonical entities', () => {
    const r = resolveEntity('unknown', 'FTE');
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.canonical.domain).toBe('worker');
      expect(r.canonical.subtype).toBe('employee');
    }
  });

  it('rejects unmapped entities with a structured failure', () => {
    const r = resolveEntity('worker', 'ghost');
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.reason).toBe('unregistered_entity');
      expect(r.input).toBe('worker:ghost');
    }
  });

  it('resolves relationship synonyms canonically', () => {
    const r = resolveRelationship('EMPLOYED_BY');
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.canonical).toBe('WORKS_FOR');
  });

  it('resolves verb synonyms canonically and is case-insensitive', () => {
    const r = resolveVerb('start');
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.canonical).toBe('ACTIVATE');
  });

  it('refuses to invent unknown verbs', () => {
    const r = resolveVerb('vibe_check');
    expect(r.ok).toBe(false);
  });
});
