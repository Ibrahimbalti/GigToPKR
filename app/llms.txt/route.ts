import { absoluteUrl, site } from "@/config/site";

export const dynamic = "force-static";

export function GET() {
  const body = `# ${site.name}

> ${site.description}

## Calculators

- [Fiverr calculator](${absoluteUrl("/fiverr-fee-calculator")}): opens on the 20 percent platform assumption
- [Upwork calculator](${absoluteUrl("/upwork-fee-calculator")}): opens on the 10 percent platform assumption

## Guides

- [Guides](${absoluteUrl("/guides")}): fee, withdrawal, and conversion explainers
- [Tax guide](${absoluteUrl("/tax-guide")}): general tax-planning questions and record keeping. These pages are not tax advice
- [Blog](${absoluteUrl("/blog")}): published articles only

## Company

- [About](${absoluteUrl("/about")}): what RealGigPay is and is not
- [Contact](${absoluteUrl("/contact")}): corrections and calculation questions
- [Disclaimer](${absoluteUrl("/disclaimer")}): estimates are not financial, tax, or legal advice
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
