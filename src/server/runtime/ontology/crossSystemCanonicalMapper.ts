/**
 * Cross-System Canonical Mapper.
 *
 * External systems (ATS, VMS, ERP, payroll, finance) speak different
 * dialects. This mapper translates inbound foreign labels into the
 * canonical ontology and emits outbound canonical labels back into the
 * foreign dialect when needed.
 *
 * All translations are declarative — no I/O, no state, deterministic.
 * Unmapped inputs fall through to the semantic resolver. If both fail,
 * the mapper returns an unresolved outcome that fails closed at the
 * OntologyConsistencyGate.
 */

import type { CanonicalDomain } from "@/contracts/ontology/canonicalEntityTypes";
import {
  resolveEntity,
  resolveRelationship,
  resolveVerb,
  type ResolutionOutcome,
} from "./semanticResolver";
import type { CanonicalRelationship } from "@/contracts/ontology/canonicalRelationships";
import type { CanonicalExecutionVerb } from "@/contracts/ontology/canonicalExecutionVerbs";

export type ForeignSystem = "ats" | "vms" | "erp" | "payroll" | "finance" | "generic";

interface ForeignDialect {
  readonly entity: ReadonlyMap<string, { domain: CanonicalDomain; subtype: string }>;
  readonly relationship: ReadonlyMap<string, CanonicalRelationship>;
  readonly verb: ReadonlyMap<string, CanonicalExecutionVerb>;
}

const ATS_DIALECT: ForeignDialect = {
  entity: new Map([
    ["job_posting", { domain: "execution", subtype: "requisition" }],
    ["application", { domain: "execution", subtype: "submission" }],
    ["applicant", { domain: "worker", subtype: "candidate" }],
    ["hire", { domain: "execution", subtype: "placement" }],
  ]),
  relationship: new Map([
    ["APPLIED_TO", "SUBMITTED_TO"],
    ["HIRED_BY", "WORKS_FOR"],
  ]),
  verb: new Map([
    ["POST", "CREATE"],
    ["HIRE", "ACTIVATE"],
    ["REJECT", "TERMINATE"],
  ]),
};

const VMS_DIALECT: ForeignDialect = {
  entity: new Map([
    ["work_order", { domain: "execution", subtype: "requisition" }],
    ["candidate_submission", { domain: "execution", subtype: "submission" }],
    ["resource", { domain: "worker", subtype: "vendor_resource" }],
    ["assignment_record", { domain: "execution", subtype: "engagement" }],
  ]),
  relationship: new Map([
    ["FILLED_BY", "ASSIGNED_TO"],
    ["BILLED_TO", "OWNED_BY"],
  ]),
  verb: new Map([
    ["RELEASE", "CREATE"],
    ["ONBOARD", "ACTIVATE"],
    ["OFFBOARD", "COMPLETE"],
  ]),
};

const ERP_DIALECT: ForeignDialect = {
  entity: new Map([
    ["employee_record", { domain: "worker", subtype: "employee" }],
    ["cost_object", { domain: "organization", subtype: "cost_center" }],
    ["project", { domain: "execution", subtype: "engagement" }],
  ]),
  relationship: new Map([["CHARGED_TO", "OWNED_BY"]]),
  verb: new Map([
    ["PROVISION", "ACTIVATE"],
    ["DEPROVISION", "TERMINATE"],
  ]),
};

const PAYROLL_DIALECT: ForeignDialect = {
  entity: new Map([
    ["pay_record", { domain: "economic", subtype: "pay_rate" }],
    ["bill_record", { domain: "economic", subtype: "bill_rate" }],
  ]),
  relationship: new Map(),
  verb: new Map([
    ["PAY", "COMPLETE"],
    ["BILL", "COMPLETE"],
  ]),
};

const FINANCE_DIALECT: ForeignDialect = {
  entity: new Map([
    ["revenue_line", { domain: "economic", subtype: "revenue_attribution" }],
    ["margin_record", { domain: "economic", subtype: "margin_profile" }],
    ["forecast", { domain: "economic", subtype: "cost_projection" }],
  ]),
  relationship: new Map([["ATTRIBUTED_TO", "DERIVED_FROM"]]),
  verb: new Map([["FORECAST", "SIMULATE"]]),
};

const EMPTY_DIALECT: ForeignDialect = {
  entity: new Map(),
  relationship: new Map(),
  verb: new Map(),
};

const DIALECTS: Record<ForeignSystem, ForeignDialect> = {
  ats: ATS_DIALECT,
  vms: VMS_DIALECT,
  erp: ERP_DIALECT,
  payroll: PAYROLL_DIALECT,
  finance: FINANCE_DIALECT,
  generic: EMPTY_DIALECT,
};

export function mapForeignEntity(
  system: ForeignSystem,
  foreignLabel: string,
): ResolutionOutcome<{ domain: CanonicalDomain; subtype: string }> {
  const dialect = DIALECTS[system];
  const direct = dialect.entity.get(foreignLabel.toLowerCase());
  if (direct) {
    return { ok: true, canonical: direct };
  }
  return resolveEntity("unknown", foreignLabel);
}

export function mapForeignRelationship(
  system: ForeignSystem,
  foreignLabel: string,
): ResolutionOutcome<CanonicalRelationship> {
  const dialect = DIALECTS[system];
  const direct = dialect.relationship.get(foreignLabel.toUpperCase());
  if (direct) {
    return { ok: true, canonical: direct };
  }
  return resolveRelationship(foreignLabel);
}

export function mapForeignVerb(
  system: ForeignSystem,
  foreignLabel: string,
): ResolutionOutcome<CanonicalExecutionVerb> {
  const dialect = DIALECTS[system];
  const direct = dialect.verb.get(foreignLabel.toUpperCase());
  if (direct) {
    return { ok: true, canonical: direct };
  }
  return resolveVerb(foreignLabel);
}

export function listSupportedForeignSystems(): ReadonlyArray<ForeignSystem> {
  return Object.keys(DIALECTS) as ReadonlyArray<ForeignSystem>;
}
