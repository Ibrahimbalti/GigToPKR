import Link from "next/link";
import { articleReadingTime } from "@/content/registry";
import type { Article } from "@/types/content";

const labels: Record<Article["kind"], { kind: string; action: string }> = {
  blog: { kind: "Article", action: "Read article" },
  guide: { kind: "Guide", action: "Read guide" },
  tax: { kind: "Tax guide", action: "Read guide" },
};

export function BlogCard({ article }: { article: Article }) {
  const label = labels[article.kind];
  return (
    <article className="surface lift rounded-3xl">
      <Link href={article.path} className="block rounded-3xl p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">{label.kind}</p>
        <h2 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-ink">{article.h1}</h2>
        <p className="mt-2 text-sm leading-6 text-muted">{article.excerpt}</p>
        <p className="mt-4 flex items-center justify-between gap-3 text-xs text-muted">
          <span>{articleReadingTime(article)}</span>
          <span className="text-sm font-semibold text-brand">{label.action}</span>
        </p>
      </Link>
    </article>
  );
}
