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
    slug: "pakistan-freelancer-tax",
    title: "Pakistan Freelancer Tax Guide",
    description:
      "A practical map of freelancer tax questions in Pakistan, and a clear line between an estimate and an assessment.",
    h1: "How should Pakistani freelancers think about tax on foreign income?",
    excerpt:
      "Filer status, records, and the Finance Act matter. A 1% calculator line is not an assessment.",
    directAnswer:
      "Freelance income received from foreign clients can be taxable in Pakistan, and the treatment depends on the Income Tax Ordinance, the latest Finance Act, your status on the Active Taxpayers List, and whether any special export regime applies to you. RealGigPay does not determine that treatment. Its 1% and 2% options are labeled illustrations so two results can be compared. File from FBR guidance or a tax adviser, not from this estimate.",
    sections: [
      {
        id: "what-it-is",
        heading: "What this guide will and will not tell you",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "It will help you name the documents and the questions. It will not quote a current statutory percentage as if it were stable. Rates, final-tax provisions, and withholding rules for exporters of services have changed across Finance Acts. Quoting a remembered percentage would be worse than sending you to the Federal Board of Revenue.",
          },
          {
            type: "ul",
            items: [
              "Are you on the Active Taxpayers List?",
              "Is the income from IT or IT-enabled services, or from another service?",
              "Are you registered with any body that a special regime requires?",
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
            text: "The illustrative percentage is applied to the PKR amount after platform fees, the withdrawal assumption, and conversion. It is not applied to the gross USD order. Active filer uses 1% in the model. Non-filer uses 2%. Changing the label does not change your legal status. Only the FBR record does.",
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
            text: "Run the calculator again with the non-filer illustration to see the rupee gap. The gap is a comparison of assumptions, not the penalty or the extra tax FBR would compute.",
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
            text: "Register or confirm your status with FBR, keep the payout records described in the record-keeping guide, and ask a tax practitioner to map your facts onto the current Finance Act. If you export IT services, read the IT export page on this site only as a list of questions, then read FBR's current material.",
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
    sources: [sourceLinks.fbr],
    related: [
      { href: "/freelancer-tax-calculator-pakistan", label: "Illustrative tax calculator" },
      { href: "/tax-guide/fbr-active-filer-vs-non-filer", label: "Active filer and non-filer" },
      { href: "/tax-guide/pakistan-it-export-tax", label: "IT export tax context" },
    ],
  }),
  tax({
    slug: "fbr-active-filer-vs-non-filer",
    title: "Active Filer vs Non-Filer in Pakistan",
    description:
      "What the Active Taxpayers List is for, and why this site's 1% and 2% labels are not FBR categories with those rates.",
    h1: "What is the difference between an active filer and a non-filer?",
    excerpt:
      "Filer status is an FBR classification. The percentages in the calculator are a separate, clearly labeled model.",
    directAnswer:
      "An active filer, in ordinary Pakistani usage, is a person who appears on FBR's Active Taxpayers List after meeting the filing conditions FBR sets. A non-filer does not. Banks and withholding agents often apply different treatments to the two groups. The exact difference is defined by current law, not by RealGigPay. The calculator's 'Active filer — 1%' and 'Non-filer — 2%' labels are assumptions for a side-by-side estimate.",
    sections: [
      {
        id: "atl",
        heading: "The Active Taxpayers List",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "FBR publishes the list and the process for appearing on it. Check the list against your own CNIC or registration rather than assuming last year's return is enough. A name can be missing because a return was late, incomplete, or filed under a different registration. The remedy is on FBR's side, not in a calculator dropdown.",
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
            text: "Freelancers asked for a way to see that status can change the rupee outcome. A single hidden percentage would pretend we know the law. Two labeled illustrations show the arithmetic sensitivity without impersonating a withholding table. If a bank has already deducted tax on the inward remittance, do not deduct the illustration again in your head. Reconcile the bank challan or statement with the return.",
          },
          {
            type: "example",
            title: "Non-filer illustration on a $500 Upwork assumption",
            orderAmountUsd: 500,
            platform: "upwork",
            taxStatus: "nonFiler",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "If I am on the Active Taxpayers List, is my rate 1%?",
        answer:
          "No. Being on the list and owing 1% are not the same statement. Your rate depends on the provision that applies to your income in the current tax year.",
      },
      {
        question: "Can this page tell me if I am a filer?",
        answer:
          "No. Search the Active Taxpayers List on FBR's own site with your own particulars.",
      },
    ],
    sources: [sourceLinks.fbr],
    related: [
      { href: "/freelancer-tax-calculator-pakistan", label: "Compare the two illustrations" },
      { href: "/tax-guide/pakistan-freelancer-tax", label: "Freelancer tax overview" },
      { href: "/disclaimer", label: "Financial and tax disclaimer" },
    ],
  }),
  tax({
    slug: "pakistan-it-export-tax",
    title: "Pakistan IT Export Tax Context",
    description:
      "Questions to take to FBR and PSEB about IT and IT-enabled service exports, without a fabricated current rate.",
    h1: "How are IT export receipts discussed in Pakistan's tax rules?",
    excerpt:
      "Special rules for IT exporters have changed with Finance Acts. Verify the current text before you rely on a percentage.",
    directAnswer:
      "Pakistan has used special income-tax provisions for the export of IT and IT-enabled services, sometimes connected with registration conditions such as PSEB. Those provisions are amended. RealGigPay will not state a current statutory rate, because stating a remembered rate from an older Finance Act would mislead. Use FBR's current law and any registration body named in that law.",
    sections: [
      {
        id: "questions",
        heading: "Questions that decide the treatment",
        level: 2,
        blocks: [
          {
            type: "ol",
            items: [
              "Does the current Finance Act still give export-of-services income a special final or reduced treatment?",
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
            text: "A hardcoded 'IT exporter' percentage would go stale at the next Finance Act and would still be wrong for freelancers who do not meet the conditions. The illustrative filer and non-filer lines stay visibly generic. If your adviser gives you a percentage that applies to your facts, you can use the calculator only as arithmetic: it will not know that you have replaced the legal analysis.",
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
            text: "Provincial sales tax on services is a separate conversation from federal income tax. This calculator does not model it. If a marketplace invoice or a local client triggers sales tax, that cash movement will not appear in the PKR deposit estimate.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Does PSEB registration by itself set the tax rate?",
        answer:
          "Not by itself. Registration matters only if the current provision says it does, and only if the rest of the conditions are met. Read the provision or ask an adviser.",
      },
    ],
    sources: [sourceLinks.fbr, sourceLinks.sbp],
    related: [
      { href: "/tax-guide/pakistan-freelancer-tax", label: "Freelancer tax overview" },
      { href: "/tax-guide/freelancer-tax-record-keeping", label: "Records that support an export position" },
      { href: "/freelancer-tax-calculator-pakistan", label: "Illustrative calculator" },
    ],
  }),
  tax({
    slug: "freelancer-tax-record-keeping",
    title: "Freelancer Tax Record Checklist",
    description:
      "A record set for Pakistani freelancers: platform statements, payout confirmations, bank credits, and the rate actually received.",
    h1: "What income records should a Pakistani freelancer keep?",
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
              "Bank statement line showing the PKR credit and the date.",
              "Implied rate: PKR received divided by USD sent.",
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
            text: "Download the calculator PDF if you want a neat breakdown for your own planning. File it in a 'working papers' folder, not in the folder of FBR evidence. If the numbers differ from Payoneer, the Payoneer PDF wins. The currency-conversion guide shows how to compute the implied rate that explains the difference.",
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
        question: "What if the bank credit is a few rupees different?",
        answer:
          "Record the bank credit. A small gap is often rounding or a correspondent charge. The statement is the amount you received.",
      },
    ],
    sources: [sourceLinks.fbr, sourceLinks.payoneerPricing],
    related: [
      { href: "/guides/freelancer-currency-conversion", label: "Record the implied rate" },
      { href: "/tax-guide/pakistan-freelancer-tax", label: "Tax overview" },
      { href: "/calculator", label: "Create a working-paper estimate" },
    ],
  }),
];
