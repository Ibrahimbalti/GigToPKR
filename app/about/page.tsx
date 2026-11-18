import type { Metadata } from "next";
import { AppLink as Link } from "@/components/ui/AppLink";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { LastUpdated } from "@/components/seo/LastUpdated";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { aboutPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "About the calculator",
  description:
    "RealGigPay estimates Pakistani freelance earnings from visible assumptions. It is not a bank, tax adviser, or marketplace.",
  path: "/about",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

const pathSteps = [
  { step: "01", title: "Order amount", text: "The USD price of the job, before any fee." },
  { step: "02", title: "Marketplace fee", text: "Fiverr or Upwork, shown on its own line." },
  { step: "03", title: "Withdrawal", text: "A 2% assumption on the balance after the platform fee." },
  { step: "04", title: "Rupees and tax", text: "A reference rate, then an illustrative tax line." },
];

const assumptions = [
  {
    figure: "20%",
    title: "Fiverr",
    text: "Fiverr’s earnings help page describes an 80% freelancer share, so this line is 20%.",
  },
  {
    figure: "10%",
    title: "Upwork",
    text: "A point inside the 0% to 15% range Upwork publishes. It is not a contract rate.",
  },
  {
    figure: "2%",
    title: "Withdrawal",
    text: "Inside Payoneer’s published bank-withdrawal range, and still not the quote on your screen.",
  },
  {
    figure: "1–2%",
    title: "Tax",
    text: "Labeled illustrative. It is not taken from a current FBR schedule.",
  },
];

const limits = [
  "Not affiliated with Fiverr, Upwork, Payoneer, the Federal Board of Revenue, or the State Bank of Pakistan.",
  "Does not hold money, file returns, or open payment accounts.",
  "The editorial desk is not presented as a licensed tax adviser or a chartered accountant.",
  "Where a credential would have to be invented, it is left out.",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutPageSchema()} />
      <div className="shell grid gap-8 py-10 lg:gap-10 lg:py-14">
        <BreadcrumbJsonLd items={crumbs} />
        <Breadcrumbs items={crumbs} />

        <header className="relative overflow-hidden rounded-3xl border border-white/80 bg-white shadow-[var(--shadow)]">
          <div className="grid lg:grid-cols-[minmax(0,1.25fr)_minmax(16rem,0.75fr)]">
            <div className="px-6 py-7 sm:px-8 sm:py-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">About</p>
              <h1 className="mt-2 max-w-xl text-[clamp(1.85rem,3.2vw,2.6rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-ink">
                About RealGigPay
              </h1>
              <p className="mt-3 max-w-xl text-base leading-7 text-muted">
                A calculator and a set of guides for freelancers who get paid in dollars and spend in rupees.
              </p>
              <div className="mt-5">
                <LastUpdated publishedAt="2026-11-17" updatedAt="2026-11-17" />
              </div>
            </div>
            <div className="result-panel m-3 flex flex-col justify-between rounded-[1.35rem] px-6 py-6 text-white lg:my-3 lg:mr-3 lg:ml-0">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">Who it is for</p>
              <p className="mt-3 text-xl font-semibold leading-snug tracking-[-0.02em]">
                Freelancers in Pakistan, paid in dollars and spending in rupees.
              </p>
              <p className="mt-3 text-sm leading-6 text-white/90">
                The audience is people working on platforms such as Fiverr and Upwork.
              </p>
            </div>
          </div>
        </header>

        <section aria-labelledby="about-mission">
          <h2 id="about-mission" className="text-[clamp(1.6rem,2.4vw,2rem)] font-semibold tracking-[-0.03em]">
            Mission
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-navy-2">
            {site.productName} exists so a freelancer can see the path from an order amount to an
            estimated bank deposit without mixing up the marketplace fee, the withdrawal, the
            exchange rate, and tax.
          </p>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pathSteps.map((item) => (
              <li key={item.step} className="surface rounded-3xl p-5">
                <span className="rounded-full bg-navy px-2.5 py-1 text-xs font-semibold text-white">{`Step ${item.step}`}</span>
                <h3 className="mt-4 text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="about-assumptions">
          <h2 id="about-assumptions" className="text-[clamp(1.6rem,2.4vw,2rem)] font-semibold tracking-[-0.03em]">
            The formula is fixed and visible
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-navy-2">
            Every percentage is an assumption you can read before it changes the result.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {assumptions.map((item) => (
              <li key={item.title} className="surface rounded-3xl p-5">
                <p className="text-3xl font-semibold tracking-[-0.04em] text-brand">{item.figure}</p>
                <h3 className="mt-3 text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-4 lg:grid-cols-2" aria-labelledby="about-limits">
          <div className="surface rounded-3xl p-6 sm:p-7">
            <h2 id="about-limits" className="text-xl font-semibold tracking-[-0.02em]">
              What this site is not
            </h2>
            <ul className="mt-5 grid gap-3">
              {limits.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-navy-2">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="surface rounded-3xl p-6 sm:p-7">
            <h2 className="text-xl font-semibold tracking-[-0.02em]">Editorial standards</h2>
            <p className="mt-4 text-sm leading-6 text-navy-2">
              Pages name their sources, their review date, and the assumptions in the arithmetic.
              Frankfurter is not given a PKR rate it does not publish. Planned articles stay on the
              editorial calendar until they are actually written.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/editorial-policy" className="cta-gradient inline-flex rounded-xl px-4 py-2.5 text-sm font-semibold text-white">
                Editorial policy
              </Link>
              <Link
                href="/contact"
                className="inline-flex rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink"
              >
                Send a correction
              </Link>
              <Link href="/disclaimer" className="inline-flex items-center px-1 text-sm font-semibold text-brand">
                Read the disclaimer
              </Link>
            </div>
          </div>
        </section>

        <section className="result-panel relative overflow-hidden rounded-[1.75rem] px-6 py-10 text-white sm:px-10" aria-labelledby="about-cta">
          <div aria-hidden className="pointer-events-none absolute -left-10 top-0 size-40 rounded-full bg-white/10" />
          <h2 id="about-cta" className="relative max-w-xl text-[clamp(1.6rem,2.6vw,2.15rem)] font-semibold leading-tight tracking-[-0.03em]">
            See the estimate with these assumptions
          </h2>
          <p className="relative mt-3 max-w-lg text-sm leading-6 text-white/90">
            The calculator uses the lines on this page. It is not a bank quote or a tax assessment.
          </p>
          <div className="relative mt-6 flex flex-wrap gap-3">
            <Link href="/calculator" className="inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-navy">
              Open the calculator
            </Link>
            <Link href="/guides" className="inline-flex rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold text-white">
              Read the guides
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
