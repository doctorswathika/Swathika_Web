import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, LogOut, ShieldCheck } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useHashNavigation } from "@/hooks/useHashNavigation";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

const navLinks: { label: string; href: string; isRoute?: boolean }[] = [
  { label: "About Me", href: "/about", isRoute: true },
  { label: "Services", href: "#services" },
  { label: "Awareness", href: "#awareness" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Blog", href: "#blog" },
  { label: "Instagram", href: "#instagram" },
  { label: "YouTube", href: "#youtube" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const handleNav = useHashNavigation();
  const location = useLocation();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (href: string, isRoute?: boolean) => {
    setMenuOpen(false);
    if (isRoute) {
      setTimeout(() => handleNav(href, true), 300);
    } else {
      handleNav(href);
    }
  };

  return (
    <>
      {/* Scroll progress */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[70]">
        <motion.div
          className="h-full gradient-rose-gold"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-[60] transition-all duration-500 bg-background border-b border-border/50 ${
          scrolled && !menuOpen ? "shadow-sm" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center relative">
          <button
            onClick={() => { setMenuOpen(false); handleNavClick("#hero"); }}
            className="font-serif-display text-base sm:text-xl md:text-2xl font-semibold tracking-[0.1em] sm:tracking-[0.15em] text-foreground hover:opacity-80 transition-opacity z-[61] uppercase"
          >
            DR. SWATHIKA RAJENDRAN
          </button>

          {/* Menu toggle icon - absolute right */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="absolute right-6 z-[61] p-2 text-foreground hover:opacity-80 transition-opacity"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Full-page menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[55] bg-background flex flex-col items-center justify-start overflow-y-auto pt-28 pb-12"
          >
            {/* Decorative rose-gold line */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[60%] opacity-10 gradient-rose-gold" />

            <nav className="flex flex-col items-center gap-8 mt-8">
              {navLinks.map((l, i) => (
                <motion.button
                  key={l.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => handleNavClick(l.href, l.isRoute)}
                  className="group relative font-serif-display text-2xl md:text-4xl tracking-wide uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {l.label}
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] gradient-rose-gold group-hover:w-full transition-all duration-400" />
                </motion.button>
              ))}

              {/* Book Consultation CTA */}
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: navLinks.length * 0.08, duration: 0.5 }}
                onClick={() => handleNavClick("/book-consultation", true)}
                className="mt-4 px-8 py-3 rounded-full gradient-rose-gold text-white text-sm font-sans-body font-medium tracking-widest uppercase hover:opacity-90 transition-opacity"
              >
                Book Consultation
              </motion.button>

              {/* Admin Portal - visible only to admin */}
              {user?.email?.toLowerCase() === "bbm.genai@gmail.com" && (
                <motion.button
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: (navLinks.length + 1) * 0.08, duration: 0.5 }}
                  onClick={() => handleNavClick("/admin/dashboard", true)}
                  className="flex items-center gap-2 text-sm font-sans-body font-semibold tracking-widest uppercase text-primary hover:text-foreground transition-colors"
                >
                  Admin Portal
                </motion.button>
              )}

              {/* Login / Logout */}
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: (navLinks.length + (user?.email?.toLowerCase() === "bbm.genai@gmail.com" ? 2 : 1)) * 0.08, duration: 0.5 }}
                onClick={async () => {
                  if (user) {
                    await supabase.auth.signOut();
                    setMenuOpen(false);
                  } else {
                    handleNavClick("/auth", true);
                  }
                }}
                className="flex items-center gap-2 text-sm font-sans-body tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                {user ? <LogOut className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                {user ? "Sign Out" : "Login / Sign Up"}
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
