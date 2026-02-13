import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Heart, Search, Sparkles, ShieldCheck } from "lucide-react";

const topics = [
  {
    icon: Search,
    title: "Early Detection Saves Lives",
    text: "Breast cancer, when caught early, has a 5-year survival rate of over 99%. Regular screening and self-examinations are your first line of defence.",
  },
  {
    icon: Heart,
    title: "Emotional & Physical Recovery",
    text: "Breast surgery impacts more than the body — it touches identity, confidence, and emotional well-being. A holistic approach to care addresses every dimension of healing.",
  },
  {
    icon: Sparkles,
    title: "The Oncoplastic Difference",
    text: "Oncoplastic surgery combines cancer removal with reconstructive techniques, preserving the natural breast shape while ensuring complete oncological safety.",
  },
  {
    icon: ShieldCheck,
    title: "Restoring Confidence",
    text: "Modern reconstructive surgery offers women the ability to reclaim their body image after breast cancer treatment, with results that are both safe and aesthetically refined.",
  },
];

export default function AwarenessSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="awareness" className="py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      {/* Soft parallax bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/50 via-primary/5 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(268_80%_84%_/_0.1),transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans-body mb-3">Thought Leadership</p>
          <h2 className="font-serif-display text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Breast Health in <span className="text-gradient-rose italic">Today's World</span>
          </h2>
          <div className="divider-rose w-24 mx-auto mb-6" />
          <p className="text-muted-foreground font-sans-body leading-relaxed">
            Understanding breast health is the first step towards empowerment. Knowledge transforms fear into action, and action transforms outcomes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {topics.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 25 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
              className="glass rounded-2xl p-8 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                <t.icon className="w-6 h-6 text-rose-gold group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-serif-display text-xl font-semibold text-foreground mb-3">{t.title}</h3>
              <p className="text-sm text-muted-foreground font-sans-body leading-relaxed">{t.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}