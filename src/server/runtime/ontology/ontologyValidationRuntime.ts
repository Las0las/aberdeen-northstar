/**
 * Ontology Validation Runtime.
 *
 * Hosts the four constitutional policy gates that protect the institutional
 * graph from ontology drift, illegal relationships, illegal state transitions,
 * and unauthorized authority claims. Gates fail closed.
 *
 * Also declares the canonical event spine taxonomy emitted by the runtime
 * whenever ontology decisions occur.
 *
 * No I/O, no mutation — these gates are pure predicates that callers
 * combine into their own runtime pipelines (DecisionEnvelope, connectors,
 * AI runtime). They do not register listeners or carry state.
 */

import {
  isRegisteredEntity,
  isRegisteredRelationship,
  isRegisteredVerb,
  isRegisteredTransition,
  isRegisteredState,
} from "./ontologyRegistry";
import {
  getRelationshipRule,
  type CanonicalRelationship,
} from "@/contracts/ontology/canonicalRelationships";
import type { CanonicalDomain } from "@/contracts/ontology/canonicalEntityTypes";
import type { CanonicalStateMachine } from "@/contracts/ontology/canonicalExecutionStates";
import {
  isAuthorityPermitted,
  type AuthorityClaim,
} from "@/contracts/ontology/canonicalAuthorityModel";
import { isCanonicalVerb } from "@/contracts/ontology/canonicalExecutionVerbs";
import {
  validateTemporalEnvelope,
  type CanonicalTemporalEnvelope,
} from "@/contracts/ontology/canonicalTemporalModel";

export type GateOutcome =
  | { admitted: true }
  | { admitted: false; gate: PolicyGateName; reason: string };

export type PolicyGateName =
  | "SemanticIntegrityGate"
  | "OntologyConsistencyGate"
  | "RelationshipLegalityGate"
  | "CanonicalAuthorityGate";

export const POLICY_GATES: ReadonlyArray<PolicyGateName> = [
  "SemanticIntegrityGate",
  "OntologyConsistencyGate",
  "RelationshipLegalityGate",
  "CanonicalAuthorityGate",
];

export const ONTOLOGY_EVENT_TAXONOMY = [
  "ONTOLOGY_REGISTERED",
  "SEMANTIC_MAPPING_CREATED",
  "ONTOLOGY_CONFLICT_DETECTED",
  "RELATIONSHIP_RULE_VIOLATION",
  "CANONICAL_ENTITY_RESOLVED",
] as const;
export type OntologyEvent = (typeof ONTOLOGY_EVENT_TAXONOMY)[number];

/**
 * SemanticIntegrityGate.
 *
 * Rejects any execution attempt that references unregistered semantic
 * primitives (verbs, temporal envelopes, state references).
 */
export function semanticIntegrityGate(input: {
  verb: string;
  temporal: Partial<CanonicalTemporalEnvelope>;
}): GateOutcome {
  if (!isCanonicalVerb(input.verb)) {
    return {
      admitted: false,
      gate: "SemanticIntegrityGate",
      reason: `unregistered_verb: ${input.verb}`,
    };
  }
  const violations = validateTemporalEnvelope(input.temporal);
  if (violations.length > 0) {
    return {
      admitted: false,
      gate: "SemanticIntegrityGate",
      reason: `temporal_envelope_invalid: ${violations.join("; ")}`,
    };
  }
  return { admitted: true };
}

/**
 * OntologyConsistencyGate.
 *
 * Rejects entities and state references that are not registered in the
 * canonical ontology. This is the gate that prevents free-form drift.
 */
export function ontologyConsistencyGate(input: {
  entity: { domain: string; subtype: string };
  stateMachine?: CanonicalStateMachine;
  state?: string;
}): GateOutcome {
  if (!isRegisteredEntity(input.entity.domain, input.entity.subtype)) {
    return {
      admitted: false,
      gate: "OntologyConsistencyGate",
      reason: `unregistered_entity: ${input.entity.domain}:${input.entity.subtype}`,
    };
  }
  if (input.stateMachine && input.state !== undefined) {
    if (!isRegisteredState(input.stateMachine, input.state)) {
      return {
        admitted: false,
        gate: "OntologyConsistencyGate",
        reason: `unregistered_state: ${input.stateMachine}:${input.state}`,
      };
    }
  }
  return { admitted: true };
}

/**
 * RelationshipLegalityGate.
 *
 * Rejects edges that either use an unregistered relationship verb or
 * violate the domain endpoints declared on the canonical relationship
 * rule. Optionally rejects illegal state transitions.
 */
export function relationshipLegalityGate(input: {
  verb: string;
  fromDomain: string;
  toDomain: string;
  transition?: {
    machine: CanonicalStateMachine;
    from: string;
    to: string;
  };
}): GateOutcome {
  if (!isRegisteredRelationship(input.verb)) {
    return {
      admitted: false,
      gate: "RelationshipLegalityGate",
      reason: `unregistered_relationship: ${input.verb}`,
    };
  }
  const rule = getRelationshipRule(input.verb as CanonicalRelationship);
  const from = input.fromDomain as CanonicalDomain;
  const to = input.toDomain as CanonicalDomain;
  if (!rule.fromDomains.includes(from) || !rule.toDomains.includes(to)) {
    return {
      admitted: false,
      gate: "RelationshipLegalityGate",
      reason: `illegal_endpoints: ${input.verb}(${input.fromDomain}->${input.toDomain})`,
    };
  }
  if (input.transition) {
    const { machine, from: tFrom, to: tTo } = input.transition;
    if (!isRegisteredTransition(machine, tFrom, tTo)) {
      return {
        admitted: false,
        gate: "RelationshipLegalityGate",
        reason: `illegal_transition: ${machine}:${tFrom}->${tTo}`,
      };
    }
  }
  return { admitted: true };
}

/**
 * CanonicalAuthorityGate.
 *
 * Rejects authority claims that violate the constitutional authority
 * model — most importantly, AI advisory authority attempting a mutating
 * verb, or delegated authority lacking provenance.
 */
export function canonicalAuthorityGate(claim: AuthorityClaim): GateOutcome {
  if (!isRegisteredVerb(claim.verb)) {
    return {
      admitted: false,
      gate: "CanonicalAuthorityGate",
      reason: `unregistered_verb: ${claim.verb}`,
    };
  }
  if (!isAuthorityPermitted(claim)) {
    return {
      admitted: false,
      gate: "CanonicalAuthorityGate",
      reason: `authority_denied: ${claim.authorityType} cannot perform ${claim.verb}`,
    };
  }
  return { admitted: true };
}

export interface OntologyDecision {
  readonly event: OntologyEvent;
  readonly gate: PolicyGateName | null;
  readonly admitted: boolean;
  readonly reason: string | null;
}

/**
 * Helper that bundles a gate outcome with an ontology event taxonomy tag
 * so callers (DecisionEnvelope, connectors) can emit a single record onto
 * the event spine.
 */
export function recordOntologyDecision(
  outcome: GateOutcome,
  admittedEvent: OntologyEvent,
  rejectedEvent: OntologyEvent = "ONTOLOGY_CONFLICT_DETECTED",
): OntologyDecision {
  if (outcome.admitted) {
    return { event: admittedEvent, gate: null, admitted: true, reason: null };
  }
  return {
    event: rejectedEvent,
    gate: outcome.gate,
    admitted: false,
    reason: outcome.reason,
  };
}
