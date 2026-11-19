import { sourceLinks } from "@/content/sources";
import type { ToolPage } from "@/types/content";

const updatedAt = "2026-11-17";

export const toolPages: ToolPage[] = [
  {
    path: "/calculator",
    title: "Freelance Earnings Calculator",
    description:
      "Calculate an estimated PKR bank deposit from a USD freelance order, with every fee labeled as an assumption.",
    h1: "Freelance earnings calculator",
    eyebrow: "Full breakdown",
    directAnswer:
      "Enter the order amount, choose the Fiverr 20% or Upwork 10% assumption, choose an illustrative tax rate, and supply a USD to PKR rate. The result updates as you type. Copy it or download a one-page PDF. The PDF is a working paper, not a payout receipt.",
    defaultPlatform: "fiverr",
    defaultTax: "filer",
    mode: "standard",
    updatedAt,
    sections: [
      {
        id: "sequence",
        heading: "What the calculator does, in order",
        level: 2,
        blocks: [
          {
            type: "ol",
            items: [
              "Starts from the order amount, in USD, EUR, GBP, or AED.",
              "Subtracts the platform fee in the form. Fiverr starts at 20% and Upwork starts at 10%, and both can be edited.",
              "Subtracts the withdrawal percentage in the form. It starts at 2% for Payoneer and can be replaced. A flat $0.99 fee can be added for Upwork direct-to-bank.",
              "Multiplies the net amount by the PKR rate in the form.",
              "Subtracts the tax percentage you typed. The 1% and 2% buttons only fill that field. They are not statutory rates.",
            ],
          },
          {
            type: "note",
            text: "Upwork's contract fee and a provider's withdrawal fee depend on the terms shown to you. The tax line is an illustration, not a tax assessment.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Why does the result change before I press Calculate?",
        answer:
          "The breakdown is tied to the inputs. Calculate moves focus to the result and records that you finished a calculation. You do not have to press it to see the numbers.",
      },
      {
        question: "What does Reset clear?",
        answer:
          "It clears the amount and returns the platform and tax assumption to this page's defaults. A fetched reference rate stays available. A rate you typed is cleared.",
      },
    ],
    sources: [sourceLinks.fiverrEarnings, sourceLinks.upworkFee, sourceLinks.payoneerPricing],
    related: [
      { href: "/fiverr-fee-calculator", label: "Fiverr calculator" },
      { href: "/upwork-fee-calculator", label: "Upwork calculator" },
      { href: "/guides/fiverr-earnings-calculation", label: "See the formula written out" },
    ],
  },
  {
    path: "/fiverr-fee-calculator",
    title: "Fiverr Fee Calculator",
    description:
      "Estimate a Fiverr order after the 20% platform assumption and a withdrawal percent you can edit. The result stays in the order currency until you add your own rate.",
    h1: "Fiverr fee calculator",
    eyebrow: "20% platform assumption",
    directAnswer:
      "On a $100 Fiverr order this model deducts $20, then $1.60 at the 2% withdrawal assumption, and leaves $78.40. Fiverr's help center describes the 80% share. It does not describe the 2% withdrawal line. That line is ours. A local-currency rate is optional and is never filled in for you.",
    defaultPlatform: "fiverr",
    defaultTax: "filer",
    mode: "standard",
    updatedAt,
    sections: [
      {
        id: "hundred",
        heading: "How much is $100 on Fiverr after these deductions?",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "A $100 Fiverr order at 20% and a 2% withdrawal assumption leaves $78.40 in the order currency. Type your own rate only if you want that net amount in another currency. The field is not filled with a country rate.",
          },
        ],
      },
      {
        id: "leave-out",
        heading: "What this Fiverr estimate leaves out",
        level: 2,
        blocks: [
          {
            type: "ul",
            items: [
              "The client service fee at checkout.",
              "Early Payout, unless you turn it on and type the percent Fiverr shows. It applies to the amount after the platform fee, not the full order.",
              "A Payoneer minimum fee, if your corridor has one.",
              "The margin inside Payoneer's exchange rate.",
              "Any tax already withheld by a bank.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Can I estimate an Upwork order on this page?",
        answer:
          "No. This page is Fiverr only. Use the Upwork calculator for an Upwork order. It opens at 10% and does not include a Fiverr option.",
      },
    ],
    sources: [sourceLinks.fiverrEarnings, sourceLinks.fiverrHow, sourceLinks.payoneerPricing],
    related: [
      { href: "/upwork-fee-calculator", label: "Upwork calculator" },
      { href: "/guides/fiverr-fees", label: "Fiverr fees explained" },
      { href: "/guides/fiverr-earnings-calculation", label: "Step-by-step Fiverr math" },
      { href: "/guides/fiverr-withdrawal", label: "Withdrawals after the fee" },
    ],
  },
  {
    path: "/upwork-fee-calculator",
    title: "Upwork Fee Calculator",
    description:
      "Estimate an Upwork order with a fee inside the published 0% to 15% range. This page does not include Fiverr.",
    h1: "Upwork fee calculator",
    eyebrow: "10% contract assumption",
    directAnswer:
      "Upwork charges a contract-specific freelancer service fee from 0% to 15%. This page opens at 10% so a $500 billing becomes $450 after the platform line, before the withdrawal assumption. If your offer shows another percentage, change it. Direct to Local Bank is $0.99 per withdrawal and replaces the percent withdrawal. It assumes this order is the whole withdrawal.",
    defaultPlatform: "upwork",
    defaultTax: "filer",
    mode: "standard",
    updatedAt,
    sections: [
      {
        id: "offer",
        heading: "Read the offer, then use the sketch",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "A $100 Upwork order at 10% leaves $90 before withdrawal. At 5% it leaves $95. At 15% it leaves $85. A 2% withdrawal on $90 is $1.80, so the net is $88.20. The $0.99 local-bank fee replaces that percent and leaves $89.01. Use the fee on your offer.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Does Upwork charge 10% on every contract?",
        answer:
          "No. Upwork publishes a freelancer service fee from 0% to 15%, fixed on the contract. Ten percent is only the starting assumption on this page. Use the percentage on your offer.",
      },
    ],
    sources: [sourceLinks.upworkFee, sourceLinks.upworkPricing, sourceLinks.upworkBank],
    related: [
      { href: "/fiverr-fee-calculator", label: "Fiverr calculator" },
      { href: "/guides/upwork-fees", label: "How the Upwork fee is set" },
      { href: "/guides/upwork-withdrawal", label: "Withdrawal options and fees" },
      { href: "/guides/upwork-earnings-calculation", label: "Calculate an Upwork payment" },
    ],
  },
  {
    path: "/payoneer-fee-calculator",
    title: "Payoneer Fee Calculator",
    description:
      "See the rupee effect of a 2% withdrawal assumption after Fiverr or Upwork fees. Compare it with the fee on your Payoneer screen.",
    h1: "Payoneer withdrawal calculator for freelancers",
    eyebrow: "2% withdrawal assumption",
    directAnswer:
      "The 2% line is calculated on the balance after the platform fee. On $80 left from a Fiverr-style $100 order, it is $1.60. Payoneer's public range for bank withdrawals is about 1.2% to 4%, and your confirmation screen is the actual fee. Use this page to see the shape of a percentage withdrawal, then replace the rate with the one Payoneer quotes.",
    defaultPlatform: "fiverr",
    defaultTax: "filer",
    mode: "standard",
    updatedAt,
    sections: [
      {
        id: "where",
        heading: "Where the Payoneer line sits",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "It never applies to the gross order or to the converted amount. A minimum fee, if your route has one, will not appear. An exchange-rate margin will not appear inside the 2% either. Compare this illustration with the quote in your account.",
          },
          {
            type: "example",
            title: "Withdrawal assumption after a $1,000 Fiverr-style order",
            orderAmountUsd: 1000,
            platform: "fiverr",
            taxStatus: "filer",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Can this page log into Payoneer?",
        answer:
          "No. It never asks for Payoneer credentials. Type the order amount and the rate yourself.",
      },
    ],
    sources: [sourceLinks.payoneerPricing, sourceLinks.payoneerWithdraw],
    related: [
      { href: "/guides/payoneer-fees", label: "Payoneer's published range" },
      { href: "/guides/payoneer-withdrawal-charges", label: "Withdrawal checklist" },
    ],
  },
  {
    path: "/freelancer-income-calculator",
    title: "Freelancer Income Calculator",
    description:
      "Project one freelance order or a month of similar orders in PKR from the same transparent assumptions.",
    h1: "Freelancer income calculator",
    eyebrow: "One order, or a month of them",
    directAnswer:
      "Calculate one order, then multiply the estimated deposit by a whole number of similar orders. The monthly figure inherits every assumption: platform fee, 2% withdrawal, rate, and illustrative tax. It is not a salary. Orders in clearing, lost proposals, and business expenses are outside the multiplication.",
    defaultPlatform: "upwork",
    defaultTax: "filer",
    mode: "income",
    updatedAt,
    sections: [
      {
        id: "multiply",
        heading: "What the monthly field multiplies",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "It multiplies the final converted amount, not the gross order amount. Ten orders are ten times the estimate, including ten platform fees and ten withdrawal assumptions. If your method uses a flat fee, this multiplication may overstate the payout cost. Use the assumptions only for planning.",
          },
          {
            type: "example",
            title: "The single order a monthly plan starts from",
            orderAmountUsd: 300,
            platform: "upwork",
            taxStatus: "filer",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Can different orders be mixed?",
        answer:
          "Only if they share the amount, platform, and rate. For a real month of unlike orders, calculate them one by one and add the bank column in a sheet.",
      },
    ],
    sources: [sourceLinks.upworkFee, sourceLinks.fiverrEarnings],
    related: [
      { href: "/blog/freelancer-income-planning", label: "Plan a month with a cushion" },
      { href: "/blog/how-to-calculate-freelance-income", label: "Columns for a real month" },
      { href: "/calculator", label: "Single-order calculator" },
    ],
  },
  {
    path: "/freelancer-tax-calculator",
    title: "Freelancer Tax Estimate Calculator",
    description:
      "Compare illustrative tax assumptions on converted freelance income. These percentages are not statutory rates or a tax assessment.",
    h1: "Freelancer tax estimate calculator",
    eyebrow: "Illustrative tax only",
    directAnswer:
      "The tax line applies an illustrative percentage after fees and currency conversion. The 1% and 2% options are examples only; they are not derived from the tax rules that apply to you. Review current official guidance or ask a qualified local adviser before treating any amount as payable.",
    defaultPlatform: "fiverr",
    defaultTax: "filer",
    mode: "standard",
    updatedAt,
    sections: [
      {
        id: "gap",
        heading: "What the gap between 1% and 2% means",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "On the same converted amount, the 2% illustration is twice the 1% illustration. That is arithmetic only, not a statement about the tax treatment that applies to you. Actual rules and withholding can differ by jurisdiction.",
          },
          {
            type: "example",
            title: "1% tax illustration on a $100 Fiverr assumption",
            orderAmountUsd: 100,
            platform: "fiverr",
            taxStatus: "filer",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Will this tell me what tax I need to pay?",
        answer:
          "No. It will not calculate slabs, credits, or a special export regime. The disclaimer and the tax guide both say so, because a confident wrong percentage is more harmful than a clearly labeled illustration.",
      },
    ],
    sources: [],
    related: [
      { href: "/tax-guide/freelancer-tax", label: "Freelancer tax guide" },
      { href: "/tax-guide/tax-filing-status", label: "Tax filing status" },
      { href: "/tax-guide/it-export-tax", label: "IT export context" },
    ],
  },
];

export function getTool(path: string): ToolPage | undefined {
  return toolPages.find((page) => page.path === path);
}
