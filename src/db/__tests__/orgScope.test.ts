import { describe, it, expect } from 'vitest';
import { tableHasOrg, getOrgScopedTables, getAllTables, getTableSchema } from '@/db/orgScope';

describe('tableHasOrg', () => {
  it('returns true for known org-scoped tables per contract', () => {
    expect(tableHasOrg('candidates')).toBe(true);
    expect(tableHasOrg('jobs')).toBe(true);
    expect(tableHasOrg('notes')).toBe(true);
    expect(tableHasOrg('bench_entries')).toBe(true);
  });

  it('returns false for unknown tables', () => {
    expect(tableHasOrg('does_not_exist')).toBe(false);
    expect(tableHasOrg('')).toBe(false);
  });
});

describe('getOrgScopedTables', () => {
  it('returns a non-empty list derived from contract', () => {
    const tables = getOrgScopedTables();
    expect(tables.length).toBeGreaterThan(10);
    expect(tables).toContain('candidates');
  });
});

describe('getAllTables', () => {
  it('returns the full contract table list', () => {
    const all = getAllTables();
    expect(all.length).toBeGreaterThan(getOrgScopedTables().length);
  });
});

describe('getTableSchema', () => {
  it('returns the contract entry for a known table', () => {
    const t = getTableSchema('notes');
    expect(t).not.toBeNull();
    expect(t?.table).toBe('notes');
    expect(t?.columns.find((c: { name: string }) => c.name === 'candidate_id')).toBeDefined();
  });

  it('returns null for an unknown table', () => {
    expect(getTableSchema('nope')).toBeNull();
  });
});
