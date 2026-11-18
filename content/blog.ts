import { sourceLinks } from "@/content/sources";
import type { Article } from "@/types/content";

const published = "2026-11-17";

function post(
  entry: Omit<Article, "kind" | "publishedAt" | "updatedAt" | "path"> & {
    slug: string;
    publishedAt?: string;
  },
): Article {
  const date = entry.publishedAt ?? published;
  return {
    ...entry,
    kind: "blog",
    path: `/blog/${entry.slug}`,
    publishedAt: date,
    updatedAt: date,
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
      "List every order that cleared in the month. For each one, record gross USD, the platform fee from the statement, the withdrawal fee from the provider, the PKR that reached the bank, and any tax withheld. Use RealGigPay only for orders that have not paid out yet, and label those rows as estimates. A month is the sum of the bank column plus the still-unpaid estimates, not the sum of client budgets.",
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
      "Fiverr's help center describes an 80% freelancer share of the purchase amount. Upwork describes a freelancer service fee from 0% to 15% that is fixed on each contract and shown before you accept. Neither number is the amount a Pakistani bank will credit. Withdrawal method and the exchange rate come after. RealGigPay can run a 20% Fiverr assumption or a 10% Upwork assumption, then the same 2% withdrawal assumption, so the platform gap is visible.",
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
        question: "Does RealGigPay move the money?",
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
  post({
    slug: "how-to-withdraw-from-fiverr-to-a-pakistani-bank",
    publishedAt: "2026-11-19",
    title: "Withdraw Fiverr Earnings to a Pakistani Bank",
    description:
      "Follow a cleared Fiverr balance into a Pakistani bank account, and read the withdrawal fee on the confirmation screen before you accept it.",
    h1: "How do you withdraw Fiverr earnings to a Pakistani bank?",
    excerpt: "Clearance, a payout method, and the fee on the confirmation screen are three different steps.",
    directAnswer:
      "Wait until Fiverr marks the order as cleared, open the withdrawal methods on your account, and send the balance through a method Fiverr offers you in Pakistan. Payoneer is a common route into a local bank. The fee is the number on the confirmation screen, not a fixed 2%. RealGigPay can sketch the rupees with a withdrawal percentage you type, and it does not move the money.",
    sections: [
      {
        id: "clearing",
        heading: "Clearing is not the same as a bank credit",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "A completed order can still sit in clearing. Fiverr's own help pages describe how earnings become available, and that schedule is the one on your account, not a number copied from a forum. Until the balance is available to withdraw, a Pakistani bank has nothing to credit. Put pending orders in a separate column of your sheet so rent is not planned from money that has not cleared.",
          },
          {
            type: "p",
            text: "Early payout, where Fiverr offers it, is a different product from the standard clearance. This site does not publish an early-payout percentage. If the option appears, type the fee Fiverr shows into the calculator's early-payout field. Leaving that field at zero means you are modelling the ordinary path.",
          },
        ],
      },
      {
        id: "route",
        heading: "Pick the method the account actually lists",
        level: 2,
        blocks: [
          {
            type: "ol",
            items: [
              "Open Fiverr's withdrawal screen and list only the methods shown for your account.",
              "If Payoneer is listed, continue into Payoneer and read the bank-withdrawal fee before you confirm. Public pricing has described a range of about 1.2% to 4%, and the confirmation screen wins.",
              "Match the name on Fiverr, the payout provider, and the Pakistani bank account.",
              "After the credit arrives, replace the calculator's estimate with the PKR figure on the bank statement.",
            ],
          },
          {
            type: "p",
            text: "A 2% withdrawal field is only a starting point so the form is not blank. Change it to the percentage you are about to accept. Currency conversion is a second charge: the rate Payoneer or the bank applies can differ from the reference rate on this site. Type the rate from the payout screen when you have it.",
          },
          {
            type: "example",
            title: "A $250 Fiverr order before the bank credit",
            orderAmountUsd: 250,
            platform: "fiverr",
            taxStatus: "filer",
          },
        ],
      },
      {
        id: "after",
        heading: "What to keep after the transfer",
        level: 2,
        blocks: [
          {
            type: "ul",
            items: [
              "The Fiverr earnings line for the order, including the platform fee.",
              "The payout confirmation, including the fee and the rate.",
              "The bank SMS or statement showing the PKR credit.",
              "A note if you used an early-payout option and what percentage it charged.",
            ],
          },
          {
            type: "p",
            text: "Those four records are what let you see whether the estimate was close. The calculator cannot see your clearing queue, your Payoneer corridor, or an incoming bank charge. Treat the final PKR figure as a plan, then overwrite it.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Does RealGigPay send Fiverr earnings to a bank?",
        answer:
          "No. It estimates an order from the percentages you enter. The withdrawal itself happens inside Fiverr and the payout method on your account.",
      },
      {
        question: "Should I leave the withdrawal fee at 2%?",
        answer:
          "Only as a sketch. Replace 2% with the fee on the Payoneer or bank confirmation screen before you rely on the rupee figure.",
      },
    ],
    sources: [sourceLinks.fiverrEarnings, sourceLinks.fiverrHow, sourceLinks.payoneerWithdraw, sourceLinks.payoneerPricing],
    related: [
      { href: "/guides/fiverr-withdrawal-pakistan", label: "Fiverr withdrawal guide" },
      { href: "/fiverr-fee-calculator-pakistan", label: "Fiverr calculator" },
      { href: "/guides/payoneer-withdrawal-charges", label: "Payoneer checklist" },
    ],
  }),
  post({
    slug: "upwork-fees-explained",
    publishedAt: "2026-11-19",
    title: "Upwork Fees Explained for Pakistani Freelancers",
    description:
      "Upwork's freelancer service fee is 0% to 15% on the contract, not a Pakistan tariff. Here is how to put that fee into a PKR estimate.",
    h1: "How do Upwork fees work for a freelancer in Pakistan?",
    excerpt: "Read the percentage on the offer, then decide whether the payout is a percent or the $0.99 local-bank fee.",
    directAnswer:
      "Upwork describes a freelancer service fee from 0% to 15% that is fixed on each contract and shown before you accept. It is not a single Pakistan rate. A 10% field is only a midpoint for sketching. Direct to Local Bank is documented at $0.99, which is a flat fee rather than a percentage. Put the contract fee and the payout fee into the calculator separately, then convert what remains at the rate you will actually receive.",
    sections: [
      {
        id: "contract-fee",
        heading: "The contract fee comes first",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "The fee that matters is the one printed on the proposal or the offer. Upwork's help centre describes a range from 0% to 15%, and that percentage stays with the contract. A 0% direct contract and a 15% marketplace contract are different products. Comparing them by the Upwork logo alone hides the gap. The calculator's Upwork buttons are 0%, 5%, 10%, and 15% so you can select the band, and the percentage field still accepts another number if the offer shows one.",
          },
          {
            type: "p",
            text: "Hourly contracts use the same fee on the amount you bill. Multiply the hourly rate by the hours first, then apply the contract percentage. The hourly toggle on the calculator does that multiplication and leaves the fee as its own line. It does not know which hours Upwork has already approved.",
          },
        ],
      },
      {
        id: "payout",
        heading: "The payout fee is a second choice",
        level: 2,
        blocks: [
          {
            type: "table",
            caption: "Two payout shapes Pakistani freelancers actually compare",
            headers: ["Payout", "What to type", "What not to assume"],
            rows: [
              ["Payoneer or another percentage method", "The percentage on the confirmation screen", "That 2% is your corridor"],
              ["Direct to Local Bank", "The $0.99 flat fee, or the figure on the screen", "That a percentage applies as well"],
              ["Another bank route", "The fee the screen shows, in percent or as a flat amount", "A fee copied from a different provider"],
            ],
          },
          {
            type: "p",
            text: "Turning on the $0.99 toggle sets the withdrawal percentage to zero and adds the flat dollar fee. If your screen shows both a percentage and a flat fee, type both. If it shows only the flat fee, leave the percentage at zero. Upwork's help page is the source for the $0.99 figure, and your withdrawal screen is the source for the transfer you are about to make.",
          },
          {
            type: "example",
            title: "A $500 order at the 10% default",
            orderAmountUsd: 500,
            platform: "upwork",
            taxStatus: "filer",
          },
        ],
      },
      {
        id: "rupees",
        heading: "Convert after both fees",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "The rupees are the net amount times the rate, minus whatever tax percentage you choose to set aside. The 1% and 2% buttons are illustrations so the line is visible. They are not FBR rates. Replace them when you have a figure from a current rule or from your adviser, and keep the date of that source next to the sheet. A reference exchange rate is not the rate Upwork, Payoneer, or the bank will apply, so the rate field stays editable and shows when the reference quote was last retrieved.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Is 10% the Upwork fee in Pakistan?",
        answer:
          "No. Ten percent is the default in this calculator because it sits inside the published 0% to 15% range. Use the percentage on your contract.",
      },
      {
        question: "Does Direct to Local Bank cost 2% as well as $0.99?",
        answer:
          "Upwork's help page documents a $0.99 fee for that method. Do not also subtract a Payoneer-style percentage unless your screen shows one.",
      },
    ],
    sources: [sourceLinks.upworkFee, sourceLinks.upworkPricing, sourceLinks.upworkBank],
    related: [
      { href: "/upwork-fee-calculator-pakistan", label: "Upwork calculator" },
      { href: "/guides/upwork-fees-pakistan", label: "Upwork fee guide" },
      { href: "/guides/upwork-payment-methods-pakistan", label: "Upwork payout methods" },
    ],
  }),
  post({
    slug: "payoneer-vs-direct-bank-transfer",
    publishedAt: "2026-11-19",
    title: "Payoneer vs Direct Bank Transfer",
    description:
      "Compare a percentage withdrawal such as Payoneer with Upwork's flat $0.99 local-bank fee before you decide which route to model.",
    h1: "How should freelancers compare Payoneer with a direct bank transfer?",
    excerpt: "One route is usually a percentage. The other can be a flat fee. They are not interchangeable lines in a spreadsheet.",
    directAnswer:
      "Payoneer-style bank withdrawals are priced as a percentage of the amount you send, and Payoneer's public range is about 1.2% to 4% depending on the corridor. Upwork's Direct to Local Bank is documented as a $0.99 flat fee. A fair comparison uses the same order, the same platform fee, and then only the payout fee you would actually pay. RealGigPay lets you type the percentage, switch on the flat dollar fee, and read both results in PKR.",
    sections: [
      {
        id: "shapes",
        heading: "The two fees are different shapes",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "A percentage fee grows with the order. A flat fee does not. On a small order the flat $0.99 can be the larger bite. On a large order a 2% or 3% Payoneer withdrawal can cost more dollars than $0.99. That is why a single 'best payout method' sentence is not useful. Run the order you actually have, twice, and change only the withdrawal line.",
          },
          {
            type: "ul",
            items: [
              "First pass: withdrawal method Payoneer, percentage set to the confirmation-screen fee, flat fee off.",
              "Second pass: direct to local bank, withdrawal percentage 0, flat fee $0.99 or the amount on the screen.",
              "Keep the platform fee, the tax percentage, and the PKR rate the same so the gap is only the payout.",
            ],
          },
          {
            type: "p",
            text: "Wise and other bank transfers belong in the same test. Their default in the form is 0% because this site will not invent a Wise tariff. Type the fee the provider shows. If the provider charges both a percentage and a fixed amount, use both fields.",
          },
        ],
      },
      {
        id: "currency",
        heading: "Currency is part of the comparison",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "An order billed in euros, pounds, or dirhams is not a dollar order with a different symbol. The calculator accepts USD, EUR, GBP, and AED, and it asks for PKR per one unit of that currency. The reference feed supplies a cross rate when it can. If the feed fails, the last successful quote is shown and labelled as such. If there has never been a successful quote, the rate box stays empty rather than filling in a made-up number. The $0.99 fee is still in dollars, so a non-dollar order needs a cross rate before that flat fee can be converted.",
          },
          {
            type: "p",
            text: "You can also run the form backwards. Enter the PKR you want in the bank and the form solves for the order amount that still reaches it after the fees you typed. That is a pricing aid, not a promise that the client will pay it or that the bank will use the same rate.",
          },
        ],
      },
      {
        id: "share",
        heading: "Keep the comparison",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "Copy the result link if you want to reopen the same percentages later or send the sketch to an accountant. The link stores the inputs, not a locked payout. When the bank credit arrives, write the real PKR next to the estimate and note the date of the rate you used. The page shows when the reference rates were last updated so that date is not something you have to remember.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Which method pays more in Pakistan?",
        answer:
          "It depends on the order size and the fee on your screen. Compare them with the same platform fee and the same PKR rate, then change only the withdrawal line.",
      },
      {
        question: "Can I model euros or pounds?",
        answer:
          "Yes. Choose EUR, GBP, or AED and enter how many rupees you get for one unit, or use the reference rate when it loads.",
      },
    ],
    sources: [sourceLinks.payoneerPricing, sourceLinks.upworkBank, sourceLinks.payoneerWithdraw, sourceLinks.sbp],
    related: [
      { href: "/payoneer-fee-calculator-pakistan", label: "Payoneer calculator" },
      { href: "/guides/payoneer-fees-pakistan", label: "Payoneer fees" },
      { href: "/blog/upwork-fees-explained", label: "Upwork fees explained" },
    ],
  }),
];
