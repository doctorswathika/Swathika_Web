import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Calendar, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSiteContent } from "@/hooks/useSiteContent";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function BookConsultationCTA() {
  const { ref, isVisible } = useScrollAnimation();
  const navigate = useNavigate();
  const { getText } = useSiteContent();

  const ctaTitle = getText(
    "consultation_title",
    'Your Health Deserves<br/><em class="text-gradient-rose" style="font-style:italic">Expert Hands.</em>',
  );
  const ctaDesc = getText("consultation_description", "Take the first step towards expert care.");

  return (
    <section ref={ref} className="relative py-28 lg:py-40 overflow-hidden bg-background">
      {/* Layered ambient gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(340_60%_94%/0.5)] via-[hsl(20_60%_94%/0.4)] to-[hsl(268_50%_94%/0.45)]" />
        <div className="absolute -top-40 left-1/4 w-[520px] h-[520px] rounded-full bg-[hsl(340_70%_88%/0.3)] blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 w-[480px] h-[480px] rounded-full bg-[hsl(268_70%_88%/0.25)] blur-3xl" />
      </div>

      {/* Hairline frame top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: EASE }}
          className="text-center space-y-10"
        >
          <div className="inline-flex items-center gap-4">
            <span className="h-px w-12 bg-foreground/40" />
            <p className="text-[10px] tracking-[0.45em] uppercase text-muted-foreground font-sans-body">
              Begin
            </p>
            <span className="h-px w-12 bg-foreground/40" />
          </div>

          <h2
            className="font-serif-display text-[2.75rem] sm:text-5xl lg:text-[4.5rem] font-light leading-[1.02] tracking-[-0.02em] text-foreground max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{ __html: ctaTitle }}
          />

          <p
            className="text-base lg:text-lg text-muted-foreground font-sans-body font-light leading-[1.85] max-w-xl mx-auto"
            dangerouslySetInnerHTML={{ __html: ctaDesc }}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.9, ease: EASE }}
            className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[13px] text-muted-foreground font-sans-body font-light pt-2"
          >
            {[
              "Confidential Consultation",
              "Personalised Care Plan",
              "UK Certified Professional",
              "700+ Surgeries Performed",
            ].map((item, i, arr) => (
              <span key={item} className="flex items-center gap-3">
                <span className="text-[hsl(350_50%_60%)]">{item}</span>
                {i < arr.length - 1 && <span className="text-muted-foreground/40">·</span>}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.9, ease: EASE }}
            className="flex justify-center pt-4"
          >
            <button
              onClick={() => navigate("/book-consultation")}
              className="cta-luxe group inline-flex items-center gap-3 px-10 py-5 rounded-full gradient-rose-gold font-sans-body font-semibold text-[15px] tracking-[0.05em] text-foreground shadow-luxe"
            >
              <Calendar className="w-4 h-4" />
              Book a Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
