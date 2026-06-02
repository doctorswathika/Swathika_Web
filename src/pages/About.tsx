import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhyChooseMeSection from "@/components/WhyChooseMeSection";
import { Award, GraduationCap, Briefcase, Shield, MapPin, ArrowLeft, Heart, Quote } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { number: "700+", label: "Surgeries Performed", icon: Heart },
  { number: "Oncology & cosmetic expert", label: "UK Trained (NHS)", icon: GraduationCap },
  { number: "UK", label: "Certified Professional", icon: Shield },
];

const timeline = [
  {
    title: "MBBS",
    institution: "Sri Ramachandra Institute of Higher Education & Research, Chennai",
    icon: GraduationCap,
    detail: "Built a strong clinical foundation in medicine and surgery.",
  },
  {
    title: "MS General Surgery",
    institution: "Sri Ramachandra Institute of Higher Education & Research, Chennai",
    icon: GraduationCap,
    detail: "Mastered advanced surgical techniques and patient management.",
  },
  {
    title: "Focused Clinical Experience — Plastic & Aesthetic Surgery",
    institution: "Specialised clinical experience in plastic and aesthetic surgical techniques",
    icon: Briefcase,
    detail: "Developed expertise in aesthetic principles applied to breast surgery.",
  },
  {
    title: "MCh Breast Oncoplastic & Reconstructive Surgery",
    institution: "England, United Kingdom",
    icon: Award,
    detail: "World-class training in oncoplastic techniques across leading UK hospitals.",
  },
  {
    title: "Consultant Breast Oncoplastic & Reconstructive Surgeon",
    institution: "Currently practicing in Chennai, India",
    icon: MapPin,
    detail: "Bringing UK-standard care to patients in India with a compassionate, personalised approach.",
  },
];

const memberships = [
  { name: "Member — Association of Breast Surgeons (ABS)", icon: Shield },
  { name: "Member — Association of Breast Surgeons of India (ABSI)", icon: Shield },
  { name: "Member — Association of Surgeons of India (ASI)", icon: Shield },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function About() {
  return (
    <>
      <Helmet>
        <title>Dr. Swathika Rajendran | UK Trained Breast Surgeon</title>
        <meta
          name="description"
          content="Learn about Dr. Swathika Rajendran's training, MCh credentials and journey as a UK trained Breast Oncoplastic & Reconstructive Surgeon in Chennai."
        />
        <link rel="canonical" href="https://drswathika.com/about" />
        <meta property="og:title" content="Dr. Swathika Rajendran | UK Trained Breast Surgeon" />
        <meta
          property="og:description"
          content="UK trained Breast Oncoplastic & Reconstructive Surgeon in Chennai. Education, credentials, expertise and patient first philosophy."
        />
        <meta property="og:url" content="https://drswathika.com/about" />
        <meta property="og:type" content="profile" />
        <meta property="og:image" content="https://drswathika.com/images/dr-swathika.jpeg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            mainEntity: {
              "@type": "Physician",
              name: "Dr. Swathika Rajendran",
              jobTitle: "Breast Oncoplastic & Reconstructive Surgeon",
              description:
                "UK trained (MCh) Breast Oncoplastic & Reconstructive Surgeon in Chennai with 700+ procedures.",
              image: "https://drswathika.com/images/dr-swathika.jpeg",
              url: "https://drswathika.com/about",
              medicalSpecialty: ["Breast Surgery", "Oncoplastic Surgery", "Breast Reconstruction"],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Chennai",
                addressRegion: "Tamil Nadu",
                addressCountry: "IN",
              },
              alumniOf: [
                {
                  "@type": "EducationalOrganization",
                  name: "Sri Ramachandra Institute of Higher Education & Research, Chennai",
                },
                {
                  "@type": "EducationalOrganization",
                  name: "MCh Breast Oncoplastic & Reconstructive Surgery, England, UK",
                },
              ],
              memberOf: [
                { "@type": "Organization", name: "Association of Breast Surgeons (ABS)" },
                { "@type": "Organization", name: "Association of Breast Surgeons of India (ABSI)" },
                { "@type": "Organization", name: "Association of Surgeons of India (ASI)" },
              ],
            },
          })}
        </script>
      </Helmet>
      <Navbar />
      <main className="bg-background pt-24">
        <section className="relative overflow-hidden border-b border-border/60 bg-background">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 gradient-hero opacity-70" />
            <div className="absolute -top-24 right-[-10%] h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-[130px] ambient-float" />
            <div className="absolute bottom-[-18%] left-[-12%] h-[24rem] w-[24rem] rounded-full bg-blush/20 blur-[120px] ambient-float" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-20">
            <Link
              to="/"
              className="mb-10 inline-flex items-center gap-2 font-sans-body text-sm text-foreground/70 transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>

            <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-12">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
                className="space-y-8 lg:col-span-7"
              >
                <p className="font-sans-body text-[11px] font-medium uppercase tracking-[0.32em] text-foreground/60 sm:text-xs animate-fade-in">
                  About Me
                </p>

                <div className="space-y-6">
                  <h1 className="font-serif-display text-[2.25rem] font-light leading-[1.05] tracking-[-0.025em] text-foreground sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] whitespace-nowrap animate-fade-in">
                    Dr. Swathika Rajendran
                  </h1>
                  <p className="max-w-2xl font-sans-body text-[11px] font-medium uppercase tracking-[0.3em] text-foreground/65 sm:text-xs">
                    UK trained Breast Oncoplastic & Reconstructive Surgeon
                  </p>
                </div>

                <div className="hairline max-w-2xl" />

                <div className="max-w-2xl space-y-5">
                  <p className="font-sans-body text-[15px] leading-[1.9] text-foreground/80 sm:text-base lg:text-[17px]">
                    I'm Dr. Swathika Rajendran, a UK trained Breast Oncoplastic & Reconstructive Surgeon, dedicated to
                    providing complete and patient centred breast care. My journey across India and the United Kingdom
                    has shaped the way I practice today with a balance of clinical precision, aesthetic sensitivity and
                    genuine compassion for every woman who walks into my clinic.
                  </p>
                  <p className="font-sans-body text-[15px] leading-[1.9] text-foreground/80 sm:text-base lg:text-[17px]">
                    Having performed over 700 breast surgeries, from complex cancer surgeries to aesthetic procedures, I
                    have seen how treatment is much more than just removing the disease.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    to="/book-consultation"
                    className="cta-luxe inline-flex items-center justify-center rounded-full gradient-rose-gold px-7 py-3 font-sans-body text-xs font-medium uppercase tracking-[0.26em] text-foreground sm:px-8 sm:text-sm sm:tracking-[0.28em]"
                  >
                    Book a Consultation
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.12, ease: EASE }}
                className="lg:col-span-5"
              >
                <div className="relative">
                  <div className="pointer-events-none absolute -inset-5 rounded-[2rem] gradient-rose-gold opacity-30 blur-3xl" />
                  <div className="relative overflow-hidden rounded-[24px] border border-border/60 bg-card/70 shadow-luxe">
                    <img
                      src="/images/dr-swathika-about.jpeg"
                      alt="Dr. Swathika Rajendran"
                      className="h-full max-h-[38rem] w-full object-cover"
                      loading="eager"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/15 via-transparent to-transparent" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── STATS BAR (separate, like before) ─── */}
        <section className="relative z-10 -mt-6 sm:-mt-10">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-border/60 shadow-luxe sm:grid-cols-3"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
                    className="bg-card px-5 py-6 text-center sm:px-6 sm:py-8 transition-colors duration-500 hover:bg-accent/40"
                  >
                    <Icon className="mx-auto h-5 w-5 text-primary" />
                    <p className="mt-3 font-serif-display text-[2rem] font-semibold leading-none text-foreground sm:text-[2.4rem]">
                      {stat.number}
                    </p>
                    <p className="mt-2 font-sans-body text-[10.5px] font-medium uppercase tracking-[0.26em] text-gradient-rose sm:text-[11px]">
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden py-20 lg:py-28">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-card/40 via-background to-background" />
          <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.9, ease: EASE }}
              className="glass-premium rounded-[28px] px-8 py-12 text-center shadow-luxe lg:px-14 lg:py-16"
            >
              <Quote className="mx-auto h-10 w-10 text-primary/45" />
              <blockquote
                className="mx-auto mt-6 max-w-4xl font-serif-display text-3xl font-medium italic leading-[1.65] text-foreground sm:text-4xl lg:text-[3.35rem]"
                style={{ lineHeight: 1.65 }}
              >
                "My approach combines oncology precision with aesthetic sensibility because your confidence matters as
                much as your health."
              </blockquote>
              <div className="editorial-rule mt-8" />
              <p className="mt-5 font-sans-body text-sm font-medium uppercase tracking-[0.3em] text-foreground/65">
                Dr. Swathika Rajendran
              </p>
            </motion.div>
          </div>
        </section>

        <section className="bg-card/40 py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16 lg:px-10">
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.8, ease: EASE }}
              className="space-y-5 lg:sticky lg:top-32 lg:self-start"
            >
              <p className="eyebrow eyebrow-left">My Journey</p>
              <h2 className="font-serif-display text-4xl font-light leading-[1.05] tracking-[-0.025em] text-foreground lg:text-5xl">
                Education & Career
              </h2>
            </motion.div>

            <div className="relative pl-7 sm:pl-10 lg:pl-14">
              <div className="absolute left-0 top-2 bottom-2 w-px bg-border sm:left-2 lg:left-5" />

              <div className="space-y-6 lg:space-y-7">
                {timeline.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 26 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.75, delay: index * 0.06, ease: EASE }}
                      className="relative"
                    >
                      <div className="absolute -left-[2.15rem] top-6 sm:-left-[2.6rem] lg:-left-[3.15rem]">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/25 bg-background shadow-elegant">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                      </div>

                      <div className="glass-premium lift rounded-[24px] px-5 py-6 shadow-elegant sm:px-6 lg:px-8 lg:py-7">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                          <h3 className="font-serif-display text-[1.5rem] font-light leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[1.7rem] lg:text-[2rem]">
                            {item.title}
                          </h3>
                          <p className="max-w-sm font-sans-body text-[13px] leading-relaxed text-gradient-rose sm:text-right sm:text-sm">
                            {item.institution}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <WhyChooseMeSection variant="stacked" />

        <section className="bg-card/30 py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <motion.div {...fadeUp} transition={{ duration: 0.8, ease: EASE }} className="space-y-8">
              <div className="text-center">
                <p className="eyebrow">Credentials</p>
                <h2 className="mt-5 font-serif-display text-3xl font-light leading-[1.05] tracking-[-0.025em] text-foreground lg:text-4xl">
                  Professional Memberships
                </h2>
              </div>

              <ul className="grid gap-4 md:grid-cols-3">
                {memberships.map((membership) => {
                  const Icon = membership.icon;

                  return (
                    <li
                      key={membership.name}
                      className="glass-premium lift flex min-h-[148px] items-start gap-4 rounded-[22px] px-5 py-5 shadow-elegant"
                    >
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-sans-body text-sm font-medium leading-relaxed text-foreground/82">
                        {membership.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden py-20 lg:py-28">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/6 blur-[150px]" />
          </div>

          <div className="relative mx-auto max-w-4xl px-6 lg:px-10">
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.85, ease: EASE }}
              className="glass-premium rounded-[32px] px-8 py-12 text-center shadow-luxe lg:px-14 lg:py-16"
            >
              <p className="eyebrow">Take the First Step</p>
              <h2 className="mt-6 font-serif-display text-4xl font-light leading-[1.05] tracking-[-0.025em] text-foreground lg:text-5xl">
                Ready to Discuss Your Care?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl font-sans-body text-base leading-[1.9] text-foreground/78 lg:text-[17px]">
                Whether you're facing a new diagnosis, exploring reconstruction options or seeking expert advice, I'm
                here to guide you with precision, compassion and world class expertise.
              </p>
              <div className="mt-8 flex items-center justify-center">
                <Link
                  to="/book-consultation"
                  className="cta-luxe inline-flex items-center justify-center rounded-full gradient-rose-gold px-8 py-3 font-sans-body text-sm font-medium uppercase tracking-[0.28em] text-foreground"
                >
                  Book a Consultation
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
