/**
 * Semantic Resolver — resolves free-form identifiers into canonical
 * ontology primitives.
 *
 * Used by AI runtime modules and external connectors that produce raw
 * labels: this resolver collapses synonyms / aliases / case variants onto
 * the canonical form, or returns a structured "unresolved" result.
 *
 * Pure module — no I/O, no state mutation.
 */

import type { CanonicalDomain } from "@/contracts/ontology/canonicalEntityTypes";
import type { CanonicalRelationship } from "@/contracts/ontology/canonicalRelationships";
import type { CanonicalExecutionVerb } from "@/contracts/ontology/canonicalExecutionVerbs";
import {
  isRegisteredEntity,
  isRegisteredRelationship,
  isRegisteredVerb,
} from "./ontologyRegistry";

export type ResolutionOutcome<T> =
  | { ok: true; canonical: T }
  | { ok: false; reason: string; input: string };

function normaliseLower(input: string): string {
  return input.trim().toLowerCase();
}

function normaliseUpper(input: string): string {
  return input.trim().toUpperCase();
}

/**
 * Entity subtype synonyms — additive, case-insensitive. Only entries that
 * are guaranteed to map to a registered canonical subtype are listed here.
 */
const ENTITY_SYNONYMS: ReadonlyMap<string, { domain: CanonicalDomain; subtype: string }> =
  new Map([
    ["staff", { domain: "worker", subtype: "employee" }],
    ["fte", { domain: "worker", subtype: "employee" }],
    ["w2", { domain: "worker", subtype: "employee" }],
    ["1099", { domain: "worker", subtype: "contractor" }],
    ["c2c", { domain: "worker", subtype: "contractor" }],
    ["sub", { domain: "worker", subtype: "vendor_resource" }],
    ["sub_vendor", { domain: "worker", subtype: "vendor_resource" }],
    ["bench", { domain: "worker", subtype: "bench_resource" }],
    ["bot", { domain: "worker", subtype: "digital_worker" }],
    ["agent", { domain: "worker", subtype: "ai_agent" }],
    ["account", { domain: "organization", subtype: "client" }],
    ["supplier", { domain: "organization", subtype: "vendor" }],
    ["bu", { domain: "organization", subtype: "business_unit" }],
    ["req", { domain: "execution", subtype: "requisition" }],
    ["job", { domain: "execution", subtype: "requisition" }],
    ["sub_request", { domain: "execution", subtype: "submission" }],
    ["interview_loop", { domain: "execution", subtype: "interview" }],
  ]);

const RELATIONSHIP_SYNONYMS: ReadonlyMap<string, CanonicalRelationship> = new Map([
  ["EMPLOYED_BY", "WORKS_FOR"],
  ["MEMBER_OF", "WORKS_FOR"],
  ["MANAGES", "REPORTS_TO"],
  ["DELEGATED_TO", "ASSIGNED_TO"],
  ["VENDOR_FOR", "SUPPLIED_BY"],
  ["REPLACED_BY", "SUPERSEDES"],
]);

const VERB_SYNONYMS: ReadonlyMap<string, CanonicalExecutionVerb> = new Map([
  ["NEW", "CREATE"],
  ["OPEN", "CREATE"],
  ["VALIDATE", "QUALIFY"],
  ["SIGN_OFF", "APPROVE"],
  ["DISPATCH", "ASSIGN"],
  ["START", "ACTIVATE"],
  ["RENEW", "EXTEND"],
  ["FINISH", "COMPLETE"],
  ["END", "TERMINATE"],
  ["CLOSE", "ARCHIVE"],
]);

export function resolveEntity(
  domain: string,
  subtype: string,
): ResolutionOutcome<{ domain: CanonicalDomain; subtype: string }> {
  if (isRegisteredEntity(domain, subtype)) {
    return { ok: true, canonical: { domain: domain as CanonicalDomain, subtype } };
  }
  const aliased = ENTITY_SYNONYMS.get(normaliseLower(subtype));
  if (aliased && isRegisteredEntity(aliased.domain, aliased.subtype)) {
    return { ok: true, canonical: aliased };
  }
  return {
    ok: false,
    reason: "unregistered_entity",
    input: `${domain}:${subtype}`,
  };
}

export function resolveRelationship(
  verb: string,
): ResolutionOutcome<CanonicalRelationship> {
  const upper = normaliseUpper(verb);
  if (isRegisteredRelationship(upper)) {
    return { ok: true, canonical: upper };
  }
  const aliased = RELATIONSHIP_SYNONYMS.get(upper);
  if (aliased) {
    return { ok: true, canonical: aliased };
  }
  return { ok: false, reason: "unregistered_relationship", input: verb };
}

export function resolveVerb(
  verb: string,
): ResolutionOutcome<CanonicalExecutionVerb> {
  const upper = normaliseUpper(verb);
  if (isRegisteredVerb(upper)) {
    return { ok: true, canonical: upper };
  }
  const aliased = VERB_SYNONYMS.get(upper);
  if (aliased) {
    return { ok: true, canonical: aliased };
  }
  return { ok: false, reason: "unregistered_verb", input: verb };
}
