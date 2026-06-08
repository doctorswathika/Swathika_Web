import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function TermsAndConditions() {
  return (
    <>
      <Helmet>
        <title>Terms &amp; Conditions | Dr. Swathika Rajendran — Breast Surgeon Chennai</title>
        <meta
          name="description"
          content="Read the Terms and Conditions governing the use of Dr. Swathika Rajendran's website and consultation services."
        />
        <link rel="canonical" href="https://drswathikarajendran.com/terms-and-conditions" />
        <meta property="og:title" content="Terms &amp; Conditions | Dr. Swathika Rajendran" />
        <meta
          property="og:description"
          content="Terms and Conditions for drswathikarajendran.com — your agreement when using this website and its services."
        />
        <meta property="og:url" content="https://drswathikarajendran.com/terms-and-conditions" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Navbar />

      <main className="bg-background pt-24 min-h-screen">
        {/* ─── Hero / Page Title ─── */}
        <section className="relative overflow-hidden border-b border-border/60 bg-background">
          {/* Ambient decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 gradient-hero opacity-60" />
            <div className="absolute -top-24 left-[-8%] h-[28rem] w-[28rem] rounded-full bg-primary/8 blur-[130px] ambient-float" />
            <div className="absolute bottom-[-20%] right-[-10%] h-[20rem] w-[20rem] rounded-full bg-blush/15 blur-[120px] ambient-float" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-20">
            <Link
              to="/"
              className="mb-10 inline-flex items-center gap-2 font-sans-body text-sm text-foreground/70 transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="max-w-3xl space-y-6"
            >
              <p className="font-sans-body text-[11px] font-medium uppercase tracking-[0.32em] text-foreground/60 sm:text-xs">
                Legal
              </p>

              <h1 className="font-serif-display text-[2.5rem] font-light leading-[1.05] tracking-[-0.025em] text-foreground sm:text-5xl lg:text-[4rem]">
                Terms &amp;{" "}
                <em className="text-gradient-rose">Conditions</em>
              </h1>

              <div className="hairline max-w-xl" />

              <p className="font-sans-body text-[15px] leading-[1.9] text-foreground/70 sm:text-base lg:text-[17px] max-w-2xl">
                Please read these Terms and Conditions carefully before using this website or booking a consultation. By accessing our services, you agree to be bound by these terms.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─── Content Area ─── */}
        <section className="relative py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: EASE }}
              className="glass-premium rounded-[28px] px-8 py-12 shadow-luxe lg:px-14 lg:py-16"
            >
              {/*
               * ─────────────────────────────────────────────────────────────────
               *  CONTENT PLACEHOLDER
               *  Replace everything between these comment markers with the final
               *  Terms & Conditions legal text when it is ready. The container is
               *  fully styled and ready to accept long-form content.
               *
               *  Supported content:
               *    • Headings  (h2, h3, h4)
               *    • Paragraphs
               *    • Ordered / unordered lists
               *    • Hyperlinks
               *    • Bold / italic emphasis
               *    • Horizontal rules
               *
               *  All elements inherit the legal-content CSS class applied to the
               *  parent div below for consistent typography and spacing.
               * ─────────────────────────────────────────────────────────────────
               */}
              <div className="space-y-10 font-sans-body text-[15px] leading-[1.9] text-foreground/80 lg:text-[16px]">

                {/* ── Intro ── */}
                <p>
                  Welcome to the official website of{" "}
                  <strong className="font-medium text-foreground">
                    Dr. Swathika Rajendran – Breast Oncoplastic &amp; Reconstructive Surgeon
                  </strong>
                  . By accessing or using this Website, You agree to comply with and be bound by the following
                  Terms &amp; Conditions. Please read them carefully before using the Website.
                </p>

                <div className="hairline" />

                {/* ── Acceptance of Terms ── */}
                <section aria-labelledby="tc-acceptance">
                  <h2
                    id="tc-acceptance"
                    className="font-serif-display text-[1.6rem] font-light leading-[1.1] tracking-[-0.02em] text-foreground mb-5 lg:text-[1.9rem]"
                  >
                    Acceptance of Terms
                  </h2>
                  <p>
                    By accessing this Website, You acknowledge that You have read, understood, and agreed to these
                    Terms &amp; Conditions. If You do not agree with any part of these terms, please discontinue
                    use of the Website.
                  </p>
                </section>

                <div className="hairline" />

                {/* ── Medical Disclaimer ── */}
                <section aria-labelledby="tc-medical">
                  <h2
                    id="tc-medical"
                    className="font-serif-display text-[1.6rem] font-light leading-[1.1] tracking-[-0.02em] text-foreground mb-5 lg:text-[1.9rem]"
                  >
                    Medical Disclaimer
                  </h2>
                  <p className="mb-4">
                    The information provided on this Website is intended for general educational and informational
                    purposes only and should not be considered medical advice, diagnosis, or treatment.
                  </p>
                  <ul className="space-y-2 pl-0">
                    {[
                      "Website content does not replace professional medical consultation.",
                      "Always seek advice from a qualified healthcare professional regarding any medical condition or treatment.",
                      "Do not ignore or delay medical advice based on information obtained from this Website.",
                      "Use of this Website does not establish a doctor-patient relationship between You and Dr. Swathika Rajendran.",
                    ].map((item) => (
                      <li key={item} className="flex gap-3 items-start">
                        <span
                          className="mt-[0.45em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                          style={{ background: "hsl(var(--primary) / 0.55)" }}
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <div className="hairline" />

                {/* ── Appointments and Communication ── */}
                <section aria-labelledby="tc-appointments">
                  <h2
                    id="tc-appointments"
                    className="font-serif-display text-[1.6rem] font-light leading-[1.1] tracking-[-0.02em] text-foreground mb-5 lg:text-[1.9rem]"
                  >
                    Appointments and Communication
                  </h2>
                  <p className="mb-4">
                    Appointment requests submitted through the Website are subject to confirmation and availability.
                  </p>
                  <p className="mb-3">While We make reasonable efforts to respond promptly:</p>
                  <ul className="space-y-2 pl-0 mb-4">
                    {[
                      "Appointment requests are not guaranteed until confirmed.",
                      "Emergency medical situations should not be communicated through the Website, email, or contact forms.",
                    ].map((item) => (
                      <li key={item} className="flex gap-3 items-start">
                        <span
                          className="mt-[0.45em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                          style={{ background: "hsl(var(--primary) / 0.55)" }}
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p>
                    In case of a medical emergency, please contact emergency services or visit the nearest hospital
                    immediately.
                  </p>
                </section>

                <div className="hairline" />

                {/* ── Use of Website ── */}
                <section aria-labelledby="tc-use">
                  <h2
                    id="tc-use"
                    className="font-serif-display text-[1.6rem] font-light leading-[1.1] tracking-[-0.02em] text-foreground mb-5 lg:text-[1.9rem]"
                  >
                    Use of Website
                  </h2>
                  <p className="mb-4">
                    You agree to use this Website only for lawful purposes and in a manner that does not violate
                    applicable laws or regulations.
                  </p>
                  <p className="mb-3">You must not:</p>
                  <ul className="space-y-2 pl-0">
                    {[
                      "Attempt unauthorized access to the Website or servers",
                      "Introduce viruses, malware, or harmful code",
                      "Use the Website for fraudulent or misleading purposes",
                      "Copy, reproduce, or misuse Website content without permission",
                    ].map((item) => (
                      <li key={item} className="flex gap-3 items-start">
                        <span
                          className="mt-[0.45em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                          style={{ background: "hsl(var(--primary) / 0.55)" }}
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <div className="hairline" />

                {/* ── Intellectual Property ── */}
                <section aria-labelledby="tc-ip">
                  <h2
                    id="tc-ip"
                    className="font-serif-display text-[1.6rem] font-light leading-[1.1] tracking-[-0.02em] text-foreground mb-5 lg:text-[1.9rem]"
                  >
                    Intellectual Property Rights
                  </h2>
                  <p className="mb-3">
                    All content available on this Website, including but not limited to:
                  </p>
                  <ul className="space-y-2 pl-0 mb-5">
                    {[
                      "Text",
                      "Graphics",
                      "Logos",
                      "Images",
                      "Videos",
                      "Website design and layout",
                    ].map((item) => (
                      <li key={item} className="flex gap-3 items-start">
                        <span
                          className="mt-[0.45em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                          style={{ background: "hsl(var(--primary) / 0.55)" }}
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mb-4">
                    is the intellectual property of Dr. Swathika Rajendran or licensed content providers and is
                    protected under applicable copyright and intellectual property laws.
                  </p>
                  <p>
                    Unauthorized use, reproduction, or distribution of Website content is prohibited.
                  </p>
                </section>

                <div className="hairline" />

                {/* ── Privacy ── */}
                <section aria-labelledby="tc-privacy">
                  <h2
                    id="tc-privacy"
                    className="font-serif-display text-[1.6rem] font-light leading-[1.1] tracking-[-0.02em] text-foreground mb-5 lg:text-[1.9rem]"
                  >
                    Privacy
                  </h2>
                  <p className="mb-4">
                    Your use of this Website is also governed by Our Privacy Policy, which explains how We collect,
                    use, and protect Your information.
                  </p>
                  <p>
                    By using the Website, You consent to the practices described in the Privacy Policy.
                  </p>
                </section>

                <div className="hairline" />

                {/* ── Third-Party Links ── */}
                <section aria-labelledby="tc-thirdparty">
                  <h2
                    id="tc-thirdparty"
                    className="font-serif-display text-[1.6rem] font-light leading-[1.1] tracking-[-0.02em] text-foreground mb-5 lg:text-[1.9rem]"
                  >
                    Third-Party Links
                  </h2>
                  <p className="mb-4">
                    This Website may contain links to third-party websites for informational purposes.
                  </p>
                  <p className="mb-3">We are not responsible for:</p>
                  <ul className="space-y-2 pl-0 mb-4">
                    {[
                      "The content of external websites",
                      "Privacy practices of third-party websites",
                      "Accuracy or reliability of external information",
                    ].map((item) => (
                      <li key={item} className="flex gap-3 items-start">
                        <span
                          className="mt-[0.45em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                          style={{ background: "hsl(var(--primary) / 0.55)" }}
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p>Accessing third-party links is at Your own discretion and risk.</p>
                </section>

                <div className="hairline" />

                {/* ── Limitation of Liability ── */}
                <section aria-labelledby="tc-liability">
                  <h2
                    id="tc-liability"
                    className="font-serif-display text-[1.6rem] font-light leading-[1.1] tracking-[-0.02em] text-foreground mb-5 lg:text-[1.9rem]"
                  >
                    Limitation of Liability
                  </h2>
                  <p className="mb-3">
                    While We strive to keep the information on this Website accurate and updated, We make no
                    warranties or guarantees regarding:
                  </p>
                  <ul className="space-y-2 pl-0 mb-5">
                    {[
                      "Completeness",
                      "Accuracy",
                      "Reliability",
                      "Availability of Website content",
                    ].map((item) => (
                      <li key={item} className="flex gap-3 items-start">
                        <span
                          className="mt-[0.45em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                          style={{ background: "hsl(var(--primary) / 0.55)" }}
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p>
                    Under no circumstances shall Dr. Swathika Rajendran or associated parties be held liable for
                    any direct, indirect, incidental, or consequential damages arising from the use of this Website.
                  </p>
                </section>

                <div className="hairline" />

                {/* ── Website Availability ── */}
                <section aria-labelledby="tc-availability">
                  <h2
                    id="tc-availability"
                    className="font-serif-display text-[1.6rem] font-light leading-[1.1] tracking-[-0.02em] text-foreground mb-5 lg:text-[1.9rem]"
                  >
                    Website Availability
                  </h2>
                  <p className="mb-4">
                    We reserve the right to modify, suspend, or discontinue any part of the Website without prior
                    notice.
                  </p>
                  <p>
                    We do not guarantee uninterrupted or error-free access to the Website at all times.
                  </p>
                </section>

                <div className="hairline" />

                {/* ── Changes to Terms ── */}
                <section aria-labelledby="tc-changes">
                  <h2
                    id="tc-changes"
                    className="font-serif-display text-[1.6rem] font-light leading-[1.1] tracking-[-0.02em] text-foreground mb-5 lg:text-[1.9rem]"
                  >
                    Changes to Terms &amp; Conditions
                  </h2>
                  <p className="mb-4">
                    We may revise or update these Terms &amp; Conditions periodically.
                  </p>
                  <p>
                    Any updates will be posted on this page with the revised effective date. Continued use of the
                    Website after changes are posted constitutes acceptance of those changes.
                  </p>
                </section>

                <div className="hairline" />

                {/* ── Governing Law ── */}
                <section aria-labelledby="tc-law">
                  <h2
                    id="tc-law"
                    className="font-serif-display text-[1.6rem] font-light leading-[1.1] tracking-[-0.02em] text-foreground mb-5 lg:text-[1.9rem]"
                  >
                    Governing Law
                  </h2>
                  <p className="mb-4">
                    These Terms &amp; Conditions shall be governed and interpreted in accordance with the laws of
                    India and applicable regulations in Tamil Nadu.
                  </p>
                  <p>
                    Any disputes arising from the use of this Website shall be subject to the jurisdiction of the
                    courts located in Tamil Nadu, India.
                  </p>
                </section>

                <div className="hairline" />

                {/* ── Contact Information ── */}
                <section aria-labelledby="tc-contact">
                  <h2
                    id="tc-contact"
                    className="font-serif-display text-[1.6rem] font-light leading-[1.1] tracking-[-0.02em] text-foreground mb-5 lg:text-[1.9rem]"
                  >
                    Contact Information
                  </h2>
                  <p>
                    If You have any questions regarding these Terms &amp; Conditions, You may contact Us through
                    the official contact details provided on the Website.
                  </p>
                </section>

              </div>
            </motion.div>

            {/* Back navigation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 font-sans-body text-sm text-foreground/70 transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Home
              </Link>
              <Link
                to="/privacy-policy"
                className="font-sans-body text-sm text-foreground/70 transition-colors hover:text-foreground link-kinetic"
              >
                Privacy Policy
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
