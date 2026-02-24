import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
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
  {
    q: "How experienced is Dr. Swathika?",
    a: "Dr. Swathika holds a dedicated MCh in Breast Oncoplastic & Reconstructive Surgery from the UK, is GMC registered, and has performed over 700 breast procedures — making her one of the most qualified oncoplastic surgeons in Chennai.",
  },
  {
    q: "How do I book a consultation?",
    a: "You can book a consultation through our website by clicking 'Book a Consultation', or reach out via WhatsApp or phone. Consultations are confidential and include a thorough assessment with a personalised care plan.",
  },
];

export default function FAQSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="faq" className="py-24 lg:py-32 bg-background relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/30 rounded-full blur-3xl translate-x-1/2" />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans-body mb-3">
            FAQ
          </p>
          <h2 className="font-serif-display text-4xl lg:text-5xl font-semibold text-foreground">
            Frequently Asked <span className="text-gradient-rose italic">Questions</span>
          </h2>
          <div className="divider-rose w-24 mx-auto mt-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="glass rounded-2xl px-6 border-none"
              >
                <AccordionTrigger className="font-serif-display text-base lg:text-lg font-semibold text-foreground text-left py-5 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground font-sans-body leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
