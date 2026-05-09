import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, LogOut } from "lucide-react";
import { useHashNavigation } from "@/hooks/useHashNavigation";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

const navLinks: { label: string; href: string; isRoute?: boolean }[] = [
  { label: "About Me", href: "/about", isRoute: true },
  { label: "Services", href: "#services" },
  { label: "Awareness", href: "#awareness" },
  { label: "Blog", href: "#blog" },
  { label: "Social Media", href: "#social-media" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const handleNav = useHashNavigation();

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
      const y = window.scrollY;
      setScrolled(y > 50);
      // Navbar is always visible across all routes.
      setHidden(false);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (y / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("popstate", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onScroll);
    };
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
        animate={{ y: hidden && !menuOpen ? -140 : 0, opacity: hidden && !menuOpen ? 0 : 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: hidden && !menuOpen ? "none" : "auto" }}
        className={`fixed top-0 left-0 w-full z-[60] transition-all duration-700 ${
          scrolled && !menuOpen
            ? "bg-background/80 backdrop-blur-2xl backdrop-saturate-150 border-b border-border/40 shadow-[0_1px_0_0_hsl(var(--border)/0.4),0_12px_40px_-20px_hsl(258_40%_30%/0.12)] py-2"
            : "bg-background/95 border-b border-border/30 py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-center relative">
          <button
            onClick={() => { setMenuOpen(false); handleNavClick("#hero"); }}
            className="group relative z-[61] max-w-[calc(100vw-4.5rem)] sm:max-w-[calc(100vw-6.5rem)] text-foreground hover:opacity-95 transition-opacity"
            aria-label="Go to home"
          >
            <span
              className="brand-wordmark block font-serif-display font-medium uppercase whitespace-nowrap leading-none tracking-[0.16em] sm:tracking-[0.20em] md:tracking-[0.24em]"
              style={{ fontSize: "clamp(0.7rem, 2.8vw, 1.2rem)" }}
            >
              Dr. Swathika Rajendran
            </span>
          </button>

          {/* Menu toggle icon - absolute right */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="absolute right-4 sm:right-6 z-[61] p-2 text-foreground hover:opacity-80 transition-opacity"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Menu className="w-5 h-5" />
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
                className="cta-luxe mt-4 px-8 py-3 rounded-full gradient-rose-gold text-foreground text-sm font-sans-body font-medium tracking-widest uppercase"
              >
                Book Consultation
              </motion.button>

              {/* Admin Portal - visible only to admin */}
              {user?.id === "6c699a7c-d104-41fb-b26f-b93ee25245e3" && (
                <motion.button
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: (navLinks.length + 1) * 0.08, duration: 0.5 }}
                  onClick={() => handleNavClick("/admin/blog", true)}
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
                transition={{ delay: (navLinks.length + (user?.id === "6c699a7c-d104-41fb-b26f-b93ee25245e3" ? 2 : 1)) * 0.08, duration: 0.5 }}
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
