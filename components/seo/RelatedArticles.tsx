import Link from "next/link";
import type { RelatedLink } from "@/types/content";

export function RelatedArticles({ links }: { links: RelatedLink[] }) {
  if (!links.length) return null;
  return (
    <section aria-labelledby="related-heading" className="grid gap-3">
      <h2 id="related-heading" className="text-xl font-semibold tracking-[-0.02em] text-ink">
        Related resources
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="surface lift block rounded-2xl px-4 py-3 text-sm font-semibold text-navy"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
