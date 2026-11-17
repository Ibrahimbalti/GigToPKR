import { AppLink as Link } from "@/components/ui/AppLink";
import { calculateEarnings } from "@/lib/calculator";
import { exampleRateNote, PLATFORM_LABELS } from "@/lib/constants";
import { getCachedUsdToPkrQuote } from "@/lib/exchange-rate";
import { formatPkr, formatRateInput, formatUsd } from "@/lib/money";
import type { ContentSection } from "@/types/content";

function ExampleCard({
  title,
  orderAmountUsd,
  platform,
  taxStatus,
  rate,
}: {
  title: string;
  orderAmountUsd: number;
  platform: "fiverr" | "upwork";
  taxStatus: "filer" | "nonFiler";
  rate: number | null;
}) {
  const result = calculateEarnings({
    orderAmountUsd,
    platform,
    taxStatus,
    usdToPkrRate: rate ?? 1,
  });
  const rows = [
    ["Gross", formatUsd(result.grossUsd)],
    ["Platform fee", formatUsd(result.platformFeeUsd)],
    ["Payoneer assumption", formatUsd(result.payoneerFeeUsd)],
    ["Net USD", formatUsd(result.netUsd)],
    ["USD to PKR", rate ? formatRateInput(rate) : "—"],
    ["Converted", rate ? formatPkr(result.convertedPkr) : "PKR —"],
    ["Illustrative tax", rate ? formatPkr(result.taxPkr) : "PKR —"],
    ["Estimated deposit", rate ? formatPkr(result.finalPkr) : "PKR —"],
  ];

  return (
    <figure className="rounded-2xl border border-line bg-brand-50 p-4 shadow-[var(--shadow)]">
      <figcaption className="font-semibold text-ink">{title}</figcaption>
      <p className="mt-1 text-sm text-muted">
        {PLATFORM_LABELS[platform]} · {taxStatus === "filer" ? "1% filer illustration" : "2% non-filer illustration"}
      </p>
      <dl className="mt-3 grid gap-1 text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4">
            <dt className="text-muted">{label}</dt>
            <dd className="font-semibold tabular">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-xs leading-5 text-muted">{exampleRateNote(rate)}</p>
    </figure>
  );
}

export async function ContentBlocks({ sections }: { sections: ContentSection[] }) {
  const quote = await getCachedUsdToPkrQuote();
  return (
    <div className="grid gap-8">
      {sections.map((section) => {
        const Heading = section.level === 2 ? "h2" : "h3";
        return (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <Heading className={section.level === 2 ? "text-2xl font-semibold tracking-tight" : "text-xl font-semibold"}>
              {section.heading}
            </Heading>
            <div className="mt-3 grid gap-4 text-base leading-7 text-slate-700">
              {section.blocks.map((block, index) => {
                if (block.type === "p") return <p key={index}>{block.text}</p>;
                if (block.type === "note") {
                  return (
                    <p key={index} className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-ink">
                      {block.text}
                    </p>
                  );
                }
                if (block.type === "ul" || block.type === "ol") {
                  const List = block.type;
                  return (
                    <List key={index} className={block.type === "ol" ? "list-decimal space-y-2 pl-5" : "list-disc space-y-2 pl-5"}>
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </List>
                  );
                }
                if (block.type === "table") {
                  return (
                    <div key={index} className="overflow-x-auto rounded-2xl border border-line bg-white shadow-[var(--shadow)]">
                      <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                        <caption className="px-4 py-3 text-left font-semibold text-ink">{block.caption}</caption>
                        <thead className="bg-brand-50 text-ink">
                          <tr>
                            {block.headers.map((header) => (
                              <th key={header} className="px-4 py-2 font-semibold">{header}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {block.rows.map((row) => (
                            <tr key={row.join("|")} className="border-t border-line">
                              {row.map((cell) => (
                                <td key={cell} className="px-4 py-2 align-top">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }
                return (
                  <ExampleCard
                    key={index}
                    title={block.title}
                    orderAmountUsd={block.orderAmountUsd}
                    platform={block.platform}
                    taxStatus={block.taxStatus}
                    rate={quote.rate}
                  />
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export function SourceList({ sources }: { sources: { label: string; href: string }[] }) {
  return (
    <section className="grid gap-3">
      <h2 className="text-xl font-semibold">Sources checked for this page</h2>
      <ul className="grid gap-2 text-sm">
        {sources.map((source) => (
          <li key={source.href}>
            <a href={source.href} className="font-medium text-brand hover:underline" rel="noopener noreferrer">
              {source.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="text-sm text-muted">
        External pages can change. The review date on this page is the date we used them, not a
        promise they still read the same way.{" "}
        <Link href="/disclaimer" className="font-semibold text-navy">
          Read the disclaimer
        </Link>
        .
      </p>
    </section>
  );
}
