import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Type, ImageIcon, Save, Upload, Trash2, Copy,
  Loader2, ChevronDown, ChevronRight, RefreshCw,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RichTextEditor from "@/components/RichTextEditor";

interface SiteContent {
  id: string;
  section_key: string;
  section_label: string;
  content: string;
  updated_at: string;
}

interface StorageFile {
  name: string;
  id: string;
  created_at: string;
  metadata: Record<string, any> | null;
}

const SECTION_GROUPS: { key: string; label: string }[] = [
  { key: "hero", label: "🏠 Hero Section" },
  { key: "about", label: "👩‍⚕️ About Section" },
  { key: "services", label: "🩺 Services Section" },
  { key: "awareness", label: "💗 Awareness Section" },
  { key: "testimonials", label: "⭐ Testimonials Section" },
  { key: "consultation", label: "📅 Consultation Modal" },
  { key: "footer", label: "📍 Footer Section" },
];

const RICH_TEXT_KEYS = [
  "hero_headline", "hero_description",
  "about_tagline", "about_paragraph_1", "about_paragraph_2",
  "about_subheading", "about_paragraph_3", "about_paragraph_4",
  "services_title",
  "awareness_title", "awareness_description",
  "testimonials_title",
  "footer_brand_description", "footer_disclaimer",
  "consultation_title", "consultation_description",
];

const TEXTAREA_KEYS = [
  "awareness_symptoms", "awareness_dos", "awareness_donts",
  "hero_trust_indicators",
];

// Image slots for each section
const IMAGE_SECTIONS: { key: string; label: string; slots: { id: string; label: string; description: string }[] }[] = [
  {
    key: "hero",
    label: "🏠 Hero Section",
    slots: [
      { id: "hero-bg", label: "Hero Background", description: "Full-screen background image behind the hero text" },
    ],
  },
  {
    key: "about",
    label: "👩‍⚕️ About Section",
    slots: [
      { id: "dr-portrait", label: "Doctor Portrait", description: "Circular portrait photo shown in the About section" },
      { id: "dr-main", label: "Doctor Main Photo", description: "Main profile image used across the site" },
    ],
  },
  {
    key: "services",
    label: "🩺 Services Section",
    slots: [
      { id: "service-mastectomy", label: "Mastectomy", description: "Service card image for Mastectomy" },
      { id: "service-breast-conserving", label: "Breast Conserving Surgery", description: "Service card image for Breast Conserving Surgery" },
      { id: "service-sentinel-node", label: "Sentinel Node Biopsy", description: "Service card image for Sentinel Node Biopsy" },
      { id: "service-oncoplastic", label: "Oncoplastic Surgery", description: "Service card image for Oncoplastic Surgery" },
      { id: "service-reduction-augmentation", label: "Breast Reduction & Augmentation", description: "Service card image" },
      { id: "service-lipomodelling", label: "Lipomodelling", description: "Service card image for Lipomodelling" },
      { id: "service-implant-reconstruction", label: "Implant Reconstruction", description: "Service card image" },
      { id: "service-gynaecomastia", label: "Gynaecomastia Correction", description: "Service card image" },
    ],
  },
  {
    key: "awareness",
    label: "💗 Awareness Section",
    slots: [
      { id: "awareness-banner", label: "Awareness Banner", description: "Optional banner image for the Awareness section" },
    ],
  },
  {
    key: "blog",
    label: "📝 Blog",
    slots: [
      { id: "blog-default-cover", label: "Default Blog Cover", description: "Default cover image when a blog post has no image" },
    ],
  },
  {
    key: "footer",
    label: "📍 Footer & Branding",
    slots: [
      { id: "logo", label: "Site Logo", description: "Logo or brand mark for the website" },
      { id: "og-image", label: "Social Share Image (OG)", description: "Image shown when the site is shared on social media" },
    ],
  },
];

export default function AdminContent() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif-display text-3xl font-semibold text-foreground">Content Management</h1>
        <p className="text-muted-foreground font-sans-body mt-2">
          Edit every section of your website — text, images, and media.
        </p>
      </motion.div>

      <Tabs defaultValue="text" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="text" className="gap-2 font-sans-body">
            <Type className="w-4 h-4" /> Text & Copy
          </TabsTrigger>
          <TabsTrigger value="media" className="gap-2 font-sans-body">
            <ImageIcon className="w-4 h-4" /> Images & Media
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text"><TextCopySection /></TabsContent>
        <TabsContent value="media"><MediaSection /></TabsContent>
      </Tabs>
    </div>
  );
}

/* ───────── Text & Copy Section ───────── */
function TextCopySection() {
  const [items, setItems] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [edited, setEdited] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const fetchContent = async () => {
    const { data } = await supabase.from("site_content").select("*").order("section_key");
    if (data) setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchContent(); }, []);

  const handleChange = (key: string, value: string) => {
    setEdited((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (item: SiteContent) => {
    const newContent = edited[item.section_key];
    if (newContent === undefined || newContent === item.content) return;
    setSaving(item.section_key);
    const { error } = await supabase.from("site_content").update({ content: newContent }).eq("id", item.id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Saved", description: `${item.section_label} updated.` });
      setEdited((prev) => { const n = { ...prev }; delete n[item.section_key]; return n; });
      fetchContent();
    }
    setSaving(null);
  };

  const toggleGroup = (key: string) => setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));

  if (loading) return <p className="text-muted-foreground font-sans-body">Loading...</p>;

  const grouped = SECTION_GROUPS.map((g) => ({
    ...g,
    items: items.filter((item) => item.section_key.startsWith(g.key + "_")),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="space-y-4">
      {grouped.map((group) => {
        const isOpen = openGroups[group.key] ?? false;
        const hasChanges = group.items.some((item) => edited[item.section_key] !== undefined && edited[item.section_key] !== item.content);

        return (
          <motion.div key={group.key} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl overflow-hidden">
            <button onClick={() => toggleGroup(group.key)} className="w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-xl">{group.label.split(" ")[0]}</span>
                <h3 className="font-serif-display text-lg font-semibold text-foreground">{group.label.substring(group.label.indexOf(" ") + 1)}</h3>
                {hasChanges && <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-sans-body">{group.items.length} fields</span>
                {isOpen ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
              </div>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 space-y-5 border-t border-border pt-5">
                {group.items.map((item) => {
                  const currentValue = edited[item.section_key] ?? item.content;
                  const isDirty = edited[item.section_key] !== undefined && edited[item.section_key] !== item.content;
                  const isRichText = RICH_TEXT_KEYS.includes(item.section_key);
                  const isTextarea = TEXTAREA_KEYS.includes(item.section_key);

                  return (
                    <div key={item.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="font-sans-body font-medium text-foreground text-sm">{item.section_label.split(" — ").pop()}</Label>
                        {isDirty && (
                          <Button size="sm" onClick={() => handleSave(item)} disabled={saving === item.section_key} className="gap-1.5 h-8">
                            {saving === item.section_key ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                            Save
                          </Button>
                        )}
                      </div>
                      {isRichText ? (
                        <RichTextEditor content={currentValue} onChange={(html) => handleChange(item.section_key, html)} />
                      ) : isTextarea ? (
                        <Textarea value={currentValue} onChange={(e) => handleChange(item.section_key, e.target.value)} rows={Math.max(3, currentValue.split("\n").length + 1)} className="font-sans-body text-sm" />
                      ) : (
                        <Input value={currentValue} onChange={(e) => handleChange(item.section_key, e.target.value)} className="font-sans-body text-sm" />
                      )}
                      {isDirty && <p className="text-xs text-primary font-sans-body">Unsaved changes</p>}
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ───────── Images & Media Section ───────── */
function MediaSection() {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [images, setImages] = useState<Record<string, string | null>>({});
  const [uploading, setUploading] = useState<string | null>(null);
  const { toast } = useToast();

  const toggleGroup = (key: string) => setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));

  // Check which images already exist in storage
  const fetchExistingImages = async () => {
    const { data } = await supabase.storage.from("blog-images").list("site", { limit: 200 });
    if (data) {
      const map: Record<string, string> = {};
      data.forEach((f) => {
        const { data: urlData } = supabase.storage.from("blog-images").getPublicUrl(`site/${f.name}`);
        // Extract slot id from filename (e.g. "hero-bg.jpg" → "hero-bg")
        const slotId = f.name.replace(/\.[^.]+$/, "");
        map[slotId] = urlData.publicUrl;
      });
      setImages(map);
    }
  };

  useEffect(() => { fetchExistingImages(); }, []);

  const handleUpload = async (slotId: string, file: File) => {
    setUploading(slotId);
    const ext = file.name.split(".").pop();
    const path = `site/${slotId}.${ext}`;

    // Delete old file if exists (any extension)
    const { data: existing } = await supabase.storage.from("blog-images").list("site");
    if (existing) {
      const oldFiles = existing.filter((f) => f.name.startsWith(slotId + "."));
      if (oldFiles.length > 0) {
        await supabase.storage.from("blog-images").remove(oldFiles.map((f) => `site/${f.name}`));
      }
    }

    const { error } = await supabase.storage.from("blog-images").upload(path, file, { upsert: true });
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } else {
      const { data: urlData } = supabase.storage.from("blog-images").getPublicUrl(path);
      setImages((prev) => ({ ...prev, [slotId]: urlData.publicUrl + "?t=" + Date.now() }));
      toast({ title: "Image uploaded" });
    }
    setUploading(null);
  };

  const handleRemove = async (slotId: string) => {
    if (!confirm("Remove this image?")) return;
    const { data: existing } = await supabase.storage.from("blog-images").list("site");
    if (existing) {
      const oldFiles = existing.filter((f) => f.name.startsWith(slotId + "."));
      if (oldFiles.length > 0) {
        await supabase.storage.from("blog-images").remove(oldFiles.map((f) => `site/${f.name}`));
      }
    }
    setImages((prev) => { const n = { ...prev }; delete n[slotId]; return n; });
    toast({ title: "Image removed" });
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url.split("?")[0]);
    toast({ title: "URL copied to clipboard" });
  };

  return (
    <div className="space-y-4">
      {IMAGE_SECTIONS.map((section) => {
        const isOpen = openGroups[section.key] ?? false;
        const filledCount = section.slots.filter((s) => images[s.id]).length;

        return (
          <motion.div key={section.key} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl overflow-hidden">
            <button onClick={() => toggleGroup(section.key)} className="w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-xl">{section.label.split(" ")[0]}</span>
                <h3 className="font-serif-display text-lg font-semibold text-foreground">{section.label.substring(section.label.indexOf(" ") + 1)}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-sans-body">{filledCount}/{section.slots.length} images</span>
                {isOpen ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
              </div>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 border-t border-border pt-5 space-y-6">
                {section.slots.map((slot) => {
                  const imageUrl = images[slot.id];
                  const isUploading = uploading === slot.id;

                  return (
                    <div key={slot.id} className="space-y-3">
                      <div>
                        <Label className="font-sans-body font-medium text-foreground text-sm">{slot.label}</Label>
                        <p className="text-xs text-muted-foreground font-sans-body mt-0.5">{slot.description}</p>
                      </div>

                      <div className="flex items-start gap-4">
                        {/* Image preview */}
                        <div className="w-32 h-24 rounded-xl border-2 border-dashed border-border bg-muted/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                          {imageUrl ? (
                            <img src={imageUrl} alt={slot.label} className="w-full h-full object-cover rounded-xl" />
                          ) : (
                            <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2">
                          <label className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer transition-colors text-xs font-sans-body font-medium ${
                            isUploading ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90"
                          }`}>
                            {isUploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                            {isUploading ? "Uploading..." : imageUrl ? "Replace" : "Upload"}
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={isUploading}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleUpload(slot.id, file);
                                e.target.value = "";
                              }}
                            />
                          </label>

                          {imageUrl && (
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="h-8 text-xs gap-1" onClick={() => copyUrl(imageUrl)}>
                                <Copy className="w-3 h-3" /> Copy URL
                              </Button>
                              <Button size="sm" variant="outline" className="h-8 text-xs gap-1 text-destructive hover:text-destructive" onClick={() => handleRemove(slot.id)}>
                                <Trash2 className="w-3 h-3" /> Remove
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
