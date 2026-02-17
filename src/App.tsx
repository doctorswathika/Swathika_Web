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
import SentinelNodeBiopsy from "./pages/services/SentinelNodeBiopsy";
import OncoplasticSurgery from "./pages/services/OncoplasticSurgery";
import BreastReductionAugmentation from "./pages/services/BreastReductionAugmentation";
import Lipomodelling from "./pages/services/Lipomodelling";
import ImplantReconstruction from "./pages/services/ImplantReconstruction";
import GynaecomastiaCorrection from "./pages/services/GynaecomastiaCorrection";

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
            <Route path="/services/breast-conserving-surgery" element={<BreastConservingSurgery />} />
            <Route path="/services/sentinel-node-biopsy" element={<SentinelNodeBiopsy />} />
            <Route path="/services/oncoplastic-surgery" element={<OncoplasticSurgery />} />
            <Route path="/services/breast-reduction-augmentation" element={<BreastReductionAugmentation />} />
            <Route path="/services/lipomodelling" element={<Lipomodelling />} />
            <Route path="/services/implant-reconstruction" element={<ImplantReconstruction />} />
            <Route path="/services/gynaecomastia-correction" element={<GynaecomastiaCorrection />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
