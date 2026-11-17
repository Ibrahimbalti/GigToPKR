import { sourceLinks } from "@/content/sources";
import type { Article } from "@/types/content";

const published = "2026-11-17";

function guide(
  entry: Omit<Article, "kind" | "publishedAt" | "updatedAt" | "path"> & { slug: string },
): Article {
  return {
    ...entry,
    kind: "guide",
    path: `/guides/${entry.slug}`,
    publishedAt: published,
    updatedAt: published,
  };
}

export const guides: Article[] = [
  guide({
    slug: "fiverr-fees-pakistan",
    title: "Fiverr Fees in Pakistan Explained",
    description:
      "See which Fiverr fee comes out of a freelancer's order, which fee the client pays, and what this calculator assumes.",
    h1: "What Fiverr fees apply to freelancers in Pakistan?",
    excerpt:
      "Fiverr's help center says freelancers earn 80% of the purchase amount. The client pays a separate service fee.",
    directAnswer:
      "Fiverr's earnings help page says freelancers earn 80% of the purchase amount, including Gig Extras and tips. GigToPKR therefore uses a 20% platform-fee assumption. The service fee shown to a client at checkout is a different charge and, on Fiverr's description, is not deducted again from the freelancer's 80%.",
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
            title: "A $100 Fiverr order with the active-filer illustration",
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
        question: "Does Fiverr take 20% in Pakistan specifically?",
        answer:
          "The 80% earnings description on Fiverr's help center is not written as a Pakistan-only rate. Country still matters for the withdrawal methods and local taxes that come after Fiverr's commission. Confirm both screens: Fiverr earnings and the withdrawal provider.",
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
      { href: "/fiverr-fee-calculator-pakistan", label: "Open the Fiverr calculator" },
      { href: "/guides/fiverr-withdrawal-pakistan", label: "Fiverr withdrawals in Pakistan" },
      { href: "/guides/fiverr-earnings-calculation", label: "Calculate Fiverr earnings step by step" },
    ],
  }),
  guide({
    slug: "fiverr-withdrawal-pakistan",
    title: "Withdraw Fiverr Earnings in Pakistan",
    description:
      "Separate Fiverr's commission from clearing time and the withdrawal charge that happens after earnings become available.",
    h1: "How do Fiverr withdrawals work for Pakistani freelancers?",
    excerpt:
      "Clearing time, the payout method, and the provider's fee are three different steps after the Fiverr commission.",
    directAnswer:
      "Fiverr first applies its own earnings share and a clearing period. Withdrawal happens only after funds are available, through a method your account actually offers. Many freelancers in Pakistan use Payoneer. GigToPKR does not know your enabled methods, so it applies a 2% withdrawal assumption after the platform fee and asks you to replace the exchange rate with the rate you were quoted.",
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
              "The exchange rate and the PKR amount you are expected to receive.",
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
        question: "Can I withdraw Fiverr earnings straight to a Pakistani bank?",
        answer:
          "Use the methods listed in your Fiverr account. Availability changes by country and profile. This site does not keep a private list of enabled methods.",
      },
    ],
    sources: [sourceLinks.fiverrHow, sourceLinks.fiverrEarnings, sourceLinks.payoneerWithdraw],
    related: [
      { href: "/guides/fiverr-payment-methods-pakistan", label: "Fiverr payment methods" },
      { href: "/guides/payoneer-withdrawal-charges", label: "Payoneer withdrawal charges" },
      { href: "/fiverr-fee-calculator-pakistan", label: "Estimate a Fiverr order" },
    ],
  }),
  guide({
    slug: "fiverr-earnings-calculation",
    title: "How to Calculate Fiverr Earnings in PKR",
    description:
      "Walk through gross amount, Fiverr's assumed fee, Payoneer, conversion, and an illustrative tax line.",
    h1: "How do I calculate Fiverr earnings in Pakistan?",
    excerpt: "Six steps take a Fiverr order from US dollars to an estimated PKR bank deposit.",
    directAnswer:
      "Start with the order amount in USD. Subtract a 20% Fiverr assumption, then 2% of what remains for the Payoneer assumption, convert that net amount at your USD/PKR rate, and subtract the illustrative tax percentage from the rupee amount. The calculator does those steps in that order and rounds each money line half-up to two decimals.",
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
              "PKR amount = net USD × your rate. Illustrative tax is a percentage of that PKR amount. Final deposit = PKR amount − illustrative tax.",
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
            text: "Each fee is rounded half-up to the cent before the next subtraction. A $10.03 order at 20% produces a $2.01 fee because $2.006 rounds to $2.01. The rupee conversion is also rounded to two decimals. The exchange rate itself can keep up to six decimals.",
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
              "Multiplying the gross USD amount by the PKR rate and only then taking fees.",
              "Treating the illustrative 1% tax line as an FBR assessment.",
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
          "Enter it. Rates are kept to six decimal places and only the converted rupee amount is rounded to paisa.",
      },
    ],
    sources: [sourceLinks.fiverrEarnings, sourceLinks.payoneerPricing],
    related: [
      { href: "/fiverr-fee-calculator-pakistan", label: "Fiverr fee calculator" },
      { href: "/guides/usd-to-pkr-conversion-guide", label: "USD to PKR conversion guide" },
      { href: "/guides/fiverr-fees-pakistan", label: "Which Fiverr fee is which" },
    ],
  }),
  guide({
    slug: "fiverr-payment-methods-pakistan",
    title: "Fiverr Payment Methods in Pakistan",
    description:
      "How to read the payout methods Fiverr shows a Pakistani freelancer, and which costs sit outside the platform fee.",
    h1: "Which Fiverr payment methods can freelancers in Pakistan use?",
    excerpt:
      "The methods that matter are the ones Fiverr lists on your account, not a general list copied from another country.",
    directAnswer:
      "Fiverr decides the withdrawal methods available to each account. Pakistani freelancers often withdraw through Payoneer, but the presence of a method has to be confirmed on the withdrawal screen. PayPal or local-bank options should be treated as available only when Fiverr shows them for that profile. After the method is chosen, the provider's fee and exchange rate are separate from Fiverr's 20% earnings share.",
    sections: [
      {
        id: "read-the-screen",
        heading: "Read the withdrawal screen, not a blog list",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "Payment partners, currencies, and minimums change. A method that works for one seller level or country can be missing on another account. Before you plan a month of income, open Fiverr and write down the methods you can actually select. Then open the provider and write down the fee and the PKR amount it quotes.",
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
            text: "If Payoneer is the method, Fiverr sends the cleared earnings toward that account and Payoneer later pays your bank. Those are two transfers. GigToPKR's 2% line represents only the second step, and only as an assumption. It does not represent Fiverr's commission, and it does not represent a rate Payoneer has promised this site.",
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
              ["Income tax", "FBR rules and your return", "1% or 2% illustration"],
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Does GigToPKR connect to my Fiverr account?",
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
      { href: "/guides/payoneer-fees-pakistan", label: "Payoneer fees in Pakistan" },
      { href: "/tax-guide/freelancer-tax-record-keeping", label: "Freelance income records" },
      { href: "/fiverr-fee-calculator-pakistan", label: "Fiverr calculator" },
    ],
  }),
  guide({
    slug: "upwork-fees-pakistan",
    title: "Upwork Fees for Pakistani Freelancers",
    description:
      "Upwork publishes a 0% to 15% freelancer service fee that is fixed per contract. This calculator assumes 10%.",
    h1: "How much does Upwork charge freelancers in Pakistan?",
    excerpt:
      "The fee is not a single Pakistan rate. Upwork shows a contract-specific percentage from 0% to 15%.",
    directAnswer:
      "Upwork's pricing and help pages describe a freelancer service fee from 0% to 15% of earnings, including bonuses. The percentage is shown on the proposal or offer and stays fixed once the contract starts. GigToPKR uses 10% only as a middle assumption so you can sketch a payment. If your offer says 5% or 15%, the sketch will be wrong until you adjust for that difference.",
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
            text: "After Upwork's fee, getting money into a Pakistani bank is another step. Direct to Local Bank is documented at $0.99 per withdrawal, plus any charge your bank adds. This calculator still applies a 2% Payoneer-style assumption because that is its published model. If you use the $0.99 route, the 2% line overstates a small withdrawal and understates nothing about the service fee. Note the route you actually use.",
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
      { href: "/upwork-fee-calculator-pakistan", label: "Upwork calculator" },
      { href: "/guides/upwork-withdrawal-pakistan", label: "Upwork withdrawals" },
      { href: "/blog/fiverr-vs-upwork-for-pakistani-freelancers", label: "Fiverr and Upwork fee models" },
    ],
  }),
  guide({
    slug: "upwork-withdrawal-pakistan",
    title: "Withdraw Upwork Earnings in Pakistan",
    description:
      "Upwork documents a $0.99 Direct to Local Bank withdrawal. Compare that with this calculator's 2% assumption.",
    h1: "How do Upwork withdrawals to Pakistan work?",
    excerpt:
      "Local-bank withdrawal pricing and a Payoneer percentage are different products. Do not treat them as the same fee.",
    directAnswer:
      "Upwork's Direct to Local Bank help page lists a withdrawal cost of $0.99, says funds generally arrive within four business days, and warns that a bank may add its own charge. It also says Upwork cannot accommodate company registrations for PKR bank accounts. GigToPKR's 2% line is a Payoneer-style assumption, not a reproduction of the $0.99 local-bank fee.",
    sections: [
      {
        id: "local-bank",
        heading: "Direct to Local Bank",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "For a personal PKR account that Upwork accepts, the documented platform charge is a flat $0.99 per withdrawal. A $1,000 payment is barely changed by $0.99. A $50 payment feels the flat fee more. Sending funds in local currency may reduce incoming bank fees, but the bank can still charge. Upwork says a new withdrawal method becomes active in three days.",
          },
          {
            type: "ul",
            items: [
              "Match the bank account name to the name verified on Upwork.",
              "Enter bank codes carefully. A wrong code can delay or return the transfer.",
              "Company PKR accounts are specifically restricted in Upwork's help article.",
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
            text: "Use the calculator's 2% line only when you are modeling a percentage withdrawal such as a Payoneer bank withdrawal. If the confirmation screen says $0.99, subtract $0.99 from the post-fee USD amount instead. Mixing both, a 10% service fee and then 2% and then $0.99, double-counts the withdrawal.",
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
        question: "Is $0.99 the whole cost of receiving rupees?",
        answer:
          "It is the withdrawal charge Upwork documents for that method. The exchange rate and your bank's incoming charge are extra. Ask the bank if an incoming international or local-currency credit has a fee.",
      },
      {
        question: "How long does a local-bank withdrawal take?",
        answer:
          "Upwork says withdrawals should arrive within four days, and that a trace can be requested after eight business days. Bank holidays in Pakistan can sit outside that description.",
      },
    ],
    sources: [sourceLinks.upworkBank, sourceLinks.upworkBankHow],
    related: [
      { href: "/upwork-fee-calculator-pakistan", label: "Upwork calculator" },
      { href: "/guides/upwork-payment-methods-pakistan", label: "Upwork payment methods" },
      { href: "/guides/payoneer-withdrawal-charges", label: "Payoneer charges" },
    ],
  }),
  guide({
    slug: "upwork-earnings-calculation",
    title: "How to Calculate Upwork Earnings",
    description:
      "Apply the contract fee first, then the withdrawal route you actually use, then conversion and an illustrative tax line.",
    h1: "How do I calculate Upwork earnings in PKR?",
    excerpt:
      "The contract fee comes first. The withdrawal method decides the next deduction. Conversion is last among the USD steps.",
    directAnswer:
      "Take the amount Upwork will bill. Subtract the fee printed on that contract. Then subtract the withdrawal charge for the method you use: $0.99 for documented Direct to Local Bank, or a percentage if you withdraw through a provider that charges one. Convert the remainder at the rate you were quoted, and keep tax as a separate rupee estimate. This site's calculator can run the 10% plus 2% version of that story automatically.",
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
              "Choose one withdrawal model. Do not stack $0.99 and 2%.",
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
      { href: "/upwork-fee-calculator-pakistan", label: "Upwork fee calculator" },
      { href: "/guides/upwork-fees-pakistan", label: "How the Upwork fee is set" },
      { href: "/freelancer-income-calculator", label: "Project a month of orders" },
    ],
  }),
  guide({
    slug: "upwork-payment-methods-pakistan",
    title: "Upwork Payment Methods in Pakistan",
    description:
      "Compare Direct to Local Bank with a Payoneer-style withdrawal, including the PKR company-account restriction Upwork documents.",
    h1: "How can Pakistani freelancers receive Upwork payments?",
    excerpt:
      "Local bank and Payoneer solve different problems. The fee, the name on the account, and the currency all change the result.",
    directAnswer:
      "Upwork documents Direct to Local Bank at $0.99 per withdrawal and says company registrations for PKR accounts are not accommodated. Other methods, including Payoneer where it is offered on the account, have their own fees and rates. Add a method only from inside Upwork, wait for the activation window it describes, and confirm the fee before the first real withdrawal.",
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
              ["Direct to Local Bank", "$0.99 plus any bank charge", "Not the default 2% model"],
              ["Payoneer-style percentage", "Fee shown before you confirm", "2% assumption"],
              ["Another method on the account", "That method's screen", "Enter net USD only if you already deducted it"],
            ],
          },
          {
            type: "p",
            text: "A personal account whose name matches the Upwork profile is the case the local-bank article describes. If you invoice through a company, read the company-account warning before you add a PKR account. A rejected withdrawal wastes the activation time and can delay a client payment cycle.",
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
            text: "Write the method name on the same note as the estimate. Six months later, a 2% model and a $0.99 model look similar in a spreadsheet if the column only says 'fees'. The tax record guide explains which documents to keep with that note.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Can I add a company PKR account on Upwork?",
        answer:
          "Upwork's Direct to Local Bank article says it cannot accommodate company registrations for TRY and PKR bank accounts, and that adding one may cause a failed withdrawal. Confirm the current rule in that article before you try.",
      },
    ],
    sources: [sourceLinks.upworkBankHow, sourceLinks.upworkBank],
    related: [
      { href: "/guides/upwork-withdrawal-pakistan", label: "Withdrawal timing and the $0.99 fee" },
      { href: "/blog/how-to-receive-international-payments-in-pakistan", label: "Receiving international payments" },
      { href: "/upwork-fee-calculator-pakistan", label: "Upwork calculator" },
    ],
  }),
  guide({
    slug: "payoneer-fees-pakistan",
    title: "Payoneer Fees in Pakistan",
    description:
      "Payoneer's public pricing lists a bank-withdrawal range. The calculator's 2% line sits inside that range and is still not your quote.",
    h1: "How much does Payoneer charge freelancers in Pakistan?",
    excerpt:
      "The fee that counts is the one Payoneer shows before you confirm. Public pricing is only a range.",
    directAnswer:
      "Payoneer's pricing page, which it dated 1 January 2026, lists withdrawals to a bank in the recipient's currency at about 1.2% to 4%, with a possible minimum in some countries. It says the exact fee depends on the corridor and is displayed before confirmation. GigToPKR uses 2% of the post-platform balance as a planning assumption inside that broad range. It is not a Pakistan tariff fetched from your account.",
    sections: [
      {
        id: "range",
        heading: "What the public price list does and does not say",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "The public page is a global schedule. It does not print a single Pakistan percentage on the table reviewed for this guide. Local-currency and cross-currency withdrawals can be priced differently, and some receiving charges are separate from the withdrawal fee. Currency conversion can be embedded in the rate rather than shown as a second percentage. That is why a 2% assumption plus a reference USD/PKR rate can still miss the PKR amount Payoneer quotes.",
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
        question: "Did Payoneer publish a flat 2% Pakistan fee to this site?",
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
      { href: "/payoneer-fee-calculator-pakistan", label: "Payoneer fee calculator" },
      { href: "/guides/payoneer-withdrawal-charges", label: "What to check on a withdrawal" },
      { href: "/guides/freelancer-currency-conversion", label: "How conversion is priced" },
    ],
  }),
  guide({
    slug: "payoneer-withdrawal-charges",
    title: "Payoneer Withdrawal Charges",
    description:
      "A practical checklist for the fee, the rate, the currency, and the bank credit on a Payoneer withdrawal to Pakistan.",
    h1: "What should I check before a Payoneer withdrawal?",
    excerpt:
      "The confirmation screen is the quote. A calculator can only rehearse the arithmetic.",
    directAnswer:
      "Before you confirm, read four numbers: the USD balance leaving Payoneer, the fee in percent or in currency, the exchange rate, and the PKR amount expected at the bank. GigToPKR can rehearse a 2% fee and a rate you type. It cannot see Payoneer's quote, a minimum fee, or a margin hidden inside the rate.",
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
              "Compare the quoted PKR with this calculator. The gap is your real pricing information.",
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
      { href: "/payoneer-fee-calculator-pakistan", label: "Try the 2% assumption" },
      { href: "/guides/payoneer-fees-pakistan", label: "Payoneer's published range" },
      { href: "/usd-to-pkr-calculator", label: "Convert USD to PKR" },
    ],
  }),
  guide({
    slug: "usd-to-pkr-conversion-guide",
    title: "USD to PKR Conversion for Freelancers",
    description:
      "Why Frankfurter has no PKR rate, what a reference quote is, and how to enter the rate you were actually offered.",
    h1: "How should freelancers convert USD into PKR?",
    excerpt:
      "A reference rate, the State Bank's published rates, and Payoneer's payout rate are three different numbers.",
    directAnswer:
      "Convert the net USD you will actually withdraw, not the gross order. Multiply by the rate on the payout screen when you have it. GigToPKR asks Frankfurter for USD/PKR first. Frankfurter's currency list has no PKR because it follows European Central Bank reference rates, so the site does not invent one. If a secondary open reference quote is available, it is labeled as ExchangeRate-API. You can always type a manual rate.",
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
              "Rates published by the State Bank of Pakistan for official reporting. They are not automatically your bank's customer rate.",
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
        heading: "Why there is no silent Frankfurter PKR rate",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "On 17 November 2026, a request to Frankfurter for USD to PKR returned no usable PKR rate, and PKR was absent from Frankfurter's currency list. Substituting another currency, or freezing an old PKR number into the code, would present a fake live rate. The calculator stays usable by asking you for a rate when both the primary and the labeled secondary request fail.",
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
            text: "Fees in dollars come off before conversion. Tax in this model comes off after conversion, because the illustrative percentage is applied to rupees. Reversing those steps changes the result. The earnings guide for Fiverr writes the order out in full.",
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
        question: "Is the State Bank rate the one Payoneer uses?",
        answer:
          "Do not assume that. Compare the State Bank publication with the rate on your payout receipt. Record the receipt rate in your books.",
      },
    ],
    sources: [sourceLinks.frankfurter, sourceLinks.ecb, sourceLinks.exchangeRateApi, sourceLinks.sbp],
    related: [
      { href: "/usd-to-pkr-calculator", label: "USD to PKR calculator" },
      { href: "/guides/freelancer-currency-conversion", label: "Record the rate you received" },
      { href: "/calculator", label: "Full earnings calculator" },
    ],
  }),
  guide({
    slug: "freelancer-currency-conversion",
    title: "Freelancer Currency Conversion",
    description:
      "How to record the dollar amount, the rate, and the rupees that actually arrived, including the gap against a reference rate.",
    h1: "How should Pakistani freelancers record USD to PKR conversion?",
    excerpt:
      "Store the commercial rate from the payout next to any reference rate you used for planning.",
    directAnswer:
      "Keep three numbers for every withdrawal: net USD sent, PKR received, and the implied rate (PKR divided by USD). That implied rate is the one that explains your account. A GigToPKR reference rate is only for planning before the payout exists. The difference between them is the practical cost of conversion, whether or not the provider calls it a fee.",
    sections: [
      {
        id: "implied",
        heading: "Calculate the implied rate",
        level: 2,
        blocks: [
          {
            type: "p",
            text: "If $78.40 leaves the provider and the bank credits PKR 21,500, the implied rate is 21,500 / 78.40, about 274.23. If a reference screen said 280 the same morning, the gap is the commercial difference. Do not 'correct' the bank credit back to 280. Correct the next estimate to a rate closer to the one you actually receive.",
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
              ["PKR credited", "The bank statement line"],
              ["Implied rate", "PKR divided by USD"],
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
    sources: [sourceLinks.sbp, sourceLinks.payoneerWithdraw, sourceLinks.exchangeRateApi],
    related: [
      { href: "/guides/usd-to-pkr-conversion-guide", label: "Reference rates versus payout rates" },
      { href: "/tax-guide/freelancer-tax-record-keeping", label: "What records to keep" },
      { href: "/usd-to-pkr-calculator", label: "Convert an amount" },
    ],
  }),
];
