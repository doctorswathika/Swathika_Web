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
    a: "Oncoplastic surgery combines cancer surgery with plastic surgery reshaping techniques. It allows removal of tumours while actively reshaping the breast to maintain a natural, symmetrical appearance — giving the best oncological and cosmetic outcomes together.",
  },
  {
    q: "Am I a candidate for breast conserving surgery?",
    a: "Suitability depends on tumour size relative to breast size, tumour location, and whether clear margins can be achieved. Studies show that breast conserving surgery combined with radiation provides survival outcomes equivalent to mastectomy for appropriately selected patients.",
  },
  {
    q: "What is the risk of lymphoedema after sentinel node biopsy?",
    a: "The risk of lymphoedema after sentinel node biopsy is approximately 5–7%, much lower than the 20–30% risk associated with full axillary clearance. This minimally invasive technique preserves arm function while providing accurate cancer staging.",
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
      className="relative py-28 lg:py-44 bg-background overflow-hidden"
      ref={ref}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[-10%] w-[480px] h-[480px] rounded-full bg-[hsl(268_70%_92%/0.35)] blur-3xl" />
        <div className="absolute bottom-0 right-[-10%] w-[420px] h-[420px] rounded-full bg-[hsl(340_60%_92%/0.3)] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Sticky editorial header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: EASE }}
            className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-foreground/40" />
              <p className="text-[10px] tracking-[0.45em] uppercase text-muted-foreground font-sans-body">
                FAQ
              </p>
            </div>
            <h2 className="font-serif-display text-[2.5rem] sm:text-5xl lg:text-[3.75rem] font-light leading-[1.02] tracking-[-0.02em] text-foreground">
              Frequently Asked <em className="text-gradient-rose">Questions</em>
            </h2>
            <p className="mt-7 text-[15px] lg:text-base text-muted-foreground font-sans-body font-light leading-[1.9] max-w-md">
              Considered, honest answers to the questions patients ask most often — drawn from years in the
              consultation room.
            </p>
          </motion.div>

          {/* Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            className="lg:col-span-7"
          >
            <Accordion type="single" collapsible className="space-y-0">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border-b border-border/60 border-t-0 first:border-t first:border-t-border/60"
                >
                  <AccordionTrigger className="group font-serif-display text-[1.1rem] lg:text-[1.3rem] font-light text-foreground text-left py-7 lg:py-8 hover:no-underline tracking-[-0.005em] leading-[1.3]">
                    <span className="flex items-baseline gap-5 lg:gap-7 pr-4">
                      <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-sans-body font-medium pt-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 group-hover:text-primary/90 transition-colors duration-500">
                        {faq.q}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] text-muted-foreground font-sans-body font-light leading-[1.9] pb-8 pl-[3.5rem] lg:pl-[5rem] pr-4 max-w-2xl">
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
