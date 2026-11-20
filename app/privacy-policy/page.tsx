import type { Metadata } from "next";
import { AppLink as Link } from "@/components/ui/AppLink";
import { InfoCard, InfoGrid, InfoPage } from "@/components/content/InfoPage";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "What RealGigPay collects, what the calculator keeps in the browser, and when analytics or ads load.",
  path: "/privacy-policy",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Privacy policy", path: "/privacy-policy" },
];

export default function PrivacyPage() {
  return (
    <InfoPage
      crumbs={crumbs}
      eyebrow="Privacy"
      title="Privacy policy"
      lede="This policy describes the site as it is built. It does not describe a future analytics setup that has not been turned on."
      asideLabel="No account"
      asideTitle="Order amounts stay in the page."
      asideText="There is no user database to export, and typed rates are not sent with the exchange-rate request."
    >
      <InfoGrid>
        <InfoCard title="Calculator data">
          <p>
            Order amounts, platform choices, and exchange rates you type stay in the page. They are
            not saved in an account, because there is no account. The PDF is created in your browser
            and downloaded to your device. Copying a result uses the browser clipboard.
          </p>
        </InfoCard>
        <InfoCard title="Exchange-rate request">
          <p>
            The browser asks this site for /api/exchange-rate. That route requests Frankfurter and,
            if PKR is missing, ExchangeRate-API&apos;s open USD feed. The request does not include your
            order amount. The response may be cached for a short time so the providers are not called
            on every keystroke.
          </p>
        </InfoCard>
        <InfoCard title="Contact messages">
          <p>
            If you submit the contact form, our server receives your name, email address, topic, and
            message and forwards them to our editorial inbox so we can review and respond. A hidden
            honeypot field is used to ignore automated spam submissions, and the route limits repeat
            posts from the same IP address. Do not include account passwords or identity-document
            numbers.
          </p>
        </InfoCard>
        <InfoCard title="Cookies, analytics, and advertising">
          <p>
            A consent choice is stored in your browser&apos;s localStorage under{" "}
            <code>realgigpay-consent</code>. Until you allow it, Google Analytics and Google AdSense
            scripts stay off. If you allow analytics, Google Analytics 4 receives page views and
            anonymous calculator interaction events (such as starting or completing a calculation,
            selecting a platform, copying a result, or downloading a PDF), with IP anonymization
            enabled. If you allow ads, Google AdSense may use cookies to serve relevant
            advertisements under Google&apos;s privacy policy.
          </p>
        </InfoCard>
        <InfoCard title="Third parties">
          <p>
            Frankfurter, ExchangeRate-API, and any configured webhook, analytics, or ad service
            process the requests described above under their own terms. Links to Fiverr, Upwork,
            payment providers, banks, tax authorities, and other sources leave this site.
          </p>
        </InfoCard>
        <InfoCard title="Security and your choices">
          <p>
            The site is served over HTTPS in production. No secret keys are required for the
            calculator. You can decline analytics, avoid the contact form, and clear the consent
            value in your browser. To ask for a correction to a page, use the{" "}
            <Link href="/contact" className="font-semibold text-brand">
              contact page
            </Link>
            . This site does not operate a user database against which a data export can be run.
          </p>
        </InfoCard>
      </InfoGrid>
    </InfoPage>
  );
}
