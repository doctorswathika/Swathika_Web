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
  "@type": "Physician",
  name: "Dr. Swathika Rajendran",
  description: "UK Trained Breast Oncoplastic & Reconstructive Surgeon based in Chennai, India.",
  medicalSpecialty: "Breast Oncoplastic & Reconstructive Surgery",
  image: "/images/dr-swathika.jpeg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  url: "https://drswathika.com",
  sameAs: ["https://www.linkedin.com/in/swathika-rajendran-2861aa364?utm_source=share_via&utm_content=profile&utm_medium=member_android"],
};

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Best Breast Surgeon in Chennai | Dr. Swathika Rajendran — UK Trained Oncoplastic Surgeon</title>
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
