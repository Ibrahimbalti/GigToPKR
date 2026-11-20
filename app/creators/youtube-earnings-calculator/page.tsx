import type { Metadata } from "next";
import { Suspense } from "react";
import { AdSlot } from "@/components/ads/AdSlot";
import { YouTubeCalculator } from "@/components/creators/YouTubeCalculator";
import { YouTubeGuide, youtubeFaqs } from "@/components/creators/youtubeGuide";
import { defaultYouTubeForm } from "@/components/creators/youtubeModel";
import { PageHeader } from "@/components/layout/PageHeader";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLd } from "@/components/seo/JsonLd";
import { YOUTUBE_DISCLAIMER, YOUTUBE_NOT_AFFILIATED } from "@/data/youtube";
import { getCachedUsdToPkrQuote } from "@/lib/exchange-rate";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqSchema, webApplicationSchema } from "@/lib/seo/schema";
import type { DisplayCurrency } from "@/lib/youtubeCalc";

const path = "/creators/youtube-earnings-calculator";
const title = "YouTube earnings calculator";
const description =
  "Estimate YouTube revenue from your own RPM or CPM as a low, expected, and high range in USD. Includes a views check and YPP comparison. Not a payout or tax advice.";
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Creators", path: "/creators" },
  { name: "YouTube earnings calculator", path },
];

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path,
});

function positive(value: number | null | undefined): number | null {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) return null;
  return value;
}

export default async function Page() {
  const quote = await getCachedUsdToPkrQuote();
  const offers = (
    [
      ["PKR", positive(quote.rate)],
      ["EUR", positive(quote.crosses?.EUR)],
      ["GBP", positive(quote.crosses?.GBP)],
      ["AED", positive(quote.crosses?.AED)],
    ] as const
  ).flatMap(([code, rate]) => (rate ? [{ code: code as DisplayCurrency, rate }] : []));

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <JsonLd data={[webApplicationSchema(path, title, description), faqSchema([...youtubeFaqs])]} />
      <div className="shell grid gap-8 py-10">
        <Breadcrumbs items={crumbs} />
        <PageHeader
          eyebrow="Creator estimate"
          title="YouTube earnings calculator"
          lede="A range from the RPM or CPM you enter. The USD result is the estimate. A currency figure, when one is shown, is only a display conversion."
        />
        <p className="max-w-3xl text-sm leading-6 text-muted">{YOUTUBE_DISCLAIMER}</p>
        <p className="max-w-3xl text-sm leading-6 text-muted">{YOUTUBE_NOT_AFFILIATED}</p>
        <Suspense fallback={<div className="min-h-[600px]" aria-hidden="true" />}>
          <YouTubeCalculator
            initial={defaultYouTubeForm()}
            today={new Date().toISOString().slice(0, 10)}
            offers={offers}
            rateSource={offers.length ? quote.sourceLabel : null}
            rateUpdatedAt={offers.length ? quote.retrievedAt : null}
          />
        </Suspense>
      </div>
      <AdSlot placement="in-content" />
      <YouTubeGuide />
      <AdSlot placement="footer" />
    </>
  );
}
