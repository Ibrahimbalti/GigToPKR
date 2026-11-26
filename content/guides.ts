import { sourceLinks } from "@/content/sources";
import type { Article } from "@/types/content";

const published = "2026-11-17";
const updated = "2026-11-27";

function guide(
  entry: Omit<Article, "kind" | "publishedAt" | "updatedAt" | "path"> & { slug: string },
): Article {
  return {
    ...entry,
    kind: "guide",
    path: `/guides/${entry.slug}`,
    publishedAt: published,
    updatedAt: updated,
  };
}

export const guides: Article[] = [
  guide({
    slug: "fiverr-fees",
    title: "Fiverr Fees Explained",
    description:
      "See which Fiverr fee comes out of a freelancer's order, which fee the client pays, and what this calculator assumes.",
    h1: "What fees do Fiverr freelancers pay?",
    excerpt:
      "Fiverr's help center says freelancers earn 80% of the purchase amount. The client pays a separate service fee.",
    directAnswer:
      "Fiverr's earnings help page says freelancers earn 80% of the purchase amount, including Gig Extras and tips. RealGigPay therefore uses a 20% platform-fee assumption. The service fee shown to a client at checkout is a different charge and, on Fiverr's description, is not deducted again from the freelancer's 80%.",
    sections: [
      {
        id: "seller-share",
        heading: "How much does Fiverr deduct from a freelancer?",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "On a $100 order, a 20% assumption is a $20 deduction and leaves $80 before any withdrawal fee, currency conversion, or tax. That is the figure this calculator uses. It matches the share described on Fiverr's earnings page at the time this guide was prepared, and it can change if Fiverr changes its terms.",
          },
          {
            type: "example",
            title: "A $100 Fiverr order with an illustrative tax assumption",
            orderAmountUsd: 100,
            platform: "fiverr",
            taxStatus: "filer",
          },
          {
            type: "note",
            text: "Optional costs such as Early Payout are not included. Fiverr has described Early Payout as a separate 1% option for eligible orders. Add that only if you actually use it.",
          },
        ],
      },
      {
        id: "buyer-fee",
        heading: "The client service fee is not your commission",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "Fiverr also shows a service fee to the person buying a Gig. That checkout fee is calculated on the client's payment. Do not subtract it a second time from the 80% share unless your own earnings screen shows a different deduction. The useful check is the net amount on your earnings page, not the total the client paid.",
          },
          {
            type: "ul",
            items: [
              "Start from the order price you set, including extras and tips that Fiverr includes in the 80% rule.",
              "Apply the platform share before estimating a withdrawal.",
              "Ignore the client's checkout fee unless Fiverr has posted it as a seller deduction.",
            ],
          },
        ],
      },
      {
        id: "after-fiverr",
        heading: "What still happens after the 20% assumption",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "Clearing time is not a fee, but it delays access to the balance. Fiverr has described a clearing period before earnings can be withdrawn, with shorter timing for some seller levels. After clearance, a Payoneer or bank withdrawal can cost something else. This calculator then assumes 2% of the post-platform amount for a Payoneer-style withdrawal. Your Payoneer screen can show a different percentage, a fixed fee, or an exchange rate that already includes a margin.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Does Fiverr's platform fee vary by country?",
        answer:
          "Fiverr's earnings share is described in its help center. Withdrawal methods, provider charges, currency conversion, and taxes can vary by account and country. Confirm the current fee in your Fiverr earnings screen and check the separate quote from your withdrawal provider.",
      },
      {
        question: "Should I subtract Fiverr's buyer service fee as well?",
        answer:
          "Not in this calculator. The buyer service fee is modeled as the client's cost. Subtracting it again would understate the freelancer's Fiverr balance.",
      },
      {
        question: "Is the calculator's result the amount Fiverr will pay?",
        answer:
          "No. It is an estimate from published assumptions plus a rate you supply or a labeled reference rate. The earnings page inside Fiverr is the record of that order.",
      },
    ],
    sources: [sourceLinks.fiverrEarnings, sourceLinks.fiverrHow],
    related: [
      { href: "/fiverr-fee-calculator", label: "Open the Fiverr calculator" },
      { href: "/guides/fiverr-withdrawal", label: "Fiverr withdrawals" },
      { href: "/guides/fiverr-earnings-calculation", label: "Calculate Fiverr earnings step by step" },
    ],
  }),
  guide({
    slug: "fiverr-withdrawal",
    title: "How to Withdraw Fiverr Earnings",
    description:
      "Separate Fiverr's commission from clearing time and the withdrawal charge that happens after earnings become available.",
    h1: "How do Fiverr withdrawals work?",
    excerpt:
      "Clearing time, the payout method, and the provider's fee are three different steps after the Fiverr commission.",
    directAnswer:
      "Fiverr first applies its earnings share and a clearing period. Withdrawal happens only after funds are available, through a method shown on your account. RealGigPay does not know which methods or fees apply to you, so its 2% withdrawal line is only an illustration. Check the provider's quote and use the rate and currency you were offered.",
    sections: [
      {
        id: "sequence",
        heading: "The withdrawal sequence",
        level: 2,
        blocks: [
          {
            type: "ol",
            items: [
              "The order is completed and Fiverr calculates your earnings share.",
              "The amount waits through the clearing period shown for that order.",
              "You choose a withdrawal method that Fiverr lists for your country and account.",
              "The provider converts currency, if needed, and may charge its own fee.",
              "Your bank posts the credit, which can differ by a small amount from the estimate.",
            ],
          },
        ],
      },
      {
        id: "payoneer-assumption",
        heading: "Where the 2% assumption enters",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "The 2% is applied to the amount left after the platform fee, not to the original order. On an $80 post-Fiverr balance, 2% is $1.60, leaving $78.40 before conversion. If Payoneer shows 1.2%, 3%, or a fixed fee, the calculator will not match the withdrawal. Use it to understand the shape of the deduction, then replace the percentage mentally or note the difference in your records.",
          },
          {
            type: "example",
            title: "Withdrawal assumption on a $500 Fiverr order",
            orderAmountUsd: 500,
            platform: "fiverr",
            taxStatus: "filer",
          },
        ],
      },
      {
        id: "checks",
        heading: "What to check before you confirm a withdrawal",
        level: 2,
        blocks: [
          {
            type: "ul",
            items: [
              "The available balance, not the pending clearing balance.",
              "The payout method name and currency.",
              "The fee shown on the confirmation screen.",
              "The exchange rate and the amount in your destination currency.",
              "The name on the bank account, which must match the receiving account.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Does clearing time reduce the amount?",
        answer:
          "Clearing delays when you can withdraw. It is not the same thing as the commission. A fee applies only if the program you use, such as an early-payout option, says so.",
      },
      {
        question: "Can I withdraw Fiverr earnings straight to my bank?",
        answer:
          "Use the methods listed in your Fiverr account. Availability changes by country and profile. This site does not keep a private list of enabled methods.",
      },
    ],
    sources: [sourceLinks.fiverrHow, sourceLinks.fiverrEarnings, sourceLinks.payoneerWithdraw],
    related: [
      { href: "/blog/how-to-withdraw-from-fiverr-to-a-bank", label: "Step-by-step Fiverr bank withdrawal tutorial" },
      { href: "/guides/fiverr-payment-methods", label: "Fiverr payment methods" },
      { href: "/guides/payoneer-withdrawal-charges", label: "Payoneer withdrawal charges" },
      { href: "/fiverr-fee-calculator", label: "Estimate a Fiverr order" },
    ],
  }),
  guide({
    slug: "fiverr-earnings-calculation",
    title: "How to Calculate Fiverr Earnings After Fees",
    description:
      "Walk through gross amount, Fiverr's assumed fee, Payoneer, conversion, and an illustrative tax line.",
    h1: "How do I calculate Fiverr earnings after fees?",
    excerpt: "Six steps take a Fiverr order from its gross amount to an estimated payout.",
    directAnswer:
      "Start with the order amount and subtract Fiverr's platform fee. Then subtract the withdrawal charge for the method you use, convert the remainder at your provider's quoted rate, and account for any applicable local tax separately. The site calculator uses a 2% withdrawal assumption and a specific currency pair; those figures are not a quote or tax assessment for every country.",
    sections: [
      {
        id: "formula",
        heading: "The formula in order",
        level: 2,
        blocks: [
          {
            type: "ol",
            items: [
              "Gross order amount = the price in USD.",
              "Platform fee = gross × 20%.",
              "After platform fee = gross − platform fee.",
              "Payoneer fee = after platform fee × 2%.",
              "Net USD = after platform fee − Payoneer fee.",
              "Payout currency amount = net USD × your quoted rate. Apply any local tax separately. Estimated payout = converted amount − applicable tax.",
            ],
          },
          {
            type: "example",
            title: "How much is $100 on Fiverr after these deductions?",
            orderAmountUsd: 100,
            platform: "fiverr",
            taxStatus: "filer",
          },
        ],
      },
      {
        id: "rounding",
        heading: "Why the lines add up",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "The calculator rounds displayed amounts to two decimal places and keeps the exchange rate to up to six decimals. Accounting and rounding conventions can vary by currency and jurisdiction, so use the amounts on your provider statement for final records.",
          },
        ],
      },
      {
        id: "mistakes",
        heading: "Common calculation mistakes",
        level: 2,
        blocks: [
          {
            type: "ul",
            items: [
              "Applying 2% to the original order instead of the post-Fiverr amount.",
              "Subtracting the client's service fee as well as the 20% share.",
              "Multiplying the gross amount by the exchange rate before taking fees.",
              "Treating an illustrative tax line as an assessment from your local tax authority.",
              "Using yesterday's reference rate when Payoneer already showed a different rate.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Can I calculate a decimal order such as $99.50?",
        answer:
          "Yes. The calculator accepts up to two decimal places and rejects negative amounts.",
      },
      {
        question: "What if my exchange rate has four decimals?",
        answer:
          "Enter it. Rates are kept to six decimal places, and the converted amount is rounded for display.",
      },
    ],
    sources: [sourceLinks.fiverrEarnings, sourceLinks.payoneerPricing],
    related: [
      { href: "/fiverr-fee-calculator", label: "Fiverr fee calculator" },
      { href: "/guides/currency-conversion-guide", label: "Currency conversion guide" },
      { href: "/guides/fiverr-fees", label: "Which Fiverr fee is which" },
    ],
  }),
  guide({
    slug: "fiverr-payment-methods",
    title: "Fiverr Payment Methods",
    description:
      "How to review the payout methods available on your Fiverr account and identify costs beyond the platform fee.",
    h1: "Which Fiverr payment methods can I use?",
    excerpt:
      "The methods that matter are the ones Fiverr lists on your account, not a general list copied from another country.",
    directAnswer:
      "Fiverr decides which withdrawal methods are available to each account. Availability can depend on account and country, so rely on the options shown in your own withdrawal screen. After choosing a method, check its fee, exchange rate, and destination currency separately from Fiverr's platform fee.",
    sections: [
      {
        id: "read-the-screen",
        heading: "Read the withdrawal screen, not a blog list",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "Payment partners, currencies, and minimums can vary by account and country. Before you plan income, write down the methods available in your Fiverr account, then check the provider's fee and the amount it quotes in your destination currency.",
          },
        ],
      },
      {
        id: "payoneer-role",
        heading: "Payoneer's role after Fiverr",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "If Payoneer is the method, Fiverr sends the cleared earnings toward that account and Payoneer later pays your bank. Those are two transfers. RealGigPay's 2% line represents only the second step, and only as an assumption. It does not represent Fiverr's commission, and it does not represent a rate Payoneer has promised this site.",
          },
          {
            type: "table",
            caption: "Costs that are easy to mix together",
            headers: ["Cost", "Who shows it", "In this calculator"],
            rows: [
              ["Freelancer earnings share", "Fiverr earnings page", "20% assumption"],
              ["Client service fee", "Client checkout", "Not deducted"],
              ["Withdrawal fee", "Payoneer or other provider", "2% assumption"],
              ["Exchange rate", "Provider or bank", "Your rate or a labeled reference"],
              ["Income tax", "Your local tax rules and return", "Illustrative assumption only"],
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Does RealGigPay connect to my Fiverr account?",
        answer:
          "No. Nothing is imported from Fiverr. You type the order amount.",
      },
      {
        question: "What should I save after a withdrawal?",
        answer:
          "Save the Fiverr earnings line, the provider confirmation, the rate, the fee, and the bank credit. The record-keeping guide lists a practical set.",
      },
    ],
    sources: [sourceLinks.fiverrHow, sourceLinks.payoneerWithdraw],
    related: [
      { href: "/guides/payoneer-fees", label: "Payoneer fees" },
      { href: "/tax-guide/freelancer-tax-record-keeping", label: "Freelance income records" },
      { href: "/fiverr-fee-calculator", label: "Fiverr calculator" },
    ],
  }),
  guide({
    slug: "upwork-fees",
    title: "Upwork Fees Explained",
    description:
      "Upwork publishes a 0% to 15% freelancer service fee that is fixed per contract. This calculator assumes 10%.",
    h1: "How much does Upwork charge freelancers?",
    excerpt:
      "Upwork displays a contract-specific service fee. Review the percentage shown for your contract before accepting it; withdrawal and currency-conversion costs are separate.",
    directAnswer:
      "Upwork's pricing and help pages describe a freelancer service fee from 0% to 15% of earnings, including bonuses. The percentage is shown on the proposal or offer and stays fixed once the contract starts. RealGigPay uses 10% only as a middle assumption so you can sketch a payment. If your offer says 5% or 15%, the sketch will be wrong until you adjust for that difference.",
    sections: [
      {
        id: "variable-fee",
        heading: "Why 10% is an assumption",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "Upwork's own example of a 10% contract is a teaching example, not a promise that your contract is 10%. A $500 billing at 10% leaves $450 after the service fee. At 5% it would leave $475. At 15% it would leave $425. Those gaps matter more than the later withdrawal fee. Read the fee on the offer before you use this estimate in a client quote.",
          },
          {
            type: "example",
            title: "A $500 Upwork payment at the 10% assumption",
            orderAmountUsd: 500,
            platform: "upwork",
            taxStatus: "filer",
          },
        ],
      },
      {
        id: "exceptions",
        heading: "Contracts that do not use the same fee",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "Upwork describes exceptions, including some payroll arrangements, Any Hire, and Direct Contracts brought by the freelancer. Enterprise relationships can also differ. If the contract is one of those, do not force it through the 10% line. The help article lists the exceptions and is the source to read, not a summary on this site.",
          },
        ],
      },
      {
        id: "not-the-withdrawal",
        heading: "The service fee is not the withdrawal fee",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "After Upwork's service fee, the withdrawal method adds another cost. Upwork's help pages describe flat-fee and provider-based methods, but availability, fees, and bank charges depend on your account and destination. This calculator's 2% line is only an example; record the method and fee shown to you.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Does the fee change after the contract starts?",
        answer:
          "Upwork says that once a proposal, offer, or contract is sent, that contract's fee is locked. A different contract can have a different fee.",
      },
      {
        question: "Are Connects the same as the service fee?",
        answer:
          "No. Connects are a cost of submitting proposals. This calculator does not subtract Connects. Track them as a business cost separately.",
      },
    ],
    sources: [sourceLinks.upworkFee, sourceLinks.upworkPricing, sourceLinks.upworkBank],
    related: [
      { href: "/upwork-fee-calculator", label: "Upwork calculator" },
      { href: "/blog/upwork-fees-explained", label: "Practical Upwork fee walkthrough" },
      { href: "/guides/upwork-withdrawal", label: "Upwork withdrawals" },
      { href: "/blog/fiverr-vs-upwork-for-freelancers", label: "Fiverr and Upwork fee models" },
    ],
  }),
  guide({
    slug: "upwork-withdrawal",
    title: "How to Withdraw Upwork Earnings",
    description:
      "Review the withdrawal methods on your account and compare their fees, timing, currency, and destination requirements.",
    h1: "How do Upwork withdrawals work?",
    excerpt:
      "Local-bank withdrawal pricing and a Payoneer percentage are different products. Do not treat them as the same fee.",
    directAnswer:
      "Upwork offers withdrawal methods with different charges, processing times, currencies, and eligibility requirements. These details can vary by account and destination. Check the current terms in your Upwork account and in the official help page for your selected method. RealGigPay's 2% line is an example assumption, not a quote for any specific withdrawal route.",
    sections: [
      {
        id: "local-bank",
        heading: "Direct to Local Bank",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "Some routes charge a flat fee while others apply a percentage or exchange-rate margin. A flat charge takes a larger share of a small withdrawal than a large one. A bank or intermediary may add a separate charge, and activation times vary. Review the fee and timing shown for your method before relying on it.",
          },
          {
            type: "ul",
            items: [
              "Match the bank account name to the name verified on Upwork.",
              "Enter bank codes carefully. A wrong code can delay or return the transfer.",
              "Eligibility can differ for personal and company accounts. Check the requirements for your account type and destination currency before adding a withdrawal method.",
              "If the money has not arrived after the stated window, contact the bank before opening a trace.",
            ],
          },
        ],
      },
      {
        id: "when-2-percent",
        heading: "When the 2% assumption is the wrong model",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "Use one withdrawal model: the flat fee or percentage shown for your selected route. Add any separate exchange-rate or receiving charges, but do not apply two withdrawal methods to the same transfer.",
          },
          {
            type: "example",
            title: "What the 2% model does to a $1,000 Upwork assumption",
            orderAmountUsd: 1000,
            platform: "upwork",
            taxStatus: "filer",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Is the withdrawal fee the whole cost of receiving money?",
        answer:
          "Not necessarily. Currency conversion, intermediary fees, and charges from the receiving bank can be separate. Check the final quote and your bank's terms for the destination currency.",
      },
      {
        question: "How long does a local-bank withdrawal take?",
        answer:
          "Processing estimates can exclude weekends, holidays, intermediary checks, or receiving-bank delays. Use the timeline shown for your method and contact support if a withdrawal passes its stated window.",
      },
    ],
    sources: [sourceLinks.upworkBank, sourceLinks.upworkBankHow],
    related: [
      { href: "/upwork-fee-calculator", label: "Upwork calculator" },
      { href: "/guides/upwork-payment-methods", label: "Upwork payment methods" },
      { href: "/guides/payoneer-withdrawal-charges", label: "Payoneer charges" },
    ],
  }),
  guide({
    slug: "upwork-earnings-calculation",
    title: "How to Calculate Upwork Earnings",
    description:
      "Apply the contract fee first, then the withdrawal route you actually use, then conversion and an illustrative tax line.",
    h1: "How do I calculate Upwork earnings after fees?",
    excerpt:
      "The contract fee comes first. The withdrawal method decides the next deduction. Conversion is last among the USD steps.",
    directAnswer:
      "Take the amount Upwork will bill and subtract the fee printed on that contract. Then subtract the withdrawal charge for your chosen method, convert the remainder at the rate you were quoted, and account for any applicable tax separately. The site calculator's 10% platform fee and 2% withdrawal fee are illustrative assumptions, not universal rates.",
    sections: [
      {
        id: "steps",
        heading: "A reliable order of operations",
        level: 2,
        blocks: [
          {
            type: "ol",
            items: [
              "Copy the fee percentage from the offer, not from memory.",
              "Subtract it from billings, including bonuses if Upwork includes them in the fee.",
              "Choose the withdrawal model shown for your method. Do not stack separate route fees as if both applied.",
              "Multiply the net dollars by the rate on the payout confirmation when you have it.",
              "Record the bank credit next to the estimate so the gap is visible.",
            ],
          },
          {
            type: "example",
            title: "$100 at the calculator's Upwork assumptions",
            orderAmountUsd: 100,
            platform: "upwork",
            taxStatus: "nonFiler",
          },
        ],
      },
      {
        id: "hourly",
        heading: "Hourly and fixed-price use the same fee base",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "Upwork says the freelancer service fee applies to earnings on hourly, fixed-price, and Project Catalog contracts, with the exceptions in its help article. A weekly hourly billing can be entered as the order amount. The calculator does not compute hours for you. Multiply rate × hours first, then paste the total.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "What about Upwork's rounding example?",
        answer:
          "Upwork shows that a 10% fee on an hourly contract can round by a cent or two. This calculator rounds half-up to the cent at each money step. A one-cent difference against Upwork's transaction report is a rounding difference, not a second fee.",
      },
    ],
    sources: [sourceLinks.upworkFee, sourceLinks.upworkBank],
    related: [
      { href: "/upwork-fee-calculator", label: "Upwork fee calculator" },
      { href: "/guides/upwork-fees", label: "How the Upwork fee is set" },
      { href: "/freelancer-income-calculator", label: "Project a month of orders" },
    ],
  }),
  guide({
    slug: "upwork-payment-methods",
    title: "Upwork Payment Methods",
    description:
      "Compare the withdrawal methods shown on your Upwork account, including their fees, timing, and destination requirements.",
    h1: "How can I receive Upwork payments?",
    excerpt:
      "Local bank and Payoneer solve different problems. The fee, the name on the account, and the currency all change the result.",
    directAnswer:
      "Upwork may show different withdrawal methods depending on account and destination. Each method can have its own fee, exchange rate, processing time, and account-type requirements. Add a method through Upwork, read the current instructions, and confirm the final fee before the first withdrawal.",
    sections: [
      {
        id: "choose",
        heading: "Choose the method from the fee you can see",
        level: 2,
        blocks: [
          {
            type: "table",
            caption: "Two common ways to think about the last mile",
            headers: ["Route", "Published charge to check", "Calculator behavior"],
            rows: [
              ["Direct to Local Bank", "Use the fee shown for your account", "Check bank and conversion charges separately"],
              ["Payoneer-style percentage", "Fee shown before you confirm", "2% assumption"],
              ["Another method on the account", "That method's screen", "Enter net USD only if you already deducted it"],
            ],
          },
          {
            type: "p",
            text: "Check that the account holder name and account type meet the requirements for your selected method. A rejected withdrawal can delay access to your funds while you update and reactivate the method.",
          },
        ],
      },
      {
        id: "records",
        heading: "Keep the method next to the calculation",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "Write the method name and quoted charge beside the estimate. A flat fee and a percentage can look similar in a spreadsheet if the column only says 'fees'. The tax record guide explains which documents to keep with that note.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Can I add a company bank account on Upwork?",
        answer:
          "Account-type and destination requirements can differ by withdrawal method. Check Upwork's current instructions for the method and currency you plan to use before adding a company account.",
      },
    ],
    sources: [sourceLinks.upworkBankHow, sourceLinks.upworkBank],
    related: [
      { href: "/guides/upwork-withdrawal", label: "Withdrawal timing and fees" },
      { href: "/blog/how-to-receive-international-payments", label: "Receiving international payments" },
      { href: "/upwork-fee-calculator", label: "Upwork calculator" },
    ],
  }),
  guide({
    slug: "payoneer-fees",
    title: "Payoneer Fees Explained",
    description:
      "Payoneer's public pricing lists a bank-withdrawal range. The calculator's 2% line sits inside that range and is still not your quote.",
    h1: "How much does Payoneer charge freelancers?",
    excerpt:
      "The fee that counts is the one Payoneer shows before you confirm. Public pricing is only a range.",
    directAnswer:
      "Payoneer fees can depend on the withdrawal route, currencies, and destination. Review the price shown in your account before confirming. RealGigPay uses a 2% withdrawal assumption for planning; it is not a quote or a country-specific tariff.",
    sections: [
      {
        id: "range",
        heading: "What the public price list does and does not say",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "Local-currency and cross-currency withdrawals can be priced differently, and receiving charges may be separate from the withdrawal fee. Currency conversion can also be reflected in the rate rather than listed as a separate percentage. A planning assumption and reference exchange rate can therefore differ from the amount Payoneer quotes.",
          },
          {
            type: "table",
            caption: "Public Payoneer items that freelancers mix up",
            headers: ["Item", "What the pricing page indicates", "Planning note"],
            rows: [
              ["Bank withdrawal", "About 1.2% to 4%, corridor specific", "Read the confirmation screen"],
              ["Card receipt from a client", "Up to 3.99% plus a fixed amount", "Not the marketplace payout"],
              ["Balance conversion", "A conversion fee can apply", "Separate from the bank fee"],
              ["Low activity", "An annual fee can apply below a threshold", "Not in this calculator"],
            ],
          },
        ],
      },
      {
        id: "assumption",
        heading: "How 2% is calculated here",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "The percentage is applied after Fiverr's or Upwork's assumed fee. It is not applied to the client's gross order, and it is not applied again after conversion. On $80 left after a Fiverr assumption, 2% is $1.60. If your screen says 3%, the extra cost on that $80 is $0.80. Adjust your expectation by that gap instead of trusting the default.",
          },
          {
            type: "example",
            title: "2% on the balance left from a $100 Fiverr assumption",
            orderAmountUsd: 100,
            platform: "fiverr",
            taxStatus: "filer",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Is the calculator's 2% assumption my Payoneer fee?",
        answer:
          "No. Two percent is this calculator's assumption. Payoneer's own page publishes a range and tells customers to rely on the fee shown in the account.",
      },
      {
        question: "Are receiving fees included?",
        answer:
          "No. Marketplace payouts can have their own receiving terms. The calculator starts from the order amount you type and does not add a separate Payoneer receiving fee.",
      },
    ],
    sources: [sourceLinks.payoneerPricing, sourceLinks.payoneerWithdraw],
    related: [
      { href: "/payoneer-fee-calculator", label: "Payoneer fee calculator" },
      { href: "/guides/payoneer-withdrawal-charges", label: "What to check on a withdrawal" },
      { href: "/guides/freelancer-currency-conversion", label: "How conversion is priced" },
    ],
  }),
  guide({
    slug: "payoneer-withdrawal-charges",
    title: "Payoneer Withdrawal Charges",
    description:
      "A practical checklist for the fee, rate, destination currency, and bank credit on a Payoneer withdrawal.",
    h1: "What should I check before a Payoneer withdrawal?",
    excerpt:
      "The confirmation screen is the quote. A calculator can only rehearse the arithmetic.",
    directAnswer:
      "Before you confirm, read four numbers: the balance leaving Payoneer, the fee in percent or currency, the exchange rate, and the amount expected at the destination. RealGigPay can rehearse a 2% fee and a rate you type. It cannot see Payoneer's quote, minimum fee, or any margin inside the rate.",
    sections: [
      {
        id: "checklist",
        heading: "Withdrawal checklist",
        level: 2,
        blocks: [
          {
            type: "ol",
            items: [
              "Confirm the bank account and that the name matches.",
              "Choose the balance currency you are withdrawing.",
              "Read the fee before you confirm. Write down both the percentage and any minimum.",
              "Read the rate separately from the fee. A 'free conversion' can still be a weaker rate.",
              "Compare the quoted destination amount with your estimate. The gap shows how the actual quote differs from the assumptions.",
              "After the credit arrives, save the bank SMS or statement next to the Payoneer PDF.",
            ],
          },
        ],
      },
      {
        id: "minimums",
        heading: "Minimum fees and small balances",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "Payoneer's pricing notes that some countries have a minimum withdrawal fee, in some cases up to about $20. A 2% model on a $30 balance is $0.60, which is not a minimum fee. If your corridor has a minimum, percentage math will look too optimistic on small withdrawals. The pricing page is the place to check the current wording.",
          },
        ],
      },
      {
        id: "timing",
        heading: "Timing is not a fee",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "Payoneer says many local-bank withdrawals arrive within a few business days, and some routes are faster. Timing does not change the formula. It does change when you can treat the money as received for a monthly plan. The income-planning article separates expected payments from cleared payments for that reason.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Should I withdraw the same day I get paid?",
        answer:
          "That is a cash-flow choice, not a rule of this site. Withdrawing immediately locks the rate you are shown. Waiting exposes you to a different rate and, if your account has a low-activity fee, to Payoneer's activity rules. Decide from the quote on the screen.",
      },
    ],
    sources: [sourceLinks.payoneerPricing, sourceLinks.payoneerWithdraw],
    related: [
      { href: "/payoneer-fee-calculator", label: "Try the 2% assumption" },
      { href: "/guides/payoneer-fees", label: "Payoneer's published range" },
    ],
  }),
  guide({
    slug: "currency-conversion-guide",
    title: "Reference vs. Payout Exchange Rates for Freelancers",
    description:
      "Compare central-bank and market reference exchange rates with commercial payout rates from Payoneer, Upwork, or your bank.",
    h1: "Reference exchange rates vs. provider payout rates",
    excerpt:
      "A reference rate and a payment provider's payout rate can differ. Use the quote for your own currency pair.",
    directAnswer:
      "Convert the net amount you will actually withdraw, not the gross order. Multiply it by the rate on your payout screen when available. Reference providers may not quote every currency pair, and the amount they show may differ from your provider's rate. Use a clearly labeled reference rate for planning or enter the rate from your own quote.",
    sections: [
      {
        id: "three-rates",
        heading: "Three rates that get confused",
        level: 2,
        blocks: [
          {
            type: "ul",
            items: [
              "A market reference, such as the open ExchangeRate-API quote this site can display.",
              "A rate published by a central bank or reference provider. It may not be the rate your bank or payout provider offers.",
              "The commercial rate inside a Payoneer, Upwork, or bank payout. This is the rate that hits your account.",
            ],
          },
          {
            type: "p",
            text: "Using a stronger reference rate makes an estimate look better and does not move your bank balance. When the payout screen is open, replace the reference rate. The calculator marks that entry as manual.",
          },
        ],
      },
      {
        id: "frankfurter",
        heading: "Why a reference rate may be unavailable",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "Some providers do not publish every currency pair or may temporarily fail to return a quote. Substituting another currency or reusing an old rate would create a misleading result. Use the rate from a source you trust or enter the payout quote manually.",
          },
          {
            type: "note",
            text: "A reference quote can be delayed, rounded, or unavailable. The time shown next to a live rate is the provider's timestamp when we have one. It is not a promise that the rate is still tradable.",
          },
        ],
      },
      {
        id: "worked",
        heading: "Where conversion sits in the earnings formula",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "Fees come off before conversion. Any tax estimate in a model may be applied at a different stage depending on local rules. Reversing the calculation steps changes the result, so confirm the method with a qualified local source.",
          },
          {
            type: "example",
            title: "Conversion after fees, not before",
            orderAmountUsd: 250,
            platform: "upwork",
            taxStatus: "filer",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Can I enter a manual exchange rate?",
        answer:
          "Yes. Editing the rate marks it as manual and keeps your number even if a later refresh fails. Use the live rate again only when you choose that control.",
      },
      {
        question: "Is a central-bank reference rate the one Payoneer uses?",
        answer:
          "Do not assume that. Compare the reference rate with the rate on your payout receipt, and record the receipt rate in your books.",
      },
    ],
    sources: [sourceLinks.frankfurter, sourceLinks.ecb, sourceLinks.exchangeRateApi],
    related: [
      { href: "/guides/freelancer-currency-conversion", label: "Record the rate you received" },
      { href: "/fiverr-fee-calculator", label: "Fiverr calculator" },
    ],
  }),
  guide({
    slug: "freelancer-currency-conversion",
    title: "How to Record Freelance Currency Conversions & Implied Rates",
    description:
      "How to record the amount sent, the destination currency credited, and the implied exchange rate in your freelance bookkeeping.",
    h1: "How to calculate and record your implied exchange rate",
    excerpt:
      "Store the commercial rate from the payout next to any reference rate you used for planning.",
    directAnswer:
      "Keep three numbers for every withdrawal: the amount sent, the amount received, and the implied rate (amount received divided by amount sent). That implied rate explains what reached your account. A reference rate is only for planning before the payout exists. The difference between the reference and payout rates is part of the practical conversion cost, whether or not the provider calls it a fee.",
    sections: [
      {
        id: "implied",
        heading: "Calculate the implied rate",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "If 78.40 units leave the provider and the bank credits 21,500 units of the destination currency, the implied rate is 21,500 / 78.40. Compare it with the reference quote from the same period. Record the amount actually credited, then use the rate you receive to improve the next estimate.",
          },
        ],
      },
      {
        id: "books",
        heading: "A simple record",
        level: 2,
        blocks: [
          {
            type: "table",
            caption: "Fields worth keeping on each payout",
            headers: ["Field", "Example of what belongs there"],
            rows: [
              ["Platform and order", "Fiverr order, gross USD 100"],
              ["Platform fee", "The earnings-page deduction"],
              ["Provider", "Payoneer withdrawal confirmation"],
              ["USD sent", "The amount leaving the provider"],
              ["Destination currency credited", "The bank statement line"],
              ["Implied rate", "Amount received divided by amount sent"],
              ["Reference rate used earlier", "Optional planning note"],
            ],
          },
        ],
      },
      {
        id: "planning",
        heading: "Use a worse rate for plans, not for history",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "For a quote you are sending a client, a slightly weaker rate builds a cushion. For the books, use the credited amount. Mixing the two makes a tax working paper disagree with the bank. The record-keeping guide separates working papers from the documents you actually received.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Should I convert at the rate on the day the client paid?",
        answer:
          "For cash planning, the day you withdraw is the day the rate is locked by the provider. The client's payment date can be days earlier. Label which date you used.",
      },
    ],
    sources: [sourceLinks.payoneerWithdraw, sourceLinks.exchangeRateApi],
    related: [
      { href: "/guides/currency-conversion-guide", label: "Reference rates versus payout rates" },
      { href: "/tax-guide/freelancer-tax-record-keeping", label: "What records to keep" },
    ],
  }),
];
