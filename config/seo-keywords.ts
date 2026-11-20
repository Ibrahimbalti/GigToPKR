export type SearchIntent = "informational" | "commercial" | "transactional";

export type KeywordMapping = {
  keyword: string;
  intent: SearchIntent;
  path: string;
  title: string;
  description: string;
  h1: string;
  relatedTerms: string[];
  internalLinks: string[];
  conversion: string;
  metrics: "unverified";
};

export const keywordMap: KeywordMapping[] = [
  {
    keyword: "Freelancer Fee Calculator",
    intent: "transactional",
    path: "/",
    title: "Freelancer Fee Calculator",
    description:
      "Estimate freelance earnings after platform and withdrawal fees, currency conversion, and an illustrative tax assumption.",
    h1: "Calculate your freelance earnings after fees",
    relatedTerms: ["freelancer earnings calculator", "freelance income calculator"],
    internalLinks: ["/fiverr-fee-calculator", "/upwork-fee-calculator", "/guides", "/tax-guide"],
    conversion: "Start a calculation",
    metrics: "unverified",
  },
  {
    keyword: "Fiverr Fee Calculator",
    intent: "transactional",
    path: "/fiverr-fee-calculator",
    title: "Fiverr Fee Calculator",
    description:
      "Estimate a Fiverr order in PKR using a 20% platform-fee assumption, a 2% withdrawal assumption, and an illustrative tax rate.",
    h1: "Fiverr Fee Calculator for Freelancers",
    relatedTerms: ["Fiverr earnings after fees", "Fiverr payout calculator"],
    internalLinks: ["/guides/fiverr-fees", "/guides/fiverr-earnings-calculation"],
    conversion: "Calculate a Fiverr order",
    metrics: "unverified",
  },
  {
    keyword: "Upwork Fee Calculator",
    intent: "transactional",
    path: "/upwork-fee-calculator",
    title: "Upwork Fee Calculator",
    description:
      "Estimate an Upwork payment in PKR. The 10% fee is an assumption inside Upwork's published 0% to 15% range.",
    h1: "Upwork Fee Calculator for Freelancers",
    relatedTerms: ["Upwork earnings after fees", "Upwork payout calculator"],
    internalLinks: ["/guides/upwork-fees", "/guides/upwork-withdrawal"],
    conversion: "Calculate an Upwork payment",
    metrics: "unverified",
  },
  {
    keyword: "Payoneer Fee Calculator",
    intent: "commercial",
    path: "/payoneer-fee-calculator",
    title: "Payoneer Fee Calculator",
    description:
      "See how a 2% withdrawal assumption changes freelance earnings. Compare it with Payoneer's published fee range before you withdraw.",
    h1: "Payoneer Withdrawal Calculator for Freelancers",
    relatedTerms: ["Payoneer withdrawal charges", "Payoneer bank withdrawal fee"],
    internalLinks: ["/guides/payoneer-fees", "/guides/payoneer-withdrawal-charges"],
    conversion: "Test a withdrawal assumption",
    metrics: "unverified",
  },
  {
    keyword: "Freelancer Income Calculator",
    intent: "commercial",
    path: "/freelancer-income-calculator",
    title: "Freelancer Income Calculator",
    description:
      "Project one order or a month of similar orders in PKR from the same fee, conversion, and tax assumptions.",
    h1: "Freelancer Income Calculator",
    relatedTerms: ["freelancer income planning", "monthly freelance income estimate"],
    internalLinks: ["/blog/freelancer-income-planning", "/fiverr-fee-calculator"],
    conversion: "Build a monthly projection",
    metrics: "unverified",
  },
  {
    keyword: "Freelancer Tax Estimate Calculator",
    intent: "informational",
    path: "/freelancer-tax-calculator",
    title: "Freelancer Tax Estimate Calculator",
    description:
      "Compare illustrative tax assumptions on converted freelance income. These percentages are not statutory rates or a tax assessment.",
    h1: "Freelancer Tax Estimate Calculator",
    relatedTerms: ["freelancer tax planning", "tax estimate disclaimer"],
    internalLinks: ["/tax-guide/freelancer-tax", "/tax-guide/tax-filing-status"],
    conversion: "Compare illustrative tax assumptions",
    metrics: "unverified",
  },
  {
    keyword: "How do I calculate Fiverr earnings after fees?",
    intent: "informational",
    path: "/guides/fiverr-earnings-calculation",
    title: "How to Calculate Fiverr Earnings After Fees",
    description:
      "Follow the steps from a Fiverr order amount to an estimated payout after platform and withdrawal fees.",
    h1: "How do I calculate Fiverr earnings after fees?",
    relatedTerms: ["how much is $100 on Fiverr after deductions"],
    internalLinks: ["/fiverr-fee-calculator", "/guides/fiverr-fees"],
    conversion: "Open the Fiverr calculator",
    metrics: "unverified",
  },
  {
    keyword: "How much does Payoneer charge?",
    intent: "informational",
    path: "/guides/payoneer-fees",
    title: "Payoneer Fees Explained",
    description:
      "Read Payoneer's published withdrawal range and see why this calculator uses a separate 2% assumption.",
    h1: "How much does Payoneer charge freelancers?",
    relatedTerms: ["Payoneer withdrawal guide"],
    internalLinks: ["/payoneer-fee-calculator", "/guides/payoneer-withdrawal-charges"],
    conversion: "Compare the assumption with your account fee",
    metrics: "unverified",
  },
  {
    keyword: "How should freelancers plan for tax?",
    intent: "informational",
    path: "/tax-guide/freelancer-tax",
    title: "Freelancer Tax Planning Guide",
    description:
      "Understand tax filing status, records, and why a calculator percentage is not your tax assessment.",
    h1: "Freelancer Tax Planning Guide",
    relatedTerms: ["freelancer tax records", "tax rules for self-employed people"],
    internalLinks: ["/freelancer-tax-calculator", "/tax-guide/it-export-tax"],
    conversion: "Review the tax calculator assumptions",
    metrics: "unverified",
  },
];
