import { youtubeConfig, type YouTubeConfig } from "@/data/youtube";
import { roundScaled, scaledToNumber, toScaled } from "@/lib/money";

/** Currencies the existing rate route can display. The estimate itself stays in USD. */
export const DISPLAY_CURRENCIES = ["PKR", "EUR", "GBP", "AED"] as const;
export type DisplayCurrency = (typeof DISPLAY_CURRENCIES)[number];

export const SHORTS_PAUSE_MESSAGE =
  "Shorts revenue sharing is paused. Estimated Shorts views over 90 days are below the minimum in the config, so this Shorts estimate is 0. Long-form revenue is unchanged. The 90-day figure is monthly Shorts views multiplied by 3.";

export const SHORTS_UPCOMING_MESSAGE =
  "An upcoming rule can pause Shorts revenue sharing when estimated 90-day Shorts views are below the configured minimum. It is not in effect on this date, so this Shorts estimate is still calculated. Long-form revenue is separate. The 90-day figure is monthly Shorts views multiplied by 3.";

export type CalcFailure = { ok: false; message: string };
export type CalcSuccess<T> = { ok: true } & T;

export type LongFormInput =
  | { mode: "rpm"; views: unknown; rpm: unknown }
  | {
      mode: "cpm";
      views: unknown;
      /** Monetized playbacks as a percent of views, such as 50 for 50%. */
      monetizedPlaybackPercent: unknown;
      cpm: unknown;
      /** Creator share of gross ad revenue, such as 55 for 55%. */
      longFormSharePercent: unknown;
    };

export type LongFormResult = CalcSuccess<{
  revenueUsd: number;
  grossAdsUsd: number | null;
  effectiveRpm: number | null;
  sharePercent: number | null;
}>;

export type AudienceRow = { country: unknown; sharePercent: unknown; rpm: unknown };

export type AudienceMixResult = CalcSuccess<{
  weightedRpm: number;
  totalRevenueUsd: number;
  rows: { country: string; sharePercent: number; rpm: number; revenueUsd: number }[];
}>;

const MAX_AUDIENCE_ROWS = 6;

export function roundUsd(value: number): number {
  return scaledToNumber(roundScaled(toScaled(value, 6), 6, 2), 2);
}

function roundCount(value: number): number {
  return scaledToNumber(roundScaled(toScaled(value, 6), 6, 0), 0);
}

function readNonNegative(value: unknown, label: string): CalcSuccess<{ value: number }> | CalcFailure {
  if (value === null || value === undefined) return { ok: false, message: `${label} is required.` };
  if (typeof value === "string" && value.trim() === "") return { ok: false, message: `${label} is required.` };
  const numeric = typeof value === "number" ? value : typeof value === "string" ? Number(value.trim()) : Number.NaN;
  if (!Number.isFinite(numeric)) return { ok: false, message: `${label} must be a number.` };
  if (numeric < 0) return { ok: false, message: `${label} cannot be negative.` };
  return { ok: true, value: numeric };
}

function fail(result: CalcFailure): CalcFailure {
  return result;
}

function isIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return false;
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function readDate(value: unknown, label: string): CalcSuccess<{ value: string }> | CalcFailure {
  if (typeof value !== "string" || !isIsoDate(value)) {
    return { ok: false, message: `${label} must be a calendar date in YYYY-MM-DD form.` };
  }
  return { ok: true, value };
}

/** RPM is already the creator's revenue per 1,000 views. CPM applies the editable revenue share. */
export function longFormEarnings(input: LongFormInput): LongFormResult | CalcFailure {
  const views = readNonNegative(input.views, "Views");
  if (!views.ok) return views;

  if (input.mode === "rpm") {
    const rpm = readNonNegative(input.rpm, "RPM");
    if (!rpm.ok) return rpm;
    const revenueUsd = roundUsd((views.value / 1000) * rpm.value);
    const effectiveRpm = views.value === 0 ? null : roundUsd((revenueUsd / views.value) * 1000);
    return { ok: true, revenueUsd, grossAdsUsd: null, effectiveRpm, sharePercent: null };
  }

  const playback = readNonNegative(input.monetizedPlaybackPercent, "Monetized playback rate");
  if (!playback.ok) return playback;
  const cpm = readNonNegative(input.cpm, "CPM");
  if (!cpm.ok) return cpm;
  const share = readNonNegative(input.longFormSharePercent, "Revenue share");
  if (!share.ok) return share;
  if (playback.value > 100) return fail({ ok: false, message: "Monetized playback rate cannot be above 100%." });
  if (share.value > 100) return fail({ ok: false, message: "Revenue share cannot be above 100%." });

  const grossAdsUsd = roundUsd((views.value * (playback.value / 100) / 1000) * cpm.value);
  const revenueUsd = roundUsd(grossAdsUsd * (share.value / 100));
  const effectiveRpm = views.value === 0 ? null : roundUsd((revenueUsd / views.value) * 1000);
  return { ok: true, revenueUsd, grossAdsUsd, effectiveRpm, sharePercent: share.value };
}

/**
 * Shorts RPM is revenue per 1,000 Shorts views.
 * Estimated 90-day views = monthly views × 3. That is an approximation of a 90-day window.
 */
export function shortsEarnings(
  input: { monthlyViews: unknown; shortsRpm: unknown; today: unknown },
  config: YouTubeConfig = youtubeConfig,
):
  | CalcSuccess<{
      revenueUsd: number;
      estimatedViews90d: number;
      paused: boolean;
      upcomingRule: boolean;
      message: string | null;
    }>
  | CalcFailure {
  const views = readNonNegative(input.monthlyViews, "Shorts views");
  if (!views.ok) return views;
  const rpm = readNonNegative(input.shortsRpm, "Shorts RPM");
  if (!rpm.ok) return rpm;
  const today = readDate(input.today, "Today");
  if (!today.ok) return today;

  const estimatedViews90d = views.value * (config.shortsPayoutRule.windowDays / 30);
  const ruleInEffect = today.value >= config.shortsPayoutRule.effectiveFrom;
  const belowMinimum = estimatedViews90d < config.shortsPayoutRule.minViews;
  const calculated = roundUsd((views.value / 1000) * rpm.value);

  if (ruleInEffect && belowMinimum) {
    return {
      ok: true,
      revenueUsd: 0,
      estimatedViews90d,
      paused: true,
      upcomingRule: false,
      message: SHORTS_PAUSE_MESSAGE,
    };
  }

  return {
    ok: true,
    revenueUsd: calculated,
    estimatedViews90d,
    paused: false,
    upcomingRule: !ruleInEffect && belowMinimum,
    message: !ruleInEffect && belowMinimum ? SHORTS_UPCOMING_MESSAGE : null,
  };
}

/** Premium revenue per 1,000 views is entered by the user. The default is 0. */
export function premiumAddOn(views: unknown, premiumRevenuePerThousand: unknown): CalcSuccess<{ revenueUsd: number }> | CalcFailure {
  const viewCount = readNonNegative(views, "Views");
  if (!viewCount.ok) return viewCount;
  const perThousand = readNonNegative(premiumRevenuePerThousand, "Premium revenue per 1,000 views");
  if (!perThousand.ok) return perThousand;
  return { ok: true, revenueUsd: roundUsd((viewCount.value / 1000) * perThousand.value) };
}

export function audienceMix(views: unknown, rows: AudienceRow[]): AudienceMixResult | CalcFailure {
  const viewCount = readNonNegative(views, "Views");
  if (!viewCount.ok) return viewCount;
  if (!Array.isArray(rows) || rows.length === 0) {
    return { ok: false, message: "Add at least one audience row, or leave the mix turned off." };
  }
  if (rows.length > MAX_AUDIENCE_ROWS) {
    return { ok: false, message: "Use at most 6 audience rows." };
  }

  const parsed: { country: string; sharePercent: number; rpm: number; revenueUsd: number }[] = [];
  let shareTotal = 0;
  for (const row of rows) {
    const country = typeof row.country === "string" ? row.country.trim() : "";
    if (!country) return { ok: false, message: "Each audience row needs a country or region name." };
    const share = readNonNegative(row.sharePercent, "Audience share");
    if (!share.ok) return share;
    const rpm = readNonNegative(row.rpm, "Audience RPM");
    if (!rpm.ok) return rpm;
    if (share.value > 100) return { ok: false, message: "An audience share cannot be above 100%." };
    shareTotal += share.value;
    const revenueUsd = roundUsd((viewCount.value * (share.value / 100) / 1000) * rpm.value);
    parsed.push({ country, sharePercent: share.value, rpm: rpm.value, revenueUsd });
  }

  if (Math.abs(shareTotal - 100) > 0.01) {
    return { ok: false, message: `Audience shares must add up to 100%. They currently add up to ${roundUsd(shareTotal)}%.` };
  }

  const weightedRpm = roundUsd(parsed.reduce((sum, row) => sum + (row.sharePercent / 100) * row.rpm, 0));
  const totalRevenueUsd = roundUsd(parsed.reduce((sum, row) => sum + row.revenueUsd, 0));
  return { ok: true, weightedRpm, totalRevenueUsd, rows: parsed };
}

/**
 * Reduces only the US-audience portion. Pass the full estimate as totalRevenueUsd
 * so the returned net still includes revenue from other audiences.
 */
export function usWithholding(
  revenueFromUsAudience: unknown,
  percent: unknown,
  totalRevenueUsd?: unknown,
): CalcSuccess<{ usRevenueUsd: number; withheldUsd: number; netUsd: number }> | CalcFailure {
  const usRevenue = readNonNegative(revenueFromUsAudience, "US audience revenue");
  if (!usRevenue.ok) return usRevenue;
  const rate = readNonNegative(percent, "US withholding");
  if (!rate.ok) return rate;
  if (rate.value > 100) return { ok: false, message: "US withholding cannot be above 100%." };

  const totalInput = totalRevenueUsd === undefined ? usRevenue.value : totalRevenueUsd;
  const total = readNonNegative(totalInput, "Total revenue");
  if (!total.ok) return total;
  if (usRevenue.value - total.value > 0.001) {
    return { ok: false, message: "US audience revenue cannot be larger than total revenue." };
  }

  const withheldUsd = roundUsd(usRevenue.value * (rate.value / 100));
  const netUsd = roundUsd(total.value - withheldUsd);
  return { ok: true, usRevenueUsd: roundUsd(usRevenue.value), withheldUsd, netUsd };
}

export function scenarios(input: {
  views: unknown;
  mode: "rpm" | "cpm";
  low: unknown;
  expected: unknown;
  high: unknown;
  monetizedPlaybackPercent?: unknown;
  longFormSharePercent?: unknown;
}):
  | CalcSuccess<{
      low: { monthlyUsd: number; yearlyUsd: number };
      expected: { monthlyUsd: number; yearlyUsd: number };
      high: { monthlyUsd: number; yearlyUsd: number };
    }>
  | CalcFailure {
  const keys = ["low", "expected", "high"] as const;
  const totals = {} as Record<(typeof keys)[number], { monthlyUsd: number; yearlyUsd: number }>;

  for (const key of keys) {
    const result =
      input.mode === "rpm"
        ? longFormEarnings({ mode: "rpm", views: input.views, rpm: input[key] })
        : longFormEarnings({
            mode: "cpm",
            views: input.views,
            monetizedPlaybackPercent: input.monetizedPlaybackPercent,
            cpm: input[key],
            longFormSharePercent: input.longFormSharePercent,
          });
    if (!result.ok) return result;
    totals[key] = { monthlyUsd: result.revenueUsd, yearlyUsd: roundUsd(result.revenueUsd * 12) };
  }

  return { ok: true, ...totals };
}

export function payoutTimeline(
  monthlyNet: unknown,
  thresholdUsd: unknown,
): CalcSuccess<{ reachable: true; months: number } | { reachable: false; message: "not reachable" }> | CalcFailure {
  const monthly = readNonNegative(monthlyNet, "Monthly net");
  if (!monthly.ok) return monthly;
  const threshold = readNonNegative(thresholdUsd, "Payout threshold");
  if (!threshold.ok) return threshold;
  if (monthly.value === 0) return { ok: true, reachable: false, message: "not reachable" };

  const monthlyCents = roundScaled(toScaled(monthly.value, 6), 6, 2);
  const thresholdCents = roundScaled(toScaled(threshold.value, 6), 6, 2);
  if (monthlyCents <= 0n) return { ok: true, reachable: false, message: "not reachable" };
  if (thresholdCents <= 0n) return { ok: true, reachable: true, months: 0 };
  const months = Number((thresholdCents + monthlyCents - 1n) / monthlyCents);
  return { ok: true, reachable: true, months };
}

export function viewsNeeded(targetMonthly: unknown, rpm: unknown): CalcSuccess<{ views: number }> | CalcFailure {
  const target = readNonNegative(targetMonthly, "Target monthly revenue");
  if (!target.ok) return target;
  const rate = readNonNegative(rpm, "RPM");
  if (!rate.ok) return rate;
  if (rate.value === 0) return { ok: false, message: "RPM must be greater than zero to estimate the views required." };
  return { ok: true, views: roundCount((target.value / rate.value) * 1000) };
}

export type EligibilityCheck = {
  label: string;
  actual: number;
  threshold: number;
  pass: boolean;
};

export function checkYppEligibility(
  inputs: { subscribers: unknown; watchHours12m: unknown; shortsViews90d: unknown },
  today: unknown,
  config: YouTubeConfig = youtubeConfig,
):
  | CalcSuccess<{
      current: { effectiveLabel: string; checks: EligibilityCheck[] };
      from2027: { effectiveFrom: string; appliesNow: boolean; checks: EligibilityCheck[] };
      activityRule: string;
      verifyUrl: string;
    }>
  | CalcFailure {
  const subscribers = readNonNegative(inputs.subscribers, "Subscribers");
  if (!subscribers.ok) return subscribers;
  const watchHours = readNonNegative(inputs.watchHours12m, "Watch hours");
  if (!watchHours.ok) return watchHours;
  const shortsViews = readNonNegative(inputs.shortsViews90d, "Shorts views");
  if (!shortsViews.ok) return shortsViews;
  const date = readDate(today, "Today");
  if (!date.ok) return date;

  const row = (
    label: string,
    actual: number,
    threshold: number,
  ): EligibilityCheck => ({ label, actual, threshold, pass: actual >= threshold });

  return {
    ok: true,
    current: {
      effectiveLabel: "Thresholds on YouTube Help before 1 February 2027",
      checks: [
        row("Subscribers", subscribers.value, config.eligibility.current.subscribers),
        row("Qualified watch hours in 12 months", watchHours.value, config.eligibility.current.watchHours12m),
        row("Qualified Shorts views in 90 days", shortsViews.value, config.eligibility.current.shortsViews90d),
      ],
    },
    from2027: {
      effectiveFrom: config.eligibility.from2027.effectiveFrom,
      appliesNow: date.value >= config.eligibility.from2027.effectiveFrom,
      checks: [
        row("Subscribers", subscribers.value, config.eligibility.from2027.subscribers),
        row("Qualified watch hours in 12 months", watchHours.value, config.eligibility.from2027.watchHours12m),
        row("Qualified Shorts views in 90 days", shortsViews.value, config.eligibility.from2027.shortsViews90d),
      ],
    },
    activityRule: config.eligibility.activityRule,
    verifyUrl: config.eligibility.from2027.sourceUrl,
  };
}

export function displayConversion(
  usd: unknown,
  currency: unknown,
  rate: unknown,
): CalcSuccess<{ usd: number; currency: DisplayCurrency; converted: number | null; available: boolean }> | CalcFailure {
  const amount = readNonNegative(usd, "USD amount");
  if (!amount.ok) return amount;
  const code = typeof currency === "string" ? currency.trim().toUpperCase() : "";
  if (!DISPLAY_CURRENCIES.includes(code as DisplayCurrency)) {
    return { ok: false, message: "Display conversion only supports PKR, EUR, GBP, and AED." };
  }
  const usdAmount = roundUsd(amount.value);
  const numericRate = typeof rate === "number" ? rate : typeof rate === "string" && rate.trim() !== "" ? Number(rate.trim()) : null;
  if (numericRate === null || !Number.isFinite(numericRate) || numericRate <= 0) {
    return { ok: true, usd: usdAmount, currency: code as DisplayCurrency, converted: null, available: false };
  }
  return {
    ok: true,
    usd: usdAmount,
    currency: code as DisplayCurrency,
    converted: roundUsd(usdAmount * numericRate),
    available: true,
  };
}
