"use client";

import dynamic from "next/dynamic";
import { CircleDollarSign } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import { RESULT_DISCLAIMER } from "@/lib/constants";

const LOCAL_DISCLAIMER =
  "This is an estimate from the assumptions shown above. Fiverr, Upwork, Payoneer, and your bank can apply different fees and rates. Nothing on this page is financial, tax, or legal advice.";
import { formatFeePercent } from "@/lib/calculator";
import { formatMoney, formatPkr } from "@/lib/money";
import { PLATFORM_LABELS } from "@/lib/constants";
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

export function EarningsBreakdown({
  result,
  presentation = "pkr",
}: {
  result: CalculatorResult | null;
  /** `order` keeps the result in the order currency. `local` uses the rate the visitor typed. */
  presentation?: "pkr" | "order" | "local";
}) {
  if (!result) {
    return (
      <div className="result-panel flex min-h-80 flex-col justify-center rounded-3xl p-4 text-white sm:p-5">
        <h2 className="text-lg font-semibold">Your estimated earnings</h2>
        <p className="mt-2 max-w-sm text-sm leading-6 text-white">
          {presentation === "pkr"
            ? "Enter an order amount and a PKR rate. The estimate appears here and stays in step with the inputs."
            : "Enter an order amount. The estimate stays in that currency unless you add your own rate."}
        </p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-white">Estimate, not a transfer</p>
      </div>
    );
  }

  const kept = result.grossUsd === 0 ? 0 : Math.max(0, Math.min(100, (result.netUsd / result.grossUsd) * 100));
  const money = (amount: number) => formatMoney(amount, result.currency);
  const rows: Array<[string, string, string, "neutral" | "deduction"]> = [
    ["Gross order amount", `The ${result.currency} amount in the form.`, money(result.grossUsd), "neutral"],
    [
      "Platform fee",
      `${formatFeePercent(result.platformFeeRate)} ${PLATFORM_LABELS[result.platform]} fee you entered.`,
      `− ${money(result.platformFeeUsd)}`,
      "deduction",
    ],
    ["Amount after platform fee", "Gross minus the platform fee.", money(result.afterPlatformUsd), "neutral"],
  ];
  if (result.earlyPayoutRate > 0) {
    rows.push([
      "Early payout fee",
      `${formatFeePercent(result.earlyPayoutRate)} of the post-platform amount. Confirm it on Fiverr.`,
      `− ${money(result.earlyPayoutFee)}`,
      "deduction",
    ]);
  }
  rows.push(
    [
      `${result.withdrawalLabel} fee`,
      `${formatFeePercent(result.payoneerFeeRate)} of the amount after the fees above.`,
      `− ${money(result.payoneerFeeUsd)}`,
      "deduction",
    ],
  );
  if (result.flatFeeUsd > 0) {
    rows.push([
      "Flat withdrawal fee",
      `USD ${result.flatFeeUsd.toFixed(2)} converted into ${result.currency}.`,
      `− ${money(result.flatFeeInOrderCurrency)}`,
      "deduction",
    ]);
  }
  rows.push(["Net amount", `${result.currency} left before conversion or tax.`, money(result.netUsd), "neutral"]);
  if (presentation === "order") {
    if (result.taxRate > 0) {
      rows.push([
        "Tax set-aside",
        `${formatFeePercent(result.taxRate)} of the net amount. Not tax advice.`,
        `− ${money(result.taxPkr)}`,
        "deduction",
      ]);
    }
  } else if (presentation === "local") {
    const local = (amount: number) =>
      amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    rows.push(
      ["Your rate", `Units of your currency for 1 ${result.currency}.`, String(result.usdToPkrRate), "neutral"],
      ["Converted amount", "Net amount multiplied by your rate.", local(result.convertedPkr), "neutral"],
      [
        "Tax set-aside",
        `${formatFeePercent(result.taxRate)} of the converted amount. Not tax advice.`,
        `− ${local(result.taxPkr)}`,
        "deduction",
      ],
    );
  } else {
    rows.push(
      [`${result.currency} to PKR rate`, "The rate currently in the form.", String(result.usdToPkrRate), "neutral"],
      ["Converted amount", "Net amount multiplied by the rate.", formatPkr(result.convertedPkr), "neutral"],
      [
        "Tax set-aside",
        `${formatFeePercent(result.taxRate)} of the converted amount. Not a statutory tax assessment.`,
        `− ${formatPkr(result.taxPkr)}`,
        "deduction",
      ],
    );
  }
  const headline =
    presentation === "order"
      ? money(result.finalPkr)
      : presentation === "local"
        ? result.finalPkr.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : formatPkr(result.finalPkr);

  return (
    <div className="grid min-w-0 gap-4" aria-live="polite">
      <div className="result-panel rounded-3xl p-4 text-white sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-white">
            {presentation === "pkr" ? "Your Estimated Bank Deposit" : presentation === "local" ? "In your currency" : "Left after fees"}
          </p>
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
            {headline}
          </p>
        </div>
        <p className="mt-3 text-sm text-white">After the assumptions below. This is an estimated credit, not a guaranteed transfer.</p>
        <div className="mt-5">
          <div className="flex justify-between text-xs text-slate-300">
            <span>{result.currency} left after fees</span>
            <span className="tabular">{kept.toFixed(0)}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/15">
            <div className="h-full rounded-full bg-white" style={{ width: `${kept}%` }} />
          </div>
          <p className="mt-2 text-xs text-slate-300">
            {presentation === "pkr"
              ? "Bar shows the net amount against the order. Tax is in PKR and is not mixed into this bar."
              : "Bar shows the net amount against the order. A local conversion is not mixed into this bar."}
          </p>
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
      <p className="text-sm leading-6 text-muted">{presentation === "pkr" ? RESULT_DISCLAIMER : LOCAL_DISCLAIMER}</p>
    </div>
  );
}
