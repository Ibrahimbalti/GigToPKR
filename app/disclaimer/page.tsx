import type { Metadata } from "next";
import { AppLink as Link } from "@/components/ui/AppLink";
import { InfoCard, InfoGrid, InfoPage } from "@/components/content/InfoPage";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Disclaimer",
  description:
    "GigToPKR estimates can differ from platform fees, Payoneer quotes, bank credits, and FBR assessments.",
  path: "/disclaimer",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Disclaimer", path: "/disclaimer" },
];

export default function DisclaimerPage() {
  return (
    <InfoPage
      crumbs={crumbs}
      eyebrow="Disclaimer"
      title="Disclaimer"
      lede="Every result is an estimate from the assumptions on the screen. It is not financial, tax, or legal advice."
      asideLabel="Not advice"
      asideTitle="The screen is a planning estimate."
      asideText="Fees, rates, and tax rules can differ from what this site shows."
    >
      <InfoGrid>
        <InfoCard title="Fees, rates, and banks">
          <p>
            Platform fees change, and Upwork&apos;s fee is specific to the contract. Payoneer shows its
            fee and rate before you confirm a withdrawal. Banks can add incoming charges. Exchange
            rates move during the day and differ between a reference feed, the State Bank&apos;s
            publications, and a commercial payout.
          </p>
        </InfoCard>
        <InfoCard title="Tax lines">
          <p>
            The 1% and 2% tax lines are illustrations. They are not the Income Tax Ordinance, a
            Finance Act, a withholding table, or a computation of your liability. Tax already
            deducted by a bank is not detected by this site. Provincial sales tax is not modeled.
          </p>
        </InfoCard>
        <InfoCard title="Examples and downloads">
          <p>
            Worked examples use the current USD to PKR reference rate and are labeled as examples. A
            missing live rate is left blank. Do not treat a downloaded PDF as a receipt or as
            evidence in a tax filing.
          </p>
        </InfoCard>
        <InfoCard title="Before you rely on a figure">
          <p>
            For a decision about your own income, read the provider&apos;s screen and, where tax is
            involved, FBR&apos;s current material or a qualified adviser.
          </p>
          <p>
            More detail sits in the{" "}
            <Link href="/about" className="font-semibold text-brand">
              about page
            </Link>{" "}
            and the{" "}
            <Link href="/terms-and-conditions" className="font-semibold text-brand">
              terms
            </Link>
            .
          </p>
        </InfoCard>
      </InfoGrid>
    </InfoPage>
  );
}
