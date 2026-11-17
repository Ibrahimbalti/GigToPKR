import { analyticsId } from "@/lib/analytics";

export async function ConsentSlot() {
  if (!analyticsId() && !process.env.NEXT_PUBLIC_ADSENSE_CLIENT) return null;
  const { ConsentAndAnalytics } = await import("@/components/ads/ConsentAndAnalytics");
  return <ConsentAndAnalytics />;
}
