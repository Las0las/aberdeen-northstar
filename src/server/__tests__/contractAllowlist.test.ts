import { describe, it, expect } from 'vitest';
import {
  ALLOWED_ENTITY_TABLES,
  assertAllowedEntity,
  assertUuid,
  isValidUuid,
  getNotesSupport,
  getActivitiesSupport,
  getAuditSupport,
} from '@/server/contractAllowlist';

describe('ALLOWED_ENTITY_TABLES', () => {
  it('uses bench_entries (the canonical table), not bench', () => {
    expect(ALLOWED_ENTITY_TABLES.has('bench_entries')).toBe(true);
    expect(ALLOWED_ENTITY_TABLES.has('bench')).toBe(false);
  });

  it('contains exactly the 17 documented entities', () => {
    expect(ALLOWED_ENTITY_TABLES.size).toBe(17);
  });
});

describe('assertAllowedEntity', () => {
  it('accepts allowlisted entities', () => {
    expect(() => assertAllowedEntity('candidates')).not.toThrow();
    expect(() => assertAllowedEntity('bench_entries')).not.toThrow();
  });

  it('rejects non-allowlisted entities (closes SQL-injection-via-table-name)', () => {
    expect(() => assertAllowedEntity('users; drop table x')).toThrow();
    expect(() => assertAllowedEntity('audit_log')).toThrow();
    expect(() => assertAllowedEntity('embeddings')).toThrow();
    expect(() => assertAllowedEntity('')).toThrow();
  });
});

describe('assertUuid / isValidUuid', () => {
  const valid = '550e8400-e29b-41d4-a716-446655440000';

  it('accepts a v4 UUID', () => {
    expect(isValidUuid(valid)).toBe(true);
    expect(() => assertUuid(valid)).not.toThrow();
  });

  it('rejects malformed inputs', () => {
    for (const bad of [
      '',
      null,
      undefined,
      'not-a-uuid',
      '550e8400-e29b-41d4-a716', // truncated
      '550e8400-e29b-c1d4-a716-446655440000', // invalid version digit
      "550e8400'; drop table users; --",
    ]) {
      expect(isValidUuid(bad as string)).toBe(false);
      expect(() => assertUuid(bad as string)).toThrow();
    }
  });
});

describe('getNotesSupport', () => {
  it('reports support for candidates', () => {
    const s = getNotesSupport('candidates');
    expect(s.supported).toBe(true);
    expect(s.fkColumn).toBe('candidate_id');
  });

  it('reports support for applications', () => {
    const s = getNotesSupport('applications');
    expect(s.supported).toBe(true);
    expect(s.fkColumn).toBe('application_id');
  });

  it('reports candidate_id is required (NOT NULL in contract)', () => {
    expect(getNotesSupport('candidates').requiresCandidateId).toBe(true);
    expect(getNotesSupport('applications').requiresCandidateId).toBe(true);
  });

  it('reports unsupported for other entities truthfully', () => {
    for (const e of ['jobs', 'companies', 'placements', 'tasks']) {
      const s = getNotesSupport(e);
      expect(s.supported).toBe(false);
      expect(s.reason).toMatch(/no FK/);
    }
  });
});

describe('getActivitiesSupport', () => {
  it('matches contract — entity_type and entity_id columns exist', () => {
    const s = getActivitiesSupport();
    expect(s.hasEntityType).toBe(true);
    expect(s.hasEntityId).toBe(true);
    expect(s.hasOrgId).toBe(true);
  });
});

describe('getAuditSupport', () => {
  it('finds audit_log/audit_logs and reports column presence', () => {
    const s = getAuditSupport();
    expect(s.tableName).toMatch(/^audit_log/);
    expect(s.hasTableName).toBe(true);
    expect(s.hasRecordId).toBe(true);
  });
});
