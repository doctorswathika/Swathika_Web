import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MapPin, MessageCircle, Mail } from "lucide-react";
import { useHashNavigation } from "@/hooks/useHashNavigation";
import { Link } from "react-router-dom";

const EASE = [0.22, 1, 0.36, 1] as const;

const quickLinks: { label: string; href: string; isRoute?: boolean }[] = [
  { label: "About Me", href: "/about", isRoute: true },
  { label: "Services", href: "#services" },
  { label: "Awareness", href: "#awareness" },
  { label: "Blog", href: "#blog" },
  { label: "Social Media", href: "#social-media" },
  { label: "FAQ", href: "#faq" },
  { label: "Book Consultation", href: "/book-consultation", isRoute: true },
];

export default function Footer() {
  const { ref, isVisible } = useScrollAnimation();
  const handleNav = useHashNavigation();

  const brandDesc =
    "UK Trained Breast Oncoplastic & Reconstructive Surgeon. Combining global expertise with compassionate and patient centred care.";
  const address = "Chennai, Tamil Nadu, India";
  const whatsappNumber = "919940808876";
  const email = "doctorswathika@gmail.com";
  const disclaimer =
    "Medical Disclaimer: This website is for informational purposes only and does not constitute medical advice. Please consult a qualified healthcare professional for diagnosis and treatment.";

  const handleNavClick = (href: string, isRoute?: boolean) => {
    handleNav(href, isRoute);
  };

  return (
    <footer id="footer" className="relative pt-16 lg:pt-20 pb-10 bg-background overflow-hidden" ref={ref}>
      {/* Soft top wash */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[hsl(340_60%_92%/0.25)] blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: EASE }}
        className="relative max-w-[88rem] mx-auto px-6 lg:px-10"
      >
        {/* Editorial mark */}
        <div className="text-center mb-10 lg:mb-12">
          <p className="text-[10px] tracking-[0.45em] uppercase text-muted-foreground font-sans-body mb-3">
            Dr. Swathika Rajendran
          </p>
          <h3 className="font-serif-display text-xl sm:text-2xl lg:text-[1.75rem] font-light text-foreground leading-[1.2] tracking-[-0.01em] max-w-3xl mx-auto">
            Breast care, with the calm of <em className="text-gradient-rose">experience</em>.
          </h3>
        </div>

        <div className="hairline mb-12 lg:mb-14" />

        <div className="grid md:grid-cols-12 gap-12 lg:gap-16 mb-16">
          {/* Brand */}
          <div className="md:col-span-5 space-y-5">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-sans-body">Practice</p>
            <p className="text-[15px] text-muted-foreground font-sans-body font-light leading-[1.85] max-w-md">
              {brandDesc}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-5">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-sans-body">Navigate</p>
            <div className="flex flex-col gap-3">
              {quickLinks.map((l) => (
                <button
                  key={l.href}
                  onClick={() => handleNavClick(l.href, l.isRoute)}
                  className="text-left text-[14px] text-foreground/75 font-sans-body font-light hover:text-foreground hover:translate-x-1 transition-all duration-500"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-4 space-y-5">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-sans-body">In touch</p>
            <div className="space-y-4">
              <p className="flex items-start gap-3 text-[14px] text-foreground/75 font-sans-body font-light leading-[1.7]">
                <MapPin className="w-4 h-4 mt-0.5 text-[hsl(var(--rose-gold))] flex-shrink-0" />
                {address}
              </p>
              <a
                href={`https://api.whatsapp.com/send?phone=${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[14px] text-foreground/75 font-sans-body font-light hover:text-foreground transition-colors group"
              >
                <MessageCircle className="w-4 h-4 text-[hsl(142_60%_45%)] group-hover:scale-110 transition-transform" />
                Chat on WhatsApp
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 text-[14px] text-foreground/75 font-sans-body font-light hover:text-foreground transition-colors group"
              >
                <Mail className="w-4 h-4 text-[hsl(var(--rose-gold))] group-hover:scale-110 transition-transform" />
                {email}
              </a>
            </div>
          </div>
        </div>

        <div className="hairline mb-8" />

        <div className="flex flex-col gap-4 text-center md:text-left md:flex-row md:items-start md:justify-between">
          <p className="text-[11.5px] text-muted-foreground/85 font-sans-body font-light leading-[1.75] max-w-3xl">
            {disclaimer}
          </p>
          <div className="flex flex-col items-center gap-3 md:items-end flex-shrink-0">
            <p className="text-[11.5px] text-muted-foreground/85 font-sans-body font-light">
              © {new Date().getFullYear()} Dr. Swathika Rajendran
            </p>
            <nav aria-label="Legal links" className="flex items-center gap-5">
              <Link
                to="/privacy-policy"
                className="text-[11px] text-muted-foreground/70 font-sans-body font-light hover:text-foreground hover:translate-x-0 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Privacy Policy
              </Link>
              <span className="text-muted-foreground/40 text-[11px]" aria-hidden="true">·</span>
              <Link
                to="/terms-and-conditions"
                className="text-[11px] text-muted-foreground/70 font-sans-body font-light hover:text-foreground transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Terms &amp; Conditions
              </Link>
            </nav>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
