"use client";

import { RefreshCw } from "lucide-react";
import { useExchangeRate } from "@/components/calculator/ExchangeRateProvider";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatRate } from "@/lib/money";
import { formatTimestamp } from "@/lib/utils";

export function LiveRate({ compact = false }: { compact?: boolean }) {
  const { quote } = useExchangeRate();
  const isLoading = quote.status === "loading";
  const value = quote.rate ? `USD/PKR ${formatRate(quote.rate)}` : "Rate unavailable";

  return (
    <p
      className="inline-flex min-h-8 min-w-[9.75rem] items-center justify-center whitespace-nowrap rounded-full border border-line bg-white px-3 text-xs font-semibold text-navy shadow-[var(--shadow)]"
      title={quote.sourceLabel}
      aria-busy={isLoading}
    >
      <span className="sr-only">Reference exchange rate. </span>
      {isLoading ? (
        <>
          <span className="sr-only">Fetching rate</span>
          <Skeleton variant="text" className="h-3 w-24" />
        </>
      ) : compact ? (
        value
      ) : (
        value
      )}
    </p>
  );
}

export function ExchangeRateField({
  value,
  onChange,
  manual,
  error,
  currency = "USD",
  payoutCurrency = "PKR",
  optional = false,
  onUseLiveRate,
}: {
  value: string;
  onChange: (value: string) => void;
  manual: boolean;
  error?: string;
  currency?: string;
  payoutCurrency?: string;
  /** User-typed or live reference local rate. Leave blank to skip conversion. */
  optional?: boolean;
  onUseLiveRate?: () => void;
}) {
  const { quote, retry } = useExchangeRate();
  const isLoading = !manual && quote.status === "loading";
  const hasLiveRate = Boolean(quote.rate || quote.crosses);
  const status = manual
    ? "Manual override"
    : value.trim() && hasLiveRate
      ? quote.stale
        ? "Cached rate"
        : "Live reference rate"
      : optional
        ? "Optional"
        : "Rate needed";

  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <label htmlFor="usd-pkr-rate" className="text-sm font-medium text-ink">
          {`${currency} to ${payoutCurrency} rate`}
        </label>
        <div className="flex items-center gap-2">
          {quote.retrievedAt ? (
            <span className="text-xs text-muted">
              Updated {formatTimestamp(quote.retrievedAt)}
            </span>
          ) : null}
          {isLoading ? (
            <Skeleton variant="rect" className="h-6 w-28 !rounded-full" />
          ) : (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-navy-2">
              {status}
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <input
          id="usd-pkr-rate"
          inputMode="decimal"
          autoComplete="off"
          placeholder={optional ? "Auto-filled or leave blank to skip" : "Enter a rate"}
          value={value}
          aria-invalid={error ? true : undefined}
          aria-describedby="rate-help"
          onChange={(event) => onChange(event.target.value.replace(/-/g, ""))}
          className="field tabular"
        />
        {manual && onUseLiveRate ? (
          <button
            type="button"
            onClick={onUseLiveRate}
            className="inline-flex h-[3.25rem] items-center gap-2 whitespace-nowrap rounded-[0.9rem] border border-line bg-white px-3 text-sm font-semibold text-navy shadow-[var(--shadow)] hover:border-brand/30"
          >
            <RefreshCw aria-hidden className="size-4" />
            Use live rate
          </button>
        ) : (
          <button
            type="button"
            onClick={retry}
            className="inline-flex h-[3.25rem] items-center gap-2 rounded-[0.9rem] border border-line bg-white px-3 text-sm font-semibold text-navy shadow-[var(--shadow)] hover:border-brand/30"
          >
            <RefreshCw aria-hidden className="size-4" />
            Retry
          </button>
        )}
      </div>
      <div id="rate-help" className="grid gap-1 text-sm text-muted">
        {isLoading ? (
          <p>
            <span className="sr-only">Looking up a reference rate. Frankfurter is checked first.</span>
            <Skeleton variant="text" className="h-5 w-full max-w-md" />
          </p>
        ) : (
          <p>
            <span className="font-semibold text-ink">Updated: </span>
            {quote.retrievedAt ? formatTimestamp(quote.retrievedAt) : "unavailable"}
            {quote.stale ? " (cached fallback — live refresh failed)" : ""}
            {quote.retrievedAt
              ? ` via ${quote.sourceLabel}. Override this rate anytime to match your bank or Payoneer spread.`
              : ". Type the rate from your bank or Payoneer. No guessed rate is filled in."}
          </p>
        )}
        {quote.warning ? <p>{quote.warning}</p> : null}
        {quote.error ? (
          <p className="font-medium text-danger-ink" role="alert">
            {quote.error}
          </p>
        ) : null}
        {error ? (
          <p className="font-medium text-danger-ink" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}
