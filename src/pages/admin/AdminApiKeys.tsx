import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Key, Youtube, Instagram, Save, Loader2, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ApiKeyConfig {
  key: string;
  label: string;
  icon: typeof Youtube;
  iconClass: string;
  bgClass: string;
  placeholder: string;
  helpSteps: { text: string; link?: { url: string; label: string } }[];
}

const API_KEYS: ApiKeyConfig[] = [
  {
    key: "YOUTUBE_API_KEY",
    label: "YouTube Data API v3",
    icon: Youtube,
    iconClass: "text-destructive",
    bgClass: "bg-destructive/10",
    placeholder: "AIzaSy...",
    helpSteps: [
      { text: "Go to", link: { url: "https://console.cloud.google.com/", label: "Google Cloud Console" } },
      { text: "Create a project and enable YouTube Data API v3" },
      { text: "Go to Credentials → Create API Key" },
      { text: "Paste the key below and save" },
    ],
  },
  {
    key: "INSTAGRAM_ACCESS_TOKEN",
    label: "Instagram Graph API",
    icon: Instagram,
    iconClass: "text-primary",
    bgClass: "bg-primary/10",
    placeholder: "IGQVJ...",
    helpSteps: [
      { text: "Go to", link: { url: "https://developers.facebook.com/", label: "Meta Developers" } },
      { text: "Create a Business App and add Instagram Graph API" },
      { text: "Connect your Instagram account and generate a long-lived token" },
      { text: "Paste the token below and save" },
    ],
  },
];

export default function AdminApiKeys() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [originalValues, setOriginalValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  useEffect(() => {
    async function fetchKeys() {
      const { data } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", API_KEYS.map((k) => k.key));
      if (data) {
        const map: Record<string, string> = {};
        data.forEach((row: any) => { map[row.key] = row.value || ""; });
        setValues(map);
        setOriginalValues(map);
      }
      setLoading(false);
    }
    fetchKeys();
  }, []);

  const handleSave = async (keyName: string) => {
    setSaving(keyName);
    const { error } = await supabase
      .from("site_settings")
      .update({ value: values[keyName] || "" })
      .eq("key", keyName);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Saved ✓", description: `${keyName} updated successfully.` });
      setOriginalValues((prev) => ({ ...prev, [keyName]: values[keyName] || "" }));
    }
    setSaving(null);
  };

  const isConfigured = (keyName: string) => !!(originalValues[keyName] && originalValues[keyName].length > 0);
  const isDirty = (keyName: string) => values[keyName] !== originalValues[keyName];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif-display text-3xl font-semibold text-foreground">API Keys</h1>
        <p className="text-muted-foreground font-sans-body mt-2">
          Manage your third-party API credentials. Keys are stored securely in the database.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground font-sans-body">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading...
        </div>
      ) : (
        <div className="space-y-6">
          {API_KEYS.map((config, idx) => {
            const Icon = config.icon;
            const configured = isConfigured(config.key);
            const dirty = isDirty(config.key);
            const isSaving = saving === config.key;
            const visible = showKey[config.key];

            return (
              <motion.div
                key={config.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass rounded-2xl p-6 space-y-5"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${config.bgClass} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${config.iconClass}`} />
                    </div>
                    <div>
                      <h3 className="font-sans-body font-medium text-foreground">{config.label}</h3>
                      <p className="text-xs text-muted-foreground">Key: {config.key}</p>
                    </div>
                  </div>
                  {configured ? (
                    <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
                      <CheckCircle className="w-3.5 h-3.5" /> Connected
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-destructive font-medium">
                      <XCircle className="w-3.5 h-3.5" /> Not Configured
                    </span>
                  )}
                </div>

                {/* Input */}
                <div className="space-y-2">
                  <Label className="font-sans-body text-sm">API Key / Token</Label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Input
                        type={visible ? "text" : "password"}
                        value={values[config.key] || ""}
                        onChange={(e) => setValues((prev) => ({ ...prev, [config.key]: e.target.value }))}
                        placeholder={config.placeholder}
                        className="font-mono text-sm pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowKey((prev) => ({ ...prev, [config.key]: !prev[config.key] }))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <Button
                      onClick={() => handleSave(config.key)}
                      disabled={!dirty || isSaving}
                      className="gap-1.5"
                    >
                      {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Save
                    </Button>
                  </div>
                  {dirty && <p className="text-xs text-primary font-sans-body">● Unsaved changes</p>}
                </div>

                {/* Help */}
                <div className="space-y-2 text-sm text-muted-foreground font-sans-body">
                  <p className="font-medium text-foreground">How to get your key:</p>
                  <ol className="list-decimal list-inside space-y-1 ml-2">
                    {config.helpSteps.map((step, i) => (
                      <li key={i}>
                        {step.text}{" "}
                        {step.link && (
                          <a href={step.link.url} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                            {step.link.label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
