import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Type, ImageIcon, Save, Upload, Trash2, Check, Loader2, Copy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

export default function AdminContent() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif-display text-3xl font-semibold text-foreground">Content Management</h1>
        <p className="text-muted-foreground font-sans-body mt-2">
          Edit website text and manage media files.
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

        <TabsContent value="text">
          <TextCopySection />
        </TabsContent>
        <TabsContent value="media">
          <MediaSection />
        </TabsContent>
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
  const { toast } = useToast();

  const fetchContent = async () => {
    const { data } = await supabase
      .from("site_content")
      .select("*")
      .order("section_label");
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
    const { error } = await supabase
      .from("site_content")
      .update({ content: newContent })
      .eq("id", item.id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Saved", description: `${item.section_label} updated.` });
      setEdited((prev) => {
        const next = { ...prev };
        delete next[item.section_key];
        return next;
      });
      fetchContent();
    }
    setSaving(null);
  };

  if (loading) return <p className="text-muted-foreground font-sans-body">Loading...</p>;

  return (
    <div className="space-y-4">
      {items.map((item, i) => {
        const currentValue = edited[item.section_key] ?? item.content;
        const isDirty = edited[item.section_key] !== undefined && edited[item.section_key] !== item.content;
        const isLong = item.content.length > 100;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-2xl p-5 space-y-3"
          >
            <div className="flex items-center justify-between">
              <Label className="font-sans-body font-medium text-foreground">{item.section_label}</Label>
              <span className="text-xs text-muted-foreground font-sans-body">
                {item.section_key}
              </span>
            </div>
            {isLong ? (
              <Textarea
                value={currentValue}
                onChange={(e) => handleChange(item.section_key, e.target.value)}
                rows={3}
                className="font-sans-body"
              />
            ) : (
              <Input
                value={currentValue}
                onChange={(e) => handleChange(item.section_key, e.target.value)}
                className="font-sans-body"
              />
            )}
            {isDirty && (
              <div className="flex justify-end">
                <Button
                  size="sm"
                  onClick={() => handleSave(item)}
                  disabled={saving === item.section_key}
                  className="gap-2"
                >
                  {saving === item.section_key ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                  Save
                </Button>
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
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const fetchFiles = async () => {
    const { data, error } = await supabase.storage.from("blog-images").list("", {
      limit: 100,
      sortBy: { column: "created_at", order: "desc" },
    });
    if (data) setFiles(data.filter((f) => f.name !== ".emptyFolderPlaceholder"));
    setLoading(false);
  };

  useEffect(() => { fetchFiles(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;
    setUploading(true);
    let uploaded = 0;
    for (const file of Array.from(fileList)) {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}.${ext}`;
      const { error } = await supabase.storage.from("blog-images").upload(path, file);
      if (!error) uploaded++;
    }
    toast({ title: `Uploaded ${uploaded} file(s)` });
    setUploading(false);
    fetchFiles();
    e.target.value = "";
  };

  const handleDelete = async (name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    const { error } = await supabase.storage.from("blog-images").remove([name]);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted" });
      fetchFiles();
    }
  };

  const getPublicUrl = (name: string) => {
    const { data } = supabase.storage.from("blog-images").getPublicUrl(name);
    return data.publicUrl;
  };

  const copyUrl = (name: string) => {
    navigator.clipboard.writeText(getPublicUrl(name));
    toast({ title: "URL copied to clipboard" });
  };

  return (
    <div className="space-y-6">
      {/* Upload */}
      <div className="flex items-center gap-4">
        <label className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl cursor-pointer transition-colors text-sm font-sans-body font-medium ${
          uploading ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90"
        }`}>
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {uploading ? "Uploading..." : "Upload Images"}
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
        <span className="text-xs text-muted-foreground font-sans-body">{files.length} file(s) in storage</span>
      </div>

      {/* Grid */}
      {loading ? (
        <p className="text-muted-foreground font-sans-body">Loading...</p>
      ) : files.length === 0 ? (
        <div className="text-center py-16 glass rounded-2xl">
          <p className="text-muted-foreground font-sans-body">No images uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file, i) => (
            <motion.div
              key={file.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className="glass rounded-2xl overflow-hidden group relative"
            >
              <div className="aspect-square">
                <img
                  src={getPublicUrl(file.name)}
                  alt={file.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                <div className="flex gap-2">
                  <Button size="icon" variant="secondary" onClick={() => copyUrl(file.name)} title="Copy URL">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="destructive" onClick={() => handleDelete(file.name)} title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-background font-sans-body truncate max-w-[90%] px-2">{file.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
