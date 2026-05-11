import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import AwarenessSection from "@/components/AwarenessSection";
import ServicesSection from "@/components/ServicesSection";
import GoogleReviewsSection from "@/components/GoogleReviewsSection";
import BookConsultationCTA from "@/components/BookConsultationCTA";
import BlogSection from "@/components/BlogSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Physician",
      "@id": "https://drswathika.com/#physician",
      name: "Dr. Swathika Rajendran",
      alternateName: "Dr Swathika Rajendran",
      description:
        "UK Trained Breast Oncoplastic & Reconstructive Surgeon based in Chennai, India. 700+ procedures in breast cancer surgery, reconstruction & aesthetic breast surgery.",
      medicalSpecialty: ["Breast Surgery", "Oncoplastic Surgery", "Breast Reconstruction", "Surgical Oncology"],
      image: "https://drswathika.com/images/dr-swathika.jpeg",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
      areaServed: { "@type": "City", name: "Chennai" },
      knowsAbout: [
        "Breast Cancer Surgery",
        "Oncoplastic Breast Surgery",
        "Breast Reconstruction",
        "Mastectomy",
        "Breast Conserving Surgery",
        "Sentinel Node Biopsy",
        "Lipomodelling",
        "Implant Reconstruction",
      ],
      url: "https://drswathika.com",
      sameAs: [
        "https://www.linkedin.com/in/swathika-rajendran-2861aa364",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://drswathika.com/#website",
      url: "https://drswathika.com",
      name: "Dr. Swathika Rajendran — Best Breast Surgeon in Chennai",
      inLanguage: "en",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://drswathika.com/blog?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Dr. Swathika Rajendran — UK Trained Oncoplastic Surgeon | Best Breast Surgeon in Chennai</title>
        <meta
          name="description"
          content="Best Breast Surgeon in Chennai — Dr. Swathika Rajendran, UK-trained Breast Oncoplastic & Reconstructive Surgeon with 700+ surgeries. Expert in breast cancer surgery, reconstruction, and aesthetic breast surgery."
        />
        <meta
          name="keywords"
          content="Best Breast Surgeon in Chennai, Top Breast Surgeon Chennai, Breast Cancer Surgeon Chennai, UK Trained Oncoplastic Surgeon India, Breast Reconstruction Specialist Chennai, Oncoplastic Breast Surgery Chennai, Female Breast Surgeon Chennai, Dr Swathika Rajendran"
        />
        <link rel="canonical" href="https://drswathika.com" />
        <meta property="og:title" content="Best Breast Surgeon in Chennai | Dr. Swathika Rajendran" />
        <meta
          property="og:description"
          content="Best Breast Surgeon in Chennai. UK-trained Breast Oncoplastic & Reconstructive Surgeon. 700+ Procedures. Precision, compassion & world-class care."
        />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <AwarenessSection />
        <GoogleReviewsSection />
        <BookConsultationCTA />
        <BlogSection />
        <SocialMediaSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
