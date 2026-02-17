import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navLinks: { label: string; href: string; isRoute?: boolean }[] = [
  { label: "About Me", href: "#about" },
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
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleNav = (href: string, isRoute?: boolean) => {
    setMenuOpen(false);
    if (isRoute) {
      setTimeout(() => navigate(href), 300);
    } else if (location.pathname !== "/") {
      navigate("/" + href);
    } else {
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }, 400);
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
        className={`fixed top-0 left-0 w-full z-[60] transition-all duration-500 ${
          scrolled && !menuOpen
            ? "bg-background/90 backdrop-blur-xl shadow-sm border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => { setMenuOpen(false); handleNav("#hero"); }}
            className="font-serif-display text-xl md:text-2xl font-semibold tracking-wide text-foreground hover:opacity-80 transition-opacity z-[61]"
          >
            DR. SWATHIKA <span className="text-foreground">RAJENDRAN</span>
          </button>

          {/* Menu toggle icon */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-[61] p-2 text-foreground hover:opacity-80 transition-opacity"
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
            className="fixed inset-0 z-[55] bg-background flex flex-col items-center justify-center"
          >
            {/* Decorative rose-gold line */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[60%] opacity-10 gradient-rose-gold" />

            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((l, i) => (
                <motion.button
                  key={l.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => handleNav(l.href, l.isRoute)}
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
                onClick={() => handleNav("/book-consultation", true)}
                className="mt-4 px-8 py-3 rounded-full gradient-rose-gold text-foreground text-sm font-sans-body font-medium tracking-widest uppercase hover:opacity-90 transition-opacity"
              >
                Book Consultation
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
