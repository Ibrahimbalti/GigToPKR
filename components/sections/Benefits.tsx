import { BadgePercent, Landmark, ReceiptText, Smartphone, Unlock, WalletCards } from "@/components/icons";

const benefits = [
  { icon: BadgePercent, title: "Transparent fee calculation", text: "Every percentage is named as an assumption before it touches the result." },
  { icon: Landmark, title: "Optional local conversion", text: "The estimate stays in the order currency until you type the rate your bank or payout service shows." },
  { icon: WalletCards, title: "Separate calculators", text: "Fiverr and Upwork each have their own page. One page does not switch to the other platform." },
  { icon: ReceiptText, title: "Optional tax set-aside", text: "Add a percentage if you want to hold money back. It is not a country's tax assessment." },
  { icon: Unlock, title: "No registration required", text: "Order amounts stay in the browser. There is no account to create." },
  { icon: Smartphone, title: "Mobile-friendly design", text: "The form becomes one column on a phone, with the same arithmetic." },
];

export function Benefits() {
  return (
    <section className="shell py-16 lg:py-20" aria-labelledby="benefits-heading">
      <h2 id="benefits-heading" className="text-[clamp(1.6rem,2.4vw,2rem)] font-semibold tracking-[-0.03em]">
        Why freelancers use it
      </h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit) => (
          <li key={benefit.title} className="surface lift rounded-3xl p-5">
            <span className="flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-ink">
              <benefit.icon aria-hidden className="size-5" />
            </span>
            <h3 className="mt-4 text-base font-semibold tracking-[-0.02em]">{benefit.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{benefit.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
