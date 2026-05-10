// Pre-build check: every Entity360Tabs entityType prop literal in the
// dashboard pages must be in ALLOWED_ENTITY_TABLES. This catches the class
// of bug found in the Sprint 1 audit (bench detail passing 'bench_entries'
// when only 'bench' was allowlisted), so it can never recur silently.
//
// Strategy: scan src/app/(dashboard)/dashboard/<entity>/[id]/page.tsx for
// `entityType="..."` string literals and verify each is allowlisted.
// We don't need a TS AST — the convention in the codebase is a direct
// string literal on the JSX prop. If someone constructs entityType
// dynamically, this check won't see it (and they should add a runtime
// assertion at the call site instead).

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

// Read the contract directly here (rather than importing through
// src/server/contractAllowlist.ts) so this script doesn't need ts-node's
// path-alias plugin for `@/` imports — keeps the prebuild lean.
import dbContract from '../src/db/contract/db_contract.json';

// Mirror of ALLOWED_ENTITY_TABLES in src/server/contractAllowlist.ts.
// If you add a row there, add it here. The smoke tests will catch drift.
const ALLOWED_ENTITY_TABLES = new Set<string>([
  'candidates',
  'jobs',
  'submissions',
  'interviews',
  'offers',
  'placements',
  'bench_entries',
  'companies',
  'clients',
  'contacts',
  'organizations',
  'users',
  'roles',
  'teams',
  'applications',
  'tasks',
  'reports',
]);

// Sanity check: every entry in the allowlist must exist in the contract.
const contractTables = new Set<string>(
  (dbContract as { tables: Array<{ table: string; schema?: string }> }).tables
    .filter((t) => (t.schema ?? 'public') === 'public')
    .map((t) => t.table)
);
ALLOWED_ENTITY_TABLES.forEach((t) => {
  if (!contractTables.has(t)) {
    console.error(`check-entity-types: allowlisted table "${t}" not in contract`);
    process.exit(1);
  }
});

const DASHBOARD_DIR = join(__dirname, '..', 'src', 'app', '(dashboard)', 'dashboard');

const ENTITY_TYPE_RE = /entityType\s*=\s*["']([^"']+)["']/g;

interface Violation {
  file: string;
  entityType: string;
}

function findDetailPages(): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(DASHBOARD_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const detail = join(DASHBOARD_DIR, entry.name, '[id]', 'page.tsx');
    try {
      readFileSync(detail, 'utf8');
      out.push(detail);
    } catch {
      // No detail page for this dir — fine (e.g. settings/).
    }
  }
  return out;
}

function check(): Violation[] {
  const violations: Violation[] = [];
  for (const file of findDetailPages()) {
    const src = readFileSync(file, 'utf8');
    let m: RegExpExecArray | null;
    while ((m = ENTITY_TYPE_RE.exec(src)) !== null) {
      const entityType = m[1];
      if (!ALLOWED_ENTITY_TABLES.has(entityType)) {
        violations.push({ file, entityType });
      }
    }
  }
  return violations;
}

const violations = check();

if (violations.length > 0) {
  console.error('check-entity-types: violations found');
  for (const v of violations) {
    console.error(
      `  ${v.file.replace(process.cwd() + '/', '')}: entityType="${v.entityType}" not in ALLOWED_ENTITY_TABLES`
    );
  }
  const allowed: string[] = [];
  ALLOWED_ENTITY_TABLES.forEach((t) => allowed.push(t));
  console.error(`\n  Allowed: ${allowed.sort().join(', ')}`);
  process.exit(1);
}

console.log(`check-entity-types: OK (scanned ${findDetailPages().length} detail pages)`);
