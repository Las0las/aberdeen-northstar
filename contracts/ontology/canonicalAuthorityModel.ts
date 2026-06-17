/**
 * Canonical Workforce Ontology — Authority Model
 *
 * Constitutional principle:
 *   "No entity possesses direct execution authority outside constitutional
 *    runtime governance."
 *
 * AI is bounded to advisory authority only — it may never mutate institutional
 * state directly.
 */

import {
  isMutatingVerb,
  type CanonicalExecutionVerb,
} from "./canonicalExecutionVerbs";

export const AUTHORITY_TYPES = [
  "HUMAN_AUTHORITY",
  "SYSTEM_AUTHORITY",
  "POLICY_AUTHORITY",
  "AI_ADVISORY_AUTHORITY",
  "TEMPORAL_AUTHORITY",
  "DELEGATED_AUTHORITY",
] as const;
export type AuthorityType = (typeof AUTHORITY_TYPES)[number];

export const ALLOWED_AI_FUNCTIONS = [
  "recommendation",
  "risk_prediction",
  "semantic_mapping",
  "candidate_matching",
  "forecasting",
  "simulation",
  "classification",
  "anomaly_detection",
  "policy_advisory",
] as const;
export type AllowedAiFunction = (typeof ALLOWED_AI_FUNCTIONS)[number];

export interface AuthorityClaim {
  readonly authorityType: AuthorityType;
  readonly verb: CanonicalExecutionVerb;
  readonly principalId: string;
  readonly delegatedFrom?: string;
}

/**
 * Returns true if the given authority claim is constitutionally permitted
 * to execute the declared verb. AI advisory authority can never carry a
 * mutating verb; mutation requires human, system, policy, temporal, or
 * delegated authority.
 */
export function isAuthorityPermitted(claim: AuthorityClaim): boolean {
  if (claim.authorityType === "AI_ADVISORY_AUTHORITY") {
    return !isMutatingVerb(claim.verb);
  }
  if (claim.authorityType === "DELEGATED_AUTHORITY" && !claim.delegatedFrom) {
    return false;
  }
  return true;
}

export function isAllowedAiFunction(value: string): value is AllowedAiFunction {
  return (ALLOWED_AI_FUNCTIONS as readonly string[]).includes(value);
}

export function isAuthorityType(value: string): value is AuthorityType {
  return (AUTHORITY_TYPES as readonly string[]).includes(value);
}
