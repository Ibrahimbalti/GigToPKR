import Link from "next/link";
import { AdSlot } from "@/components/ads/AdSlot";
import { PageHeader } from "@/components/layout/PageHeader";
import { ExchangeRateProvider } from "@/components/calculator/ExchangeRateProvider";
import { CalculatorGate } from "@/components/calculator/CalculatorGate";
import { CalculatorPreview } from "@/components/calculator/CalculatorPreview";
import { CurrencyConverter } from "@/components/calculator/CurrencyConverter";
import { ContentBlocks, SourceList } from "@/components/content/ContentBlocks";
import { AuthorCard } from "@/components/seo/AuthorCard";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { LastUpdated } from "@/components/seo/LastUpdated";
import { RelatedArticles } from "@/components/seo/RelatedArticles";
import { Accordion } from "@/components/ui/Accordion";
import { getTool } from "@/content/tools";
import { buildMetadata } from "@/lib/seo/metadata";
import { softwareSchema, type Crumb } from "@/lib/seo/schema";
import { notFound } from "next/navigation";

export function ToolScreen({ path, crumbs }: { path: string; crumbs: Crumb[] }) {
  const page = getTool(path);
  if (!page) notFound();

  return (
    <div className="shell grid gap-8 py-10">
      <BreadcrumbJsonLd items={crumbs} />
      <JsonLd data={softwareSchema(page.path, page.h1, page.description)} />
      <Breadcrumbs items={crumbs} />
      <div>
        <PageHeader compact eyebrow={page.eyebrow} title={page.h1} lede={page.directAnswer} />
        <div className="mt-3">
          <LastUpdated publishedAt={page.updatedAt} updatedAt={page.updatedAt} />
        </div>
      </div>
      {page.mode === "converter" ? (
        <ExchangeRateProvider>
          <CurrencyConverter />
        </ExchangeRateProvider>
      ) : null}
      <CalculatorGate
        defaultPlatform={page.defaultPlatform}
        defaultTax={page.defaultTax}
        showMonthly={page.mode === "income"}
      >
        <CalculatorPreview />
      </CalculatorGate>
      <AdSlot placement="sidebar" />
      <ContentBlocks sections={page.sections} />
      <section className="grid gap-3">
        <h2 className="text-2xl font-semibold">Questions about this calculator</h2>
        <Accordion items={page.faqs} />
      </section>
      <SourceList sources={page.sources} />
      <RelatedArticles links={page.related} />
      <AuthorCard />
      <p className="text-sm text-muted">
        Need a correction? <Link href="/contact" className="font-semibold text-brand">Contact the editorial desk</Link>.
      </p>
    </div>
  );
}

export function toolMetadata(path: string) {
  const page = getTool(path);
  if (!page) return {};
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
  });
}
