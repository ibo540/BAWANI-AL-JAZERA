'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: '2rem', fontFamily: 'system-ui', background: '#1b1b1a', color: '#fff', minHeight: '100vh' }}>
        <h1 style={{ color: '#00bbbe' }}>Something went wrong</h1>
        <p>{error.message}</p>
        <button
          type="button"
          onClick={() => reset()}
          style={{ padding: '0.5rem 1rem', background: '#00bbbe', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
