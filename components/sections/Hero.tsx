import { ArrowRight, BadgeCheck, Check } from "@/components/icons";
import { AppLink as Link } from "@/components/ui/AppLink";
import { HeroStage } from "@/components/sections/HeroStage";
import { calculateEarnings } from "@/lib/calculator";
import { exampleRateNote } from "@/lib/constants";
import { getCachedUsdToPkrQuote } from "@/lib/exchange-rate";
import { formatPkr, formatRateInput, formatUsd } from "@/lib/money";

const trust = ["Free to use", "No registration required", "Transparent breakdown"];

export async function Hero() {
  const quote = await getCachedUsdToPkrQuote();
  const preview = calculateEarnings({
    orderAmountUsd: 500,
    platform: "fiverr",
    taxStatus: "filer",
    usdToPkrRate: quote.rate ?? 1,
  });

  return (
    <section className="shell grid items-center gap-8 py-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6 lg:py-16">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white px-3 py-1 text-sm font-semibold text-navy shadow-[var(--shadow)]">
          <BadgeCheck aria-hidden className="size-4 text-brand" />
          Built for Pakistani Freelancers
        </p>
        <h1 className="mt-5 max-w-[12em] text-[clamp(2.15rem,3.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-ink">
          Know Exactly What You Earn in PKR
        </h1>
        <p className="text-gradient mt-3 text-[clamp(1.15rem,2vw,1.5rem)] font-semibold tracking-[-0.02em]">
          Your Freelance Income, Simplified.
        </p>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted sm:text-[17px]">
          Calculate your Fiverr and Upwork earnings after platform fees, Payoneer charges, currency conversion, and estimated taxes.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="#calculator"
            className="cta-gradient inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white"
          >
            Calculate My Earnings <ArrowRight aria-hidden className="size-4" />
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex items-center justify-center rounded-xl border border-line bg-white px-5 py-3 text-sm font-semibold text-ink shadow-[var(--shadow)] hover:border-brand/30"
          >
            Explore How It Works
          </Link>
        </div>
        <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-navy-2">
          {trust.map((item) => (
            <li key={item} className="inline-flex items-center gap-1.5">
              <Check aria-hidden className="size-4 text-success-ink" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <HeroStage
        finalPkr={quote.rate ? formatPkr(preview.finalPkr) : "PKR —"}
        platformFee={formatUsd(preview.platformFeeUsd)}
        netUsd={formatUsd(preview.netUsd)}
        converted={quote.rate ? formatPkr(preview.convertedPkr) : "PKR —"}
        rate={quote.rate ? formatRateInput(quote.rate) : "—"}
        note={exampleRateNote(quote.rate)}
      />
    </section>
  );
}
