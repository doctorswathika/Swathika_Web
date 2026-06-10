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

/* ─── Section wrapper with left-rule ─── */
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

/* ─── Cookie card ─── */
function CookieRow({ name, type, desc }: { name: string; type: string; desc: string }) {
  return (
    <div className="py-5 border-b border-border/40 last:border-0">
      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-2">
        <p className="font-sans-body font-medium text-foreground text-[14px] tracking-[0.01em]">{name}</p>
        <p className="font-sans-body text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{type}</p>
      </div>
      <Para>{desc}</Para>
    </div>
  );
}

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

        {/* ══════════════════════════════════
            HERO — full-width editorial title
        ══════════════════════════════════ */}
        <section className="relative overflow-hidden">
          {/* Ambient washes */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 gradient-hero opacity-50" />
            <div className="absolute -top-32 right-[-8%] h-[32rem] w-[32rem] rounded-full bg-primary/6 blur-[140px] ambient-float" />
            <div className="absolute bottom-[-15%] left-[-6%] h-[24rem] w-[24rem] rounded-full bg-blush/12 blur-[120px] ambient-float" />
          </div>

          <div className="relative mx-auto max-w-[88rem] px-6 lg:px-10">
            {/* Top rule */}
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
                <h1 className="font-serif-display font-light tracking-[-0.03em] text-foreground leading-[0.96]"
                  style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
                >
                  Privacy
                  <br />
                  <em className="text-gradient-rose not-italic">Policy</em>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: EASE }}
                className="mt-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 border-b border-border/60 pb-10 lg:pb-14"
              >

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
              This Privacy Policy describes Our policies and procedures regarding the collection,
              use, and disclosure of Your information when You use the Service. It also explains
              your privacy rights and how the law protects you. By accessing or using the Service,
              you agree to the collection and use of information in accordance with this Privacy Policy.
            </Para>
          </motion.div>

          {/* ── 01 — Interpretation and Definitions ── */}
          <Section id="pp-interp" number="01" title="Interpretation and Definitions">
            <SubLabel>Interpretation</SubLabel>
            <Para>
              Words with capitalized initial letters have meanings defined under the following
              conditions. These definitions shall apply equally whether they appear in singular
              or plural form.
            </Para>

            <SubLabel>Definitions</SubLabel>
            <Para>For the purposes of this Privacy Policy:</Para>

            <div className="mt-6 space-y-0 border-t border-border/40">
              {[
                { term: "Account", def: "means a unique account created for You to access Our Service or parts of the Service." },
                { term: "Affiliate", def: 'means any entity that controls, is controlled by, or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest, or other securities entitled to vote for directors or other managing authority.' },
                { term: 'Company (referred to as "the Company", "We", "Us", or "Our")', def: "refers to Dr. Swathika Rajendran – Breast Oncoplastic & Reconstructive Surgeon." },
                { term: "Cookies", def: "are small files stored on Your computer, mobile device, or other device by a website, containing details of Your browsing history and preferences." },
                { term: "Country", def: "refers to Tamil Nadu, India." },
                { term: "Device", def: "means any device that can access the Service, such as a computer, mobile phone, or tablet." },
                { term: "Personal Data", def: "means any information relating to an identified or identifiable individual." },
                { term: "Service", def: "refers to the Website." },
                { term: "Service Provider", def: "means any natural or legal person who processes data on behalf of the Company, including third-party vendors and partners assisting in operating the Service." },
                { term: "Usage Data", def: "refers to data collected automatically through the use of the Service or from the Service infrastructure itself." },
                { term: "Website", def: "refers to the official website of Dr. Swathika Rajendran – Breast Oncoplastic & Reconstructive Surgeon." },
                { term: "You", def: "means the individual accessing or using the Service, or the company or legal entity on behalf of which such individual is accessing or using the Service." },
              ].map(({ term, def }) => (
                <div key={term} className="py-4 border-b border-border/40 grid sm:grid-cols-[200px_minmax(0,1fr)] gap-2 sm:gap-8">
                  <p className="font-sans-body font-medium text-foreground text-[13.5px] leading-[1.6]">{term}</p>
                  <Para>{def}</Para>
                </div>
              ))}
            </div>
          </Section>

          {/* ── 02 — Collecting and Using Your Personal Data ── */}
          <Section id="pp-collect" number="02" title="Collecting and Using Your Personal Data">
            <SubLabel>Personal Data</SubLabel>
            <Para>
              While using Our Service, We may request certain personally identifiable information
              that can be used to contact or identify You. This may include, but is not limited to:
            </Para>
            <Bullets items={["Email address", "First name and last name", "Phone number", "Appointment-related details"]} />

            <SubLabel>Usage Data</SubLabel>
            <Para>Usage Data is collected automatically while using the Service. This may include information such as:</Para>
            <Bullets items={[
              "Device Internet Protocol (IP) address",
              "Browser type and version",
              "Pages visited on Our Website",
              "Date and time of visits",
              "Time spent on pages",
              "Device identifiers and diagnostic data",
            ]} />
            <Para className="mt-4">When accessing the Service through a mobile device, We may also collect:</Para>
            <Bullets items={[
              "Mobile device type",
              "Unique mobile device ID",
              "Mobile operating system",
              "Mobile browser type",
              "IP address and other diagnostic data",
            ]} />

            <SubLabel>Tracking Technologies and Cookies</SubLabel>
            <Para>
              We use Cookies and similar tracking technologies to monitor activity on Our Service
              and store certain information. Technologies used may include:
            </Para>
            <Bullets items={["Cookies or Browser Cookies", "Web Beacons", "Tags and Scripts"]} />
            <Para className="mt-4">Cookies may be classified as either:</Para>
            <Bullets items={[
              "Session Cookies – deleted once You close Your browser",
              "Persistent Cookies – remain on Your device for a specified period",
            ]} />

            <SubLabel>Types of Cookies We Use</SubLabel>
            <div className="mt-4 border-t border-border/40">
              <CookieRow
                name="Necessary / Essential Cookies"
                type="Session Cookies"
                desc="These Cookies are essential for providing services available through the Website and enabling core functionality."
              />
              <CookieRow
                name="Cookies Policy / Consent Cookies"
                type="Persistent Cookies"
                desc="These Cookies identify whether users have accepted the use of Cookies on the Website."
              />
              <CookieRow
                name="Functionality Cookies"
                type="Persistent Cookies"
                desc="These Cookies allow the Website to remember Your preferences and provide a more personalized experience."
              />
            </div>

            <SubLabel>Use of Your Personal Data</SubLabel>
            <Para>The Company may use Personal Data for the following purposes:</Para>
            <Bullets items={[
              "To provide, maintain, and improve the Service",
              "To manage appointments and user requests",
              "To contact You through email, phone calls, SMS, or other communication methods",
              "To send healthcare-related updates, notifications, or relevant information",
              "To improve website performance, functionality, and user experience",
              "To ensure legal compliance and maintain security",
              "To prevent fraudulent or unauthorized activities",
            ]} />
          </Section>

          {/* ── 03 — Sharing ── */}
          <Section id="pp-sharing" number="03" title="Sharing of Your Personal Information">
            <Para>We may share Your personal information under the following circumstances:</Para>
            <Bullets items={[
              "With Service Providers assisting in operating the Website or Service",
              "With Affiliates and business partners",
              "During mergers, acquisitions, or business transfers",
              "When required by law or legal authorities",
              "With Your consent",
            ]} />
          </Section>

          {/* ── 04 — Retention ── */}
          <Section id="pp-retention" number="04" title="Retention of Your Personal Data">
            <Para>
              The Company will retain Your Personal Data only for as long as necessary for the
              purposes outlined in this Privacy Policy and to comply with legal obligations.
            </Para>
            <Para>
              Usage Data is generally retained for a shorter duration unless required for
              security, analytics, or legal purposes.
            </Para>
          </Section>

          {/* ── 05 — Transfer ── */}
          <Section id="pp-transfer" number="05" title="Transfer of Your Personal Data">
            <Para>
              Your information may be processed at the Company's operating offices or other
              locations where parties involved in data processing are situated.
            </Para>
            <Para>
              By using the Service and submitting Your information, You consent to such transfers.
            </Para>
            <Para>
              We take all reasonable measures to ensure that Your data is handled securely and
              in accordance with this Privacy Policy.
            </Para>
          </Section>

          {/* ── 06 — Your Rights ── */}
          <Section id="pp-rights" number="06" title="Your Rights Regarding Personal Data">
            <Para>You have the right to:</Para>
            <Bullets items={[
              "Access Your Personal Data",
              "Correct inaccurate or incomplete information",
              "Request deletion of Your Personal Data",
              "Withdraw consent where applicable",
            ]} />
            <Para className="mt-4">To exercise these rights, You may contact Us directly.</Para>
            <Para>
              Please note that certain information may be retained if required by law or for
              legitimate business purposes.
            </Para>
          </Section>

          {/* ── 07 — Disclosure ── */}
          <Section id="pp-disclosure" number="07" title="Disclosure of Your Personal Data">
            <SubLabel>Business Transactions</SubLabel>
            <Para>
              If the Company undergoes a merger, acquisition, or asset sale, Your Personal Data
              may be transferred as part of that transaction.
            </Para>

            <SubLabel>Law Enforcement</SubLabel>
            <Para>
              The Company may disclose Your Personal Data when required to do so by law or in
              response to valid legal requests.
            </Para>

            <SubLabel>Other Legal Requirements</SubLabel>
            <Para>The Company may disclose Your Personal Data to:</Para>
            <Bullets items={[
              "Comply with legal obligations",
              "Protect and defend Company rights or property",
              "Prevent or investigate wrongdoing",
              "Protect the safety of users and the public",
              "Protect against legal liability",
            ]} />
          </Section>

          {/* ── 08 — Security ── */}
          <Section id="pp-security" number="08" title="Security of Your Personal Data">
            <Para>
              Protecting Your Personal Data is important to Us. We implement commercially
              reasonable security measures to safeguard Your information.
            </Para>
            <Para>
              However, no method of electronic storage or Internet transmission is completely
              secure, and absolute security cannot be guaranteed.
            </Para>
          </Section>

          {/* ── 09 — Children's Privacy ── */}
          <Section id="pp-children" number="09" title="Children's Privacy">
            <Para>Our Service is not intended for individuals under the age of 13.</Para>
            <Para>
              We do not knowingly collect personally identifiable information from children
              under 13. If such information is identified, We will take appropriate steps to
              remove it promptly.
            </Para>
          </Section>

          {/* ── 10 — Third-Party Links ── */}
          <Section id="pp-thirdparty" number="10" title="Links to Third-Party Websites">
            <Para>Our Service may contain links to external websites not operated by Us.</Para>
            <Para>
              We are not responsible for the content, privacy practices, or policies of
              third-party websites and encourage You to review their respective Privacy Policies.
            </Para>
          </Section>

          {/* ── 11 — Changes ── */}
          <Section id="pp-changes" number="11" title="Changes to This Privacy Policy">
            <Para>We may update this Privacy Policy periodically.</Para>
            <Para>Any changes will be posted on this page along with the updated revision date.</Para>
            <Para>
              You are encouraged to review this Privacy Policy regularly to stay informed about
              how we protect your information.
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
