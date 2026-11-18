import { ListChecks, SlidersHorizontal, Wallet } from "@/components/icons";

const steps = [
  {
    n: "01",
    icon: ListChecks,
    title: "Enter your order amount",
    text: "Type the order in USD, EUR, GBP, or AED. Decimals are allowed. Negative amounts are rejected.",
  },
  {
    n: "02",
    icon: SlidersHorizontal,
    title: "Edit the percentages",
    text: "Open the Fiverr calculator or the Upwork calculator. Fiverr starts at 20%. Upwork starts at 10%, with 0%, 5%, 10%, and 15% as shortcuts. Every percentage can be replaced.",
  },
  {
    n: "03",
    icon: Wallet,
    title: "See what is left",
    text: "The result stays in the order currency. Add your own currency rate only if you want a local figure. That rate is yours, not a country rate we assume.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="shell py-16 lg:py-20" aria-labelledby="how-heading">
      <h2 id="how-heading" className="text-[clamp(1.6rem,2.4vw,2rem)] font-semibold tracking-[-0.03em]">
        How it works
      </h2>
      <ol className="mt-6 grid gap-4 md:grid-cols-3">
        {steps.map((step) => (
          <li key={step.n} className="surface-lift lift rounded-3xl p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-ink shadow-[0_8px_18px_rgba(49,91,255,0.12)]">
                <step.icon aria-hidden className="size-5" />
              </span>
              <span className="rounded-full bg-navy px-2.5 py-1 text-xs font-semibold text-white">{`Step ${step.n}`}</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em]">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
