import { sourceLinks } from "@/content/sources";
import type { Article } from "@/types/content";

const published = "2026-11-17";

function tax(
  entry: Omit<Article, "kind" | "publishedAt" | "updatedAt" | "path"> & { slug: string },
): Article {
  return {
    ...entry,
    kind: "tax",
    path: `/tax-guide/${entry.slug}`,
    publishedAt: published,
    updatedAt: published,
  };
}

export const taxGuides: Article[] = [
  tax({
    slug: "freelancer-tax",
    title: "Freelancer Tax Guide",
    description:
      "A practical map of tax questions for freelancers receiving income from clients or platforms in other countries.",
    h1: "How should freelancers plan for tax on cross-border income?",
    excerpt:
      "Filing status and records matter. A calculator percentage is not an assessment.",
    directAnswer:
      "Cross-border freelance income may be taxable where you live, where your business is registered, or in both places. The treatment depends on current local law, your filing status, business structure, and any rules for exported services. RealGigPay does not determine your tax treatment. Its 1% and 2% options are illustrations only. Use guidance from your official tax authority or a qualified local adviser, not this estimate.",
    sections: [
      {
        id: "what-it-is",
        heading: "What this guide will and will not tell you",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "It will help you identify records and questions to ask. It will not quote a statutory percentage as if it applied everywhere. Rates, withholding rules, and special treatment for exported services vary by jurisdiction and change over time. Check current law with your official tax authority or a qualified adviser.",
          },
          {
            type: "ul",
            items: [
              "What registration or filing status applies to you?",
              "How does your jurisdiction classify the service you provide?",
              "Do any local rules require business or professional registration?",
              "Did a bank or payment provider withhold tax on the credit?",
              "Which tax year does the receipt fall in?",
            ],
          },
        ],
      },
      {
        id: "calculator",
        heading: "How the calculator's tax line is produced",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "The calculator applies its illustrative percentage after platform fees, the withdrawal assumption, and currency conversion. The 1% and 2% options are comparison inputs, not tax brackets or filing statuses. Changing a calculator option does not change your legal status or determine your tax bill.",
          },
          {
            type: "example",
            title: "The same $100 Fiverr assumption at the two illustrations",
            orderAmountUsd: 100,
            platform: "fiverr",
            taxStatus: "filer",
          },
          {
            type: "note",
            text: "Run the calculator with each illustration to compare the arithmetic. The difference is not a penalty or an estimate of what a tax authority would assess.",
          },
        ],
      },
      {
        id: "next",
        heading: "A sensible next step",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "Confirm your registration status with the relevant authority, keep the payout records described in the record-keeping guide, and ask a tax practitioner how current rules apply to your facts. If you export services, verify any special requirements with the official guidance for your jurisdiction.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Is the tax calculation exact?",
        answer:
          "No. It is an illustration. It ignores slabs, credits, withholding already suffered, provincial sales tax, and any special export regime.",
      },
      {
        question: "Does the calculator store my income?",
        answer:
          "No account is required, and order amounts are not saved on a RealGigPay server. They stay in the browser while the page is open.",
      },
    ],
    sources: [],
    related: [
      { href: "/freelancer-tax-calculator", label: "Illustrative tax calculator" },
      { href: "/tax-guide/tax-filing-status", label: "Tax filing status" },
      { href: "/tax-guide/it-export-tax", label: "IT export tax context" },
    ],
  }),
  tax({
    slug: "tax-filing-status",
    title: "Freelancer Tax Filing Status",
    description:
      "How filing and registration status can affect tax treatment, and why the calculator's percentages are examples only.",
    h1: "How can filing status affect freelancer taxes?",
    excerpt:
      "Filing categories differ by jurisdiction. The calculator's percentages are separate, clearly labeled examples.",
    directAnswer:
      "Tax authorities use different registration and filing categories, and the consequences depend on local law. Banks or payment providers may also apply withholding rules. The calculator's percentage options are assumptions for a side-by-side arithmetic example, not a description of your legal status.",
    sections: [
      {
        id: "filing-status",
        heading: "Check your filing status",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "Use your official tax authority's records to confirm your registration and filing status. Do not assume a prior-year return is enough; a record may be missing or incomplete. A calculator dropdown cannot confirm or change your status.",
          },
        ],
      },
      {
        id: "why-two-rates",
        heading: "Why the dropdown still has two rates",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "A filing status can affect obligations in some jurisdictions, but no single percentage applies to everyone. The calculator's labeled examples show arithmetic only. If a bank or provider has already withheld tax, record it and reconcile it with your return rather than counting the illustrative amount again.",
          },
          {
            type: "example",
            title: "2% tax illustration on a $500 Upwork assumption",
            orderAmountUsd: 500,
            platform: "upwork",
            taxStatus: "nonFiler",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Does being registered mean my tax rate is 1%?",
        answer:
          "No. Registration status and the tax due are different questions. Your liability depends on current rules and your circumstances.",
      },
      {
        question: "Can this page confirm my tax status?",
        answer:
          "No. Check your status with the official tax authority for your jurisdiction.",
      },
    ],
    sources: [],
    related: [
      { href: "/freelancer-tax-calculator", label: "Compare the two illustrations" },
      { href: "/tax-guide/freelancer-tax", label: "Freelancer tax overview" },
      { href: "/disclaimer", label: "Financial and tax disclaimer" },
    ],
  }),
  tax({
    slug: "it-export-tax",
    title: "Tax on Exported Services",
    description:
      "Questions to ask about tax treatment for exported services, without assuming a universal rate.",
    h1: "How can exported services affect tax treatment?",
    excerpt:
      "Some jurisdictions have special rules for exported services. Verify the current rules before relying on a percentage.",
    directAnswer:
      "Tax treatment for exported services varies by jurisdiction and can depend on service type, business structure, registration, and how payment is received. Rules change over time. RealGigPay will not state a universal statutory rate; check your official tax authority's current rules and any registration requirements that apply to you.",
    sections: [
      {
        id: "questions",
        heading: "Questions that decide the treatment",
        level: 2,
        blocks: [
          {
            type: "ol",
            items: [
              "Does current local law give exported-services income a special or reduced treatment?",
              "Which services are inside the definition: software, support, design, or a narrower list?",
              "Is registration with a named body a condition, and are you actually registered?",
              "Does the foreign-exchange receipt have to arrive through a specified banking channel?",
              "Does the provision cover marketplaces such as Fiverr and Upwork in the same way as a direct client?",
              "What evidence must be kept if the return is later asked for?",
            ],
          },
        ],
      },
      {
        id: "not-a-rate",
        heading: "Why the calculator does not encode an IT export rate",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "A hardcoded export-services percentage could become outdated and may not fit your circumstances. The calculator's tax line is only arithmetic. If a qualified adviser gives you an applicable rate, the calculator still cannot confirm the legal analysis behind it.",
          },
        ],
      },
      {
        id: "sales-tax",
        heading: "Income tax is not the only levy people mention",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "Local sales taxes, value-added taxes, and income taxes are separate obligations. This calculator does not model them. Any tax or fee that applies to your invoice or payment will not appear unless you include it yourself.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Does a business registration by itself set the tax rate?",
        answer:
          "Not by itself. Registration matters only if the current provision says it does, and only if the rest of the conditions are met. Read the provision or ask an adviser.",
      },
    ],
    sources: [],
    related: [
      { href: "/tax-guide/freelancer-tax", label: "Freelancer tax overview" },
      { href: "/tax-guide/freelancer-tax-record-keeping", label: "Freelancer tax records" },
      { href: "/freelancer-tax-calculator", label: "Illustrative calculator" },
    ],
  }),
  tax({
    slug: "freelancer-tax-record-keeping",
    title: "Freelancer Tax Record Checklist",
    description:
      "A record set for freelancers: platform statements, payout confirmations, bank credits, and the rate actually received.",
    h1: "What income records should freelancers keep?",
    excerpt:
      "Keep the document that created each number. A calculator screenshot is not a substitute for the payout receipt.",
    directAnswer:
      "Keep the platform earnings statement, the payout-provider confirmation, and the bank credit for each receipt. Add the implied exchange rate, the fee, and the tax year. Keep expense invoices you may claim. A RealGigPay PDF is a working paper from assumptions. It does not replace those source documents, and this site does not store it for you.",
    sections: [
      {
        id: "checklist",
        heading: "A practical checklist",
        level: 2,
        blocks: [
          {
            type: "ul",
            items: [
              "Annual or monthly earnings export from Fiverr or Upwork.",
              "Contract fee percentage, saved from the offer, for Upwork.",
              "Payoneer or bank withdrawal confirmation, including fee and rate.",
              "Bank statement line showing the destination-currency credit and date.",
              "Implied rate: amount received divided by amount sent.",
              "Withholding evidence, if a bank deducted tax.",
              "Expense invoices: software, Connects, equipment, and professional fees.",
              "A note of which tax year you will report the receipt in.",
            ],
          },
        ],
      },
      {
        id: "working-papers",
        heading: "Separate estimates from evidence",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "Download the calculator PDF if you want a breakdown for your own planning. File it with your working papers, not as a substitute for official tax records. If its numbers differ from your payment-provider statement, the statement records the actual transaction. The currency-conversion guide shows how to compute the implied rate.",
          },
        ],
      },
      {
        id: "retention",
        heading: "How long to keep them",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "Retention periods are a legal question. Keep records for at least as long as your tax adviser or the current ordinance requires, and longer if a return is still open. This page will not invent a number of years. Scanning the PDFs and keeping a second copy offline is a practical protection against a lost Payoneer login.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Does RealGigPay keep a copy of my calculation?",
        answer:
          "No. The PDF is generated in your browser. If you need it later, download it and store it yourself.",
      },
      {
        question: "What if the bank credit differs slightly from my estimate?",
        answer:
          "Record the bank credit. A small gap is often rounding or a correspondent charge. The statement is the amount you received.",
      },
    ],
    sources: [sourceLinks.payoneerPricing],
    related: [
      { href: "/guides/freelancer-currency-conversion", label: "Record the implied rate" },
      { href: "/tax-guide/freelancer-tax", label: "Tax overview" },
      { href: "/calculator", label: "Create a working-paper estimate" },
    ],
  }),
];
