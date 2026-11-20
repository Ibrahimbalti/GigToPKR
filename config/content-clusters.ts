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
    hub: "/fiverr-fee-calculator",
    paths: [
      "/",
      "/fiverr-fee-calculator",
      "/upwork-fee-calculator",
      "/payoneer-fee-calculator",
      "/freelancer-income-calculator",
      "/freelancer-tax-calculator",
    ],
  },
  {
    id: "fiverr",
    name: "Fiverr fees and payments",
    description: "Seller fees, withdrawals, payment methods, and earnings math.",
    hub: "/guides/fiverr-fees",
    paths: [
      "/guides/fiverr-fees",
      "/guides/fiverr-withdrawal",
      "/guides/fiverr-earnings-calculation",
      "/guides/fiverr-payment-methods",
      "/fiverr-fee-calculator",
    ],
  },
  {
    id: "upwork",
    name: "Upwork fees and payments",
    description: "Contract fees, local-bank withdrawals, and earnings math.",
    hub: "/guides/upwork-fees",
    paths: [
      "/guides/upwork-fees",
      "/guides/upwork-withdrawal",
      "/guides/upwork-earnings-calculation",
      "/guides/upwork-payment-methods",
      "/upwork-fee-calculator",
    ],
  },
  {
    id: "payments",
    name: "Payoneer and currency",
    description: "Withdrawal charges and the difference between reference and payout rates.",
    hub: "/guides/payoneer-fees",
    paths: [
      "/guides/payoneer-fees",
      "/guides/payoneer-withdrawal-charges",
      "/guides/currency-conversion-guide",
      "/guides/freelancer-currency-conversion",
      "/payoneer-fee-calculator",
    ],
  },
  {
    id: "tax",
    name: "Freelancer tax planning",
    description: "Local tax questions, exported services, and record keeping.",
    hub: "/tax-guide/freelancer-tax",
    paths: [
      "/tax-guide/freelancer-tax",
      "/tax-guide/tax-filing-status",
      "/tax-guide/it-export-tax",
      "/tax-guide/freelancer-tax-record-keeping",
      "/freelancer-tax-calculator",
    ],
  },
  {
    id: "planning",
    name: "Income planning",
    description: "Published articles on comparing platforms and planning a month.",
    hub: "/blog",
    paths: [
      "/blog/how-to-calculate-freelance-income",
      "/blog/fiverr-vs-upwork-for-freelancers",
      "/blog/how-to-receive-international-payments",
      "/blog/freelancer-income-planning",
      "/blog/how-to-withdraw-from-fiverr-to-a-bank",
      "/blog/upwork-fees-explained",
      "/blog/payoneer-vs-direct-bank-transfer",
      "/freelancer-income-calculator",
    ],
  },
];
