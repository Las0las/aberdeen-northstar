/**
 * Canonical Workforce Ontology — Temporal Model
 *
 * Constitutional principle:
 *   "All execution state is temporally scoped and replay reconstructable."
 *
 * Every governed artifact must carry these temporal coordinates so that
 * institutional state can be reconstructed from the event spine at any
 * point in time without ambiguity.
 */

export const REQUIRED_TEMPORAL_FIELDS = [
  "effective_at",
  "recorded_at",
  "superseded_at",
  "authority_window_start",
  "authority_window_end",
] as const;
export type RequiredTemporalField = (typeof REQUIRED_TEMPORAL_FIELDS)[number];

/**
 * IsoTimestamp: ISO 8601 UTC string. Nullable fields signal "open-ended"
 * temporal windows (no upper or lower bound yet recorded).
 */
export type IsoTimestamp = string;

export interface CanonicalTemporalEnvelope {
  readonly effective_at: IsoTimestamp;
  readonly recorded_at: IsoTimestamp;
  readonly superseded_at: IsoTimestamp | null;
  readonly authority_window_start: IsoTimestamp;
  readonly authority_window_end: IsoTimestamp | null;
}

const ISO_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;

export function isIsoTimestamp(value: unknown): value is IsoTimestamp {
  return typeof value === "string" && ISO_RE.test(value);
}

/**
 * Validates that an envelope conforms to the canonical temporal model.
 * Returns the list of violations; empty array means valid.
 */
export function validateTemporalEnvelope(
  envelope: Partial<CanonicalTemporalEnvelope>,
): ReadonlyArray<string> {
  const violations: string[] = [];

  for (const field of REQUIRED_TEMPORAL_FIELDS) {
    const value = envelope[field];
    const nullable =
      field === "superseded_at" || field === "authority_window_end";
    if (value === undefined) {
      violations.push(`missing required temporal field: ${field}`);
      continue;
    }
    if (value === null) {
      if (!nullable) violations.push(`${field} may not be null`);
      continue;
    }
    if (!isIsoTimestamp(value)) {
      violations.push(`${field} is not a valid ISO 8601 UTC timestamp`);
    }
  }

  const { authority_window_start, authority_window_end } = envelope;
  if (
    typeof authority_window_start === "string" &&
    typeof authority_window_end === "string" &&
    Date.parse(authority_window_end) < Date.parse(authority_window_start)
  ) {
    violations.push("authority_window_end is earlier than authority_window_start");
  }

  return violations;
}

export function isTemporallyValid(
  envelope: Partial<CanonicalTemporalEnvelope>,
): envelope is CanonicalTemporalEnvelope {
  return validateTemporalEnvelope(envelope).length === 0;
}
