import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MapPin, Phone, Mail, Linkedin, Heart } from "lucide-react";

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Awareness", href: "#awareness" },
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Footer() {
  const { ref, isVisible } = useScrollAnimation();

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="footer" className="py-16 bg-background relative overflow-hidden" ref={ref}>
      <div className="divider-rose mb-16" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif-display text-2xl font-semibold text-foreground">
              Dr. Swathika <span className="text-gradient-rose">Rajendran</span>
            </h3>
            <p className="text-sm text-muted-foreground font-sans-body leading-relaxed">
              UK Trained Breast Oncoplastic & Reconstructive Surgeon. Combining global expertise with compassionate, patient-centred care.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif-display text-lg font-semibold text-foreground">Quick Links</h4>
            <div className="space-y-2.5">
              {quickLinks.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className="block text-sm text-muted-foreground font-sans-body hover:text-foreground hover:translate-x-1 transition-all duration-300"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-serif-display text-lg font-semibold text-foreground">Contact</h4>
            <div className="space-y-3">
              <p className="flex items-start gap-2 text-sm text-muted-foreground font-sans-body">
                <MapPin className="w-4 h-4 mt-0.5 text-rose-gold flex-shrink-0" />
                Chennai, Tamil Nadu, India
              </p>
              <a href="tel:+919876543210" className="flex items-center gap-2 text-sm text-muted-foreground font-sans-body hover:text-foreground transition-colors group">
                <Phone className="w-4 h-4 text-rose-gold group-hover:scale-110 transition-transform" />
                +91 98765 43210
              </a>
              <a href="mailto:contact@drswathika.com" className="flex items-center gap-2 text-sm text-muted-foreground font-sans-body hover:text-foreground transition-colors group">
                <Mail className="w-4 h-4 text-rose-gold group-hover:scale-110 transition-transform" />
                contact@drswathika.com
              </a>
              <a
                href="https://www.linkedin.com/in/swathika-rajendran-38253b165/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground font-sans-body hover:text-foreground transition-colors group"
              >
                <Linkedin className="w-4 h-4 text-rose-gold group-hover:scale-110 transition-transform" />
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="divider-rose mb-8" />
        <div className="text-center space-y-3">
          <p className="text-xs text-muted-foreground font-sans-body leading-relaxed max-w-2xl mx-auto">
            Medical Disclaimer: This website is for informational purposes only and does not constitute medical advice. Please consult a qualified healthcare professional for diagnosis and treatment.
          </p>
          <p className="text-xs text-muted-foreground font-sans-body flex items-center justify-center gap-1">
            © {new Date().getFullYear()} Dr. Swathika Rajendran. All rights reserved. Made with <Heart className="w-3 h-3 text-rose-gold inline" /> in Chennai.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}