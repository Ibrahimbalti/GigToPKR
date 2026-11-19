import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/BlogCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { articlesByKind } from "@/content/registry";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Freelancer Tax Guides",
  description:
    "Plain-language tax planning questions for freelancers. Calculator percentages are illustrations, not statutory rates or tax assessments.",
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
        lede="Tax rules depend on your residence, business structure, income type, and current local law. These guides help you organize questions and records; consult your official tax authority or a qualified local adviser for rules that apply to you."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {articlesByKind("tax").map((article) => (
          <BlogCard key={article.path} article={article} />
        ))}
      </div>
    </div>
  );
}
