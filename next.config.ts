import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.realgigpay.com" }],
        destination: "https://realgigpay.com/:path*",
        permanent: true,
      },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/home-static.html", destination: "/", permanent: true },
      { source: "/static-home", destination: "/", permanent: true },
      { source: "/og", destination: "/og-image.jpg", permanent: false },
      { source: "/calculator", destination: "/fiverr-fee-calculator", permanent: true },
      { source: "/creators", destination: "/creators/youtube-earnings-calculator", permanent: true },
      { source: "/youtube-earnings-calculator", destination: "/creators/youtube-earnings-calculator", permanent: true },
      { source: "/fiverr-fee-calculator-pakistan", destination: "/fiverr-fee-calculator", permanent: true },
      { source: "/upwork-fee-calculator-pakistan", destination: "/upwork-fee-calculator", permanent: true },
      { source: "/payoneer-fee-calculator-pakistan", destination: "/payoneer-fee-calculator", permanent: true },
      { source: "/freelancer-tax-calculator-pakistan", destination: "/freelancer-tax-calculator", permanent: true },
      { source: "/usd-to-pkr-calculator", destination: "/payoneer-fee-calculator", permanent: true },
      { source: "/guides/fiverr-fees-pakistan", destination: "/guides/fiverr-fees", permanent: true },
      { source: "/guides/fiverr-withdrawal-pakistan", destination: "/guides/fiverr-withdrawal", permanent: true },
      { source: "/guides/fiverr-payment-methods-pakistan", destination: "/guides/fiverr-payment-methods", permanent: true },
      { source: "/guides/upwork-fees-pakistan", destination: "/guides/upwork-fees", permanent: true },
      { source: "/guides/upwork-withdrawal-pakistan", destination: "/guides/upwork-withdrawal", permanent: true },
      { source: "/guides/upwork-payment-methods-pakistan", destination: "/guides/upwork-payment-methods", permanent: true },
      { source: "/guides/payoneer-fees-pakistan", destination: "/guides/payoneer-fees", permanent: true },
      { source: "/guides/usd-to-pkr-conversion-guide", destination: "/guides/currency-conversion-guide", permanent: true },
      { source: "/tax-guide/pakistan-freelancer-tax", destination: "/tax-guide/freelancer-tax", permanent: true },
      { source: "/tax-guide/fbr-active-filer-vs-non-filer", destination: "/tax-guide/tax-filing-status", permanent: true },
      { source: "/tax-guide/pakistan-it-export-tax", destination: "/tax-guide/it-export-tax", permanent: true },
      { source: "/blog/fiverr-vs-upwork-for-pakistani-freelancers", destination: "/blog/fiverr-vs-upwork-for-freelancers", permanent: true },
      { source: "/blog/how-to-receive-international-payments-in-pakistan", destination: "/blog/how-to-receive-international-payments", permanent: true },
      { source: "/blog/freelancer-income-planning-pakistan", destination: "/blog/freelancer-income-planning", permanent: true },
      { source: "/blog/how-to-withdraw-from-fiverr-to-a-pakistani-bank", destination: "/blog/how-to-withdraw-from-fiverr-to-a-bank", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;