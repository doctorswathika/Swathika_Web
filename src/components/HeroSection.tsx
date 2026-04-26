import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import drSwathikaHero from "@/assets/dr-swathika-hero.jpeg";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSiteContent } from "@/hooks/useSiteContent";

const WHATSAPP_NUMBER = "919080328082";

export default function HeroSection() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { getText, getAlignClass } = useSiteContent();

  const headline = getText(
    "hero_headline",
    'Your Breast Health,<br/><em class="text-gradient-rose" style="font-style:italic">in Expert Hands</em>',
  );
  const description = getText(
    "hero_description",
    "UK-trained Breast Oncoplastic & Reconstructive Surgeon with 700+ successful surgeries — bringing world-class precision, personalised care, and the confidence you deserve.",
  );
  const trustRaw = getText(
    "hero_trust_indicators",
    "MCh (UK) Trained,UK Certified Professional,700+ Surgeries,Oncology + Aesthetics",
  );
  // Filter out any legacy GMC entries that may still live in the CMS
  const removedTrustItems = new Set(["GMC Registered"]);
  const trustItems = trustRaw
    .split(",")
    .map((s) => s.trim())
    .filter((item) => item && !removedTrustItems.has(item));

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* Warm blush base background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(340_70%_92%)] via-[hsl(350_60%_90%)] to-[hsl(20_60%_90%)]" />

      {/* Bokeh floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { size: 130, x: 50, y: 2, dur: 10, delay: 0 },
          { size: 90, x: 68, y: 8, dur: 12, delay: 1 },
          { size: 160, x: 82, y: 3, dur: 14, delay: 0.5 },
          { size: 110, x: 95, y: 22, dur: 9, delay: 2 },
          { size: 140, x: 58, y: 25, dur: 11, delay: 0.8 },
          { size: 80, x: 44, y: 48, dur: 13, delay: 1.5 },
          { size: 120, x: 74, y: 42, dur: 8, delay: 0.3 },
          { size: 100, x: 88, y: 58, dur: 15, delay: 2.5 },
          { size: 150, x: 63, y: 68, dur: 10, delay: 1.2 },
          { size: 70, x: 52, y: 82, dur: 9, delay: 3 },
          { size: 110, x: 78, y: 80, dur: 12, delay: 0.6 },
          { size: 85, x: 92, y: 88, dur: 8, delay: 1.8 },
          { size: 95, x: 38, y: 18, dur: 11, delay: 4 },
          { size: 75, x: 30, y: 65, dur: 9, delay: 2.2 },
          { size: 105, x: 18, y: 40, dur: 13, delay: 0.4 },
          { size: 85, x: 8, y: 15, dur: 10, delay: 1.6 },
        ].map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: orb.size,
              height: orb.size,
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              background: `radial-gradient(circle at 38% 38%, hsl(0 0% 100% / 0.98), hsl(340 60% 88% / 0.85) 45%, hsl(350 50% 82% / 0.55) 100%)`,
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
      <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row pt-8 lg:pt-16">
        {/* Doctor portrait */}
        <motion.div
          initial={{ opacity: 0, x: isMobile ? 0 : -40, y: isMobile ? 20 : 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-[40%] xl:w-[38%] flex-shrink-0 self-end lg:self-stretch flex items-end relative order-first"
          style={{
            maskImage: isMobile
              ? "linear-gradient(to bottom, black 60%, transparent 100%)"
              : "linear-gradient(to right, black 55%, transparent 100%), linear-gradient(to top, transparent 0%, black 15%)",
            WebkitMaskImage: isMobile
              ? "linear-gradient(to bottom, black 60%, transparent 100%)"
              : "linear-gradient(to right, black 55%, transparent 100%), linear-gradient(to top, transparent 0%, black 15%)",
            maskComposite: isMobile ? undefined : "intersect",
            WebkitMaskComposite: isMobile ? undefined : "source-in",
          }}
        >
          <img
            src={drSwathikaHero}
            alt="Dr. Swathika Rajendran — Breast Surgeon"
            className="w-full h-auto lg:h-full object-cover object-[10%_top] max-h-[60vh] lg:max-h-none"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
          />
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex items-center justify-center px-6 lg:px-12 py-12 lg:py-0 self-center"
        >
          <div className={`space-y-8 max-w-xl ${getAlignClass("hero_headline")}`}>
            <div className="space-y-6">
              <h1
                className={`font-serif-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.1] text-foreground ${getAlignClass("hero_headline")}`}
                dangerouslySetInnerHTML={{ __html: headline }}
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className={`text-base sm:text-lg text-muted-foreground font-sans-body leading-relaxed ${getAlignClass("hero_description")}`}
                dangerouslySetInnerHTML={{ __html: description }}
              />

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className={`space-y-2 text-xs sm:text-sm md:text-base font-sans-body font-medium text-muted-foreground ${getAlignClass("hero_trust_indicators")}`}
              >
                <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-1 sm:flex-nowrap">
                  {trustItems.map((item) => (
                    <span key={item} className="flex items-center gap-1.5 whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-[hsl(43_80%_55%)] inline-block flex-shrink-0" />
                      <span className="text-[hsl(350_50%_60%)]">{item}</span>
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
                className="flex justify-center"
              >
                <button
                  onClick={() => navigate("/book-consultation")}
                  className="group inline-flex items-center gap-3 px-11 py-5 rounded-full gradient-rose-gold font-sans-body font-bold text-lg tracking-wide text-foreground hover:scale-105 transition-all duration-300 shadow-[0_8px_30px_-4px_hsl(var(--primary)/0.45)] hover:shadow-[0_12px_40px_-4px_hsl(var(--primary)/0.6)] ring-2 ring-[hsl(var(--primary)/0.3)]"
                >
                  Book a Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating contact icons */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
        <motion.button
          onClick={() =>
            window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`, "_blank", "noopener,noreferrer")
          }
          className="w-14 h-14 rounded-full bg-[hsl(142_70%_45%)] flex items-center justify-center shadow-lg hover:shadow-[hsl(142_70%_45%)]/30 hover:scale-110 transition-all duration-300 cursor-pointer"
          aria-label="Chat on WhatsApp"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
        >
          <MessageCircle className="w-6 h-6 text-background" />
        </motion.button>
      </div>
    </section>
  );
}
