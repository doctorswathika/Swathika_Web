import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useHashNavigation } from "@/hooks/useHashNavigation";
import { supabase } from "@/integrations/supabase/client";

interface ServicePageLayoutProps {
  title: string;
  subtitle: string;
  heroImage: string;
  category: "Clinical" | "Cosmetic";
  metaDescription: string;
  overview: string[];
  benefits: string[];
  process: { step: string; description: string }[];
  faqs: { q: string; a: string }[];
  proofOfWork?: { stat: string; label: string }[];
  /** DB content prefix, e.g. "svc_mastectomy". If provided, editable fields
   *  are fetched from the site_content table and override the props. */
  contentPrefix?: string;
}

interface DbContent {
  section_key: string;
  content: string;
  alignment: string;
}

function alignClass(a: string) {
  if (a === "center") return "text-center";
  if (a === "right") return "text-right";
  return "text-left";
}

export default function ServicePageLayout({
  title,
  subtitle,
  heroImage,
  category,
  metaDescription,
  overview,
  benefits,
  process,
  faqs,
  proofOfWork,
  contentPrefix,
}: ServicePageLayoutProps) {
  const handleNav = useHashNavigation();
  const [dbContent, setDbContent] = useState<Record<string, DbContent>>({});

  useEffect(() => {
    if (!contentPrefix) return;
    supabase
      .from("site_content")
      .select("section_key, content, alignment")
      .like("section_key", `${contentPrefix}_%`)
      .then(({ data }) => {
        if (data) {
          const map: Record<string, DbContent> = {};
          data.forEach((row) => { map[row.section_key] = row as DbContent; });
          setDbContent(map);
        }
      });
  }, [contentPrefix]);

  /** Get content for a key — DB wins over prop fallback */
  const get = (suffix: string, fallback: string) => {
    const key = `${contentPrefix}_${suffix}`;
    return dbContent[key]?.content ?? fallback;
  };

  /** Get alignment class for a key */
  const getAlign = (suffix: string) => {
    const key = `${contentPrefix}_${suffix}`;
    return alignClass(dbContent[key]?.alignment ?? "left");
  };

  const displaySubtitle = contentPrefix ? get("subtitle", subtitle) : subtitle;
  const displayOverview = contentPrefix
    ? overview.map((p, i) => get(`overview_${i + 1}`, p))
    : overview;

  const displayBenefits = (() => {
    if (!contentPrefix) return benefits;
    const key = `${contentPrefix}_benefits`;
    const raw = dbContent[key]?.content;
    if (raw) { try { const parsed = JSON.parse(raw); if (Array.isArray(parsed) && parsed.length > 0) return parsed; } catch {} }
    return benefits;
  })();

  const displayProcess = (() => {
    if (!contentPrefix) return process;
    const key = `${contentPrefix}_process`;
    const raw = dbContent[key]?.content;
    if (raw) { try { const parsed = JSON.parse(raw); if (Array.isArray(parsed) && parsed.length > 0) return parsed; } catch {} }
    return process;
  })();

  const displayFaqs = (() => {
    if (!contentPrefix) return faqs;
    const key = `${contentPrefix}_faqs`;
    const raw = dbContent[key]?.content;
    if (raw) { try { const parsed = JSON.parse(raw); if (Array.isArray(parsed) && parsed.length > 0) return parsed; } catch {} }
    return faqs;
  })();

  return (
    <>
      <Helmet>
        <title>{title} — Dr. Swathika Rajendran | Chennai</title>
        <meta name="description" content={metaDescription} />
      </Helmet>
      <Navbar />
      <main className="pt-24">

        {/* ── Editorial Hero ── */}
        <section className="relative py-14 lg:py-20 bg-background overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-40 right-[-10%] w-[560px] h-[560px] rounded-full bg-[hsl(340_60%_92%/0.4)] blur-3xl" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[440px] h-[440px] rounded-full bg-[hsl(268_60%_92%/0.3)] blur-3xl" />
          </div>

          <div className="relative max-w-[88rem] mx-auto px-6 lg:px-10">
            <button
              onClick={() => handleNav("#services")}
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors font-sans-body mb-12 lg:mb-16 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Back to Services
            </button>

            <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-7 space-y-8"
              >
                <div className="flex items-center gap-4">
                  <span className="h-px w-12 bg-foreground/40" />
                  <p className="text-[10px] tracking-[0.45em] uppercase text-muted-foreground font-sans-body">
                    {category}
                  </p>
                </div>
                <h1 className="font-serif-display text-[2.5rem] sm:text-5xl lg:text-[4.25rem] font-light leading-[1.02] tracking-[-0.02em] text-foreground">
                  {title}
                </h1>
                <p
                  className={`text-[15.5px] lg:text-[17px] text-muted-foreground font-sans-body font-light leading-[1.9] max-w-2xl ${
                    contentPrefix ? getAlign("subtitle") : ""
                  }`}
                >
                  {displaySubtitle}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-5 relative"
              >
                <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-br from-[hsl(15_80%_88%/0.5)] to-[hsl(268_60%_90%/0.4)] blur-xl pointer-events-none" />
                <div className="relative overflow-hidden rounded-[20px] aspect-[4/5] shadow-luxe">
                  <img
                    src={heroImage}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/15 via-transparent to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Overview ── */}
        <section className="py-14 lg:py-20 bg-background">
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-7">
                <span className="h-px w-12 bg-foreground/40" />
                <p className="text-[10px] tracking-[0.45em] uppercase text-muted-foreground font-sans-body">
                  Overview
                </p>
              </div>
              <h2 className="font-serif-display text-[2rem] lg:text-[3rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground mb-12">
                What is <em className="text-gradient-rose">{title}</em>?
              </h2>
              <div className="space-y-7 max-w-3xl">
                {displayOverview.map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className={`text-[15.5px] lg:text-[17px] text-muted-foreground font-sans-body font-light leading-[1.9] ${
                      contentPrefix ? getAlign(`overview_${i + 1}`) : ""
                    }`}
                  >
                    {para}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Benefits ── */}
        {displayBenefits.length > 0 && (
          <section className="py-14 lg:py-20 bg-card/40">
            <div className="max-w-5xl mx-auto px-6 lg:px-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-4 mb-7">
                  <span className="h-px w-12 bg-foreground/40" />
                  <p className="text-[10px] tracking-[0.45em] uppercase text-muted-foreground font-sans-body">
                    Benefits
                  </p>
                </div>
                <h2 className="font-serif-display text-[2rem] lg:text-[3rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground mb-12">
                  Why Choose This <em className="text-gradient-rose">Procedure</em>?
                </h2>
                <div className="grid sm:grid-cols-2 gap-x-12 gap-y-0 border-t border-border/60">
                  {displayBenefits.map((benefit, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-start gap-5 py-6 border-b border-border/60"
                    >
                      <span className="font-serif-display text-2xl italic font-light text-primary/70 leading-none flex-shrink-0 pt-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[14.5px] lg:text-[15.5px] font-sans-body font-light text-foreground/85 leading-[1.75]">
                        {benefit}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* ── Process ── */}
        <section className="py-14 lg:py-20 bg-background">
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-4 mb-7">
                <span className="h-px w-12 bg-foreground/40" />
                <p className="text-[10px] tracking-[0.45em] uppercase text-muted-foreground font-sans-body">
                  The Process
                </p>
              </div>
              <h2 className="font-serif-display text-[2rem] lg:text-[3rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground mb-14">
                Your <em className="text-gradient-rose">Journey</em>
              </h2>
              <div className="space-y-0 border-t border-border/60">
                {displayProcess.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="grid grid-cols-[auto_1fr] gap-6 lg:gap-12 py-8 lg:py-10 border-b border-border/60 items-baseline"
                  >
                    <span className="font-serif-display text-3xl lg:text-[2.5rem] italic font-light text-primary/70 leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-serif-display text-[1.3rem] lg:text-[1.6rem] font-light text-foreground leading-tight tracking-[-0.005em] mb-3">
                        {step.step}
                      </h3>
                      <p className="text-[14.5px] lg:text-[15.5px] text-muted-foreground font-sans-body font-light leading-[1.85] max-w-2xl">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-14 lg:py-20 bg-background">
          <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              <h2 className="font-serif-display text-[2rem] sm:text-4xl lg:text-[3rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground">
                Ready to Begin Your <em className="text-gradient-rose">Journey</em>?
              </h2>
              <p className="text-[15px] lg:text-base text-muted-foreground font-sans-body font-light leading-[1.85] max-w-xl mx-auto">
                Book a private consultation with Dr. Swathika Rajendran to discuss your personalised treatment plan.
              </p>
              <div className="pt-2">
                <Link
                  to="/book-consultation"
                  className="cta-luxe inline-flex items-center gap-3 px-9 py-4 rounded-full gradient-rose-gold text-foreground font-sans-body font-semibold text-[14px] tracking-[0.05em] shadow-elegant"
                >
                  Book Consultation
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQs removed — single common FAQ lives on homepage */}

      </main>
      <Footer />
    </>
  );
}
