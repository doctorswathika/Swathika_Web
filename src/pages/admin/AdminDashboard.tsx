import { motion } from "framer-motion";
import { Key, Youtube, Instagram, CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function AdminDashboard() {
  const [youtubeStatus, setYoutubeStatus] = useState<"loading" | "configured" | "missing">("loading");
  const [instagramStatus, setInstagramStatus] = useState<"loading" | "configured" | "missing">("loading");

  useEffect(() => {
    async function checkApis() {
      try {
        const [ytRes, igRes] = await Promise.all([
          supabase.functions.invoke("youtube-feed"),
          supabase.functions.invoke("instagram-feed"),
        ]);
        setYoutubeStatus(ytRes.data?.error?.includes("not configured") ? "missing" : "configured");
        setInstagramStatus(igRes.data?.error?.includes("not configured") ? "missing" : "configured");
      } catch {
        setYoutubeStatus("missing");
        setInstagramStatus("missing");
      }
    }
    checkApis();
  }, []);

  const StatusBadge = ({ status }: { status: "loading" | "configured" | "missing" }) => {
    if (status === "loading") return <span className="text-xs text-muted-foreground">Checking...</span>;
    if (status === "configured")
      return (
        <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
          <CheckCircle className="w-3.5 h-3.5" /> Connected
        </span>
      );
    return (
      <span className="inline-flex items-center gap-1 text-xs text-destructive font-medium">
        <XCircle className="w-3.5 h-3.5" /> Not Configured
      </span>
    );
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif-display text-3xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground font-sans-body mt-2">Overview of your website configuration and status.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                <Youtube className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="font-sans-body font-medium text-foreground">YouTube API</h3>
            </div>
            <StatusBadge status={youtubeStatus} />
          </div>
          <p className="text-xs text-muted-foreground font-sans-body">
            Fetches latest video and shorts from your YouTube channel.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6 space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Instagram className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-sans-body font-medium text-foreground">Instagram API</h3>
            </div>
            <StatusBadge status={instagramStatus} />
          </div>
          <p className="text-xs text-muted-foreground font-sans-body">
            Displays latest reels from your Instagram account.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6 space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/50 flex items-center justify-center">
                <Key className="w-5 h-5 text-foreground" />
              </div>
              <h3 className="font-sans-body font-medium text-foreground">API Keys</h3>
            </div>
          </div>
          <p className="text-xs text-muted-foreground font-sans-body">
            Manage your YouTube and Instagram API credentials from the API Keys page.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
