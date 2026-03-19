import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Heart, Search, Sparkles, ShieldCheck, CheckCircle, XCircle, AlertTriangle, Lightbulb } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const motivation = [
  {
    icon: Lightbulb,
    title: "Knowledge Is Power",
    text: "Early detection increases the 5-year survival rate to over 99%. Awareness isn't just information — it's a lifeline. The more you know, the better you protect yourself and your loved ones.",
  },
  {
    icon: Heart,
    title: "You Are Not Alone",
    text: "A breast cancer diagnosis can feel isolating, but millions of women have walked this path — and thrived. Modern oncoplastic surgery restores not just the body, but confidence, identity, and hope.",
  },
  {
    icon: Sparkles,
    title: "Healing Beyond Surgery",
    text: "Recovery is physical, emotional, and deeply personal. With the right surgeon, every step — from diagnosis to reconstruction — becomes a journey towards reclaiming yourself, not just surviving.",
  },
  {
    icon: ShieldCheck,
    title: "Your Body, Your Choice",
    text: "Whether it's breast conservation, reconstruction, or aesthetic surgery — the decision is yours. An experienced oncoplastic surgeon ensures you have the information and options to choose what's right for you.",
  },
];

const defaultSymptoms = [
  "A new lump or thickening in the breast or underarm",
  "Change in breast size, shape, or symmetry",
  "Skin dimpling, puckering, or redness on the breast",
  "Nipple discharge (especially if bloody), retraction, or inversion",
  "Persistent breast pain not linked to your menstrual cycle",
  "Swelling or warmth in part of the breast",
];

const defaultDos = [
  "Perform monthly breast self-examinations after age 20",
  "Get annual clinical breast exams from age 30+",
  "Schedule regular mammograms as recommended by your doctor",
  "Maintain a healthy weight and stay physically active",
  "Discuss your family history with your surgeon",
  "Seek a second opinion — it's your right and it matters",
];

const defaultDonts = [
  "Don't ignore a lump — even if it's painless",
  "Don't delay a doctor's visit out of fear",
  "Don't rely on self-diagnosis from the internet",
  "Don't assume young women can't get breast cancer",
  "Don't skip follow-up appointments after treatment",
  "Don't let stigma prevent you from seeking care",
];

export default function AwarenessSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { getText, getAlignClass } = useSiteContent();

  const subtitle = getText("awareness_subtitle", "Breast Health Awareness");
  const title = getText("awareness_title", "What Every Woman <span class=\"text-gradient-rose italic\">Should Know</span>");
  const description = getText("awareness_description", "Awareness saves lives. Understanding the signs, knowing what to do, and taking timely action can make all the difference in your breast health journey.");
  
  const symptomsRaw = getText("awareness_symptoms", "");
  const symptoms = symptomsRaw ? symptomsRaw.split("\n").filter(Boolean) : defaultSymptoms;
  const dosRaw = getText("awareness_dos", "");
  const dos = dosRaw ? dosRaw.split("\n").filter(Boolean) : defaultDos;
  const dontsRaw = getText("awareness_donts", "");
  const donts = dontsRaw ? dontsRaw.split("\n").filter(Boolean) : defaultDonts;

  return (
    <section id="awareness" className="py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      {/* Soft parallax bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/50 via-primary/8 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(268_80%_84%_/_0.15),transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className={`mb-16 max-w-2xl mx-auto ${getAlignClass("awareness_title")}`}
        >
          <p className={`text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans-body mb-3 ${getAlignClass("awareness_subtitle")}`}
            dangerouslySetInnerHTML={{ __html: subtitle }} />
          <h2 className="font-serif-display text-4xl lg:text-5xl font-semibold text-foreground mb-6"
            dangerouslySetInnerHTML={{ __html: title }} />
          <div className="divider-rose w-24 mx-auto mb-6" />
          <p className={`text-muted-foreground font-sans-body leading-relaxed ${getAlignClass("awareness_description")}`}
            dangerouslySetInnerHTML={{ __html: description }} />
        </motion.div>

        {/* Motivation cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {motivation.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 25 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
              className="glass rounded-2xl p-8 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                <t.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-serif-display text-xl font-semibold text-foreground mb-3">{t.title}</h3>
              <p className="text-sm text-muted-foreground font-sans-body leading-relaxed">{t.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Symptoms */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass rounded-2xl p-8 lg:p-10 mb-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <h3 className="font-serif-display text-2xl font-semibold text-foreground">
              Warning Signs — <span className="text-gradient-rose italic">Don't Ignore These</span>
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {symptoms.map((s, i) => (
              <motion.div
                key={s}
                initial={{ opacity: 0, x: -10 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.06 }}
                className="flex items-start gap-2.5 text-sm text-muted-foreground font-sans-body"
              >
                <AlertTriangle className="w-4 h-4 mt-0.5 text-destructive/70 flex-shrink-0" />
                {s}
              </motion.div>
            ))}
          </div>
          <p className="mt-5 text-xs text-muted-foreground font-sans-body italic">
            If you notice any of these symptoms, please consult a specialist promptly. Early evaluation is always better than waiting.
          </p>
        </motion.div>

        {/* Do's and Don'ts */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Do's */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass rounded-2xl p-8 lg:p-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-serif-display text-2xl font-semibold text-foreground">
                The <span className="text-gradient-rose italic">Do's</span>
              </h3>
            </div>
            <ul className="space-y-3">
              {dos.map((d, i) => (
                <motion.li
                  key={d}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.06 }}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground font-sans-body"
                >
                  <CheckCircle className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  {d}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Don'ts */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass rounded-2xl p-8 lg:p-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="font-serif-display text-2xl font-semibold text-foreground">
                The <span className="text-gradient-rose italic">Don'ts</span>
              </h3>
            </div>
            <ul className="space-y-3">
              {donts.map((d, i) => (
                <motion.li
                  key={d}
                  initial={{ opacity: 0, x: 10 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.06 }}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground font-sans-body"
                >
                  <XCircle className="w-4 h-4 mt-0.5 text-destructive/70 flex-shrink-0" />
                  {d}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
