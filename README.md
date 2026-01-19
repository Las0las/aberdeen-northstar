# Aberdeen Northstar

A comprehensive recruitment management platform built with Next.js 14, Supabase, and TypeScript.

## Architecture

- **Database-First**: `db_contract.json` is the single source of truth
- **Multi-Tenant**: Organization-scoped data with RLS enforcement
- **Type-Safe**: End-to-end TypeScript with generated types from contract

## Tech Stack

- Next.js 14 (App Router)
- Supabase (PostgreSQL + Auth + RLS)
- TypeScript (strict mode)
- React Query (TanStack Query)
- Tailwind CSS
- Zod (schema validation)

## Entities (17 Total)

All entities are 360-complete with list pages, detail pages, and Entity360Tabs:

| Entity | List | Detail | 360 Tabs |
|--------|------|--------|----------|
| Applications | ✅ | ✅ | ✅ |
| Bench | ✅ | ✅ | ✅ |
| Candidates | ✅ | ✅ | ✅ |
| Clients | ✅ | ✅ | ✅ |
| Companies | ✅ | ✅ | ✅ |
| Contacts | ✅ | ✅ | ✅ |
| Interviews | ✅ | ✅ | ✅ |
| Jobs | ✅ | ✅ | ✅ |
| Offers | ✅ | ✅ | ✅ |
| Organizations | ✅ | ✅ | ✅ |
| Placements | ✅ | ✅ | ✅ |
| Reports | ✅ | ✅ | ✅ |
| Roles | ✅ | ✅ | ✅ |
| Submissions | ✅ | ✅ | ✅ |
| Tasks | ✅ | ✅ | ✅ |
| Teams | ✅ | ✅ | ✅ |
| Users | ✅ | ✅ | ✅ |

## Entity360Tabs

Each detail page includes 5 tabs:

1. **Overview** - Entity-specific details
2. **Activity** - Timeline from `activities` table (polymorphic)
3. **Notes** - CRUD notes (candidates/applications only per contract)
4. **Related** - Contract-driven FK relationships
5. **Audit** - Compliance trail from `audit_log` table

### Notes Support (Contract-Driven)

Per `db_contract.json`, the `notes` table has:
- `candidate_id` (NOT NULL) - required for all notes
- `application_id` (nullable) - optional

Therefore:
- **Candidates**: Full notes support
- **Applications**: Full notes support (server looks up `candidate_id` automatically)
- **All other entities**: Not supported by schema (UI displays truthful message)

## API Routes

Server-side routes using service role (bypasses RLS safely):

| Route | Methods | Purpose |
|-------|---------|---------|
| `/api/activities` | GET | Activity timeline for any entity |
| `/api/audit` | GET | Audit log for any entity |
| `/api/notes` | GET, POST | Notes CRUD (candidates/applications) |
| `/api/notes/[id]` | PATCH, DELETE | Single note operations |
| `/api/related` | GET | Contract-driven FK relationships |

All routes enforce:
- Organization scope (never from client input)
- Entity allowlist validation
- UUID validation
- Contract-driven behavior

## Setup

### Prerequisites

- Node.js 18+
- Supabase project with schema deployed

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Required variables:

```env
# Client-side (public)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Server-side only
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Dev auth bypass (local development only)
NEXT_PUBLIC_DEV_AUTH_BYPASS=true
NEXT_PUBLIC_DEV_USER_ID=00000000-0000-0000-0000-000000000001
NEXT_PUBLIC_DEV_USER_EMAIL=dev@localhost
NEXT_PUBLIC_DEV_ORGANIZATION_ID=00000000-0000-0000-0000-000000000001
```

### Install & Run

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

### Type Check

```bash
npm run type-check
```

## Project Structure

```
src/
├── app/
│   ├── (dashboard)/
│   │   └── dashboard/
│   │       └── [entity]/        # 17 entity routes
│   │           ├── page.tsx     # List page
│   │           └── [id]/
│   │               └── page.tsx # Detail page with Entity360Tabs
│   └── api/
│       ├── activities/
│       ├── audit/
│       ├── notes/
│       └── related/
├── components/
│   ├── entities/
│   │   └── Entity360Tabs.tsx    # Shared 360 tabs component
│   └── ui/                      # UI primitives
├── db/
│   ├── contract/
│   │   └── db_contract.json     # Authoritative schema
│   ├── orgScope.ts
│   └── supabaseAdmin.ts         # Service role client (server-only)
├── hooks/
│   └── generated.ts             # React Query hooks
├── server/
│   ├── contractAllowlist.ts     # Validation from contract
│   └── orgScope.ts              # Org context enforcement
├── types/
│   └── database.types.ts        # Generated from contract
└── lib/
    └── supabase.ts              # Client-side Supabase
```

## Security

- RLS enforced at database level
- Service role key never exposed to client
- Organization ID derived server-side only
- All inputs validated against contract allowlists
- UUID validation on all ID parameters

## License

Proprietary - All rights reserved
