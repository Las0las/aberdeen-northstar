// Lightweight structured logger for API routes. JSON-line output so a log
// shipper (Vercel Logs, Logtail, Datadog, etc.) can parse without regex.
//
// We don't pull in pino because:
//   - The whole API surface only emits a handful of log lines per request.
//   - pino's transport layer adds ~150kB to each Lambda cold start.
//   - JSON.stringify is good enough until we need pretty-printing or
//     transports, at which point swap this implementation behind the same
//     export surface.
//
// Anything that helps trace a request across services goes in `meta`. The
// envelope is intentionally flat for easy querying.

type Level = 'debug' | 'info' | 'warn' | 'error';

const LEVEL_RANK: Record<Level, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const minLevel: Level = (process.env.LOG_LEVEL as Level) || 'info';

function shouldLog(level: Level): boolean {
  return LEVEL_RANK[level] >= LEVEL_RANK[minLevel];
}

function emit(level: Level, msg: string, meta?: Record<string, unknown>): void {
  if (!shouldLog(level)) return;
  const line = JSON.stringify({
    ts: new Date().toISOString(),
    level,
    msg,
    ...(meta || {}),
  });
  // Use console for output so it's captured by every Node host
  // (Vercel, Lambda, Docker) without a transport. The eslint no-console
  // rule allows warn/error; this single info call is the intentional
  // exception — every other module should call logger.info instead.
  if (level === 'error') console.error(line);
  else if (level === 'warn') console.warn(line);
  // eslint-disable-next-line no-console
  else console.log(line);
}

export const logger = {
  debug: (msg: string, meta?: Record<string, unknown>) => emit('debug', msg, meta),
  info: (msg: string, meta?: Record<string, unknown>) => emit('info', msg, meta),
  warn: (msg: string, meta?: Record<string, unknown>) => emit('warn', msg, meta),
  error: (msg: string, meta?: Record<string, unknown>) => emit('error', msg, meta),
};

/**
 * Convenience for catch blocks: extracts the safe parts of an unknown error
 * (don't put the full Error object directly into meta — it serializes weirdly).
 */
export function errorMeta(err: unknown, extra?: Record<string, unknown>): Record<string, unknown> {
  if (err instanceof Error) {
    return {
      ...extra,
      err: {
        name: err.name,
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
      },
    };
  }
  return { ...extra, err: String(err) };
}
