import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Instagram, ExternalLink } from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/drswathikarajendran?igsh=MTFzYzIzMTgyd2IzZQ==";

export default function InstaSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="instagram" className="py-24 lg:py-32 bg-card/50 relative overflow-hidden" ref={ref}>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blush/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Instagram className="w-5 h-5 text-primary" />
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans-body">Instagram</p>
          </div>
          <h2 className="font-serif-display text-4xl lg:text-5xl font-semibold text-foreground">
            Follow for <span className="text-gradient-rose italic">Updates</span>
          </h2>
          <div className="w-24 h-[2px] mx-auto mt-6 gradient-rose-gold" />
          <p className="text-muted-foreground font-sans-body mt-6 max-w-xl mx-auto leading-relaxed">
            On a mission to spread awareness on women&apos;s health. Follow along for breast health tips,
            patient stories and behind-the-scenes from the clinic.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mt-10"
          >
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-rose-gold text-foreground text-sm font-sans-body font-medium tracking-wide hover:opacity-90 transition-opacity"
            >
              <Instagram className="w-5 h-5" />
              Follow on Instagram
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
