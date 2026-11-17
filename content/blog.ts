import { sourceLinks } from "@/content/sources";
import type { Article } from "@/types/content";

const published = "2026-11-17";

function post(
  entry: Omit<Article, "kind" | "publishedAt" | "updatedAt" | "path"> & { slug: string },
): Article {
  return {
    ...entry,
    kind: "blog",
    path: `/blog/${entry.slug}`,
    publishedAt: published,
    updatedAt: published,
  };
}

export const posts: Article[] = [
  post({
    slug: "how-to-calculate-freelance-income",
    title: "How to Calculate Freelance Income",
    description:
      "A monthly method for Pakistani freelancers: gross billings, platform fees, withdrawal, conversion, and a tax working paper.",
    h1: "How do I calculate freelance income for a month?",
    excerpt: "Add cleared orders, take off the fees you can document, and keep estimates in a separate column.",
    directAnswer:
      "List every order that cleared in the month. For each one, record gross USD, the platform fee from the statement, the withdrawal fee from the provider, the PKR that reached the bank, and any tax withheld. Use GigToPKR only for orders that have not paid out yet, and label those rows as estimates. A month is the sum of the bank column plus the still-unpaid estimates, not the sum of client budgets.",
    sections: [
      {
        id: "columns",
        heading: "Columns that keep a month honest",
        level: 2,
        blocks: [
          {
            type: "ol",
            items: [
              "Client or order id.",
              "Gross USD billed.",
              "Platform fee, copied from the earnings report.",
              "Withdrawal fee, copied from the provider, or marked 'estimate'.",
              "PKR credited, or blank if it has not arrived.",
              "Status: cleared, withdrawn, or estimated.",
            ],
          },
          {
            type: "p",
            text: "Pending Fiverr clearance is not income you can spend. Put it in the sheet so you do not forget it, and keep it out of the 'received' total. The income calculator on this site can project repeated similar orders. It cannot see which of last month's orders are still in clearing.",
          },
        ],
      },
      {
        id: "example",
        heading: "One order before it becomes a bank line",
        level: 2,
        blocks: [
          {
            type: "example",
            title: "Planning row for a $250 Fiverr order",
            orderAmountUsd: 250,
            platform: "fiverr",
            taxStatus: "filer",
          },
          {
            type: "p",
            text: "When the bank credit arrives, replace the estimated PKR with the statement amount. Leave the original estimate in a note if you want to see how far the assumptions drifted.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Should I include Connects and software in income?",
        answer:
          "No. Those are costs. Record them in an expense column. This calculator does not subtract business expenses other than the modeled platform and withdrawal fees.",
      },
    ],
    sources: [sourceLinks.fiverrEarnings, sourceLinks.upworkFee],
    related: [
      { href: "/freelancer-income-calculator", label: "Monthly income calculator" },
      { href: "/blog/freelancer-income-planning-pakistan", label: "Plan the month in PKR" },
      { href: "/tax-guide/freelancer-tax-record-keeping", label: "Records to keep" },
    ],
  }),
  post({
    slug: "fiverr-vs-upwork-for-pakistani-freelancers",
    title: "Fiverr vs Upwork for Pakistani Freelancers",
    description:
      "Compare the fee structures Pakistani freelancers actually have to model: Fiverr's earnings share and Upwork's contract-specific fee.",
    h1: "How do Fiverr and Upwork fees differ for Pakistani freelancers?",
    excerpt:
      "One publishes an 80% earnings share. The other publishes a 0% to 15% contract fee. The payout route is a second decision.",
    directAnswer:
      "Fiverr's help center describes an 80% freelancer share of the purchase amount. Upwork describes a freelancer service fee from 0% to 15% that is fixed on each contract and shown before you accept. Neither number is the amount a Pakistani bank will credit. Withdrawal method and the exchange rate come after. GigToPKR can run a 20% Fiverr assumption or a 10% Upwork assumption, then the same 2% withdrawal assumption, so the platform gap is visible.",
    sections: [
      {
        id: "fee-models",
        heading: "The fee models are not the same shape",
        level: 2,
        blocks: [
          {
            type: "table",
            caption: "What to read before comparing a $500 job",
            headers: ["Question", "Fiverr", "Upwork"],
            rows: [
              ["Where is the fee published?", "Earnings help: 80% share", "Offer: 0% to 15%"],
              ["What this site assumes", "20%", "10%, only as a midpoint"],
              ["Client-side fee", "Shown at the client's checkout", "Separate from the freelancer fee"],
              ["Documented local-bank withdrawal", "Check the methods on your account", "$0.99 Direct to Local Bank"],
              ["Company PKR account", "Check your withdrawal screen", "Upwork documents a restriction"],
            ],
          },
          {
            type: "p",
            text: "A $500 order is not automatically better on the platform with the smaller percentage. Upwork at 15% is close to Fiverr's 20% assumption. Upwork at 0% on a direct contract is a different product. Compare the offer you have, not the logo.",
          },
        ],
      },
      {
        id: "same-withdrawal",
        heading: "Hold the withdrawal model still, then change it",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "If both platforms would pay out through Payoneer, the calculator's shared 2% line is a fair comparison of the platform assumption. If Upwork would pay by local bank at $0.99, drop the 2% on that side. Otherwise the comparison punishes Upwork for a fee you would not pay.",
          },
          {
            type: "example",
            title: "Fiverr assumption at $500",
            orderAmountUsd: 500,
            platform: "fiverr",
            taxStatus: "filer",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Which platform pays more in Pakistan?",
        answer:
          "This site does not rank them. Your category, close rate, contract fee, and payout route decide the rupees. Run the two calculators with your own order size and the fee printed on the offer.",
      },
    ],
    sources: [sourceLinks.fiverrEarnings, sourceLinks.upworkFee, sourceLinks.upworkBank],
    related: [
      { href: "/fiverr-fee-calculator-pakistan", label: "Fiverr calculator" },
      { href: "/upwork-fee-calculator-pakistan", label: "Upwork calculator" },
      { href: "/guides/upwork-fees-pakistan", label: "Upwork fee guide" },
    ],
  }),
  post({
    slug: "how-to-receive-international-payments-in-pakistan",
    title: "Receive International Payments in Pakistan",
    description:
      "A clear path from a foreign client or marketplace to a Pakistani bank, without inventing a universal best provider.",
    h1: "How can freelancers receive international payments in Pakistan?",
    excerpt:
      "Marketplace balance, payout provider, and bank credit are three steps. Each one can charge you.",
    directAnswer:
      "A foreign client pays the marketplace or, on a direct contract, a provider you both can use. You then withdraw to a Pakistani bank through a method that provider offers in Pakistan. Fiverr and Upwork each control the methods on their own accounts. Payoneer is a common intermediate account, and Upwork also documents Direct to Local Bank. There is no single method this site can recommend for every freelancer, because eligibility is decided inside those accounts.",
    sections: [
      {
        id: "path",
        heading: "The path a payment actually takes",
        level: 2,
        blocks: [
          {
            type: "ol",
            items: [
              "The client pays the platform or invoice.",
              "The platform deducts its fee and may hold the balance through clearing.",
              "You withdraw through a listed method.",
              "The method converts to PKR or sends a currency your bank converts.",
              "The bank posts the credit and may deduct an incoming charge.",
            ],
          },
          {
            type: "p",
            text: "Skipping a step in the spreadsheet is how people double their expected salary. The calculator on this site is explicit about which of those steps it models and which it leaves out.",
          },
        ],
      },
      {
        id: "choose",
        heading: "Choose from the screen you have",
        level: 2,
        blocks: [
          {
            type: "ul",
            items: [
              "If Fiverr shows Payoneer, price that withdrawal from Payoneer's confirmation, not from a forum post.",
              "If Upwork shows Direct to Local Bank, start from the $0.99 help-page fee and then ask your bank about incoming charges.",
              "If a direct client wants to pay you, confirm the provider works for a person in Pakistan before you print it on an invoice.",
              "Keep the account name identical across the profile, the provider, and the bank.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Does GigToPKR move the money?",
        answer:
          "No. It is a calculator and a set of guides. It is not a payment institution and it does not hold balances.",
      },
    ],
    sources: [sourceLinks.fiverrHow, sourceLinks.upworkBankHow, sourceLinks.payoneerWithdraw, sourceLinks.sbp],
    related: [
      { href: "/guides/fiverr-payment-methods-pakistan", label: "Fiverr methods" },
      { href: "/guides/upwork-payment-methods-pakistan", label: "Upwork methods" },
      { href: "/guides/payoneer-withdrawal-charges", label: "Payoneer checklist" },
    ],
  }),
  post({
    slug: "freelancer-income-planning-pakistan",
    title: "Freelancer Income Planning in Pakistan",
    description:
      "Turn one calculated order into a cautious monthly plan, with room for a weaker exchange rate and a late clearance.",
    h1: "How can Pakistani freelancers plan income in PKR?",
    excerpt:
      "Plan from cleared money and a weaker rate. Treat the calculator's final figure as a ceiling, not a salary.",
    directAnswer:
      "Estimate one typical order with the calculator, multiply by the number of similar orders you can realistically deliver, then reduce the plan for two frictions: orders still in clearing, and a payout rate worse than the reference rate. The income calculator does the multiplication. It does not know your close rate or your clearing queue, so the cushion has to be yours.",
    sections: [
      {
        id: "cushion",
        heading: "Build a cushion on purpose",
        level: 2,
        blocks: [
          {
            type: "ul",
            items: [
              "Use the manual rate field and try a rate 2% to 3% weaker than today's reference. The gap is your FX cushion.",
              "Count only orders you have already won when you plan this month's spending.",
              "Leave clearing balances out of rent and payroll.",
              "Keep the illustrative tax line, then replace it when your adviser gives you a real figure.",
              "Put Connects, software, and chargebacks in an expense row the calculator does not see.",
            ],
          },
          {
            type: "example",
            title: "One $500 Upwork-shaped order before you multiply",
            orderAmountUsd: 500,
            platform: "upwork",
            taxStatus: "filer",
          },
        ],
      },
      {
        id: "salary",
        heading: "A freelance month is not a salary slip",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "The phrase 'freelancer salary' is common in search, and it is misleading. A salary is contracted and periodic. Marketplace income stops when the orders stop. Use the projection to set a spending ceiling for a good month, and a lower default for a thin month. The record checklist is what lets you see, after three months, whether the ceiling was fantasy.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "How many orders should I type into the monthly field?",
        answer:
          "Use orders you can deliver and collect, not the number you hope to pitch. The field accepts whole numbers up to 1,000 and multiplies the final PKR figure.",
      },
    ],
    sources: [sourceLinks.sbp, sourceLinks.fbr],
    related: [
      { href: "/freelancer-income-calculator", label: "Income calculator" },
      { href: "/blog/how-to-calculate-freelance-income", label: "Calculate a month" },
      { href: "/guides/usd-to-pkr-conversion-guide", label: "Understand the rate" },
    ],
  }),
];
