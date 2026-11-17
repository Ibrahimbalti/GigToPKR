import { getCachedUsdToPkrQuote } from "@/lib/exchange-rate";

export const revalidate = 1800;

export async function GET() {
  const quote = await getCachedUsdToPkrQuote();
  return Response.json(quote, {
    headers: {
      "Cache-Control": quote.rate
        ? "public, s-maxage=1800, stale-while-revalidate=86400"
        : "no-store",
    },
  });
}
