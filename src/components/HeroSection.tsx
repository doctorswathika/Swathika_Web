import { motion } from "framer-motion";
import { Phone, MessageCircle, ArrowDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with parallax-like effect */}
      <div className="absolute inset-0">
        <motion.img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover scale-110"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/80" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 5 + 2,
              height: Math.random() * 5 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0
                ? `hsl(var(--blush) / 0.3)`
                : i % 3 === 1
                ? `hsl(var(--lavender) / 0.3)`
                : `hsl(var(--rose-gold) / 0.3)`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.15, 0.5, 0.15],
            }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Centered text */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          <div className="space-y-6">
            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-7xl font-semibold leading-[1.1] text-foreground">
              Your Breast Health,{" "}
              <motion.span
                className="text-[hsl(var(--lavender))] italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                in Expert Hands
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-base sm:text-lg text-muted-foreground font-sans-body max-w-2xl mx-auto leading-relaxed"
            >
              UK-trained Breast Oncoplastic & Reconstructive Surgeon with 700+ successful surgeries — bringing world-class precision, personalised care, and the confidence you deserve.
            </motion.p>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-sans-body text-muted-foreground"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full gradient-rose-gold inline-block" />
                MCh (UK) Trained
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full gradient-rose-gold inline-block" />
                GMC Registered
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full gradient-rose-gold inline-block" />
                700+ Surgeries
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full gradient-rose-gold inline-block" />
                Oncology + Aesthetics
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating contact icons */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
        <motion.a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-[hsl(142_70%_45%)] flex items-center justify-center shadow-lg hover:shadow-[hsl(142_70%_45%)]/30 hover:scale-110 transition-all duration-300"
          aria-label="Chat on WhatsApp"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
        >
          <MessageCircle className="w-6 h-6 text-background" />
        </motion.a>
        <motion.a
          href="tel:+919876543210"
          className="w-14 h-14 rounded-full gradient-rose-gold flex items-center justify-center shadow-lg hover:shadow-primary/30 hover:scale-110 transition-all duration-300"
          aria-label="Call now"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.7, type: "spring" }}
        >
          <Phone className="w-6 h-6 text-foreground" />
        </motion.a>
      </div>
    </section>
  );
}