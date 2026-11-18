import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/BlogCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { editorialCalendar } from "@/content/editorial-calendar";
import { articlesByKind } from "@/content/registry";
import { buildMetadata } from "@/lib/seo/metadata";
import Link from "next/link";

export const metadata: Metadata = buildMetadata({
  title: "Freelance fee articles",
  description:
    "Published articles on calculating freelance income, comparing Fiverr and Upwork, and planning PKR cash flow.",
  path: "/blog",
});

export default function BlogPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ];
  return (
    <div className="shell grid gap-8 py-10">
      <BreadcrumbJsonLd items={crumbs} />
      <Breadcrumbs items={crumbs} />
      <PageHeader
        title="Blog"
        lede="Four articles are published. The editorial calendar below is a plan, not a set of articles, and those planned titles are not separate pages."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {articlesByKind("blog").map((article) => (
          <BlogCard key={article.path} article={article} />
        ))}
      </div>
      <section className="grid gap-3">
        <h2 className="text-2xl font-semibold">Editorial calendar</h2>
        <ul className="surface divide-y divide-line overflow-hidden rounded-3xl">
          {editorialCalendar.map((idea) => (
            <li key={idea.title} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">{idea.title}</p>
                <p className="text-sm text-muted">{idea.intent}</p>
              </div>
              {idea.href ? (
                <Link href={idea.href} className="text-sm font-semibold text-brand">
                  {idea.status === "published" ? "Read article" : "Read the guide"}
                </Link>
              ) : (
                <span className="text-sm font-semibold text-muted">Planned, not published</span>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
