'use client';

import { useEffect } from 'react';

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Locale error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-8">
      <h1 className="text-2xl font-bold text-turquoise mb-4">Something went wrong</h1>
      <p className="text-muted mb-6 max-w-md">{error.message}</p>
      <button
        type="button"
        onClick={() => reset()}
        className="px-6 py-3 rounded-lg bg-turquoise text-white font-medium hover:opacity-90 transition-opacity"
      >
        Try again
      </button>
    </div>
  );
}
