import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/BlogCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { articlesByKind } from "@/content/registry";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Freelance Platform and Payment Guides",
  description:
    "Practical guides to marketplace fees, withdrawals, currency conversion, and payment records for freelancers worldwide.",
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
        lede="These guides cover marketplace fees, withdrawals, and currency conversion for freelancers worldwide. Payout methods, provider charges, bank fees, and tax rules vary by account and country, so confirm the terms that apply to you. Embedded calculator examples use PKR and illustrative tax assumptions; they are not universal quotes or tax advice."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {articlesByKind("guide").map((article) => (
          <BlogCard key={article.path} article={article} />
        ))}
      </div>
    </div>
  );
}
