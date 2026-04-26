import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Sparkles, Scissors, Microscope, Stamp, ShieldCheck } from "lucide-react";

const points = [
  {
    icon: Microscope,
    title: "Latest Technology Training",
    text: "Trained on advanced surgical techniques and current oncoplastic protocols from the UK.",
  },
  {
    icon: Sparkles,
    title: "Cosmetic Precision with Safe Cancer Removal",
    text: "Every operation balances thorough cancer clearance with careful aesthetic reshaping.",
  },
  {
    icon: Scissors,
    title: "Minimally Invasive Techniques",
    text: "Smaller incisions, gentler approaches and faster recovery — wherever clinically appropriate.",
  },
  {
    icon: Stamp,
    title: "Minimal Scar Planning",
    text: "Incisions are placed and designed thoughtfully to keep scars discreet and well-hidden.",
  },
  {
    icon: ShieldCheck,
    title: "Complete Cancer Care",
    text: "From diagnosis to surgery, reconstruction and follow-up — coordinated under one roof.",
  },
];

export default function WhyChooseMeSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="why-choose-me" className="py-24 lg:py-32 bg-card/40 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/8 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blush/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans-body mb-3">Why Choose Me</p>
          <h2 className="font-serif-display text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            A Care Approach <span className="text-gradient-rose italic">Built Around You</span>
          </h2>
          <div className="divider-rose w-24 mx-auto mb-6" />
          <p className="text-muted-foreground font-sans-body leading-relaxed">
            What you can expect when you place your breast care in my hands.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 25 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="glass rounded-2xl p-7 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                <p.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-serif-display text-lg font-semibold text-foreground mb-2 leading-snug">{p.title}</h3>
              <p className="text-sm text-muted-foreground font-sans-body leading-relaxed">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
