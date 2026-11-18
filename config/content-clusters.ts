export type ContentCluster = {
  id: string;
  name: string;
  description: string;
  hub: string;
  paths: string[];
};

export const contentClusters: ContentCluster[] = [
  {
    id: "calculators",
    name: "Earnings calculators",
    description: "Interactive estimates that share one calculation sequence.",
    hub: "/calculator",
    paths: [
      "/",
      "/calculator",
      "/fiverr-fee-calculator",
      "/upwork-fee-calculator",
      "/payoneer-fee-calculator-pakistan",
      "/usd-to-pkr-calculator",
      "/freelancer-income-calculator",
      "/freelancer-tax-calculator-pakistan",
    ],
  },
  {
    id: "fiverr",
    name: "Fiverr in Pakistan",
    description: "Seller fees, withdrawals, payment methods, and earnings math.",
    hub: "/guides/fiverr-fees-pakistan",
    paths: [
      "/guides/fiverr-fees-pakistan",
      "/guides/fiverr-withdrawal-pakistan",
      "/guides/fiverr-earnings-calculation",
      "/guides/fiverr-payment-methods-pakistan",
      "/fiverr-fee-calculator",
    ],
  },
  {
    id: "upwork",
    name: "Upwork in Pakistan",
    description: "Contract fees, local-bank withdrawals, and earnings math.",
    hub: "/guides/upwork-fees-pakistan",
    paths: [
      "/guides/upwork-fees-pakistan",
      "/guides/upwork-withdrawal-pakistan",
      "/guides/upwork-earnings-calculation",
      "/guides/upwork-payment-methods-pakistan",
      "/upwork-fee-calculator",
    ],
  },
  {
    id: "payments",
    name: "Payoneer and currency",
    description: "Withdrawal charges and the difference between reference and payout rates.",
    hub: "/guides/payoneer-fees-pakistan",
    paths: [
      "/guides/payoneer-fees-pakistan",
      "/guides/payoneer-withdrawal-charges",
      "/guides/usd-to-pkr-conversion-guide",
      "/guides/freelancer-currency-conversion",
      "/payoneer-fee-calculator-pakistan",
      "/usd-to-pkr-calculator",
    ],
  },
  {
    id: "tax",
    name: "Pakistan freelancer tax",
    description: "Filer concepts, IT export context, and record keeping.",
    hub: "/tax-guide/pakistan-freelancer-tax",
    paths: [
      "/tax-guide/pakistan-freelancer-tax",
      "/tax-guide/fbr-active-filer-vs-non-filer",
      "/tax-guide/pakistan-it-export-tax",
      "/tax-guide/freelancer-tax-record-keeping",
      "/freelancer-tax-calculator-pakistan",
    ],
  },
  {
    id: "planning",
    name: "Income planning",
    description: "Published articles on comparing platforms and planning a month.",
    hub: "/blog",
    paths: [
      "/blog/how-to-calculate-freelance-income",
      "/blog/fiverr-vs-upwork-for-pakistani-freelancers",
      "/blog/how-to-receive-international-payments-in-pakistan",
      "/blog/freelancer-income-planning-pakistan",
      "/blog/how-to-withdraw-from-fiverr-to-a-pakistani-bank",
      "/blog/upwork-fees-explained",
      "/blog/payoneer-vs-direct-bank-transfer",
      "/freelancer-income-calculator",
    ],
  },
];
