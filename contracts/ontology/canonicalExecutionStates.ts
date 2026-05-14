/**
 * Canonical Workforce Ontology — Execution States
 *
 * Every governed lifecycle state must resolve to one of these canonical
 * state machines. Transitions outside declared edges are not permitted.
 */

export const REQUISITION_STATES = [
  "DRAFT",
  "QUALIFIED",
  "APPROVED",
  "ACTIVE",
  "PAUSED",
  "FILLED",
  "CANCELLED",
  "ARCHIVED",
] as const;
export type RequisitionState = (typeof REQUISITION_STATES)[number];

export const CANDIDATE_STATES = [
  "SOURCED",
  "SCREENED",
  "SUBMITTED",
  "INTERVIEWING",
  "OFFERED",
  "PLACED",
  "REDEPLOYABLE",
  "INACTIVE",
] as const;
export type CandidateState = (typeof CANDIDATE_STATES)[number];

export const ENGAGEMENT_STATES = [
  "PENDING",
  "ACTIVE",
  "EXTENDED",
  "COMPLETED",
  "TERMINATED",
  "REDEPLOYMENT_READY",
] as const;
export type EngagementState = (typeof ENGAGEMENT_STATES)[number];

export const CANONICAL_STATE_MACHINES = [
  "requisition",
  "candidate",
  "engagement",
] as const;
export type CanonicalStateMachine = (typeof CANONICAL_STATE_MACHINES)[number];

export type CanonicalState = RequisitionState | CandidateState | EngagementState;

export interface CanonicalTransition<S extends string> {
  readonly from: S;
  readonly to: S;
}

export const REQUISITION_TRANSITIONS: ReadonlyArray<CanonicalTransition<RequisitionState>> = [
  { from: "DRAFT", to: "QUALIFIED" },
  { from: "QUALIFIED", to: "APPROVED" },
  { from: "QUALIFIED", to: "CANCELLED" },
  { from: "APPROVED", to: "ACTIVE" },
  { from: "ACTIVE", to: "PAUSED" },
  { from: "ACTIVE", to: "FILLED" },
  { from: "ACTIVE", to: "CANCELLED" },
  { from: "PAUSED", to: "ACTIVE" },
  { from: "PAUSED", to: "CANCELLED" },
  { from: "FILLED", to: "ARCHIVED" },
  { from: "CANCELLED", to: "ARCHIVED" },
];

export const CANDIDATE_TRANSITIONS: ReadonlyArray<CanonicalTransition<CandidateState>> = [
  { from: "SOURCED", to: "SCREENED" },
  { from: "SCREENED", to: "SUBMITTED" },
  { from: "SCREENED", to: "INACTIVE" },
  { from: "SUBMITTED", to: "INTERVIEWING" },
  { from: "SUBMITTED", to: "INACTIVE" },
  { from: "INTERVIEWING", to: "OFFERED" },
  { from: "INTERVIEWING", to: "INACTIVE" },
  { from: "OFFERED", to: "PLACED" },
  { from: "OFFERED", to: "INACTIVE" },
  { from: "PLACED", to: "REDEPLOYABLE" },
  { from: "PLACED", to: "INACTIVE" },
  { from: "REDEPLOYABLE", to: "SUBMITTED" },
  { from: "REDEPLOYABLE", to: "INACTIVE" },
];

export const ENGAGEMENT_TRANSITIONS: ReadonlyArray<CanonicalTransition<EngagementState>> = [
  { from: "PENDING", to: "ACTIVE" },
  { from: "PENDING", to: "TERMINATED" },
  { from: "ACTIVE", to: "EXTENDED" },
  { from: "ACTIVE", to: "COMPLETED" },
  { from: "ACTIVE", to: "TERMINATED" },
  { from: "EXTENDED", to: "COMPLETED" },
  { from: "EXTENDED", to: "TERMINATED" },
  { from: "COMPLETED", to: "REDEPLOYMENT_READY" },
];

export function isRequisitionState(value: string): value is RequisitionState {
  return (REQUISITION_STATES as readonly string[]).includes(value);
}

export function isCandidateState(value: string): value is CandidateState {
  return (CANDIDATE_STATES as readonly string[]).includes(value);
}

export function isEngagementState(value: string): value is EngagementState {
  return (ENGAGEMENT_STATES as readonly string[]).includes(value);
}

export function isLegalTransition(
  machine: CanonicalStateMachine,
  from: string,
  to: string,
): boolean {
  const set: ReadonlyArray<{ from: string; to: string }> =
    machine === "requisition"
      ? REQUISITION_TRANSITIONS
      : machine === "candidate"
        ? CANDIDATE_TRANSITIONS
        : ENGAGEMENT_TRANSITIONS;
  return set.some((t) => t.from === from && t.to === to);
}
