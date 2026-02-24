import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Type, ImageIcon, Save, Upload, Trash2, Copy,
  Loader2, ChevronDown, ChevronRight,
  AlignLeft, AlignCenter, AlignRight,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/RichTextEditor";
import StructuredListEditor from "@/components/admin/StructuredListEditor";

interface SiteContent {
  id: string;
  section_key: string;
  section_label: string;
  content: string;
  alignment: string;
  updated_at: string;
}

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

const JSON_LIST_KEYS = ["_benefits", "_process", "_faqs"];

interface ImageSlot {
  id: string;
  label: string;
  description: string;
}

interface UnifiedSection {
  key: string;
  label: string;
  isServicePage?: boolean;
  imageSlots: ImageSlot[];
}

const UNIFIED_SECTIONS: UnifiedSection[] = [
  {
    key: "hero", label: "🏠 Hero Section",
    imageSlots: [
      { id: "hero-bg", label: "Hero Background", description: "Full-screen background image behind the hero text" },
    ],
  },
  {
    key: "about", label: "👩‍⚕️ About Section",
    imageSlots: [
      { id: "dr-portrait", label: "Doctor Portrait", description: "Circular portrait photo shown in the About section" },
      { id: "dr-main", label: "Doctor Main Photo", description: "Main profile image used across the site" },
    ],
  },
  {
    key: "services", label: "🩺 Services Section",
    imageSlots: [
      { id: "service-mastectomy", label: "Mastectomy", description: "Service card image for Mastectomy" },
      { id: "service-breast-conserving", label: "Breast Conserving Surgery", description: "Service card image" },
      { id: "service-sentinel-node", label: "Sentinel Node Biopsy", description: "Service card image" },
      { id: "service-oncoplastic", label: "Oncoplastic Surgery", description: "Service card image" },
      { id: "service-reduction-augmentation", label: "Breast Reduction & Augmentation", description: "Service card image" },
      { id: "service-lipomodelling", label: "Lipomodelling", description: "Service card image" },
      { id: "service-implant-reconstruction", label: "Implant Reconstruction", description: "Service card image" },
      { id: "service-gynaecomastia", label: "Gynaecomastia Correction", description: "Service card image" },
      { id: "service-axillary-node", label: "Axillary Node Surgery", description: "Service card image" },
    ],
  },
  {
    key: "awareness", label: "💗 Awareness Section",
    imageSlots: [
      { id: "awareness-banner", label: "Awareness Banner", description: "Optional banner image for the Awareness section" },
    ],
  },
  { key: "testimonials", label: "⭐ Testimonials Section", imageSlots: [] },
  { key: "consultation", label: "📅 Consultation Modal", imageSlots: [] },
  {
    key: "footer", label: "📍 Footer Section",
    imageSlots: [
      { id: "logo", label: "Site Logo", description: "Logo or brand mark for the website" },
      { id: "og-image", label: "Social Share Image (OG)", description: "Image shown when the site is shared on social media" },
    ],
  },
  {
    key: "blog", label: "📝 Blog",
    imageSlots: [
      { id: "blog-default-cover", label: "Default Blog Cover", description: "Default cover image when a blog post has no image" },
    ],
  },
  { key: "svc_mastectomy", label: "🔬 Service — Mastectomy", isServicePage: true, imageSlots: [] },
  { key: "svc_bco", label: "🔬 Service — Breast Conserving & Oncoplastic", isServicePage: true, imageSlots: [] },
  { key: "svc_sentinel", label: "🔬 Service — Sentinel Node Biopsy", isServicePage: true, imageSlots: [] },
  { key: "svc_axillary", label: "🔬 Service — Axillary Node Surgery", isServicePage: true, imageSlots: [] },
  { key: "svc_reduction", label: "🔬 Service — Breast Reduction & Augmentation", isServicePage: true, imageSlots: [] },
  { key: "svc_lipo", label: "🔬 Service — Lipomodelling", isServicePage: true, imageSlots: [] },
  { key: "svc_implant", label: "🔬 Service — Implant Reconstruction", isServicePage: true, imageSlots: [] },
  { key: "svc_gynae", label: "🔬 Service — Gynaecomastia Correction", isServicePage: true, imageSlots: [] },
];

export default function AdminContent() {
  const [items, setItems] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [edited, setEdited] = useState<Record<string, { content?: string; alignment?: string }>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [images, setImages] = useState<Record<string, string | null>>({});
  const [uploading, setUploading] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchContent = async () => {
    const { data } = await supabase.from("site_content").select("*").order("section_key");
    if (data) setItems(data as SiteContent[]);
    setLoading(false);
  };

  const fetchImages = async () => {
    const { data } = await supabase.storage.from("blog-images").list("site", { limit: 200 });
    if (data) {
      const map: Record<string, string> = {};
      data.forEach((f) => {
        const { data: urlData } = supabase.storage.from("blog-images").getPublicUrl(`site/${f.name}`);
        const slotId = f.name.replace(/\.[^.]+$/, "");
        map[slotId] = urlData.publicUrl;
      });
      setImages(map);
    }
  };

  useEffect(() => { fetchContent(); fetchImages(); }, []);

  const handleChange = (key: string, field: "content" | "alignment", value: string) => {
    setEdited((prev) => ({ ...prev, [key]: { ...prev[key], [field]: value } }));
  };

  const handleSave = async (item: SiteContent) => {
    const changes = edited[item.section_key];
    if (!changes) return;
    const newContent = changes.content ?? item.content;
    const newAlignment = changes.alignment ?? item.alignment;
    if (newContent === item.content && newAlignment === item.alignment) return;

    setSaving(item.section_key);
    const { error } = await supabase
      .from("site_content")
      .update({ content: newContent, alignment: newAlignment })
      .eq("id", item.id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Saved ✓", description: `${item.section_label.split(" — ").pop()} updated.` });
      setEdited((prev) => { const n = { ...prev }; delete n[item.section_key]; return n; });
      fetchContent();
    }
    setSaving(null);
  };

  const handleUpload = async (slotId: string, file: File) => {
    setUploading(slotId);
    const ext = file.name.split(".").pop();
    const path = `site/${slotId}.${ext}`;
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

  if (loading) return <p className="text-muted-foreground font-sans-body">Loading content...</p>;

  const isJsonKey = (key: string) => JSON_LIST_KEYS.some((suffix) => key.endsWith(suffix));
  const getJsonType = (key: string): "benefits" | "process" | "faqs" => {
    if (key.endsWith("_benefits")) return "benefits";
    if (key.endsWith("_process")) return "process";
    return "faqs";
  };

  const getGroupItems = (groupKey: string) =>
    items.filter((item) => item.section_key.startsWith(groupKey + "_") || item.section_key === groupKey);

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif-display text-3xl font-semibold text-foreground">Content Management</h1>
        <p className="text-muted-foreground font-sans-body mt-2">
          Edit every section of your website — text, images, and alignment — all in one place.
        </p>
      </motion.div>

      <div className="space-y-4">
        {UNIFIED_SECTIONS.map((section) => {
          const allItems = getGroupItems(section.key);
          const textItems = allItems.filter((item) => !isJsonKey(item.section_key));
          const jsonItems = allItems.filter((item) => isJsonKey(item.section_key));
          const hasContent = allItems.length > 0 || section.imageSlots.length > 0;
          if (!hasContent) return null;

          const isOpen = openSection === section.key;
          const hasChanges = textItems.some((item) => edited[item.section_key] !== undefined);
          const filledImages = section.imageSlots.filter((s) => images[s.id]).length;

          return (
            <motion.div
              key={section.key}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`glass rounded-2xl overflow-hidden ${section.isServicePage ? "border-l-4 border-primary/30" : ""}`}
            >
              <button
                onClick={() => setOpenSection(isOpen ? null : section.key)}
                className="w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{section.label.split(" ")[0]}</span>
                  <h3 className="font-serif-display text-lg font-semibold text-foreground">
                    {section.label.substring(section.label.indexOf(" ") + 1)}
                  </h3>
                  {hasChanges && <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                  {section.isServicePage && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-sans-body">Service Page</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {textItems.length > 0 && (
                    <span className="text-xs text-muted-foreground font-sans-body flex items-center gap-1">
                      <Type className="w-3 h-3" /> {textItems.length}
                    </span>
                  )}
                  {section.imageSlots.length > 0 && (
                    <span className="text-xs text-muted-foreground font-sans-body flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" /> {filledImages}/{section.imageSlots.length}
                    </span>
                  )}
                  {isOpen ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 border-t border-border pt-5 space-y-6">
                  {/* ── Text Fields ── */}
                  {!section.isServicePage && textItems.length > 0 && (
                    <h4 className="text-sm font-semibold text-muted-foreground font-sans-body uppercase tracking-wider flex items-center gap-2">
                      <Type className="w-4 h-4" /> Text & Copy
                    </h4>
                  )}
                  {textItems.map((item) => {
                    const editedEntry = edited[item.section_key] ?? {};
                    const currentContent = editedEntry.content ?? item.content;
                    const currentAlignment = editedEntry.alignment ?? item.alignment ?? "left";
                    const isDirty = edited[item.section_key] !== undefined;
                    const isRichText = RICH_TEXT_KEYS.includes(item.section_key);
                    const isTextarea = TEXTAREA_KEYS.includes(item.section_key);

                    return (
                      <div key={item.id} className="space-y-3 pb-5 border-b border-border last:border-0 last:pb-0">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <Label className="font-sans-body font-semibold text-foreground text-sm">
                            {item.section_label.split(" — ").pop()}
                          </Label>
                          {isDirty && (
                            <Button size="sm" onClick={() => handleSave(item)} disabled={saving === item.section_key} className="gap-1.5 h-8">
                              {saving === item.section_key ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                              Save
                            </Button>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground font-sans-body">Alignment:</span>
                          <AlignmentPicker
                            value={currentAlignment}
                            onChange={(v) => handleChange(item.section_key, "alignment", v)}
                          />
                        </div>

                        {isRichText ? (
                          <RichTextEditor
                            content={currentContent}
                            onChange={(html) => handleChange(item.section_key, "content", html)}
                          />
                        ) : isTextarea ? (
                          <Textarea
                            value={currentContent}
                            onChange={(e) => handleChange(item.section_key, "content", e.target.value)}
                            rows={Math.max(3, currentContent.split("\n").length + 1)}
                            className="font-sans-body text-sm"
                            style={{ textAlign: currentAlignment as "left" | "center" | "right" }}
                          />
                        ) : (
                          <Input
                            value={currentContent}
                            onChange={(e) => handleChange(item.section_key, "content", e.target.value)}
                            className="font-sans-body text-sm"
                            style={{ textAlign: currentAlignment as "left" | "center" | "right" }}
                          />
                        )}

                        {isDirty && <p className="text-xs text-primary font-sans-body">● Unsaved changes</p>}
                      </div>
                    );
                  })}

                  {/* ── Structured Lists (Benefits/Process/FAQs) ── */}
                  {jsonItems.map((item) => (
                    <div key={item.id} className="pb-5 border-b border-border last:border-0 last:pb-0">
                      <StructuredListEditor
                        item={item}
                        type={getJsonType(item.section_key)}
                        onSaved={fetchContent}
                      />
                    </div>
                  ))}

                  {/* ── Image Slots ── */}
                  {section.imageSlots.length > 0 && (
                    <div className="space-y-6">
                      <h4 className="text-sm font-semibold text-muted-foreground font-sans-body uppercase tracking-wider flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" /> Images & Media
                      </h4>
                      {section.imageSlots.map((slot) => {
                        const imageUrl = images[slot.id];
                        const isUploadingSlot = uploading === slot.id;

                        return (
                          <div key={slot.id} className="space-y-3 pb-5 border-b border-border last:border-0 last:pb-0">
                            <div>
                              <Label className="font-sans-body font-medium text-foreground text-sm">{slot.label}</Label>
                              <p className="text-xs text-muted-foreground font-sans-body mt-0.5">{slot.description}</p>
                            </div>

                            <div className="flex items-start gap-4">
                              <div className="w-32 h-24 rounded-xl border-2 border-dashed border-border bg-muted/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                                {imageUrl ? (
                                  <img src={imageUrl} alt={slot.label} className="w-full h-full object-cover rounded-xl" />
                                ) : (
                                  <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
                                )}
                              </div>

                              <div className="flex flex-col gap-2">
                                <label className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer transition-colors text-xs font-sans-body font-medium ${
                                  isUploadingSlot ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90"
                                }`}>
                                  {isUploadingSlot ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                                  {isUploadingSlot ? "Uploading..." : imageUrl ? "Replace" : "Upload"}
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    disabled={isUploadingSlot}
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
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Alignment Picker ─── */
function AlignmentPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const options = [
    { v: "left", Icon: AlignLeft, label: "Left" },
    { v: "center", Icon: AlignCenter, label: "Centre" },
    { v: "right", Icon: AlignRight, label: "Right" },
  ];
  return (
    <div className="flex items-center gap-1 p-1 bg-muted/40 rounded-lg w-fit">
      {options.map(({ v, Icon, label }) => (
        <button
          key={v}
          title={label}
          onClick={() => onChange(v)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-sans-body transition-colors ${
            value === v
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Icon className="w-3.5 h-3.5" />
          {label}
        </button>
      ))}
    </div>
  );
}
