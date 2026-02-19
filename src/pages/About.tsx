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
                    src="/images/dr-swathika-about.jpeg"
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
        <section className="py-16 lg:py-24 bg-card/50">
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
              {/* Timeline line */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

              {timeline.map((item, i) => {
                const Icon = item.icon;
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`relative flex items-start mb-12 md:mb-16 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    {/* Dot */}
                    <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full gradient-rose-gold -translate-x-1.5 mt-2 z-10" />

                    {/* Content */}
                    <div className={`ml-14 md:ml-0 md:w-[45%] ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <span className="text-xs font-sans-body tracking-widest uppercase text-primary font-medium">{item.year}</span>
                      <h3 className="font-serif-display text-xl font-semibold text-foreground mt-1 flex items-center gap-2 ${isLeft ? 'md:justify-end' : ''}">
                        <Icon className="w-4 h-4 text-primary flex-shrink-0 md:hidden" />
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-sans-body mt-1">{item.institution}</p>
                    </div>
                  </motion.div>
                );
              })}
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
