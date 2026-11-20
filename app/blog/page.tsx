import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/BlogCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { articlesByKind } from "@/content/registry";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Freelance fee articles",
  description:
    "Published articles on calculating freelance income, comparing Fiverr and Upwork, and planning PKR cash flow.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = articlesByKind("blog");
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
        lede="Practical articles on calculating freelance take-home pay, comparing marketplace fees, and planning cross-border payouts."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((article) => (
          <BlogCard key={article.path} article={article} />
        ))}
      </div>
    </div>
  );
}
