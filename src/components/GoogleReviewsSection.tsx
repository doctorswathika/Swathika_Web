import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Star, Quote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Review {
  id: string;
  author_name: string;
  rating: number;
  text: string;
  profile_photo_url: string | null;
  relative_time: string;
}

export default function GoogleReviewsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [current, setCurrent] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    async function fetchDisplayedReviews() {
      const { data } = await supabase
        .from("google_reviews")
        .select("id, author_name, rating, text, profile_photo_url, relative_time")
        .eq("is_displayed", true)
        .order("review_time", { ascending: false });

      if (data && data.length > 0) {
        setReviews(data as Review[]);
      }
    }
    fetchDisplayedReviews();
  }, []);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % reviews.length),
    [reviews.length],
  );

  useEffect(() => {
    if (!isVisible || reviews.length < 2) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isVisible, next, reviews.length]);

  useEffect(() => {
    setCurrent(0);
  }, [reviews.length]);

  const hasReviews = reviews.length > 0;

  return (
    <section className="relative py-28 lg:py-44 overflow-hidden" ref={ref}>
      {/* Deep ambient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(258_25%_12%)] via-[hsl(258_30%_10%)] to-[hsl(280_30%_12%)]" />
      <div className="absolute top-0 left-1/3 w-[520px] h-[520px] rounded-full bg-[hsl(340_70%_50%/0.18)] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[480px] h-[480px] rounded-full bg-[hsl(15_80%_60%/0.14)] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: EASE }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-4 mb-7">
            <span className="h-px w-12 bg-background/40" />
            <p className="text-[10px] tracking-[0.45em] uppercase text-background/65 font-sans-body">
              Google Reviews
            </p>
            <span className="h-px w-12 bg-background/40" />
          </div>
          <h2 className="font-serif-display text-[2.75rem] sm:text-5xl lg:text-[4rem] font-light leading-[1.02] tracking-[-0.02em] text-background">
            What Patients <em className="opacity-80">Say</em>
          </h2>
        </motion.div>

        {hasReviews ? (
          <div className="relative">
            <Quote className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 text-background/15 pointer-events-none" />
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.9, ease: EASE }}
                className="text-center max-w-3xl mx-auto"
              >
                <div className="flex items-center justify-center gap-1.5 mb-8">
                  {[...Array(reviews[current].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[hsl(43_85%_60%)] text-[hsl(43_85%_60%)]" />
                  ))}
                </div>
                <p className="font-serif-display text-2xl lg:text-[2rem] font-light italic text-background/95 leading-[1.45] tracking-[-0.01em] mb-10">
                  &ldquo;{reviews[current].text}&rdquo;
                </p>
                <div className="flex items-center justify-center gap-4">
                  {reviews[current].profile_photo_url && (
                    <img
                      src={reviews[current].profile_photo_url!}
                      alt={reviews[current].author_name}
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-background/30"
                    />
                  )}
                  <div className="text-left">
                    <p className="font-sans-body text-sm font-medium text-background tracking-wide">
                      {reviews[current].author_name}
                    </p>
                    <p className="font-sans-body text-[11px] tracking-[0.3em] uppercase text-background/55">
                      {reviews[current].relative_time}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Hairline dots */}
            <div className="flex justify-center gap-3 mt-14">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-px transition-all duration-700 ${
                    i === current
                      ? "w-12 bg-background"
                      : "w-6 bg-background/30 hover:bg-background/60"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-background/60 font-sans-body font-light py-12">
            Reviews will appear here once configured from the admin panel.
          </div>
        )}
      </div>
    </section>
  );
}
