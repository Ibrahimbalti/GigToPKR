"use client";

import { useRef, useState } from "react";
import { ExchangeRateField } from "@/components/calculator/ExchangeRate";
import { useExchangeRate } from "@/components/calculator/ExchangeRateProvider";
import { EarningsBreakdown } from "@/components/calculator/EarningsBreakdown";
import { ResultActions } from "@/components/calculator/ResultActions";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import {
  CURRENCY_LABELS,
  DEFAULT_PLATFORM_FEE_PERCENT,
  DEFAULT_TAX_PERCENT,
  DIRECT_BANK_FEE_USD,
  PAYOUT_CURRENCY_LABELS,
  UPWORK_FEE_PERCENTS,
  WITHDRAWAL_METHODS,
} from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { formatPkr, formatRateInput } from "@/lib/money";
import { prepareCalculation } from "@/lib/prepare-calculation";
import { projectMonthly } from "@/lib/calculator";
import { payoutPerOrderUnitInput, unitsPerUsd } from "@/lib/quote-math";
import { queryToShare, sharePath, type CalculatorShare } from "@/lib/share-result";
import { cn } from "@/lib/utils";
import type { Currency, PayoutCurrency, Platform, TaxStatus, WithdrawalMethod } from "@/types/calculator";

const platforms: { id: Platform; name: string; note: string }[] = [
  { id: "fiverr", name: "Fiverr", note: "Freelancers earn 80% on the published earnings page. 20% is the default." },
  { id: "upwork", name: "Upwork", note: "Published fee is 0% to 15% per contract. 10% is the default." },
];

export function Calculator({
  defaultPlatform = "fiverr",
  defaultTax = "filer",
  showMonthly = false,
  lockedPlatform,
}: {
  defaultPlatform?: Platform;
  defaultTax?: TaxStatus;
  showMonthly?: boolean;
  /** When set, the other marketplace cannot be selected on this page. */
  lockedPlatform?: Platform;
}) {
  const { quote } = useExchangeRate();
  const [initialShare] = useState<Partial<CalculatorShare> | null>(() =>
    typeof window !== "undefined" ? queryToShare(window.location.search) : null,
  );
  const initialPlatform: Platform =
    lockedPlatform ?? initialShare?.platform ?? defaultPlatform;
  const [amount, setAmount] = useState(() => initialShare?.amount ?? "");
  const [target, setTarget] = useState(() => initialShare?.target ?? "");
  const [reverse, setReverse] = useState(() => Boolean(initialShare?.reverse));
  const [currency, setCurrency] = useState<Currency>(() => initialShare?.currency ?? "USD");
  const [platform, setPlatform] = useState<Platform>(() => initialPlatform);
  const [platformFee, setPlatformFee] = useState(
    () => initialShare?.platformFee ?? DEFAULT_PLATFORM_FEE_PERCENT[initialPlatform],
  );
  const [withdrawalFee, setWithdrawalFee] = useState(() => initialShare?.withdrawalFee ?? "2");
  const [taxStatus, setTaxStatus] = useState<TaxStatus>(defaultTax);
  const [taxFee, setTaxFee] = useState(
    () => initialShare?.taxFee ?? (lockedPlatform ? "0" : DEFAULT_TAX_PERCENT[defaultTax]),
  );
  const [method, setMethod] = useState<WithdrawalMethod>(() => initialShare?.method ?? "payoneer");
  const [early, setEarly] = useState(() => Boolean(initialShare?.early));
  const [earlyFee, setEarlyFee] = useState(() => (initialShare?.early ? (initialShare.earlyFee ?? "0") : "0"));
  const [bankFee, setBankFee] = useState(() => Boolean(initialShare?.bankFee));
  const [flatFee, setFlatFee] = useState(
    () => (initialShare?.bankFee ? (initialShare.flatFee ?? String(DIRECT_BANK_FEE_USD)) : String(DIRECT_BANK_FEE_USD)),
  );
  const [hourly, setHourly] = useState(() => Boolean(initialShare?.hourly));
  const [hourlyRate, setHourlyRate] = useState(() => (initialShare?.hourly ? (initialShare.hourlyRate ?? "") : ""));
  const [hours, setHours] = useState(() => (initialShare?.hourly ? (initialShare.hours ?? "") : ""));
  const [orders, setOrders] = useState("1");
  const [payoutCurrency, setPayoutCurrency] = useState<PayoutCurrency>("PKR");
  const [manualRate, setManualRate] = useState<string | null>(() => initialShare?.rate ?? null);
  const started = useRef(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const suggestedRate = payoutPerOrderUnitInput(currency, payoutCurrency, quote);
  const rateInput = manualRate ?? suggestedRate;
  const manual = manualRate !== null;
  const converting = !lockedPlatform || rateInput.trim().length > 0;

  const prepared = prepareCalculation({
    amount,
    target,
    reverse,
    currency,
    platform,
    platformFee,
    withdrawalFee,
    taxFee,
    taxStatus,
    method,
    early,
    earlyFee,
    bankFee,
    flatFee,
    hourly,
    hourlyRate,
    hours,
    rate: converting ? rateInput : "1",
    currencyPerUsd: unitsPerUsd(currency, quote),
  });
  const result = prepared.ok ? prepared.result : null;
  const share: CalculatorShare = {
    amount,
    target,
    reverse,
    currency,
    platform,
    platformFee,
    withdrawalFee,
    taxFee,
    method,
    early,
    earlyFee,
    bankFee,
    flatFee,
    hourly,
    hourlyRate,
    hours,
    rate: rateInput,
  };
  const shareHref = result && typeof window !== "undefined" ? sharePath(window.location.pathname, share) : null;

  let monthly: number | null = null;
  let monthlyError = "";
  if (showMonthly && result && !reverse) {
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
    setTarget("");
    setReverse(false);
    setCurrency("USD");
    setPlatform(lockedPlatform ?? defaultPlatform);
    setPlatformFee(DEFAULT_PLATFORM_FEE_PERCENT[lockedPlatform ?? defaultPlatform]);
    setTaxStatus(defaultTax);
    setTaxFee(lockedPlatform ? "0" : DEFAULT_TAX_PERCENT[defaultTax]);
    setWithdrawalFee("2");
    setMethod("payoneer");
    setEarly(false);
    setEarlyFee("0");
    setBankFee(false);
    setFlatFee(String(DIRECT_BANK_FEE_USD));
    setHourly(false);
    setHourlyRate("");
    setHours("");
    setOrders("1");
    setPayoutCurrency("PKR");
    setManualRate(null);
  }

  function choosePlatform(next: Platform) {
    setPlatform(next);
    setPlatformFee((current) => {
      if (next === "upwork" && current === DEFAULT_PLATFORM_FEE_PERCENT.fiverr) return DEFAULT_PLATFORM_FEE_PERCENT.upwork;
      if (next === "fiverr" && (UPWORK_FEE_PERCENTS as readonly string[]).includes(current)) {
        return DEFAULT_PLATFORM_FEE_PERCENT.fiverr;
      }
      return current;
    });
    trackEvent("platform_selected", { platform: next });
  }

  function chooseMethod(next: WithdrawalMethod) {
    setMethod(next);
    const found = WITHDRAWAL_METHODS.find((item) => item.id === next);
    setWithdrawalFee(found?.defaultPercent ?? "0");
    if (next === "directBank" && lockedPlatform !== "fiverr") {
      setBankFee(true);
      setFlatFee(String(DIRECT_BANK_FEE_USD));
    } else {
      setBankFee(false);
    }
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
            {lockedPlatform === "fiverr"
              ? "Fiverr only. The fee starts at 20% and stays editable. This page does not estimate Upwork."
              : lockedPlatform === "upwork"
                ? "Upwork only. The fee starts at 10% inside the published 0% to 15% range. This page does not estimate Fiverr."
                : "Fees start from published defaults and stay editable. Nothing here is a deduction schedule from Fiverr, Upwork, Payoneer, Wise, or a tax authority."}
          </p>
        </div>
        <Select
          label="Order currency"
          name="currency"
          value={currency}
          options={(Object.keys(CURRENCY_LABELS) as Currency[]).map((code) => ({
            value: code,
            label: `${code} — ${CURRENCY_LABELS[code]}`,
          }))}
          onChange={(event) => {
            markStarted();
            setCurrency(event.target.value as Currency);
            setManualRate(null);
          }}
        />
        {lockedPlatform ? null : (
        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-[#f7f9fd] p-1">
          <button
            type="button"
            aria-pressed={!reverse}
            onClick={() => setReverse(false)}
            className={cn("rounded-xl px-3 py-2.5 text-left text-sm font-semibold", !reverse ? "bg-white shadow-[var(--shadow)]" : "text-muted")}
          >
            I know the order amount
          </button>
          <button
            type="button"
            aria-pressed={reverse}
            onClick={() => setReverse(true)}
            className={cn("rounded-xl px-3 py-2.5 text-left text-sm font-semibold", reverse ? "bg-white shadow-[var(--shadow)]" : "text-muted")}
          >
            I want a local amount
          </button>
        </div>
        )}
        {reverse ? (
          <Input
            label="PKR you want to receive"
            name="targetPkr"
            inputMode="decimal"
            autoComplete="off"
            placeholder="100000.00"
            prefix="Rs"
            value={target}
            error={prepared.ok ? undefined : prepared.targetError}
            hint="The calculator solves for the order amount that reaches this deposit."
            onChange={(event) => {
              markStarted();
              setTarget(event.target.value.replace(/-/g, ""));
            }}
          />
        ) : hourly ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label={`Hourly rate (${currency})`}
              name="hourlyRate"
              inputMode="decimal"
              value={hourlyRate}
              error={prepared.ok ? undefined : prepared.amountError}
              onChange={(event) => {
                markStarted();
                setHourlyRate(event.target.value.replace(/-/g, ""));
              }}
            />
            <Input
              label="Hours"
              name="hours"
              inputMode="decimal"
              value={hours}
              hint="Order total is the rate times the hours."
              onChange={(event) => {
                markStarted();
                setHours(event.target.value.replace(/-/g, ""));
              }}
            />
          </div>
        ) : (
          <Input
            label={`Order amount (${currency})`}
            name="orderAmount"
            inputMode="decimal"
            autoComplete="off"
            placeholder="500.00"
            value={amount}
            error={prepared.ok ? undefined : prepared.amountError}
            hint="Zero is allowed. Negative amounts are not."
            onChange={(event) => {
              markStarted();
              setAmount(event.target.value.replace(/-/g, ""));
            }}
          />
        )}
        <label className="flex items-start gap-2 text-sm text-ink">
          <input
            type="checkbox"
            className="mt-1"
            checked={hourly}
            onChange={(event) => setHourly(event.target.checked)}
          />
          <span>
            <span className="font-medium">Hourly contract</span>
            <span className="mt-0.5 block text-muted">
              {reverse ? "Also divide the required order by the hours you enter." : "Multiply an hourly rate by hours to get the order total."}
            </span>
          </span>
        </label>
        {reverse && hourly ? (
          <Input
            label="Hours on the contract"
            name="reverseHours"
            inputMode="decimal"
            value={hours}
            hint="Used only to show the hourly rate that reaches the PKR target."
            onChange={(event) => setHours(event.target.value.replace(/-/g, ""))}
          />
        ) : null}
        {lockedPlatform ? null : (
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
                  <span className="mt-1 block text-xs leading-5 text-muted">{item.note}</span>
                </button>
              );
            })}
          </div>
        </fieldset>
        )}
        {platform === "upwork" ? (
          <div className="grid gap-2">
            <p className="text-sm font-medium text-ink" id="upwork-fee-label">
              Upwork fee
            </p>
            <div className="flex flex-wrap gap-2" role="group" aria-labelledby="upwork-fee-label">
              {UPWORK_FEE_PERCENTS.map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={platformFee === value}
                  onClick={() => setPlatformFee(value)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm font-semibold",
                    platformFee === value ? "border-brand bg-brand-50 text-brand-ink" : "border-line bg-white text-ink",
                  )}
                >
                  {value}%
                </button>
              ))}
            </div>
          </div>
        ) : null}
        <Input
          label="Platform fee %"
          name="platformFee"
          inputMode="decimal"
          value={platformFee}
          error={prepared.ok ? undefined : prepared.feeError}
          hint={platform === "fiverr" ? "Default 20, from Fiverr's published 80% share, including extras and tips. Change it if your screen differs." : "Default 10, inside Upwork's published 0% to 15% range. The exact fee is on your offer."}
          onChange={(event) => {
            markStarted();
            setPlatformFee(event.target.value.replace(/-/g, ""));
          }}
        />
        <Select
          label="Withdrawal method"
          name="withdrawalMethod"
          value={method}
          hint={
            method === "wise"
              ? "Wise charges no fixed receiving fee, but typically applies ~0.4%–1% currency conversion fee depending on corridor — adjust if converting to local currency."
              : lockedPlatform === "upwork"
                ? "Payoneer defaults to 2%. Direct to local bank is $0.99 per withdrawal and assumes this order is the whole withdrawal. Company accounts in local currency may not be accepted."
                : "Payoneer defaults to 2%. Real Payoneer bank fees are often about 1.2% to 4%. Type the percentage on your confirmation screen."
          }
          options={WITHDRAWAL_METHODS.filter((item) => lockedPlatform !== "fiverr" || item.id !== "directBank").map((item) => ({
            value: item.id,
            label: item.label,
          }))}
          onChange={(event) => chooseMethod(event.target.value as WithdrawalMethod)}
        />
        {lockedPlatform === "upwork" && bankFee ? (
          <p className="text-sm leading-5 text-muted">
            The $0.99 fee replaces the withdrawal percent. It is charged per withdrawal, and this estimate assumes the order is the whole withdrawal.
          </p>
        ) : (
        <Input
          label="Withdrawal fee %"
          name="withdrawalFee"
          inputMode="decimal"
          value={withdrawalFee}
          hint={
            method === "wise"
              ? "Wise defaults to 0% for same-currency receiving, or enter ~0.4%–1% if converting to local currency."
              : "Applied after the platform fee. Type the percentage on your confirmation screen."
          }
          onChange={(event) => setWithdrawalFee(event.target.value.replace(/-/g, ""))}
        />
        )}
        {lockedPlatform === "fiverr" ? null : (
        <>
        <label className="flex items-start gap-2 text-sm text-ink">
          <input
            type="checkbox"
            className="mt-1"
            checked={bankFee}
            onChange={(event) => {
              const on = event.target.checked;
              setBankFee(on);
              if (on) {
                setMethod("directBank");
                setWithdrawalFee("0");
                setFlatFee(String(DIRECT_BANK_FEE_USD));
              } else if (method === "directBank") {
                setMethod("payoneer");
                setWithdrawalFee("2");
              }
            }}
          />
          <span>
            <span className="font-medium">Add the Upwork $0.99 direct-to-bank fee</span>
            <span className="mt-0.5 block text-muted">A flat USD amount, converted into the order currency. Edit it if your account shows a different figure.</span>
          </span>
        </label>
        {bankFee ? (
          <Input
            label="Flat fee (USD)"
            name="flatFee"
            inputMode="decimal"
            value={flatFee}
            hint="Upwork's published direct-to-local-bank fee is $0.99 per withdrawal. This estimate assumes the order is the whole withdrawal, so it is not stacked on the percent fee."
            onChange={(event) => setFlatFee(event.target.value.replace(/-/g, ""))}
          />
        ) : null}
        </>
        )}
        {lockedPlatform === "upwork" ? null : (
        <>
        <label className="flex items-start gap-2 text-sm text-ink">
          <input type="checkbox" className="mt-1" checked={early} onChange={(event) => setEarly(event.target.checked)} />
          <span>
            <span className="font-medium">Fiverr early payout</span>
            <span className="mt-0.5 block text-muted">This site does not assume an early-payout rate. Type the percentage Fiverr shows, or leave 0.</span>
          </span>
        </label>
        {early ? (
          <Input
            label="Early payout fee %"
            name="earlyFee"
            inputMode="decimal"
            value={earlyFee}
            hint="Taken from the amount left after the platform fee."
            onChange={(event) => setEarlyFee(event.target.value.replace(/-/g, ""))}
          />
        ) : null}
        </>
        )}
        <fieldset className="grid gap-2">
          <legend className="text-sm font-medium text-ink">Tax percentage</legend>
          <div className="grid grid-cols-2 rounded-2xl bg-[#f7f9fd] p-1" role="group" aria-label="Tax illustration presets">
            {(
              [
                ["filer", "1% illustration"],
                ["nonFiler", "2% illustration"],
              ] as const
            ).map(([value, label]) => {
              const selected = taxStatus === value && taxFee === DEFAULT_TAX_PERCENT[value];
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    setTaxStatus(value);
                    setTaxFee(DEFAULT_TAX_PERCENT[value]);
                  }}
                  className={cn("rounded-xl px-3 py-2.5 text-left text-sm font-semibold", selected ? "bg-white shadow-[var(--shadow)]" : "text-muted")}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <Input
            label="Tax %"
            name="taxFee"
            inputMode="decimal"
            value={taxFee}
            hint={lockedPlatform ? "Optional. Not tax advice and not a country tax rate. Leave 0 to skip it." : "1% and 2% are illustrations, not a tax authority's rates. Replace them with the percentage you want to set aside."}
            onChange={(event) => setTaxFee(event.target.value.replace(/-/g, ""))}
          />
        </fieldset>
        <Select
          label="Payout currency"
          name="payoutCurrency"
          value={payoutCurrency}
          options={(Object.keys(PAYOUT_CURRENCY_LABELS) as PayoutCurrency[]).map((code) => ({
            value: code,
            label: `${code} — ${PAYOUT_CURRENCY_LABELS[code]}`,
          }))}
          hint="Auto-fills the live reference rate for your selected payout currency. You can override the rate below."
          onChange={(event) => {
            markStarted();
            setPayoutCurrency(event.target.value as PayoutCurrency);
            setManualRate(null);
          }}
        />
        <ExchangeRateField
          currency={currency}
          payoutCurrency={payoutCurrency}
          value={rateInput}
          manual={manual}
          optional={Boolean(lockedPlatform)}
          error={prepared.ok ? undefined : prepared.rateError}
          onChange={(value) => {
            markStarted();
            setManualRate(value);
          }}
          onUseLiveRate={() => setManualRate(null)}
        />
        {!lockedPlatform && !manual && !suggestedRate && quote.status !== "loading" ? (
          <p className="text-sm text-muted">
            {currency === "USD"
              ? "The reference rate is unavailable, so the field stays empty until you type one."
              : `No ${currency} cross rate came back. Type how many PKR you get for 1 ${currency}.`}
          </p>
        ) : null}
        {showMonthly && !reverse ? (
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
          {reverse ? "Find the order amount" : "Calculate earnings"}
        </button>
        {prepared.ok && prepared.requiredAmount !== null ? (
          <div className="rounded-2xl border border-line bg-brand-50 p-4">
            <p className="text-sm font-semibold text-navy">Charge at least</p>
            <p className="mt-1 text-2xl font-semibold tabular text-ink">
              {currency} {formatRateInput(prepared.requiredAmount)}
            </p>
            {prepared.impliedHourly !== null ? (
              <p className="mt-1 text-sm text-muted">
                About {currency} {formatRateInput(prepared.impliedHourly)} per hour for the hours you entered.
              </p>
            ) : (
              <p className="mt-1 text-sm text-muted">Order amount in {currency} that reaches {formatPkr(Number(target) || prepared.result.finalPkr)} after the fees above.</p>
            )}
          </div>
        ) : null}
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
        <EarningsBreakdown
          result={result}
          presentation={
            !converting
              ? "order"
              : payoutCurrency === "PKR"
                ? "pkr"
                : "local"
          }
          payoutCurrency={payoutCurrency}
        />
        <ResultActions result={result} onReset={reset} shareHref={shareHref} />
      </div>
    </form>
  );
}
