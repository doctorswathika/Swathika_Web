import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya M.",
    text: "Dr. Swathika's expertise and compassion made my entire journey feel safe and supported. Her surgical skill is matched only by her kindness. I am forever grateful.",
    rating: 5,
  },
  {
    name: "Lakshmi R.",
    text: "From diagnosis to recovery, Dr. Swathika was with me every step. The reconstructive outcome exceeded all my expectations. She truly changed my life.",
    rating: 5,
  },
  {
    name: "Ananya S.",
    text: "I travelled from abroad specifically for Dr. Swathika's expertise. Her UK training and meticulous approach gave me complete confidence. Exceptional care.",
    rating: 5,
  },
  {
    name: "Deepa K.",
    text: "The level of care and attention I received was extraordinary. Dr. Swathika explains everything clearly and makes you feel completely at ease. Highly recommended.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/30 to-background" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans-body mb-3">Testimonials</p>
          <h2 className="font-serif-display text-4xl lg:text-5xl font-semibold text-foreground">
            Trust & <span className="text-gradient-rose italic">Transformation</span>
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-3xl p-10 lg:p-14 text-center"
            >
              <Quote className="w-10 h-10 text-rose-gold mx-auto mb-6 opacity-60" />
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-rose-gold text-rose-gold" />
                ))}
              </div>
              <p className="font-serif-display text-xl lg:text-2xl text-foreground leading-relaxed mb-8 italic">
                "{testimonials[current].text}"
              </p>
              <p className="font-sans-body text-sm tracking-widest uppercase text-muted-foreground">
                — {testimonials[current].name}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-primary/10 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 gradient-rose-gold" : "bg-border"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-primary/10 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
