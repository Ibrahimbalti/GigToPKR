import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ConsentSlot } from "@/components/ads/ConsentSlot";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/config/site";
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
    default: "Fiverr & Upwork Fee Calculator — Take-Home Pay | RealGigPay",
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
    title: "Fiverr & Upwork Fee Calculator — Take-Home Pay | RealGigPay",
    description: site.description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RealGigPay — Know What You Keep After Fees",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: site.social.xHandle,
    creator: site.social.xHandle,
    title: "Fiverr & Upwork Fee Calculator — Take-Home Pay | RealGigPay",
    description: site.description,
    images: ["/og-image.jpg"],
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
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-LT24F7PE93"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} window.gtag = gtag; gtag('js', new Date()); gtag('config', 'G-LT24F7PE93', { anonymize_ip: true });",
          }}
        />
        <link rel="icon" href="/favicon.ico" sizes="32x32" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/icon-192.png" sizes="192x192" />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </head>
      <body className={`${geistSans.className} min-h-full bg-canvas text-ink`} suppressHydrationWarning>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="content">{children}</main>
        <Footer />
        <ConsentSlot />
      </body>
    </html>
  );
}
