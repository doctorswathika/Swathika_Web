import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Star, ChevronLeft, ChevronRight, Quote, MessageSquareQuote, BadgeCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const EASE = [0.22, 1, 0.36, 1] as const;
const POLL_INTERVAL_MS = 60_000; // refetch displayed reviews every 60s
const REMOTE_SYNC_INTERVAL_MS = 10 * 60_000; // trigger Google Places sync every 10 min

interface Review {
  id: string;
  author_name: string;
  rating: number;
  text: string;
  profile_photo_url: string | null;
  relative_time: string;
  review_time: number | null;
}

const GoogleLogo = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.2 5.2C41.2 36 44 30.5 44 24c0-1.3-.1-2.3-.4-3.5z"/>
  </svg>
);

function ReviewSkeleton() {
  return (
    <div className="mx-auto rounded-[2rem] p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-background/[0.06] via-background/[0.04] to-background/[0.02] backdrop-blur-2xl border border-background/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden relative">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-background/[0.06] to-transparent pointer-events-none" />
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-full bg-background/10" />
        <div className="space-y-2">
          <div className="h-4 w-40 rounded bg-background/10" />
          <div className="h-2 w-24 rounded bg-background/10" />
        </div>
      </div>
      <div className="max-w-3xl mx-auto space-y-3">
        <div className="h-4 rounded bg-background/10 w-[92%] mx-auto" />
        <div className="h-4 rounded bg-background/10 w-[86%] mx-auto" />
        <div className="h-4 rounded bg-background/10 w-[78%] mx-auto" />
        <div className="h-4 rounded bg-background/10 w-[60%] mx-auto" />
      </div>
      <div className="flex items-center justify-center gap-1.5 mt-10">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-5 h-5 rounded bg-background/10" />
        ))}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="relative max-w-2xl mx-auto rounded-[2rem] p-12 lg:p-16 text-center bg-gradient-to-br from-background/[0.06] via-background/[0.04] to-background/[0.02] backdrop-blur-2xl border border-background/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden"
    >
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[hsl(43_85%_60%/0.10)] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[hsl(340_70%_55%/0.12)] blur-3xl pointer-events-none" />
      <div className="relative">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-background/10 border border-background/20 flex items-center justify-center">
          <MessageSquareQuote className="w-7 h-7 text-background/70" strokeWidth={1.4} />
        </div>
        <h3 className="font-serif-display text-2xl lg:text-3xl text-background font-light tracking-tight mb-3">
          Patient stories, coming soon
        </h3>
        <p className="font-sans-body text-background/65 text-[14px] leading-relaxed max-w-md mx-auto">
          We are gathering thoughtful reflections from those who have walked this journey. Their words will appear here shortly.
        </p>
      </div>
    </motion.div>
  );
}

export default function GoogleReviewsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const lastRemoteSyncRef = useRef(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", duration: 35, containScroll: false, skipSnaps: false, dragFree: false },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const fetchDisplayedReviews = useCallback(async () => {
    // 5★ first, then 4★, etc.; within rating, newest first
    const { data } = await supabase
      .from("google_reviews")
      .select("id, author_name, rating, text, profile_photo_url, relative_time, review_time")
      .eq("is_displayed", true)
      .order("rating", { ascending: false })
      .order("review_time", { ascending: false, nullsFirst: false })
      .limit(10);

    if (data) {
      setReviews((prev) => {
        const next = data as Review[];
        // shallow-compare ids+text to avoid unnecessary re-renders
        const sameLength = prev.length === next.length;
        const sameOrder = sameLength && prev.every((r, i) => r.id === next[i].id && r.text === next[i].text);
        return sameOrder ? prev : next;
      });
    }
    setLoading(false);
  }, []);

  const triggerRemoteSync = useCallback(async () => {
    const now = Date.now();
    if (now - lastRemoteSyncRef.current < REMOTE_SYNC_INTERVAL_MS) return;
    lastRemoteSyncRef.current = now;
    try {
      // Fire-and-forget; the edge function upserts new Google Places reviews into the DB
      await supabase.functions.invoke("google-reviews");
      await fetchDisplayedReviews();
    } catch {
      /* silent — local DB rows still serve the carousel */
    }
  }, [fetchDisplayedReviews]);

  // Initial load + periodic poll + remote sync trigger
  useEffect(() => {
    fetchDisplayedReviews();
    triggerRemoteSync();

    const pollId = setInterval(fetchDisplayedReviews, POLL_INTERVAL_MS);
    const syncId = setInterval(triggerRemoteSync, REMOTE_SYNC_INTERVAL_MS);

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        fetchDisplayedReviews();
        triggerRemoteSync();
      }
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      clearInterval(pollId);
      clearInterval(syncId);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [fetchDisplayedReviews, triggerRemoteSync]);

  // Realtime: react instantly to admin toggling visibility / inserts
  useEffect(() => {
    const channel = supabase
      .channel("google_reviews_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "google_reviews" },
        () => fetchDisplayedReviews()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchDisplayedReviews]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    // re-init when reviews length changes so loop & snaps update
    emblaApi.reInit();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, reviews.length]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((idx: number) => emblaApi?.scrollTo(idx), [emblaApi]);

  const hasReviews = reviews.length > 0;

  return (
    <section className="relative py-28 lg:py-44 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(270_45%_18%)] via-[hsl(265_50%_14%)] to-[hsl(280_55%_20%)]" />
      <div className="absolute top-0 left-1/3 w-[520px] h-[520px] rounded-full bg-[hsl(280_60%_55%/0.22)] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[480px] h-[480px] rounded-full bg-[hsl(260_55%_60%/0.20)] blur-[120px] pointer-events-none" />

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

        {loading ? (
          <ReviewSkeleton />
        ) : !hasReviews ? (
          <EmptyState />
        ) : (
          <div className="relative" style={{ perspective: "1800px" }}>
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {reviews.map((review, i) => {
                  const isActive = i === selectedIndex;
                  const offset = i - selectedIndex;
                  return (
                    <div
                      key={review.id}
                      className="flex-[0_0_92%] min-w-0 sm:flex-[0_0_82%] lg:flex-[0_0_68%] px-3 sm:px-5"
                      style={{ perspective: "1800px" }}
                    >
                      <motion.article
                        animate={{
                          scale: isActive ? 1 : 0.82,
                          opacity: isActive ? 1 : 0.28,
                          rotateY: isActive ? 0 : offset > 0 ? -18 : 18,
                          y: isActive ? 0 : 24,
                          filter: isActive ? "blur(0px)" : "blur(2px)",
                        }}
                        transition={{ duration: 0.95, ease: EASE }}
                        style={{ transformStyle: "preserve-3d" }}
                        className="relative mx-auto rounded-[2rem] p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-background/[0.10] via-background/[0.05] to-background/[0.02] backdrop-blur-2xl border border-background/15 shadow-[0_40px_100px_-25px_rgba(0,0,0,0.65)] overflow-hidden"
                      >
                        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[hsl(280_60%_55%/0.18)] blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[hsl(260_55%_60%/0.18)] blur-3xl pointer-events-none" />

                        <Quote
                          className="absolute top-6 right-6 w-10 h-10 lg:w-14 lg:h-14 text-background/10"
                          strokeWidth={1.2}
                        />

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

                        <AnimatePresence mode="wait">
                          {isActive ? (
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
                          ) : (
                            <p className="font-serif-display text-center text-[1.25rem] sm:text-[1.5rem] lg:text-[1.75rem] leading-[1.55] text-background/90 font-light italic max-w-3xl mx-auto line-clamp-4">
                              &ldquo;{review.text}&rdquo;
                            </p>
                          )}
                        </AnimatePresence>

                        <footer className="mt-10 flex flex-col items-center gap-5">
                          <div className="flex items-center gap-1.5">
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
                          </div>

                          {/* Royal trust badges row */}
                          <div className="flex flex-wrap items-center justify-center gap-2.5">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/[0.06] border border-[hsl(43_85%_60%/0.30)] backdrop-blur">
                              <BadgeCheck className="w-3.5 h-3.5 text-[hsl(43_85%_65%)]" strokeWidth={2} />
                              <span className="font-sans-body text-[10px] tracking-[0.28em] uppercase text-background/75">
                                Verified Google Reviewer
                              </span>
                            </span>
                            {review.relative_time && (
                              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-background/[0.04] border border-background/15 backdrop-blur">
                                <span className="font-sans-body text-[10px] tracking-[0.28em] uppercase text-background/65">
                                  {review.relative_time}
                                </span>
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-[hsl(340_70%_55%/0.18)] to-[hsl(43_85%_60%/0.18)] border border-background/15 backdrop-blur">
                              <Star className="w-3 h-3 fill-[hsl(43_85%_65%)] text-[hsl(43_85%_65%)]" />
                              <span className="font-sans-body text-[10px] tracking-[0.28em] uppercase text-background/80">
                                {review.rating.toFixed(1)} / 5
                              </span>
                            </span>
                          </div>
                        </footer>
                      </motion.article>
                    </div>
                  );
                })}
              </div>
            </div>

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
        )}
      </div>
    </section>
  );
}
