import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Youtube, ExternalLink } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const YOUTUBE_URL = "https://youtube.com/@drswathikarajendran?si=k-QxdGM-SqWfJuUQ";

// Add your YouTube video IDs here to embed them
const VIDEO_IDS = [
  "Z-VdQWnI0JE",
  // Add more video IDs like: "dQw4w9WgXcQ"
];

export default function YoutubeSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="youtube" className="py-24 lg:py-32 bg-background relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-destructive/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-6">
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

        {/* Embedded YouTube videos */}
        {VIDEO_IDS.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`grid gap-6 mb-10 ${
              VIDEO_IDS.length === 1
                ? "max-w-2xl mx-auto"
                : VIDEO_IDS.length === 2
                ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {VIDEO_IDS.map((videoId, index) => (
              <motion.div
                key={videoId}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="glass rounded-2xl overflow-hidden"
              >
                <AspectRatio ratio={16 / 9}>
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={`YouTube video ${index + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    loading="lazy"
                  />
                </AspectRatio>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Subscribe CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center"
        >
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-destructive text-destructive-foreground text-sm font-sans-body font-medium tracking-wide hover:opacity-90 transition-opacity"
          >
            <Youtube className="w-5 h-5" />
            Subscribe on YouTube
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
