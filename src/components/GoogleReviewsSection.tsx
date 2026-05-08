import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Star } from "lucide-react";
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

const GoogleLogo = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.2 5.2C41.2 36 44 30.5 44 24c0-1.3-.1-2.3-.4-3.5z"/>
  </svg>
);

export default function GoogleReviewsSection() {
  const { ref, isVisible } = useScrollAnimation();
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

  const hasReviews = reviews.length > 0;

  return (
    <section className="relative py-28 lg:py-44 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(258_25%_12%)] via-[hsl(258_30%_10%)] to-[hsl(280_30%_12%)]" />
      <div className="absolute top-0 left-1/3 w-[520px] h-[520px] rounded-full bg-[hsl(340_70%_50%/0.18)] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[480px] h-[480px] rounded-full bg-[hsl(15_80%_60%/0.14)] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: EASE }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-7 px-5 py-2 rounded-full bg-background/10 backdrop-blur border border-background/15">
            <GoogleLogo className="w-4 h-4" />
            <p className="text-[10px] tracking-[0.45em] uppercase text-background/80 font-sans-body">
              Google Reviews
            </p>
          </div>
          <h2 className="font-serif-display text-[2.75rem] sm:text-5xl lg:text-[4rem] font-light leading-[1.02] tracking-[-0.02em] text-background flex items-center justify-center gap-4 flex-wrap">
            <GoogleLogo className="w-9 h-9 lg:w-12 lg:h-12" />
            What Patients <em className="opacity-80">Say</em>
          </h2>
        </motion.div>

        {hasReviews ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {reviews.map((review, i) => (
              <motion.article
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
                className="group relative flex flex-col h-full p-7 lg:p-8 rounded-2xl bg-background/[0.04] backdrop-blur-xl border border-background/10 hover:border-background/25 hover:bg-background/[0.07] transition-all duration-500"
              >
                {/* Header — name on top */}
                <header className="flex items-center gap-4 pb-5 border-b border-background/10">
                  {review.profile_photo_url ? (
                    <img
                      src={review.profile_photo_url}
                      alt={review.author_name}
                      className="w-11 h-11 rounded-full object-cover ring-1 ring-background/30 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-background/15 ring-1 ring-background/30 flex items-center justify-center flex-shrink-0">
                      <span className="font-serif-display text-lg text-background">
                        {review.author_name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-sans-body text-[15px] font-medium text-background truncate">
                      {review.author_name}
                    </p>
                    <p className="font-sans-body text-[10px] tracking-[0.3em] uppercase text-background/55 mt-1">
                      {review.relative_time}
                    </p>
                  </div>
                  <GoogleLogo className="w-5 h-5 flex-shrink-0 opacity-90" />
                </header>

                {/* Content — middle */}
                <p className="flex-1 py-6 font-sans-body text-[14.5px] lg:text-[15px] leading-[1.8] text-background/85 font-light">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Rating — bottom */}
                <footer className="flex items-center gap-1 pt-5 border-t border-background/10">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-4 h-4 ${
                        idx < review.rating
                          ? "fill-[hsl(43_85%_60%)] text-[hsl(43_85%_60%)]"
                          : "text-background/20"
                      }`}
                    />
                  ))}
                </footer>
              </motion.article>
            ))}
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
