export type NavItem = {
  href: string;
  label: string;
  shortLabel?: string;
};

export const mainNav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/calculator", label: "Calculator" },
  { href: "/fiverr-fee-calculator-pakistan", label: "Fiverr Calculator", shortLabel: "Fiverr" },
  { href: "/upwork-fee-calculator-pakistan", label: "Upwork Calculator", shortLabel: "Upwork" },
  { href: "/guides", label: "Guides" },
  { href: "/tax-guide", label: "Tax Guide", shortLabel: "Tax" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** Desktop bar keeps labels on one line. About and Contact stay in the drawer and footer. */
export const desktopNav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/calculator", label: "Calculator" },
  { href: "/fiverr-fee-calculator-pakistan", label: "Fiverr" },
  { href: "/upwork-fee-calculator-pakistan", label: "Upwork" },
  { href: "/guides", label: "Guides" },
  { href: "/tax-guide", label: "Tax Guide" },
  { href: "/blog", label: "Blog" },
];

export const footerCalculators: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/calculator", label: "Calculator" },
  { href: "/fiverr-fee-calculator-pakistan", label: "Fiverr Calculator" },
  { href: "/upwork-fee-calculator-pakistan", label: "Upwork Calculator" },
];

export const footerLearn: NavItem[] = [
  { href: "/guides", label: "Guides" },
  { href: "/tax-guide", label: "Tax Guide" },
  { href: "/blog", label: "Blog" },
  { href: "/usd-to-pkr-calculator", label: "USD to PKR" },
];

export const footerCompany: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/editorial-policy", label: "Editorial Policy" },
];
