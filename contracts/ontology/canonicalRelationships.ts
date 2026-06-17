/**
 * Canonical Workforce Ontology — Relationships
 *
 * Every edge in the institutional graph must resolve to one of these
 * canonical relationship verbs. Free-form relationships are not permitted
 * in governed runtime.
 */

import type { CanonicalDomain } from "./canonicalEntityTypes";

export const CANONICAL_RELATIONSHIPS = [
  "WORKS_FOR",
  "SUBMITTED_TO",
  "APPROVED_BY",
  "REPORTS_TO",
  "ASSIGNED_TO",
  "ENGAGED_WITH",
  "SUPPLIED_BY",
  "OWNED_BY",
  "ESCALATED_TO",
  "GOVERNED_BY",
  "DERIVED_FROM",
  "REPLAYS_FROM",
  "SUPERSEDES",
] as const;
export type CanonicalRelationship = (typeof CANONICAL_RELATIONSHIPS)[number];

export interface CanonicalRelationshipRule {
  readonly verb: CanonicalRelationship;
  readonly fromDomains: ReadonlyArray<CanonicalDomain>;
  readonly toDomains: ReadonlyArray<CanonicalDomain>;
  readonly intent: string;
}

export const CANONICAL_RELATIONSHIP_RULES: ReadonlyArray<CanonicalRelationshipRule> = [
  {
    verb: "WORKS_FOR",
    fromDomains: ["worker"],
    toDomains: ["organization"],
    intent: "A worker performs institutional work on behalf of an organization.",
  },
  {
    verb: "SUBMITTED_TO",
    fromDomains: ["worker", "execution"],
    toDomains: ["execution", "organization"],
    intent: "An entity has been submitted into an execution artifact lifecycle.",
  },
  {
    verb: "APPROVED_BY",
    fromDomains: ["execution", "governance"],
    toDomains: ["worker", "governance"],
    intent: "An execution or governance artifact has received constitutional approval.",
  },
  {
    verb: "REPORTS_TO",
    fromDomains: ["worker"],
    toDomains: ["worker", "organization"],
    intent: "Hierarchical reporting accountability between workers or units.",
  },
  {
    verb: "ASSIGNED_TO",
    fromDomains: ["worker", "execution"],
    toDomains: ["execution", "organization"],
    intent: "Allocation of a worker or task to an execution context.",
  },
  {
    verb: "ENGAGED_WITH",
    fromDomains: ["worker", "organization"],
    toDomains: ["organization", "execution"],
    intent: "Active engagement relationship between parties.",
  },
  {
    verb: "SUPPLIED_BY",
    fromDomains: ["worker", "execution"],
    toDomains: ["organization"],
    intent: "Source organization that supplied a worker or resource.",
  },
  {
    verb: "OWNED_BY",
    fromDomains: ["execution", "economic", "governance"],
    toDomains: ["worker", "organization"],
    intent: "Accountability ownership of an artifact.",
  },
  {
    verb: "ESCALATED_TO",
    fromDomains: ["execution", "governance"],
    toDomains: ["worker", "organization", "governance"],
    intent: "Escalation path of an exception or risk.",
  },
  {
    verb: "GOVERNED_BY",
    fromDomains: ["worker", "organization", "execution", "economic"],
    toDomains: ["governance"],
    intent: "Constitutional governance binding.",
  },
  {
    verb: "DERIVED_FROM",
    fromDomains: ["execution", "governance", "economic"],
    toDomains: ["execution", "governance", "economic"],
    intent: "Lineage of an artifact derived from a prior artifact.",
  },
  {
    verb: "REPLAYS_FROM",
    fromDomains: ["execution", "governance"],
    toDomains: ["execution", "governance"],
    intent: "Replay reconstruction lineage of a temporally scoped artifact.",
  },
  {
    verb: "SUPERSEDES",
    fromDomains: ["execution", "governance", "economic"],
    toDomains: ["execution", "governance", "economic"],
    intent: "An artifact replaces a prior artifact within authority window.",
  },
];

export function isCanonicalRelationship(
  verb: string,
): verb is CanonicalRelationship {
  return (CANONICAL_RELATIONSHIPS as readonly string[]).includes(verb);
}

export function getRelationshipRule(
  verb: CanonicalRelationship,
): CanonicalRelationshipRule {
  const rule = CANONICAL_RELATIONSHIP_RULES.find((r) => r.verb === verb);
  if (!rule) {
    throw new Error(`Canonical relationship rule missing for verb: ${verb}`);
  }
  return rule;
}
