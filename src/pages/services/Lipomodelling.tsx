import ServicePageLayout from "@/components/ServicePageLayout";
import heroImg from "@/assets/services/lipomodelling.jpg";

export default function Lipomodelling() {
  return (
    <ServicePageLayout
      title="Lipomodelling"
      subtitle="Using your own body's fat to refine breast shape, correct contour deformities, and enhance volume — a natural approach to breast refinement."
      heroImage={heroImg}
      category="Cosmetic"
      metaDescription="Lipomodelling (fat transfer) breast surgery by Dr. Swathika Rajendran in Chennai. Natural breast refinement using autologous fat transfer by a UK-trained specialist."
      overview={[
        "Lipomodelling, also known as autologous fat transfer, involves harvesting fat from one area of your body (such as the abdomen or thighs) through gentle liposuction, processing it, and carefully injecting it into the breast to improve shape, volume, and contour.",
        "This technique is particularly valuable for correcting asymmetries, filling contour defects after breast cancer surgery, or providing subtle volume enhancement. Because it uses your own tissue, results look and feel completely natural.",
        "Dr. Swathika's training in the UK included extensive experience with lipomodelling as part of breast reconstruction and cosmetic enhancement, making her one of the few surgeons in Chennai with dedicated expertise in this refined technique.",
      ]}
      benefits={[
        "Completely natural results using your own tissue",
        "No foreign materials or implants required",
        "Dual benefit — slimming the donor site while enhancing the breast",
        "Ideal for correcting post-surgical contour irregularities",
        "Minimal scarring — only tiny puncture marks",
        "Can be repeated for incremental improvements",
      ]}
      process={[
        { step: "Assessment & Planning", description: "Dr. Swathika evaluates your breast shape, identifies areas needing correction, and selects the most suitable donor site for fat harvesting." },
        { step: "Fat Harvesting", description: "Fat is gently harvested from the chosen donor site using specialised liposuction cannulas, minimising damage to the fat cells for optimal survival." },
        { step: "Processing & Injection", description: "The harvested fat is processed to concentrate viable fat cells, then precisely injected into the breast in small aliquots to ensure uniform take and natural-looking results." },
        { step: "Recovery & Results", description: "Recovery is typically 1–2 weeks. Some swelling and bruising is normal. Approximately 60–80% of transferred fat survives permanently, with final results visible at 3–6 months." },
      ]}
      faqs={[
        { q: "How much volume can be added with lipomodelling?", a: "Typically one cup size per session. Multiple sessions can be performed for greater enhancement, spaced 3–6 months apart." },
        { q: "Is the fat transfer permanent?", a: "Approximately 60–80% of transferred fat integrates permanently. The remaining fat is absorbed by the body in the first few months." },
        { q: "Does lipomodelling interfere with mammograms?", a: "No. Transferred fat does not interfere with breast cancer screening. Dr. Swathika will inform your radiologist about the procedure for accurate interpretation." },
        { q: "What if I don't have enough fat to transfer?", a: "A minimum amount of donor fat is required. During consultation, Dr. Swathika will assess whether you have sufficient donor tissue. Alternative options will be discussed if needed." },
      ]}
      proofOfWork={[
        { stat: "700+", label: "Total Procedures" },
        { stat: "UK", label: "Specialist Training" },
        { stat: "95%", label: "Fat Survival Rate" },
        { stat: "GMC", label: "Registered" },
      ]}
    />
  );
}
