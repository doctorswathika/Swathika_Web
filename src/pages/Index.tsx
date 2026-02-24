import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import AwarenessSection from "@/components/AwarenessSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GoogleReviewsSection from "@/components/GoogleReviewsSection";
import BookConsultationCTA from "@/components/BookConsultationCTA";
import BlogSection from "@/components/BlogSection";
import InstaSection from "@/components/InstaSection";
import YoutubeSection from "@/components/YoutubeSection";
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
  sameAs: ["https://www.linkedin.com/in/swathika-rajendran-38253b165/"],
};

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Dr. Swathika Rajendran — UK Trained Breast Oncoplastic Surgeon | Chennai</title>
        <meta name="description" content="Dr. Swathika Rajendran is a UK-trained Breast Oncoplastic & Reconstructive Surgeon in Chennai with 700+ procedures. Expert in breast cancer surgery, reconstruction, and aesthetic breast surgery." />
        <meta name="keywords" content="Best Breast Surgeon in Chennai, UK Trained Oncoplastic Surgeon India, Breast Reconstruction Specialist Chennai, Breast Cancer Surgeon Chennai, Oncoplastic Breast Surgery" />
        <link rel="canonical" href="https://drswathika.com" />
        <meta property="og:title" content="Dr. Swathika Rajendran — UK Trained Breast Oncoplastic Surgeon" />
        <meta property="og:description" content="Advanced Breast Surgery with Precision & Compassion. 700+ Procedures. UK Trained." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <AwarenessSection />
        <TestimonialsSection />
        <GoogleReviewsSection />
        <BookConsultationCTA />
        <BlogSection />
        <InstaSection />
        <YoutubeSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
