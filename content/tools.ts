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
              "Starts from the gross USD order.",
              "Subtracts 20% for Fiverr or 10% for Upwork.",
              "Subtracts 2% of the remainder as a Payoneer-style withdrawal.",
              "Multiplies the net USD by your rate.",
              "Subtracts 1% or 2% of the rupees as an illustrative tax line.",
            ],
          },
          {
            type: "note",
            text: "Upwork's real contract fee can be anywhere from 0% to 15%. Payoneer's real withdrawal fee is the number on your confirmation screen. The tax line is not an FBR assessment.",
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
      { href: "/fiverr-fee-calculator-pakistan", label: "Fiverr calculator" },
      { href: "/upwork-fee-calculator-pakistan", label: "Upwork calculator" },
      { href: "/guides/fiverr-earnings-calculation", label: "See the formula written out" },
    ],
  },
  {
    path: "/fiverr-fee-calculator-pakistan",
    title: "Fiverr Fee Calculator Pakistan",
    description:
      "Estimate PKR from a Fiverr order using the 80% freelancer share Fiverr describes, plus a separate withdrawal assumption.",
    h1: "Fiverr fee calculator for Pakistani freelancers",
    eyebrow: "20% platform assumption",
    directAnswer:
      "On a $100 Fiverr order this model deducts $20, then $1.60 of withdrawal assumption, and converts $78.40. Fiverr's help center describes the 80% share. It does not describe the 2% withdrawal line. That line is ours, and the exchange rate is yours or a labeled reference.",
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
            type: "example",
            title: "$100 Fiverr order, active-filer illustration, example rate",
            orderAmountUsd: 100,
            platform: "fiverr",
            taxStatus: "filer",
          },
          {
            type: "p",
            text: "Change the rate in the calculator to the one Payoneer shows you. The worked example uses the current reference rate, not the rate on your payout screen.",
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
              "Early Payout's optional charge.",
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
        question: "Can I type an Upwork order on this page?",
        answer:
          "The form still lets you switch platform. This page opens on Fiverr because that is the question it answers. The Upwork calculator opens on the 10% assumption.",
      },
    ],
    sources: [sourceLinks.fiverrEarnings, sourceLinks.fiverrHow, sourceLinks.payoneerPricing],
    related: [
      { href: "/guides/fiverr-fees-pakistan", label: "Fiverr fees explained" },
      { href: "/guides/fiverr-earnings-calculation", label: "Step-by-step Fiverr math" },
      { href: "/guides/fiverr-withdrawal-pakistan", label: "Withdrawals after the fee" },
    ],
  },
  {
    path: "/upwork-fee-calculator-pakistan",
    title: "Upwork Fee Calculator Pakistan",
    description:
      "Sketch an Upwork payment in PKR. The 10% fee is an assumption inside Upwork's published 0% to 15% range.",
    h1: "Upwork fee calculator for Pakistani freelancers",
    eyebrow: "10% contract assumption",
    directAnswer:
      "Upwork charges a contract-specific freelancer service fee from 0% to 15%. This page opens at 10% so a $500 billing becomes $450 after the platform line, before the withdrawal assumption. If your offer shows another percentage, the sketch is only a starting point. Direct to Local Bank is documented at $0.99, which this 2% model does not reproduce.",
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
            type: "example",
            title: "$100 Upwork assumption",
            orderAmountUsd: 100,
            platform: "upwork",
            taxStatus: "filer",
          },
          {
            type: "p",
            text: "A contract at 5% would keep about $5 more per $100 before withdrawal than this 10% line. A contract at 15% would keep about $5 less. That gap is larger than the later difference between a small percentage withdrawal and a $0.99 bank fee on many orders. Adjust the story before you send a quote to a client.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Does Upwork really charge 10% in Pakistan?",
        answer:
          "Not as a flat country rate. Pakistan-based freelancers see the same contract-level range Upwork publishes: 0% to 15%. Ten percent is the assumption selected on this page.",
      },
    ],
    sources: [sourceLinks.upworkFee, sourceLinks.upworkPricing, sourceLinks.upworkBank],
    related: [
      { href: "/guides/upwork-fees-pakistan", label: "How the Upwork fee is set" },
      { href: "/guides/upwork-withdrawal-pakistan", label: "The $0.99 local-bank fee" },
      { href: "/guides/upwork-earnings-calculation", label: "Calculate an Upwork payment" },
    ],
  },
  {
    path: "/payoneer-fee-calculator-pakistan",
    title: "Payoneer Fee Calculator Pakistan",
    description:
      "See the rupee effect of a 2% withdrawal assumption after Fiverr or Upwork fees. Compare it with the fee on your Payoneer screen.",
    h1: "Payoneer withdrawal calculator for Pakistani freelancers",
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
            text: "It never applies to the gross order. It never applies to the rupees after conversion. A minimum fee, if your corridor has one, will not appear. An exchange-rate margin will not appear inside the 2% either. If the screen says 3%, expect a higher fee than the breakdown and treat the difference as the useful result of the comparison.",
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
      { href: "/guides/payoneer-fees-pakistan", label: "Payoneer's published range" },
      { href: "/guides/payoneer-withdrawal-charges", label: "Withdrawal checklist" },
      { href: "/usd-to-pkr-calculator", label: "Convert the net dollars" },
    ],
  },
  {
    path: "/usd-to-pkr-calculator",
    title: "USD to PKR Calculator for Freelancers",
    description:
      "Convert USD to PKR with a labeled reference rate or your own rate, then see the same amount after freelance fees.",
    h1: "USD to PKR calculator",
    eyebrow: "Reference rate, clearly sourced",
    directAnswer:
      "The converter multiplies a USD amount by the rate shown. It does not subtract Fiverr, Upwork, or Payoneer fees. The earnings form below does. Frankfurter is checked first and, because it has no PKR rate, is not used as a silent source. If no reference rate loads, type one. A blank rate is left blank on purpose.",
    defaultPlatform: "fiverr",
    defaultTax: "filer",
    mode: "converter",
    updatedAt,
    sections: [
      {
        id: "which-amount",
        heading: "Which dollars should you convert?",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "For a bank forecast, convert net dollars after fees. Converting the client's $100 and calling it salary ignores the marketplace. The pure converter is here for the rate itself: a client asked for a rupee figure, or you want to see what 280 means. The earnings calculator underneath is the one that answers 'what might I receive'.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Why might the live rate be missing?",
        answer:
          "Frankfurter does not publish PKR. The secondary reference can also fail. In either case the field stays empty until you type a rate from a source you trust.",
      },
    ],
    sources: [sourceLinks.frankfurter, sourceLinks.ecb, sourceLinks.exchangeRateApi, sourceLinks.sbp],
    related: [
      { href: "/guides/usd-to-pkr-conversion-guide", label: "Conversion guide" },
      { href: "/guides/freelancer-currency-conversion", label: "Record the implied rate" },
      { href: "/calculator", label: "Full fee calculator" },
    ],
  },
  {
    path: "/freelancer-income-calculator",
    title: "Freelancer Income Calculator Pakistan",
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
            text: "It multiplies the final PKR line, not the gross USD line. Ten orders are ten times the deposit, including ten platform fees and ten withdrawal assumptions. If each withdrawal would instead be a flat $0.99, this multiplication overstates the payout cost. Use it for a Payoneer-style plan, and read the income-planning article before you spend against it.",
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
      { href: "/blog/freelancer-income-planning-pakistan", label: "Plan a month with a cushion" },
      { href: "/blog/how-to-calculate-freelance-income", label: "Columns for a real month" },
      { href: "/calculator", label: "Single-order calculator" },
    ],
  },
  {
    path: "/freelancer-tax-calculator-pakistan",
    title: "Freelancer Tax Calculator Pakistan",
    description:
      "Compare illustrative 1% and 2% deductions on converted freelance income. These are not FBR rates.",
    h1: "Freelancer tax calculator for Pakistan",
    eyebrow: "Illustrative tax only",
    directAnswer:
      "The tax line is a percentage of the PKR amount after fees and conversion. Active filer uses 1%. Non-filer uses 2%. Neither figure is copied from a current FBR withholding table. Switch the dropdown to see the rupee gap, then take your facts to the tax guide and to FBR or an adviser before you treat either number as payable.",
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
            text: "On the same converted amount, the non-filer illustration is twice the filer illustration, because 2 is twice 1. That is arithmetic, not a description of how much extra tax a non-filer owes. Real differences can be larger, smaller, or structured as withholding that later becomes a credit. The value of the control is that it stops the tax line from hiding inside the platform fee.",
          },
          {
            type: "example",
            title: "Filer illustration on a $100 Fiverr assumption",
            orderAmountUsd: 100,
            platform: "fiverr",
            taxStatus: "filer",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Will this tell me what to pay FBR?",
        answer:
          "No. It will not calculate slabs, credits, or a special export regime. The disclaimer and the tax guide both say so, because a confident wrong percentage is more harmful than a clearly labeled illustration.",
      },
    ],
    sources: [sourceLinks.fbr],
    related: [
      { href: "/tax-guide/pakistan-freelancer-tax", label: "Freelancer tax guide" },
      { href: "/tax-guide/fbr-active-filer-vs-non-filer", label: "Filer and non-filer" },
      { href: "/tax-guide/pakistan-it-export-tax", label: "IT export context" },
    ],
  },
];

export function getTool(path: string): ToolPage | undefined {
  return toolPages.find((page) => page.path === path);
}
