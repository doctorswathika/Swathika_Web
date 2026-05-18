import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Youtube, Instagram, Linkedin, ArrowUpRight } from "lucide-react";
import { ImageIcon } from "lucide-react";

// Placeholder for the upcoming social media portrait. Drop the image into
// src/assets/dr-swathika-social.png and set DOCTOR_IMAGE_SRC below to render it.
const DOCTOR_IMAGE_SRC: string | null = null;

const EASE = [0.22, 1, 0.36, 1] as const;

const SOCIAL_LINKS = [
  {
    label: "YouTube",
    handle: "@drswathikarajendran",
    href: "https://youtube.com/@drswathikarajendran?si=k-QxdGM-SqWfJuUQ",
    Icon: Youtube,
  },
  {
    label: "Instagram",
    handle: "@drswathikarajendran",
    href: "https://www.instagram.com/drswathikarajendran?igsh=MTFzYzIzMTgyd2IzZQ==",
    Icon: Instagram,
  },
  {
    label: "LinkedIn",
    handle: "Swathika Rajendran",
    href: "https://www.linkedin.com/in/swathika-rajendran-2861aa364?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    Icon: Linkedin,
  },
];

export default function SocialMediaSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="social-media"
      className="relative py-28 lg:py-44 bg-background overflow-hidden"
      ref={ref}
    >
      <div className="absolute top-1/3 left-[-10%] w-[460px] h-[460px] rounded-full bg-[hsl(340_60%_92%/0.3)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-[-10%] w-[420px] h-[420px] rounded-full bg-[hsl(268_60%_92%/0.25)] blur-3xl pointer-events-none" />

      <div className="relative max-w-[88rem] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Image — editorial */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, ease: EASE }}
            className="lg:col-span-5 relative"
          >
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-br from-[hsl(340_70%_88%/0.5)] to-[hsl(15_70%_88%/0.4)] blur-xl pointer-events-none" />
              <div className="relative aspect-[4/5] rounded-[20px] overflow-hidden shadow-luxe">
                <img
                  src={doctorImage}
                  alt="Dr. Swathika Rajendran"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/15 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="lg:col-span-7 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: EASE, delay: 0.15 }}
              className="space-y-7"
            >
              <div className="flex items-center gap-4">
                <span className="h-px w-12 bg-foreground/40" />
                <p className="text-[10px] tracking-[0.45em] uppercase text-muted-foreground font-sans-body">
                  Awareness
                </p>
              </div>
              <h2 className="font-serif-display text-[2.5rem] sm:text-5xl lg:text-[3.75rem] font-light leading-[1.02] tracking-[-0.02em] text-foreground">
                On a mission to spread awareness on{" "}
                <em className="text-gradient-rose">women&apos;s health</em>.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: EASE, delay: 0.3 }}
              className="space-y-0 border-t border-border/60"
            >
              {SOCIAL_LINKS.map(({ label, handle, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-6 py-6 lg:py-7 border-b border-border/60 transition-all duration-500 hover:pl-3"
                >
                  <div className="flex items-center gap-5 lg:gap-7 min-w-0 flex-1">
                    <Icon className="w-5 h-5 text-foreground/70 group-hover:text-primary transition-colors duration-500 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-serif-display text-xl lg:text-2xl font-light text-foreground leading-tight group-hover:text-primary/90 transition-colors duration-500">
                        {label}
                      </p>
                      <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground font-sans-body mt-1.5 truncate">
                        {handle}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-foreground/50 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500 flex-shrink-0" />
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
