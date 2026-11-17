import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/BlogCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { articlesByKind } from "@/content/registry";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Freelancer Guides for Pakistan",
  description:
    "Guides on Fiverr fees, Upwork fees, Payoneer withdrawals, and USD to PKR conversion for Pakistani freelancers.",
  path: "/guides",
});

export default function GuidesPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
  ];
  return (
    <div className="shell grid gap-6 py-10">
      <BreadcrumbJsonLd items={crumbs} />
      <Breadcrumbs items={crumbs} />
      <PageHeader
        title="Freelancer guides"
        lede="Each guide answers a different question: the platform fee, the withdrawal, the formula, or the exchange rate. They share one calculator so the numbers do not drift."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {articlesByKind("guide").map((article) => (
          <BlogCard key={article.path} article={article} />
        ))}
      </div>
    </div>
  );
}
