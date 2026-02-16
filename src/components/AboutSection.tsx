import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-24 lg:py-32 bg-background relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blush/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-3xl mx-auto px-6 relative">
        {/* Header with circular portrait */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-start justify-between gap-6 mb-10"
        >
          <div>
            <h2 className="font-serif-display text-2xl lg:text-3xl italic text-muted-foreground font-normal">
              Hi, I'm
            </h2>
            <h2 className="font-serif-display text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              DR. SWATHIKA
            </h2>
          </div>
          <div className="flex-shrink-0">
            <img
              src="/images/dr-swathika-portrait.jpeg"
              alt="Dr. Swathika Rajendran — Breast Oncoplastic & Reconstructive Surgeon"
              className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-blush/40 shadow-lg"
            />
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-sans-body text-base lg:text-lg font-semibold text-foreground mb-6"
        >
          I'm a UK-trained Breast Oncoplastic & Reconstructive Surgeon and Medical Educator.
        </motion.p>

        {/* Personal story paragraphs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="space-y-5 mb-10"
        >
          <p className="text-muted-foreground font-sans-body leading-relaxed text-base">
            With over 700 successful procedures and training from both India and the UK, I've seen first-hand the fear, frustration and uncertainty that my patients go through when facing breast health concerns.
          </p>
          <p className="text-muted-foreground font-sans-body leading-relaxed text-base">
            As a breast specialist with global experience, I understand finding the right information, processing a diagnosis, understanding treatment options and getting accurate, practical advice can be really overwhelming.
          </p>
        </motion.div>

        {/* Bold subheading */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="font-serif-display text-2xl lg:text-3xl font-bold italic text-foreground mb-6"
        >
          But I'm here to help.
        </motion.h3>

        {/* More content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="space-y-5 mb-8"
        >
          <p className="text-muted-foreground font-sans-body leading-relaxed text-base">
            Many people think that as a Breast Specialist Surgeon, I just do surgery. But that's far from the truth. My approach combines oncology precision with aesthetic sensibility — because your confidence matters as much as your health.
          </p>
          <p className="text-muted-foreground font-sans-body leading-relaxed text-base">
            I believe every patient deserves care that heals, restores, and empowers. That's exactly what I bring — world-class expertise with compassion, right here in Chennai.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          <Link
            to="/about"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center gap-2 font-sans-body text-sm tracking-widest uppercase text-foreground hover:text-primary transition-colors group"
          >
            Learn more about my journey
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}