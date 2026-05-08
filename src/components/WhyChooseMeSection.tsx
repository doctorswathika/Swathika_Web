import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Sparkles, Scissors, Microscope, Stamp, ShieldCheck } from "lucide-react";

type WhyChooseMeVariant = "grid" | "stacked";

const points = [
  {
    icon: Microscope,
    title: "Latest Technology Training",
    text: "UK-trained specialist in advanced breast oncoplastic and reconstructive techniques, offering modern, evidence-based breast care.",
  },
  {
    icon: Sparkles,
    title: "Cosmetic Precision with Safe Cancer Removal",
    text: "Focused on safe cancer clearance while preserving or restoring the breast, supporting both long-term health and self-confidence.",
  },
  {
    icon: Scissors,
    title: "Minimally Invasive Techniques",
    text: "Where possible, gentle, breast-conserving approaches are used to reduce pain and help women in early recovery after surgery.",
  },
  {
    icon: Stamp,
    title: "Minimal Scar Planning",
    text: "Incisions follow natural breast lines and curves, keeping scars as soft, subtle, and discreet as possible.",
  },
  {
    icon: ShieldCheck,
    title: "Complete Cancer Care",
    text: "Supporting you at every step — from first consultation and diagnosis to surgery, reconstruction guidance, and long-term follow-up.",
  },
];

export default function WhyChooseMeSection({ variant = "grid" }: { variant?: WhyChooseMeVariant } = {}) {
  const { ref, isVisible } = useScrollAnimation();
  const isStacked = variant === "stacked";

  return (
    <section id="why-choose-me" className="py-24 lg:py-32 bg-card/40 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/8 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blush/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans-body mb-3">Why Choose Me</p>
          <h2 className="font-serif-display text-4xl lg:text-5xl font-light leading-[1.05] tracking-[-0.025em] text-foreground mb-6">
            A Care Approach Built Around You
          </h2>
          <div className="divider-rose w-24 mx-auto mb-6" />
          <p className="text-muted-foreground font-sans-body leading-relaxed">
            What you can expect when you place your breast care in my hands.
          </p>
        </motion.div>

        {isStacked ? (
          <div className="max-w-3xl mx-auto flex flex-col gap-5">
            {points.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group relative w-full rounded-2xl glass-premium px-7 py-6 lg:px-9 lg:py-7 lift overflow-hidden"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-6 bottom-6 w-[3px] rounded-r-full bg-gradient-to-b from-[hsl(var(--primary)/0.6)] via-[hsl(var(--blush)/0.7)] to-[hsl(var(--rose-gold)/0.6)]"
                />
                <h3 className="font-serif-display text-2xl lg:text-[1.7rem] font-light text-foreground leading-[1.1] mb-2 tracking-[-0.02em]">
                  {p.title}
                </h3>
                <p className="text-base text-muted-foreground font-sans-body leading-relaxed max-w-2xl">
                  {p.text}
                </p>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {points.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 25 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-2xl p-7 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-500 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                  <p.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="font-serif-display text-lg font-light tracking-[-0.02em] text-foreground mb-2 leading-snug">{p.title}</h3>
                <p className="text-sm text-muted-foreground font-sans-body leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

