import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
  { icon: Mail, label: "Email", value: "contact@drswathika.com", href: "mailto:contact@drswathika.com" },
  { icon: MapPin, label: "Location", value: "Chennai, Tamil Nadu, India", href: undefined },
  { icon: Clock, label: "Availability", value: "Mon – Sat, 9 AM – 6 PM", href: undefined },
];

export default function BookConsultation() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Consultation Request Sent",
      description: "Dr. Swathika's team will contact you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Helmet>
        <title>Book a Consultation — Dr. Swathika Rajendran | Chennai</title>
        <meta name="description" content="Book a private consultation with Dr. Swathika Rajendran, UK-trained Breast Oncoplastic & Reconstructive Surgeon in Chennai." />
        <link rel="canonical" href="https://drswathika.com/book-consultation" />
      </Helmet>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blush/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans-body">Get in Touch</p>
              <h1 className="font-serif-display text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
                Book Your <span className="text-gradient-rose italic">Consultation</span>
              </h1>
              <p className="text-lg text-muted-foreground font-sans-body leading-relaxed max-w-2xl mx-auto">
                Take the first step towards expert, compassionate care. Reach out to schedule a private consultation with Dr. Swathika Rajendran.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 bg-card/50 border-y border-border">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {contactInfo.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center space-y-2"
                >
                  <div className="w-10 h-10 rounded-full gradient-rose-gold flex items-center justify-center mx-auto">
                    <item.icon className="w-4 h-4 text-foreground" />
                  </div>
                  <p className="text-xs font-sans-body text-muted-foreground tracking-widest uppercase">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm font-sans-body text-foreground hover:text-primary transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-sans-body text-foreground">{item.value}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-3xl mx-auto px-6">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-8 lg:p-12 space-y-6"
            >
              <div className="space-y-2 mb-8">
                <h2 className="font-serif-display text-2xl lg:text-3xl font-semibold text-foreground">
                  Request a <span className="text-gradient-rose italic">Consultation</span>
                </h2>
                <p className="text-sm text-muted-foreground font-sans-body">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-sans-body tracking-widest uppercase text-muted-foreground">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground font-sans-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-sans-body tracking-widest uppercase text-muted-foreground">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground font-sans-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-sans-body tracking-widest uppercase text-muted-foreground">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground font-sans-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-sans-body tracking-widest uppercase text-muted-foreground">Service of Interest</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground font-sans-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  >
                    <option value="">Select a service</option>
                    <option value="mastectomy">Mastectomy</option>
                    <option value="breast-conserving">Breast Conserving Surgery</option>
                    <option value="sentinel-node">Sentinel Node Biopsy</option>
                    <option value="oncoplastic">Oncoplastic Surgery</option>
                    <option value="reduction-augmentation">Breast Reduction & Augmentation</option>
                    <option value="lipomodelling">Lipomodelling</option>
                    <option value="implant-reconstruction">Implant Reconstruction</option>
                    <option value="gynaecomastia">Gynaecomastia Correction</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans-body tracking-widest uppercase text-muted-foreground">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground font-sans-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                  placeholder="Tell us about your concerns or questions..."
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full gradient-rose-gold text-foreground font-sans-body font-medium tracking-wide hover:opacity-90 transition-opacity"
              >
                <Send className="w-4 h-4" />
                Send Request
              </button>
            </motion.form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
