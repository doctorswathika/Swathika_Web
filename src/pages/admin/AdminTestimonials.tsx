import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Star, Loader2, Eye, EyeOff, GripVertical } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";

interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

export default function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", text: "", rating: 5 });
  const { toast } = useToast();

  const fetch = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("display_order");
    if (data) setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ name: "", text: "", rating: 5 });
    setDialogOpen(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({ name: t.name, text: t.text, rating: t.rating });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.text.trim()) return;
    setSaving(true);
    if (editing) {
      const { error } = await supabase.from("testimonials").update({ name: form.name, text: form.text, rating: form.rating }).eq("id", editing.id);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Updated" });
    } else {
      const { error } = await supabase.from("testimonials").insert({ name: form.name, text: form.text, rating: form.rating, display_order: items.length });
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Testimonial added" });
    }
    setSaving(false);
    setDialogOpen(false);
    fetch();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    toast({ title: "Deleted" });
    fetch();
  };

  const toggleActive = async (t: Testimonial) => {
    await supabase.from("testimonials").update({ is_active: !t.is_active }).eq("id", t.id);
    fetch();
  };

  if (loading) return <p className="text-muted-foreground font-sans-body">Loading...</p>;

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="font-serif-display text-3xl font-semibold text-foreground">Testimonials</h1>
          <p className="text-muted-foreground font-sans-body mt-2">Manage patient testimonials shown on the website.</p>
        </div>
        <Button onClick={openNew} className="gap-2"><Plus className="w-4 h-4" /> Add Testimonial</Button>
      </motion.div>

      <div className="space-y-3">
        {items.map((t) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-5 flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-serif-display font-semibold text-foreground">{t.name}</h3>
                {!t.is_active && <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">Hidden</span>}
              </div>
              <div className="flex gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < t.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground font-sans-body line-clamp-2">{t.text}</p>
            </div>
            <div className="flex gap-1.5 flex-shrink-0">
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => toggleActive(t)} title={t.is_active ? "Hide" : "Show"}>
                {t.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => openEdit(t)}><Edit2 className="w-4 h-4" /></Button>
              <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => handleDelete(t.id)}><Trash2 className="w-4 h-4" /></Button>
            </div>
          </motion.div>
        ))}
        {items.length === 0 && <p className="text-center text-muted-foreground font-sans-body py-12">No testimonials yet. Add your first one!</p>}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-serif-display">{editing ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="font-sans-body">Patient Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Priya S." className="mt-1.5" />
            </div>
            <div>
              <Label className="font-sans-body">Testimonial</Label>
              <Textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} rows={4} placeholder="Patient's review..." className="mt-1.5" />
            </div>
            <div>
              <Label className="font-sans-body">Rating</Label>
              <div className="flex gap-1 mt-1.5">
                {[1, 2, 3, 4, 5].map((r) => (
                  <button key={r} onClick={() => setForm({ ...form, rating: r })} className="p-1">
                    <Star className={`w-6 h-6 transition-colors ${r <= form.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              {editing ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
