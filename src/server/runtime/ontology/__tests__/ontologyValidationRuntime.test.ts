import { describe, it, expect } from 'vitest';
import {
  semanticIntegrityGate,
  ontologyConsistencyGate,
  relationshipLegalityGate,
  canonicalAuthorityGate,
  recordOntologyDecision,
  POLICY_GATES,
  ONTOLOGY_EVENT_TAXONOMY,
} from '@/server/runtime/ontology/ontologyValidationRuntime';

const validTemporal = {
  effective_at: '2026-01-01T00:00:00Z',
  recorded_at: '2026-01-01T00:00:00Z',
  superseded_at: null,
  authority_window_start: '2026-01-01T00:00:00Z',
  authority_window_end: null,
};

describe('ontologyValidationRuntime — constitutional surface', () => {
  it('declares exactly the four constitutional policy gates', () => {
    expect(POLICY_GATES).toEqual([
      'SemanticIntegrityGate',
      'OntologyConsistencyGate',
      'RelationshipLegalityGate',
      'CanonicalAuthorityGate',
    ]);
  });

  it('declares the canonical ontology event taxonomy', () => {
    expect(ONTOLOGY_EVENT_TAXONOMY).toEqual([
      'ONTOLOGY_REGISTERED',
      'SEMANTIC_MAPPING_CREATED',
      'ONTOLOGY_CONFLICT_DETECTED',
      'RELATIONSHIP_RULE_VIOLATION',
      'CANONICAL_ENTITY_RESOLVED',
    ]);
  });
});

describe('SemanticIntegrityGate', () => {
  it('admits a registered verb with a valid temporal envelope', () => {
    const r = semanticIntegrityGate({ verb: 'APPROVE', temporal: validTemporal });
    expect(r.admitted).toBe(true);
  });

  it('rejects unregistered verbs', () => {
    const r = semanticIntegrityGate({ verb: 'YOLO', temporal: validTemporal });
    expect(r.admitted).toBe(false);
    if (!r.admitted) expect(r.gate).toBe('SemanticIntegrityGate');
  });

  it('fails closed on missing temporal envelope fields', () => {
    const r = semanticIntegrityGate({ verb: 'APPROVE', temporal: {} });
    expect(r.admitted).toBe(false);
  });

  it('rejects an inverted authority window', () => {
    const r = semanticIntegrityGate({
      verb: 'APPROVE',
      temporal: {
        ...validTemporal,
        authority_window_start: '2026-06-01T00:00:00Z',
        authority_window_end: '2026-01-01T00:00:00Z',
      },
    });
    expect(r.admitted).toBe(false);
  });
});

describe('OntologyConsistencyGate', () => {
  it('admits registered entities', () => {
    const r = ontologyConsistencyGate({
      entity: { domain: 'worker', subtype: 'employee' },
    });
    expect(r.admitted).toBe(true);
  });

  it('rejects unregistered entities', () => {
    const r = ontologyConsistencyGate({
      entity: { domain: 'worker', subtype: 'ghost' },
    });
    expect(r.admitted).toBe(false);
  });

  it('rejects unregistered state values when a state machine is supplied', () => {
    const r = ontologyConsistencyGate({
      entity: { domain: 'execution', subtype: 'requisition' },
      stateMachine: 'requisition',
      state: 'BANANA',
    });
    expect(r.admitted).toBe(false);
  });
});

describe('RelationshipLegalityGate', () => {
  it('admits WORKS_FOR from worker to organization', () => {
    const r = relationshipLegalityGate({
      verb: 'WORKS_FOR',
      fromDomain: 'worker',
      toDomain: 'organization',
    });
    expect(r.admitted).toBe(true);
  });

  it('rejects WORKS_FOR with reversed endpoints', () => {
    const r = relationshipLegalityGate({
      verb: 'WORKS_FOR',
      fromDomain: 'organization',
      toDomain: 'worker',
    });
    expect(r.admitted).toBe(false);
  });

  it('rejects an unregistered relationship verb', () => {
    const r = relationshipLegalityGate({
      verb: 'TRUSTS',
      fromDomain: 'worker',
      toDomain: 'organization',
    });
    expect(r.admitted).toBe(false);
  });

  it('rejects illegal candidate transitions', () => {
    const r = relationshipLegalityGate({
      verb: 'SUPERSEDES',
      fromDomain: 'execution',
      toDomain: 'execution',
      transition: { machine: 'candidate', from: 'SOURCED', to: 'PLACED' },
    });
    expect(r.admitted).toBe(false);
  });
});

describe('CanonicalAuthorityGate', () => {
  it('admits human authority for a mutating verb', () => {
    const r = canonicalAuthorityGate({
      authorityType: 'HUMAN_AUTHORITY',
      verb: 'APPROVE',
      principalId: 'user-1',
    });
    expect(r.admitted).toBe(true);
  });

  it('refuses AI advisory authority any mutating verb', () => {
    const r = canonicalAuthorityGate({
      authorityType: 'AI_ADVISORY_AUTHORITY',
      verb: 'APPROVE',
      principalId: 'ai-1',
    });
    expect(r.admitted).toBe(false);
  });

  it('admits AI advisory authority for non-mutating verbs (REPLAY, SIMULATE)', () => {
    expect(
      canonicalAuthorityGate({
        authorityType: 'AI_ADVISORY_AUTHORITY',
        verb: 'SIMULATE',
        principalId: 'ai-1',
      }).admitted,
    ).toBe(true);
    expect(
      canonicalAuthorityGate({
        authorityType: 'AI_ADVISORY_AUTHORITY',
        verb: 'REPLAY',
        principalId: 'ai-1',
      }).admitted,
    ).toBe(true);
  });

  it('requires delegated authority to declare its provenance', () => {
    const r = canonicalAuthorityGate({
      authorityType: 'DELEGATED_AUTHORITY',
      verb: 'APPROVE',
      principalId: 'user-2',
    });
    expect(r.admitted).toBe(false);
  });
});

describe('recordOntologyDecision', () => {
  it('emits CANONICAL_ENTITY_RESOLVED when admitted', () => {
    const d = recordOntologyDecision(
      { admitted: true },
      'CANONICAL_ENTITY_RESOLVED',
    );
    expect(d).toEqual({
      event: 'CANONICAL_ENTITY_RESOLVED',
      gate: null,
      admitted: true,
      reason: null,
    });
  });

  it('emits ONTOLOGY_CONFLICT_DETECTED on rejection by default', () => {
    const d = recordOntologyDecision(
      {
        admitted: false,
        gate: 'OntologyConsistencyGate',
        reason: 'unregistered_entity: worker:ghost',
      },
      'CANONICAL_ENTITY_RESOLVED',
    );
    expect(d.admitted).toBe(false);
    expect(d.event).toBe('ONTOLOGY_CONFLICT_DETECTED');
    expect(d.gate).toBe('OntologyConsistencyGate');
  });
});
