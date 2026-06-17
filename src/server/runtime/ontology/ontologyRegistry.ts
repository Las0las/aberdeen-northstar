/**
 * Ontology Registry — runtime catalogue of every canonical primitive.
 *
 * Provides a single read-only lookup surface for runtime modules that need
 * to verify whether a domain/subtype/relationship/state/verb is registered.
 * Registration is closed: only primitives declared in the contracts package
 * are admitted. Free-form registrations are rejected.
 */

import {
  CANONICAL_DOMAINS,
  CANONICAL_ENTITY_REGISTRY,
  CANONICAL_ONTOLOGY_VERSION,
  isCanonicalSubtype,
  type CanonicalDomain,
} from "@/contracts/ontology/canonicalEntityTypes";
import {
  CANONICAL_RELATIONSHIPS,
  CANONICAL_RELATIONSHIP_RULES,
  isCanonicalRelationship,
  type CanonicalRelationship,
} from "@/contracts/ontology/canonicalRelationships";
import {
  CANDIDATE_STATES,
  ENGAGEMENT_STATES,
  REQUISITION_STATES,
  isCandidateState,
  isEngagementState,
  isLegalTransition,
  isRequisitionState,
  type CanonicalStateMachine,
} from "@/contracts/ontology/canonicalExecutionStates";
import {
  CANONICAL_EXECUTION_VERBS,
  isCanonicalVerb,
  type CanonicalExecutionVerb,
} from "@/contracts/ontology/canonicalExecutionVerbs";

export interface RegistryLookup {
  readonly version: string;
  readonly domains: ReadonlyArray<CanonicalDomain>;
  readonly relationships: ReadonlyArray<CanonicalRelationship>;
  readonly verbs: ReadonlyArray<CanonicalExecutionVerb>;
  readonly stateMachines: ReadonlyArray<CanonicalStateMachine>;
}

export const ontologyRegistry: RegistryLookup = {
  version: CANONICAL_ONTOLOGY_VERSION,
  domains: CANONICAL_DOMAINS,
  relationships: CANONICAL_RELATIONSHIPS,
  verbs: CANONICAL_EXECUTION_VERBS,
  stateMachines: ["requisition", "candidate", "engagement"],
};

export function isRegisteredDomain(value: string): value is CanonicalDomain {
  return (CANONICAL_DOMAINS as readonly string[]).includes(value);
}

export function isRegisteredEntity(
  domain: string,
  subtype: string,
): boolean {
  if (!isRegisteredDomain(domain)) return false;
  return isCanonicalSubtype(domain, subtype);
}

export function isRegisteredRelationship(value: string): value is CanonicalRelationship {
  return isCanonicalRelationship(value);
}

export function isRegisteredVerb(value: string): value is CanonicalExecutionVerb {
  return isCanonicalVerb(value);
}

export function isRegisteredState(
  machine: CanonicalStateMachine,
  value: string,
): boolean {
  switch (machine) {
    case "requisition":
      return isRequisitionState(value);
    case "candidate":
      return isCandidateState(value);
    case "engagement":
      return isEngagementState(value);
  }
}

export function isRegisteredTransition(
  machine: CanonicalStateMachine,
  from: string,
  to: string,
): boolean {
  return isLegalTransition(machine, from, to);
}

/**
 * Snapshot of the registry — useful for replay reconstruction and for
 * AI runtime modules that need a deterministic immutable view.
 */
export function snapshotRegistry() {
  return Object.freeze({
    version: CANONICAL_ONTOLOGY_VERSION,
    entities: CANONICAL_ENTITY_REGISTRY,
    relationships: CANONICAL_RELATIONSHIP_RULES,
    states: {
      requisition: REQUISITION_STATES,
      candidate: CANDIDATE_STATES,
      engagement: ENGAGEMENT_STATES,
    },
    verbs: CANONICAL_EXECUTION_VERBS,
  });
}
