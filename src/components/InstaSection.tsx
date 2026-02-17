import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Instagram, ExternalLink } from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/drswathikarajendran?igsh=MTFzYzIzMTgyd2IzZQ==";

export default function InstaSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="instagram" className="py-24 lg:py-32 bg-card/50 relative overflow-hidden" ref={ref}>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blush/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Instagram className="w-5 h-5 text-primary" />
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans-body">Instagram</p>
          </div>
          <h2 className="font-serif-display text-4xl lg:text-5xl font-semibold text-foreground">
            Reels & <span className="text-gradient-rose italic">Content</span>
          </h2>
          <div className="w-24 h-[2px] mx-auto mt-6 gradient-rose-gold" />
          <p className="text-muted-foreground font-sans-body mt-6 max-w-xl mx-auto">
            Follow Dr. Swathika on Instagram for breast health awareness, patient stories, surgical insights, and behind-the-scenes content.
          </p>
        </motion.div>

        {/* Embedded Instagram profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-2xl p-8 md:p-12 flex flex-col items-center gap-6 hover:shadow-lg transition-shadow duration-300 max-w-md w-full group"
          >
            <div className="w-20 h-20 rounded-full gradient-rose-gold flex items-center justify-center">
              <Instagram className="w-10 h-10 text-foreground" />
            </div>
            <div className="text-center">
              <h3 className="font-serif-display text-xl font-semibold text-foreground mb-1">@drswathikarajendran</h3>
              <p className="text-sm text-muted-foreground font-sans-body">Breast Oncoplastic & Reconstructive Surgeon</p>
            </div>
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-rose-gold text-foreground text-sm font-sans-body font-medium tracking-wide group-hover:opacity-90 transition-opacity">
              <Instagram className="w-4 h-4" />
              Follow on Instagram
              <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
