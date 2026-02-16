import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { X, CheckCircle } from "lucide-react";
import { z } from "zod";
import { Link } from "react-router-dom";

import mastectomyImg from "@/assets/services/mastectomy.jpg";
import breastConservingImg from "@/assets/services/breast-conserving.jpg";
import sentinelNodeImg from "@/assets/services/sentinel-node.jpg";
import oncoplasticImg from "@/assets/services/oncoplastic.jpg";
import reductionAugmentationImg from "@/assets/services/reduction-augmentation.jpg";
import lipomodellingImg from "@/assets/services/lipomodelling.jpg";
import implantReconstructionImg from "@/assets/services/implant-reconstruction.jpg";
import gynaecomastiaImg from "@/assets/services/gynaecomastia.jpg";

const clinicalServices = [
  { title: "Mastectomy", img: mastectomyImg, slug: "mastectomy" },
  { title: "Breast Conserving Surgery", img: breastConservingImg, slug: "breast-conserving-surgery" },
  { title: "Sentinel Node Biopsy", img: sentinelNodeImg, slug: "sentinel-node-biopsy" },
  { title: "Oncoplastic Surgery", img: oncoplasticImg, slug: "oncoplastic-surgery" },
];

const cosmeticServices = [
  { title: "Breast Reduction & Augmentation", img: reductionAugmentationImg, slug: "breast-reduction-augmentation" },
  { title: "Lipomodelling", img: lipomodellingImg, slug: "lipomodelling" },
  { title: "Implant Reconstruction", img: implantReconstructionImg, slug: "implant-reconstruction" },
  { title: "Gynaecomastia Correction", img: gynaecomastiaImg, slug: "gynaecomastia-correction" },
];

const formSchema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(6).max(20),
  email: z.string().trim().email().max(255),
  date: z.string().trim().min(1),
  message: z.string().trim().max(1000),
});

function ServiceCard({ title, img, slug, index, isVisible }: { title: string; img: string; slug: string; index: number; isVisible: boolean }) {
  return (
    <Link to={`/services/${slug}`} onClick={() => window.scrollTo(0, 0)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
        className="group glass rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/15 transition-shadow duration-500 cursor-pointer"
      >
        <div className="aspect-square overflow-hidden relative">
          {/* Animated glow overlay */}
          <motion.div
            className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: "radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.15), transparent 70%)",
            }}
          />
          {/* Floating animation on image */}
          <motion.img
            src={img}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
            animate={{
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.8,
            }}
            whileHover={{
              scale: 1.08,
              transition: { duration: 0.5 },
            }}
          />
          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 40%, hsl(0 0% 100% / 0.12) 50%, transparent 60%)",
            }}
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5 + 2,
              repeatDelay: 3,
            }}
          />
        </div>
        <div className="p-4 text-center">
          <motion.h3
            className="relative font-serif-display text-lg font-semibold text-foreground inline-block"
            whileHover={{ scale: 1.02 }}
          >
            {title}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] gradient-rose-gold group-hover:w-full transition-all duration-300" />
          </motion.h3>
        </div>
      </motion.div>
    </Link>
  );
}
export default function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let wasInView = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          wasInView = true;
        } else if (wasInView && !showModal) {
          if (entry.boundingClientRect.bottom < 0) {
            setShowModal(true);
            wasInView = false;
          }
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [showModal]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd);
    const result = formSchema.safeParse(data);
    if (!result.success) return;
    setSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      setTimeout(() => setSubmitted(false), 500);
    }, 2500);
  };

  return (
    <section id="services" className="py-24 lg:py-32 bg-background relative" ref={(el: HTMLDivElement | null) => { (ref as React.MutableRefObject<HTMLDivElement | null>).current = el; sectionRef.current = el; }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans-body mb-3">Our Services</p>
          <h2 className="font-serif-display text-4xl lg:text-5xl font-semibold text-foreground">
            Signature <span className="text-gradient-rose italic">Treatments</span>
          </h2>
        </motion.div>

        {/* Clinical Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <h3 className="font-serif-display text-2xl lg:text-3xl font-semibold text-foreground mb-8 text-center">
            Clinical
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clinicalServices.map((s, i) => (
              <ServiceCard key={s.title} title={s.title} img={s.img} slug={s.slug} index={i} isVisible={isVisible} />
            ))}
          </div>
        </motion.div>

        {/* Cosmetic Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="font-serif-display text-2xl lg:text-3xl font-semibold text-foreground mb-8 text-center">
            Cosmetic
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cosmeticServices.map((s, i) => (
              <ServiceCard key={s.title} title={s.title} img={s.img} slug={s.slug} index={i + 4} isVisible={isVisible} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Consultation Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-background rounded-2xl shadow-2xl max-w-md w-full p-8 border border-border"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {!submitted ? (
                <>
                  <h3 className="font-serif-display text-2xl font-semibold text-foreground mb-2">
                    Schedule Your <span className="text-gradient-rose">Private Consultation</span>
                  </h3>
                  <p className="text-sm text-muted-foreground font-sans-body mb-6">
                    Take the first step towards expert care.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="name" required placeholder="Full Name" maxLength={100} className="w-full px-4 py-3 rounded-xl border border-border bg-accent/30 text-foreground font-sans-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                    <input name="phone" required placeholder="Phone Number" maxLength={20} className="w-full px-4 py-3 rounded-xl border border-border bg-accent/30 text-foreground font-sans-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                    <input name="email" type="email" required placeholder="Email Address" maxLength={255} className="w-full px-4 py-3 rounded-xl border border-border bg-accent/30 text-foreground font-sans-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                    <input name="date" type="date" required className="w-full px-4 py-3 rounded-xl border border-border bg-accent/30 text-foreground font-sans-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                    <textarea name="message" placeholder="Your Message (optional)" maxLength={1000} rows={3} className="w-full px-4 py-3 rounded-xl border border-border bg-accent/30 text-foreground font-sans-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
                    <button type="submit" className="w-full py-3 rounded-full gradient-rose-gold text-foreground font-sans-body font-medium tracking-wide hover:opacity-90 transition-opacity">
                      Request Consultation
                    </button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h3 className="font-serif-display text-2xl font-semibold text-foreground mb-2">Thank You!</h3>
                  <p className="text-sm text-muted-foreground font-sans-body">We'll get back to you shortly.</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
