import type { Metadata } from "next";
import { AppLink as Link } from "@/components/ui/AppLink";
import { AdSlot } from "@/components/ads/AdSlot";
import { ContentBlocks, SourceList } from "@/components/content/ContentBlocks";
import { AuthorCard } from "@/components/seo/AuthorCard";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Benefits } from "@/components/sections/Benefits";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PlatformComparison } from "@/components/sections/PlatformComparison";
import { homeArticle, homeSources } from "@/content/home";
import { buildMetadata } from "@/lib/seo/metadata";

export const revalidate = 1800;

export const metadata: Metadata = buildMetadata({
  title: "Freelancer Fee Calculator",
  description:
    "Estimate what you keep from a Fiverr or Upwork order after platform and withdrawal fees. Open the calculator for the marketplace you use.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }]} />
      <Hero />
      <div className="pb-2">
        <AdSlot placement="hero" />
      </div>
      <section id="calculators" className="shell scroll-mt-24 py-10 lg:py-14" aria-labelledby="home-calculators">
        <div className="mb-5 max-w-2xl">
          <h2 id="home-calculators" className="text-[clamp(1.6rem,2.4vw,2rem)] font-semibold tracking-[-0.03em]">
            Choose a calculator
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Choose a platform calculator or explore a full earnings, withdrawal, income, or tax estimate.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/fiverr-fee-calculator" className="surface lift rounded-3xl p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Fiverr only</p>
            <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em]">Fiverr calculator</h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              Starts at the published 80% share, so the fee field opens at 20%. You can edit it. There is no Upwork option on that page.
            </p>
            <span className="mt-4 inline-flex text-sm font-semibold text-brand">Calculate Fiverr earnings</span>
          </Link>
          <Link href="/upwork-fee-calculator" className="surface lift rounded-3xl p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Upwork only</p>
            <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em]">Upwork calculator</h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              Fee shortcuts are 0%, 5%, 10%, and 15%. It opens at 10%. There is no Fiverr option on that page.
            </p>
            <span className="mt-4 inline-flex text-sm font-semibold text-brand">Calculate Upwork earnings</span>
          </Link>
          <Link href="/payoneer-fee-calculator" className="surface lift rounded-3xl p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Withdrawal estimate</p>
            <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em]">Payoneer fee calculator</h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              See how a withdrawal percentage changes earnings after the platform fee, then compare it with your account quote.
            </p>
            <span className="mt-4 inline-flex text-sm font-semibold text-brand">Estimate a withdrawal</span>
          </Link>
          <Link href="/freelancer-income-calculator" className="surface lift rounded-3xl p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Monthly projection</p>
            <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em]">Freelancer income calculator</h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              Project a month by multiplying one order estimate across a number of similar orders.
            </p>
            <span className="mt-4 inline-flex text-sm font-semibold text-brand">Project monthly income</span>
          </Link>
          <Link href="/freelancer-tax-calculator" className="surface lift rounded-3xl p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Illustrative only</p>
            <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em]">Freelancer tax estimate</h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              Compare example tax percentages after fees and conversion. The result is not a tax assessment.
            </p>
            <span className="mt-4 inline-flex text-sm font-semibold text-brand">Compare tax assumptions</span>
          </Link>
          <Link href="/creators/youtube-earnings-calculator" className="surface lift rounded-3xl p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">YouTube only</p>
            <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em]">YouTube calculator</h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              Estimates a low, expected, and high range from the RPM or CPM you enter. It is not a payout quote.
            </p>
            <span className="mt-4 inline-flex text-sm font-semibold text-brand">Estimate YouTube earnings</span>
          </Link>
        </div>
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
