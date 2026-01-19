// Audit API Route - HARDENED
// GET audit_log records for a specific entity with strict validation

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/db/supabaseAdmin';
import { requireOrgContext, successResponse, errorResponse } from '@/server/orgScope';
import { 
  assertAllowedEntity, 
  assertUuid, 
  getAuditSupport 
} from '@/server/contractAllowlist';

export async function GET(request: NextRequest) {
  try {
    // 1. Require org context (NEVER from client input)
    const ctx = await requireOrgContext();
    if (!ctx) {
      return NextResponse.json(
        errorResponse('UNAUTHORIZED', 'Organization context required'),
        { status: 401 }
      );
    }

    // 2. Parse and validate query params
    const { searchParams } = new URL(request.url);
    const entityTable = searchParams.get('table_name') || searchParams.get('entityTable');
    const recordId = searchParams.get('record_id') || searchParams.get('entityId');
    const limitParam = searchParams.get('limit');
    const limit = Math.min(parseInt(limitParam || '100', 10), 200); // Cap at 200

    // 3. Validate inputs against allowlist
    if (!entityTable) {
      return NextResponse.json(
        errorResponse('BAD_REQUEST', 'table_name is required'),
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

    if (!recordId) {
      return NextResponse.json(
        errorResponse('BAD_REQUEST', 'record_id is required'),
        { status: 400 }
      );
    }

    try {
      assertUuid(recordId, 'record_id');
    } catch (e) {
      return NextResponse.json(
        errorResponse('BAD_REQUEST', (e as Error).message),
        { status: 400 }
      );
    }

    // 4. Check contract support
    const support = getAuditSupport();
    if (!support.tableName) {
      return NextResponse.json(
        errorResponse('NOT_IMPLEMENTED', 'No audit_log table found in contract'),
        { status: 501 }
      );
    }

    if (!support.hasTableName || !support.hasRecordId) {
      return NextResponse.json(
        errorResponse('NOT_IMPLEMENTED', 'audit_log table lacks table_name/record_id in contract'),
        { status: 501 }
      );
    }

    // 5. Build query with org isolation
    let query = supabaseAdmin
      .from(support.tableName)
      .select('*')
      .eq('table_name', entityTable)
      .eq('record_id', recordId)
      .order('created_at', { ascending: false })
      .limit(limit);

    // Enforce org scope if contract supports it
    if (support.hasOrgId) {
      query = query.eq('organization_id', ctx.organizationId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Audit query error:', error);
      return NextResponse.json(
        errorResponse('DB_ERROR', 'Database query failed'),
        { status: 500 }
      );
    }

    return NextResponse.json(successResponse(data || []));
  } catch (err) {
    console.error('Audit route error:', err);
    return NextResponse.json(
      errorResponse('INTERNAL_ERROR', 'Internal server error'),
      { status: 500 }
    );
  }
}
