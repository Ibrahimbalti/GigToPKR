"use client";

import dynamic from "next/dynamic";
import { CircleDollarSign } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import { RESULT_DISCLAIMER } from "@/lib/constants";
import { formatPkr, formatUsd } from "@/lib/money";
import { PLATFORM_LABELS, TAX_LABELS } from "@/lib/constants";
import type { CalculatorResult } from "@/types/calculator";

const BreakdownChart = dynamic(() => import("@/components/calculator/BreakdownChart"), {
  ssr: false,
  loading: () => (
    <div className="h-56 w-full min-w-0" aria-busy="true">
      <span className="sr-only">Loading chart</span>
      <Skeleton variant="rect" className="h-56 w-full !rounded-2xl" />
    </div>
  ),
});

export function EarningsBreakdown({ result }: { result: CalculatorResult | null }) {
  if (!result) {
    return (
      <div className="result-panel flex min-h-80 flex-col justify-center rounded-3xl p-4 text-white sm:p-5">
        <h2 className="text-lg font-semibold">Your Estimated Bank Deposit</h2>
        <p className="mt-2 max-w-sm text-sm leading-6 text-white">
          Enter an order amount and a USD to PKR rate. The estimate appears here and stays in step with the inputs.
        </p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-white">Estimate, not a transfer</p>
      </div>
    );
  }

  const kept = result.grossUsd === 0 ? 0 : Math.max(0, Math.min(100, (result.netUsd / result.grossUsd) * 100));
  const rows = [
    ["Gross order amount", "The USD amount you typed.", formatUsd(result.grossUsd), "neutral"],
    [
      "Platform fee",
      `${(result.platformFeeRate * 100).toFixed(0)}% ${PLATFORM_LABELS[result.platform]} assumption.`,
      `− ${formatUsd(result.platformFeeUsd)}`,
      "deduction",
    ],
    ["Amount after platform fee", "Gross minus the platform assumption.", formatUsd(result.afterPlatformUsd), "neutral"],
    [
      "Payoneer fee",
      "2% of the post-platform amount. Not a Payoneer quote.",
      `− ${formatUsd(result.payoneerFeeUsd)}`,
      "deduction",
    ],
    ["Net withdrawable amount", "Dollars left before conversion.", formatUsd(result.netUsd), "neutral"],
    ["USD to PKR exchange rate", "The rate currently in the form.", String(result.usdToPkrRate), "neutral"],
    ["Converted amount", "Net dollars multiplied by the rate.", formatPkr(result.convertedPkr), "neutral"],
    [
      "Estimated FBR tax",
      `${(result.taxRate * 100).toFixed(0)}% ${TAX_LABELS[result.taxStatus].toLowerCase()} illustration. Not an assessment.`,
      `− ${formatPkr(result.taxPkr)}`,
      "deduction",
    ],
  ] as const;

  return (
    <div className="grid min-w-0 gap-4" aria-live="polite">
      <div className="result-panel rounded-3xl p-4 text-white sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-white">Your Estimated Bank Deposit</p>
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">
            Estimate
          </span>
        </div>
        <div className="mt-3 flex items-end gap-3">
          <CircleDollarSign aria-hidden className="mb-1 size-7 text-success-soft" />
          <p
            key={result.finalPkr}
            className="text-[clamp(2rem,4vw,2.8rem)] font-semibold leading-none tracking-[-0.04em] text-success-soft tabular"
          >
            {formatPkr(result.finalPkr)}
          </p>
        </div>
        <p className="mt-3 text-sm text-white">After the assumptions below. This is an estimated credit, not a guaranteed transfer.</p>
        <div className="mt-5">
          <div className="flex justify-between text-xs text-slate-300">
            <span>USD left after fees</span>
            <span className="tabular">{kept.toFixed(0)}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/15">
            <div className="h-full rounded-full bg-white" style={{ width: `${kept}%` }} />
          </div>
          <p className="mt-2 text-xs text-slate-300">Bar shows net USD against the order. Tax is in PKR and is not mixed into this bar.</p>
        </div>
      </div>
      <div className="surface overflow-hidden rounded-3xl">
        <h2 className="border-b border-line px-4 py-3 text-lg font-semibold">Earnings breakdown</h2>
        <dl>
          {rows.map(([label, detail, value, tone]) => (
            <div key={label} className="grid gap-1 border-b border-line px-4 py-3 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center">
              <dt>
                <span className="block text-sm font-medium text-ink">{label}</span>
                <span className="block text-xs leading-5 text-muted">{detail}</span>
              </dt>
              <dd className={tone === "deduction" ? "text-sm font-semibold text-danger-ink tabular" : "text-sm font-semibold text-ink tabular"}>
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="surface min-w-0 overflow-hidden rounded-3xl p-4">
        <BreakdownChart result={result} />
      </div>
      <p className="text-sm leading-6 text-muted">{RESULT_DISCLAIMER}</p>
    </div>
  );
}
