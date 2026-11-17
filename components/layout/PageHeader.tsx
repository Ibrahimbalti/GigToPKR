export function PageHeader({
  eyebrow,
  title,
  lede,
  compact = false,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  compact?: boolean;
}) {
  return (
    <header
      className={
        compact
          ? "relative overflow-hidden rounded-2xl border border-white/80 bg-white px-4 py-4 shadow-[var(--shadow)] sm:px-5"
          : "relative overflow-hidden rounded-3xl border border-white/80 bg-white px-6 py-6 shadow-[var(--shadow)] sm:px-8 sm:py-7"
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-16 size-44 rounded-full bg-brand/10"
      />
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">{eyebrow}</p>
      ) : null}
      <h1 className="mt-2 max-w-3xl text-[clamp(1.7rem,3vw,2.35rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-ink">
        {title}
      </h1>
      {lede ? <p className="mt-3 max-w-2xl text-base leading-7 text-muted">{lede}</p> : null}
    </header>
  );
}
