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
    keyword: "Freelancer Fee Calculator Pakistan",
    intent: "transactional",
    path: "/",
    title: "Freelancer Fee Calculator Pakistan",
    description:
      "Estimate what a Pakistani freelancer may receive in PKR after platform fees, a Payoneer assumption, conversion, and an illustrative tax rate.",
    h1: "Calculate Your Freelance Earnings in Pakistan",
    relatedTerms: ["freelancer earnings calculator", "freelance income calculator"],
    internalLinks: ["/calculator", "/guides", "/tax-guide"],
    conversion: "Start a calculation",
    metrics: "unverified",
  },
  {
    keyword: "Fiverr Fee Calculator Pakistan",
    intent: "transactional",
    path: "/fiverr-fee-calculator-pakistan",
    title: "Fiverr Fee Calculator Pakistan",
    description:
      "Estimate a Fiverr order in PKR using a 20% platform-fee assumption, a 2% withdrawal assumption, and an illustrative tax rate.",
    h1: "Fiverr Fee Calculator for Pakistani Freelancers",
    relatedTerms: ["Fiverr earnings in Pakistan", "Fiverr to PKR calculator"],
    internalLinks: ["/guides/fiverr-fees-pakistan", "/guides/fiverr-earnings-calculation"],
    conversion: "Calculate a Fiverr order",
    metrics: "unverified",
  },
  {
    keyword: "Upwork Fee Calculator Pakistan",
    intent: "transactional",
    path: "/upwork-fee-calculator-pakistan",
    title: "Upwork Fee Calculator Pakistan",
    description:
      "Estimate an Upwork payment in PKR. The 10% fee is an assumption inside Upwork's published 0% to 15% range.",
    h1: "Upwork Fee Calculator for Pakistani Freelancers",
    relatedTerms: ["Upwork earnings in Pakistan", "Upwork to PKR calculator"],
    internalLinks: ["/guides/upwork-fees-pakistan", "/guides/upwork-withdrawal-pakistan"],
    conversion: "Calculate an Upwork payment",
    metrics: "unverified",
  },
  {
    keyword: "Payoneer Fee Calculator Pakistan",
    intent: "commercial",
    path: "/payoneer-fee-calculator-pakistan",
    title: "Payoneer Fee Calculator Pakistan",
    description:
      "See how a 2% withdrawal assumption changes freelance earnings. Compare it with Payoneer's published fee range before you withdraw.",
    h1: "Payoneer Withdrawal Calculator for Pakistani Freelancers",
    relatedTerms: ["Payoneer withdrawal charges Pakistan"],
    internalLinks: ["/guides/payoneer-fees-pakistan", "/guides/payoneer-withdrawal-charges"],
    conversion: "Test a withdrawal assumption",
    metrics: "unverified",
  },
  {
    keyword: "USD to PKR Calculator",
    intent: "transactional",
    path: "/usd-to-pkr-calculator",
    title: "USD to PKR Calculator for Freelancers",
    description:
      "Convert USD to PKR with a labeled reference rate or your own rate. Frankfurter does not publish PKR.",
    h1: "USD to PKR Calculator",
    relatedTerms: ["convert freelance income from USD to PKR"],
    internalLinks: ["/guides/usd-to-pkr-conversion-guide", "/calculator"],
    conversion: "Convert an amount",
    metrics: "unverified",
  },
  {
    keyword: "Freelancer Income Calculator",
    intent: "commercial",
    path: "/freelancer-income-calculator",
    title: "Freelancer Income Calculator Pakistan",
    description:
      "Project one order or a month of similar orders in PKR from the same fee, conversion, and tax assumptions.",
    h1: "Freelancer Income Calculator",
    relatedTerms: ["freelancer salary calculator Pakistan", "freelance income planning"],
    internalLinks: ["/blog/freelancer-income-planning-pakistan", "/calculator"],
    conversion: "Build a monthly projection",
    metrics: "unverified",
  },
  {
    keyword: "Freelancer Tax Calculator Pakistan",
    intent: "informational",
    path: "/freelancer-tax-calculator-pakistan",
    title: "Freelancer Tax Calculator Pakistan",
    description:
      "Compare illustrative 1% and 2% tax assumptions on converted freelance income. These percentages are not FBR rates.",
    h1: "Freelancer Tax Calculator for Pakistan",
    relatedTerms: ["Pakistani freelancer tax guide", "FBR freelancer tax"],
    internalLinks: ["/tax-guide/pakistan-freelancer-tax", "/tax-guide/fbr-active-filer-vs-non-filer"],
    conversion: "Compare illustrative tax assumptions",
    metrics: "unverified",
  },
  {
    keyword: "How much will I receive after Fiverr fees in Pakistan?",
    intent: "informational",
    path: "/guides/fiverr-earnings-calculation",
    title: "How to Calculate Fiverr Earnings in PKR",
    description:
      "Follow the six-step estimate from a Fiverr order amount to an illustrative PKR bank deposit.",
    h1: "How to Calculate Fiverr Earnings in PKR",
    relatedTerms: ["how much is $100 on Fiverr after deductions"],
    internalLinks: ["/fiverr-fee-calculator-pakistan", "/guides/fiverr-fees-pakistan"],
    conversion: "Open the Fiverr calculator",
    metrics: "unverified",
  },
  {
    keyword: "How much does Payoneer charge in Pakistan?",
    intent: "informational",
    path: "/guides/payoneer-fees-pakistan",
    title: "Payoneer Fees in Pakistan",
    description:
      "Read Payoneer's published withdrawal range and see why this calculator uses a separate 2% assumption.",
    h1: "Payoneer Fees for Freelancers in Pakistan",
    relatedTerms: ["Payoneer withdrawal guide"],
    internalLinks: ["/payoneer-fee-calculator-pakistan", "/guides/payoneer-withdrawal-charges"],
    conversion: "Compare the assumption with your account fee",
    metrics: "unverified",
  },
  {
    keyword: "How much tax do Pakistani freelancers pay?",
    intent: "informational",
    path: "/tax-guide/pakistan-freelancer-tax",
    title: "Pakistan Freelancer Tax Guide",
    description:
      "Understand filer status, records, and why a calculator percentage is not your tax assessment.",
    h1: "Pakistan Freelancer Tax Guide",
    relatedTerms: ["Pakistan IT export tax", "FBR freelancer tax"],
    internalLinks: ["/freelancer-tax-calculator-pakistan", "/tax-guide/pakistan-it-export-tax"],
    conversion: "Review the tax calculator assumptions",
    metrics: "unverified",
  },
];
