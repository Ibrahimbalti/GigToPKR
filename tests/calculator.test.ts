import assert from "node:assert/strict";
import test from "node:test";
import { calculateEarnings, projectMonthly, requiredOrderAmount } from "../lib/calculator";

function run(orderAmountUsd: number, platform: "fiverr" | "upwork", taxStatus: "filer" | "nonFiler", usdToPkrRate = 280) {
  return calculateEarnings({ orderAmountUsd, platform, taxStatus, usdToPkrRate });
}

test("$100 Fiverr active-filer example", () => {
  const result = run(100, "fiverr", "filer");
  assert.equal(result.grossUsd, 100);
  assert.equal(result.platformFeeUsd, 20);
  assert.equal(result.afterPlatformUsd, 80);
  assert.equal(result.payoneerFeeUsd, 1.6);
  assert.equal(result.netUsd, 78.4);
  assert.equal(result.convertedPkr, 21952);
  assert.equal(result.taxPkr, 219.52);
  assert.equal(result.finalPkr, 21732.48);
});

test("$500 and $1,000 Fiverr orders", () => {
  const fiveHundred = run(500, "fiverr", "filer");
  assert.equal(fiveHundred.platformFeeUsd, 100);
  assert.equal(fiveHundred.netUsd, 392);
  assert.equal(fiveHundred.finalPkr, 108662.4);

  const thousand = run(1000, "fiverr", "filer");
  assert.equal(thousand.platformFeeUsd, 200);
  assert.equal(thousand.payoneerFeeUsd, 16);
  assert.equal(thousand.netUsd, 784);
  assert.equal(thousand.finalPkr, 217324.8);
});

test("$100 and $500 Upwork orders use the 10% assumption", () => {
  const hundred = run(100, "upwork", "filer");
  assert.equal(hundred.platformFeeUsd, 10);
  assert.equal(hundred.afterPlatformUsd, 90);
  assert.equal(hundred.payoneerFeeUsd, 1.8);
  assert.equal(hundred.netUsd, 88.2);
  assert.equal(hundred.finalPkr, 24449.04);

  const fiveHundred = run(500, "upwork", "filer");
  assert.equal(fiveHundred.platformFeeUsd, 50);
  assert.equal(fiveHundred.netUsd, 441);
  assert.equal(fiveHundred.finalPkr, 122245.2);
});

test("non-filer illustration is 2% of converted PKR", () => {
  const result = run(100, "fiverr", "nonFiler");
  assert.equal(result.taxRate, 0.02);
  assert.equal(result.taxPkr, 439.04);
  assert.equal(result.finalPkr, 21512.96);
});

test("zero amount stays zero", () => {
  const result = run(0, "fiverr", "filer");
  assert.equal(result.finalPkr, 0);
  assert.equal(result.platformFeeUsd, 0);
});

test("decimal platform fee rounds half-up to the cent", () => {
  const result = run(10.03, "fiverr", "filer", 280);
  assert.equal(result.platformFeeUsd, 2.01);
  assert.equal(result.afterPlatformUsd, 8.02);
  assert.equal(result.payoneerFeeUsd, 0.16);
  assert.equal(result.netUsd, 7.86);
});

test("negative amounts and non-positive rates are rejected", () => {
  assert.throws(() => run(-1, "fiverr", "filer"));
  assert.throws(() => run(100, "upwork", "filer", 0));
});

test("custom withdrawal and tax percentages replace the defaults", () => {
  const result = calculateEarnings({
    orderAmountUsd: 100,
    platform: "fiverr",
    taxStatus: "filer",
    usdToPkrRate: 280,
    withdrawalFeeRate: 0.04,
    taxRate: 0,
  });
  assert.equal(result.payoneerFeeUsd, 3.2);
  assert.equal(result.netUsd, 76.8);
  assert.equal(result.taxPkr, 0);
  assert.equal(result.finalPkr, 21504);
});

test("a flat 0.99 fee is added after the percentage withdrawal", () => {
  const result = calculateEarnings({
    orderAmountUsd: 100,
    platform: "upwork",
    taxStatus: "filer",
    usdToPkrRate: 280,
    withdrawalFeeRate: 0,
    flatFeeUsd: 0.99,
    withdrawalMethod: "directBank",
    taxRate: 0,
  });
  assert.equal(result.platformFeeUsd, 10);
  assert.equal(result.flatFeeInOrderCurrency, 0.99);
  assert.equal(result.netUsd, 89.01);
  assert.equal(result.finalPkr, 24922.8);
});

test("reverse quote finds the order that reaches a PKR target", () => {
  const forward = calculateEarnings({
    orderAmountUsd: 100,
    platform: "fiverr",
    taxStatus: "filer",
    usdToPkrRate: 280,
  });
  const required = requiredOrderAmount({
    platform: "fiverr",
    taxStatus: "filer",
    usdToPkrRate: 280,
    targetPkr: forward.finalPkr,
  });
  assert.equal(required, 100);
});

test("monthly projection multiplies the final deposit", () => {
  const result = run(100, "fiverr", "filer");
  assert.equal(projectMonthly(result, 4), 86929.92);
  assert.throws(() => projectMonthly(result, 1.5));
});
