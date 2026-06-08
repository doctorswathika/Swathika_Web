import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Dr. Swathika Rajendran — Breast Surgeon Chennai</title>
        <meta
          name="description"
          content="Read the Privacy Policy for Dr. Swathika Rajendran's website. Understand how we collect, use, and protect your personal information."
        />
        <link rel="canonical" href="https://drswathikarajendran.com/privacy-policy" />
        <meta property="og:title" content="Privacy Policy | Dr. Swathika Rajendran" />
        <meta
          property="og:description"
          content="Privacy Policy for drswathikarajendran.com — learn how your personal information is handled."
        />
        <meta property="og:url" content="https://drswathikarajendran.com/privacy-policy" />
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
            <div className="absolute -top-24 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-primary/8 blur-[130px] ambient-float" />
            <div className="absolute bottom-[-20%] left-[-8%] h-[20rem] w-[20rem] rounded-full bg-blush/15 blur-[120px] ambient-float" />
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
                Privacy{" "}
                <em className="text-gradient-rose">Policy</em>
              </h1>

              <div className="hairline max-w-xl" />

              <p className="font-sans-body text-[15px] leading-[1.9] text-foreground/70 sm:text-base lg:text-[17px] max-w-2xl">
                This page explains how we collect, use, store, and protect the personal information you share with us when you visit this website or book a consultation.
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
               *  Privacy Policy legal text when it is ready. The container is
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
                  This Privacy Policy describes Our policies and procedures regarding the collection, use, and
                  disclosure of Your information when You use the Service. It also explains your privacy rights and
                  how the law protects you. By accessing or using the Service, you agree to the collection and use
                  of information in accordance with this Privacy Policy.
                </p>

                <div className="hairline" />

                {/* ── Interpretation and Definitions ── */}
                <section aria-labelledby="pp-interp">
                  <h2
                    id="pp-interp"
                    className="font-serif-display text-[1.6rem] font-light leading-[1.1] tracking-[-0.02em] text-foreground mb-5 lg:text-[1.9rem]"
                  >
                    Interpretation and Definitions
                  </h2>

                  <h3 className="font-sans-body text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-3">
                    Interpretation
                  </h3>
                  <p>
                    Words with capitalized initial letters have meanings defined under the following conditions.
                    These definitions shall apply equally whether they appear in singular or plural form.
                  </p>

                  <h3 className="font-sans-body text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground mt-7 mb-3">
                    Definitions
                  </h3>
                  <p className="mb-4">For the purposes of this Privacy Policy:</p>
                  <ul className="space-y-3 pl-0">
                    {[
                      {
                        term: "Account",
                        def: "means a unique account created for You to access Our Service or parts of the Service.",
                      },
                      {
                        term: "Affiliate",
                        def: 'means any entity that controls, is controlled by, or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest, or other securities entitled to vote for directors or other managing authority.',
                      },
                      {
                        term: 'Company (referred to as "the Company", "We", "Us", or "Our" in this Agreement)',
                        def: "refers to Dr. Swathika Rajendran – Breast Oncoplastic & Reconstructive Surgeon.",
                      },
                      {
                        term: "Cookies",
                        def: "are small files stored on Your computer, mobile device, or other device by a website, containing details of Your browsing history and preferences.",
                      },
                      { term: "Country", def: "refers to Tamil Nadu, India." },
                      {
                        term: "Device",
                        def: "means any device that can access the Service, such as a computer, mobile phone, or tablet.",
                      },
                      {
                        term: "Personal Data",
                        def: "means any information relating to an identified or identifiable individual.",
                      },
                      { term: "Service", def: "refers to the Website." },
                      {
                        term: "Service Provider",
                        def: "means any natural or legal person who processes data on behalf of the Company, including third-party vendors and partners assisting in operating the Service.",
                      },
                      {
                        term: "Usage Data",
                        def: "refers to data collected automatically through the use of the Service or from the Service infrastructure itself.",
                      },
                      {
                        term: "Website",
                        def: "refers to the official website of Dr. Swathika Rajendran – Breast Oncoplastic & Reconstructive Surgeon.",
                      },
                      {
                        term: "You",
                        def: "means the individual accessing or using the Service, or the company or legal entity on behalf of which such individual is accessing or using the Service.",
                      },
                    ].map(({ term, def }) => (
                      <li key={term} className="flex gap-3 items-start">
                        <span
                          className="mt-[0.45em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                          style={{ background: "hsl(var(--primary) / 0.55)" }}
                          aria-hidden="true"
                        />
                        <span>
                          <strong className="font-medium text-foreground">{term}</strong> {def}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>

                <div className="hairline" />

                {/* ── Collecting and Using Personal Data ── */}
                <section aria-labelledby="pp-collect">
                  <h2
                    id="pp-collect"
                    className="font-serif-display text-[1.6rem] font-light leading-[1.1] tracking-[-0.02em] text-foreground mb-5 lg:text-[1.9rem]"
                  >
                    Collecting and Using Your Personal Data
                  </h2>

                  {/* Types */}
                  <h3 className="font-sans-body text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-3">
                    Types of Data Collected
                  </h3>

                  <h4 className="font-sans-body font-medium text-foreground mb-2">Personal Data</h4>
                  <p className="mb-3">
                    While using Our Service, We may request certain personally identifiable information that can be
                    used to contact or identify You. This may include, but is not limited to:
                  </p>
                  <ul className="space-y-2 pl-0 mb-6">
                    {[
                      "Email address",
                      "First name and last name",
                      "Phone number",
                      "Appointment-related details",
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

                  <h4 className="font-sans-body font-medium text-foreground mb-2">Usage Data</h4>
                  <p className="mb-3">Usage Data is collected automatically while using the Service.</p>
                  <p className="mb-3">This may include information such as:</p>
                  <ul className="space-y-2 pl-0 mb-4">
                    {[
                      "Device Internet Protocol (IP) address",
                      "Browser type and version",
                      "Pages visited on Our Website",
                      "Date and time of visits",
                      "Time spent on pages",
                      "Device identifiers and diagnostic data",
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
                  <p className="mb-3">
                    When accessing the Service through a mobile device, We may also collect:
                  </p>
                  <ul className="space-y-2 pl-0 mb-6">
                    {[
                      "Mobile device type",
                      "Unique mobile device ID",
                      "Mobile operating system",
                      "Mobile browser type",
                      "IP address and other diagnostic data",
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

                  {/* Tracking */}
                  <h3 className="font-sans-body text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-3 mt-7">
                    Tracking Technologies and Cookies
                  </h3>
                  <p className="mb-3">
                    We use Cookies and similar tracking technologies to monitor activity on Our Service and store
                    certain information.
                  </p>
                  <p className="mb-2">Technologies used may include:</p>
                  <ul className="space-y-2 pl-0 mb-4">
                    {["Cookies or Browser Cookies", "Web Beacons", "Tags and Scripts"].map((item) => (
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
                  <p className="mb-2">Cookies may be classified as either:</p>
                  <ul className="space-y-2 pl-0 mb-6">
                    <li className="flex gap-3 items-start">
                      <span
                        className="mt-[0.45em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                        style={{ background: "hsl(var(--primary) / 0.55)" }}
                        aria-hidden="true"
                      />
                      <span>
                        <strong className="font-medium text-foreground">Session Cookies</strong> – deleted once
                        You close Your browser
                      </span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <span
                        className="mt-[0.45em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                        style={{ background: "hsl(var(--primary) / 0.55)" }}
                        aria-hidden="true"
                      />
                      <span>
                        <strong className="font-medium text-foreground">Persistent Cookies</strong> – remain on
                        Your device for a specified period
                      </span>
                    </li>
                  </ul>

                  {/* Cookie types */}
                  <h4 className="font-sans-body font-medium text-foreground mb-4">Types of Cookies We Use</h4>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Necessary / Essential Cookies",
                        type: "Session Cookies",
                        by: "Us",
                        desc: "These Cookies are essential for providing services available through the Website and enabling core functionality.",
                      },
                      {
                        name: "Cookies Policy / Consent Cookies",
                        type: "Persistent Cookies",
                        by: "Us",
                        desc: "These Cookies identify whether users have accepted the use of Cookies on the Website.",
                      },
                      {
                        name: "Functionality Cookies",
                        type: "Persistent Cookies",
                        by: "Us",
                        desc: "These Cookies allow the Website to remember Your preferences and provide a more personalized experience.",
                      },
                    ].map((cookie) => (
                      <div
                        key={cookie.name}
                        className="rounded-[16px] border border-border/60 bg-card/50 px-5 py-4 space-y-1"
                      >
                        <p className="font-medium text-foreground text-[14px]">{cookie.name}</p>
                        <p className="text-[13px] text-muted-foreground">
                          <span className="font-medium text-foreground/70">Type:</span> {cookie.type}
                        </p>
                        <p className="text-[13px] text-muted-foreground">
                          <span className="font-medium text-foreground/70">Administered by:</span> {cookie.by}
                        </p>
                        <p className="text-[13px] leading-[1.75]">{cookie.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Use of data */}
                  <h3 className="font-sans-body text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-3 mt-8">
                    Use of Your Personal Data
                  </h3>
                  <p className="mb-3">
                    The Company may use Personal Data for the following purposes:
                  </p>
                  <ul className="space-y-2 pl-0">
                    {[
                      "To provide, maintain, and improve the Service",
                      "To manage appointments and user requests",
                      "To contact You through email, phone calls, SMS, or other communication methods",
                      "To send healthcare-related updates, notifications, or relevant information",
                      "To improve website performance, functionality, and user experience",
                      "To ensure legal compliance and maintain security",
                      "To prevent fraudulent or unauthorized activities",
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

                {/* ── Sharing ── */}
                <section aria-labelledby="pp-sharing">
                  <h2
                    id="pp-sharing"
                    className="font-serif-display text-[1.6rem] font-light leading-[1.1] tracking-[-0.02em] text-foreground mb-5 lg:text-[1.9rem]"
                  >
                    Sharing of Your Personal Information
                  </h2>
                  <p className="mb-3">
                    We may share Your personal information under the following circumstances:
                  </p>
                  <ul className="space-y-2 pl-0">
                    {[
                      "With Service Providers assisting in operating the Website or Service",
                      "With Affiliates and business partners",
                      "During mergers, acquisitions, or business transfers",
                      "When required by law or legal authorities",
                      "With Your consent",
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

                {/* ── Retention ── */}
                <section aria-labelledby="pp-retention">
                  <h2
                    id="pp-retention"
                    className="font-serif-display text-[1.6rem] font-light leading-[1.1] tracking-[-0.02em] text-foreground mb-5 lg:text-[1.9rem]"
                  >
                    Retention of Your Personal Data
                  </h2>
                  <p>
                    The Company will retain Your Personal Data only for as long as necessary for the purposes
                    outlined in this Privacy Policy and to comply with legal obligations.
                  </p>
                  <p className="mt-4">
                    Usage Data is generally retained for a shorter duration unless required for security,
                    analytics, or legal purposes.
                  </p>
                </section>

                <div className="hairline" />

                {/* ── Transfer ── */}
                <section aria-labelledby="pp-transfer">
                  <h2
                    id="pp-transfer"
                    className="font-serif-display text-[1.6rem] font-light leading-[1.1] tracking-[-0.02em] text-foreground mb-5 lg:text-[1.9rem]"
                  >
                    Transfer of Your Personal Data
                  </h2>
                  <p>
                    Your information may be processed at the Company's operating offices or other locations where
                    parties involved in data processing are situated.
                  </p>
                  <p className="mt-4">
                    By using the Service and submitting Your information, You consent to such transfers.
                  </p>
                  <p className="mt-4">
                    We take all reasonable measures to ensure that Your data is handled securely and in accordance
                    with this Privacy Policy.
                  </p>
                </section>

                <div className="hairline" />

                {/* ── Your Rights ── */}
                <section aria-labelledby="pp-rights">
                  <h2
                    id="pp-rights"
                    className="font-serif-display text-[1.6rem] font-light leading-[1.1] tracking-[-0.02em] text-foreground mb-5 lg:text-[1.9rem]"
                  >
                    Your Rights Regarding Personal Data
                  </h2>
                  <p className="mb-3">You have the right to:</p>
                  <ul className="space-y-2 pl-0 mb-4">
                    {[
                      "Access Your Personal Data",
                      "Correct inaccurate or incomplete information",
                      "Request deletion of Your Personal Data",
                      "Withdraw consent where applicable",
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
                    To exercise these rights, You may contact Us directly.
                  </p>
                  <p className="mt-4">
                    Please note that certain information may be retained if required by law or for legitimate
                    business purposes.
                  </p>
                </section>

                <div className="hairline" />

                {/* ── Disclosure ── */}
                <section aria-labelledby="pp-disclosure">
                  <h2
                    id="pp-disclosure"
                    className="font-serif-display text-[1.6rem] font-light leading-[1.1] tracking-[-0.02em] text-foreground mb-5 lg:text-[1.9rem]"
                  >
                    Disclosure of Your Personal Data
                  </h2>

                  <h3 className="font-sans-body text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-2">
                    Business Transactions
                  </h3>
                  <p className="mb-6">
                    If the Company undergoes a merger, acquisition, or asset sale, Your Personal Data may be
                    transferred as part of that transaction.
                  </p>

                  <h3 className="font-sans-body text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-2">
                    Law Enforcement
                  </h3>
                  <p className="mb-6">
                    The Company may disclose Your Personal Data when required to do so by law or in response to
                    valid legal requests.
                  </p>

                  <h3 className="font-sans-body text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-2">
                    Other Legal Requirements
                  </h3>
                  <p className="mb-3">The Company may disclose Your Personal Data to:</p>
                  <ul className="space-y-2 pl-0">
                    {[
                      "Comply with legal obligations",
                      "Protect and defend Company rights or property",
                      "Prevent or investigate wrongdoing",
                      "Protect the safety of users and the public",
                      "Protect against legal liability",
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

                {/* ── Security ── */}
                <section aria-labelledby="pp-security">
                  <h2
                    id="pp-security"
                    className="font-serif-display text-[1.6rem] font-light leading-[1.1] tracking-[-0.02em] text-foreground mb-5 lg:text-[1.9rem]"
                  >
                    Security of Your Personal Data
                  </h2>
                  <p>
                    Protecting Your Personal Data is important to Us. We implement commercially reasonable security
                    measures to safeguard Your information.
                  </p>
                  <p className="mt-4">
                    However, no method of electronic storage or Internet transmission is completely secure, and
                    absolute security cannot be guaranteed.
                  </p>
                </section>

                <div className="hairline" />

                {/* ── Children's Privacy ── */}
                <section aria-labelledby="pp-children">
                  <h2
                    id="pp-children"
                    className="font-serif-display text-[1.6rem] font-light leading-[1.1] tracking-[-0.02em] text-foreground mb-5 lg:text-[1.9rem]"
                  >
                    Children's Privacy
                  </h2>
                  <p>
                    Our Service is not intended for individuals under the age of 13.
                  </p>
                  <p className="mt-4">
                    We do not knowingly collect personally identifiable information from children under 13. If such
                    information is identified, We will take appropriate steps to remove it promptly.
                  </p>
                </section>

                <div className="hairline" />

                {/* ── Third-Party Links ── */}
                <section aria-labelledby="pp-thirdparty">
                  <h2
                    id="pp-thirdparty"
                    className="font-serif-display text-[1.6rem] font-light leading-[1.1] tracking-[-0.02em] text-foreground mb-5 lg:text-[1.9rem]"
                  >
                    Links to Third-Party Websites
                  </h2>
                  <p>
                    Our Service may contain links to external websites not operated by Us.
                  </p>
                  <p className="mt-4">
                    We are not responsible for the content, privacy practices, or policies of third-party websites
                    and encourage You to review their respective Privacy Policies.
                  </p>
                </section>

                <div className="hairline" />

                {/* ── Changes ── */}
                <section aria-labelledby="pp-changes">
                  <h2
                    id="pp-changes"
                    className="font-serif-display text-[1.6rem] font-light leading-[1.1] tracking-[-0.02em] text-foreground mb-5 lg:text-[1.9rem]"
                  >
                    Changes to This Privacy Policy
                  </h2>
                  <p>
                    We may update this Privacy Policy periodically.
                  </p>
                  <p className="mt-4">
                    Any changes will be posted on this page along with the updated revision date.
                  </p>
                  <p className="mt-4">
                    You are encouraged to review this Privacy Policy regularly to stay informed about how we
                    protect your information.
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
                to="/terms-and-conditions"
                className="font-sans-body text-sm text-foreground/70 transition-colors hover:text-foreground link-kinetic"
              >
                Terms &amp; Conditions
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
