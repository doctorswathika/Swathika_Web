import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Award, GraduationCap, Briefcase, Shield, BookOpen, MapPin, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const timeline = [
  { year: "2012–2017", title: "MBBS", institution: "Sri Ramachandra Institute of Higher Education & Research, Chennai", icon: GraduationCap },
  { year: "2017–2020", title: "MS General Surgery", institution: "Sri Ramachandra Institute of Higher Education & Research, Chennai", icon: GraduationCap },
  { year: "2020–2021", title: "Clinical Fellowship — Breast Surgery", institution: "Pearl Health, Chennai", icon: Briefcase },
  { year: "2021–2023", title: "MCh Breast Oncoplastic & Reconstructive Surgery", institution: "Edge Hill University & NHS Trusts, United Kingdom", icon: Award },
  { year: "2023–Present", title: "Consultant Breast Oncoplastic & Reconstructive Surgeon", institution: "Multiple leading centres across Chennai", icon: MapPin },
];

const expertise = [
  "Mastectomy", "Breast Conserving Surgery", "Sentinel Node Biopsy",
  "Breast Reduction & Augmentation", "Lipomodelling", "Implant Reconstruction",
  "Oncoplastic Surgery", "Gynaecomastia Correction",
];

const memberships = [
  "GMC Registered (United Kingdom)",
  "Member — Association of Breast Surgeons (ABS)",
  "Member — Association of Surgeons of India",
];

const publications = [
  "Immediate Breast Reconstruction — Quality of Life Outcomes (Journal of Plastic & Reconstructive Surgery)",
  "Post Mastectomy Radiation Therapy and Breast Reconstruction — A Collaborative Approach",
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Dr. Swathika Rajendran — UK Trained Breast Oncoplastic Surgeon</title>
        <meta name="description" content="Learn about Dr. Swathika Rajendran's education, training, expertise, and journey as a UK-trained Breast Oncoplastic & Reconstructive Surgeon in Chennai." />
      </Helmet>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="max-w-5xl mx-auto px-6">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-sans-body mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>

            <div className="grid md:grid-cols-[280px_1fr] gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative">
                  <div className="absolute -inset-3 rounded-2xl gradient-rose-gold opacity-20 blur-xl" />
                  <img
                    src="/images/dr-swathika-portrait.jpeg"
                    alt="Dr. Swathika Rajendran"
                    className="relative rounded-2xl w-full object-cover shadow-xl"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="space-y-4"
              >
                <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans-body">About Me</p>
                <h1 className="font-serif-display text-4xl lg:text-5xl font-semibold text-foreground">
                  Dr. Swathika <span className="text-foreground">Rajendran</span>
                </h1>
                <p className="text-muted-foreground font-sans-body leading-relaxed">
                  I am a UK-trained Breast Oncoplastic and Reconstructive Surgeon with a deep commitment to providing comprehensive, patient-centred breast care. My journey across India and the United Kingdom has shaped a surgical philosophy rooted in clinical precision, aesthetic excellence, and genuine compassion.
                </p>
                <p className="text-muted-foreground font-sans-body leading-relaxed">
                  Having performed over 700 breast surgeries — from complex oncological reconstructions to cosmetic enhancements — I believe every patient deserves care that not only treats disease but restores confidence and dignity.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Education Timeline */}
        <section className="py-16 lg:py-24 bg-card/50 relative overflow-hidden">
          <div className="absolute top-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-blush/5 rounded-full blur-3xl" />

          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans-body mb-3">My Journey</p>
              <h2 className="font-serif-display text-3xl lg:text-4xl font-semibold text-foreground">
                Education & <span className="text-gradient-rose italic">Career</span>
              </h2>
              <div className="divider-rose w-24 mx-auto mt-6" />
            </motion.div>

            <div className="relative">
              {/* Timeline line with gradient */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-px overflow-hidden">
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full gradient-rose-gold"
                />
              </div>

              {timeline.map((item, i) => {
                const Icon = item.icon;
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative flex items-start mb-14 md:mb-20 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    {/* Node */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.12 + 0.2, type: "spring", stiffness: 300 }}
                      className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10"
                    >
                      <div className="w-10 h-10 rounded-full gradient-rose-gold flex items-center justify-center shadow-lg shadow-rose-gold/20">
                        <Icon className="w-4 h-4 text-foreground" />
                      </div>
                    </motion.div>

                    {/* Content Card */}
                    <div className={`ml-20 md:ml-0 md:w-[43%] ${isLeft ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                      <motion.div
                        whileHover={{ y: -4, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        className="glass rounded-2xl p-6 relative group cursor-default"
                      >
                        {/* Connector line to node */}
                        <div className={`hidden md:block absolute top-5 w-8 h-[2px] gradient-rose-gold opacity-40 ${isLeft ? "right-0 translate-x-full" : "left-0 -translate-x-full"}`} />

                        <span className="inline-block px-3 py-1 rounded-full bg-primary/15 text-xs font-sans-body text-primary tracking-widest uppercase font-medium mb-3">
                          {item.year}
                        </span>
                        <h3 className="font-serif-display text-xl font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-sans-body leading-relaxed flex items-start gap-1.5 ${isLeft ? 'md:justify-end' : ''}">
                          <MapPin className="w-3.5 h-3.5 mt-0.5 text-rose-gold flex-shrink-0" />
                          {item.institution}
                        </p>

                        {/* Subtle glow on hover */}
                        <div className="absolute -inset-px rounded-2xl gradient-rose-gold opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10 blur-sm" />
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}

              {/* End dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
                className="absolute left-8 md:left-1/2 -translate-x-1/2 bottom-0"
              >
                <div className="w-4 h-4 rounded-full gradient-rose-gold shadow-lg shadow-rose-gold/30" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Expertise & Memberships */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="font-serif-display text-2xl font-semibold flex items-center gap-2 text-foreground">
                <Award className="w-5 h-5 text-primary" /> Surgical Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {expertise.map((e) => (
                  <span key={e} className="px-3 py-1.5 rounded-full bg-primary/15 text-xs font-sans-body text-foreground tracking-wide">
                    {e}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="font-serif-display text-2xl font-semibold flex items-center gap-2 text-foreground">
                <Shield className="w-5 h-5 text-primary" /> Memberships
              </h2>
              <ul className="space-y-3">
                {memberships.map((m) => (
                  <li key={m} className="text-sm text-muted-foreground font-sans-body flex items-start gap-2">
                    <Shield className="w-3.5 h-3.5 mt-1 text-primary flex-shrink-0" />
                    {m}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Publications */}
        <section className="py-16 lg:py-24 bg-card/50">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="font-serif-display text-2xl font-semibold flex items-center gap-2 text-foreground">
                <BookOpen className="w-5 h-5 text-primary" /> Publications
              </h2>
              <ul className="space-y-4">
                {publications.map((p) => (
                  <li key={p} className="text-sm text-muted-foreground font-sans-body flex items-start gap-2 glass rounded-xl p-4">
                    <Shield className="w-3.5 h-3.5 mt-1 text-primary flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
