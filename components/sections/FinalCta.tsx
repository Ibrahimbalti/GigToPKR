import { AppLink as Link } from "@/components/ui/AppLink";

export function FinalCta() {
  return (
    <section className="cv-auto shell py-6" aria-labelledby="ready-heading">
      <div className="result-panel relative overflow-hidden rounded-[1.75rem] px-6 py-10 text-white sm:px-10">
        <div aria-hidden className="pointer-events-none absolute -left-10 top-0 size-40 rounded-full bg-white/10" />
        <h2 id="ready-heading" className="relative max-w-xl text-[clamp(1.6rem,2.6vw,2.15rem)] font-semibold leading-tight tracking-[-0.03em]">
          Ready to Know Your Real Freelance Earnings?
        </h2>
        <p className="relative mt-3 max-w-lg text-sm leading-6 text-white">
          The estimate uses the assumptions you can see. It is not a bank quote or a tax assessment.
        </p>
        <Link href="#calculator" className="relative mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-navy">
          Calculate Your Earnings
        </Link>
      </div>
    </section>
  );
}
