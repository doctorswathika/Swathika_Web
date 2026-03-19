import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Star, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Review {
  id: string;
  author_name: string;
  rating: number;
  text: string;
  profile_photo_url: string | null;
  relative_time: string;
}

// No fallback reviews — only real Google reviews from DB

export default function GoogleReviewsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [current, setCurrent] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loaded, setLoaded] = useState(false);

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
      setLoaded(true);
    }
    fetchDisplayedReviews();
  }, []);

  const next = useCallback(() => setCurrent((c) => (c + 1) % reviews.length), [reviews.length]);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isVisible, next]);

  // Reset current if reviews change
  useEffect(() => { setCurrent(0); }, [reviews.length]);

  const hasReviews = reviews.length > 0;

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" ref={ref}>
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/95 to-foreground" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blush/10 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          {/* Google icon */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="text-sm tracking-[0.3em] uppercase text-background/70 font-sans-body">Google Reviews</span>
          </div>
          <h2 className="font-serif-display text-4xl lg:text-5xl font-semibold text-background">
            What Patients <span className="italic opacity-80">Say</span>
          </h2>
          <div className="w-24 h-px mx-auto mt-6 bg-background/30" />
        </motion.div>

        {hasReviews ? (
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="bg-background/10 backdrop-blur-md border border-background/20 rounded-2xl p-8 lg:p-12"
              >
                <div className="flex items-center gap-1.5 mb-5">
                  {[...Array(reviews[current].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="font-sans-body text-background/90 text-base lg:text-lg leading-relaxed mb-6">
                  "{reviews[current].text}"
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {reviews[current].profile_photo_url && (
                      <img
                        src={reviews[current].profile_photo_url!}
                        alt={reviews[current].author_name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="font-sans-body text-sm font-medium text-background">{reviews[current].author_name}</p>
                      <p className="font-sans-body text-xs text-background/50">{reviews[current].relative_time}</p>
                    </div>
                  </div>
                  <svg viewBox="0 0 24 24" className="w-5 h-5 opacity-40" aria-hidden="true">
                    <path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                    <path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#fff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#fff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-500 ${
                    i === current ? "w-8 h-2.5 bg-background" : "w-2.5 h-2.5 bg-background/30 hover:bg-background/50"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-background/10 backdrop-blur-md border border-background/20 rounded-2xl p-8 lg:p-12 text-center">
            <p className="font-sans-body text-background/60 text-base">
              Reviews will appear here once configured from the admin panel.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
