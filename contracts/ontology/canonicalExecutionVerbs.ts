/**
 * Canonical Workforce Ontology — Execution Verbs
 *
 * Every governed runtime action must declare itself with one of these verbs.
 * Free-form verbs are not permitted in governed runtime.
 */

export const CANONICAL_EXECUTION_VERBS = [
  "CREATE",
  "QUALIFY",
  "APPROVE",
  "SUBMIT",
  "SCHEDULE",
  "ESCALATE",
  "ASSIGN",
  "ACTIVATE",
  "EXTEND",
  "REDEPLOY",
  "COMPLETE",
  "TERMINATE",
  "ARCHIVE",
  "REPLAY",
  "SIMULATE",
] as const;
export type CanonicalExecutionVerb = (typeof CANONICAL_EXECUTION_VERBS)[number];

/**
 * Verbs that may not mutate state — strictly read-only / advisory.
 * Used by the constitutional authority model to bound AI advisory authority.
 */
export const NON_MUTATING_VERBS = ["REPLAY", "SIMULATE"] as const satisfies ReadonlyArray<
  CanonicalExecutionVerb
>;
export type NonMutatingVerb = (typeof NON_MUTATING_VERBS)[number];

export function isCanonicalVerb(value: string): value is CanonicalExecutionVerb {
  return (CANONICAL_EXECUTION_VERBS as readonly string[]).includes(value);
}

export function isMutatingVerb(verb: CanonicalExecutionVerb): boolean {
  return !(NON_MUTATING_VERBS as readonly string[]).includes(verb);
}
