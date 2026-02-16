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

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans-body mb-3">About Me</p>
          <h2 className="font-serif-display text-4xl lg:text-5xl font-semibold text-foreground">
            Meet Dr. Swathika <span className="text-gradient-rose italic">Rajendran</span>
          </h2>
          <div className="divider-rose w-24 mx-auto mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl gradient-rose-gold opacity-20 blur-xl" />
              <img
                src="/images/dr-swathika-portrait.jpeg"
                alt="Dr. Swathika Rajendran — Breast Oncoplastic & Reconstructive Surgeon"
                className="relative rounded-2xl w-72 md:w-80 lg:w-96 object-cover shadow-xl"
              />
            </div>
          </motion.div>

          {/* Brief summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="text-muted-foreground font-sans-body leading-relaxed text-base lg:text-lg">
              Dr. Swathika Rajendran is a UK-trained Breast Oncoplastic and Reconstructive Surgeon with over 700 successful procedures. She holds an MS in General Surgery from Sri Ramachandra Institute, India, and an MCh in Breast Oncoplastic Surgery from Edge Hill University, UK. Registered with the General Medical Council (GMC), she brings world-class expertise to Chennai.
            </p>
            <p className="text-muted-foreground font-sans-body leading-relaxed text-base lg:text-lg">
              Her rare blend of oncology precision and aesthetic sensibility means every patient receives care that heals, restores, and empowers — because your confidence matters as much as your health.
            </p>

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
      </div>
    </section>
  );
}
