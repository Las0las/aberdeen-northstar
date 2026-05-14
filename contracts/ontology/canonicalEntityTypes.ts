/**
 * Canonical Workforce Ontology — Entity Types
 *
 * Single source of truth for institutional entity classification.
 * All runtime entities must resolve to a canonical type registered here.
 * Additive only; new types must be appended, never removed or renamed.
 */

export const CANONICAL_ONTOLOGY_VERSION = "1.0.0" as const;

export const WORKER_SUBTYPES = [
  "employee",
  "contractor",
  "consultant",
  "vendor_resource",
  "candidate",
  "fractional_resource",
  "bench_resource",
  "digital_worker",
  "ai_agent",
] as const;
export type WorkerSubtype = (typeof WORKER_SUBTYPES)[number];

export const ORGANIZATION_ENTITY_TYPES = [
  "client",
  "vendor",
  "business_unit",
  "cost_center",
  "practice",
  "delivery_team",
] as const;
export type OrganizationEntityType = (typeof ORGANIZATION_ENTITY_TYPES)[number];

export const EXECUTION_ENTITY_TYPES = [
  "requisition",
  "submission",
  "interview",
  "offer",
  "placement",
  "engagement",
  "assignment",
  "redeployment",
  "approval_chain",
] as const;
export type ExecutionEntityType = (typeof EXECUTION_ENTITY_TYPES)[number];

export const GOVERNANCE_ENTITY_TYPES = [
  "decision_envelope",
  "policy_gate",
  "risk_assessment",
  "evidence_artifact",
  "approval_exception",
  "compliance_case",
] as const;
export type GovernanceEntityType = (typeof GOVERNANCE_ENTITY_TYPES)[number];

export const ECONOMIC_ENTITY_TYPES = [
  "bill_rate",
  "pay_rate",
  "margin_profile",
  "utilization_model",
  "cost_projection",
  "revenue_attribution",
] as const;
export type EconomicEntityType = (typeof ECONOMIC_ENTITY_TYPES)[number];

export const CANONICAL_DOMAINS = [
  "worker",
  "organization",
  "execution",
  "governance",
  "economic",
] as const;
export type CanonicalDomain = (typeof CANONICAL_DOMAINS)[number];

export type CanonicalEntityType =
  | { domain: "worker"; subtype: WorkerSubtype }
  | { domain: "organization"; subtype: OrganizationEntityType }
  | { domain: "execution"; subtype: ExecutionEntityType }
  | { domain: "governance"; subtype: GovernanceEntityType }
  | { domain: "economic"; subtype: EconomicEntityType };

export interface CanonicalEntityDescriptor {
  readonly domain: CanonicalDomain;
  readonly subtype: string;
  readonly definition: string;
}

export const WORKER_DEFINITION =
  "A human or AI-capable execution participant that may perform institutional work." as const;

export const CANONICAL_ENTITY_REGISTRY: ReadonlyArray<CanonicalEntityDescriptor> = [
  ...WORKER_SUBTYPES.map((subtype) => ({
    domain: "worker" as const,
    subtype,
    definition: WORKER_DEFINITION,
  })),
  ...ORGANIZATION_ENTITY_TYPES.map((subtype) => ({
    domain: "organization" as const,
    subtype,
    definition: "Institutional organizational unit or external party.",
  })),
  ...EXECUTION_ENTITY_TYPES.map((subtype) => ({
    domain: "execution" as const,
    subtype,
    definition: "Operational workflow artifact participating in execution lifecycle.",
  })),
  ...GOVERNANCE_ENTITY_TYPES.map((subtype) => ({
    domain: "governance" as const,
    subtype,
    definition: "Constitutional governance artifact constraining execution authority.",
  })),
  ...ECONOMIC_ENTITY_TYPES.map((subtype) => ({
    domain: "economic" as const,
    subtype,
    definition: "Economic quantity, rate, or attribution model.",
  })),
];

export function isCanonicalSubtype(
  domain: CanonicalDomain,
  subtype: string,
): boolean {
  switch (domain) {
    case "worker":
      return (WORKER_SUBTYPES as readonly string[]).includes(subtype);
    case "organization":
      return (ORGANIZATION_ENTITY_TYPES as readonly string[]).includes(subtype);
    case "execution":
      return (EXECUTION_ENTITY_TYPES as readonly string[]).includes(subtype);
    case "governance":
      return (GOVERNANCE_ENTITY_TYPES as readonly string[]).includes(subtype);
    case "economic":
      return (ECONOMIC_ENTITY_TYPES as readonly string[]).includes(subtype);
  }
}
