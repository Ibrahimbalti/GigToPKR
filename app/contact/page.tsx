import type { Metadata } from "next";
import { AppLink as Link } from "@/components/ui/AppLink";
import { ContactForm } from "@/components/contact/ContactForm";
import { InfoCard, InfoPage } from "@/components/content/InfoPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { contactPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "Contact the editorial desk",
  description:
    "Ask about a calculation, report a fee update, or send a correction to the RealGigPay editorial desk.",
  path: "/contact",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactPageSchema()} />
      <InfoPage
        crumbs={crumbs}
        eyebrow="Contact"
        title="Contact"
        lede="Use this form for a correction, a calculation question, or a partnership note. Do not send passwords, national identity numbers, or full bank details."
        asideLabel="What to send"
        asideTitle="A page URL and the source make a correction usable."
        asideText="A success message means the delivery service accepted it. It does not mean a person has already replied."
      >
        <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="grid gap-4">
            <InfoCard title="How a message is delivered">
              <p>
                {site.contactEmail
                  ? `You can also email the editorial desk directly at ${site.contactEmail}.`
                  : "Send your message through the form on this page to reach the RealGigPay editorial desk."}
              </p>
              <p>
                The form submits your inquiry securely to our editorial inbox. Please include the page
                URL and the public source you are referencing if you are reporting a fee or formula
                correction.
              </p>
              <p>
                Corrections follow the{" "}
                <Link href="/editorial-policy" className="font-semibold text-brand">
                  editorial policy
                </Link>
                .
              </p>
            </InfoCard>
            <InfoCard title="Leave these out">
              <ul className="grid gap-3">
                {[
                  "Passwords and sign-in codes.",
                  "National identity numbers.",
                  "Full bank details or payout account numbers.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </InfoCard>
          </div>
          <ContactForm />
        </div>
      </InfoPage>
    </>
  );
}
