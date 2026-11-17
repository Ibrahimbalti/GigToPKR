import { AppLink as Link } from "@/components/ui/AppLink";

export function PlatformComparison() {
  return (
    <section className="cv-auto shell py-16 lg:py-20" aria-labelledby="compare-heading">
      <h2 id="compare-heading" className="text-[clamp(1.6rem,2.4vw,2rem)] font-semibold tracking-[-0.03em]">
        Platform comparison
      </h2>
      <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
        Actual charges may differ according to current platform rules and the contract in front of you. The cards describe the assumptions this site calculates, next to the public wording we checked.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <article className="surface lift rounded-3xl p-6">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-semibold tracking-[-0.02em]">Fiverr</h3>
            <span className="rounded-full bg-[#FCE7F3] px-2.5 py-1 text-xs font-semibold text-[#9D174D]">20% assumed</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted">
            Gig-based freelance marketplace. Fiverr&apos;s earnings help page says freelancers earn 80% of the purchase amount, including extras and tips. The client&apos;s checkout fee is separate.
          </p>
          <Link href="/fiverr-fee-calculator-pakistan" className="mt-4 inline-flex text-sm font-semibold text-brand">
            Open the Fiverr calculator
          </Link>
        </article>
        <article className="surface lift rounded-3xl p-6">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-semibold tracking-[-0.02em]">Upwork</h3>
            <span className="rounded-full bg-success-soft px-2.5 py-1 text-xs font-semibold text-success-ink">10% assumed</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted">
            Hourly and fixed-price freelance marketplace. Upwork publishes a freelancer service fee from 0% to 15% per contract. Ten percent is a midpoint this calculator can show, not your offer.
          </p>
          <Link href="/upwork-fee-calculator-pakistan" className="mt-4 inline-flex text-sm font-semibold text-brand">
            Open the Upwork calculator
          </Link>
        </article>
      </div>
    </section>
  );
}
