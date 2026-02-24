import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";

const ADMIN_EMAIL = "bbm.genai@gmail.com";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Clear any stale/expired local session on mount
  useEffect(() => {
    supabase.auth.signOut({ scope: "local" }).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email.toLowerCase() !== ADMIN_EMAIL) {
      toast({
        title: "Access Denied",
        description: "This portal is restricted to authorized administrators only.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      let { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error && /failed to fetch/i.test(error.message ?? "")) {
        await supabase.auth.signOut({ scope: "local" }).catch(() => {});
        const retry = await supabase.auth.signInWithPassword({ email, password });
        error = retry.error;
      }

      toast({ title: "Welcome, Admin!", description: "You have signed in successfully." });
      navigate("/admin/api-keys");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>Admin Portal — Dr. Swathika Rajendran</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <main className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blush/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md mx-6"
        >
          <div className="glass rounded-2xl p-8 lg:p-10 space-y-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-serif-display text-3xl font-semibold text-foreground">
                Admin Portal
              </h1>
              <p className="text-sm text-muted-foreground font-sans-body">
                Restricted access. Authorized administrators only.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-sans-body tracking-widest uppercase text-muted-foreground">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border text-foreground font-sans-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    placeholder="admin@email.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans-body tracking-widest uppercase text-muted-foreground">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border text-foreground font-sans-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    placeholder="••••••••"
                    minLength={6}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full gradient-rose-gold text-foreground font-sans-body font-medium tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? "Please wait..." : "Sign In"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-center space-y-2">
              <button
                type="button"
                onClick={async () => {
                  if (!email || email.toLowerCase() !== ADMIN_EMAIL) {
                    toast({ title: "Enter your admin email first", variant: "destructive" });
                    return;
                  }
                  try {
                    const { error } = await supabase.auth.resetPasswordForEmail(email, {
                      redirectTo: `${window.location.origin}/reset-password`,
                    });
                    if (error) throw error;
                    toast({ title: "Check your email", description: "We've sent a password reset link." });
                  } catch (err: any) {
                    toast({ title: "Error", description: err.message, variant: "destructive" });
                  }
                }}
                className="text-sm text-primary font-sans-body hover:underline transition-colors"
              >
                Forgot password?
              </button>
              <div>
                <a href="/" className="text-sm text-muted-foreground font-sans-body hover:text-foreground transition-colors">
                  ← Back to website
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
}
