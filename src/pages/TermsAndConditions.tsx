import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Reusable bullet list ─── */
function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3 pl-0">
      {items.map((item) => (
        <li key={item} className="flex gap-4 items-start">
          <span
            className="mt-[0.6em] h-px w-5 flex-shrink-0 opacity-50"
            style={{ background: "hsl(var(--foreground))" }}
            aria-hidden="true"
          />
          <span className="font-sans-body text-[15px] leading-[1.85] text-foreground/75 lg:text-[16px]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ─── Section heading ─── */
function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="font-serif-display text-[1.75rem] font-light leading-[1.1] tracking-[-0.02em] text-foreground lg:text-[2.25rem]"
    >
      {children}
    </h2>
  );
}

/* ─── Sub-label (eyebrow) ─── */
function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans-body text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground mt-8 mb-2">
      {children}
    </p>
  );
}

/* ─── Body paragraph ─── */
function Para({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-sans-body text-[15px] leading-[1.9] text-foreground/75 lg:text-[16px] ${className}`}>
      {children}
    </p>
  );
}

/* ─── Section wrapper with numbered left column ─── */
function Section({ id, number, title, children }: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      aria-labelledby={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.85, ease: EASE }}
      className="grid lg:grid-cols-[200px_minmax(0,1fr)] gap-8 lg:gap-16 py-14 lg:py-16 border-b border-border/50"
    >
      {/* Left column */}
      <div className="flex lg:flex-col items-start gap-5 lg:gap-3 lg:pt-1">
        <span
          className="font-serif-display text-[2.5rem] font-light leading-none tracking-[-0.04em] lg:text-[3rem]"
          style={{ color: "hsl(var(--primary) / 0.18)" }}
          aria-hidden="true"
        >
          {number}
        </span>
        <SectionHeading id={id}>{title}</SectionHeading>
      </div>

      {/* Right column — content */}
      <div className="space-y-4">{children}</div>
    </motion.section>
  );
}

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

        {/* ══════════════════════════════════
            HERO — full-width editorial title
        ══════════════════════════════════ */}
        <section className="relative overflow-hidden">
          {/* Ambient washes */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 gradient-hero opacity-50" />
            <div className="absolute -top-32 left-[-8%] h-[32rem] w-[32rem] rounded-full bg-primary/6 blur-[140px] ambient-float" />
            <div className="absolute bottom-[-15%] right-[-6%] h-[24rem] w-[24rem] rounded-full bg-blush/12 blur-[120px] ambient-float" />
          </div>

          <div className="relative mx-auto max-w-[88rem] px-6 lg:px-10">
            <div className="pt-16 lg:pt-24 pb-10 lg:pb-14">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="font-sans-body text-[10px] font-medium uppercase tracking-[0.5em] text-muted-foreground mb-8"
              >
                Legal Document
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE }}
              >
                <h1
                  className="font-serif-display font-light tracking-[-0.03em] text-foreground leading-[0.96]"
                  style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
                >
                  Terms &amp;
                  <br />
                  <em className="text-gradient-rose not-italic">Conditions</em>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: EASE }}
                className="mt-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 border-b border-border/60 pb-10 lg:pb-14"
              >
                <p className="font-sans-body text-[15px] leading-[1.85] text-foreground/65 max-w-xl lg:text-[16px]">
                  Please read these Terms and Conditions carefully before using this
                  website or booking a consultation. By accessing our services, you
                  agree to be bound by these terms.
                </p>
                <p className="font-sans-body text-[11px] uppercase tracking-[0.35em] text-muted-foreground/70 flex-shrink-0">
                  Dr. Swathika Rajendran
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            CONTENT — open two-column layout
        ══════════════════════════════════ */}
        <div className="mx-auto max-w-[88rem] px-6 lg:px-10">

          {/* ── Intro ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: EASE }}
            className="py-14 lg:py-16 border-b border-border/50 max-w-3xl"
          >
            <Para>
              Welcome to the official website of{" "}
              <strong className="font-medium text-foreground">
                Dr. Swathika Rajendran – Breast Oncoplastic &amp; Reconstructive Surgeon
              </strong>
              . By accessing or using this Website, You agree to comply with and be bound
              by the following Terms &amp; Conditions. Please read them carefully before
              using the Website.
            </Para>
          </motion.div>

          {/* ── 01 — Acceptance of Terms ── */}
          <Section id="tc-acceptance" number="01" title="Acceptance of Terms">
            <Para>
              By accessing this Website, You acknowledge that You have read, understood,
              and agreed to these Terms &amp; Conditions. If You do not agree with any part
              of these terms, please discontinue use of the Website.
            </Para>
          </Section>

          {/* ── 02 — Medical Disclaimer ── */}
          <Section id="tc-medical" number="02" title="Medical Disclaimer">
            <Para>
              The information provided on this Website is intended for general educational
              and informational purposes only and should not be considered medical advice,
              diagnosis, or treatment.
            </Para>
            <Bullets items={[
              "Website content does not replace professional medical consultation.",
              "Always seek advice from a qualified healthcare professional regarding any medical condition or treatment.",
              "Do not ignore or delay medical advice based on information obtained from this Website.",
              "Use of this Website does not establish a doctor-patient relationship between You and Dr. Swathika Rajendran.",
            ]} />
          </Section>

          {/* ── 03 — Appointments and Communication ── */}
          <Section id="tc-appointments" number="03" title="Appointments and Communication">
            <Para>
              Appointment requests submitted through the Website are subject to confirmation
              and availability.
            </Para>
            <Para>While We make reasonable efforts to respond promptly:</Para>
            <Bullets items={[
              "Appointment requests are not guaranteed until confirmed.",
              "Emergency medical situations should not be communicated through the Website, email, or contact forms.",
            ]} />
            <Para className="mt-4">
              In case of a medical emergency, please contact emergency services or visit the
              nearest hospital immediately.
            </Para>
          </Section>

          {/* ── 04 — Use of Website ── */}
          <Section id="tc-use" number="04" title="Use of Website">
            <Para>
              You agree to use this Website only for lawful purposes and in a manner that does
              not violate applicable laws or regulations.
            </Para>
            <Para>You must not:</Para>
            <Bullets items={[
              "Attempt unauthorized access to the Website or servers",
              "Introduce viruses, malware, or harmful code",
              "Use the Website for fraudulent or misleading purposes",
              "Copy, reproduce, or misuse Website content without permission",
            ]} />
          </Section>

          {/* ── 05 — Intellectual Property ── */}
          <Section id="tc-ip" number="05" title="Intellectual Property Rights">
            <Para>All content available on this Website, including but not limited to:</Para>
            <Bullets items={["Text", "Graphics", "Logos", "Images", "Videos", "Website design and layout"]} />
            <Para className="mt-4">
              is the intellectual property of Dr. Swathika Rajendran or licensed content
              providers and is protected under applicable copyright and intellectual property laws.
            </Para>
            <Para>
              Unauthorized use, reproduction, or distribution of Website content is prohibited.
            </Para>
          </Section>

          {/* ── 06 — Privacy ── */}
          <Section id="tc-privacy" number="06" title="Privacy">
            <Para>
              Your use of this Website is also governed by Our Privacy Policy, which explains
              how We collect, use, and protect Your information.
            </Para>
            <Para>
              By using the Website, You consent to the practices described in the Privacy Policy.
            </Para>
          </Section>

          {/* ── 07 — Third-Party Links ── */}
          <Section id="tc-thirdparty" number="07" title="Third-Party Links">
            <Para>
              This Website may contain links to third-party websites for informational purposes.
            </Para>
            <Para>We are not responsible for:</Para>
            <Bullets items={[
              "The content of external websites",
              "Privacy practices of third-party websites",
              "Accuracy or reliability of external information",
            ]} />
            <Para className="mt-4">
              Accessing third-party links is at Your own discretion and risk.
            </Para>
          </Section>

          {/* ── 08 — Limitation of Liability ── */}
          <Section id="tc-liability" number="08" title="Limitation of Liability">
            <Para>
              While We strive to keep the information on this Website accurate and updated,
              We make no warranties or guarantees regarding:
            </Para>
            <Bullets items={["Completeness", "Accuracy", "Reliability", "Availability of Website content"]} />
            <Para className="mt-4">
              Under no circumstances shall Dr. Swathika Rajendran or associated parties be held
              liable for any direct, indirect, incidental, or consequential damages arising from
              the use of this Website.
            </Para>
          </Section>

          {/* ── 09 — Website Availability ── */}
          <Section id="tc-availability" number="09" title="Website Availability">
            <Para>
              We reserve the right to modify, suspend, or discontinue any part of the Website
              without prior notice.
            </Para>
            <Para>
              We do not guarantee uninterrupted or error-free access to the Website at all times.
            </Para>
          </Section>

          {/* ── 10 — Changes to Terms ── */}
          <Section id="tc-changes" number="10" title="Changes to Terms &amp; Conditions">
            <Para>We may revise or update these Terms &amp; Conditions periodically.</Para>
            <Para>
              Any updates will be posted on this page with the revised effective date. Continued
              use of the Website after changes are posted constitutes acceptance of those changes.
            </Para>
          </Section>

          {/* ── 11 — Governing Law ── */}
          <Section id="tc-law" number="11" title="Governing Law">
            <Para>
              These Terms &amp; Conditions shall be governed and interpreted in accordance with
              the laws of India and applicable regulations in Tamil Nadu.
            </Para>
            <Para>
              Any disputes arising from the use of this Website shall be subject to the
              jurisdiction of the courts located in Tamil Nadu, India.
            </Para>
          </Section>

          {/* ── 12 — Contact Information ── */}
          <Section id="tc-contact" number="12" title="Contact Information">
            <Para>
              If You have any questions regarding these Terms &amp; Conditions, You may contact
              Us through the official contact details provided on the Website.
            </Para>
          </Section>

          {/* Bottom spacer */}
          <div className="py-16 lg:py-24" />
        </div>
      </main>

      <Footer />
    </>
  );
}
