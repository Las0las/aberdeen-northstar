// Notes API Route - HARDENED with CONTRACT TRUTH
// GET (list) and POST (create) with strict validation
// Notes ONLY support candidates (required) and applications (optional) per db_contract.json
// candidate_id is NOT NULL per contract - for applications, we lookup candidate_id server-side

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/db/supabaseAdmin';
import { requireOrgContext, successResponse, errorResponse } from '@/server/orgScope';
import { 
  assertAllowedEntity, 
  assertUuid, 
  getNotesSupport
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
    const entityTable = searchParams.get('entity_type') || searchParams.get('entityTable');
    const entityId = searchParams.get('entity_id') || searchParams.get('entityId');
    const limitParam = searchParams.get('limit');
    const limit = Math.min(parseInt(limitParam || '50', 10), 100);

    // 3. Validate entity table
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

    // 4. Validate entity ID
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

    // 5. Check NOTES TRUTH from contract
    const support = getNotesSupport(entityTable);
    
    if (!support.supported) {
      // Return empty with meta explaining contract limitation
      return NextResponse.json(
        successResponse([], { 
          supported: false, 
          reason: support.reason 
        })
      );
    }

    // 6. Build query based on contract FK
    let query = supabaseAdmin
      .from('notes')
      .select('*')
      .eq('organization_id', ctx.organizationId)
      .order('created_at', { ascending: false })
      .limit(limit);

    // Apply correct FK filter based on entity type
    if (entityTable === 'candidates') {
      query = query.eq('candidate_id', entityId);
    } else if (entityTable === 'applications') {
      query = query.eq('application_id', entityId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Notes query error:', error);
      return NextResponse.json(
        errorResponse('DB_ERROR', 'Database query failed'),
        { status: 500 }
      );
    }

    return NextResponse.json(
      successResponse(data || [], { supported: true })
    );
  } catch (err) {
    console.error('Notes GET error:', err);
    return NextResponse.json(
      errorResponse('INTERNAL_ERROR', 'Internal server error'),
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // 1. Require org context
    const ctx = await requireOrgContext();
    if (!ctx) {
      return NextResponse.json(
        errorResponse('UNAUTHORIZED', 'Organization context required'),
        { status: 401 }
      );
    }

    // 2. Parse body
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        errorResponse('BAD_REQUEST', 'Invalid JSON body'),
        { status: 400 }
      );
    }

    const entityTable = body.entity_type as string | undefined;
    const entityId = body.entity_id as string | undefined;
    const content = body.content as string | undefined;
    const title = body.title as string | undefined;
    const noteType = body.note_type as string | undefined;
    const isInternal = body.is_internal as boolean | undefined;

    // 3. Validate required fields
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

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json(
        errorResponse('BAD_REQUEST', 'content is required and must be non-empty'),
        { status: 400 }
      );
    }

    // 4. Check NOTES TRUTH
    const support = getNotesSupport(entityTable);
    
    if (!support.supported) {
      return NextResponse.json(
        errorResponse('NOT_SUPPORTED', support.reason, 
          'Notes are only supported for candidates and applications per database contract'),
        { status: 400 }
      );
    }

    // 5. Build insert data per contract
    const insertData: Record<string, unknown> = {
      organization_id: ctx.organizationId,
      workspace_id: ctx.organizationId, // Use org as workspace
      content: content.trim(),
      title: title?.trim() || null,
      note_type: noteType || 'general',
      is_internal: isInternal ?? true,
      created_by: ctx.actorUserId,
    };

    // 6. Handle candidate_id requirement (NOT NULL in contract)
    if (entityTable === 'candidates') {
      // Direct: entity_id IS the candidate_id
      insertData.candidate_id = entityId;
    } else if (entityTable === 'applications') {
      // Server-side lookup: get candidate_id from the application record
      const { data: appData, error: appError } = await supabaseAdmin
        .from('applications')
        .select('candidate_id')
        .eq('id', entityId)
        .eq('organization_id', ctx.organizationId)
        .single();

      if (appError || !appData) {
        return NextResponse.json(
          errorResponse('NOT_FOUND', 'Application not found or access denied'),
          { status: 404 }
        );
      }

      const appRecord = appData as { candidate_id: string | null };

      if (!appRecord.candidate_id) {
        return NextResponse.json(
          errorResponse('BAD_REQUEST', 
            'Application has no associated candidate',
            'The notes table requires candidate_id (NOT NULL). This application has no candidate linked.'),
          { status: 400 }
        );
      }

      insertData.candidate_id = appRecord.candidate_id;
      insertData.application_id = entityId;
    }

    // 7. Insert
    const { data, error } = await supabaseAdmin
      .from('notes')
      .insert(insertData as never)
      .select()
      .single();

    if (error) {
      console.error('Notes insert error:', error);
      return NextResponse.json(
        errorResponse('DB_ERROR', error.message),
        { status: 500 }
      );
    }

    return NextResponse.json(successResponse(data), { status: 201 });
  } catch (err) {
    console.error('Notes POST error:', err);
    return NextResponse.json(
      errorResponse('INTERNAL_ERROR', 'Internal server error'),
      { status: 500 }
    );
  }
}
