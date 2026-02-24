import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Star, RefreshCw, Eye, EyeOff, Loader2, AlertCircle, CheckCircle, XCircle,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface GoogleReview {
  id: string;
  review_id: string;
  author_name: string;
  rating: number;
  text: string;
  profile_photo_url: string | null;
  relative_time: string;
  review_time: number;
  is_displayed: boolean;
  created_at: string;
}

export default function AdminGoogleReviews() {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [toggling, setToggling] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("google_reviews")
      .select("*")
      .order("review_time", { ascending: false });
    if (data) setReviews(data as GoogleReview[]);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    setLoading(false);
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleFetchFromGoogle = async () => {
    setFetching(true);
    try {
      const { data, error } = await supabase.functions.invoke("google-reviews");
      if (error) throw error;
      if (data?.error) {
        toast({ title: "API Error", description: data.error, variant: "destructive" });
      } else {
        toast({ title: "Reviews synced", description: `${data?.reviews?.length || 0} reviews fetched from Google.` });
        fetchReviews();
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
    setFetching(false);
  };

  const toggleDisplay = async (review: GoogleReview) => {
    setToggling(review.id);
    const { error } = await supabase
      .from("google_reviews")
      .update({ is_displayed: !review.is_displayed })
      .eq("id", review.id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setReviews((prev) =>
        prev.map((r) => r.id === review.id ? { ...r, is_displayed: !r.is_displayed } : r)
      );
    }
    setToggling(null);
  };

  const displayedCount = reviews.filter((r) => r.is_displayed).length;

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif-display text-3xl font-semibold text-foreground">Google Reviews</h1>
        <p className="text-muted-foreground font-sans-body mt-2">
          Fetch reviews from Google and select which ones to display on your website.
        </p>
      </motion.div>

      {/* Actions bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between flex-wrap gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-sans-body text-muted-foreground">
            {reviews.length} total reviews · <span className="text-primary font-medium">{displayedCount} displayed</span>
          </span>
        </div>
        <Button onClick={handleFetchFromGoogle} disabled={fetching} className="gap-2">
          {fetching ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          {fetching ? "Fetching..." : "Sync from Google"}
        </Button>
      </motion.div>

      {/* Info box */}
      {reviews.length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6 flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <div className="text-sm text-muted-foreground font-sans-body">
            <p className="font-medium text-foreground mb-1">No reviews yet</p>
            <p>Make sure you've configured your <strong>Google Places API Key</strong> and <strong>Place ID</strong> in the API Keys section, then click "Sync from Google" to fetch your reviews.</p>
          </div>
        </motion.div>
      )}

      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground font-sans-body">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading reviews...
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`glass rounded-2xl p-5 transition-all ${
                review.is_displayed ? "border-l-4 border-primary/50" : "opacity-70"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  {/* Author & rating */}
                  <div className="flex items-center gap-3">
                    {review.profile_photo_url && (
                      <img
                        src={review.profile_photo_url}
                        alt={review.author_name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="font-sans-body font-medium text-foreground text-sm">{review.author_name}</p>
                      <p className="text-xs text-muted-foreground font-sans-body">{review.relative_time}</p>
                    </div>
                    <div className="flex items-center gap-0.5 ml-auto">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Review text */}
                  <p className="font-sans-body text-sm text-muted-foreground leading-relaxed">
                    "{review.text}"
                  </p>
                </div>

                {/* Toggle */}
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <Switch
                    checked={review.is_displayed}
                    onCheckedChange={() => toggleDisplay(review)}
                    disabled={toggling === review.id}
                  />
                  <span className="text-[10px] text-muted-foreground font-sans-body">
                    {review.is_displayed ? "Visible" : "Hidden"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
