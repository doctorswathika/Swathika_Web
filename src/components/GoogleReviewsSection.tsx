import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
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
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", duration: 35 },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  useEffect(() => {
    async function fetchDisplayedReviews() {
      const { data } = await supabase
        .from("google_reviews")
        .select("id, author_name, rating, text, profile_photo_url, relative_time, review_time")
        .eq("is_displayed", true)
        .order("review_time", { ascending: false })
        .limit(10);

      if (data && data.length > 0) {
        setReviews(data as Review[]);
      }
    }
    fetchDisplayedReviews();
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((idx: number) => emblaApi?.scrollTo(idx), [emblaApi]);

  const hasReviews = reviews.length > 0;

  return (
    <section className="relative py-28 lg:py-44 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(258_25%_12%)] via-[hsl(258_30%_10%)] to-[hsl(280_30%_12%)]" />
      <div className="absolute top-0 left-1/3 w-[520px] h-[520px] rounded-full bg-[hsl(340_70%_50%/0.18)] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[480px] h-[480px] rounded-full bg-[hsl(15_80%_60%/0.14)] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: EASE }}
          className="text-center mb-14 lg:mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-7 px-5 py-2 rounded-full bg-background/10 backdrop-blur border border-background/15">
            <GoogleLogo className="w-4 h-4" />
            <p className="text-[10px] tracking-[0.45em] uppercase text-background/80 font-sans-body">
              Google Reviews
            </p>
          </div>
          <h2 className="font-serif-display text-[2.75rem] sm:text-5xl lg:text-[4rem] font-light leading-[1.02] tracking-[-0.02em] text-background">
            What Patients <em className="opacity-80">Say</em>
          </h2>
        </motion.div>

        {hasReviews ? (
          <div className="relative">
            {/* Carousel viewport */}
            <div className="overflow-hidden px-2 sm:px-8" ref={emblaRef}>
              <div className="flex">
                {reviews.map((review, i) => {
                  const isActive = i === selectedIndex;
                  return (
                    <div
                      key={review.id}
                      className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_85%] lg:flex-[0_0_70%] px-3 sm:px-5"
                    >
                      <motion.article
                        animate={{
                          scale: isActive ? 1 : 0.92,
                          opacity: isActive ? 1 : 0.45,
                        }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className="relative mx-auto rounded-[2rem] p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-background/[0.08] via-background/[0.05] to-background/[0.02] backdrop-blur-2xl border border-background/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden"
                      >
                        {/* Royal gold accent corner */}
                        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[hsl(43_85%_60%/0.10)] blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[hsl(340_70%_55%/0.12)] blur-3xl pointer-events-none" />

                        <Quote
                          className="absolute top-6 right-6 w-10 h-10 lg:w-14 lg:h-14 text-background/10"
                          strokeWidth={1.2}
                        />

                        {/* Author header */}
                        <header className="flex items-center justify-center gap-4 mb-8">
                          {review.profile_photo_url ? (
                            <img
                              src={review.profile_photo_url}
                              alt={review.author_name}
                              className="w-14 h-14 rounded-full object-cover ring-2 ring-background/30"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[hsl(340_70%_55%)] to-[hsl(15_80%_60%)] ring-2 ring-background/30 flex items-center justify-center">
                              <span className="font-serif-display text-xl text-background">
                                {review.author_name.charAt(0)}
                              </span>
                            </div>
                          )}
                          <div className="text-center sm:text-left">
                            <p className="font-serif-display text-xl lg:text-2xl text-background tracking-tight">
                              {review.author_name}
                            </p>
                            <p className="font-sans-body text-[10px] tracking-[0.35em] uppercase text-background/55 mt-1">
                              {review.relative_time}
                            </p>
                          </div>
                        </header>

                        {/* Quote text — center */}
                        <AnimatePresence mode="wait">
                          {isActive && (
                            <motion.p
                              key={review.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.6, ease: EASE }}
                              className="relative font-serif-display text-center text-[1.25rem] sm:text-[1.5rem] lg:text-[1.75rem] leading-[1.55] text-background/90 font-light italic max-w-3xl mx-auto"
                            >
                              &ldquo;{review.text}&rdquo;
                            </motion.p>
                          )}
                          {!isActive && (
                            <p className="font-serif-display text-center text-[1.25rem] sm:text-[1.5rem] lg:text-[1.75rem] leading-[1.55] text-background/90 font-light italic max-w-3xl mx-auto line-clamp-4">
                              &ldquo;{review.text}&rdquo;
                            </p>
                          )}
                        </AnimatePresence>

                        {/* Stars — bottom */}
                        <footer className="flex items-center justify-center gap-1.5 mt-10">
                          {[...Array(5)].map((_, idx) => (
                            <Star
                              key={idx}
                              className={`w-5 h-5 lg:w-6 lg:h-6 ${
                                idx < review.rating
                                  ? "fill-[hsl(43_85%_60%)] text-[hsl(43_85%_60%)]"
                                  : "text-background/20"
                              }`}
                            />
                          ))}
                        </footer>
                      </motion.article>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Arrows */}
            {reviews.length > 1 && (
              <>
                <button
                  onClick={scrollPrev}
                  aria-label="Previous review"
                  className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 lg:w-14 lg:h-14 rounded-full items-center justify-center bg-background/10 hover:bg-background/20 backdrop-blur border border-background/20 text-background transition-all hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={scrollNext}
                  aria-label="Next review"
                  className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 lg:w-14 lg:h-14 rounded-full items-center justify-center bg-background/10 hover:bg-background/20 backdrop-blur border border-background/20 text-background transition-all hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Dots */}
            {reviews.length > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollTo(i)}
                    aria-label={`Go to review ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === selectedIndex
                        ? "w-8 bg-gradient-to-r from-[hsl(340_70%_55%)] to-[hsl(43_85%_60%)]"
                        : "w-1.5 bg-background/30 hover:bg-background/50"
                    }`}
                  />
                ))}
              </div>
            )}
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
