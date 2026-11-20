export type NavItem = {
  href: string;
  label: string;
  shortLabel?: string;
};

export const mainNav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/fiverr-fee-calculator", label: "Fiverr Calculator", shortLabel: "Fiverr" },
  { href: "/upwork-fee-calculator", label: "Upwork Calculator", shortLabel: "Upwork" },
  { href: "/payoneer-fee-calculator", label: "Payoneer Calculator", shortLabel: "Payoneer" },
  { href: "/freelancer-income-calculator", label: "Income Calculator", shortLabel: "Income" },
  { href: "/freelancer-tax-calculator", label: "Tax Calculator", shortLabel: "Tax Calc" },
  { href: "/creators/youtube-earnings-calculator", label: "YouTube Calculator", shortLabel: "YouTube" },
  { href: "/guides", label: "Guides" },
  { href: "/tax-guide", label: "Tax Guide", shortLabel: "Tax" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** Desktop bar keeps labels on one line. About and Contact stay in the drawer and footer. */
export const desktopNav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/fiverr-fee-calculator", label: "Fiverr" },
  { href: "/upwork-fee-calculator", label: "Upwork" },
  { href: "/creators/youtube-earnings-calculator", label: "YouTube" },
  { href: "/guides", label: "Guides" },
  { href: "/tax-guide", label: "Tax Guide" },
  { href: "/blog", label: "Blog" },
];

export const footerCalculators: NavItem[] = [
  { href: "/fiverr-fee-calculator", label: "Fiverr Calculator" },
  { href: "/upwork-fee-calculator", label: "Upwork Calculator" },
  { href: "/payoneer-fee-calculator", label: "Payoneer Fee Calculator" },
  { href: "/freelancer-income-calculator", label: "Freelancer Income Calculator" },
  { href: "/freelancer-tax-calculator", label: "Freelancer Tax Calculator" },
  { href: "/creators/youtube-earnings-calculator", label: "YouTube Calculator" },
];

export const footerLearn: NavItem[] = [
  { href: "/guides", label: "Guides" },
  { href: "/tax-guide", label: "Tax Guide" },
  { href: "/blog", label: "Blog" },
];

export const footerCompany: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/editorial-policy", label: "Editorial Policy" },
];
