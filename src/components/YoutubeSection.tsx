import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Youtube, ExternalLink } from "lucide-react";

const YOUTUBE_URL = "https://youtube.com/@drswathikarajendran?si=k-QxdGM-SqWfJuUQ";

export default function YoutubeSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="youtube" className="py-24 lg:py-32 bg-background relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-destructive/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Youtube className="w-6 h-6 text-destructive" />
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans-body">YouTube</p>
          </div>
          <h2 className="font-serif-display text-4xl lg:text-5xl font-semibold text-foreground">
            Follow for <span className="text-gradient-rose italic">Updates</span>
          </h2>
          <div className="w-24 h-[2px] mx-auto mt-6 gradient-rose-gold" />
          <p className="text-muted-foreground font-sans-body mt-6 max-w-xl mx-auto leading-relaxed">
            On a mission to spread awareness on women&apos;s health. Subscribe for educational videos
            on breast health, surgical insights and patient journeys.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mt-10"
          >
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-rose-gold text-foreground text-sm font-sans-body font-medium tracking-wide hover:opacity-90 transition-opacity"
            >
              <Youtube className="w-5 h-5" />
              Subscribe on YouTube
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
