import type { Metadata } from "next";
import { AppLink as Link } from "@/components/ui/AppLink";
import { PageHeader } from "@/components/layout/PageHeader";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { LastUpdated } from "@/components/seo/LastUpdated";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Creator Earnings Calculators & Payout Tools",
  description:
    "Transparent revenue estimators for video creators and independent publishers. Model RPM, CPM, audience geography, and payout thresholds.",
  path: "/creators",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Creators", path: "/creators" },
];

export default function CreatorsIndexPage() {
  return (
    <div className="shell grid gap-8 py-10 lg:py-14">
      <BreadcrumbJsonLd items={crumbs} />
      <Breadcrumbs items={crumbs} />
      <div>
        <PageHeader
          eyebrow="Creator Tools"
          title="Creator earnings calculators"
          lede="Estimate video ad revenue from the RPM or CPM you enter, test audience country mixes and US tax withholding, and compare freelance payout routes."
        />
        <div className="mt-3">
          <LastUpdated publishedAt="2026-11-19" updatedAt="2026-11-19" />
        </div>
      </div>

      <section aria-labelledby="creator-calculators" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <h2 id="creator-calculators" className="sr-only">
          Available calculators
        </h2>
        <Link href="/creators/youtube-earnings-calculator" className="surface lift rounded-3xl p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">YouTube AdSense</p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em]">YouTube earnings calculator</h3>
          <p className="mt-2 text-sm leading-6 text-muted">
            Estimate low, expected, and high monthly and yearly revenue from your RPM or CPM, including audience country mix, Shorts eligibility, YPP progress, and reverse view goals.
          </p>
          <span className="mt-4 inline-flex text-sm font-semibold text-brand">Open YouTube calculator</span>
        </Link>

        <Link href="/payoneer-fee-calculator" className="surface lift rounded-3xl p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Cross-border payout</p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em]">Payoneer fee calculator</h3>
          <p className="mt-2 text-sm leading-6 text-muted">
            Model percentage bank-withdrawal charges and currency conversion spreads for international creator and freelance payouts.
          </p>
          <span className="mt-4 inline-flex text-sm font-semibold text-brand">Estimate withdrawal fees</span>
        </Link>

        <Link href="/freelancer-tax-calculator" className="surface lift rounded-3xl p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Tax set-aside</p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em]">Tax estimate calculator</h3>
          <p className="mt-2 text-sm leading-6 text-muted">
            Compare illustrative 1% and 2% tax set-aside assumptions after currency conversion. Not a statutory tax assessment.
          </p>
          <span className="mt-4 inline-flex text-sm font-semibold text-brand">Compare tax assumptions</span>
        </Link>
      </section>
    </div>
  );
}
