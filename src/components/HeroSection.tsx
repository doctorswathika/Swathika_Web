import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/20"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Centered text */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="space-y-5">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans-body"
            >
              UK Trained Oncoplastic Surgeon
            </motion.p>
            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-7xl font-semibold leading-[1.1] text-foreground">
              Advanced Breast Surgery with{" "}
              <span className="text-gradient-rose italic">Precision & Compassion</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground font-sans-body max-w-2xl mx-auto leading-relaxed">
              UK Trained Oncoplastic Surgeon · 600+ Procedures · Reconstructing Confidence
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3.5 rounded-full gradient-rose-gold text-foreground font-sans-body font-medium tracking-wide hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
            >
              Schedule Private Consultation
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating contact icons */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg hover:shadow-emerald-500/30 hover:scale-110 transition-all duration-300"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 text-background" />
        </a>
        <a
          href="tel:+919876543210"
          className="w-14 h-14 rounded-full gradient-rose-gold flex items-center justify-center shadow-lg hover:shadow-primary/30 hover:scale-110 transition-all duration-300"
          aria-label="Call now"
        >
          <Phone className="w-6 h-6 text-foreground" />
        </a>
      </div>
    </section>
  );
}
