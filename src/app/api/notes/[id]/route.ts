// Notes [id] API Route - HARDENED
// PATCH (update) and DELETE with strict validation and org isolation

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/db/supabaseAdmin';
import { requireOrgContext, assertOrgScope, successResponse, errorResponse } from '@/server/orgScope';
import { assertUuid } from '@/server/contractAllowlist';
import { checkRateLimit, rateLimitHeaders, RATE_LIMITS } from '@/server/rateLimit';
import { logger, errorMeta } from '@/server/logger';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// Type for note record
interface NoteRecord {
  id: string;
  organization_id: string;
  [key: string]: unknown;
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const rl = checkRateLimit(request, 'notes:patch', RATE_LIMITS.write);
    if (!rl.allowed) {
      return NextResponse.json(
        errorResponse('RATE_LIMITED', 'Too many requests'),
        { status: 429, headers: rateLimitHeaders(rl) }
      );
    }

    // 1. Require org context
    const ctx = await requireOrgContext();
    if (!ctx) {
      return NextResponse.json(
        errorResponse('UNAUTHORIZED', 'Organization context required'),
        { status: 401, headers: rateLimitHeaders(rl) }
      );
    }

    // 2. Validate note ID
    const { id } = await context.params;
    
    try {
      assertUuid(id, 'note id');
    } catch (e) {
      return NextResponse.json(
        errorResponse('BAD_REQUEST', (e as Error).message),
        { status: 400 }
      );
    }

    // 3. Parse body
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        errorResponse('BAD_REQUEST', 'Invalid JSON body'),
        { status: 400 }
      );
    }

    // 4. Fetch existing note and verify org scope
    const { data: existingData, error: fetchError } = await supabaseAdmin
      .from('notes')
      .select('organization_id')
      .eq('id', id)
      .single();
    
    const existing = existingData as NoteRecord | null;

    if (fetchError || !existing) {
      return NextResponse.json(
        errorResponse('NOT_FOUND', 'Note not found'),
        { status: 404 }
      );
    }

    // 5. Enforce org scope
    try {
      assertOrgScope(existing.organization_id, ctx.organizationId);
    } catch {
      return NextResponse.json(
        errorResponse('FORBIDDEN', 'Access denied'),
        { status: 403 }
      );
    }

    // 6. Build update data (only allowed fields per contract)
    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    // Only update fields that exist in contract and are provided
    if (body.title !== undefined) {
      updateData.title = typeof body.title === 'string' ? body.title.trim() || null : null;
    }
    if (body.content !== undefined) {
      if (typeof body.content !== 'string' || body.content.trim().length === 0) {
        return NextResponse.json(
          errorResponse('BAD_REQUEST', 'content must be a non-empty string'),
          { status: 400 }
        );
      }
      updateData.content = body.content.trim();
    }
    if (body.note_type !== undefined) {
      updateData.note_type = body.note_type;
    }
    if (body.is_internal !== undefined) {
      updateData.is_internal = !!body.is_internal;
    }

    // 7. Update — filter by org_id as well as id so a bug in assertOrgScope
    // can't lead to cross-tenant writes (defense in depth against the
    // service-role client bypassing RLS).
    const { data, error } = await supabaseAdmin
      .from('notes')
      .update(updateData as never)
      .eq('id', id)
      .eq('organization_id', ctx.organizationId)
      .select()
      .single();

    if (error) {
      logger.error('notes update failed', { route: 'notes/[id]', code: error.code });
      return NextResponse.json(
        errorResponse('DB_ERROR', 'Database update failed'),
        { status: 500 }
      );
    }

    return NextResponse.json(successResponse(data));
  } catch (err) {
    logger.error('notes PATCH exception', errorMeta(err, { route: 'notes/[id]', method: 'PATCH' }));
    return NextResponse.json(
      errorResponse('INTERNAL_ERROR', 'Internal server error'),
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const rl = checkRateLimit(request, 'notes:delete', RATE_LIMITS.write);
    if (!rl.allowed) {
      return NextResponse.json(
        errorResponse('RATE_LIMITED', 'Too many requests'),
        { status: 429, headers: rateLimitHeaders(rl) }
      );
    }

    // 1. Require org context
    const ctx = await requireOrgContext();
    if (!ctx) {
      return NextResponse.json(
        errorResponse('UNAUTHORIZED', 'Organization context required'),
        { status: 401, headers: rateLimitHeaders(rl) }
      );
    }

    // 2. Validate note ID
    const { id } = await context.params;
    
    try {
      assertUuid(id, 'note id');
    } catch (e) {
      return NextResponse.json(
        errorResponse('BAD_REQUEST', (e as Error).message),
        { status: 400 }
      );
    }

    // 3. Fetch existing note and verify org scope
    const { data: existingData, error: fetchError } = await supabaseAdmin
      .from('notes')
      .select('organization_id')
      .eq('id', id)
      .single();
    
    const existing = existingData as NoteRecord | null;

    if (fetchError || !existing) {
      return NextResponse.json(
        errorResponse('NOT_FOUND', 'Note not found'),
        { status: 404 }
      );
    }

    // 4. Enforce org scope
    try {
      assertOrgScope(existing.organization_id, ctx.organizationId);
    } catch {
      return NextResponse.json(
        errorResponse('FORBIDDEN', 'Access denied'),
        { status: 403 }
      );
    }

    // 5. Delete — filter by org_id too (see PATCH for rationale).
    const { error } = await supabaseAdmin
      .from('notes')
      .delete()
      .eq('id', id)
      .eq('organization_id', ctx.organizationId);

    if (error) {
      logger.error('notes delete failed', { route: 'notes/[id]', code: error.code });
      return NextResponse.json(
        errorResponse('DB_ERROR', 'Database delete failed'),
        { status: 500 }
      );
    }

    return NextResponse.json(successResponse({ deleted: true }));
  } catch (err) {
    logger.error('notes DELETE exception', errorMeta(err, { route: 'notes/[id]', method: 'DELETE' }));
    return NextResponse.json(
      errorResponse('INTERNAL_ERROR', 'Internal server error'),
      { status: 500 }
    );
  }
}
