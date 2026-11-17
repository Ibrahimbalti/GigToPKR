"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto grid max-w-xl gap-4 px-4 py-20 text-center">
      <h1 className="text-3xl font-semibold">This page hit a problem</h1>
      <p className="text-muted">The calculation engine is unchanged. Try the page again.</p>
      {error.digest ? <p className="text-xs text-muted">Reference {error.digest}</p> : null}
      <button type="button" onClick={reset} className="cta-gradient mx-auto rounded-xl px-4 py-2.5 text-sm font-semibold text-white">
        Try again
      </button>
    </div>
  );
}
