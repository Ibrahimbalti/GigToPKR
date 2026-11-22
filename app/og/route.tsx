import { ImageResponse } from "next/og";
import { site } from "@/config/site";
import { getArticle } from "@/content/registry";
import { getTool } from "@/content/tools";

const size = { width: 1200, height: 630 };

const staticPageMeta: Record<string, { eyebrow: string; title: string; subtitle: string }> = {
  "/": {
    eyebrow: "Freelancer Fee Calculator",
    title: "Know what you keep after fees",
    subtitle: "Estimate Fiverr, Upwork, and YouTube earnings after platform and withdrawal fees.",
  },
  "/creators/youtube-earnings-calculator": {
    eyebrow: "Creator Estimate",
    title: "YouTube Earnings Calculator",
    subtitle: "Estimate YouTube revenue from your RPM or CPM across low, expected, and high ranges.",
  },
  "/wise-fee-calculator": {
    eyebrow: "Transfer Estimate",
    title: "Wise Fee Calculator",
    subtitle: "Estimate Wise transfer fees and recipient amount in PKR, INR, and other currencies.",
  },
  "/guides": {
    eyebrow: "Platform & Payout Guides",
    title: "Freelance Fee & Withdrawal Guides",
    subtitle: "Step-by-step explainers for Fiverr, Upwork, Payoneer, and currency conversion.",
  },
  "/tax-guide": {
    eyebrow: "Tax Planning",
    title: "Freelancer Tax Planning Guide",
    subtitle: "Understand tax filing status, exported services, and bookkeeping records.",
  },
  "/blog": {
    eyebrow: "Editorial",
    title: "RealGigPay Freelance Income Blog",
    subtitle: "Practical comparisons and monthly income planning for cross-border freelancers.",
  },
  "/about": {
    eyebrow: "About RealGigPay",
    title: "Transparent Freelance Fee Assumptions",
    subtitle: "How RealGigPay models platform fees, withdrawal charges, and currency conversion.",
  },
  "/contact": {
    eyebrow: "Editorial Desk",
    title: "Contact RealGigPay",
    subtitle: "Send a calculation question, report a fee update, or request a correction.",
  },
  "/privacy-policy": {
    eyebrow: "Privacy",
    title: "RealGigPay Privacy Policy",
    subtitle: "Order amounts stay in your browser. Learn how analytics and cookie consent work.",
  },
  "/terms-and-conditions": {
    eyebrow: "Terms",
    title: "Terms and Conditions",
    subtitle: "Terms of use, calculator assumptions, and liability limits for RealGigPay.",
  },
  "/disclaimer": {
    eyebrow: "Disclaimer",
    title: "Financial & Tax Estimate Disclaimer",
    subtitle: "Every result is an assumption-based planning estimate, not a bank quote or tax advice.",
  },
  "/editorial-policy": {
    eyebrow: "Editorial Standards",
    title: "RealGigPay Editorial Policy",
    subtitle: "How primary sources, fee ranges, and review dates are verified across every guide.",
  },
};

function resolveOgContent(path: string, fallbackTitle?: string | null, fallbackSubtitle?: string | null) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  if (staticPageMeta[cleanPath]) {
    return staticPageMeta[cleanPath];
  }

  const tool = getTool(cleanPath);
  if (tool) {
    return {
      eyebrow: tool.eyebrow || "Calculator",
      title: tool.title,
      subtitle: tool.description,
    };
  }

  const article = getArticle(cleanPath);
  if (article) {
    const eyebrow =
      article.kind === "blog" ? "Article" : article.kind === "tax" ? "Tax Guide" : "Guide";
    return {
      eyebrow,
      title: article.title,
      subtitle: article.description,
    };
  }

  return {
    eyebrow: site.name,
    title: fallbackTitle || "Freelancer Fee Calculator",
    subtitle: fallbackSubtitle || site.description,
  };
}

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") || "/";
  const customTitle = searchParams.get("title");
  const customSubtitle = searchParams.get("subtitle");
  const { eyebrow, title, subtitle } = resolveOgContent(path, customTitle, customSubtitle);
  const displayPath = path === "/" ? "realgigpay.com" : `realgigpay.com${path}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0B132B 0%, #1C2541 60%, #1E3A8A 100%)",
          color: "#F8FAFC",
          padding: "56px 64px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 30,
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 9999,
                background: "#38BDF8",
              }}
            />
            RealGigPay
          </div>
          <div
            style={{
              display: "flex",
              padding: "8px 18px",
              borderRadius: 9999,
              background: "rgba(56, 189, 248, 0.16)",
              border: "1px solid rgba(56, 189, 248, 0.35)",
              color: "#7DD3FC",
              fontSize: 20,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 1.5,
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            maxWidth: 1020,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: title.length > 48 ? 52 : 60,
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: -1.2,
              color: "#FFFFFF",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              lineHeight: 1.4,
              color: "#CBD5E1",
              maxWidth: 960,
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.14)",
            paddingTop: 22,
            fontSize: 22,
            color: "#94A3B8",
          }}
        >
          <div style={{ display: "flex", color: "#E2E8F0", fontWeight: 600 }}>{displayPath}</div>
          <div style={{ display: "flex" }}>Transparent fee & payout estimates</div>
        </div>
      </div>
    ),
    {
      ...size,
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
