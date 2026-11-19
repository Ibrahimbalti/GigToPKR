# RealGigPay

Freelancer Fee Calculator. A Next.js site that estimates a payout from a freelance order after platform and withdrawal assumptions.

The estimate uses visible assumptions:

- Fiverr platform fee: 20%, based on Fiverr's published 80% freelancer share.
- Upwork platform fee: 10%, a midpoint inside Upwork's published 0% to 15% contract range. It is not a contract-specific rate.
- Payoneer-style withdrawal: 2% of the amount left after the platform fee. Payoneer's public bank-withdrawal range is about 1.2% to 4%, and the fee on the confirmation screen wins.
- Tax: 1% for the active-filer illustration and 2% for the non-filer illustration. These are not statutory tax rates.
- Exchange rate: Frankfurter is requested first. It does not publish PKR, so the site does not invent a Frankfurter rate. A labeled ExchangeRate-API reference is used when that feed returns PKR. Otherwise the visitor types a rate.

## Requirements

- Node.js 20.9 or newer
- npm

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

On Windows PowerShell, copy the example with `Copy-Item .env.example .env.local`.

Open http://localhost:3000.

## Scripts

- `npm run dev` starts the app.
- `npm run test` runs calculator, exchange-rate, and content checks.
- `npm run typecheck` runs TypeScript.
- `npm run lint` runs ESLint.
- `npm run build` creates the production build.

## Calculation order

1. Gross USD order.
2. Platform fee, rounded half-up to the cent.
3. Payoneer assumption on the remainder, rounded half-up to the cent.
4. Convert net USD at the rate in the form. PKR is rounded half-up to two decimals.
5. Illustrative tax on that PKR amount.
6. Final deposit is converted PKR minus illustrative tax.

Worked examples in articles use 280 PKR per USD and say so. That number is not a live rate.

## Exchange rates

`lib/exchange-rate.ts` calls `https://api.frankfurter.app/latest?from=USD&to=PKR`. PKR is outside the European Central Bank set Frankfurter publishes. On 17 November 2026 that request did not return a PKR rate.

The fallback is `https://open.er-api.com/v6/latest/USD`, labeled ExchangeRate-API open access. It is not Payoneer or a central-bank rate. If both requests fail, the field stays empty.

`/api/exchange-rate` keeps a successful quote for 30 minutes in the server instance and a failed lookup for one minute.

## Contact form

The form validates with Zod and posts to `/api/contact`. Delivery happens only when `CONTACT_WEBHOOK_URL` is set. Until then the API returns HTTP 503 and does not store the message. Do not describe the form as a working inbox before that variable points at a service you control.

## Ads and analytics

Ad slots render only when `NEXT_PUBLIC_ADSENSE_CLIENT` is set, or when `NEXT_PUBLIC_ADS_PREVIEW=true`. They are labeled Advertisement and reserve height. Analytics and AdSense scripts load only after the visitor presses Allow. Declining stores that choice and loads neither script.

Events prepared for GA4, once allowed: calculator started, calculation completed, platform selected, result copied, PDF downloaded, and navbar CTA clicked.

## SEO setup checklist

These steps are not done by installing the repository. Completing them is a separate production task.

- Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS origin with no trailing slash.
- Trailing-slash policy: Next.js default, no trailing slash. `/calculator/` redirects to `/calculator`.
- Deploy on Netlify (settings live in `netlify.toml`) and confirm the production domain serves HTTPS.
- Add the Google Search Console and Bing Webmaster verification tokens to the environment, redeploy, then finish verification in those tools.
- Submit `https://YOUR_DOMAIN/sitemap.xml` in both tools.
- Inspect the calculator, one guide, and one tax page. Do not claim they are indexed until the tools say so.
- Review titles, descriptions, and canonicals with `npm run test`.
- Measure Core Web Vitals in PageSpeed Insights after deployment. The 90-plus Lighthouse targets are targets, not a result this repository can promise.
- IndexNow is not wired. Add it only with a real key file after the site is on its production host.

## Ethical mentions

Useful off-site distribution is a guest explanation, a correction to a public fee table, or a freelancing-community answer that links to a specific guide. Skip paid link networks, fake reviews, and automated forum posts.

Separate URL pages for "$100 on Fiverr", "$500 on Fiverr", and similar amounts are not generated. Those examples are calculated inside the relevant guides so they do not become near-duplicate pages.

## Project map

- `lib/calculator.ts` holds the formula.
- `lib/exchange-rate.ts` holds rate parsing and fetching.
- `content/` holds guides, tax pages, four published articles, and the unpublished editorial calendar.
- `app/sitemap.ts` and `app/robots.ts` generate the crawl files.
- `components/ads/AdSlot.tsx` is the reserved placement.

## Deployment

Connect the repository to Vercel, set the environment variables from `.env.example`, and deploy. The contact webhook and ad slots can stay empty for a first release. Set the site URL before submitting the sitemap.
