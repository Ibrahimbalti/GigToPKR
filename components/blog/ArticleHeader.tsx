import { LastUpdated } from "@/components/seo/LastUpdated";

export function ArticleHeader({
  eyebrow,
  h1,
  directAnswer,
  publishedAt,
  updatedAt,
  readingTime,
}: {
  eyebrow: string;
  h1: string;
  directAnswer: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
}) {
  return (
    <header className="relative max-w-3xl overflow-hidden rounded-3xl border border-white/80 bg-white px-6 py-6 shadow-[var(--shadow)] sm:px-7">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">{eyebrow}</p>
      <h1 className="mt-2 text-[clamp(1.7rem,3vw,2.35rem)] font-semibold leading-[1.15] tracking-[-0.03em]">{h1}</h1>
      <p className="mt-3 text-base leading-7 text-muted">{directAnswer}</p>
      <div className="mt-3">
        <LastUpdated publishedAt={publishedAt} updatedAt={updatedAt} readingTime={readingTime} />
      </div>
    </header>
  );
}
