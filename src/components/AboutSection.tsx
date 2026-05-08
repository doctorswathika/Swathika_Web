import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { getText, getAlignClass } = useSiteContent();

  const greeting = getText("about_greeting", "Hi, I'm");
  const name = getText("about_name", "DR. SWATHIKA");
  const tagline = getText(
    "about_tagline",
    "I'm a UK-trained Breast Oncoplastic & Reconstructive Surgeon.",
  );
  const p1 = getText(
    "about_paragraph_1",
    "With over 700 successful procedures and training from both India and the UK, I've seen first-hand the fear, frustration and uncertainty that my patients go through when facing breast health concerns.",
  );
  const p2 = getText(
    "about_paragraph_2",
    "As a breast specialist with global experience, I understand finding the right information, processing a diagnosis, understanding treatment options and getting accurate, practical advice can be really overwhelming.",
  );
  const subheading = getText("about_subheading", "But I'm here to help.");
  const p3 = getText(
    "about_paragraph_3",
    "Many people think that as a Breast Specialist Surgeon, I just do surgery. But that's far from the truth.",
  );
  const p4 = getText(
    "about_paragraph_4",
    "My approach combines oncology precision with aesthetic sensibility — because your confidence matters as much as your health.",
  );

  return (
    <section
      id="about"
      className="relative py-28 lg:py-44 bg-background overflow-hidden"
      ref={ref}
    >
      {/* Soft ambient washes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 right-[-10%] w-[640px] h-[640px] rounded-full bg-[hsl(340_70%_92%/0.45)] blur-3xl" />
        <div className="absolute bottom-[-15%] left-[-12%] w-[520px] h-[520px] rounded-full bg-[hsl(268_70%_90%/0.35)] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-16 lg:mb-24 flex items-center gap-4"
        >
          <span className="h-px w-12 bg-foreground/40" />
          <p className="text-[10px] tracking-[0.45em] uppercase text-muted-foreground font-sans-body">
            About — Chapter 01
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Portrait — editorial frame */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative">
              <div className="absolute -inset-4 lg:-inset-6 rounded-[28px] bg-gradient-to-br from-[hsl(15_80%_88%/0.5)] to-[hsl(268_60%_90%/0.4)] blur-xl pointer-events-none" />
              <div className="relative overflow-hidden rounded-[20px] shadow-luxe">
                <img
                  src="/images/dr-swathika-about.jpeg"
                  alt="Dr. Swathika Rajendran — Breast Oncoplastic & Reconstructive Surgeon"
                  className="w-full h-auto object-cover lg:max-h-[760px]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/15 via-transparent to-transparent pointer-events-none" />
              </div>
              {/* Signature credential card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
                className="hidden lg:block absolute -bottom-10 -right-10 glass-premium rounded-2xl px-7 py-5 max-w-[230px]"
              >
                <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-sans-body mb-1">
                  Trained in
                </p>
                <p className="font-serif-display text-2xl font-medium text-foreground leading-tight">
                  India · United Kingdom
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Text — editorial typography */}
          <div className="lg:col-span-7 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: EASE, delay: 0.15 }}
              className="space-y-3"
            >
              <h2
                className={`font-serif-display text-2xl lg:text-3xl italic text-muted-foreground font-light ${getAlignClass(
                  "about_greeting",
                )}`}
                dangerouslySetInnerHTML={{ __html: greeting }}
              />
              <h2
                className={`font-serif-display text-[2.75rem] sm:text-5xl lg:text-[4rem] font-light leading-[1.02] tracking-[-0.02em] text-foreground ${getAlignClass(
                  "about_name",
                )}`}
                dangerouslySetInnerHTML={{ __html: name }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: EASE, delay: 0.25 }}
              className={`font-serif-display text-xl lg:text-2xl italic font-light text-foreground/85 leading-[1.45] tracking-[-0.01em] border-l-2 border-[hsl(var(--rose-gold))] pl-6 ${getAlignClass(
                "about_tagline",
              )}`}
              dangerouslySetInnerHTML={{ __html: tagline }}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: EASE, delay: 0.35 }}
              className="space-y-6 max-w-2xl"
            >
              <p
                className={`text-[15.5px] lg:text-base text-muted-foreground font-sans-body font-light leading-[1.85] ${getAlignClass(
                  "about_paragraph_1",
                )}`}
                dangerouslySetInnerHTML={{ __html: p1 }}
              />
              <p
                className={`text-[15.5px] lg:text-base text-muted-foreground font-sans-body font-light leading-[1.85] ${getAlignClass(
                  "about_paragraph_2",
                )}`}
                dangerouslySetInnerHTML={{ __html: p2 }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: EASE, delay: 0.45 }}
              className="pt-2"
            >
              <span className="h-px w-16 bg-foreground/30 inline-block mb-5" />
              <h3
                className={`font-serif-display text-3xl lg:text-[2.5rem] font-light italic text-foreground leading-[1.1] tracking-[-0.015em] ${getAlignClass(
                  "about_subheading",
                )}`}
                dangerouslySetInnerHTML={{ __html: subheading }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: EASE, delay: 0.55 }}
              className="space-y-6 max-w-2xl"
            >
              <p
                className={`text-[15.5px] lg:text-base text-muted-foreground font-sans-body font-light leading-[1.85] ${getAlignClass(
                  "about_paragraph_3",
                )}`}
                dangerouslySetInnerHTML={{ __html: p3 }}
              />
              <p
                className={`text-[15.5px] lg:text-base text-muted-foreground font-sans-body font-light leading-[1.85] ${getAlignClass(
                  "about_paragraph_4",
                )}`}
                dangerouslySetInnerHTML={{ __html: p4 }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: EASE, delay: 0.65 }}
              className="pt-4"
            >
              <Link
                to="/about"
                onClick={() => window.scrollTo(0, 0)}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full gradient-rose-gold font-sans-body font-semibold text-[14px] tracking-[0.05em] text-foreground hover:scale-[1.02] transition-all duration-500 shadow-elegant"
              >
                Learn More About My Journey
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
