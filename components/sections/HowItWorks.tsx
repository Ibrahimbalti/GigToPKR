import { ListChecks, SlidersHorizontal, Wallet } from "@/components/icons";

const steps = [
  {
    icon: ListChecks,
    title: "Enter your order amount",
    text: "Type the USD price of the order. Decimals are allowed. Negative amounts are rejected.",
  },
  {
    icon: SlidersHorizontal,
    title: "Select platform and tax",
    text: "Fiverr uses a 20% assumption. Upwork uses 10%, inside the published 0% to 15% range. Tax options are illustrations, not FBR rates.",
  },
  {
    icon: Wallet,
    title: "See the estimated PKR",
    text: "The breakdown applies a 2% withdrawal assumption, converts at your rate, and shows the illustrative tax on its own line.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="cv-auto shell py-16 lg:py-20" aria-labelledby="how-heading">
      <h2 id="how-heading" className="text-[clamp(1.6rem,2.4vw,2rem)] font-semibold tracking-[-0.03em]">
        How it works
      </h2>
      <ol className="mt-6 grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="surface-lift lift rounded-3xl p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-ink shadow-[0_8px_18px_rgba(49,91,255,0.12)]">
                <step.icon aria-hidden className="size-5" />
              </span>
              <span className="rounded-full bg-navy px-2.5 py-1 text-xs font-semibold text-white">0{index + 1}</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em]">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
