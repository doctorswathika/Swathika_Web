import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Instagram, ExternalLink, Loader2, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const INSTAGRAM_URL = "https://www.instagram.com/drswathikarajendran?igsh=MTFzYzIzMTgyd2IzZQ==";

interface ReelItem {
  id: string;
  caption: string;
  mediaUrl: string;
  thumbnailUrl: string;
  permalink: string;
  timestamp: string;
}

export default function InstaSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [reels, setReels] = useState<ReelItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInstagramFeed() {
      try {
        const { data, error } = await supabase.functions.invoke('instagram-feed');
        if (error) {
          console.error('Instagram feed error:', error);
          return;
        }
        setReels(data?.reels || []);
      } catch (err) {
        console.error('Failed to fetch Instagram feed:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchInstagramFeed();
  }, []);

  return (
    <section id="instagram" className="py-24 lg:py-32 bg-card/50 relative overflow-hidden" ref={ref}>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blush/10 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-6">
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

        {loading && (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
          </div>
        )}

        {/* Reels Grid */}
        {!loading && reels.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto"
          >
            {reels.map((reel, index) => (
              <motion.a
                key={reel.id}
                href={reel.permalink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="glass rounded-2xl overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
              >
                <AspectRatio ratio={9 / 16}>
                  <div className="relative w-full h-full">
                    <img
                      src={reel.thumbnailUrl}
                      alt={reel.caption?.slice(0, 60) || 'Instagram Reel'}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/30 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-background/80 flex items-center justify-center">
                        <Play className="w-6 h-6 text-foreground ml-1" />
                      </div>
                    </div>
                  </div>
                </AspectRatio>
                <div className="p-3">
                  <p className="text-xs text-muted-foreground font-sans-body line-clamp-2">{reel.caption}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}

        {!loading && reels.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-8"
          >
            <p className="text-muted-foreground font-sans-body text-sm">
              Instagram reels will appear here once the access token is configured.
            </p>
          </motion.div>
        )}

        {/* Follow CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center"
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
      </div>
    </section>
  );
}
