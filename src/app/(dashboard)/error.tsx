'use client';

import { useEffect } from 'react';
import { Button, Card, CardContent } from '@/components/ui';
import { AlertTriangle } from 'lucide-react';

// Scoped error boundary for /dashboard/* — keeps the sidebar shell visible
// (the parent server layout doesn't crash) and offers a reset path.

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Hook for Sentry/Logtail when wired in Sprint 4.
    console.error('Dashboard route error:', error);
  }, [error]);

  return (
    <Card>
      <CardContent className="py-12 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-amber-500" />
        <h2 className="mt-4 text-lg font-semibold">Something went wrong loading this page</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {error.message || 'An unexpected error occurred.'}
        </p>
        {error.digest && (
          <p className="mt-1 text-xs font-mono text-muted-foreground">ref: {error.digest}</p>
        )}
        <Button onClick={reset} className="mt-6">
          Try again
        </Button>
      </CardContent>
    </Card>
  );
}
