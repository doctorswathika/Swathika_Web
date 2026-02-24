import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/useSiteContent";

interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
}

export default function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [current, setCurrent] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const { getText, getAlignClass } = useSiteContent();

  const subtitle = getText("testimonials_subtitle", "Testimonials");
  const title = getText("testimonials_title", "Words from My <span class=\"text-gradient-rose italic\">Patients</span>");

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data } = await supabase
        .from("testimonials")
        .select("id, name, text, rating")
        .eq("is_active", true)
        .order("display_order");
      if (data && data.length > 0) setTestimonials(data);
    };
    fetchTestimonials();
  }, []);

  const next = useCallback(() => {
    if (testimonials.length === 0) return;
    setCurrent((c) => (c + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    if (testimonials.length === 0) return;
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (!isVisible || testimonials.length === 0) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isVisible, next, testimonials.length]);

  return (
    <section id="testimonials" className="py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/30 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className={`mb-16 ${getAlignClass("testimonials_title")}`}
        >
          <p className={`text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans-body mb-3 ${getAlignClass("testimonials_subtitle")}`}
            dangerouslySetInnerHTML={{ __html: subtitle }} />
          <h2 className="font-serif-display text-4xl lg:text-5xl font-semibold text-foreground"
            dangerouslySetInnerHTML={{ __html: title }} />
          <div className="divider-rose w-24 mx-auto mt-6" />
        </motion.div>

        {testimonials.length > 0 && (
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-3xl p-10 lg:p-14 text-center"
              >
                <Quote className="w-10 h-10 text-rose-gold mx-auto mb-6 opacity-50" />
                <div className="flex justify-center gap-1.5 mb-6">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                    >
                      <Star className="w-5 h-5 fill-rose-gold text-rose-gold" />
                    </motion.div>
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

            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`rounded-full transition-all duration-500 ${
                      i === current ? "w-8 h-2.5 gradient-rose-gold" : "w-2.5 h-2.5 bg-border hover:bg-muted-foreground"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
