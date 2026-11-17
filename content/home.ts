import { sourceLinks } from "@/content/sources";
import type { ContentSection, Faq } from "@/types/content";

export const homeFaqs: Faq[] = [
  {
    question: "How do I calculate Fiverr earnings in Pakistan?",
    answer:
      "Enter the order in USD, leave the platform on the 20% Fiverr assumption, and set a USD to PKR rate. The calculator subtracts that fee, then a 2% withdrawal assumption, converts the remainder, and subtracts the illustrative tax percentage from the rupees.",
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
      "Payoneer's public pricing, dated 1 January 2026 on its site, lists bank withdrawals in a range of about 1.2% to 4% depending on the corridor. The exact fee is shown before you confirm. This calculator assumes 2% of the balance after platform fees.",
  },
  {
    question: "How is USD converted into PKR?",
    answer:
      "Net USD after the modeled fees is multiplied by the rate in the form. Frankfurter does not publish PKR. A labeled ExchangeRate-API reference is used when it is available. The rate Payoneer or your bank applies can differ, so a manual rate is always allowed.",
  },
  {
    question: "What is an active filer?",
    answer:
      "In ordinary use it means a person on FBR's Active Taxpayers List. The calculator's 1% active-filer option is an illustration for comparison. It is not the statutory rate for people on that list.",
  },
  {
    question: "What is a non-filer?",
    answer:
      "A person who is not on the Active Taxpayers List. Banks often apply a different withholding treatment. The calculator's 2% option is only the comparison assumption, not that withholding table.",
  },
  {
    question: "Is this tax calculation exact?",
    answer:
      "No. It ignores tax slabs, credits, tax already withheld, provincial sales tax, and any special IT-export provision in the current Finance Act. Do not file a return from it.",
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
      "Order amounts stay in your browser for the session. They are not written to a GigToPKR account, because there is no account. The exchange-rate request sends no order amount.",
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
    heading: "How freelancer fees, Payoneer withdrawals, and taxes work in Pakistan",
    level: 2,
    blocks: [
      {
        type: "p",
        text: "A client price in dollars is not a salary in rupees. Between those two numbers sit a marketplace fee, a withdrawal, a conversion, and tax. This article follows that path in the same order as the calculator. Each percentage below is either tied to a public page or labeled as an assumption. None of it is a quote for your next withdrawal.",
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
        text: "Upwork does not publish one Pakistan rate. Its freelancer service fee runs from 0% to 15% and is fixed when the contract starts. You can see it on the proposal or the offer. A 10% line in this calculator is a midpoint for sketching, and it is the wrong number if your offer says something else. Connects, the cost of applying, are not subtracted.",
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
        text: "Upwork's Direct to Local Bank route is different. Its help page lists $0.99 per withdrawal and says company PKR accounts are not accommodated. Do not stack that $0.99 on top of the 2% assumption unless you actually pay both, which would be unusual.",
      },
    ],
  },
  {
    id: "conversion",
    heading: "USD to PKR conversion",
    level: 3,
    blocks: [
      {
        type: "p",
        text: "Conversion should use the net dollars, not the client's gross price. Frankfurter, which republishes European Central Bank reference rates, does not list PKR. This site checks that request and refuses to pretend a Frankfurter PKR rate exists. When ExchangeRate-API's open feed returns PKR, the rate is labeled with that source and the time it was updated. The State Bank of Pakistan publishes its own rates for official purposes. Payoneer and your bank publish a third number, the one that reaches you. Type that number over the reference rate when you have the payout screen open.",
      },
    ],
  },
  {
    id: "tax",
    heading: "Pakistani freelancer taxation",
    level: 3,
    blocks: [
      {
        type: "p",
        text: "Foreign freelance receipts can fall under Pakistan's income-tax rules. Filer status on the Active Taxpayers List often changes how withholding works. IT and IT-enabled exports have, in various Finance Acts, had special provisions tied to conditions such as registration and the banking channel. Those texts change. This site will not freeze an old statutory percentage into the form.",
      },
    ],
  },
  {
    id: "fbr",
    heading: "FBR concepts used on this site",
    level: 3,
    blocks: [
      {
        type: "p",
        text: "The dropdown says 'Active filer' and 'Non-filer' because those are the words freelancers use. The attached 1% and 2% figures are illustrations so you can see the rupee difference. They are not FBR's withholding schedule and they are not a final-tax certificate. If a bank already withheld tax, do not subtract the illustration on top without checking whether that withholding is the tax or only a credit.",
      },
    ],
  },
  {
    id: "it-export",
    heading: "IT export considerations",
    level: 3,
    blocks: [
      {
        type: "p",
        text: "Before you treat marketplace income as export income under a special rule, identify the current section, the definition of IT or IT-enabled services, any registration the section requires, and the evidence of foreign-exchange receipt. The tax guide lists those questions and links to FBR. PSEB registration matters only if the current rule says it does.",
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
        text: "Save the marketplace earnings export, the Payoneer or Upwork withdrawal confirmation, and the bank credit. Divide PKR received by USD sent and store that implied rate. A PDF from this calculator is a working paper. The provider's PDF is the evidence. The record-keeping guide is a checklist, not a retention period. Ask your adviser how long the current law expects you to keep the file.",
      },
    ],
  },
  {
    id: "worked-example",
    heading: "A worked example",
    level: 2,
    blocks: [
      {
        type: "example",
        title: "$100 on Fiverr at the current reference rate",
        orderAmountUsd: 100,
        platform: "fiverr",
        taxStatus: "filer",
      },
      {
        type: "p",
        text: "Read it as arithmetic practice at the current reference rate. Then run the non-filer illustration if you want to see how sensitive the last line is to the tax assumption. The sensitivity is the lesson. The last line is not a salary offer.",
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
          "Converting the gross order and subtracting fees in rupees afterwards.",
          "Applying the withdrawal percentage to the original order.",
          "Subtracting both a 2% model and Upwork's $0.99.",
          "Using a reference rate after Payoneer has already shown its rate.",
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
  sourceLinks.fbr,
  sourceLinks.sbp,
  sourceLinks.frankfurter,
];
