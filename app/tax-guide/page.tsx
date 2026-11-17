import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/BlogCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { articlesByKind } from "@/content/registry";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Pakistan Freelancer Tax Guides",
  description:
    "Plain-language tax context for Pakistani freelancers. Illustrative calculator rates are not FBR assessments.",
  path: "/tax-guide",
});

export default function TaxIndexPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Tax guide", path: "/tax-guide" },
  ];
  return (
    <div className="shell grid gap-6 py-10">
      <BreadcrumbJsonLd items={crumbs} />
      <Breadcrumbs items={crumbs} />
      <PageHeader
        title="Tax guide"
        lede="These pages explain filer status, IT-export questions, and records. They do not quote a current statutory rate, because that rate belongs in the latest Finance Act and on FBR."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {articlesByKind("tax").map((article) => (
          <BlogCard key={article.path} article={article} />
        ))}
      </div>
    </div>
  );
}
