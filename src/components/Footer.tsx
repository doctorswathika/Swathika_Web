import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MapPin, Phone, Mail, Linkedin, Heart } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useHashNavigation } from "@/hooks/useHashNavigation";
import { useSiteContent } from "@/hooks/useSiteContent";

const quickLinks: { label: string; href: string; isRoute?: boolean }[] = [
  { label: "About Me", href: "/about", isRoute: true },
  { label: "Services", href: "#services" },
  { label: "Awareness", href: "#awareness" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Blog", href: "#blog" },
  { label: "Instagram", href: "#instagram" },
  { label: "YouTube", href: "#youtube" },
  { label: "Book Consultation", href: "/book-consultation", isRoute: true },
];

export default function Footer() {
  const { ref, isVisible } = useScrollAnimation();
  const handleNav = useHashNavigation();
  const location = useLocation();
  const { getText, getAlignClass } = useSiteContent();

  const brandDesc = getText("footer_brand_description", "UK Trained Breast Oncoplastic & Reconstructive Surgeon. Combining global expertise with compassionate, patient-centred care.");
  const address = getText("footer_address", "Chennai, Tamil Nadu, India");
  const phone = getText("footer_phone", "+91 98765 43210");
  const email = getText("footer_email", "contact@drswathika.com");
  const disclaimer = getText("footer_disclaimer", "Medical Disclaimer: This website is for informational purposes only and does not constitute medical advice. Please consult a qualified healthcare professional for diagnosis and treatment.");

  const handleNavClick = (href: string, isRoute?: boolean) => {
    handleNav(href, isRoute);
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
            <p className={`text-sm text-muted-foreground font-sans-body leading-relaxed ${getAlignClass("footer_brand_description")}`}
              dangerouslySetInnerHTML={{ __html: brandDesc }} />
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif-display text-lg font-semibold text-foreground">Quick Links</h4>
            <div className="space-y-2.5">
              {quickLinks.map((l) => (
                <button
                  key={l.href}
                  onClick={() => handleNavClick(l.href, l.isRoute)}
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
              <p className={`flex items-start gap-2 text-sm text-muted-foreground font-sans-body ${getAlignClass("footer_address")}`}>
                <MapPin className="w-4 h-4 mt-0.5 text-rose-gold flex-shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: address }} />
              </p>
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-sm text-muted-foreground font-sans-body hover:text-foreground transition-colors group">
                <Phone className="w-4 h-4 text-rose-gold group-hover:scale-110 transition-transform" />
                {phone}
              </a>
              <a href={`mailto:${email}`} className="flex items-center gap-2 text-sm text-muted-foreground font-sans-body hover:text-foreground transition-colors group">
                <Mail className="w-4 h-4 text-rose-gold group-hover:scale-110 transition-transform" />
                {email}
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
          <p className={`text-xs text-muted-foreground font-sans-body leading-relaxed max-w-2xl mx-auto ${getAlignClass("footer_disclaimer")}`}
            dangerouslySetInnerHTML={{ __html: disclaimer }} />
          <p className="text-xs text-muted-foreground font-sans-body flex items-center justify-center gap-1">
            © {new Date().getFullYear()} Dr. Swathika Rajendran. All rights reserved. Made with <Heart className="w-3 h-3 text-rose-gold inline" /> in Chennai.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
