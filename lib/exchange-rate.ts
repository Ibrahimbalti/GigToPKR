import {
  EXCHANGE_RATE_API_URL,
  FRANKFURTER_PKR_NOTE,
  FRANKFURTER_URL,
} from "@/lib/constants";
import type { CrossRates, ExchangeRateQuote } from "@/types/calculator";

const REQUEST_TIMEOUT_MS = 8000;

export function readPositiveRate(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) return null;
  return Number(value.toFixed(6));
}

export function readFrankfurterPkr(payload: unknown): number | null {
  if (!payload || typeof payload !== "object") return null;
  const rates = (payload as { rates?: unknown }).rates;
  if (!rates || typeof rates !== "object") return null;
  return readPositiveRate((rates as Record<string, unknown>).PKR);
}

function readRateMap(payload: unknown): Record<string, number | null> | null {
  if (!payload || typeof payload !== "object") return null;
  const rates = (payload as { rates?: unknown }).rates;
  if (!rates || typeof rates !== "object") return null;
  return {
    PKR: readPositiveRate((rates as Record<string, unknown>).PKR),
    EUR: readPositiveRate((rates as Record<string, unknown>).EUR),
    GBP: readPositiveRate((rates as Record<string, unknown>).GBP),
    AED: readPositiveRate((rates as Record<string, unknown>).AED),
    INR: readPositiveRate((rates as Record<string, unknown>).INR),
    PHP: readPositiveRate((rates as Record<string, unknown>).PHP),
    BDT: readPositiveRate((rates as Record<string, unknown>).BDT),
  };
}

export function readOpenErApiCrosses(payload: unknown): CrossRates | null {
  if (!payload || typeof payload !== "object") return null;
  if ((payload as { result?: unknown }).result !== "success") return null;
  const rates = readRateMap(payload);
  if (!rates) return null;
  const base: CrossRates = { EUR: rates.EUR, GBP: rates.GBP, AED: rates.AED };
  if (rates.INR !== null) base.INR = rates.INR;
  if (rates.PHP !== null) base.PHP = rates.PHP;
  if (rates.BDT !== null) base.BDT = rates.BDT;
  return base;
}

export function readOpenErApiPkr(payload: unknown): {
  rate: number;
  updatedAt: string | null;
} | null {
  if (!payload || typeof payload !== "object") return null;
  const record = payload as {
    result?: unknown;
    rates?: unknown;
    time_last_update_utc?: unknown;
  };
  if (record.result !== "success") return null;
  if (!record.rates || typeof record.rates !== "object") return null;
  const rate = readPositiveRate((record.rates as Record<string, unknown>).PKR);
  if (!rate) return null;
  const updatedAt =
    typeof record.time_last_update_utc === "string" ? record.time_last_update_utc : null;
  return { rate, updatedAt };
}

async function readJson(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

async function request(url: string, fetchImpl: typeof fetch): Promise<Response | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetchImpl(url, {
      signal: controller.signal,
      headers: { accept: "application/json" },
      next: { revalidate: 1800 },
    });
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

const SUCCESS_TTL_MS = 6 * 60 * 60 * 1000;
const FAILURE_TTL_MS = 60 * 1000;
let memory: { at: number; quote: ExchangeRateQuote } | null = null;
let lastGood: ExchangeRateQuote | null = null;

/** Same 30-minute quote the calculator API serves, shared with worked examples. */
export async function getCachedUsdToPkrQuote(
  fetchImpl: typeof fetch = fetch,
): Promise<ExchangeRateQuote> {
  const now = Date.now();
  if (memory) {
    const ttl = memory.quote.rate ? SUCCESS_TTL_MS : FAILURE_TTL_MS;
    if (now - memory.at < ttl) return { ...memory.quote, fromCache: true };
  }
  const quote = await getUsdToPkrQuote(fetchImpl);
  if (quote.rate) {
    lastGood = quote;
    memory = { at: now, quote };
    return quote;
  }
  if (lastGood) {
    const stale: ExchangeRateQuote = {
      ...lastGood,
      fromCache: true,
      stale: true,
      warning: `Live rates could not be refreshed. Showing the last successful quote${lastGood.retrievedAt ? ` from ${lastGood.retrievedAt}` : ""}. Confirm it on your payout screen before you withdraw.`,
      error: null,
    };
    memory = { at: now, quote: stale };
    return stale;
  }
  memory = { at: now, quote };
  return quote;
}

/**
 * Ask Frankfurter for USD/PKR first. PKR is outside the ECB set Frankfurter
 * publishes, which we treat as unsupported rather than inventing a rate.
 * A clearly labeled ExchangeRate-API open quote is used only as a secondary
 * reference. If that also fails, the caller must collect a manual rate.
 */
export async function getUsdToPkrQuote(
  fetchImpl: typeof fetch = fetch,
): Promise<ExchangeRateQuote> {
  const frankfurterResponse = await request(FRANKFURTER_URL, fetchImpl);
  const frankfurterPayload = frankfurterResponse?.ok
    ? await readJson(frankfurterResponse)
    : null;
  const frankfurterRates = readRateMap(frankfurterPayload);
  const frankfurterRate = frankfurterRates?.PKR ?? null;
  const frankfurterCrosses: CrossRates = {
    EUR: frankfurterRates?.EUR ?? null,
    GBP: frankfurterRates?.GBP ?? null,
    AED: null,
    INR: frankfurterRates?.INR ?? null,
    PHP: frankfurterRates?.PHP ?? null,
    BDT: null,
  };

  if (frankfurterRate) {
    return {
      rate: frankfurterRate,
      origin: "frankfurter",
      sourceLabel: "Frankfurter (European Central Bank reference rates)",
      retrievedAt: new Date().toISOString(),
      frankfurterSupportsPkr: true,
      warning:
        "This is a reference rate, not the rate Payoneer, your bank, or a central bank will apply.",
      error: null,
      fromCache: false,
      stale: false,
      crosses: frankfurterCrosses,
    };
  }

  const secondaryResponse = await request(EXCHANGE_RATE_API_URL, fetchImpl);
  const secondaryPayload = secondaryResponse?.ok ? await readJson(secondaryResponse) : null;
  const secondary = readOpenErApiPkr(secondaryPayload);
  const secondaryCrosses = readOpenErApiCrosses(secondaryPayload);
  const crosses: CrossRates = {
    EUR: frankfurterCrosses.EUR ?? secondaryCrosses?.EUR ?? null,
    GBP: frankfurterCrosses.GBP ?? secondaryCrosses?.GBP ?? null,
    AED: secondaryCrosses?.AED ?? null,
    INR: frankfurterCrosses.INR ?? secondaryCrosses?.INR ?? null,
    PHP: frankfurterCrosses.PHP ?? secondaryCrosses?.PHP ?? null,
    BDT: secondaryCrosses?.BDT ?? null,
  };

  if (secondary) {
    return {
      rate: secondary.rate,
      origin: "exchangerate-api",
      sourceLabel: "ExchangeRate-API open access",
      retrievedAt: secondary.updatedAt,
      frankfurterSupportsPkr: false,
      warning: `${FRANKFURTER_PKR_NOTE} The figure below is a separate reference quote from ExchangeRate-API, not a Frankfurter, Payoneer, or central-bank rate.`,
      error: null,
      fromCache: false,
      stale: false,
      crosses,
    };
  }

  return {
    rate: null,
    origin: null,
    sourceLabel: "No live rate available",
    retrievedAt: null,
    frankfurterSupportsPkr: false,
    warning: FRANKFURTER_PKR_NOTE,
    error:
      "A live USD to PKR rate could not be retrieved. Enter the rate from your bank, Payoneer, or another source you trust. This calculator will not fill in a guessed rate.",
    fromCache: false,
    stale: false,
    crosses: frankfurterRates ? crosses : null,
  };
}
