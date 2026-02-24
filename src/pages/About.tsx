import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Award,
  GraduationCap,
  Briefcase,
  Shield,
  BookOpen,
  MapPin,
  ArrowLeft,
  Heart,
  Stethoscope,
  Globe,
  Quote,
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { number: "700+", label: "Successful Surgeries", icon: Heart },
  { number: "MCh", label: "UK Trained (NHS)", icon: GraduationCap },
  { number: "GMC", label: "Registered (UK)", icon: Shield },
  { number: "10+", label: "Years of Experience", icon: Stethoscope },
];

const timeline = [
  {
    year: "2012–2017",
    title: "MBBS",
    institution: "Sri Ramachandra Institute of Higher Education & Research, Chennai",
    icon: GraduationCap,
    detail: "Built a strong clinical foundation in medicine and surgery.",
  },
  {
    year: "2017–2020",
    title: "MS General Surgery",
    institution: "Sri Ramachandra Institute of Higher Education & Research, Chennai",
    icon: GraduationCap,
    detail: "Mastered advanced surgical techniques and patient management.",
  },
  {
    year: "2020–2021",
    title: "Clinical Fellowship — Breast Surgery",
    institution: "Pearl Health, Chennai",
    icon: Briefcase,
    detail: "Focused exclusively on breast surgical oncology and reconstruction.",
  },
  {
    year: "2021–2023",
    title: "MCh Breast Oncoplastic & Reconstructive Surgery",
    institution: "Edge Hill University & NHS Trusts, United Kingdom",
    icon: Award,
    detail: "World-class training in oncoplastic techniques across leading UK hospitals.",
  },
  {
    year: "2023–Present",
    title: "Consultant Breast Oncoplastic & Reconstructive Surgeon",
    institution: "Multiple leading centres across Chennai",
    icon: MapPin,
    detail: "Bringing UK-standard care to patients in India with a compassionate, personalised approach.",
  },
];

const expertise = [
  { name: "Mastectomy", desc: "Complete breast tissue removal with precision" },
  { name: "Breast Conserving Surgery", desc: "Removing cancer while preserving the breast" },
  { name: "Sentinel Node Biopsy", desc: "Minimally invasive lymph node assessment" },
  { name: "Breast Reduction & Augmentation", desc: "Aesthetic reshaping and enhancement" },
  { name: "Lipomodelling", desc: "Fat transfer for natural breast reconstruction" },
  { name: "Implant Reconstruction", desc: "Restoring form after mastectomy" },
  { name: "Oncoplastic Surgery", desc: "Combining cancer surgery with cosmetic techniques" },
  { name: "Gynaecomastia Correction", desc: "Male breast tissue reduction" },
];

const memberships = [
  { name: "GMC Registered (United Kingdom)", icon: Globe },
  { name: "Member — Association of Breast Surgeons (ABS)", icon: Shield },
  { name: "Member — Association of Surgeons of India", icon: Shield },
];

const publications = [
  "Immediate Breast Reconstruction — Quality of Life Outcomes (Journal of Plastic & Reconstructive Surgery)",
  "Post Mastectomy Radiation Therapy and Breast Reconstruction — A Collaborative Approach",
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Dr. Swathika Rajendran — UK Trained Breast Oncoplastic Surgeon</title>
        <meta
          name="description"
          content="Learn about Dr. Swathika Rajendran's education, training, expertise, and journey as a UK-trained Breast Oncoplastic & Reconstructive Surgeon in Chennai."
        />
      </Helmet>
      <Navbar />
      <main className="pt-24">
        {/* ─── CINEMATIC HERO ─── */}
        <section className="relative overflow-hidden bg-background">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blush/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />

          <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-sans-body mb-10"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>

            <div className="grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-center">
              {/* Text */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="space-y-6 order-2 lg:order-1"
              >
                <p className="text-sm tracking-[0.3em] uppercase text-primary font-sans-body font-medium">
                  About Me
                </p>
                <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground leading-[1.1]">
                  Dr. Swathika{" "}
                  <span className="text-foreground">Rajendran</span>
                </h1>
                <p className="font-sans-body text-base lg:text-lg font-semibold text-foreground">
                  UK-trained Breast Oncoplastic & Reconstructive Surgeon · Medical Educator
                </p>
                <p className="text-muted-foreground font-sans-body leading-relaxed text-base max-w-xl">
                  I am committed to providing comprehensive, patient-centred breast care. My journey across India and the United Kingdom has shaped a surgical philosophy rooted in clinical precision, aesthetic excellence, and genuine compassion.
                </p>
                <p className="text-muted-foreground font-sans-body leading-relaxed text-base max-w-xl">
                  Having performed over 700 breast surgeries — from complex oncological reconstructions to cosmetic enhancements — I believe every patient deserves care that not only treats disease but restores confidence and dignity.
                </p>

                <Link
                  to="/book-consultation"
                  className="inline-block mt-2 px-8 py-3 rounded-full gradient-rose-gold text-foreground text-sm font-sans-body font-medium tracking-widest uppercase hover:opacity-90 transition-opacity"
                >
                  Book a Consultation
                </Link>
              </motion.div>

              {/* Portrait */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="relative order-1 lg:order-2"
              >
                <div className="absolute -inset-4 rounded-3xl gradient-rose-gold opacity-15 blur-2xl" />
                <img
                  src="/images/dr-swathika-about.jpeg"
                  alt="Dr. Swathika Rajendran"
                  className="relative rounded-2xl w-full object-cover shadow-2xl max-h-[550px]"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── STATS BAR ─── */}
        <section className="relative z-10">
          <div className="max-w-5xl mx-auto px-6 -mt-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-1 rounded-2xl overflow-hidden shadow-xl"
            >
              {stats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="bg-card p-6 lg:p-8 text-center space-y-2"
                  >
                    <Icon className="w-5 h-5 text-primary mx-auto" />
                    <p className="font-serif-display text-3xl lg:text-4xl font-bold text-foreground">
                      {s.number}
                    </p>
                    <p className="text-xs font-sans-body text-muted-foreground tracking-wider uppercase">
                      {s.label}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ─── PHILOSOPHY QUOTE ─── */}
        <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-card/30 to-transparent" />
          <div className="max-w-3xl mx-auto px-6 relative">
            <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="text-center space-y-6">
              <Quote className="w-10 h-10 text-blush/40 mx-auto" />
              <blockquote className="font-serif-display text-2xl sm:text-3xl lg:text-4xl italic text-foreground leading-snug">
                "My approach combines oncology precision with aesthetic sensibility — because your confidence matters as much as your health."
              </blockquote>
              <div className="divider-rose w-16 mx-auto" />
              <p className="font-sans-body text-sm text-muted-foreground tracking-widest uppercase">
                Dr. Swathika Rajendran
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─── EDUCATION & CAREER TIMELINE ─── */}
        <section className="py-20 lg:py-28 bg-card/40">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
              <p className="text-sm tracking-[0.3em] uppercase text-primary font-sans-body font-medium mb-3">
                My Journey
              </p>
              <h2 className="font-serif-display text-3xl lg:text-4xl font-semibold text-foreground">
                Education & <span className="text-gradient-rose italic">Career</span>
              </h2>
              <div className="divider-rose w-24 mx-auto mt-6" />
            </motion.div>

            <div className="relative">
              {/* Timeline spine */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

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
                    className={`relative flex items-start mb-14 md:mb-20 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Node */}
                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 mt-1 z-10">
                      <div className="w-10 h-10 rounded-full bg-card border-2 border-primary/30 flex items-center justify-center shadow-md">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                    </div>

                    {/* Card */}
                    <div
                      className={`ml-20 md:ml-0 md:w-[43%] ${
                        isLeft ? "md:pr-14 md:text-right" : "md:pl-14"
                      }`}
                    >
                      <div className="glass rounded-xl p-5 space-y-2 hover:shadow-lg transition-shadow duration-300">
                        <span className="text-xs font-sans-body tracking-widest uppercase text-primary font-semibold">
                          {item.year}
                        </span>
                        <h3 className="font-serif-display text-xl font-semibold text-foreground leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-sans-body">{item.institution}</p>
                        <p className="text-xs text-muted-foreground/70 font-sans-body italic">{item.detail}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── SURGICAL EXPERTISE ─── */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-14">
              <p className="text-sm tracking-[0.3em] uppercase text-primary font-sans-body font-medium mb-3">
                What I Do
              </p>
              <h2 className="font-serif-display text-3xl lg:text-4xl font-semibold text-foreground">
                Surgical <span className="text-gradient-rose italic">Expertise</span>
              </h2>
              <div className="divider-rose w-24 mx-auto mt-6" />
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {expertise.map((e, i) => (
                <motion.div
                  key={e.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="glass rounded-xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Award className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-serif-display text-lg font-semibold text-foreground mb-1">{e.name}</h3>
                  <p className="text-xs text-muted-foreground font-sans-body leading-relaxed">{e.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── MEMBERSHIPS & PUBLICATIONS ─── */}
        <section className="py-20 lg:py-28 bg-card/40">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16">
            {/* Memberships */}
            <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="space-y-8">
              <div>
                <p className="text-sm tracking-[0.3em] uppercase text-primary font-sans-body font-medium mb-3">
                  Credentials
                </p>
                <h2 className="font-serif-display text-2xl lg:text-3xl font-semibold text-foreground">
                  Professional Memberships
                </h2>
                <div className="divider-rose w-16 mt-4" />
              </div>
              <ul className="space-y-4">
                {memberships.map((m) => {
                  const Icon = m.icon;
                  return (
                    <li
                      key={m.name}
                      className="glass rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm text-foreground font-sans-body font-medium">{m.name}</span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>

            {/* Publications */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-8"
            >
              <div>
                <p className="text-sm tracking-[0.3em] uppercase text-primary font-sans-body font-medium mb-3">
                  Research
                </p>
                <h2 className="font-serif-display text-2xl lg:text-3xl font-semibold text-foreground">
                  Publications
                </h2>
                <div className="divider-rose w-16 mt-4" />
              </div>
              <ul className="space-y-4">
                {publications.map((p) => (
                  <li
                    key={p}
                    className="glass rounded-xl p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <BookOpen className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground font-sans-body leading-relaxed">{p}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* ─── CTA SECTION ─── */}
        <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
          </div>
          <div className="max-w-3xl mx-auto px-6 relative text-center">
            <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="space-y-6">
              <p className="text-sm tracking-[0.3em] uppercase text-primary font-sans-body font-medium">
                Take the First Step
              </p>
              <h2 className="font-serif-display text-3xl lg:text-4xl font-semibold text-foreground">
                Ready to Discuss Your <span className="text-gradient-rose italic">Care?</span>
              </h2>
              <p className="text-muted-foreground font-sans-body leading-relaxed max-w-lg mx-auto">
                Whether you're facing a new diagnosis, exploring reconstruction options, or seeking expert advice — I'm here to guide you with precision, compassion, and world-class expertise.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link
                  to="/book-consultation"
                  className="px-8 py-3 rounded-full gradient-rose-gold text-foreground text-sm font-sans-body font-medium tracking-widest uppercase hover:opacity-90 transition-opacity"
                >
                  Book a Consultation
                </Link>
                <Link
                  to="/"
                  className="px-8 py-3 rounded-full border border-border text-sm font-sans-body font-medium tracking-widest uppercase text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
