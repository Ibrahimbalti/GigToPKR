import type { Metadata } from "next";
import { AppLink as Link } from "@/components/ui/AppLink";
import { InfoCard, InfoGrid, InfoPage } from "@/components/content/InfoPage";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Editorial Policy",
  description:
    "How RealGigPay researches freelancer fees, labels assumptions, dates reviews, and handles corrections.",
  path: "/editorial-policy",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Editorial policy", path: "/editorial-policy" },
];

export default function EditorialPolicyPage() {
  return (
    <InfoPage
      crumbs={crumbs}
      eyebrow="Editorial"
      title="Editorial policy"
      lede="Pages are written to answer a question, show the arithmetic, and point at a primary source. They are not written to imitate an official help center."
      asideLabel="Sources"
      asideTitle="A cited page, or the claim stays out."
      asideText="A review date moves when the page changes. It is not refreshed just to look recent."
    >
      <InfoGrid>
        <InfoCard title="Research">
          <p>
            Fee statements are checked against the provider&apos;s own help or pricing page when one is
            available: Fiverr Help, Upwork Help, and Payoneer&apos;s pricing page. Tax pages describe
            questions and point to the Federal Board of Revenue rather than quoting a statutory rate
            the desk has not re-read in the current Finance Act. Exchange-rate behavior is checked
            against Frankfurter&apos;s currency list.
          </p>
        </InfoCard>
        <InfoCard title="What we will not do">
          <p>
            We do not invent expert biographies, testimonials, review scores, keyword volumes, or
            live exchange rates. We do not publish a thin page just to match a keyword. Planned
            articles stay on the blog calendar until they have their own sources and examples.
          </p>
        </InfoCard>
        <InfoCard title="Review and updates">
          <p>
            Each guide shows a publication date and a review date. The first version of this site
            was reviewed on 17 November 2026. A page is updated when a cited fee page changes or a
            correction is accepted, and the review date moves with that edit. A date is not refreshed
            just to look recent.
          </p>
        </InfoCard>
        <InfoCard title="Corrections">
          <p>
            If a page misstates a public fee or a formula, send the page URL and the source through
            the{" "}
            <Link href="/contact" className="font-semibold text-brand">
              contact form
            </Link>
            . Corrections that check out are edited in the page. The calculator formula changes only
            when the assumption itself is being changed, and the interface text changes with it.
          </p>
          <p>
            The people writing this are the RealGigPay editorial desk. That is a role, not a list of
            professional licenses.
          </p>
        </InfoCard>
      </InfoGrid>
    </InfoPage>
  );
}
