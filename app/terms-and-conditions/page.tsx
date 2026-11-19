import type { Metadata } from "next";
import { AppLink as Link } from "@/components/ui/AppLink";
import { InfoCard, InfoGrid, InfoPage } from "@/components/content/InfoPage";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Terms and Conditions",
  description:
    "The terms for using RealGigPay, including the calculator assumptions and the limit on liability.",
  path: "/terms-and-conditions",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Terms", path: "/terms-and-conditions" },
];

export default function TermsPage() {
  return (
    <InfoPage
      crumbs={crumbs}
      eyebrow="Terms"
      title="Terms and conditions"
      lede="By using RealGigPay you agree to treat the results as estimates and the writing as general information."
      asideLabel="Estimates"
      asideTitle="A result is not an official statement."
      asideText="Check the payout screen and the current law before you rely on a figure."
    >
      <InfoGrid>
        <InfoCard title="Using the site">
          <p>
            You may use the calculator and read the guides for personal or internal business
            planning. You may not present a RealGigPay result as an official statement from Fiverr,
            Upwork, a payment provider, a bank, or a tax authority. You may not attempt to disrupt the site or submit
            automated contact messages.
          </p>
        </InfoCard>
        <InfoCard title="Intellectual property">
          <p>
            The text, layout, and code of this site are published by RealGigPay. Platform names are
            the property of their owners and are used here to describe publicly documented fees.
            You may quote a short passage with a link to the page. You may not copy the site into
            another product and present it as an official calculator of those companies.
          </p>
        </InfoCard>
        <InfoCard title="Calculator assumptions">
          <p>
            The 20%, 10%, 2%, 1%, and 2% figures are the assumptions defined in the interface. They
            can be wrong for your contract, your Payoneer corridor, and your tax year. Exchange
            rates, when shown, are reference quotes or numbers you typed. You are responsible for
            checking the payout screen and the current law before you rely on a figure.
          </p>
        </InfoCard>
        <InfoCard title="Third-party services">
          <p>
            Frankfurter and ExchangeRate-API can be unavailable. A configured contact webhook,
            analytics tag, or ad tag is optional and governed by that provider as well as these
            terms. Outbound links are not endorsements.
          </p>
        </InfoCard>
        <InfoCard title="Liability" className="lg:col-span-2">
          <p>
            The site is provided as-is. To the extent the law allows, RealGigPay is not liable for
            decisions you make from an estimate, including pricing a client, withdrawing on a given
            day, or filing a tax return. Nothing here excludes liability that cannot legally be
            excluded.
          </p>
          <p>
            The separate{" "}
            <Link href="/disclaimer" className="font-semibold text-brand">
              disclaimer
            </Link>{" "}
            describes how an estimate can differ from a payout or a tax assessment.
          </p>
        </InfoCard>
      </InfoGrid>
    </InfoPage>
  );
}
