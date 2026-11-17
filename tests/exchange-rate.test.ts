import assert from "node:assert/strict";
import test from "node:test";
import { getUsdToPkrQuote, readFrankfurterPkr, readOpenErApiPkr } from "../lib/exchange-rate";

test("Frankfurter payload without PKR is not a rate", () => {
  assert.equal(readFrankfurterPkr({ rates: { EUR: 0.9 } }), null);
  assert.equal(readFrankfurterPkr({ rates: { PKR: 0 } }), null);
  assert.equal(readFrankfurterPkr(null), null);
});

test("a real Frankfurter PKR field would be accepted", () => {
  assert.equal(readFrankfurterPkr({ rates: { PKR: 278.125 } }), 278.125);
});

test("ExchangeRate-API PKR is read only from a successful payload", () => {
  assert.equal(readOpenErApiPkr({ result: "error" }), null);
  assert.deepEqual(
    readOpenErApiPkr({
      result: "success",
      rates: { PKR: 276.5 },
      time_last_update_utc: "Mon, 16 Nov 2026 00:02:31 +0000",
    }),
    { rate: 276.5, updatedAt: "Mon, 16 Nov 2026 00:02:31 +0000" },
  );
});

test("API failure does not invent a rate", async () => {
  const fetchImpl: typeof fetch = async () => {
    throw new Error("offline");
  };
  const quote = await getUsdToPkrQuote(fetchImpl);
  assert.equal(quote.rate, null);
  assert.equal(quote.frankfurterSupportsPkr, false);
  assert.match(quote.error ?? "", /will not fill in a guessed rate/i);
});

test("unsupported Frankfurter response falls through without pretending it was Frankfurter", async () => {
  const fetchImpl: typeof fetch = async (input) => {
    const url = String(input);
    if (url.includes("frankfurter")) {
      return new Response(JSON.stringify({ message: "not found" }), { status: 404 });
    }
    return new Response(
      JSON.stringify({
        result: "success",
        rates: { PKR: 281.25 },
        time_last_update_utc: "Mon, 16 Nov 2026 00:02:31 +0000",
      }),
      { status: 200 },
    );
  };
  const quote = await getUsdToPkrQuote(fetchImpl);
  assert.equal(quote.rate, 281.25);
  assert.equal(quote.origin, "exchangerate-api");
  assert.equal(quote.frankfurterSupportsPkr, false);
  assert.match(quote.warning ?? "", /does not invent a Frankfurter/i);
});
