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

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-start">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div>
              <h2 className="font-serif-display text-2xl lg:text-3xl italic text-muted-foreground font-normal">
                Hi, I'm
              </h2>
              <h2 className="font-serif-display text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                DR. SWATHIKA
              </h2>
            </div>

            <p className="font-sans-body text-base lg:text-lg font-semibold text-foreground">
              I'm a UK-trained Breast Oncoplastic & Reconstructive Surgeon and Medical Educator.
            </p>

            <div className="space-y-5">
              <p className="text-muted-foreground font-sans-body leading-relaxed text-base">
                With over 700 successful procedures and training from both India and the UK, I've seen first-hand the fear, frustration and uncertainty that my patients go through when facing breast health concerns.
              </p>
              <p className="text-muted-foreground font-sans-body leading-relaxed text-base">
                As a breast specialist with global experience, I understand finding the right information, processing a diagnosis, understanding treatment options and getting accurate, practical advice can be really overwhelming.
              </p>
            </div>

            <h3 className="font-serif-display text-2xl lg:text-3xl font-bold italic text-foreground">
              But I'm here to help.
            </h3>

            <div className="space-y-5">
              <p className="text-muted-foreground font-sans-body leading-relaxed text-base">
                Many people think that as a Breast Specialist Surgeon, I just do surgery. But that's far from the truth.
              </p>
              <p className="text-muted-foreground font-sans-body leading-relaxed text-base">
                My approach combines oncology precision with aesthetic sensibility — because your confidence matters as much as your health.
              </p>
            </div>

            <Link
              to="/about"
              onClick={() => window.scrollTo(0, 0)}
              className="group inline-flex items-center gap-3 px-7 py-3 rounded-full font-sans-body font-semibold text-sm tracking-wide text-white hover:scale-105 transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, hsl(15, 60%, 62%), hsl(15, 75%, 75%), hsl(15, 55%, 60%))",
                boxShadow: "0 8px 28px hsl(15, 60%, 65%, 0.45)",
              }}
            >
              Learn More About My Journey
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>

          {/* Right: Large rectangular photo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <img
              src="/images/dr-swathika-about.jpeg"
              alt="Dr. Swathika Rajendran — Breast Oncoplastic & Reconstructive Surgeon"
              className="w-full h-auto rounded-2xl object-cover shadow-xl lg:max-h-[700px]"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
