import ServicePageLayout from "@/components/ServicePageLayout";
import heroImg from "@/assets/services/lipomodelling.jpg";

export default function Lipomodelling() {
  return (
    <ServicePageLayout
      contentPrefix="svc_lipo"
      title="Lipomodelling"
      subtitle="Using your own body fat to refine breast shape, correct contour deformities, and enhance volume — a natural approach to breast refinement."
      heroImage={heroImg}
      category="Cosmetic"
      metaDescription="Lipomodelling (fat transfer) breast surgery by Dr. Swathika Rajendran in Chennai. Natural breast refinement using autologous fat transfer by a UK-trained specialist."
      overview={[
        "What is Lipomodelling? Lipomodelling, also known as autologous fat transfer, involves harvesting fat from certain areas of your body preferably abdomen or thighs through gentle liposuction, followed by careful injection into the breast to improve shape, volume, and contour.",
        "This technique is particularly valuable for correcting asymmetries, filling contour defects after breast cancer surgery, or providing subtle volume enhancement by using your own body fat to provide natural results.",
        "Dr. Swathika's training in the UK included extensive experience with lipomodelling as part of breast reconstruction and cosmetic enhancement, making her one of the few surgeons in Chennai with dedicated expertise in this refined technique.",
      ]}
      benefits={[
        "Completely natural results using your own tissue",
        "No foreign materials or implants required",
        "Dual benefit — slimming the donor site while enhancing the breast",
        "Ideal for correcting post-surgical contour irregularities",
        "Minimal scarring — only tiny puncture marks",
      ]}
      process={[
        { step: "Assessment & Planning", description: "Dr. Swathika evaluates your breast shape, identifies areas needing correction, and selects the most suitable donor site for fat harvesting." },
        { step: "Fat Harvesting", description: "Fat is gently harvested from the chosen donor site using specialised liposuction cannulas, minimising damage to the fat cells for optimal survival." },
        { step: "Processing & Injection", description: "The harvested fat is processed to concentrate viable fat cells, then precisely injected into the breast in small aliquots to ensure uniform take and natural-looking results." },
        { step: "Recovery & Results", description: "Recovery is typically 1–2 weeks. Some swelling and bruising is normal. Approximately 60–80% of transferred fat survives permanently, with final results visible at 3–6 months." },
      ]}
      faqs={[]}
      proofOfWork={[
        { stat: "700+", label: "Total Procedures" },
        { stat: "UK", label: "Specialist Training" },
        { stat: "MCh", label: "UK Qualification" },
      ]}
    />
  );
}
