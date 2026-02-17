import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Instagram, Play, Heart, MessageCircle } from "lucide-react";

const reels = [
  {
    title: "Self-Examination Technique",
    thumbnail: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=600&fit=crop",
    likes: "12.4K",
    comments: "342",
  },
  {
    title: "Day in the Life of a Surgeon",
    thumbnail: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&h=600&fit=crop",
    likes: "8.7K",
    comments: "198",
  },
  {
    title: "Post-Surgery Recovery Tips",
    thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=600&fit=crop",
    likes: "15.2K",
    comments: "456",
  },
  {
    title: "Breast Cancer Myths Busted",
    thumbnail: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=600&fit=crop",
    likes: "21.3K",
    comments: "612",
  },
  {
    title: "Patient Success Story",
    thumbnail: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=400&h=600&fit=crop",
    likes: "9.8K",
    comments: "275",
  },
  {
    title: "Oncoplastic Surgery Explained",
    thumbnail: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=400&h=600&fit=crop",
    likes: "6.5K",
    comments: "189",
  },
];

export default function InstaSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="instagram" className="py-24 lg:py-32 bg-card/50 relative overflow-hidden" ref={ref}>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blush/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Instagram className="w-5 h-5 text-primary" />
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans-body">Instagram</p>
          </div>
          <h2 className="font-serif-display text-4xl lg:text-5xl font-semibold text-foreground">
            Reels & <span className="text-gradient-rose italic">Content</span>
          </h2>
          <div className="w-24 h-[2px] mx-auto mt-6 gradient-rose-gold" />
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {reels.map((reel, i) => (
            <motion.div
              key={reel.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src={reel.thumbnail}
                alt={reel.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <p className="font-sans-body text-xs text-background font-medium mb-2 line-clamp-2">{reel.title}</p>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-background/80 text-xs">
                    <Heart className="w-3 h-3" /> {reel.likes}
                  </span>
                  <span className="flex items-center gap-1 text-background/80 text-xs">
                    <MessageCircle className="w-3 h-3" /> {reel.comments}
                  </span>
                </div>
              </div>
              {/* Play icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Play className="w-4 h-4 text-background fill-background ml-0.5" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-10"
        >
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-sm font-sans-body text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300"
          >
            <Instagram className="w-4 h-4" />
            Follow on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
