import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Youtube, ExternalLink, Loader2 } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const YOUTUBE_URL = "https://youtube.com/@drswathikarajendran?si=k-QxdGM-SqWfJuUQ";

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

export default function YoutubeSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [shorts, setShorts] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchYouTubeFeed() {
      try {
        const { data, error } = await supabase.functions.invoke('youtube-feed');
        if (error) {
          console.error('YouTube feed error:', error);
          return;
        }
        setVideos(data?.videos || []);
        setShorts(data?.shorts || []);
      } catch (err) {
        console.error('Failed to fetch YouTube feed:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchYouTubeFeed();
  }, []);

  const hasContent = videos.length > 0 || shorts.length > 0;

  return (
    <section id="youtube" className="py-24 lg:py-32 bg-background relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-destructive/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6">
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

        {loading && (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
          </div>
        )}

        {!loading && hasContent && (
          <>
            {/* Latest Video */}
            {videos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-3xl mx-auto mb-10"
              >
                <h3 className="font-serif-display text-lg font-medium text-foreground mb-4 text-center">Latest Video</h3>
                <div className="glass rounded-2xl overflow-hidden">
                  <AspectRatio ratio={16 / 9}>
                    <iframe
                      src={`https://www.youtube.com/embed/${videos[0].id}`}
                      title={videos[0].title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                      loading="lazy"
                    />
                  </AspectRatio>
                </div>
                <p className="text-sm text-muted-foreground font-sans-body mt-3 text-center line-clamp-2">{videos[0].title}</p>
              </motion.div>
            )}

            {/* Latest Shorts */}
            {shorts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-10"
              >
                <h3 className="font-serif-display text-lg font-medium text-foreground mb-4 text-center">Latest Shorts</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {shorts.map((short, index) => (
                    <motion.div
                      key={short.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="glass rounded-2xl overflow-hidden"
                    >
                      <AspectRatio ratio={9 / 16}>
                        <iframe
                          src={`https://www.youtube.com/embed/${short.id}`}
                          title={short.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                          loading="lazy"
                        />
                      </AspectRatio>
                      <div className="p-3">
                        <p className="text-xs text-muted-foreground font-sans-body line-clamp-2">{short.title}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}

        {!loading && !hasContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-8"
          >
            <p className="text-muted-foreground font-sans-body text-sm">
              YouTube feed will appear here once the API key is configured.
            </p>
          </motion.div>
        )}

        {/* Subscribe CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
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
