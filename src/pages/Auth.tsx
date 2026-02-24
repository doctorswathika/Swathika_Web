import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "Welcome back!", description: "You have signed in successfully." });
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast({
          title: "Check your email",
          description: "We've sent you a verification link to confirm your account.",
        });
      }
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
        <title>{isLogin ? "Sign In" : "Sign Up"} — Dr. Swathika Rajendran</title>
      </Helmet>
      <Navbar />
      <main className="pt-24 min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blush/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md mx-6"
        >
          <div className="glass rounded-2xl p-8 lg:p-10 space-y-6">
            <div className="text-center space-y-2">
              <h1 className="font-serif-display text-3xl font-semibold text-foreground">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-sm text-muted-foreground font-sans-body">
                {isLogin
                  ? "Sign in to your account"
                  : "Join us to stay updated"}
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
                    placeholder="your@email.com"
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
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full gradient-rose-gold text-white font-sans-body font-medium tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground font-sans-body hover:text-foreground transition-colors"
              >
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <span className="text-primary font-medium">{isLogin ? "Sign Up" : "Sign In"}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
