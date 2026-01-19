// Related API Route - HARDENED
// Contract-driven FK relationship queries with strict validation

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/db/supabaseAdmin';
import { requireOrgContext, successResponse, errorResponse } from '@/server/orgScope';
import { assertAllowedEntity, assertUuid, ALLOWED_ENTITY_TABLES } from '@/server/contractAllowlist';
import dbContract from '@/db/contract/db_contract.json';

// Types
interface ContractColumn {
  name: string;
  type: string;
}

interface ContractConstraint {
  name: string;
  type: string;
  column?: string;
  references?: {
    table: string;
    column: string;
  };
}

interface ContractTable {
  table: string;
  schema: string;
  columns: ContractColumn[];
  constraints?: ContractConstraint[];
}

// Tables to exclude from related queries
const EXCLUDED_TABLES = new Set([
  'embeddings',
  'candidate_embeddings',
  'job_embeddings',
  'vector_store',
  'audit_log',
  'audit_logs',
  'webhook_logs',
  'user_sessions',
  'api_logs',
  'error_logs',
  'activities',
  'notes',
]);

// Limits to prevent fan-out
const MAX_RELATED_TABLES = 5;
const MAX_ROWS_PER_TABLE = 25;

// Parse contract
const tables: ContractTable[] = (dbContract as { tables: ContractTable[] }).tables || [];

// Check if table has organization_id
function tableHasOrgId(tableName: string): boolean {
  const table = tables.find(t => t.table === tableName && t.schema === 'public');
  return table?.columns.some(c => c.name === 'organization_id') || false;
}

// Build FK map for a specific table
function getRelationships(tableName: string): {
  outgoing: Array<{ column: string; targetTable: string }>;
  incoming: Array<{ sourceTable: string; sourceColumn: string }>;
} {
  const outgoing: Array<{ column: string; targetTable: string }> = [];
  const incoming: Array<{ sourceTable: string; sourceColumn: string }> = [];

  for (const t of tables) {
    if (t.schema !== 'public') continue;
    
    const constraints = t.constraints || [];
    
    for (const c of constraints) {
      if (c.type !== 'FOREIGN KEY' || !c.column || !c.references) continue;
      
      const targetTable = c.references.table;
      
      // Skip excluded tables
      if (EXCLUDED_TABLES.has(t.table) || EXCLUDED_TABLES.has(targetTable)) continue;
      
      // Only include tables in allowlist
      if (!ALLOWED_ENTITY_TABLES.has(t.table) && !ALLOWED_ENTITY_TABLES.has(targetTable)) continue;

      if (t.table === tableName && ALLOWED_ENTITY_TABLES.has(targetTable)) {
        // Outgoing: this table references another
        outgoing.push({ column: c.column, targetTable });
      }
      
      if (targetTable === tableName && ALLOWED_ENTITY_TABLES.has(t.table)) {
        // Incoming: another table references this table
        incoming.push({ sourceTable: t.table, sourceColumn: c.column });
      }
    }
  }

  return { outgoing, incoming };
}

// Humanize table name
function humanize(tableName: string): string {
  return tableName
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

export async function GET(request: NextRequest) {
  try {
    // 1. Require org context
    const ctx = await requireOrgContext();
    if (!ctx) {
      return NextResponse.json(
        errorResponse('UNAUTHORIZED', 'Organization context required'),
        { status: 401 }
      );
    }

    // 2. Parse and validate params
    const { searchParams } = new URL(request.url);
    const entityTable = searchParams.get('table') || searchParams.get('entityTable');
    const entityId = searchParams.get('id') || searchParams.get('entityId');

    if (!entityTable) {
      return NextResponse.json(
        errorResponse('BAD_REQUEST', 'table is required'),
        { status: 400 }
      );
    }

    try {
      assertAllowedEntity(entityTable);
    } catch (e) {
      return NextResponse.json(
        errorResponse('FORBIDDEN', (e as Error).message),
        { status: 403 }
      );
    }

    if (!entityId) {
      return NextResponse.json(
        errorResponse('BAD_REQUEST', 'id is required'),
        { status: 400 }
      );
    }

    try {
      assertUuid(entityId, 'id');
    } catch (e) {
      return NextResponse.json(
        errorResponse('BAD_REQUEST', (e as Error).message),
        { status: 400 }
      );
    }

    // 3. Fetch base record to get FK values
    const { data: baseRecord, error: baseError } = await supabaseAdmin
      .from(entityTable)
      .select('*')
      .eq('id', entityId)
      .single();

    if (baseError || !baseRecord) {
      return NextResponse.json(
        errorResponse('NOT_FOUND', 'Record not found'),
        { status: 404 }
      );
    }

    // 4. Verify org scope on base record
    const record = baseRecord as Record<string, unknown>;
    if ('organization_id' in record && record.organization_id !== ctx.organizationId) {
      return NextResponse.json(
        errorResponse('FORBIDDEN', 'Access denied'),
        { status: 403 }
      );
    }

    // 5. Get relationships from contract
    const relationships = getRelationships(entityTable);

    const outgoing: Array<{ table: string; label: string; rows: unknown[] }> = [];
    const incoming: Array<{ table: string; label: string; rows: unknown[] }> = [];

    // 6. Fetch outgoing (capped)
    let outgoingCount = 0;
    for (const rel of relationships.outgoing) {
      if (outgoingCount >= MAX_RELATED_TABLES) break;
      
      const fkValue = record[rel.column];
      if (!fkValue) continue;

      try {
        let query = supabaseAdmin
          .from(rel.targetTable)
          .select('*')
          .eq('id', fkValue)
          .limit(1);

        // Apply org filter if target table has org_id
        if (tableHasOrgId(rel.targetTable)) {
          query = query.eq('organization_id', ctx.organizationId);
        }

        const { data } = await query;
        
        if (data && data.length > 0) {
          outgoing.push({
            table: rel.targetTable,
            label: humanize(rel.targetTable),
            rows: data,
          });
          outgoingCount++;
        }
      } catch {
        // Skip on error
      }
    }

    // 7. Fetch incoming (capped)
    let incomingCount = 0;
    for (const rel of relationships.incoming) {
      if (incomingCount >= MAX_RELATED_TABLES) break;

      try {
        let query = supabaseAdmin
          .from(rel.sourceTable)
          .select('*')
          .eq(rel.sourceColumn, entityId)
          .limit(MAX_ROWS_PER_TABLE);

        // Apply org filter if source table has org_id
        if (tableHasOrgId(rel.sourceTable)) {
          query = query.eq('organization_id', ctx.organizationId);
        }

        const { data } = await query;

        if (data && data.length > 0) {
          incoming.push({
            table: rel.sourceTable,
            label: humanize(rel.sourceTable),
            rows: data,
          });
          incomingCount++;
        }
      } catch {
        // Skip on error
      }
    }

    return NextResponse.json(successResponse({ outgoing, incoming }));
  } catch (err) {
    console.error('Related route error:', err);
    return NextResponse.json(
      errorResponse('INTERNAL_ERROR', 'Internal server error'),
      { status: 500 }
    );
  }
}
