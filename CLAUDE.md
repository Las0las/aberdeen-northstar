# CLAUDE.md

Guidance for AI assistants working in the **Aberdeen Northstar** repository.

## What this project is

A multi-tenant recruitment management platform built with Next.js 14 (App Router), Supabase (Postgres + RLS), and TypeScript (strict). Version `1.0.0-360complete`. 17 core entities each have a list page, detail page, and a shared `Entity360Tabs` component (Overview / Activity / Notes / Related / Audit).

## Core architectural rule: contract is truth

`src/db/contract/db_contract.json` is the **single source of truth** for the database schema. The rule is: *if it's not in the contract, it does not exist*.

Several files are **generated** from the contract and must not be edited by hand:

| File | Purpose | Regenerate with |
| --- | --- | --- |
| `src/types/database.types.ts` | TypeScript table types (`Database['public']['Tables']`) | `npm run generate:types` |
| `src/schemas/index.ts` | Zod schemas | `npm run generate:types` |
| `src/api/typed/index.ts` | Typed Supabase API layer + `ORG_SCOPED_TABLES` set | `npm run generate:api` |
| `src/hooks/generated.ts` | React Query hooks + `queryKeys` factory | `npm run generate:hooks` |
| `src/openapi/spec.json` | OpenAPI spec | `npm run generate:openapi` |
| `src/ai/tools/generated/{index.ts,tools.json}` | AI tool definitions | `npm run generate:ai-tools` |

Run them all with `npm run generate`. After editing `db_contract.json`, **always** regenerate before committing.

Server-side validators read the contract directly at runtime — see `src/db/orgScope.ts` (derives org-scoped tables) and `src/server/contractAllowlist.ts` (entity allowlist, UUID checks, `getNotesSupport`, `getActivitiesSupport`, `getAuditSupport`).

## Multi-tenancy and security

- **Org scope is derived server-side only.** `requireOrgContext()` in `src/server/orgScope.ts` reads `x-verified-organization-id` headers (set by auth middleware) or `organization_id` cookies — **never** from query params or request body. Never accept `organization_id` from client input.
- `assertOrgScope(record.organization_id, ctx.organizationId)` enforces tenant isolation when reading records by id.
- The 17 entity tables are gated by `ALLOWED_ENTITY_TABLES` in `contractAllowlist.ts`. New API routes that take an `entity_type` must call `assertAllowedEntity()`.
- All UUID inputs go through `assertUuid()` (regex-validated).
- The service-role client (`src/db/supabaseAdmin.ts`) bypasses RLS and is **server-only**. Never import it from a `'use client'` file.
- Browser code uses `src/lib/supabase.ts` with the anon key; RLS enforces tenant isolation.

## API response envelope

All API routes return the envelope from `src/server/orgScope.ts`:

```ts
{ ok: true, data, meta? }                       // successResponse
{ ok: false, error: { code, message, details? } } // errorResponse
```

Standard error codes used in routes: `UNAUTHORIZED`, `BAD_REQUEST`, `FORBIDDEN`, `NOT_FOUND`, `NOT_SUPPORTED`, `DB_ERROR`, `INTERNAL_ERROR`.

## API routes (`src/app/api/`)

| Route | Methods | Purpose |
| --- | --- | --- |
| `/api/activities` | GET | Polymorphic activity timeline (`entity_type` + `entity_id`) |
| `/api/audit` | GET | Audit log (`audit_log` or `audit_logs`, see `getAuditSupport`) |
| `/api/notes` | GET, POST | Notes CRUD |
| `/api/notes/[id]` | PATCH, DELETE | Single-note operations |
| `/api/related` | GET | Contract-driven FK relationships |

**Notes are contract-restricted.** Per `db_contract.json`, `notes.candidate_id` is `NOT NULL` and `notes.application_id` is nullable. Therefore:

- `entity_type=candidates` → direct write, `candidate_id = entity_id`.
- `entity_type=applications` → server looks up `candidate_id` from the application row, then writes `candidate_id` and `application_id`.
- Any other entity → return `successResponse([], { supported: false, reason })` on GET, `NOT_SUPPORTED` on POST.

Do not "extend" notes to other entities by adding polymorphic columns in code — change the contract first.

## Frontend conventions

- **App Router** under `src/app/`. Dashboard routes live under `src/app/(dashboard)/dashboard/[entity]/{page.tsx,[id]/page.tsx}`. The 19 entries in `src/app/(dashboard)/layout.tsx` define sidebar navigation.
- Detail pages render `<Entity360Tabs>` (`src/components/entities/Entity360Tabs.tsx`) for the five tabs. Pass `relatedEntities` for the Related tab.
- Pages that read auth/org are marked `export const dynamic = 'force-dynamic'` and `'use client'`.
- Data fetching uses generated React Query hooks: `useCandidates`, `useCandidate`, `useCreateCandidate`, `useDeleteCandidate`, `useNotesByCandidate`, etc. Import from `@/hooks` (re-exports `./generated`). Use the `queryKeys` factory for invalidation.
- UI primitives live in `src/components/ui/index.tsx` (Radix + Tailwind, single barrel export). Common helpers: `formatDate`, `getStatusColor`, `cn` from `@/utils/helpers`.
- Path alias: `@/*` → `./src/*` (and `@/contracts/*` → `./contracts/*`). Always use these instead of relative paths across `src/`.

## Auth & dev bypass

`src/config/devAuth.ts` enables a dev-only auth bypass when **both** `NODE_ENV=development` and `NEXT_PUBLIC_DEV_AUTH_BYPASS=true`. The bypass injects `NEXT_PUBLIC_DEV_USER_ID`, `NEXT_PUBLIC_DEV_USER_EMAIL`, `NEXT_PUBLIC_DEV_ORGANIZATION_ID` as the session. The dashboard sidebar shows a "DEV BYPASS MODE" badge and a `/__dev/validate` link when active. Production builds always use real Supabase auth — do not weaken the gating.

## Commands

```bash
npm install
npm run dev              # Next dev server
npm run build            # Production build (output: standalone)
npm run start            # Run built app
npm run lint             # next lint (extends next/core-web-vitals)
npm run type-check       # tsc --noEmit (strict)
npm run generate         # Regenerate ALL files from db_contract.json
npm run dev:validate     # ts-node scripts/dev-validate.ts — probe live Supabase per module
```

`npm run dev:validate` reads `.env.local` and reports list/fetch status for each of the 17 core tables, scoped by `NEXT_PUBLIC_DEV_ORGANIZATION_ID`. Use it after schema changes to confirm the contract matches the live database.

## Project layout

```
src/
├── app/
│   ├── (dashboard)/dashboard/[entity]/   # 17 entity routes (list + [id] detail)
│   ├── api/{activities,audit,notes,related}/route.ts
│   ├── __dev/validate/                   # dev-only validation page
│   ├── login/                            # auth
│   └── layout.tsx, page.tsx, providers.tsx
├── components/
│   ├── entities/Entity360Tabs.tsx        # the 5-tab detail shell
│   └── ui/index.tsx                      # Radix + Tailwind primitives
├── db/
│   ├── contract/db_contract.json         # SOURCE OF TRUTH
│   ├── orgScope.ts                       # tableHasOrg, applyOrgScope
│   └── supabaseAdmin.ts                  # service role (server-only)
├── server/
│   ├── orgScope.ts                       # requireOrgContext, response envelope
│   └── contractAllowlist.ts              # entity allowlist, UUID, notes/activities/audit support
├── api/typed/index.ts                    # GENERATED typed API layer
├── hooks/{index.ts,generated.ts}         # GENERATED React Query hooks
├── types/database.types.ts               # GENERATED types
├── schemas/index.ts                      # GENERATED Zod schemas
├── openapi/spec.json                     # GENERATED OpenAPI
├── ai/tools/generated/                   # GENERATED AI tool defs
├── config/devAuth.ts
├── lib/supabase.ts                       # browser client + org helpers
└── utils/helpers.ts                      # cn, formatDate, getStatusColor
scripts/
├── generate-from-contract.js             # types + zod
├── generate-typed-api.js                 # api/typed
├── generate-hooks.js                     # hooks/generated
├── generate-openapi.js                   # openapi/spec.json
├── generate-ai-tools.js                  # ai/tools/generated
├── dev-validate.ts                       # live DB probe
└── curl-validate.sh
```

## Conventions for changes

- **Schema change?** Update `db_contract.json` first, then run `npm run generate`, then update server validators / UI as needed. Run `npm run type-check` and (with creds) `npm run dev:validate`.
- **New entity 360 tab data?** Read column existence from the contract via `getActivitiesSupport`/`getAuditSupport`/`getNotesSupport` rather than hard-coding. Return `{ supported: false, reason }` truthfully when the contract doesn't back the feature.
- **New API route?** Use `requireOrgContext()`, `assertAllowedEntity()`, `assertUuid()`, the `successResponse`/`errorResponse` envelope, and the service-role client only on the server.
- **Don't edit generated files.** They start with `// AUTO-GENERATED - DO NOT EDIT`. Change the generator or the contract instead.
- **Don't introduce `organization_id` from client input** — it must come from `requireOrgContext()`.
- TypeScript is `strict`; prefer the generated `Database['public']['Tables'][T]['Row' | 'Insert' | 'Update']` types over `any`.
