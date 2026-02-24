import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import About from "./pages/About";
import BookConsultation from "./pages/BookConsultation";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Mastectomy from "./pages/services/Mastectomy";
import BreastConservingSurgery from "./pages/services/BreastConservingSurgery";
import BreastConservingOncoplastic from "./pages/services/BreastConservingOncoplastic";
import SentinelNodeBiopsy from "./pages/services/SentinelNodeBiopsy";
import OncoplasticSurgery from "./pages/services/OncoplasticSurgery";
import AxillaryNode from "./pages/services/AxillaryNode";
import BreastReductionAugmentation from "./pages/services/BreastReductionAugmentation";
import Lipomodelling from "./pages/services/Lipomodelling";
import ImplantReconstruction from "./pages/services/ImplantReconstruction";
import GynaecomastiaCorrection from "./pages/services/GynaecomastiaCorrection";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminApiKeys from "./pages/admin/AdminApiKeys";
import AdminContent from "./pages/admin/AdminContent";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminGoogleReviews from "./pages/admin/AdminGoogleReviews";
import Blog from "./pages/Blog";
import BlogPostPage from "./pages/BlogPost";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/book-consultation" element={<BookConsultation />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/about" element={<About />} />
            <Route path="/services/mastectomy" element={<Mastectomy />} />
            <Route path="/services/breast-conserving-oncoplastic" element={<BreastConservingOncoplastic />} />
            {/* Legacy routes — redirect to combined page */}
            <Route path="/services/breast-conserving-surgery" element={<BreastConservingOncoplastic />} />
            <Route path="/services/oncoplastic-surgery" element={<BreastConservingOncoplastic />} />
            <Route path="/services/sentinel-node-biopsy" element={<SentinelNodeBiopsy />} />
            <Route path="/services/axillary-node" element={<AxillaryNode />} />
            <Route path="/services/breast-reduction-augmentation" element={<BreastReductionAugmentation />} />
            <Route path="/services/lipomodelling" element={<Lipomodelling />} />
            <Route path="/services/implant-reconstruction" element={<ImplantReconstruction />} />
            <Route path="/services/gynaecomastia-correction" element={<GynaecomastiaCorrection />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            {/* Admin Portal */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="api-keys" element={<AdminApiKeys />} />
              <Route path="content" element={<AdminContent />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="google-reviews" element={<AdminGoogleReviews />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="analytics" element={<AdminAnalytics />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
