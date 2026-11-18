import { youtubeConfig } from "@/data/youtube";
import { formatMoney, formatPkr, formatUsd } from "@/lib/money";
import {
  DISPLAY_CURRENCIES,
  audienceMix,
  displayConversion,
  longFormEarnings,
  payoutTimeline,
  premiumAddOn,
  roundUsd,
  shortsEarnings,
  usWithholding,
  type DisplayCurrency,
} from "@/lib/youtubeCalc";

export type VideoMode = "long" | "shorts" | "both";
export type RateMethod = "rpm" | "cpm";

export type MixRow = { country: string; share: string; rpm: string };

export type YouTubeForm = {
  mode: VideoMode;
  views: string;
  videos: string;
  method: RateMethod;
  playback: string;
  share: string;
  low: string;
  expected: string;
  high: string;
  shortsLow: string;
  shortsExpected: string;
  shortsHigh: string;
  premium: string;
  withholding: string;
  threshold: string;
  mixOn: boolean;
  rows: MixRow[];
  currency: "" | DisplayCurrency;
  manualRate: string;
  subscribers: string;
  watchHours: string;
  shortsViews90: string;
  target: string;
  targetRpm: string;
};

export type RateOffer = { code: DisplayCurrency; rate: number };

export type ScenarioView = {
  key: "low" | "expected" | "high";
  label: string;
  monthlyUsd: number;
  yearlyUsd: number;
  perVideoUsd: number | null;
  convertedMonthly: number | null;
};

export type YouTubeEstimate = {
  ready: boolean;
  notice: string | null;
  scenarios: ScenarioView[];
  steps: { label: string; detail: string }[];
  shortsMessage: string | null;
  payoutMonths: number | null;
  payoutUnreachable: boolean;
  currency: DisplayCurrency | null;
  rateUsed: number | null;
  manualRate: boolean;
};

const emptyRow = (): MixRow => ({ country: "", share: "", rpm: "" });

export function defaultYouTubeForm(): YouTubeForm {
  return {
    mode: "long",
    views: "",
    videos: "",
    method: "rpm",
    playback: "",
    share: String(youtubeConfig.revenueShare.longFormPercent),
    low: "",
    expected: "",
    high: "",
    shortsLow: "",
    shortsExpected: "",
    shortsHigh: "",
    premium: "0",
    withholding: String(youtubeConfig.usWithholding.defaultPercent),
    threshold: String(youtubeConfig.payout.thresholdUsd),
    mixOn: false,
    rows: [emptyRow(), emptyRow()],
    currency: "",
    manualRate: "",
    subscribers: "",
    watchHours: "",
    shortsViews90: "",
    target: "",
    targetRpm: "",
  };
}

function one(value: string | string[] | undefined): string {
  const raw = Array.isArray(value) ? value[0] : value;
  return typeof raw === "string" ? raw : "";
}

export function formFromQuery(query: Record<string, string | string[] | undefined>): YouTubeForm {
  const form = defaultYouTubeForm();
  const mode = one(query.mode);
  if (mode === "long" || mode === "shorts" || mode === "both") form.mode = mode;
  const method = one(query.method);
  if (method === "rpm" || method === "cpm") form.method = method;
  const currency = one(query.cur).toUpperCase();
  if (DISPLAY_CURRENCIES.includes(currency as DisplayCurrency)) form.currency = currency as DisplayCurrency;
  form.views = one(query.views);
  form.videos = one(query.videos);
  form.playback = one(query.playback);
  if (one(query.share)) form.share = one(query.share);
  form.low = one(query.low);
  form.expected = one(query.expected);
  form.high = one(query.high);
  form.shortsLow = one(query.slow);
  form.shortsExpected = one(query.sexp);
  form.shortsHigh = one(query.shigh);
  if (one(query.premium)) form.premium = one(query.premium);
  if (one(query.withholding)) form.withholding = one(query.withholding);
  if (one(query.threshold)) form.threshold = one(query.threshold);
  form.manualRate = one(query.rate);
  form.mixOn = one(query.mix) === "1";
  form.subscribers = one(query.subs);
  form.watchHours = one(query.hours);
  form.shortsViews90 = one(query.sviews);
  form.target = one(query.target);
  form.targetRpm = one(query.trpm);
  const rows: MixRow[] = [];
  for (let index = 0; index < 6; index += 1) {
    const country = one(query[`c${index}`]);
    const share = one(query[`p${index}`]);
    const rpm = one(query[`r${index}`]);
    if (country || share || rpm) rows.push({ country, share, rpm });
  }
  if (rows.length) form.rows = rows;
  return form;
}

export function formToQuery(form: YouTubeForm): string {
  const params = new URLSearchParams();
  params.set("mode", form.mode);
  if (form.views) params.set("views", form.views);
  if (form.videos) params.set("videos", form.videos);
  params.set("method", form.method);
  if (form.playback) params.set("playback", form.playback);
  if (form.share) params.set("share", form.share);
  if (form.low) params.set("low", form.low);
  if (form.expected) params.set("expected", form.expected);
  if (form.high) params.set("high", form.high);
  if (form.shortsLow) params.set("slow", form.shortsLow);
  if (form.shortsExpected) params.set("sexp", form.shortsExpected);
  if (form.shortsHigh) params.set("shigh", form.shortsHigh);
  if (form.premium && form.premium !== "0") params.set("premium", form.premium);
  if (form.withholding && form.withholding !== "0") params.set("withholding", form.withholding);
  if (form.threshold) params.set("threshold", form.threshold);
  if (form.currency) params.set("cur", form.currency);
  if (form.manualRate) params.set("rate", form.manualRate);
  if (form.mixOn) params.set("mix", "1");
  form.rows.forEach((row, index) => {
    if (!row.country && !row.share && !row.rpm) return;
    params.set(`c${index}`, row.country);
    params.set(`p${index}`, row.share);
    params.set(`r${index}`, row.rpm);
  });
  if (form.subscribers) params.set("subs", form.subscribers);
  if (form.watchHours) params.set("hours", form.watchHours);
  if (form.shortsViews90) params.set("sviews", form.shortsViews90);
  if (form.target) params.set("target", form.target);
  if (form.targetRpm) params.set("trpm", form.targetRpm);
  const query = params.toString();
  return query ? `?${query}` : "";
}

function isUs(country: string): boolean {
  const value = country.trim().toLowerCase();
  return value === "us" || value === "usa" || value === "united states";
}

function money(amount: number, currency: DisplayCurrency | null): string {
  if (!currency) return formatUsd(amount);
  if (currency === "PKR") return formatPkr(amount);
  return formatMoney(amount, currency);
}

function blank(value: string): boolean {
  return value.trim() === "";
}

export function estimateYouTube(form: YouTubeForm, today: string, offers: RateOffer[]): YouTubeEstimate {
  const empty: YouTubeEstimate = {
    ready: false,
    notice: null,
    scenarios: [],
    steps: [],
    shortsMessage: null,
    payoutMonths: null,
    payoutUnreachable: false,
    currency: null,
    rateUsed: null,
    manualRate: false,
  };
  if (blank(form.views)) {
    return { ...empty, notice: "Enter monthly views and your own RPM or CPM to see an estimate." };
  }

  const includeLong = form.mode === "long" || form.mode === "both";
  const includeShorts = form.mode === "shorts" || form.mode === "both";
  const longRates = [form.low, form.expected, form.high] as const;
  const shortsRates = [form.shortsLow, form.shortsExpected, form.shortsHigh] as const;
  const labels = ["Low", "Expected", "High"] as const;
  const keys = ["low", "expected", "high"] as const;

  if (includeLong && form.method === "cpm" && (blank(form.playback) || blank(form.share))) {
    return { ...empty, notice: "Enter the monetized playback rate and the revenue share to use CPM." };
  }
  if (includeLong && longRates.some(blank)) {
    return { ...empty, notice: "Enter a low, expected, and high rate. These are example fields for your YouTube Analytics numbers." };
  }
  if (includeShorts && shortsRates.some(blank)) {
    return { ...empty, notice: "Enter a low, expected, and high Shorts RPM from your YouTube Analytics." };
  }

  const mixHasInput = form.rows.some((row) => row.country.trim() || row.share.trim() || row.rpm.trim());
  let mixFraction: number | null = null;
  let mixNote: string | null = null;
  if (form.mixOn && mixHasInput && includeLong && form.method === "rpm") {
    const mix = audienceMix(
      form.views,
      form.rows.map((row) => ({ country: row.country, sharePercent: row.share, rpm: row.rpm })),
    );
    if (!mix.ok) return { ...empty, notice: mix.message };
    const usRevenue = mix.rows.filter((row) => isUs(row.country)).reduce((sum, row) => sum + row.revenueUsd, 0);
    mixFraction = mix.totalRevenueUsd === 0 ? 0 : usRevenue / mix.totalRevenueUsd;
    mixNote = `Audience mix weighted RPM ${formatUsd(mix.weightedRpm).replace("USD ", "")} per 1,000 views. Expected long-form revenue uses this mix.`;
  }

  const premium = premiumAddOn(form.views, blank(form.premium) ? 0 : form.premium);
  if (!premium.ok) return { ...empty, notice: premium.message };

  const videos = blank(form.videos) ? null : Number(form.videos);
  if (videos !== null && (!Number.isFinite(videos) || videos < 0)) {
    return { ...empty, notice: "Videos per month cannot be negative." };
  }

  const scenarios: ScenarioView[] = [];
  let shortsMessage: string | null = null;
  const expectedSteps: { label: string; detail: string }[] = [];

  for (let index = 0; index < 3; index += 1) {
    let monthly = 0;
    if (includeLong) {
      const useMix = index === 1 && mixFraction !== null && form.method === "rpm";
      const earned = useMix
        ? audienceMix(
            form.views,
            form.rows.map((row) => ({ country: row.country, sharePercent: row.share, rpm: row.rpm })),
          )
        : form.method === "rpm"
          ? longFormEarnings({ mode: "rpm", views: form.views, rpm: longRates[index] })
          : longFormEarnings({
              mode: "cpm",
              views: form.views,
              monetizedPlaybackPercent: form.playback,
              cpm: longRates[index],
              longFormSharePercent: form.share,
            });
      if (!earned.ok) return { ...empty, notice: earned.message };
      const longRevenue = "totalRevenueUsd" in earned ? earned.totalRevenueUsd : earned.revenueUsd;
      monthly += longRevenue;
      if (index === 1) {
        if ("grossAdsUsd" in earned && earned.grossAdsUsd !== null) {
          expectedSteps.push({ label: "Gross ads", detail: formatUsd(earned.grossAdsUsd) });
          expectedSteps.push({ label: "Long-form after revenue share", detail: formatUsd(earned.revenueUsd) });
        } else {
          expectedSteps.push({ label: "Long-form revenue", detail: formatUsd(longRevenue) });
        }
      }
    }
    if (includeShorts) {
      const shorts = shortsEarnings({ monthlyViews: form.views, shortsRpm: shortsRates[index], today });
      if (!shorts.ok) return { ...empty, notice: shorts.message };
      monthly += shorts.revenueUsd;
      if (index === 1) {
        shortsMessage = shorts.message;
        expectedSteps.push({
          label: "Shorts revenue",
          detail: `${formatUsd(shorts.revenueUsd)}. Estimated 90-day views: ${Math.round(shorts.estimatedViews90d).toLocaleString("en-US")} (monthly views × 3).`,
        });
      }
    }
    monthly = roundUsd(monthly + premium.revenueUsd);
    if (index === 1 && premium.revenueUsd > 0) {
      expectedSteps.push({ label: "Premium add-on", detail: formatUsd(premium.revenueUsd) });
    }
    if (mixFraction !== null && !blank(form.withholding)) {
      const usPortion = roundUsd(monthly * mixFraction);
      const withheld = usWithholding(usPortion, form.withholding, monthly);
      if (!withheld.ok) return { ...empty, notice: withheld.message };
      monthly = withheld.netUsd;
      if (index === 1) {
        expectedSteps.push({ label: "US audience portion", detail: formatUsd(withheld.usRevenueUsd) });
        expectedSteps.push({ label: "US withholding", detail: formatUsd(withheld.withheldUsd) });
      }
    }
    const yearly = roundUsd(monthly * 12);
    const perVideo = videos && videos > 0 ? roundUsd(monthly / videos) : null;
    scenarios.push({
      key: keys[index] ?? "expected",
      label: labels[index] ?? "Expected",
      monthlyUsd: monthly,
      yearlyUsd: yearly,
      perVideoUsd: perVideo,
      convertedMonthly: null,
    });
  }

  if (mixFraction === null && !blank(form.withholding) && form.withholding.trim() !== "0") {
    expectedSteps.push({
      label: "US withholding",
      detail: "Not applied. Add an audience row named US, USA, or United States so the US portion can be identified.",
    });
  }
  const expected = scenarios[1];
  if (expected) {
    expectedSteps.push({ label: "Expected monthly total", detail: formatUsd(expected.monthlyUsd) });
    expectedSteps.push({ label: "Expected yearly total", detail: formatUsd(expected.yearlyUsd) });
    if (expected.perVideoUsd !== null) {
      expectedSteps.push({ label: "Expected revenue per video", detail: formatUsd(expected.perVideoUsd) });
    }
  }
  if (mixNote) expectedSteps.unshift({ label: "Audience mix", detail: mixNote });

  const offer = offers.find((item) => item.code === form.currency) ?? null;
  let currency: DisplayCurrency | null = null;
  let rateUsed: number | null = null;
  let manual = false;
  if (form.currency && offer) {
    const typed = form.manualRate.trim();
    const rate = typed === "" ? offer.rate : Number(typed);
    const sample = displayConversion(expected?.monthlyUsd ?? 0, form.currency, rate);
    if (sample.ok && sample.available && sample.converted !== null) {
      currency = sample.currency;
      rateUsed = rate;
      manual = typed !== "";
      for (const scenario of scenarios) {
        const converted = displayConversion(scenario.monthlyUsd, currency, rate);
        scenario.convertedMonthly = converted.ok && converted.available ? converted.converted : null;
      }
    }
  }

  const payout = payoutTimeline(expected?.monthlyUsd ?? 0, blank(form.threshold) ? youtubeConfig.payout.thresholdUsd : form.threshold);
  if (!payout.ok) return { ...empty, notice: payout.message };

  return {
    ready: true,
    notice: null,
    scenarios,
    steps: expectedSteps,
    shortsMessage,
    payoutMonths: payout.reachable ? payout.months : null,
    payoutUnreachable: !payout.reachable,
    currency,
    rateUsed,
    manualRate: manual,
  };
}

export function formatConverted(amount: number, currency: DisplayCurrency): string {
  return money(amount, currency);
}
