import { sourceLinks } from "@/content/sources";
import type { ContentSection, Faq } from "@/types/content";

export const homeFaqs: Faq[] = [
  {
    question: "How do I calculate Fiverr earnings?",
    answer:
      "Open the Fiverr calculator, enter the order, and leave the platform fee at 20% or type another percentage. It then subtracts the withdrawal percentage in the form, which starts at 2%. The result stays in the order currency unless you type your own rate.",
  },
  {
    question: "How much does Fiverr deduct?",
    answer:
      "Fiverr's earnings help page says freelancers earn 80% of the purchase amount, including extras and tips. This calculator uses the other 20%. The fee a client pays at checkout is not subtracted again. Confirm the current help page because terms change.",
  },
  {
    question: "How much does Upwork charge?",
    answer:
      "Upwork publishes a freelancer service fee from 0% to 15%, shown on the proposal or offer and fixed for that contract. The calculator assumes 10% so you can sketch a number. Use the percentage on your offer when you have it.",
  },
  {
    question: "What are Payoneer withdrawal fees?",
    answer:
      "Payoneer's public pricing, dated 1 January 2026 on its site, lists bank withdrawals in a range of about 1.2% to 4% depending on the corridor. The exact fee is shown before you confirm. The withdrawal field starts at 2% so you can replace it with the percentage on your screen.",
  },
  {
    question: "Can I convert the result into my currency?",
    answer:
      "Yes. Leave the rate blank to keep the estimate in the order currency. If you type a rate, it is units of your currency for one unit of the order currency. Use the number on your payout screen. This site does not assume a country rate.",
  },
  {
    question: "Is the tax line a real tax assessment?",
    answer:
      "No. The tax field is an optional amount to set aside. It is not a tax authority's rate, and it is not a filing. Leave it at 0 if you do not want it in the estimate.",
  },
  {
    question: "Can I enter a manual exchange rate?",
    answer:
      "Yes. Type over the rate and it is marked manual. If a refresh fails, your manual number stays. Nothing is replaced with a guessed rate.",
  },
  {
    question: "Is this calculator free?",
    answer:
      "Yes. There is no account and no charge to calculate, copy, or download the breakdown.",
  },
  {
    question: "Does the calculator store my financial information?",
    answer:
      "Order amounts stay in your browser for the session. They are not written to a RealGigPay account, because there is no account. The exchange-rate request sends no order amount.",
  },
  {
    question: "Can I use this calculator on mobile?",
    answer:
      "Yes. The form stacks in one column on a phone. The same calculation runs there as on a desktop.",
  },
];

export const homeArticle: ContentSection[] = [
  {
    id: "platform-fees",
    heading: "How marketplace fees and withdrawals change a freelance order",
    level: 2,
    blocks: [
      {
        type: "p",
        text: "A client price is not the amount you keep. A marketplace fee comes off first, then a withdrawal charge. This article follows that order. Each percentage below is either tied to a public page or labeled as an assumption. None of it is a quote for your next withdrawal, and none of it assumes a country.",
      },
    ],
  },
  {
    id: "fiverr-fees",
    heading: "Fiverr fees",
    level: 3,
    blocks: [
      {
        type: "p",
        text: "Fiverr's earnings help page says freelancers earn 80% of the purchase amount, including Gig Extras and tips, and describes a clearing period before withdrawal. The calculator therefore starts with a 20% deduction. The service fee a client sees at checkout is the client's cost. Subtracting it again would understate the balance. Optional Early Payout, which Fiverr has described as a separate 1% for eligible orders, is not in the model.",
      },
    ],
  },
  {
    id: "upwork-fees",
    heading: "Upwork fees",
    level: 3,
    blocks: [
      {
        type: "p",
        text: "Upwork does not publish one worldwide fee. Its freelancer service fee runs from 0% to 15% and is fixed when the contract starts. You can see it on the proposal or the offer. A 10% line in this calculator is a midpoint for sketching, and it is the wrong number if your offer says something else. Connects, the cost of applying, are not subtracted.",
      },
    ],
  },
  {
    id: "payoneer",
    heading: "Payoneer charges",
    level: 3,
    blocks: [
      {
        type: "p",
        text: "After the marketplace fee, many freelancers withdraw through Payoneer. Payoneer's pricing page, marked 1 January 2026, lists bank withdrawals around 1.2% to 4% and tells you the exact fee appears before confirmation. Some corridors also have a minimum. The calculator applies 2% to the post-platform balance, which is inside that published range and still not your quote. A margin inside the exchange rate will not show up as part of the 2%.",
      },
      {
        type: "p",
        text: "Upwork's Direct to Local Bank route is different. Its help page lists $0.99 per withdrawal. Use that flat fee instead of the 2% line, not on top of it. The Upwork calculator treats the order as the whole withdrawal.",
      },
    ],
  },
  {
    id: "conversion",
    heading: "Converting into your currency",
    level: 3,
    blocks: [
      {
        type: "p",
        text: "Convert the net amount, not the client's gross price. The Fiverr and Upwork calculators leave the result in the order currency until you type a rate. That rate should be the one on your payout screen: how many units of your currency you receive for one unit of the order. This site does not fill in a country rate for you.",
      },
    ],
  },
  {
    id: "tax",
    heading: "Tax is optional",
    level: 3,
    blocks: [
      {
        type: "p",
        text: "Tax rules depend on where you live and how you are paid. The calculator does not pick a country rate. The tax field starts at 0. Type a percentage only if you want to set money aside. It is not a filing and it is not advice.",
      },
    ],
  },
  {
    id: "records",
    heading: "Record keeping",
    level: 3,
    blocks: [
      {
        type: "p",
        text: "Save the marketplace earnings export, the withdrawal confirmation, and the bank credit. A PDF from this calculator is a working paper. The provider's PDF is the evidence.",
      },
    ],
  },
  {
    id: "worked-example",
    heading: "A worked example",
    level: 2,
    blocks: [
      {
        type: "p",
        text: "At a 20% platform fee and a 2% withdrawal assumption, $100 leaves $78.40 before any tax you choose to set aside and before you convert it. The last line of a local conversion is not a salary offer.",
      },
    ],
  },
  {
    id: "mistakes",
    heading: "Common mistakes",
    level: 2,
    blocks: [
      {
        type: "ul",
        items: [
          "Converting the gross order and subtracting fees afterwards.",
          "Applying the withdrawal percentage to the original order.",
          "Subtracting both a 2% model and Upwork's $0.99.",
          "Using a guessed rate after your payout screen has already shown its rate.",
          "Treating pending clearance as money that can be spent.",
          "Filing a tax return from the illustrative percentage.",
          "Comparing Fiverr and Upwork without using the fee on the actual Upwork offer.",
        ],
      },
    ],
  },
];

export const homeSources = [
  sourceLinks.fiverrEarnings,
  sourceLinks.upworkFee,
  sourceLinks.upworkBank,
  sourceLinks.payoneerPricing,
  sourceLinks.frankfurter,
];
