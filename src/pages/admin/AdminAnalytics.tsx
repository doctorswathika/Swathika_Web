import { motion } from "framer-motion";
import { BarChart3, Users, Eye, Calendar } from "lucide-react";

export default function AdminAnalytics() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif-display text-3xl font-semibold text-foreground">Analytics & Inquiries</h1>
        <p className="text-muted-foreground font-sans-body mt-2">
          View site traffic, consultation bookings, and visitor insights.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Page Views", value: "—", icon: Eye, color: "bg-primary/10 text-primary" },
          { label: "Visitors", value: "—", icon: Users, color: "bg-accent/50 text-foreground" },
          { label: "Consultations", value: "—", icon: Calendar, color: "bg-destructive/10 text-destructive" },
          { label: "Engagement", value: "—", icon: BarChart3, color: "bg-green-500/10 text-green-600" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="glass rounded-2xl p-5 space-y-3"
          >
            <div className={`w-9 h-9 rounded-lg ${stat.color} flex items-center justify-center`}>
              <stat.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground font-sans-body">{stat.value}</p>
              <p className="text-xs text-muted-foreground font-sans-body">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-6 text-center"
      >
        <p className="text-muted-foreground font-sans-body text-sm">
          Analytics tracking will be available once the site is published and receiving traffic.
        </p>
      </motion.div>
    </div>
  );
}
