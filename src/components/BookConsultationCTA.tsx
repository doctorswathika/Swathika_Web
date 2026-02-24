import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Calendar, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSiteContent } from "@/hooks/useSiteContent";

export default function BookConsultationCTA() {
  const { ref, isVisible } = useScrollAnimation();
  const navigate = useNavigate();
  const { getText, getAlignClass } = useSiteContent();

  const ctaTitle = getText("consultation_title", "Your Health Deserves Expert Hands.");
  const ctaDesc = getText("consultation_description", "Every journey to wellness begins with a single conversation. Let Dr. Swathika guide you with world-class expertise and heartfelt compassion.");

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(270_50%_92%/0.6)] via-[hsl(258_60%_88%/0.4)] to-[hsl(280_40%_90%/0.5)]" />

      {/* Decorative bokeh orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { size: 300, x: -8,  y: -20, opacity: 0.18 },
          { size: 200, x: 85,  y: 60,  opacity: 0.15 },
          { size: 150, x: 50,  y: 80,  opacity: 0.12 },
        ].map((orb, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: orb.size,
              height: orb.size,
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              background: `radial-gradient(circle at 35% 35%, white, hsl(var(--blush) / ${orb.opacity}))`,
              filter: `blur(${orb.size * 0.3}px)`,
            }}
          />
        ))}
      </div>

      {/* Subtle top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[hsl(var(--rose-gold))] to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[hsl(var(--rose-gold)/0.4)] bg-[hsl(var(--rose-gold)/0.1)] text-xs tracking-widest uppercase font-semibold text-[hsl(var(--rose-gold))]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--rose-gold))] animate-pulse" />
            Now Accepting New Patients
          </motion.div>

          {/* Headline */}
          <div className="space-y-4">
            <h2 className={`font-serif-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground leading-[1.1] ${getAlignClass("consultation_title")}`}
              dangerouslySetInnerHTML={{ __html: ctaTitle }} />
            <p className={`text-lg sm:text-xl text-muted-foreground font-sans-body max-w-2xl mx-auto leading-relaxed ${getAlignClass("consultation_description")}`}
              dangerouslySetInnerHTML={{ __html: ctaDesc }} />
          </div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground font-sans-body"
          >
            {["Confidential Consultation", "Personalised Care Plan", "UK-Trained Specialist", "700+ Successful Surgeries"].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full gradient-rose-gold inline-block" />
                {item}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2"
          >
            <button
              onClick={() => navigate("/book-consultation")}
              className="group flex items-center gap-3 px-8 py-4 rounded-full gradient-rose-gold font-semibold font-sans-body text-base text-white hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <Calendar className="w-5 h-5" />
              Book a Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle bottom border */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[hsl(var(--rose-gold))] to-transparent" />
    </section>
  );
}
