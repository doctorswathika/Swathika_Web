import { motion } from "framer-motion";
import { Phone, MessageCircle, ArrowDown } from "lucide-react";
import drSwathikaHero from "@/assets/dr-swathika-hero.jpeg";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

const WHATSAPP_NUMBER = "919080328082";
const PHONE_NUMBER = "+91 90803 28082";
const PHONE_HREF = "tel:+919080328082";

export default function HeroSection() {
  const isMobile = useIsMobile();
  const [showNumber, setShowNumber] = useState(false);

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* Warm blush base background */}
      <div className="absolute inset-0 bg-[hsl(340_55%_91%)]" />

      {/* Bokeh floating orbs — soft pink circles with bright centres */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { size: 130, x: 50, y: 2,   dur: 10, delay: 0   },
          { size: 90,  x: 68, y: 8,   dur: 12, delay: 1   },
          { size: 160, x: 82, y: 3,   dur: 14, delay: 0.5 },
          { size: 110, x: 95, y: 22,  dur: 9,  delay: 2   },
          { size: 140, x: 58, y: 25,  dur: 11, delay: 0.8 },
          { size: 80,  x: 44, y: 48,  dur: 13, delay: 1.5 },
          { size: 120, x: 74, y: 42,  dur: 8,  delay: 0.3 },
          { size: 100, x: 88, y: 58,  dur: 15, delay: 2.5 },
          { size: 150, x: 63, y: 68,  dur: 10, delay: 1.2 },
          { size: 70,  x: 52, y: 82,  dur: 9,  delay: 3   },
          { size: 110, x: 78, y: 80,  dur: 12, delay: 0.6 },
          { size: 85,  x: 92, y: 88,  dur: 8,  delay: 1.8 },
          { size: 95,  x: 38, y: 18,  dur: 11, delay: 4   },
          { size: 75,  x: 30, y: 65,  dur: 9,  delay: 2.2 },
          { size: 105, x: 18, y: 40,  dur: 13, delay: 0.4 },
          { size: 85,  x: 8,  y: 15,  dur: 10, delay: 1.6 },
        ].map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: orb.size,
              height: orb.size,
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              background: `radial-gradient(circle at 38% 38%, hsl(0 0% 100% / 0.98), hsl(340 60% 88% / 0.85) 45%, hsl(340 55% 80% / 0.55) 100%)`,
              filter: `blur(${orb.size * 0.09}px)`,
            }}
            animate={{
              y: [0, -12, 0],
              x: [0, 6, 0],
              scale: [1, 1.05, 1],
              opacity: [0.95, 1, 0.95],
            }}
            transition={{
              duration: orb.dur,
              repeat: Infinity,
              delay: orb.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main content layout */}
      <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row pt-16">
        {/* Doctor portrait — flush left, full height */}
        <motion.div
          initial={{ opacity: 0, x: isMobile ? 0 : -40, y: isMobile ? 20 : 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-[40%] xl:w-[38%] flex-shrink-0 self-end lg:self-stretch flex items-end relative order-first"
          style={{
            maskImage: isMobile
              ? 'linear-gradient(to bottom, black 60%, transparent 100%)'
              : 'linear-gradient(to right, black 55%, transparent 100%), linear-gradient(to top, transparent 0%, black 15%)',
            WebkitMaskImage: isMobile
              ? 'linear-gradient(to bottom, black 60%, transparent 100%)'
              : 'linear-gradient(to right, black 55%, transparent 100%), linear-gradient(to top, transparent 0%, black 15%)',
            maskComposite: isMobile ? undefined : 'intersect',
            WebkitMaskComposite: isMobile ? undefined : 'source-in',
          }}
        >
          <img
            src={drSwathikaHero}
            alt="Dr. Swathika Rajendran — Breast Surgeon"
            className="w-full h-auto lg:h-full object-cover object-[10%_top] max-h-[60vh] lg:max-h-none"
            loading="eager"
          />
        </motion.div>

        {/* Text content — right side, vertically centered */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex items-center justify-center px-6 lg:px-12 py-12 lg:py-0 self-center"
        >
          <div className="text-center space-y-8 max-w-xl">
            <div className="space-y-6">
              <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.1] text-foreground">
                Your Breast Health,{" "}
                <motion.span
                  className="text-[hsl(270,60%,50%)] italic block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  in Expert Hands
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-base sm:text-lg text-muted-foreground font-sans-body leading-relaxed"
              >
                UK-trained Breast Oncoplastic & Reconstructive Surgeon with 700+ successful surgeries — bringing world-class precision, personalised care, and the confidence you deserve.
              </motion.p>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="flex justify-center"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowDown className="w-5 h-5 text-muted-foreground" />
                </motion.div>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="space-y-2 text-xs sm:text-sm font-sans-body text-muted-foreground"
              >
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
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
                </div>
                <div className="flex justify-center">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full gradient-rose-gold inline-block" />
                    Oncology + Aesthetics
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating contact icons */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
        <motion.button
          onClick={() => window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`, '_blank', 'noopener,noreferrer')}
          className="w-14 h-14 rounded-full bg-[hsl(142_70%_45%)] flex items-center justify-center shadow-lg hover:shadow-[hsl(142_70%_45%)]/30 hover:scale-110 transition-all duration-300 cursor-pointer"
          aria-label="Chat on WhatsApp"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
        >
          <MessageCircle className="w-6 h-6 text-background" />
        </motion.button>

        {isMobile ? (
          <motion.a
            href={PHONE_HREF}
            className="w-14 h-14 rounded-full gradient-rose-gold flex items-center justify-center shadow-lg hover:shadow-primary/30 hover:scale-110 transition-all duration-300"
            aria-label="Call now"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.7, type: "spring" }}
          >
            <Phone className="w-6 h-6 text-foreground" />
          </motion.a>
        ) : (
          <div className="flex items-center gap-2">
            {showNumber && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-card text-foreground text-sm font-sans-body px-4 py-2 rounded-full shadow-lg whitespace-nowrap"
              >
                {PHONE_NUMBER}
              </motion.span>
            )}
            <motion.button
              onClick={() => setShowNumber((v) => !v)}
              className="w-14 h-14 rounded-full gradient-rose-gold flex items-center justify-center shadow-lg hover:shadow-primary/30 hover:scale-110 transition-all duration-300 cursor-pointer"
              aria-label="Show phone number"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.7, type: "spring" }}
            >
              <Phone className="w-6 h-6 text-foreground" />
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}
