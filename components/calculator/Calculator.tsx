"use client";

import { useRef, useState } from "react";
import { ExchangeRateField } from "@/components/calculator/ExchangeRate";
import { useExchangeRate } from "@/components/calculator/ExchangeRateProvider";
import { EarningsBreakdown } from "@/components/calculator/EarningsBreakdown";
import { ResultActions } from "@/components/calculator/ResultActions";
import { Input } from "@/components/ui/Input";
import { calculateEarnings, projectMonthly } from "@/lib/calculator";
import { trackEvent } from "@/lib/analytics";
import { formatPkr, formatRateInput } from "@/lib/money";
import { parseExchangeRate, parseOrderAmount } from "@/lib/validation";
import { cn } from "@/lib/utils";
import type { Platform, TaxStatus } from "@/types/calculator";

const platforms: { id: Platform; name: string; fee: string; note: string }[] = [
  { id: "fiverr", name: "Fiverr", fee: "20% assumed fee", note: "Freelancers earn 80% on the published earnings page." },
  { id: "upwork", name: "Upwork", fee: "10% assumed fee", note: "Published fee is 0% to 15% per contract." },
];

export function Calculator({
  defaultPlatform = "fiverr",
  defaultTax = "filer",
  showMonthly = false,
}: {
  defaultPlatform?: Platform;
  defaultTax?: TaxStatus;
  showMonthly?: boolean;
}) {
  const { quote } = useExchangeRate();
  const [amount, setAmount] = useState("");
  const [platform, setPlatform] = useState<Platform>(defaultPlatform);
  const [taxStatus, setTaxStatus] = useState<TaxStatus>(defaultTax);
  const [manualRate, setManualRate] = useState<string | null>(null);
  const [orders, setOrders] = useState("1");
  const started = useRef(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const rateInput = manualRate ?? (quote.rate ? formatRateInput(quote.rate) : "");
  const manual = manualRate !== null;

  const amountState = parseOrderAmount(amount);
  const rateState = parseExchangeRate(rateInput);
  const amountError = amountState.state === "invalid" ? amountState.message : undefined;
  const rateError = rateState.state === "invalid" ? rateState.message : undefined;
  const result =
    amountState.state === "ok" && rateState.state === "ok"
      ? calculateEarnings({
          orderAmountUsd: amountState.amount,
          platform,
          taxStatus,
          usdToPkrRate: rateState.rate,
        })
      : null;

  let monthly: number | null = null;
  let monthlyError = "";
  if (showMonthly && result) {
    const count = Number(orders);
    if (!/^\d+$/.test(orders) || count < 0 || count > 1000) {
      monthlyError = "Enter a whole number of orders from 0 to 1,000.";
    } else {
      monthly = projectMonthly(result, count);
    }
  }

  function markStarted() {
    if (started.current) return;
    started.current = true;
    trackEvent("calculator_started");
  }

  function reset() {
    setAmount("");
    setPlatform(defaultPlatform);
    setTaxStatus(defaultTax);
    setOrders("1");
    setManualRate(null);
  }

  function choosePlatform(next: Platform) {
    setPlatform(next);
    trackEvent("platform_selected", { platform: next });
  }

  return (
    <form
      className="grid min-w-0 items-start gap-3 lg:grid-cols-2"
      onSubmit={(event) => {
        event.preventDefault();
        resultRef.current?.focus();
        if (result) trackEvent("calculation_completed", { platform, taxStatus });
      }}
    >
      <div className="surface grid min-w-0 gap-4 rounded-3xl p-4 sm:p-5">
        <div>
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink">Calculate Your Earnings</h2>
          <p className="mt-1 text-sm leading-6 text-muted">
            Enter your project details to see your estimated take-home amount. Fees below are planning assumptions, not a deduction schedule from Fiverr, Upwork, Payoneer, or FBR.
          </p>
        </div>
        <Input
          label="Order Amount (USD)"
          name="orderAmount"
          inputMode="decimal"
          autoComplete="off"
          placeholder="500.00"
          prefix="$"
          value={amount}
          error={amountError}
          hint="Zero is allowed. Negative amounts are not."
          onChange={(event) => {
            markStarted();
            setAmount(event.target.value.replace(/-/g, ""));
          }}
        />
        <fieldset className="grid gap-2">
          <legend className="text-sm font-medium text-ink">Platform</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {platforms.map((item) => {
              const selected = platform === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => choosePlatform(item.id)}
                  className={cn(
                    "rounded-2xl border px-4 py-3 text-left transition",
                    selected
                      ? "border-brand bg-brand-50 shadow-[0_0_0_4px_rgba(49,91,255,0.12)]"
                      : "border-line bg-[#f7f9fd] hover:border-brand/40",
                  )}
                >
                  <span className="block text-base font-semibold tracking-[-0.02em]">{item.name}</span>
                  <span className="mt-0.5 block text-sm font-medium text-brand-ink">{item.fee}</span>
                  <span className="mt-1 block text-xs leading-5 text-muted">{item.note}</span>
                </button>
              );
            })}
          </div>
        </fieldset>
        <fieldset className="grid gap-2">
          <legend className="text-sm font-medium text-ink">Tax status</legend>
          <div className="grid grid-cols-2 rounded-2xl bg-[#f7f9fd] p-1" role="group" aria-label="Tax assumption">
            {(
              [
                ["filer", "Active Filer", "1% illustration"],
                ["nonFiler", "Non-Filer", "2% illustration"],
              ] as const
            ).map(([value, label, hint]) => {
              const selected = taxStatus === value;
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setTaxStatus(value)}
                  className={cn(
                    "rounded-xl px-3 py-2.5 text-left transition",
                    selected ? "bg-white text-ink shadow-[var(--shadow)]" : "text-muted",
                  )}
                >
                  <span className="block text-sm font-semibold">{label}</span>
                  <span className="block text-xs">{hint}</span>
                </button>
              );
            })}
          </div>
          <p className="text-sm leading-5 text-muted">Illustrative only. These are not current FBR rates.</p>
        </fieldset>
        <ExchangeRateField
          value={rateInput}
          manual={manual}
          error={rateError}
          onChange={(value) => {
            markStarted();
            setManualRate(value);
          }}
        />
        {showMonthly ? (
          <Input
            label="Similar orders this month"
            name="orders"
            inputMode="numeric"
            value={orders}
            error={monthlyError || undefined}
            hint="Multiplies the final PKR estimate. It does not mix different order sizes."
            onChange={(event) => setOrders(event.target.value.replace(/[^\d]/g, ""))}
          />
        ) : null}
        <button type="submit" className="cta-gradient h-12 rounded-xl text-sm font-semibold text-white">
          Calculate earnings
        </button>
        {monthly !== null ? (
          <div className="rounded-2xl border border-line bg-brand-50 p-4">
            <p className="text-sm font-semibold text-navy">Illustrative month</p>
            <p className="mt-1 text-2xl font-semibold tabular text-ink">{formatPkr(monthly)}</p>
            <p className="mt-1 text-sm text-muted">
              {orders} similar order{orders === "1" ? "" : "s"} at the current assumptions.
            </p>
          </div>
        ) : null}
      </div>
      <div ref={resultRef} tabIndex={-1} className="grid min-w-0 gap-4 outline-none">
        <EarningsBreakdown result={result} />
        <ResultActions result={result} onReset={reset} />
      </div>
    </form>
  );
}
