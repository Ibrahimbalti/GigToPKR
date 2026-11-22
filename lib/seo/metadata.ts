import type { Metadata } from "next";
import { absoluteUrl, openGraphLocale, site } from "@/config/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
  locale?: "en_US" | "en_PK";
};

export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex = false,
  locale,
}: PageMeta): Metadata {
  const url = absoluteUrl(path);
  const pageLocale = locale ?? openGraphLocale(path);
  const verification: Metadata["verification"] = {};
  if (process.env.NEXT_PUBLIC_GSC_VERIFICATION) {
    verification.google = process.env.NEXT_PUBLIC_GSC_VERIFICATION;
  }
  if (process.env.NEXT_PUBLIC_BING_VERIFICATION) {
    verification.other = { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION };
  }

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: pageLocale,
      type,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "RealGigPay — Know What You Keep After Fees",
        },
      ],
      ...(type === "article"
        ? { publishedTime, modifiedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: site.social.xHandle,
      creator: site.social.xHandle,
      title,
      description,
      images: ["/og-image.jpg"],
    },
    verification: Object.keys(verification).length ? verification : undefined,
  };
}
