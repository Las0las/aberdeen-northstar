// Activities API Route - HARDENED
// GET activities for a specific entity with strict validation and org isolation

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/db/supabaseAdmin';
import { requireOrgContext, successResponse, errorResponse } from '@/server/orgScope';
import {
  assertAllowedEntity,
  assertUuid,
  getActivitiesSupport
} from '@/server/contractAllowlist';
import { checkRateLimit, rateLimitHeaders, RATE_LIMITS } from '@/server/rateLimit';

export async function GET(request: NextRequest) {
  try {
    // 0. Rate limit before any DB work.
    const rl = checkRateLimit(request, 'activities:get', RATE_LIMITS.read);
    if (!rl.allowed) {
      return NextResponse.json(
        errorResponse('RATE_LIMITED', 'Too many requests'),
        { status: 429, headers: rateLimitHeaders(rl) }
      );
    }

    // 1. Require org context (NEVER from client input)
    const ctx = await requireOrgContext();
    if (!ctx) {
      return NextResponse.json(
        errorResponse('UNAUTHORIZED', 'Organization context required'),
        { status: 401, headers: rateLimitHeaders(rl) }
      );
    }

    // 2. Parse and validate query params
    const { searchParams } = new URL(request.url);
    const entityTable = searchParams.get('entity_type') || searchParams.get('entityTable');
    const entityId = searchParams.get('entity_id') || searchParams.get('entityId');
    const limitParam = searchParams.get('limit');
    const limit = Math.min(parseInt(limitParam || '50', 10), 100); // Cap at 100

    // 3. Validate inputs against allowlist
    if (!entityTable) {
      return NextResponse.json(
        errorResponse('BAD_REQUEST', 'entity_type is required'),
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
        errorResponse('BAD_REQUEST', 'entity_id is required'),
        { status: 400 }
      );
    }

    try {
      assertUuid(entityId, 'entity_id');
    } catch (e) {
      return NextResponse.json(
        errorResponse('BAD_REQUEST', (e as Error).message),
        { status: 400 }
      );
    }

    // 4. Check contract support
    const support = getActivitiesSupport();
    if (!support.hasEntityType || !support.hasEntityId) {
      return NextResponse.json(
        errorResponse('NOT_IMPLEMENTED', 'activities table lacks entity_type/entity_id in contract'),
        { status: 501 }
      );
    }

    // 5. Build query with org isolation
    let query = supabaseAdmin
      .from('activities')
      .select('*')
      .eq('entity_type', entityTable)
      .eq('entity_id', entityId)
      .order('created_at', { ascending: false })
      .limit(limit);

    // Enforce org scope if contract supports it
    if (support.hasOrgId) {
      query = query.eq('organization_id', ctx.organizationId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Activities query error:', error);
      return NextResponse.json(
        errorResponse('DB_ERROR', 'Database query failed'),
        { status: 500 }
      );
    }

    return NextResponse.json(successResponse(data || []));
  } catch (err) {
    console.error('Activities route error:', err);
    return NextResponse.json(
      errorResponse('INTERNAL_ERROR', 'Internal server error'),
      { status: 500 }
    );
  }
}
