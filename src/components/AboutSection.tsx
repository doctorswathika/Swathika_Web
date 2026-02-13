import { motion } from "framer-motion";
import { useScrollAnimation, useAnimatedCounter } from "@/hooks/useScrollAnimation";
import { Award, GraduationCap, Briefcase, Shield, BookOpen } from "lucide-react";

const credentials = [
  "MBBS — Sri Ramachandra Institute",
  "MS General Surgery — Sri Ramachandra Institute",
  "MCh Breast Oncoplasty & Reconstructive Surgery — Edge Hill University, UK",
  "GMC Registered (UK)",
  "Member, Association of Breast Surgeons (ABS)",
  "Member, Association of Surgeons of India",
];

const expertise = [
  "Mastectomy",
  "Breast Conserving Surgery",
  "Sentinel Node Biopsy",
  "Breast Reduction & Augmentation",
  "Lipomodelling",
  "Implant Reconstruction",
  "Oncoplastic Surgery",
  "Gynaecomastia Correction",
];

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();
  const procedures = useAnimatedCounter(700, 2000, isVisible);
  const years = useAnimatedCounter(6, 1500, isVisible);

  return (
    <section id="about" className="py-24 lg:py-32 bg-background relative overflow-hidden" ref={ref}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blush/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans-body mb-3">About Me</p>
          <h2 className="font-serif-display text-4xl lg:text-5xl font-semibold text-foreground">
            Expertise & <span className="text-gradient-rose italic">Philosophy</span>
          </h2>
          <div className="divider-rose w-24 mx-auto mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left column: Bio + Counters */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <p className="text-muted-foreground font-sans-body leading-relaxed text-base">
                Dr. Swathika Rajendran is a highly trained Breast Oncoplastic and Reconstructive Surgeon, dedicated to delivering comprehensive and patient-centric breast care. She completed her MS in General Surgery at Sri Ramachandra Institute of Higher Education and Research, India, followed by advanced fellowship training (MCh) in Breast Oncoplastic and Reconstructive Surgery in the UK.
              </p>
              <p className="text-muted-foreground font-sans-body leading-relaxed text-base">
                With over 700 breast surgeries to her credit, Dr. Rajendran has extensive expertise across the full spectrum of procedures — from oncoplastic reconstructions for breast cancer to advanced aesthetic surgeries such as augmentations, reductions, liposuction, and gynecomastia correction.
              </p>
              <p className="text-muted-foreground font-sans-body leading-relaxed text-base">
                Her unique background, blending oncology and aesthetic surgery, allows her to offer tailored solutions that restore both form and confidence, while maintaining a compassionate, patient-focused approach.
              </p>
            </div>

            {/* Counters */}
            <div className="flex gap-8">
              <motion.div
                className="text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isVisible ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <span className="font-serif-display text-5xl font-bold text-gradient-rose">{procedures}+</span>
                <p className="text-sm text-muted-foreground font-sans-body mt-1">Procedures</p>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isVisible ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.6, type: "spring" }}
              >
                <span className="font-serif-display text-5xl font-bold text-gradient-rose">{years}+</span>
                <p className="text-sm text-muted-foreground font-sans-body mt-1">Years Experience</p>
              </motion.div>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif-display text-xl font-semibold flex items-center gap-2 text-foreground">
                <GraduationCap className="w-5 h-5 text-rose-gold" /> Credentials
              </h3>
              <ul className="space-y-2.5">
                {credentials.map((c, i) => (
                  <motion.li
                    key={c}
                    className="text-sm text-muted-foreground font-sans-body flex items-start gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.06 }}
                  >
                    <Shield className="w-3.5 h-3.5 mt-1 text-primary flex-shrink-0" />
                    {c}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif-display text-xl font-semibold flex items-center gap-2 text-foreground">
                <Briefcase className="w-5 h-5 text-rose-gold" /> Experience
              </h3>
              <p className="text-sm text-muted-foreground font-sans-body">
                Consultant Breast Oncoplastic & Reconstructive Surgeon
              </p>
              <p className="text-sm text-muted-foreground font-sans-body">
                Previously: NHS UK Fellowship · Pearl Health · Sri Ramachandra Hospital
              </p>
            </div>
          </motion.div>

          {/* Right column: Expertise + Publications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="glass rounded-2xl p-8 lg:p-10 space-y-8 hover:shadow-lg hover:shadow-primary/5 transition-shadow duration-500">
              <div className="space-y-4">
                <h3 className="font-serif-display text-xl font-semibold flex items-center gap-2 text-foreground">
                  <Award className="w-5 h-5 text-rose-gold" /> Surgical Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {expertise.map((e, i) => (
                    <motion.span
                      key={e}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.06 }}
                      className="px-3 py-1.5 rounded-full bg-primary/15 text-xs font-sans-body text-foreground tracking-wide hover:bg-primary/25 transition-colors duration-300 cursor-default"
                    >
                      {e}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif-display text-xl font-semibold flex items-center gap-2 text-foreground">
                  <BookOpen className="w-5 h-5 text-rose-gold" /> Publications
                </h3>
                <ul className="space-y-3">
                  <li className="text-sm text-muted-foreground font-sans-body flex items-start gap-2 group">
                    <Shield className="w-3.5 h-3.5 mt-1 text-primary flex-shrink-0 group-hover:text-rose-gold transition-colors" />
                    Immediate Breast Reconstruction — Quality of Life Outcomes (Journal of Plastic & Reconstructive Surgery)
                  </li>
                  <li className="text-sm text-muted-foreground font-sans-body flex items-start gap-2 group">
                    <Shield className="w-3.5 h-3.5 mt-1 text-primary flex-shrink-0 group-hover:text-rose-gold transition-colors" />
                    Post Mastectomy Radiation Therapy and Breast Reconstruction — A Collaborative Approach
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}