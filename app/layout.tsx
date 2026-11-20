import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ConsentSlot } from "@/components/ads/ConsentSlot";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, site } from "@/config/site";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

const otherVerification: Record<string, string> = {};
if (process.env.NEXT_PUBLIC_BING_VERIFICATION) {
  otherVerification["msvalidate.01"] = process.env.NEXT_PUBLIC_BING_VERIFICATION;
}
if (process.env.NEXT_PUBLIC_ADSENSE_CLIENT) {
  otherVerification["google-adsense-account"] = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Freelancer Fee Calculator | RealGigPay",
    template: "%s | RealGigPay",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: "RealGigPay Editorial", url: "/about" }],
  creator: "RealGigPay Editorial",
  category: "finance",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: "Freelancer Fee Calculator | RealGigPay",
    description: site.description,
    images: [
      {
        url: `${absoluteUrl("/og")}?path=%2F`,
        width: 1200,
        height: 630,
        alt: "Freelancer Fee Calculator — RealGigPay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelancer Fee Calculator | RealGigPay",
    description: site.description,
    images: [`${absoluteUrl("/og")}?path=%2F`],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
    other: Object.keys(otherVerification).length > 0 ? otherVerification : undefined,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/icon-192.png" sizes="192x192" />
      </head>
      <body className={`${geistSans.className} min-h-full bg-canvas text-ink`} suppressHydrationWarning>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Navbar />
        <main id="content">{children}</main>
        <Footer />
        <ConsentSlot />
      </body>
    </html>
  );
}
