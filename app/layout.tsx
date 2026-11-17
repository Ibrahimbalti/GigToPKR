import type { Metadata } from "next";
import { Geist } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Freelancer Fee Calculator Pakistan | GigToPKR",
    template: "%s | GigToPKR",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: "GigToPKR Editorial", url: "/about" }],
  creator: "GigToPKR Editorial",
  category: "finance",
  robots: { index: true, follow: true },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION }
      : undefined,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" type="image/x-icon" />
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
      </body>
    </html>
  );
}
