import type { Metadata } from "next";
import Link from "next/link";
import WiseCalculator from "@/components/WiseCalculator";
import { AdSlot } from "@/components/ads/AdSlot";
import { ListChecks, SlidersHorizontal, Wallet } from "@/components/icons";
import { PageHeader } from "@/components/layout/PageHeader";
import { AuthorCard } from "@/components/seo/AuthorCard";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { LastUpdated } from "@/components/seo/LastUpdated";
import { RelatedArticles } from "@/components/seo/RelatedArticles";
import { Accordion } from "@/components/ui/Accordion";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqSchema, webApplicationSchema } from "@/lib/seo/schema";

const path = "/wise-fee-calculator";
const title = "Wise Fee Calculator — Estimate Transfer Fees & Exchange Rate";
const description =
  "Calculate Wise transfer fees and see how much your recipient gets in PKR, INR, or other currencies. Free tool for freelancers.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path,
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Wise Fee Calculator", path: "/wise-fee-calculator" },
];

const HOW_IT_WORKS_STEPS = [
  {
    n: "01",
    icon: ListChecks,
    title: "Enter your send amount and currencies",
    description:
      "Type the amount you want to send, choose your sending currency (USD, GBP, EUR, AED, CAD, or AUD), and pick the recipient currency (PKR, INR, BDT, NPR, LKR, or PHP).",
  },
  {
    n: "02",
    icon: SlidersHorizontal,
    title: "See the Wise fee breakdown",
    description:
      "Compare Bank Transfer (~0.44%–0.60% + fixed fee) vs. Card Payment (+1.5% card fee). The calculator deducts the estimated Wise fee before currency conversion.",
  },
  {
    n: "03",
    icon: Wallet,
    title: "Know exactly what your recipient receives",
    description:
      "Review the net amount converted, the static mid-market exchange rate estimate, the final payout in local currency, and the expected delivery window.",
  },
];

const FAQS = [
  {
    question: "What are Wise transfer fees?",
    answer:
      "Wise charges a transparent two-part fee: a small fixed fee (for example, around $0.54 USD) to cover transaction processing plus a variable percentage of the transfer amount (typically ~0.41% to 0.60% for bank transfers depending on the currency corridor). Paying by debit or credit card adds an extra processing fee of roughly 1.5%.",
  },
  {
    question: "How does Wise calculate exchange rates?",
    answer:
      "Wise uses the mid-market exchange rate—the midpoint between the buy and sell rates on global currency markets—without adding a hidden exchange-rate markup. Instead, Wise charges its service fee upfront and converts the remaining balance at the mid-market rate. The rates shown in this calculator are static estimates, not live quotes.",
  },
  {
    question: "Is Wise cheaper than Payoneer for Pakistani freelancers?",
    answer:
      "On direct client transfers, Wise often has a lower total cost because its percentage fee (~0.55%–0.59% + fixed fee) is paired with the mid-market rate, whereas Payoneer bank withdrawals typically involve a 2% to 3% withdrawal fee or exchange-rate margin. However, marketplace availability and account eligibility differ between the two services.",
  },
  {
    question: "How long does a Wise transfer to Pakistan take?",
    answer:
      "Transfers funded via card payment or existing Wise balance often arrive instantly or within a few hours via local bank rails (IBFT/Raast). Transfers funded via ACH or domestic bank transfer typically take 1–2 business days to clear and reach a Pakistani bank account.",
  },
  {
    question: "Is Wise available in Pakistan?",
    answer:
      "Clients and senders abroad can send money to Pakistani PKR bank accounts and IBANs through Wise. However, opening new Wise balances or receiving local USD account details for new residents in Pakistan has periodic onboarding restrictions—check Wise's official availability page for current account opening rules.",
  },
];

const RELATED_CALCULATORS = [
  {
    href: "/payoneer-fee-calculator",
    eyebrow: "Withdrawal estimate",
    label: "Payoneer Fee Calculator",
    description: "See how a Payoneer withdrawal percentage changes earnings after platform fees.",
  },
  {
    href: "/fiverr-fee-calculator",
    eyebrow: "Fiverr only",
    label: "Fiverr Calculator",
    description: "Calculate Fiverr's published 20% commission and withdrawal take-home pay.",
  },
  {
    href: "/upwork-fee-calculator",
    eyebrow: "Upwork only",
    label: "Upwork Calculator",
    description: "Model Upwork freelancer service fees inside the 0% to 15% contract range.",
  },
  {
    href: "/freelancer-income-calculator",
    eyebrow: "Monthly projection",
    label: "Freelancer Income Calculator",
    description: "Project monthly freelance take-home pay by multiplying across similar orders.",
  },
  {
    href: "/freelancer-tax-calculator",
    eyebrow: "Illustrative only",
    label: "Freelancer Tax Calculator",
    description: "Compare illustrative tax set-aside percentages after fees and currency conversion.",
  },
];

const RELATED_GUIDES = [
  { href: "/guides/currency-conversion-guide", label: "Reference vs. payout exchange rates" },
  { href: "/guides/freelancer-currency-conversion", label: "How to record implied exchange rates" },
  { href: "/guides/payoneer-fees", label: "Payoneer fees explained" },
  { href: "/blog/how-to-receive-international-payments", label: "How to receive international payments" },
  { href: "/blog/payoneer-vs-direct-bank-transfer", label: "Payoneer vs. direct bank transfer" },
];

export default function WiseFeeCalculatorPage() {
  return (
    <div className="shell grid gap-8 py-10">
      <JsonLd
        data={[
          webApplicationSchema(path, "Wise Fee Calculator", description),
          faqSchema(FAQS),
        ]}
      />
      <BreadcrumbJsonLd items={crumbs} />
      <Breadcrumbs items={crumbs} />

      <div>
        <PageHeader
          compact
          eyebrow="International transfer estimate"
          title="Wise Fee Calculator"
          lede="Estimate how much your recipient gets after Wise fees and exchange rate. Compare bank transfer and card payment deductions across USD, GBP, EUR, AED, CAD, and AUD to PKR, INR, BDT, NPR, LKR, and PHP."
        />
        <div className="mt-3">
          <LastUpdated publishedAt="2026-11-22" updatedAt="2026-11-27" />
        </div>
      </div>

      {/* Main Calculator Section */}
      <WiseCalculator />

      <AdSlot placement="sidebar" />

      {/* 1. How It Works (3 Steps) */}
      <section aria-labelledby="wise-how-it-works" className="grid gap-4">
        <div>
          <h2
            id="wise-how-it-works"
            className="text-2xl font-semibold tracking-[-0.02em] text-ink"
          >
            How it works
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted">
            Estimate your Wise transfer fee and recipient payout in three simple steps.
          </p>
        </div>

        <ol className="grid gap-4 md:grid-cols-3">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <li key={step.n} className="surface-lift lift rounded-3xl p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-ink shadow-[0_8px_18px_rgba(49,91,255,0.12)]">
                  <step.icon aria-hidden className="size-5" />
                </span>
                <span className="rounded-full bg-navy px-2.5 py-1 text-xs font-semibold text-white">
                  {`Step ${step.n}`}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* 2. FAQ Section */}
      <section aria-labelledby="wise-faq-heading" className="grid gap-3">
        <h2 id="wise-faq-heading" className="text-2xl font-semibold tracking-[-0.02em] text-ink">
          Questions about this Wise fee calculator
        </h2>
        <Accordion items={FAQS} name="wise-faq" />
      </section>

      {/* 3. Related Calculators Section */}
      <section aria-labelledby="related-calculators-heading" className="grid gap-4">
        <div>
          <h2
            id="related-calculators-heading"
            className="text-2xl font-semibold tracking-[-0.02em] text-ink"
          >
            Related Calculators
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted">
            Compare platform commissions, withdrawal fees, and monthly freelance income estimates.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RELATED_CALCULATORS.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              className="surface lift flex flex-col justify-between rounded-3xl p-6"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  {calc.eyebrow}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-ink">
                  {calc.label}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {calc.description}
                </p>
              </div>
              <span className="mt-4 inline-flex text-sm font-semibold text-brand">
                Open calculator →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <RelatedArticles links={RELATED_GUIDES} />

      <AuthorCard />

      <div className="surface rounded-2xl px-5 py-4 text-sm text-muted">
        <strong className="font-semibold text-ink">Disclaimer:</strong> Estimates only. Actual fees and rates may vary. Check Wise.com for live rates. Need a correction?{" "}
        <Link href="/contact" className="font-semibold text-brand">
          Contact the editorial desk
        </Link>
        .
      </div>
    </div>
  );
}
