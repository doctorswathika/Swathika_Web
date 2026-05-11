import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Star, Eye, EyeOff, Loader2, AlertCircle, Plus, Trash2, Pencil, Quote,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from "@/components/ui/dialog";

interface GoogleReview {
  id: string;
  review_id: string | null;
  author_name: string;
  rating: number;
  text: string;
  profile_photo_url: string | null;
  relative_time: string | null;
  review_time: number | null;
  is_displayed: boolean;
  created_at: string;
}

const emptyForm = {
  author_name: "",
  rating: 5,
  text: "",
  profile_photo_url: "",
  relative_time: "",
};

export default function AdminGoogleReviews() {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [previewReview, setPreviewReview] = useState<GoogleReview | null>(null);
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

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (review: GoogleReview) => {
    setEditingId(review.id);
    setForm({
      author_name: review.author_name,
      rating: review.rating,
      text: review.text,
      profile_photo_url: review.profile_photo_url || "",
      relative_time: review.relative_time || "",
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.author_name.trim() || !form.text.trim()) {
      toast({ title: "Missing fields", description: "Name and review text are required.", variant: "destructive" });
      return;
    }
    setSaving(true);

    const payload = {
      author_name: form.author_name.trim(),
      rating: form.rating,
      text: form.text.trim(),
      profile_photo_url: form.profile_photo_url.trim() || null,
      relative_time: form.relative_time.trim() || null,
    };

    if (editingId) {
      const { error } = await supabase.from("google_reviews").update(payload).eq("id", editingId);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Updated", description: "Review updated successfully." });
      }
    } else {
      const { error } = await supabase.from("google_reviews").insert({
        ...payload,
        review_id: `manual_${Date.now()}`,
        review_time: Math.floor(Date.now() / 1000),
        is_displayed: true,
      });
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Added", description: "Review added successfully." });
      }
    }

    setSaving(false);
    setDialogOpen(false);
    fetchReviews();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    setDeleting(id);
    const { error } = await supabase.from("google_reviews").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setReviews((prev) => prev.filter((r) => r.id !== id));
      toast({ title: "Deleted", description: "Review removed." });
    }
    setDeleting(null);
  };

  const displayedCount = reviews.filter((r) => r.is_displayed).length;

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif-display text-3xl font-semibold text-foreground">Google Reviews</h1>
        <p className="text-muted-foreground font-sans-body mt-2">
          Manage reviews and select which ones to display on your website. Use a 3rd party widget to embed the live Google review feed, and manually curate featured reviews here.
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
        <Button onClick={openAdd} className="gap-2">
          <Plus className="w-4 h-4" /> Add Review
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
            <p>Click "Add Review" to manually add patient reviews that you want to feature on your website.</p>
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
                      {review.relative_time && (
                        <p className="text-xs text-muted-foreground font-sans-body">{review.relative_time}</p>
                      )}
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
                  <p className="font-sans-body text-sm text-muted-foreground leading-relaxed">
                    "{review.text}"
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0 min-w-[140px]">
                  <span className={`text-[10px] font-sans-body uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    review.is_displayed
                      ? "bg-primary/15 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {review.is_displayed ? "On site" : "Hidden"}
                  </span>

                  <div className="flex flex-wrap items-center justify-end gap-1.5 mt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 gap-1.5 text-xs"
                      onClick={() => setPreviewReview(review)}
                    >
                      <Quote className="w-3.5 h-3.5" /> Preview
                    </Button>
                    <Button
                      variant={review.is_displayed ? "secondary" : "default"}
                      size="sm"
                      className="h-8 gap-1.5 text-xs"
                      onClick={() => toggleDisplay(review)}
                      disabled={toggling === review.id}
                    >
                      {toggling === review.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : review.is_displayed ? (
                        <><EyeOff className="w-3.5 h-3.5" /> Hide</>
                      ) : (
                        <><Eye className="w-3.5 h-3.5" /> Show</>
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => openEdit(review)}
                      title="Edit"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(review.id)}
                      disabled={deleting === review.id}
                      title="Delete"
                    >
                      {deleting === review.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif-display">
              {editingId ? "Edit Review" : "Add Review"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {editingId ? "Edit an existing review" : "Add a new review"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="text-sm font-sans-body text-muted-foreground mb-1 block">Author Name *</label>
              <Input
                value={form.author_name}
                onChange={(e) => setForm({ ...form, author_name: e.target.value })}
                placeholder="e.g. Priya M."
              />
            </div>
            <div>
              <label className="text-sm font-sans-body text-muted-foreground mb-1 block">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} onClick={() => setForm({ ...form, rating: n })} type="button">
                    <Star className={`w-6 h-6 transition-colors ${n <= form.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-sans-body text-muted-foreground mb-1 block">Review Text *</label>
              <Textarea
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                placeholder="Patient review text..."
                rows={4}
              />
            </div>
            <div>
              <label className="text-sm font-sans-body text-muted-foreground mb-1 block">Profile Photo URL (optional)</label>
              <Input
                value={form.profile_photo_url}
                onChange={(e) => setForm({ ...form, profile_photo_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="text-sm font-sans-body text-muted-foreground mb-1 block">Time Description (optional)</label>
              <Input
                value={form.relative_time}
                onChange={(e) => setForm({ ...form, relative_time: e.target.value })}
                placeholder="e.g. 2 months ago"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving} className="gap-2">
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {editingId ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog — matches the live carousel card */}
      <Dialog open={!!previewReview} onOpenChange={(o) => !o && setPreviewReview(null)}>
        <DialogContent className="sm:max-w-2xl border-none bg-gradient-to-br from-[hsl(258_25%_12%)] via-[hsl(258_30%_10%)] to-[hsl(280_30%_12%)] p-0 overflow-hidden">
          <div className="relative p-8 sm:p-12">
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[hsl(43_85%_60%/0.10)] blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[hsl(340_70%_55%/0.12)] blur-3xl pointer-events-none" />

            <DialogHeader className="relative mb-2">
              <DialogTitle className="text-[10px] tracking-[0.45em] uppercase text-white/60 font-sans-body font-normal text-center">
                Live Preview
              </DialogTitle>
              <DialogDescription className="sr-only">
                Live preview of the google review
              </DialogDescription>
            </DialogHeader>

            {previewReview && (
              <div className="relative">
                <Quote className="absolute top-0 right-0 w-10 h-10 text-white/10" strokeWidth={1.2} />

                <header className="flex items-center justify-center gap-4 mb-6 mt-4">
                  {previewReview.profile_photo_url ? (
                    <img
                      src={previewReview.profile_photo_url}
                      alt={previewReview.author_name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-white/30"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(340_70%_55%)] to-[hsl(15_80%_60%)] ring-2 ring-white/30 flex items-center justify-center">
                      <span className="font-serif-display text-lg text-white">
                        {previewReview.author_name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="text-left">
                    <p className="font-serif-display text-lg text-white tracking-tight">
                      {previewReview.author_name}
                    </p>
                    {previewReview.relative_time && (
                      <p className="font-sans-body text-[10px] tracking-[0.35em] uppercase text-white/55 mt-0.5">
                        {previewReview.relative_time}
                      </p>
                    )}
                  </div>
                </header>

                <p className="font-serif-display text-center text-[1.1rem] sm:text-[1.25rem] leading-[1.6] text-white/90 font-light italic max-w-xl mx-auto">
                  &ldquo;{previewReview.text}&rdquo;
                </p>

                <footer className="flex items-center justify-center gap-1.5 mt-8">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-5 h-5 ${
                        idx < previewReview.rating
                          ? "fill-[hsl(43_85%_60%)] text-[hsl(43_85%_60%)]"
                          : "text-white/20"
                      }`}
                    />
                  ))}
                </footer>

                <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-white/10">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="gap-1.5"
                    onClick={() => {
                      toggleDisplay(previewReview);
                      setPreviewReview({ ...previewReview, is_displayed: !previewReview.is_displayed });
                    }}
                  >
                    {previewReview.is_displayed ? (
                      <><EyeOff className="w-3.5 h-3.5" /> Hide from site</>
                    ) : (
                      <><Eye className="w-3.5 h-3.5" /> Show on site</>
                    )}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setPreviewReview(null)}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
