import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSiteContent } from "@/hooks/useSiteContent";

const EASE = [0.22, 1, 0.36, 1] as const;

const DEFAULT_FAQS = [
  {
    q: "What types of breast surgery does Dr. Swathika perform?",
    a: "Dr. Swathika offers a comprehensive range of breast procedures including mastectomy, breast conserving & oncoplastic surgery, sentinel node biopsy, axillary node surgery, breast reduction & augmentation, lipomodelling, implant reconstruction, and gynaecomastia correction.",
  },
  {
    q: "Can I have breast reconstruction at the same time as mastectomy?",
    a: "Yes, immediate reconstruction is often possible and is one of Dr. Swathika's specialities. This is discussed during your initial consultation based on your clinical situation and cancer treatment plan.",
  },
  {
    q: "How long does recovery take after breast surgery?",
    a: "Recovery varies by procedure. Most patients recover within 4–6 weeks. You can typically return to light activities within 2 weeks, but heavy lifting should be avoided for 6 weeks. Dr. Swathika provides personalised recovery guidance for every patient.",
  },
  {
    q: "What is oncoplastic surgery?",
    a: "Oncoplastic surgery combines cancer surgery with plastic surgery techniques. It allows removal of tumours while actively reshaping the breast to achieve a natural, symmetrical appearance — giving the best oncological and cosmetic outcomes together.",
  },
  {
    q: "Am I a candidate for breast conserving surgery?",
    a: "This depends on tumour size in relation to breast size, tumour location, and if clear margins can be achieved.",
  },
  {
    q: "What is the risk of lymphoedema after sentinel node biopsy?",
    a: "The risk of lymphoedema after sentinel node biopsy is approximately 5–7%, much lower than the 20–30% risk associated with full axillary clearance. This minimally invasive technique preserves arm function while providing relatively accurate cancer staging.",
  },
  {
    q: "Is mastectomy best for breast cancer in terms of survival?",
    a: "Studies show that breast conserving surgery combined with radiation provides survival outcomes equivalent to mastectomy for appropriately selected patients.",
  },
];

const PDF_MAIN_FAQ_QUESTIONS = new Set(DEFAULT_FAQS.map((faq) => faq.q));

export default function FAQSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { getText } = useSiteContent();

  const faqJson = getText("faq_items", "");
  let faqs = DEFAULT_FAQS;
  try {
    if (faqJson) {
      const parsed = JSON.parse(faqJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        faqs = parsed.filter((faq) => PDF_MAIN_FAQ_QUESTIONS.has(faq.q));
      }
    }
  } catch {
    // fallback to defaults
  }

  return (
    <section
      id="faq"
      className="relative py-20 lg:py-28 bg-background overflow-hidden"
      ref={ref}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[-10%] w-[480px] h-[480px] rounded-full bg-[hsl(268_70%_92%/0.35)] blur-3xl" />
        <div className="absolute bottom-0 right-[-10%] w-[420px] h-[420px] rounded-full bg-[hsl(340_60%_92%/0.3)] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Sticky editorial header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE }}
            className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start"
          >
            <div className="flex items-center gap-4 mb-5">
              <span className="h-px w-12 bg-foreground/40" />
              <p className="text-[10px] tracking-[0.45em] uppercase text-muted-foreground font-sans-body">
                FAQ
              </p>
            </div>
            <h2 className="font-serif-display text-[2.25rem] sm:text-[2.75rem] lg:text-[3.25rem] font-light leading-[1.02] tracking-[-0.025em] text-foreground">
              Frequently Asked <em className="text-gradient-rose">Questions</em>
            </h2>
            <p className="mt-5 text-[14.5px] lg:text-[15px] text-muted-foreground font-sans-body font-light leading-[1.8] max-w-md">
              Considered, honest answers to the questions patients ask most often — drawn from years in the
              consultation room.
            </p>
          </motion.div>

          {/* Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="lg:col-span-7"
          >
            <Accordion type="single" collapsible className="space-y-0">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border-b border-border/60 border-t-0 first:border-t first:border-t-border/60 group/item transition-colors duration-500 data-[state=open]:bg-foreground/[0.015]"
                >
                  <AccordionTrigger className="group font-serif-display text-[1.05rem] lg:text-[1.2rem] font-normal text-foreground text-left py-5 lg:py-6 hover:no-underline tracking-[-0.01em] leading-[1.35] [&>svg]:hidden">
                    <span className="flex items-baseline gap-4 lg:gap-6 pr-4 w-full">
                      <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-sans-body font-semibold pt-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 group-hover:text-primary transition-colors duration-500">
                        {faq.q}
                      </span>
                      <span className="relative ml-2 mt-1 w-4 h-4 flex-shrink-0">
                        <span className="absolute inset-x-0 top-1/2 h-px bg-foreground/60 -translate-y-1/2" />
                        <span className="absolute inset-y-0 left-1/2 w-px bg-foreground/60 -translate-x-1/2 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[state=open]:rotate-90 group-data-[state=open]:opacity-0" />
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-[14.5px] lg:text-[15px] text-muted-foreground font-sans-body font-light leading-[1.85] pb-6 pl-[3rem] lg:pl-[4.25rem] pr-4 max-w-2xl">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
