import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      { source: "/calculator", destination: "/fiverr-fee-calculator", permanent: true },
      { source: "/youtube-earnings-calculator", destination: "/creators/youtube-earnings-calculator", permanent: true },
      { source: "/fiverr-fee-calculator-pakistan", destination: "/fiverr-fee-calculator", permanent: true },
      { source: "/upwork-fee-calculator-pakistan", destination: "/upwork-fee-calculator", permanent: true },
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