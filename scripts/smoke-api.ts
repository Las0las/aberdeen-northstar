// API smoke test — exits 0 on green, 1 on any failure.
//
// Strategy: hit every API route with valid params under dev-bypass and assert
// the response is 200 with the standard ApiResponse envelope. We treat empty
// data arrays as success (env may have no seed data) — what we're really
// testing is auth wiring, allowlist plumbing, and the contract-driven
// branches not exploding.
//
// Run with the dev server up:
//   NEXT_PUBLIC_DEV_AUTH_BYPASS=true npm run dev   # in one shell
//   npm run smoke:api                              # in another
//
// Or in CI: start the server with `next start &`, wait for ready, then run.

const BASE_URL = process.env.SMOKE_BASE_URL || 'http://localhost:3000';

// Seed UUIDs — these don't need to exist in the DB. We accept 200 with empty
// data as success because that proves the route passed all validation gates
// (auth, allowlist, UUID, contract feature detection) and queried the DB.
const SEED_UUID = '00000000-0000-0000-0000-000000000001';
const SEED_BAD_UUID = 'not-a-uuid';

const ALLOWED_ENTITIES = [
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
];

interface Case {
  name: string;
  url: string;
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: Record<string, unknown>;
  expectStatus: number | number[];
  expectOk?: boolean;
}

const cases: Case[] = [];

// 1. Activities + Audit + Related + Notes for every allowed entity.
for (const entity of ALLOWED_ENTITIES) {
  cases.push({
    name: `GET /api/activities ${entity}`,
    url: `/api/activities?entity_type=${entity}&entity_id=${SEED_UUID}`,
    expectStatus: 200,
    expectOk: true,
  });
  cases.push({
    name: `GET /api/audit ${entity}`,
    url: `/api/audit?table_name=${entity}&record_id=${SEED_UUID}`,
    expectStatus: 200,
    expectOk: true,
  });
  cases.push({
    name: `GET /api/related ${entity}`,
    url: `/api/related?table=${entity}&id=${SEED_UUID}`,
    // Base record likely doesn't exist with seed UUID → 404 is fine.
    // What we're proving: not 401 (auth wiring) and not 403 (allowlist).
    expectStatus: [200, 404],
  });
  cases.push({
    name: `GET /api/notes ${entity}`,
    url: `/api/notes?entity_type=${entity}&entity_id=${SEED_UUID}`,
    expectStatus: 200,
    expectOk: true,
  });
}

// 2. Negative cases — auth/allowlist/UUID gates must reject.
cases.push({
  name: 'GET /api/activities rejects non-allowlisted entity',
  url: `/api/activities?entity_type=secrets&entity_id=${SEED_UUID}`,
  expectStatus: 403,
});
cases.push({
  name: 'GET /api/activities rejects bad UUID',
  url: `/api/activities?entity_type=candidates&entity_id=${SEED_BAD_UUID}`,
  expectStatus: 400,
});
cases.push({
  name: 'GET /api/notes rejects missing entity_id',
  url: `/api/notes?entity_type=candidates`,
  expectStatus: 400,
});
cases.push({
  name: 'POST /api/notes rejects empty content',
  url: '/api/notes',
  method: 'POST',
  body: { entity_type: 'candidates', entity_id: SEED_UUID, content: '' },
  expectStatus: 400,
});

async function run(): Promise<number> {
  let passed = 0;
  let failed = 0;
  const failures: string[] = [];

  for (const c of cases) {
    try {
      const res = await fetch(`${BASE_URL}${c.url}`, {
        method: c.method ?? 'GET',
        headers: c.body ? { 'Content-Type': 'application/json' } : undefined,
        body: c.body ? JSON.stringify(c.body) : undefined,
      });

      const expected = Array.isArray(c.expectStatus) ? c.expectStatus : [c.expectStatus];
      const statusOk = expected.includes(res.status);

      let envelopeOk = true;
      if (c.expectOk !== undefined) {
        const json = (await res.json()) as { ok?: boolean };
        envelopeOk = json.ok === c.expectOk;
      }

      if (statusOk && envelopeOk) {
        passed++;
        process.stdout.write('.');
      } else {
        failed++;
        failures.push(
          `[FAIL] ${c.name}: status=${res.status} (expected ${expected.join('|')})${c.expectOk !== undefined ? ` ok-mismatch=${!envelopeOk}` : ''}`
        );
        process.stdout.write('F');
      }
    } catch (err) {
      failed++;
      failures.push(`[ERROR] ${c.name}: ${(err as Error).message}`);
      process.stdout.write('E');
    }
  }

  process.stdout.write('\n\n');
  if (failures.length) {
    for (const f of failures) console.error(f);
  }
  console.log(`\nSmoke: ${passed} passed, ${failed} failed (of ${cases.length})`);
  return failed === 0 ? 0 : 1;
}

run().then((code) => process.exit(code));
