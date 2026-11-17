import { ChevronDown } from "@/components/icons";

export type AccordionItem = { question: string; answer: string };

export function Accordion({ items, name = "faq" }: { items: AccordionItem[]; name?: string }) {
  return (
    <div className="surface overflow-hidden rounded-3xl">
      {items.map((item, index) => (
        <details
          key={item.question}
          name={name}
          open={index === 0}
          className="group border-b border-line last:border-b-0 open:bg-brand-50/60"
        >
          <summary className="flex min-h-12 cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-ink">
            {item.question}
            <ChevronDown aria-hidden className="size-5 shrink-0 text-brand-ink transition-transform group-open:rotate-180" />
          </summary>
          <p className="max-w-3xl px-5 pb-4 text-sm leading-7 text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
