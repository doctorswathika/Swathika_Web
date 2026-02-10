import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated gradient bg */}
      <div className="absolute inset-0 gradient-hero" />
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center pt-24">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans-body"
            >
              UK Trained Oncoplastic Surgeon
            </motion.p>
            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] text-foreground">
              Advanced Breast Surgery with{" "}
              <span className="text-gradient-rose italic">Precision & Compassion</span>
            </h1>
            <p className="text-lg text-muted-foreground font-sans-body max-w-lg leading-relaxed">
              UK Trained Oncoplastic Surgeon · 600+ Procedures · Reconstructing Confidence
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3.5 rounded-full gradient-rose-gold text-foreground font-sans-body font-medium tracking-wide hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
            >
              Schedule Private Consultation
            </button>
          </div>
        </motion.div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/30 to-secondary/30 blur-2xl" />
            <img
              src="/images/dr-swathika.jpeg"
              alt="Dr. Swathika Rajendran - UK Trained Breast Oncoplastic Surgeon"
              className="relative rounded-2xl w-72 sm:w-80 lg:w-96 object-cover shadow-xl"
              loading="eager"
            />
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
