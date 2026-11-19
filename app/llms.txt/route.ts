import { absoluteUrl, site } from "@/config/site";

export const dynamic = "force-static";

export function GET() {
  const body = `# ${site.name}

> ${site.description}

## Calculators

- [Main calculator](${absoluteUrl("/calculator")}): estimate a PKR deposit after a Fiverr or Upwork fee, a Payoneer assumption, USD to PKR conversion, and an illustrative tax line
- [Fiverr calculator](${absoluteUrl("/fiverr-fee-calculator")}): opens on the 20 percent platform assumption
- [Upwork calculator](${absoluteUrl("/upwork-fee-calculator")}): opens on the 10 percent platform assumption

## Guides

- [Guides](${absoluteUrl("/guides")}): fee, withdrawal, and conversion explainers
- [Tax guide](${absoluteUrl("/tax-guide")}): filer context. These pages are not an FBR assessment
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
