import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, ArrowRight } from "lucide-react";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const clearLocalAuthState = () => {
  if (typeof window === "undefined") return;

  const authTokenKey = `sb-${import.meta.env.VITE_SUPABASE_PROJECT_ID}-auth-token`;
  const storages = [window.localStorage, window.sessionStorage];

  storages.forEach((storage) => {
    storage.removeItem(authTokenKey);
    storage.removeItem("supabase.auth.token");

    Object.keys(storage).forEach((key) => {
      if (/^sb-.*-auth-token$/.test(key)) {
        storage.removeItem(key);
      }
    });
  });
};

const isNetworkError = (error: unknown) => {
  const message = error instanceof Error ? error.message : String(error ?? "");
  return /failed to fetch|network|timeout/i.test(message);
};

const signInWithPassword = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) throw error;
  if (!data.session) throw new Error("Unable to start session. Please try again.");
};

type PasswordTokenResponse = {
  access_token?: string;
  refresh_token?: string;
  error?: string;
  error_description?: string;
  msg?: string;
};

const signInWithXhr = (email: string, password: string) =>
  new Promise<PasswordTokenResponse>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${import.meta.env.VITE_SUPABASE_URL}/auth/v1/token?grant_type=password`, true);
    xhr.setRequestHeader("content-type", "application/json;charset=UTF-8");
    xhr.setRequestHeader("apikey", import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
    xhr.timeout = 10000;

    xhr.onload = () => {
      let payload: PasswordTokenResponse = {};

      try {
        payload = JSON.parse(xhr.responseText ?? "{}");
      } catch {
        // keep default empty payload
      }

      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(payload);
        return;
      }

      reject(
        new Error(
          payload.error_description || payload.msg || payload.error || "Unable to sign in. Please try again.",
        ),
      );
    };

    xhr.onerror = () => reject(new Error("Failed to fetch"));
    xhr.ontimeout = () => reject(new Error("Request timed out"));
    xhr.send(JSON.stringify({ email, password, gotrue_meta_security: {} }));
  });

const signInWithXhrFallback = async (email: string, password: string) => {
  const tokenData = await signInWithXhr(email, password);

  if (!tokenData.access_token || !tokenData.refresh_token) {
    throw new Error("Unable to start session. Please try again.");
  }

  const { error } = await supabase.auth.setSession({
    access_token: tokenData.access_token,
    refresh_token: tokenData.refresh_token,
  });

  if (error) throw error;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("Unable to start session. Please try again.");
};

const signInWithRetry = async (email: string, password: string) => {
  try {
    await signInWithPassword(email, password);
    return;
  } catch (error) {
    if (!isNetworkError(error)) throw error;

    clearLocalAuthState();
    await supabase.auth.signOut({ scope: "local" }).catch(() => undefined);

    try {
      await signInWithXhrFallback(email, password);
      return;
    } catch {
      await wait(600);
      await signInWithPassword(email, password);
    }
  }
};

const ADMIN_EMAIL = "doctorswathika@gmail.com";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // If already logged in, redirect to home
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/", { replace: true });
      } else {
        setInitializing(false);
      }
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) return;

    if (normalizedEmail !== ADMIN_EMAIL) {
      toast({
        title: "Access denied",
        description: "This portal is restricted to authorised administrators only.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      await signInWithRetry(normalizedEmail, password);
      toast({ title: "Welcome back!", description: "You have signed in successfully." });
      navigate("/admin");
    } catch (error: unknown) {
      if (isNetworkError(error)) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          toast({ title: "Welcome back!", description: "You have signed in successfully." });
          navigate("/admin");
          return;
        }
      }

      const rawMessage = error instanceof Error ? error.message : "Unable to continue.";
      const message = /failed to fetch/i.test(rawMessage)
        ? "Network issue while connecting to authentication. Please refresh and try again."
        : rawMessage;

      toast({ title: "Sign-in failed", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Helmet>
        <title>Admin Sign In — Dr. Swathika Rajendran</title>
      </Helmet>
      <Navbar />
      <main className="pt-24 min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blush/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md mx-6"
        >
          <div className="glass rounded-2xl p-8 lg:p-10 space-y-6">
            <div className="text-center space-y-2">
              <h1 className="font-serif-display text-3xl font-semibold text-foreground">
                Admin Sign In
              </h1>
              <p className="text-sm text-muted-foreground font-sans-body">
                Restricted access. Authorised administrator only.
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
                    autoComplete="username"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border text-foreground font-sans-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    placeholder="admin@email.com"
                    disabled={loading || initializing}
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
                    autoComplete="current-password"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border text-foreground font-sans-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    placeholder="••••••••"
                    minLength={6}
                    disabled={loading || initializing}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || initializing}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full gradient-rose-gold text-foreground font-sans-body font-medium tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {initializing ? "Preparing..." : loading ? "Please wait..." : "Sign In"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
