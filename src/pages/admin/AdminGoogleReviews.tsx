import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Star, Eye, EyeOff, Loader2, AlertCircle, Plus, Trash2, Pencil,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
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
        is_displayed: false,
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

                <div className="flex flex-col items-center gap-2 shrink-0">
                  <Switch
                    checked={review.is_displayed}
                    onCheckedChange={() => toggleDisplay(review)}
                    disabled={toggling === review.id}
                  />
                  <span className="text-[10px] text-muted-foreground font-sans-body">
                    {review.is_displayed ? "Visible" : "Hidden"}
                  </span>
                  <div className="flex gap-1 mt-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(review)}>
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(review.id)}
                      disabled={deleting === review.id}
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
    </div>
  );
}
