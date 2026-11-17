"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", margin: 0, background: "#F8FAFC", color: "#0F172A" }}>
        <main style={{ maxWidth: 560, margin: "10vh auto", padding: 24 }}>
          <h1>GigToPKR could not load</h1>
          <p>Refresh the page. If a calculation was on screen, it was not saved on a server.</p>
          {error.digest ? <p>Reference {error.digest}</p> : null}
          <button type="button" onClick={reset}>
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
