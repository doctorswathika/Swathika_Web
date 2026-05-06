import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Youtube, Instagram, Linkedin, ArrowRight } from "lucide-react";
import doctorImage from "@/assets/dr-swathika-about-home.png";

const SOCIAL_LINKS = [
  {
    label: "YouTube",
    href: "https://youtube.com/@drswathikarajendran?si=k-QxdGM-SqWfJuUQ",
    Icon: Youtube,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/drswathikarajendran?igsh=MTFzYzIzMTgyd2IzZQ==",
    Icon: Instagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/swathika-rajendran-38253b165/",
    Icon: Linkedin,
  },
];

export default function SocialMediaSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="social-media"
      className="py-24 lg:py-32 bg-card/50 relative overflow-hidden"
      ref={ref}
    >
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blush/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="rounded-3xl border border-border bg-background/60 backdrop-blur-sm shadow-elegant p-8 lg:p-14"
        >
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative max-w-sm w-full mx-auto lg:mx-0"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-blush/30 to-primary/10">
                <img
                  src={doctorImage}
                  alt="Dr. Swathika Rajendran"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Content */}
            <div className="space-y-8 text-center lg:text-left">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-serif-display text-3xl lg:text-4xl xl:text-5xl font-semibold text-foreground leading-tight"
              >
                On a mission to spread awareness on{" "}
                <span className="text-gradient-rose italic">women&apos;s health</span> !!
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-3 max-w-md mx-auto lg:mx-0"
              >
                {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-4 px-5 py-3.5 rounded-full border border-border bg-background hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
                  >
                    <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="flex-1 text-left text-sm font-sans-body font-medium text-foreground">
                      {label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </a>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex justify-center lg:justify-start"
              >
                <a
                  href={SOCIAL_LINKS[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-rose-gold text-foreground text-sm font-sans-body font-medium tracking-wide hover:opacity-90 transition-opacity shadow-elegant"
                >
                  Do Follow and support my journey
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
