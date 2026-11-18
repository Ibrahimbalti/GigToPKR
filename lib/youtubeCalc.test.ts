import assert from "node:assert/strict";
import test from "node:test";
import { youtubeConfig } from "../data/youtube";
import {
  SHORTS_PAUSE_MESSAGE,
  audienceMix,
  checkYppEligibility,
  displayConversion,
  longFormEarnings,
  payoutTimeline,
  premiumAddOn,
  scenarios,
  shortsEarnings,
  usWithholding,
  viewsNeeded,
} from "./youtubeCalc";

test("RPM mode: 100,000 views at $3.00 RPM is $300.00", () => {
  const result = longFormEarnings({ mode: "rpm", views: 100_000, rpm: 3 });
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.revenueUsd, 300);
  assert.equal(result.effectiveRpm, 3);
});

test("CPM mode applies monetized playbacks and the 55% share", () => {
  const result = longFormEarnings({
    mode: "cpm",
    views: 100_000,
    monetizedPlaybackPercent: 50,
    cpm: 8,
    longFormSharePercent: youtubeConfig.revenueShare.longFormPercent,
  });
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.grossAdsUsd, 400);
  assert.equal(result.revenueUsd, 220);
  assert.equal(result.effectiveRpm, 2.2);
});

test("audience mix weights RPM and revenue by share", () => {
  const result = audienceMix(100_000, [
    { country: "US", sharePercent: 50, rpm: 4 },
    { country: "PK", sharePercent: 50, rpm: 0.8 },
  ]);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.weightedRpm, 2.4);
  assert.equal(result.totalRevenueUsd, 240);
  assert.equal(result.rows[0]?.revenueUsd, 200);
  assert.equal(result.rows[1]?.revenueUsd, 40);
});

test("US withholding reduces only the US portion of the same mix", () => {
  const mix = audienceMix(100_000, [
    { country: "US", sharePercent: 50, rpm: 4 },
    { country: "PK", sharePercent: 50, rpm: 0.8 },
  ]);
  assert.equal(mix.ok, true);
  if (!mix.ok) return;
  const result = usWithholding(mix.rows[0]?.revenueUsd, 30, mix.totalRevenueUsd);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.usRevenueUsd, 200);
  assert.equal(result.withheldUsd, 60);
  assert.equal(result.netUsd, 180);
});

test("Shorts revenue is paused after the effective date when the 90-day estimate is under 10 million", () => {
  const result = shortsEarnings({ monthlyViews: 2_000_000, shortsRpm: 0.05, today: "2027-02-01" });
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.estimatedViews90d, 6_000_000);
  assert.equal(result.revenueUsd, 0);
  assert.equal(result.paused, true);
  assert.equal(result.message, SHORTS_PAUSE_MESSAGE);
});

test("Shorts revenue still calculates before the pause rule takes effect", () => {
  const result = shortsEarnings({ monthlyViews: 2_000_000, shortsRpm: 0.05, today: "2026-11-19" });
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.paused, false);
  assert.equal(result.upcomingRule, true);
  assert.equal(result.revenueUsd, 100);
  assert.ok(result.message);
});

test("payout timeline is 3 months at $40 against a $100 threshold, and $0 is not reachable", () => {
  const reached = payoutTimeline(40, youtubeConfig.payout.thresholdUsd);
  assert.equal(reached.ok, true);
  if (!reached.ok) return;
  assert.equal(reached.reachable, true);
  if (reached.reachable) assert.equal(reached.months, 3);

  const stuck = payoutTimeline(0, 100);
  assert.equal(stuck.ok, true);
  if (!stuck.ok) return;
  assert.deepEqual(stuck, { ok: true, reachable: false, message: "not reachable" });
});

test("reverse calculator: $500 a month at $2.50 RPM needs 200,000 views", () => {
  const result = viewsNeeded(500, 2.5);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.views, 200_000);
});

test("negative numbers are rejected and zero is allowed", () => {
  const negative = longFormEarnings({ mode: "rpm", views: -1, rpm: 3 });
  assert.equal(negative.ok, false);
  const zero = longFormEarnings({ mode: "rpm", views: 0, rpm: 3 });
  assert.equal(zero.ok, true);
  if (zero.ok) assert.equal(zero.revenueUsd, 0);
  const premium = premiumAddOn(0, 0);
  assert.equal(premium.ok, true);
  if (premium.ok) assert.equal(premium.revenueUsd, 0);
});

test("audience shares that do not add up to 100% are flagged", () => {
  const result = audienceMix(100_000, [
    { country: "US", sharePercent: 40, rpm: 4 },
    { country: "PK", sharePercent: 40, rpm: 1 },
  ]);
  assert.equal(result.ok, false);
  if (!result.ok) assert.match(result.message, /100%/);
});

test("NaN and empty inputs are handled without throwing", () => {
  assert.doesNotThrow(() => {
    const missing = longFormEarnings({ mode: "rpm", views: "", rpm: Number.NaN });
    assert.equal(missing.ok, false);
    const blank = viewsNeeded("  ", 2.5);
    assert.equal(blank.ok, false);
    const badDate = shortsEarnings({ monthlyViews: 1000, shortsRpm: 0.1, today: "" });
    assert.equal(badDate.ok, false);
  });
});

test("money rounds half-up to 2 decimals", () => {
  const result = longFormEarnings({ mode: "rpm", views: 1000, rpm: 1.005 });
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.revenueUsd, 1.01);
});

test("scenarios return monthly and yearly totals for low, expected, and high RPM", () => {
  const result = scenarios({ mode: "rpm", views: 100_000, low: 1, expected: 3, high: 5 });
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.deepEqual(result.expected, { monthlyUsd: 300, yearlyUsd: 3600 });
  assert.equal(result.low.monthlyUsd, 100);
  assert.equal(result.high.yearlyUsd, 6000);
});

test("YPP checker reports current and 2027 thresholds", () => {
  const before = checkYppEligibility(
    { subscribers: 1000, watchHours12m: 4000, shortsViews90d: 10_000_000 },
    "2026-11-19",
  );
  assert.equal(before.ok, true);
  if (!before.ok) return;
  assert.equal(before.current.checks.every((check) => check.pass), true);
  assert.equal(before.from2027.appliesNow, false);
  assert.equal(before.from2027.checks[1]?.pass, false);
  assert.equal(before.from2027.effectiveFrom, "2027-02-01");
  assert.match(before.activityRule, /1 February 2027/);

  const after = checkYppEligibility(
    { subscribers: 1000, watchHours12m: 8000, shortsViews90d: 20_000_000 },
    "2027-02-01",
  );
  assert.equal(after.ok, true);
  if (!after.ok) return;
  assert.equal(after.from2027.appliesNow, true);
  assert.equal(after.from2027.checks.every((check) => check.pass), true);
});

test("display conversion of USD 240 at 280 is 67,200 and does not change the USD result", () => {
  const usd = 240;
  const result = displayConversion(usd, "PKR", 280);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.usd, 240);
  assert.equal(result.converted, 67200);
  assert.equal(usd, 240);
});

test("display conversion rejects currencies outside PKR, EUR, GBP, and AED", () => {
  const result = displayConversion(240, "INR", 80);
  assert.equal(result.ok, false);
});

test("a missing or failed rate hides conversion, leaves USD unchanged, and does not throw", () => {
  const usd = 240;
  assert.doesNotThrow(() => {
    for (const rate of [null, undefined, Number.NaN, 0]) {
      const result = displayConversion(usd, "EUR", rate);
      assert.equal(result.ok, true);
      if (!result.ok) return;
      assert.equal(result.available, false);
      assert.equal(result.converted, null);
      assert.equal(result.usd, 240);
    }
  });
  assert.equal(usd, 240);
});
