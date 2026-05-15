import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, Send, Loader2, CheckCircle2, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const bookingSchema = z.object({
  name: z.string().trim().min(1, "Please share your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(6, "Please share a contact number").max(20),
  service: z.string().optional(),
  message: z.string().trim().max(1000).optional(),
});

const serviceOptions = [
  { value: "", label: "Select an area of interest" },
  { value: "mastectomy", label: "Mastectomy" },
  { value: "breast-conserving", label: "Breast Conserving Surgery" },
  { value: "sentinel-node", label: "Sentinel Node Biopsy" },
  { value: "oncoplastic", label: "Oncoplastic Surgery" },
  { value: "reduction-augmentation", label: "Breast Reduction & Augmentation" },
  { value: "lipomodelling", label: "Lipomodelling" },
  { value: "implant-reconstruction", label: "Implant Reconstruction" },
  { value: "gynaecomastia", label: "Gynaecomastia Correction" },
  { value: "other", label: "Something else" },
];

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+91 99408 08876", href: "tel:+919940808876" },
  { icon: Mail, label: "Email", value: "doctorswathika@gmail.com", href: "mailto:doctorswathika@gmail.com" },
  { icon: MapPin, label: "Location", value: "Chennai, Tamil Nadu, India", href: undefined },
  { icon: Clock, label: "Availability", value: "Mon – Sat, 9 AM – 6 PM", href: undefined },
];

const reassurances = [
  "Reviewed personally by Dr. Swathika's team",
  "Replies within 24 hours, every working day",
  "Strictly confidential your details stay private",
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function BookConsultation() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const serviceLabel = useMemo(
    () => serviceOptions.find((o) => o.value === formData.service)?.label ?? "",
    [formData.service],
  );

  const EASE = [0.22, 1, 0.36, 1] as const;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = bookingSchema.safeParse(formData);
    if (!result.success) {
      toast({
        title: "Just one moment",
        description: result.error.errors[0]?.message,
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("bookings").insert({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service || null,
      message: formData.message || "",
    });
    setSubmitting(false);
    if (error) {
      toast({
        title: "Couldn't send your request",
        description: "Please try again, or message us on WhatsApp.",
        variant: "destructive",
      });
      return;
    }
    setConfirmed(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    setConfirmed(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const inputClasses =
    "w-full px-5 py-4 rounded-xl bg-background border border-border/70 text-foreground font-sans-body text-[15px] placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/40 transition-all";

  return (
    <>
      <Helmet>
        <title>Schedule a Private Consultation with Dr. Swathika Rajendran | Chennai</title>
        <meta
          name="description"
          content="Schedule a private, confidential consultation with Dr. Swathika Rajendran, UK-trained Breast Oncoplastic & Reconstructive Surgeon in Chennai."
        />
        <link rel="canonical" href="https://drswathika.com/book-consultation" />
      </Helmet>
      <Navbar />
      <main className="pt-24">
        {/* ── Editorial hero ───────────────────────────────────────── */}
        <section className="relative py-20 lg:py-28 overflow-hidden bg-background">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-[hsl(340_70%_88%/0.35)] blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-[480px] h-[480px] rounded-full bg-[hsl(268_80%_86%/0.3)] blur-3xl" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-3">
                <span className="h-px w-10 bg-foreground/40" />
                <p className="text-[10px] tracking-[0.45em] uppercase text-muted-foreground font-sans-body">
                  Private Consultation
                </p>
                <span className="h-px w-10 bg-foreground/40" />
              </div>
              <h1 className="font-serif-display text-[2.5rem] sm:text-5xl lg:text-[4rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground">
                Schedule a <em className="text-gradient-rose">Private Consultation</em>
              </h1>
              <p className="text-base lg:text-[17px] text-muted-foreground font-sans-body leading-[1.85] font-light max-w-2xl mx-auto">
                Share a few details below. Dr. Swathika's team will personally reach out within 24 hours to arrange a
                discreet, unhurried appointment.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Quick contact strip ──────────────────────────────────── */}
        <section className="py-10 bg-card/40 border-y border-border/60">
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {contactInfo.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                  className="text-center space-y-2.5"
                >
                  <div className="w-10 h-10 rounded-full gradient-rose-gold flex items-center justify-center mx-auto">
                    <item.icon className="w-4 h-4 text-foreground" />
                  </div>
                  <p className="text-[10px] font-sans-body text-muted-foreground tracking-[0.35em] uppercase">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm font-sans-body text-foreground hover:text-primary transition-colors"
                    >
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

        {/* ── Form / Confirmation ──────────────────────────────────── */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Sidebar reassurance */}
              <aside className="lg:col-span-4 lg:sticky lg:top-28">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="space-y-7"
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-[hsl(var(--rose-gold))]" />
                    <span className="text-[10px] tracking-[0.45em] uppercase text-muted-foreground font-sans-body">
                      What to expect
                    </span>
                  </div>
                  <h2 className="font-serif-display text-[1.75rem] lg:text-[2rem] font-light text-foreground leading-[1.15] tracking-[-0.015em]">
                    A calm, considered first conversation.
                  </h2>
                  <ul className="space-y-4 pt-2 border-t border-border/60">
                    {reassurances.map((r) => (
                      <li
                        key={r}
                        className="flex items-start gap-3 text-[14.5px] text-muted-foreground font-sans-body font-light leading-[1.7]"
                      >
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/70 flex-shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </aside>

              {/* Form / Confirmation panel */}
              <div className="lg:col-span-8">
                <AnimatePresence mode="wait" initial={false}>
                  {!confirmed ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      onSubmit={handleSubmit}
                      className="rounded-2xl border border-border/60 bg-card p-8 lg:p-12 shadow-[0_30px_80px_-40px_hsl(258_40%_30%/0.18)]"
                    >
                      <div className="mb-10 pb-8 border-b border-border/60">
                        <p className="text-[10px] tracking-[0.45em] uppercase text-muted-foreground font-sans-body mb-3">
                          Step 01 — Your details
                        </p>
                        <h3 className="font-serif-display text-[1.75rem] lg:text-[2rem] font-light text-foreground leading-[1.15] tracking-[-0.015em]">
                          Tell us a little about you.
                        </h3>
                      </div>

                      <div className="space-y-7">
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label className="text-[10px] font-sans-body tracking-[0.4em] uppercase text-muted-foreground">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              required
                              maxLength={100}
                              value={formData.name}
                              onChange={handleChange}
                              className={inputClasses}
                              placeholder="Your full name"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-sans-body tracking-[0.4em] uppercase text-muted-foreground">
                              Email *
                            </label>
                            <input
                              type="email"
                              name="email"
                              required
                              maxLength={255}
                              value={formData.email}
                              onChange={handleChange}
                              className={inputClasses}
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label className="text-[10px] font-sans-body tracking-[0.4em] uppercase text-muted-foreground">
                              Phone *
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              required
                              maxLength={20}
                              value={formData.phone}
                              onChange={handleChange}
                              className={inputClasses}
                              placeholder="+91 XXXXX XXXXX"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-sans-body tracking-[0.4em] uppercase text-muted-foreground">
                              Area of interest
                            </label>
                            <select
                              name="service"
                              value={formData.service}
                              onChange={handleChange}
                              className={inputClasses}
                            >
                              {serviceOptions.map((o) => (
                                <option key={o.value} value={o.value}>
                                  {o.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-sans-body tracking-[0.4em] uppercase text-muted-foreground">
                            Anything you'd like Dr. Swathika to know? (optional)
                          </label>
                          <textarea
                            name="message"
                            rows={4}
                            maxLength={1000}
                            value={formData.message}
                            onChange={handleChange}
                            className={`${inputClasses} resize-none`}
                            placeholder="Briefly share your concerns, symptoms, or questions…"
                          />
                          <div className="text-right text-[11px] text-muted-foreground/70 font-sans-body">
                            {formData.message.length}/1000
                          </div>
                        </div>

                        <div className="pt-4">
                          <button
                            type="submit"
                            disabled={submitting}
                            className="group inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full gradient-rose-gold text-foreground font-sans-body font-semibold text-[15px] tracking-wide hover:scale-[1.02] transition-all duration-300 shadow-[0_8px_30px_-4px_hsl(var(--primary)/0.35)] disabled:opacity-60 disabled:hover:scale-100"
                          >
                            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                            {submitting ? "Sending…" : "Send Request"}
                          </button>
                        </div>
                        <p className="text-[12px] text-muted-foreground/80 font-sans-body italic">
                          By submitting, you agree to be contacted privately about your enquiry. We never share your
                          details.
                        </p>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="confirmation"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.7, ease: EASE }}
                      className="rounded-2xl border border-border/60 bg-card p-10 lg:p-14 shadow-[0_30px_80px_-40px_hsl(258_40%_30%/0.2)] text-center"
                    >
                      <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                        className="w-16 h-16 rounded-full gradient-rose-gold flex items-center justify-center mx-auto mb-8"
                      >
                        <CheckCircle2 className="w-7 h-7 text-foreground" />
                      </motion.div>
                      <p className="text-[10px] tracking-[0.45em] uppercase text-muted-foreground font-sans-body mb-4">
                        Request Received
                      </p>
                      <h3 className="font-serif-display text-[2rem] lg:text-[2.75rem] font-light text-foreground leading-[1.1] tracking-[-0.02em] mb-5">
                        Thank you, <em className="text-gradient-rose">{formData.name.split(" ")[0] || "there"}</em>.
                      </h3>
                      <p className="text-[15px] lg:text-base text-muted-foreground font-sans-body leading-[1.85] font-light max-w-xl mx-auto mb-10">
                        Your request is with Dr. Swathika's team. You'll receive a personal reply within 24 hours.
                      </p>

                      <div className="flex justify-center mb-10">
                        <button
                          type="button"
                          onClick={resetForm}
                          className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-border/70 bg-background text-foreground font-sans-body font-medium text-[15px] hover:border-primary/40 transition-all"
                        >
                          Send another request
                        </button>
                      </div>

                      <div className="pt-8 border-t border-border/60 text-left max-w-md mx-auto space-y-2.5">
                        <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-sans-body mb-3">
                          Summary
                        </p>
                        <div className="text-sm font-sans-body text-foreground/80 space-y-1.5">
                          <p>
                            <span className="text-muted-foreground">Name —</span> {formData.name}
                          </p>
                          <p>
                            <span className="text-muted-foreground">Email —</span> {formData.email}
                          </p>
                          <p>
                            <span className="text-muted-foreground">Phone —</span> {formData.phone}
                          </p>
                          {serviceLabel && (
                            <p>
                              <span className="text-muted-foreground">Interest —</span> {serviceLabel}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
