import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Mail, Phone, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string | null;
  preferred_date: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  confirmed: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  cancelled: "bg-destructive/10 text-destructive",
  completed: "bg-primary/10 text-primary",
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const { toast } = useToast();

  const fetchBookings = async () => {
    let query = supabase.from("bookings").select("*").order("created_at", { ascending: false });
    if (filter !== "all") query = query.eq("status", filter);
    const { data } = await query;
    if (data) setBookings(data);
    setLoading(false);
  };

  useEffect(() => { fetchBookings(); }, [filter]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else toast({ title: `Booking ${status}` });
    fetchBookings();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this booking?")) return;
    await supabase.from("bookings").delete().eq("id", id);
    toast({ title: "Deleted" });
    fetchBookings();
  };

  if (loading) return <p className="text-muted-foreground font-sans-body">Loading...</p>;

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif-display text-3xl font-semibold text-foreground">Bookings</h1>
        <p className="text-muted-foreground font-sans-body mt-2">View and manage consultation requests.</p>
      </motion.div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {["all", "pending", "confirmed", "completed", "cancelled"].map((s) => (
          <Button key={s} size="sm" variant={filter === s ? "default" : "outline"} onClick={() => setFilter(s)} className="capitalize font-sans-body">
            {s}
          </Button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-3">
        {bookings.map((b) => (
          <motion.div key={b.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-serif-display font-semibold text-foreground text-lg">{b.name}</h3>
                  <span className={`text-xs font-sans-body font-medium px-2.5 py-0.5 rounded-full capitalize ${STATUS_STYLES[b.status] || "bg-muted text-muted-foreground"}`}>
                    {b.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground font-sans-body mb-2">
                  <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{b.email}</span>
                  <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{b.phone}</span>
                  {b.preferred_date && <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{format(new Date(b.preferred_date), "MMM d, yyyy")}</span>}
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{format(new Date(b.created_at), "MMM d, yyyy h:mm a")}</span>
                </div>
                {b.service && <p className="text-sm font-sans-body text-foreground mb-1"><strong>Service:</strong> {b.service}</p>}
                {b.message && <p className="text-sm text-muted-foreground font-sans-body">{b.message}</p>}
              </div>
              <div className="flex gap-1.5 flex-shrink-0">
                {b.status === "pending" && (
                  <>
                    <Button size="sm" variant="outline" className="gap-1.5 text-emerald-600 hover:text-emerald-700" onClick={() => updateStatus(b.id, "confirmed")}>
                      <CheckCircle className="w-3.5 h-3.5" /> Confirm
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1.5 text-destructive" onClick={() => updateStatus(b.id, "cancelled")}>
                      <XCircle className="w-3.5 h-3.5" /> Cancel
                    </Button>
                  </>
                )}
                {b.status === "confirmed" && (
                  <Button size="sm" variant="outline" className="gap-1.5" onClick={() => updateStatus(b.id, "completed")}>
                    <CheckCircle className="w-3.5 h-3.5" /> Complete
                  </Button>
                )}
                <Button size="sm" variant="ghost" className="text-destructive h-8 text-xs" onClick={() => handleDelete(b.id)}>Delete</Button>
              </div>
            </div>
          </motion.div>
        ))}
        {bookings.length === 0 && <p className="text-center text-muted-foreground font-sans-body py-12">No bookings found.</p>}
      </div>
    </div>
  );
}
