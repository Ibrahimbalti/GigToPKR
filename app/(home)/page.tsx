import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { AppLink as Link } from "@/components/ui/AppLink";
import { AdSlot } from "@/components/ads/AdSlot";
import { CalculatorPreview } from "@/components/calculator/CalculatorPreview";
import { ContentBlocks, SourceList } from "@/components/content/ContentBlocks";
import { AuthorCard } from "@/components/seo/AuthorCard";
import { Hero } from "@/components/sections/Hero";
import {
  BenefitsSkeleton,
  FAQSkeleton,
  FinalCtaSkeleton,
  HowItWorksSkeleton,
  PlatformComparisonSkeleton,
} from "@/components/skeletons/pages";
import { homeArticle, homeSources } from "@/content/home";
import { buildMetadata } from "@/lib/seo/metadata";

const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks").then((mod) => mod.HowItWorks), {
  loading: () => <HowItWorksSkeleton />,
});
const PlatformComparison = dynamic(
  () => import("@/components/sections/PlatformComparison").then((mod) => mod.PlatformComparison),
  { loading: () => <PlatformComparisonSkeleton /> },
);
const Benefits = dynamic(() => import("@/components/sections/Benefits").then((mod) => mod.Benefits), {
  loading: () => <BenefitsSkeleton />,
});
const FAQ = dynamic(() => import("@/components/sections/FAQ").then((mod) => mod.FAQ), {
  loading: () => <FAQSkeleton />,
});
const FinalCta = dynamic(() => import("@/components/sections/FinalCta").then((mod) => mod.FinalCta), {
  loading: () => <FinalCtaSkeleton />,
});

export const metadata: Metadata = buildMetadata({
  title: "Freelancer Fee Calculator Pakistan",
  description:
    "Estimate what a Pakistani freelancer could receive in PKR after Fiverr or Upwork fees, a Payoneer assumption, currency conversion, and an illustrative tax line.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="pb-2">
        <AdSlot placement="hero" />
      </div>
      <section id="calculator" className="shell scroll-mt-24 py-10 lg:py-14" aria-labelledby="home-calculator">
        <div className="mb-5 max-w-2xl">
          <h2 id="home-calculator" className="text-[clamp(1.6rem,2.4vw,2rem)] font-semibold tracking-[-0.03em]">
            Estimate a payout
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            The same calculator lives on the{" "}
            <Link href="/calculator" className="font-semibold text-brand">
              calculator page
            </Link>
            . Results update with the inputs.
          </p>
        </div>
        <CalculatorPreview enhance />
      </section>
      <HowItWorks />
      <PlatformComparison />
      <Benefits />
      <div className="py-2">
        <AdSlot placement="in-content" />
      </div>
      <FAQ />
      <FinalCta />
      <article className="cv-auto shell grid gap-8 py-16 lg:py-20">
        <ContentBlocks sections={homeArticle} />
        <SourceList sources={homeSources} />
        <AuthorCard />
        <p className="text-sm text-muted">Reviewed 17 November 2026. This article is the working explanation behind the calculator.</p>
      </article>
      <div className="pb-8">
        <AdSlot placement="footer" />
      </div>
    </>
  );
}
