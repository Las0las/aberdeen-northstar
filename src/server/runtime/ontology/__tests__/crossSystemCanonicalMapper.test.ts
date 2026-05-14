import { describe, it, expect } from 'vitest';
import {
  mapForeignEntity,
  mapForeignRelationship,
  mapForeignVerb,
  listSupportedForeignSystems,
} from '@/server/runtime/ontology/crossSystemCanonicalMapper';

describe('crossSystemCanonicalMapper', () => {
  it('lists every supported dialect', () => {
    expect(listSupportedForeignSystems()).toEqual([
      'ats',
      'vms',
      'erp',
      'payroll',
      'finance',
      'generic',
    ]);
  });

  it('maps ATS job_posting to execution.requisition', () => {
    const r = mapForeignEntity('ats', 'job_posting');
    expect(r.ok).toBe(true);
    if (r.ok)
      expect(r.canonical).toEqual({ domain: 'execution', subtype: 'requisition' });
  });

  it('maps VMS work_order through ATS-or-VMS dialect', () => {
    const r = mapForeignEntity('vms', 'work_order');
    expect(r.ok).toBe(true);
    if (r.ok)
      expect(r.canonical).toEqual({ domain: 'execution', subtype: 'requisition' });
  });

  it('falls back to the semantic resolver when dialect lacks a direct entry', () => {
    const r = mapForeignEntity('generic', 'FTE');
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.canonical.subtype).toBe('employee');
  });

  it('maps ATS POST verb to canonical CREATE', () => {
    const r = mapForeignVerb('ats', 'POST');
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.canonical).toBe('CREATE');
  });

  it('maps ATS APPLIED_TO relationship to canonical SUBMITTED_TO', () => {
    const r = mapForeignRelationship('ats', 'APPLIED_TO');
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.canonical).toBe('SUBMITTED_TO');
  });

  it('returns structured failure when neither dialect nor resolver can map', () => {
    const r = mapForeignEntity('generic', 'completely_unknown_label');
    expect(r.ok).toBe(false);
  });
});
