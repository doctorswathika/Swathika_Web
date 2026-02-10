import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MapPin, Phone, Mail, Linkedin } from "lucide-react";

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#footer" },
];

export default function Footer() {
  const { ref, isVisible } = useScrollAnimation();

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="footer" className="py-16 bg-background border-t border-border" ref={ref}>
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
            <div className="space-y-2">
              {quickLinks.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className="block text-sm text-muted-foreground font-sans-body hover:text-foreground transition-colors"
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
                Kauvery Hospital, Chennai, Tamil Nadu, India
              </p>
              <a href="tel:+919876543210" className="flex items-center gap-2 text-sm text-muted-foreground font-sans-body hover:text-foreground transition-colors">
                <Phone className="w-4 h-4 text-rose-gold" />
                +91 98765 43210
              </a>
              <a href="mailto:contact@drswathika.com" className="flex items-center gap-2 text-sm text-muted-foreground font-sans-body hover:text-foreground transition-colors">
                <Mail className="w-4 h-4 text-rose-gold" />
                contact@drswathika.com
              </a>
              <a
                href="https://www.linkedin.com/in/swathika-rajendran-38253b165/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground font-sans-body hover:text-foreground transition-colors"
              >
                <Linkedin className="w-4 h-4 text-rose-gold" />
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>

        {/* Publications */}
        <div className="border-t border-border pt-8 mb-8">
          <h4 className="font-serif-display text-lg font-semibold text-foreground mb-3">Publications</h4>
          <ul className="space-y-1 text-xs text-muted-foreground font-sans-body">
            <li>• Immediate Breast Reconstruction — Quality of Life Outcomes (Journal of Plastic & Reconstructive Surgery)</li>
            <li>• Post Mastectomy Radiation Therapy and Breast Reconstruction — A Collaborative Approach</li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-border pt-8 text-center space-y-2">
          <p className="text-xs text-muted-foreground font-sans-body">
            Medical Disclaimer: This website is for informational purposes only and does not constitute medical advice. Please consult a qualified healthcare professional for diagnosis and treatment.
          </p>
          <p className="text-xs text-muted-foreground font-sans-body">
            © {new Date().getFullYear()} Dr. Swathika Rajendran. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
