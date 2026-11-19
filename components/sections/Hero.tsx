import { ArrowRight, BadgeCheck, Check } from "@/components/icons";
import { AppLink as Link } from "@/components/ui/AppLink";
import { HeroStage } from "@/components/sections/HeroStage";
import { calculateEarnings } from "@/lib/calculator";
import { formatUsd } from "@/lib/money";

const trust = ["Free to use", "No registration required", "Transparent breakdown"];

const platforms = [
  { name: "Fiverr", color: "#1dbf73", icon: "fiverr" },
  { name: "Upwork", color: "#14a800", icon: "upwork" },
  { name: "YouTube", color: "#ff0033", icon: "youtube" },
] as const;

function PlatformIcon({ name }: { name: (typeof platforms)[number]["icon"] }) {
  if (name === "youtube") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="size-5">
        <rect x="2" y="6" width="20" height="12" rx="3" fill="currentColor" />
        <path d="M10 9.2v5.6l5.2-2.8L10 9.2Z" fill="white" />
      </svg>
    );
  }
  if (name === "upwork") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="size-5">
        <circle cx="12" cy="12" r="9" fill="currentColor" />
        <path d="M12 16.5V10.2M8.8 12.4 12 8.5l3.2 3.9" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-5">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="currentColor" />
      <path d="M9 16.5V7.5h3.2a2.6 2.6 0 0 1 0 5.2H9" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export async function Hero() {
  const preview = calculateEarnings({
    orderAmountUsd: 500,
    platform: "fiverr",
    taxStatus: "filer",
    usdToPkrRate: 1,
    taxRate: 0,
  });

  return (
    <section className="shell grid items-center gap-8 py-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6 lg:py-16">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white px-3 py-1 text-sm font-semibold text-navy shadow-[var(--shadow)]">
          <BadgeCheck aria-hidden className="size-4 text-brand" />
          Built for freelancers
        </p>
        <h1 className="mt-5 max-w-[12em] text-[clamp(2.15rem,3.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-ink">
          Know what you keep after fees
        </h1>
        <p className="text-gradient mt-3 text-[clamp(1.15rem,2vw,1.5rem)] font-semibold tracking-[-0.02em]">
          Your Freelance Income, Simplified.
        </p>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted sm:text-[17px]">
          Estimate a Fiverr or Upwork order after the platform fee and a withdrawal charge. Each marketplace has its own calculator.
        </p>
        <div className="platform-rotator mt-5">
          <p className="sr-only">Calculators for Fiverr, Upwork, and YouTube.</p>
          <div className="platform-rotator-viewport">
            {platforms.map((platform) => (
              <p key={platform.name} className="platform-rotator-item" style={{ color: platform.color }} aria-hidden>
                <PlatformIcon name={platform.icon} />
                <span className="text-sm font-semibold text-ink">{platform.name}</span>
              </p>
            ))}
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="#calculators"
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
        <p className="mt-5 text-sm font-medium text-navy-2">
          A $500 Fiverr order at the 20% and 2% defaults leaves {formatUsd(preview.netUsd)} before any local conversion.
        </p>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-navy-2">
          {trust.map((item) => (
            <li key={item} className="inline-flex items-center gap-1.5">
              <Check aria-hidden className="size-4 text-success-ink" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <HeroStage
        finalPkr={formatUsd(preview.netUsd)}
        platformFee={formatUsd(preview.platformFeeUsd)}
        netUsd={formatUsd(preview.netUsd)}
        converted={formatUsd(preview.afterPlatformUsd)}
        note="Illustrative Fiverr estimate at a 20% platform fee and a 2% withdrawal assumption. Not a payout quote."
      />
    </section>
  );
}
