import { Accordion } from "@/components/ui/Accordion";
import { homeFaqs } from "@/content/home";

export function FAQ() {
  return (
    <section className="cv-auto shell py-16 lg:py-20" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-[clamp(1.6rem,2.4vw,2rem)] font-semibold tracking-[-0.03em]">
        Frequently asked questions
      </h2>
      <div className="mt-6">
        <Accordion items={homeFaqs} />
      </div>
    </section>
  );
}
