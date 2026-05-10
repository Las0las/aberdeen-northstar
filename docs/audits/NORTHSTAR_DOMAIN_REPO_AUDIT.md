# NorthStar Domain Repo Audit

- **Repo:** `las0las/aberdeen-northstar`
- **Branch:** `claude/audit-northstar-domains-y105R`
- **Audit date:** 2026-05-10
- **Mode:** Read-only / audit-only. No application behavior modified.
- **Source of truth:** NorthStar 36-domain canonical map + governed execution architecture
  (`Intent → Contract → Policy Gates → DecisionEnvelope → Approved RPC → Event Spine → Projection Refresh`).

---

## 1. Executive Verdict

The repository is a **database-first CRUD application** that wires UI components directly
to the Supabase browser client over the full surface of `db_contract.json` (128 tables).
It is **not** structured as a governed NorthStar runtime.

| Governance layer | Status |
| --- | --- |
| Intent Registry | **MISSING** (no code; only DB table stubs) |
| Contract Gates | Partial (read-side allowlist only) |
| Policy / Governance Runtime | **MISSING** |
| DecisionEnvelope | **MISSING** |
| routeAction Runtime | **MISSING** |
| Event Spine | **MISSING** (only the `event_outbox` table exists, unused) |
| Approved RPCs | **MISSING** (no governed RPCs exist; mutations go through raw `from().insert/update/delete`) |
| Projection / Read Model layer | **MISSING** (UI queries raw tables) |
| Audit writers | **MISSING** (audit is a read-only tab; no writer ties to mutations) |
| MasterShell | **MISSING** |
| LAWRENCE / AI runtime | Stub only (`src/ai/tools/generated/index.ts` is metadata, no runtime) |
| Stage Machines | **MISSING** |
| Skills Runtime | **MISSING** |
| Replay / Simulation / Digital Twin | **MISSING** |
| System Health / Observability | **MISSING** |

The contract already declares governance-flavored tables (`action_registry`,
`registry_actions`, `decision_packets`, `event_outbox`, `idempotency_keys`, `audit_log`,
`workflows`, `workflow_instances`, `business_rules`, `automation_rules`, `task_rules`)
but **no application code reads or writes them**. The schema is ahead of the runtime.

---

## 2. Tripwire Findings (Non-Negotiable Law Violations)

### 2.1 Direct UI → Database mutation (HIGHEST SEVERITY)

The full mutation surface goes:

```
React page (use client)
  → useCreate*/useUpdate*/useDelete*           (src/hooks/generated.ts)
  → api.<entity>.create/update/delete          (src/api/typed/index.ts)
  → createRecord/updateRecord/deleteRecord     (src/api/typed/index.ts)
  → supabase.from(table).insert/update/delete  (browser anon client, src/lib/supabase.ts)
  → Supabase Postgres (RLS only)
```

Key call sites:

- `src/api/typed/index.ts:174-181` — `createRecord` → `supabase.from(...).insert(...)`
- `src/api/typed/index.ts:240-246` — `updateRecord` → `supabase.from(...).update(...)`
- `src/api/typed/index.ts:253-255` — `deleteRecord` → `supabase.from(...).delete()`
- `src/hooks/generated.ts:332-360` (and ~25 more) — `useCreate*/useUpdate*/useDelete*`
- UI consumers (sampled, all violate the same law):
  - `src/app/(dashboard)/dashboard/jobs/page.tsx:44, 50` (`useCreateJob`)
  - `src/app/(dashboard)/dashboard/jobs/[id]/page.tsx:25` (`useDeleteJob`)
  - `src/app/(dashboard)/dashboard/candidates/page.tsx:44` (`useCreateCandidate`)
  - `src/app/(dashboard)/dashboard/candidates/[id]/page.tsx:25` (`useDeleteCandidate`)
  - `src/app/(dashboard)/dashboard/submissions/page.tsx:48` (`useCreateSubmission`)
  - `src/app/(dashboard)/dashboard/interviews/page.tsx:48` (`useCreateInterview`)
  - `src/app/(dashboard)/dashboard/offers/page.tsx:48` (`useCreateOffer`)
  - `src/app/(dashboard)/dashboard/placements/page.tsx:49` (`useCreatePlacement`)
  - `src/app/(dashboard)/dashboard/tasks/page.tsx:51-52` (`useUpdateTask`, `useCreateTask`)
  - `src/app/(dashboard)/dashboard/tasks/[id]/page.tsx:16` (`useDeleteTask`)
  - `src/app/(dashboard)/dashboard/applications/[id]/page.tsx:37-38` (`useDeleteApplication`, `useUpdateApplication`)
  - same pattern for `clients`, `companies`, `contacts`, `roles`, `teams`, `users`,
    `organizations`, `reports`, `bench`.

**Verdict:** every governed business domain has at least one direct UI → DB mutation
bypass. RLS is the *only* enforcement; there is no Intent, Policy, Envelope, RPC,
Spine, or Audit hop.

### 2.2 Server route mutations bypass governance

`src/app/api/notes/route.ts` and `src/app/api/notes/[id]/route.ts` use the service-role
admin client (`supabaseAdmin`) to insert / update / delete `notes` directly:

- `src/app/api/notes/route.ts:244-248` — direct `.insert(...)`
- `src/app/api/notes/[id]/route.ts:106-111` — direct `.update(...)`
- `src/app/api/notes/[id]/route.ts:181-184` — direct `.delete(...)`

These routes do org-scope enforcement and a UUID allowlist (good), but they still:

- skip the Intent Registry (no `intent_name` recorded),
- skip Policy Gates,
- never construct a DecisionEnvelope,
- never emit to `event_outbox`,
- never write to `audit_log`.

The activities/audit/related routes are read-only and properly hardened
(`src/app/api/activities/route.ts`, `src/app/api/audit/route.ts`,
`src/app/api/related/route.ts`) — no violation.

### 2.3 AI surface is wired for direct CRUD

`src/ai/tools/generated/index.ts` (27,945 lines) declares **640 AI tools** of which
**384 are marked `"mutates": true`**, each pointed at an auto-generated OpenAPI path
(`src/openapi/spec.json`) that mirrors raw table CRUD. There is no runtime that
enforces governance on these calls. If/when wired, the AI runtime would execute the
same direct-mutation pattern as the UI hooks.

### 2.4 UI business logic in pages

UI files contain business decisions that should live behind governed intents:

- `src/app/(dashboard)/dashboard/jobs/page.tsx:50-59` constructs a job record and writes
  it. Status defaulting (`status: 'open'`) is a business rule encoded in the page.
- `src/app/(dashboard)/dashboard/tasks/page.tsx` performs task updates from the UI.
- `src/components/entities/Entity360Tabs.tsx` performs full notes CRUD (`createNote`,
  `updateNote`, `deleteNote`) from a client component.

### 2.5 Naming drift from canonical NorthStar terminology

| NorthStar canonical | In-repo term |
| --- | --- |
| Domain | "Entity" (README §Entities, `ALLOWED_ENTITY_TABLES`) |
| Intent | (none; `useCreateX/useUpdateX/useDeleteX`) |
| Action / Approved RPC | (none; raw `.insert/.update/.delete`) |
| DecisionEnvelope | (none) |
| Event Spine / outbox | `event_outbox` table exists, unreferenced |
| Projection | (none; raw table reads) |
| Worker | `consultants` (DB table) |
| Stage Machine | (none; column-level `status` strings) |

### 2.6 Other observations (non-tripwire but architectural)

- `src/db/contract/db_contract.json` is the only "contract" artifact — it is a *schema*
  contract, not a *behavior* contract. There are no Intent contracts or Policy
  contracts.
- `src/server/contractAllowlist.ts:24-42` hardcodes a 17-entity allowlist that does not
  match the 36 NorthStar domains.
- Dev auth bypass (`src/config/devAuth.ts`, `src/server/orgScope.ts:25-35`) is gated by
  `NEXT_PUBLIC_DEV_AUTH_BYPASS` — acceptable for dev, but it propagates a synthetic
  actor with no policy attestation.
- No `src/server/` modules exist for: `intent`, `policy`, `envelope`, `routeAction`,
  `events`, `projections`, `audit`, `stage`, `skills`, `lawrence`.

---

## 3. 36-Domain Coverage Table

Legend — **Status**: ◯ none · ◐ partial (data only) · ● implemented as CRUD (not governed) · ★ governed.
**Risk**: 🟥 critical · 🟧 high · 🟨 medium · 🟩 low.

| # | NorthStar Domain | Status | Existing artifacts | Missing artifacts | Risk | Recommended next additive patch |
| - | ---------------- | ------ | ------------------ | ----------------- | ---- | ------------------------------- |
| 1 | Tenant / Organization | ● | tables `organizations`, `tenants`, `workspaces`, `workspace_members`; UI `src/app/(dashboard)/dashboard/organizations/{page,[id]/page}.tsx`; `useCreateOrganization`/`useDeleteOrganization` | `src/server/domains/tenant/{intent,policy,rpc,projection}.ts`; envelope schema; spine emit | 🟧 | Scaffold `src/server/domains/tenant/` with intent + contract types (no behavior change). |
| 2 | Identity / Actor | ● | tables `users`, `app_users`, `user_sessions`; `src/lib/supabase.ts`, `src/server/orgScope.ts`, `src/config/devAuth.ts`; UI `dashboard/users/*` | `Actor` envelope type; verified-actor adapter; identity projection | 🟧 | Add `src/server/identity/actor.ts` returning a typed `Actor` (org, user, claims) used by routeAction. |
| 3 | RBAC / Permissions | ◐ | `users.role` column; RLS policies inside `db_contract.json`; UI `dashboard/roles/*` (CRUD on `roles` table) | Permission resolver, policy attestation, role→intent matrix | 🟧 | Add `src/server/rbac/permissions.ts` returning `{can(actor, intent, resource)}`. |
| 4 | Intent Registry | ◯ | tables `action_registry`, `registry_actions` (unused) | `src/server/intent/registry.ts`; intent contracts; codegen from DB registry | 🟥 | Scaffold `src/server/intent/` with `IntentContract` type + initial registry array. |
| 5 | Policy / Governance | ◯ | tables `business_rules`, `automation_rules`, `task_rules` (unused) | Policy runtime, gates, attestation log | 🟥 | Add `src/server/policy/gate.ts` with a no-op `evaluate(envelope) → Allow/Deny/Require`. |
| 6 | DecisionEnvelope | ◯ | table `decision_packets` (unused) | `src/server/envelope/decisionEnvelope.ts` type + builder | 🟥 | Add envelope type {intent, actor, payload, gates[], decision, evidenceRefs, traceId}. |
| 7 | routeAction Runtime | ◯ | (none) | `src/server/routeAction.ts`; single governed entry; replaces typed-API mutations | 🟥 | Add `routeAction(intentName, payload, ctx)` skeleton that returns NOT_IMPLEMENTED. |
| 8 | Event Spine | ◯ | table `event_outbox` (unused) | Outbox writer, publisher, consumer; idempotency adapter (`idempotency_keys` exists) | 🟥 | Add `src/server/events/outbox.ts` writing to `event_outbox` from routeAction. |
| 9 | Evidence / Documents | ◐ | tables `documents`, `candidate_documents`, `offer_documents`, `esign_envelopes`, `recording_assets`, `transcripts`, `parsed_resumes` | No domain code; no evidence references on envelopes | 🟧 | Scaffold `src/server/domains/evidence/` with read projection only. |
| 10 | Jobs | ● | tables `jobs`, `job_skills`, `job_embeddings`, `job_board_mappings`; UI `dashboard/jobs/{page,[id]/page}.tsx`; hooks `useJobs`, `useCreateJob`, `useDeleteJob` | Intents: `Jobs.Create`, `Jobs.Update`, `Jobs.ChangeStatus`, `Jobs.Close`; stage machine | 🟥 | Define `Jobs.Create` intent contract; migrate `useCreateJob` to call `routeAction('Jobs.Create', …)`. |
| 11 | Candidates | ● | tables `candidates`, `candidate_*`; UI `dashboard/candidates/*`; `useCreateCandidate`, `useDeleteCandidate` | Candidate intents + stage machine; PII policy gate | 🟥 | Define `Candidates.Create` intent + a PII-redaction policy gate stub. |
| 12 | Clients | ● | table `clients`, `client_*`; UI `dashboard/clients/*` | Intents, policy, projection | 🟧 | Define `Clients.Create` intent and projection read model. |
| 13 | Contacts | ● | tables `contacts`, `client_contacts`, `contact_points`; UI `dashboard/contacts/*` | Intents, identity-graph linkage | 🟧 | Define `Contacts.Create` intent. |
| 14 | Submissions | ● | tables `submissions`, `submittals`, `submission_packages`; UI `dashboard/submissions/*` | Submission stage machine; submission→interview policy | 🟥 | Define `Submissions.Submit` intent + stage transitions. |
| 15 | Interviews | ● | tables `interviews`, `interview_feedback`, `interview_plans`, `interview_rounds`; UI `dashboard/interviews/*` | Scheduling policy; interview stage machine | 🟥 | Define `Interviews.Schedule`, `Interviews.RecordFeedback` intents. |
| 16 | Offers | ● | tables `offers`, `offer_approvals`, `offer_documents`; UI `dashboard/offers/*` | Approval workflow (uses `workflow_instances` table) | 🟥 | Define `Offers.Propose`, `Offers.Approve` intents wired to `offer_approvals`. |
| 17 | Placements | ● | table `placements`; UI `dashboard/placements/*` | Placement lifecycle; revenue recognition policy | 🟥 | Define `Placements.Activate` intent. |
| 18 | Onboarding | ◐ | tables `onboarding`, `onboarding_packets`, `background_checks` | No UI, no domain code | 🟧 | Scaffold `src/server/domains/onboarding/` (read projection only). |
| 19 | Workers | ◐ | table `consultants` (worker entity) | No UI, no domain code; rename clarification | 🟧 | Scaffold `src/server/domains/workers/` and document `consultants → workers` mapping. |
| 20 | Time / Billing / Invoicing | ◐ | tables `timesheets`, `billing`, `invoices`, `expenses` | No UI; no governed billing intents | 🟧 | Scaffold `src/server/domains/billing/` with read projection. |
| 21 | Compensation / Margin Economics | ◐ | table `comp_bands` | No UI; no margin calculation policy | 🟧 | Scaffold `src/server/domains/compensation/` (read projection). |
| 22 | Stage Machines | ◯ | tables `workflow_instances`, `workflows`, `pipeline` (unused for transitions); string `status` columns | Generic stage-machine runtime; transition contracts | 🟥 | Add `src/server/stage/machine.ts` with `transition(stage, intent) → nextStage`. |
| 23 | Tasks | ● | table `tasks`, `task_rules`; UI `dashboard/tasks/*`; `useCreateTask`, `useUpdateTask`, `useDeleteTask` | Task assignment policy; task→intent linkage | 🟧 | Define `Tasks.Assign`, `Tasks.Complete` intents. |
| 24 | Outreach / Communications | ◐ | tables `communications`, `messages`, `message_templates`, `email_logs`, `inbound_messages`, `campaign_*`, `notifications`, `notification_preferences` | No UI; no send pipeline; templating runtime | 🟧 | Scaffold `src/server/domains/outreach/` with template registry stub. |
| 25 | Knowledge / Memory | ◐ | tables `notes`, `candidate_notes`, `note_templates`, `conversations`, `prompt_templates`, `templates` | Memory adapter, knowledge index | 🟧 | Scaffold `src/server/knowledge/` (read-only memory adapter). |
| 26 | Search / Identity Graph | ◐ | tables `saved_searches`, `candidate_embeddings`, `job_embeddings`, `match_scores`, `skills_taxonomy` | Graph traversal API; identity resolution | 🟧 | Scaffold `src/server/search/identityGraph.ts` (read-only resolver). |
| 27 | AI / LAWRENCE Runtime | ◐ | tables `ai_agents`, `ai_executions`, `ai_prompts`; `src/ai/tools/generated/index.ts` (metadata only) | Tool dispatcher; LAWRENCE shell; governed-tool wrapper | 🟥 | Add `src/server/lawrence/runtime.ts` that *only* dispatches via routeAction. Disable direct CRUD AI tools. |
| 28 | Skills Runtime | ◐ | tables `skills_taxonomy`, `skill_profiles`, `candidate_skills`, `job_skills` | Skill match service; skill evaluator | 🟨 | Scaffold `src/server/skills/` (read-only matcher). |
| 29 | Integrations | ◐ | tables `integrations`, `integration_connections`, `webhook_subscriptions`, `webhook_logs`, `webhook_deliveries` | Webhook receiver; signed-intent envelope from external systems | 🟥 | Add `src/server/integrations/inbound.ts` that converts webhooks into intents (no direct DB writes). |
| 30 | Projections / Read Models | ◯ | (none) | Per-domain projection modules; refresh hooks driven by Event Spine | 🟥 | Add `src/server/projections/index.ts` with `refresh(domain)` no-op + per-domain stubs. |
| 31 | Analytics / Institutional Intelligence | ◐ | tables `analytics_reports`, `dashboards`, `recruiting_metrics`, `forecasts`, `reports`; UI `dashboard/reports/*` (CRUD-style) | Read-only analytics service; metric definitions | 🟨 | Scaffold `src/server/analytics/` as projection consumer. |
| 32 | Replay / Simulation / Digital Twin | ◯ | (none) | Envelope replay harness; simulation projection | 🟨 | Scaffold `src/server/replay/` with envelope-replay stub. |
| 33 | Audit / Compliance | ◐ | tables `audit_log`, `audit_logs`, `user_audit_log`, `compliance`, `background_checks`, `eeo_data`; READ route `src/app/api/audit/route.ts`; UI tab in `Entity360Tabs` | Audit *writer* coupled to every routeAction call; compliance policy gate | 🟥 | Add `src/server/audit/writer.ts` that records every DecisionEnvelope outcome. |
| 34 | Admin / Configuration | ◐ | tables `settings`, `subscriptions`; UI `dashboard/settings/page.tsx` | Admin intents; config change audit | 🟨 | Define `Admin.UpdateSetting` intent (no direct settings mutation). |
| 35 | MasterShell | ◯ | (none) | The top-level shell that resolves Intent → routeAction → response | 🟥 | Add `src/server/masterShell/index.ts` exporting the single governed entry point. |
| 36 | System Health / Observability | ◯ | tables `webhook_logs`, `idempotency_keys`; `src/utils/helpers.ts` only | Trace IDs, structured logging, health surface | 🟧 | Add `src/server/observability/` with traceId + structured logger. |

---

## 4. Existing Repo Structure Inventory

```
src/
├── ai/tools/generated/index.ts        # 27,945 lines — AI tool metadata, 384 mutating tool stubs
├── api/
│   ├── index.ts
│   └── typed/index.ts                 # Direct supabase.from(...).insert/update/delete
├── app/
│   ├── (dashboard)/dashboard/         # 17 entity CRUD pages, each with direct mutation hooks
│   ├── __dev/validate/                # Dev validation page (uses supabase.from directly)
│   ├── api/
│   │   ├── activities/route.ts        # READ only (hardened)
│   │   ├── audit/route.ts             # READ only (hardened)
│   │   ├── notes/route.ts             # POST/GET — uses supabaseAdmin direct .insert
│   │   ├── notes/[id]/route.ts        # PATCH/DELETE — direct .update/.delete
│   │   └── related/route.ts           # READ only (hardened)
│   ├── login/page.tsx
│   └── layout.tsx, providers.tsx, page.tsx
├── components/
│   ├── entities/Entity360Tabs.tsx     # Client component performing notes CRUD
│   └── ui/index.tsx
├── config/devAuth.ts
├── db/
│   ├── contract/db_contract.json      # 128 tables, schema contract
│   ├── orgScope.ts
│   └── supabaseAdmin.ts               # Service-role client
├── hooks/
│   ├── generated.ts                   # useCreate*/useUpdate*/useDelete* hooks
│   └── index.ts
├── lib/supabase.ts                    # Browser anon client + getOrganizationId()
├── openapi/spec.json                  # Generated CRUD-per-table OpenAPI (1,271 verbs)
├── schemas/index.ts
├── server/
│   ├── contractAllowlist.ts           # 17-entity allowlist (≠ 36 domains)
│   └── orgScope.ts                    # requireOrgContext() — solid
├── types/database.types.ts            # Generated from contract
└── utils/helpers.ts
```

**Top-level missing directories** (none exist):
`src/server/intent/`, `src/server/policy/`, `src/server/envelope/`, `src/server/routeAction.ts`,
`src/server/events/`, `src/server/projections/`, `src/server/audit/`, `src/server/stage/`,
`src/server/skills/`, `src/server/lawrence/`, `src/server/masterShell/`,
`src/server/replay/`, `src/server/observability/`, `src/server/domains/<domain>/`.

---

## 5. Suggested Implementation Order (Additive-Only)

Each step is additive. Existing CRUD continues to work; new governed pathway is built
alongside and pilot-migrated one domain at a time.

1. **Scaffold core types** — `src/server/envelope/decisionEnvelope.ts`,
   `src/server/intent/{registry,contract}.ts`, `src/server/policy/gate.ts`,
   `src/server/identity/actor.ts`. All exports typed; no runtime side-effects yet.
2. **Add routeAction skeleton** — `src/server/routeAction.ts` exporting
   `routeAction(intent, payload, ctx) → { ok, envelope, error }`. Initial implementation
   resolves an intent contract, runs policy gates (no-op array), constructs an envelope,
   and returns `NOT_IMPLEMENTED` for any mutation path.
3. **Add Event Spine writer** — `src/server/events/outbox.ts` that writes to the
   existing `event_outbox` table when an envelope reaches `Approved`. Read path: a
   single test consumer (no real subscribers yet).
4. **Add Audit writer** — `src/server/audit/writer.ts` that writes the envelope outcome
   to `audit_log` for every routeAction call (allow + deny). Wire it from routeAction.
5. **Add Projection registry** — `src/server/projections/index.ts` exposing
   `refresh(domain, eventType)` invoked by the spine consumer.
6. **Pilot domain: Tasks** — define `Tasks.Create`, `Tasks.Update`, `Tasks.Complete`
   intent contracts; add an approved RPC (Postgres `security definer` function) or a
   server-action wrapper; migrate `useCreateTask`/`useUpdateTask`/`useDeleteTask` to
   call `routeAction(...)`. Keep the legacy hook surface as a thin shim that delegates
   to `routeAction` so callers do not break.
7. **Sweep dominant business domains in this order** — Submissions → Interviews →
   Offers → Placements → Jobs → Candidates → Clients → Contacts → Applications →
   Bench → Reports → Settings → Roles/Teams/Users → Organizations.
8. **Stage Machine layer** — once 2 domains have stage transitions in place, extract
   to `src/server/stage/machine.ts`.
9. **Integrations & AI runtime** — convert webhook surface and `src/ai/tools/generated`
   to dispatch *only* via `routeAction`; remove the 384 "mutates: true" direct-CRUD
   tool definitions or mark them deprecated.
10. **MasterShell** — once routeAction, spine, projections, audit, and ≥3 domains are
    governed, hoist the single entry to `src/server/masterShell/index.ts` and route all
    server actions / API routes / AI tools through it.
11. **Decommission** — only after all 36 domains route through MasterShell:
    delete the direct-mutation `createRecord/updateRecord/deleteRecord` paths in
    `src/api/typed/index.ts` and stop generating CRUD verbs in
    `scripts/generate-typed-api.js` / `scripts/generate-openapi.js`.

> Until step 11, the existing CRUD app remains functional. No silent deletes, no
> speculative refactors, no behavior changes in earlier steps.

---

## 6. Naming Drift to Reconcile (additive renames via aliases)

| Repo term | Canonical | Action |
| --- | --- | --- |
| "entity" | "domain" | Introduce `DomainName` type alongside existing terminology. |
| `ALLOWED_ENTITY_TABLES` (17) | NorthStar 36 domains | Add `NORTHSTAR_DOMAINS` registry; keep current allowlist for read routes. |
| `useCreate*`, `useUpdate*`, `useDelete*` | Intent invokers | Add `useIntent('Domain.IntentName', payload)` alongside. |
| `consultants` (table) | Workers | Add `workers` projection that reads `consultants`. |
| `event_outbox` (table) | Event Spine | Wire writer/publisher (existing schema is fine). |
| `decision_packets` (table) | DecisionEnvelope | Wire writer from routeAction. |
| `action_registry`, `registry_actions` | Intent Registry | Hydrate at boot. |

---

## 7. Open Questions for the Architect

1. Should the canonical Intent Registry live in code (`src/server/intent/registry.ts`)
   or be hydrated at boot from the existing `action_registry` / `registry_actions`
   tables?
2. Is the existing `decision_packets` schema authoritative for `DecisionEnvelope`, or
   should the envelope live only in memory + outbox?
3. Should the AI tools (`src/ai/tools/generated/index.ts`) be regenerated to point at
   intents instead of CRUD operations, or should the generator be replaced?
4. The contract has both `audit_log` and `audit_logs` and both `notes` and
   `candidate_notes` — which is canonical for the governed runtime?
5. Are `workspaces` and `organizations` the same tenant concept, or is `workspaces`
   the sub-tenant inside an `organization`? Current code aliases
   `workspace_id := organization_id` in `src/app/api/notes/route.ts:200`.

---

## 8. Audit Provenance

- Files scanned: 60 TypeScript/TSX files under `src/`, 1 contract JSON
  (`src/db/contract/db_contract.json`), 1 OpenAPI spec, 1 README, scripts.
- Methodology: directory walk → grep for `supabase.from`, `useCreate|useUpdate|useDelete`,
  `Intent|routeAction|DecisionEnvelope|PolicyGate|EventSpine|Projection|MasterShell|LAWRENCE`
  → manual inspection of representative pages, the typed API layer, generated hooks,
  and every API route.
- No application files were modified by this audit.
