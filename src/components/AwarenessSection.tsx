import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const motivation = [
  {
    number: "01",
    title: "Knowledge Is Power",
    text: "Early detection can significantly improve breast cancer outcomes. Awareness isn't just information — it's a lifeline. The more you know, the better you protect yourself and your loved ones.",
  },
  {
    number: "02",
    title: "You Are Not Alone",
    text: "A breast cancer diagnosis can feel isolating, but millions of women have walked this path — and thrived. Modern oncoplastic surgery restores not just the breast, but confidence, identity, and hope.",
  },
  {
    number: "03",
    title: "Healing Beyond Surgery",
    text: "Recovery is physical, emotional, and deeply personal. With the right surgeon, every step — from diagnosis to treatment — becomes a journey towards reclaiming yourself, not just surviving.",
  },
  {
    number: "04",
    title: "Your Body, Your Choice",
    text: "Whether it's breast conservation, reconstruction, or aesthetic surgery — the decision is yours. An experienced oncoplastic surgeon ensures you have the information and options to choose what's right for you.",
  },
];

const defaultSymptoms = [
  "A new lump or thickening in the breast or underarm",
  "Sudden change in breast size, shape, or symmetry",
  "Skin dimpling, puckering, or redness on the breast",
  "Nipple discharge (especially if bloody), retraction, or inversion",
  "Persistent breast pain not linked to your menstrual cycle",
  "Swelling or warmth in one part of the breast",
];

const defaultDos = [
  "Perform monthly breast self-examinations",
  "Schedule regular mammograms above the age of 40 as recommended by your doctor",
  "Don't ignore a lump — especially if it's painless",
];

const removedDoItems = new Set(["Seek a second opinion — it's your right and it matters"]);

const defaultDonts = [
  "Don't ignore a lump — even if it's painless",
  "Don't delay a doctor's visit out of fear",
  "Don't rely on self-diagnosis from the internet",
  "Don't assume young women can't get breast cancer",
  "Don't skip follow-up appointments after treatment",
  "Don't let stigma prevent you from seeking care",
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function AwarenessSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { getText, getAlignClass } = useSiteContent();

  const subtitle = getText("awareness_subtitle", "Breast Health Awareness");
  const title = getText(
    "awareness_title",
    "What Every Woman <span class=\"text-gradient-rose italic\">Should Know</span>",
  );
  const description = getText(
    "awareness_description",
    "Awareness saves lives. Understanding the signs, knowing what to do, and taking timely action can make all the difference in your breast health journey.",
  );

  const symptomsRaw = getText("awareness_symptoms", "");
  const symptoms = symptomsRaw ? symptomsRaw.split("\n").filter(Boolean) : defaultSymptoms;
  const dosRaw = getText("awareness_dos", "");
  const dos = dosRaw
    ? dosRaw.split("\n").filter((item) => item && !removedDoItems.has(item))
    : defaultDos;
  const dontsRaw = getText("awareness_donts", "");
  const donts = dontsRaw ? dontsRaw.split("\n").filter(Boolean) : defaultDonts;

  return (
    <section
      id="awareness"
      ref={ref}
      className="relative py-32 lg:py-48 overflow-hidden bg-background"
    >
      {/* Editorial backdrop — soft, layered, not flashy */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/30 to-background" />
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-[hsl(340_70%_88%/0.35)] blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[560px] h-[560px] rounded-full bg-[hsl(268_80%_86%/0.3)] blur-3xl" />
      </div>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative z-10 max-w-[80rem] mx-auto px-6 lg:px-12">
        {/* ── Editorial header ─────────────────────────────────────── */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-32 lg:mb-44 items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE }}
            className="lg:col-span-6"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px w-12 bg-foreground/40" />
              <p
                className="text-[10px] tracking-[0.45em] uppercase text-muted-foreground font-sans-body"
                dangerouslySetInnerHTML={{ __html: subtitle }}
              />
            </div>
            <h2
              className="font-serif-display text-[2.75rem] sm:text-5xl lg:text-[4.25rem] xl:text-[5rem] font-light leading-[1.02] tracking-[-0.02em] text-foreground"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="lg:col-span-5 lg:col-start-8"
          >
            <div className="border-l border-border/70 pl-7 lg:pl-9">
              <p
                className="text-[15px] lg:text-[17px] text-muted-foreground font-sans-body leading-[1.9] font-light tracking-[0.005em]"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          </motion.div>
        </div>

        {/* ── Editorial pillars ─ horizontal numbered rows ─────────── */}
        <div className="mb-24 lg:mb-32">
          <div className="flex items-baseline justify-between mb-10 lg:mb-14">
            <h3 className="font-serif-display text-2xl lg:text-3xl font-light text-foreground italic">
              The four truths
            </h3>
            <span className="text-[11px] tracking-[0.35em] uppercase text-muted-foreground font-sans-body">
              I — IV
            </span>
          </div>
          <div className="divide-y divide-border/60 border-y border-border/60">
            {motivation.map((item, i) => (
              <motion.article
                key={item.number}
                initial={{ opacity: 0, y: 18 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: EASE }}
                className="group grid grid-cols-12 gap-6 lg:gap-10 py-8 lg:py-10 transition-colors duration-500 hover:bg-foreground/[0.015]"
              >
                <div className="col-span-2 lg:col-span-1">
                  <span className="font-serif-display text-3xl lg:text-4xl font-light text-[hsl(var(--rose-gold))] tabular-nums">
                    {item.number}
                  </span>
                </div>
                <div className="col-span-10 lg:col-span-4">
                  <h4 className="font-serif-display text-2xl lg:text-3xl font-medium text-foreground leading-tight">
                    {item.title}
                  </h4>
                </div>
                <div className="col-span-12 lg:col-span-7">
                  <p className="text-[15px] lg:text-base text-muted-foreground font-sans-body leading-[1.85] font-light max-w-2xl">
                    {item.text}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* ── Warning signs — editorial spread ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="relative mb-24 lg:mb-28"
        >
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="sticky top-28">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  <span className="text-[11px] tracking-[0.35em] uppercase text-destructive/80 font-sans-body">
                    Warning Signs
                  </span>
                </div>
                <h3 className="font-serif-display text-3xl lg:text-4xl font-light text-foreground leading-tight mb-5">
                  Don't <em className="text-gradient-rose">ignore</em> these.
                </h3>
                <p className="text-sm text-muted-foreground font-sans-body italic leading-relaxed font-light">
                  If you notice any of these, please consult a specialist promptly. Early evaluation is always
                  better than waiting.
                </p>
              </div>
            </div>
            <div className="lg:col-span-8">
              <ol className="space-y-0">
                {symptoms.map((s, i) => (
                  <motion.li
                    key={s}
                    initial={{ opacity: 0, x: -12 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.07, ease: EASE }}
                    className="group flex items-baseline gap-6 py-5 border-b border-border/60 last:border-b-0"
                  >
                    <span className="font-serif-display text-sm text-muted-foreground/80 tabular-nums w-8 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base lg:text-lg text-foreground/85 font-sans-body font-light leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      {s}
                    </span>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </motion.div>

        {/* ── Do's & Don'ts — split editorial spread ───────────────── */}
        <div className="grid md:grid-cols-2 gap-px bg-border/60 rounded-2xl overflow-hidden border border-border/60 shadow-[0_30px_80px_-40px_hsl(258_40%_30%/0.18)]">
          {/* Do's */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            className="bg-card p-10 lg:p-14"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <span className="font-serif-display text-xs tracking-[0.4em] uppercase text-muted-foreground">
                  Practice
                </span>
              </div>
              <CheckCircle className="w-5 h-5 text-primary/80" />
            </div>
            <h3 className="font-serif-display text-4xl lg:text-5xl font-light text-foreground mb-10">
              The <em className="text-gradient-rose">Do's</em>
            </h3>
            <ul className="space-y-5">
              {dos.map((d, i) => (
                <motion.li
                  key={d}
                  initial={{ opacity: 0, y: 8 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.08, ease: EASE }}
                  className="flex items-start gap-4 pb-5 border-b border-border/50 last:border-b-0 last:pb-0"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-base text-foreground/85 font-sans-body font-light leading-relaxed">
                    {d}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Don'ts */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            className="bg-card p-10 lg:p-14"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <span className="font-serif-display text-xs tracking-[0.4em] uppercase text-muted-foreground">
                  Avoid
                </span>
              </div>
              <XCircle className="w-5 h-5 text-destructive/80" />
            </div>
            <h3 className="font-serif-display text-4xl lg:text-5xl font-light text-foreground mb-10">
              The <em className="text-gradient-rose">Don'ts</em>
            </h3>
            <ul className="space-y-5">
              {donts.map((d, i) => (
                <motion.li
                  key={d}
                  initial={{ opacity: 0, y: 8 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.08, ease: EASE }}
                  className="flex items-start gap-4 pb-5 border-b border-border/50 last:border-b-0 last:pb-0"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-destructive/70 flex-shrink-0" />
                  <span className="text-base text-foreground/85 font-sans-body font-light leading-relaxed">
                    {d}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
