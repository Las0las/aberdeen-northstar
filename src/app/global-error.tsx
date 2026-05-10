'use client';

// Top-level error boundary. Catches errors that escape the (dashboard) and
// (auth) segments — including errors in the root layout. Must include its
// own <html>/<body> tags because it replaces the root layout.

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-semibold">Something went wrong</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              An unexpected error occurred. The team has been notified.
            </p>
            {error.digest && (
              <p className="mt-1 text-xs font-mono text-muted-foreground">
                ref: {error.digest}
              </p>
            )}
            <button
              onClick={reset}
              className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
