import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { X, CheckCircle } from "lucide-react";
import { z } from "zod";

const services = [
  { title: "Wide Local Excision", desc: "Precise removal of breast tumours while preserving the natural breast shape and appearance." },
  { title: "Sentinel Lymph Node Biopsy", desc: "Minimally invasive technique to stage breast cancer and guide further treatment decisions." },
  { title: "Therapeutic Mammoplasty", desc: "Combining cancer surgery with breast reshaping for optimal oncological and aesthetic outcomes." },
  { title: "Mastectomy", desc: "Complete breast removal with meticulous surgical technique for cancer treatment or risk reduction." },
  { title: "Implant-based Reconstruction", desc: "Restoring breast form using implant techniques tailored to individual anatomy and preferences." },
  { title: "Lipofilling", desc: "Using the patient's own fat to refine breast shape and correct contour deformities after surgery." },
  { title: "Chest Wall Perforator Flaps", desc: "Advanced flap techniques using local tissue to reconstruct the breast without distant donor sites." },
  { title: "Breast Reduction & Augmentation", desc: "Aesthetic and functional breast surgery for improved comfort, symmetry, and confidence." },
];

const formSchema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(6).max(20),
  email: z.string().trim().email().max(255),
  date: z.string().trim().min(1),
  message: z.string().trim().max(1000),
});

export default function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Separate observer that tracks when section leaves viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let wasInView = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          wasInView = true;
        } else if (wasInView && !showModal) {
          // Only trigger when scrolling DOWN (section scrolled above viewport)
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="group glass rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500 cursor-pointer"
              style={{ perspective: "800px" }}
            >
              <h3 className="font-serif-display text-lg font-semibold text-foreground mb-3 relative inline-block">
                {s.title}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 gradient-rose-gold group-hover:w-full transition-all duration-500" />
              </h3>
              <p className="text-sm text-muted-foreground font-sans-body leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
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
