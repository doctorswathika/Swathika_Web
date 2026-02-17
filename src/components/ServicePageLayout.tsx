import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

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
  proofOfWork: { stat: string; label: string }[];
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
}: ServicePageLayoutProps) {
  return (
    <>
      <Helmet>
        <title>{title} — Dr. Swathika Rajendran | Chennai</title>
        <meta name="description" content={metaDescription} />
      </Helmet>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blush/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="max-w-5xl mx-auto px-6">
            <button
              onClick={() => {
                const navigate = window.location.pathname !== "/" 
                  ? () => { window.location.href = "/#services"; }
                  : () => { document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }); };
                navigate();
              }}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-sans-body mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Services
            </button>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <span className="inline-block px-3 py-1 rounded-full bg-primary/15 text-xs font-sans-body text-foreground tracking-widest uppercase">
                  {category}
                </span>
                <h1 className="font-serif-display text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
                  {title}
                </h1>
                <p className="text-lg text-muted-foreground font-sans-body leading-relaxed">
                  {subtitle}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <div className="relative">
                  <div className="absolute -inset-3 rounded-2xl gradient-rose-gold opacity-20 blur-xl" />
                  <img
                    src={heroImage}
                    alt={title}
                    className="relative rounded-2xl w-full aspect-square object-cover shadow-xl"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Proof of Work Stats */}
        <section className="py-12 bg-card/50 border-y border-border">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {proofOfWork.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center"
                >
                  <p className="font-serif-display text-3xl lg:text-4xl font-bold text-primary">
                    {item.stat}
                  </p>
                  <p className="text-xs font-sans-body text-muted-foreground tracking-widest uppercase mt-1">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Overview */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans-body mb-3">Overview</p>
              <h2 className="font-serif-display text-3xl lg:text-4xl font-semibold text-foreground mb-8">
                What is <span className="text-gradient-rose italic">{title}</span>?
              </h2>
              <div className="space-y-5">
                {overview.map((para, i) => (
                  <p key={i} className="text-muted-foreground font-sans-body leading-relaxed text-base lg:text-lg">
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 lg:py-24 bg-card/50">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans-body mb-3">Benefits</p>
              <h2 className="font-serif-display text-3xl lg:text-4xl font-semibold text-foreground mb-8">
                Why Choose This <span className="text-gradient-rose italic">Procedure</span>?
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="flex items-start gap-3 glass rounded-xl p-4"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-sans-body text-foreground">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans-body mb-3">The Process</p>
              <h2 className="font-serif-display text-3xl lg:text-4xl font-semibold text-foreground mb-10">
                Your <span className="text-gradient-rose italic">Journey</span>
              </h2>
              <div className="space-y-8">
                {process.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full gradient-rose-gold flex items-center justify-center">
                      <span className="font-sans-body text-sm font-bold text-foreground">{i + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-serif-display text-xl font-semibold text-foreground mb-2">{step.step}</h3>
                      <p className="text-sm text-muted-foreground font-sans-body leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 lg:py-24 bg-card/50">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans-body mb-3">FAQ</p>
              <h2 className="font-serif-display text-3xl lg:text-4xl font-semibold text-foreground mb-10">
                Frequently Asked <span className="text-gradient-rose italic">Questions</span>
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <motion.details
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="glass rounded-xl p-5 group cursor-pointer"
                  >
                    <summary className="font-sans-body font-medium text-foreground list-none flex items-center justify-between">
                      {faq.q}
                      <span className="text-primary ml-2 group-open:rotate-45 transition-transform text-xl">+</span>
                    </summary>
                    <p className="text-sm text-muted-foreground font-sans-body leading-relaxed mt-3 pt-3 border-t border-border">
                      {faq.a}
                    </p>
                  </motion.details>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 bg-background">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="font-serif-display text-3xl lg:text-4xl font-semibold text-foreground">
                Ready to Begin Your <span className="text-gradient-rose italic">Journey</span>?
              </h2>
              <p className="text-muted-foreground font-sans-body">
                Book a private consultation with Dr. Swathika Rajendran to discuss your personalised treatment plan.
              </p>
              <Link
                to="/book-consultation"
                className="inline-block px-8 py-3 rounded-full gradient-rose-gold text-foreground font-sans-body font-medium tracking-wide hover:opacity-90 transition-opacity"
              >
                Book Consultation
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
