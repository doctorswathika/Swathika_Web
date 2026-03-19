import { useState } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Props {
  item: { id: string; section_key: string; section_label: string; content: string };
  type: "benefits" | "process" | "faqs";
  onSaved: () => void;
}

export default function StructuredListEditor({ item, type, onSaved }: Props) {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const parseContent = (): any[] => {
    try { return JSON.parse(item.content); } catch { return []; }
  };

  const [list, setList] = useState<any[]>(parseContent);
  const [dirty, setDirty] = useState(false);

  const update = (newList: any[]) => { setList(newList); setDirty(true); };

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= list.length) return;
    const next = [...list];
    [next[i], next[j]] = [next[j], next[i]];
    update(next);
  };

  const remove = (i: number) => update(list.filter((_, idx) => idx !== i));

  const add = () => {
    if (type === "benefits") update([...list, ""]);
    else if (type === "process") update([...list, { step: "", description: "" }]);
    else update([...list, { q: "", a: "" }]);
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("site_content")
      .update({ content: JSON.stringify(list) })
      .eq("id", item.id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Saved ✓", description: `${type.charAt(0).toUpperCase() + type.slice(1)} updated.` });
      setDirty(false);
      onSaved();
    }
    setSaving(false);
  };

  const label = type === "benefits" ? "Benefits" : type === "process" ? "Process Steps" : "FAQs";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="font-sans-body font-semibold text-foreground text-sm">{label}</Label>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={add} className="gap-1.5 h-8 text-xs">
            <Plus className="w-3 h-3" /> Add
          </Button>
          {dirty && (
            <Button size="sm" onClick={handleSave} disabled={saving} className="gap-1.5 h-8 text-xs">
              {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
              Save
            </Button>
          )}
        </div>
      </div>

      {list.length === 0 && (
        <p className="text-xs text-muted-foreground font-sans-body italic">No items yet. Click "Add" to start.</p>
      )}

      <div className="space-y-3">
        {list.map((entry, i) => (
          <div key={i} className="flex gap-2 items-start p-3 rounded-xl bg-muted/20 border border-border">
            {/* Reorder buttons */}
            <div className="flex flex-col gap-0.5 pt-1">
              <button onClick={() => move(i, -1)} disabled={i === 0} className="p-0.5 rounded hover:bg-muted disabled:opacity-30">
                <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
              <button onClick={() => move(i, 1)} disabled={i === list.length - 1} className="p-0.5 rounded hover:bg-muted disabled:opacity-30">
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-2">
              {type === "benefits" ? (
                <Input
                  value={entry}
                  onChange={(e) => { const n = [...list]; n[i] = e.target.value; update(n); }}
                  placeholder="Benefit text..."
                  className="font-sans-body text-sm"
                />
              ) : type === "process" ? (
                <>
                  <Input
                    value={entry.step}
                    onChange={(e) => { const n = [...list]; n[i] = { ...n[i], step: e.target.value }; update(n); }}
                    placeholder="Step title..."
                    className="font-sans-body text-sm font-medium"
                  />
                  <Textarea
                    value={entry.description}
                    onChange={(e) => { const n = [...list]; n[i] = { ...n[i], description: e.target.value }; update(n); }}
                    placeholder="Step description..."
                    rows={2}
                    className="font-sans-body text-sm"
                  />
                </>
              ) : (
                <>
                  <Input
                    value={entry.q}
                    onChange={(e) => { const n = [...list]; n[i] = { ...n[i], q: e.target.value }; update(n); }}
                    placeholder="Question..."
                    className="font-sans-body text-sm font-medium"
                  />
                  <Textarea
                    value={entry.a}
                    onChange={(e) => { const n = [...list]; n[i] = { ...n[i], a: e.target.value }; update(n); }}
                    placeholder="Answer..."
                    rows={2}
                    className="font-sans-body text-sm"
                  />
                </>
              )}
            </div>

            {/* Delete */}
            <button onClick={() => remove(i)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive mt-1">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {dirty && <p className="text-xs text-primary font-sans-body">● Unsaved changes</p>}
    </div>
  );
}
