import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Youtube, Play } from "lucide-react";

const videos = [
  {
    title: "Complete Guide to Breast Self-Examination",
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=340&fit=crop",
    duration: "12:34",
    views: "45K views",
    type: "video" as const,
  },
  {
    title: "What to Expect: Oncoplastic Surgery",
    thumbnail: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&h=340&fit=crop",
    duration: "18:22",
    views: "32K views",
    type: "video" as const,
  },
  {
    title: "Breast Reconstruction: Patient Journey",
    thumbnail: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=600&h=340&fit=crop",
    duration: "24:15",
    views: "28K views",
    type: "video" as const,
  },
  {
    title: "5 Signs You Should See a Breast Surgeon",
    thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=540&fit=crop",
    duration: "0:58",
    views: "89K views",
    type: "short" as const,
  },
  {
    title: "Myth vs Fact: Breast Cancer",
    thumbnail: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=300&h=540&fit=crop",
    duration: "0:45",
    views: "120K views",
    type: "short" as const,
  },
  {
    title: "Recovery After Surgery: Quick Tips",
    thumbnail: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=540&fit=crop",
    duration: "0:52",
    views: "67K views",
    type: "short" as const,
  },
];

export default function YoutubeSection() {
  const { ref, isVisible } = useScrollAnimation();
  const fullVideos = videos.filter((v) => v.type === "video");
  const shorts = videos.filter((v) => v.type === "short");

  return (
    <section id="youtube" className="py-24 lg:py-32 bg-background relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-destructive/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Youtube className="w-6 h-6 text-destructive" />
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans-body">YouTube</p>
          </div>
          <h2 className="font-serif-display text-4xl lg:text-5xl font-semibold text-foreground">
            Videos & <span className="text-gradient-rose italic">Shorts</span>
          </h2>
          <div className="w-24 h-[2px] mx-auto mt-6 gradient-rose-gold" />
        </motion.div>

        {/* Full Videos */}
        <div className="mb-12">
          <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-sans-body mb-6">Featured Videos</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fullVideos.map((video, i) => (
              <motion.div
                key={video.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group glass rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/30 transition-colors" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-destructive flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-destructive-foreground fill-destructive-foreground ml-0.5" />
                  </div>
                  <span className="absolute bottom-2 right-2 bg-foreground/80 text-background text-xs font-sans-body px-2 py-0.5 rounded">
                    {video.duration}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-sans-body text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-sans-body mt-1">{video.views}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Shorts */}
        <div>
          <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-sans-body mb-6">Shorts</p>
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {shorts.map((short, i) => (
              <motion.div
                key={short.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                className="group relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer"
              >
                <img
                  src={short.thumbnail}
                  alt={short.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="font-sans-body text-xs text-background font-medium line-clamp-2">{short.title}</p>
                  <p className="text-xs text-background/60 font-sans-body mt-1">{short.views}</p>
                </div>
                {/* Play icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-destructive/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Play className="w-4 h-4 text-destructive-foreground fill-destructive-foreground ml-0.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-10"
        >
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-sm font-sans-body text-muted-foreground hover:text-foreground hover:border-destructive/50 transition-all duration-300"
          >
            <Youtube className="w-4 h-4" />
            Subscribe on YouTube
          </a>
        </motion.div>
      </div>
    </section>
  );
}
