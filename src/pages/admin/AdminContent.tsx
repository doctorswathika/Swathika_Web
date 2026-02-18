import { motion } from "framer-motion";
import { FileText, ImageIcon, Type } from "lucide-react";

export default function AdminContent() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif-display text-3xl font-semibold text-foreground">Content Management</h1>
        <p className="text-muted-foreground font-sans-body mt-2">
          Edit website text, images, and sections.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 space-y-3"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Type className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-sans-body font-medium text-foreground">Text & Copy</h3>
          <p className="text-sm text-muted-foreground font-sans-body">
            Edit hero headlines, about section, service descriptions, and other website text content. Coming soon.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6 space-y-3"
        >
          <div className="w-10 h-10 rounded-xl bg-accent/50 flex items-center justify-center">
            <ImageIcon className="w-5 h-5 text-foreground" />
          </div>
          <h3 className="font-sans-body font-medium text-foreground">Images & Media</h3>
          <p className="text-sm text-muted-foreground font-sans-body">
            Upload and manage photos, service images, and profile pictures. Coming soon.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6 space-y-3"
        >
          <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-destructive" />
          </div>
          <h3 className="font-sans-body font-medium text-foreground">Blog Posts</h3>
          <p className="text-sm text-muted-foreground font-sans-body">
            Create, edit, and publish blog articles on breast health awareness. Coming soon.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
