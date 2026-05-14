import { describe, it, expect } from 'vitest';
import {
  ontologyRegistry,
  isRegisteredDomain,
  isRegisteredEntity,
  isRegisteredRelationship,
  isRegisteredState,
  isRegisteredTransition,
  isRegisteredVerb,
  snapshotRegistry,
} from '@/server/runtime/ontology/ontologyRegistry';

describe('ontologyRegistry', () => {
  it('exposes a versioned registry catalog', () => {
    expect(ontologyRegistry.version).toBe('1.0.0');
    expect(ontologyRegistry.domains).toContain('worker');
    expect(ontologyRegistry.relationships).toContain('WORKS_FOR');
    expect(ontologyRegistry.verbs).toContain('APPROVE');
    expect(ontologyRegistry.stateMachines).toEqual([
      'requisition',
      'candidate',
      'engagement',
    ]);
  });

  it('rejects unregistered domains and subtypes', () => {
    expect(isRegisteredDomain('worker')).toBe(true);
    expect(isRegisteredDomain('mythical')).toBe(false);
    expect(isRegisteredEntity('worker', 'employee')).toBe(true);
    expect(isRegisteredEntity('worker', 'ghost')).toBe(false);
    expect(isRegisteredEntity('mythical', 'employee')).toBe(false);
  });

  it('registers all execution states and rejects free-form values', () => {
    expect(isRegisteredState('requisition', 'DRAFT')).toBe(true);
    expect(isRegisteredState('candidate', 'PLACED')).toBe(true);
    expect(isRegisteredState('engagement', 'EXTENDED')).toBe(true);
    expect(isRegisteredState('requisition', 'NEW')).toBe(false);
  });

  it('admits only legal canonical transitions', () => {
    expect(isRegisteredTransition('requisition', 'DRAFT', 'QUALIFIED')).toBe(true);
    expect(isRegisteredTransition('requisition', 'DRAFT', 'FILLED')).toBe(false);
    expect(isRegisteredTransition('candidate', 'OFFERED', 'PLACED')).toBe(true);
    expect(isRegisteredTransition('engagement', 'COMPLETED', 'REDEPLOYMENT_READY')).toBe(
      true,
    );
  });

  it('rejects unregistered verbs and relationships', () => {
    expect(isRegisteredVerb('APPROVE')).toBe(true);
    expect(isRegisteredVerb('YOLO')).toBe(false);
    expect(isRegisteredRelationship('WORKS_FOR')).toBe(true);
    expect(isRegisteredRelationship('TRUSTS')).toBe(false);
  });

  it('produces a deterministic registry snapshot', () => {
    const snap = snapshotRegistry();
    expect(snap.version).toBe('1.0.0');
    expect(Object.isFrozen(snap)).toBe(true);
    expect(snap.entities.length).toBeGreaterThan(0);
    expect(snap.relationships.length).toBe(13);
  });
});
