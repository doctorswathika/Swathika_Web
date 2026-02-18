import { motion } from "framer-motion";
import { Key, Youtube, Instagram, Info } from "lucide-react";

export default function AdminApiKeys() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif-display text-3xl font-semibold text-foreground">API Keys</h1>
        <p className="text-muted-foreground font-sans-body mt-2">
          Manage your third-party API credentials. Keys are securely stored as backend secrets.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-6 flex items-start gap-3"
      >
        <Info className="w-5 h-5 text-primary mt-0.5 shrink-0" />
        <p className="text-sm text-muted-foreground font-sans-body">
          API keys are stored as secure backend secrets and cannot be viewed or edited from this portal for security reasons. 
          To add or update API keys, please ask in the Lovable chat with your key values ready.
        </p>
      </motion.div>

      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
              <Youtube className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <h3 className="font-sans-body font-medium text-foreground">YouTube Data API v3</h3>
              <p className="text-xs text-muted-foreground">Secret: YOUTUBE_API_KEY</p>
            </div>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground font-sans-body">
            <p className="font-medium text-foreground">How to get your API key:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Go to <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Cloud Console</a></li>
              <li>Create a project and enable <strong>YouTube Data API v3</strong></li>
              <li>Go to Credentials → Create API Key</li>
              <li>Share the key in Lovable chat to configure it</li>
            </ol>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Instagram className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-sans-body font-medium text-foreground">Instagram Graph API</h3>
              <p className="text-xs text-muted-foreground">Secret: INSTAGRAM_ACCESS_TOKEN</p>
            </div>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground font-sans-body">
            <p className="font-medium text-foreground">How to get your access token:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Go to <a href="https://developers.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Meta Developers</a></li>
              <li>Create a Business App and add <strong>Instagram Graph API</strong></li>
              <li>Connect your Instagram account and generate a long-lived token</li>
              <li>Share the token in Lovable chat to configure it</li>
            </ol>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
