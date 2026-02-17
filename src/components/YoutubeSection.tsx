import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Youtube, ExternalLink } from "lucide-react";

const YOUTUBE_URL = "https://youtube.com/@drswathikarajendran?si=k-QxdGM-SqWfJuUQ";

export default function YoutubeSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="youtube" className="py-24 lg:py-32 bg-background relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-destructive/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Youtube className="w-6 h-6 text-destructive" />
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans-body">YouTube</p>
          </div>
          <h2 className="font-serif-display text-4xl lg:text-5xl font-semibold text-foreground">
            Videos & <span className="text-gradient-rose italic">Shorts</span>
          </h2>
          <div className="w-24 h-[2px] mx-auto mt-6 gradient-rose-gold" />
          <p className="text-muted-foreground font-sans-body mt-6 max-w-xl mx-auto">
            Subscribe to Dr. Swathika's YouTube channel for educational videos on breast health, surgical procedures, patient journeys, and awareness content.
          </p>
        </motion.div>

        {/* YouTube channel card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-2xl p-8 md:p-12 flex flex-col items-center gap-6 hover:shadow-lg transition-shadow duration-300 max-w-md w-full group"
          >
            <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
              <Youtube className="w-10 h-10 text-destructive" />
            </div>
            <div className="text-center">
              <h3 className="font-serif-display text-xl font-semibold text-foreground mb-1">Dr. Swathika Rajendran</h3>
              <p className="text-sm text-muted-foreground font-sans-body">Breast Health • Surgery • Awareness</p>
            </div>
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-destructive text-destructive-foreground text-sm font-sans-body font-medium tracking-wide group-hover:opacity-90 transition-opacity">
              <Youtube className="w-4 h-4" />
              Subscribe on YouTube
              <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
