import { getCachedUsdToPkrQuote } from "@/lib/exchange-rate";

export const revalidate = 21600;

export async function GET() {
  const quote = await getCachedUsdToPkrQuote();
  return Response.json(quote, {
    headers: {
      "Cache-Control": quote.rate
        ? "public, s-maxage=21600, stale-while-revalidate=86400"
        : "no-store",
    },
  });
}
