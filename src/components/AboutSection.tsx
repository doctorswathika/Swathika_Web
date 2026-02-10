import { motion } from "framer-motion";
import { useScrollAnimation, useAnimatedCounter } from "@/hooks/useScrollAnimation";
import { Award, GraduationCap, Briefcase, Shield } from "lucide-react";

const credentials = [
  "MBBS — Sri Ramachandra Institute",
  "MS General Surgery — Sri Ramachandra Institute",
  "MCh Breast Oncoplasty & Reconstructive Surgery — Edge Hill University, UK",
  "GMC Registered (UK)",
  "Member, Association of Breast Surgeons (ABS)",
  "Member, Association of Surgeons of India",
];

const expertise = [
  "Wide Local Excision",
  "Sentinel Lymph Node Biopsy",
  "Therapeutic Mammoplasty",
  "Mastectomy",
  "Implant-based Reconstruction",
  "Lipofilling",
  "Chest Wall Perforator Flaps",
  "Breast Reduction & Augmentation",
];

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();
  const procedures = useAnimatedCounter(600, 2000, isVisible);
  const years = useAnimatedCounter(6, 1500, isVisible);

  return (
    <section id="about" className="py-24 lg:py-32 bg-background relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans-body mb-3">About the Surgeon</p>
          <h2 className="font-serif-display text-4xl lg:text-5xl font-semibold text-foreground">
            Expertise & <span className="text-gradient-rose italic">Philosophy</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Portrait side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >

            {/* Counters */}
            <div className="flex gap-8">
              <div className="text-center">
                <span className="font-serif-display text-5xl font-bold text-gradient-rose">{procedures}+</span>
                <p className="text-sm text-muted-foreground font-sans-body mt-1">Procedures</p>
              </div>
              <div className="text-center">
                <span className="font-serif-display text-5xl font-bold text-gradient-rose">{years}+</span>
                <p className="text-sm text-muted-foreground font-sans-body mt-1">Years Experience</p>
              </div>
            </div>
          </motion.div>

          {/* Bio card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass rounded-2xl p-8 lg:p-10 space-y-8"
          >
            <p className="text-muted-foreground font-sans-body leading-relaxed text-base">
              Dr. Swathika Rajendran is a UK-trained Breast Oncoplastic & Reconstructive Surgeon currently practicing at Kauvery Hospital, Chennai. With extensive training in the UK's NHS system and fellowship in oncoplastic breast surgery, she brings global expertise with a compassionate, patient-first approach to every procedure.
            </p>

            <div className="space-y-4">
              <h3 className="font-serif-display text-xl font-semibold flex items-center gap-2 text-foreground">
                <GraduationCap className="w-5 h-5 text-rose-gold" /> Credentials
              </h3>
              <ul className="space-y-2">
                {credentials.map((c) => (
                  <li key={c} className="text-sm text-muted-foreground font-sans-body flex items-start gap-2">
                    <Shield className="w-3.5 h-3.5 mt-1 text-primary flex-shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif-display text-xl font-semibold flex items-center gap-2 text-foreground">
                <Award className="w-5 h-5 text-rose-gold" /> Surgical Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {expertise.map((e) => (
                  <span
                    key={e}
                    className="px-3 py-1.5 rounded-full bg-primary/15 text-xs font-sans-body text-foreground tracking-wide"
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif-display text-xl font-semibold flex items-center gap-2 text-foreground">
                <Briefcase className="w-5 h-5 text-rose-gold" /> Current Practice
              </h3>
              <p className="text-sm text-muted-foreground font-sans-body">
                Consultant Breast Oncoplastic Surgeon — Kauvery Hospital, Chennai
              </p>
              <p className="text-sm text-muted-foreground font-sans-body">
                Previously: NHS UK Fellowship · Pearl Health · Sri Ramachandra Hospital
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
