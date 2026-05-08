import ServicePageLayout from "@/components/ServicePageLayout";
import heroImg from "@/assets/services/oncoplastic.jpg";

export default function BreastConservingOncoplastic() {
  return (
    <ServicePageLayout
      contentPrefix="svc_bco"
      title="Breast Conserving & Oncoplastic Surgery"
      subtitle="Precise tumour removal combines oncological safety with cosmetic excellence, reshaping the breast for the best possible outcome."
      heroImage={heroImg}
      category="Clinical"
      metaDescription="Breast conserving and oncoplastic surgery by Dr. Swathika Rajendran in Chennai. UK-trained specialist combining lumpectomy with aesthetic reshaping for superior oncological and cosmetic results."
      overview={[
        "This is one of Dr. Swathika's key areas of expertise – removing the tumour while preserving the shape of the breast, using volume displacement or volume replacement techniques (as needed). This approach is supported by specialised training in Breast Oncoplastic & Reconstructive Surgery and extensive exposure to a high volume of advanced breast conservation procedures.",
        "Studies consistently show that breast-conserving surgery (BCS) combined with radiation therapy provides survival outcomes equivalent to mastectomy in appropriately selected patients.",
      ]}
      benefits={[
        "Superior cosmetic results compared to standard mastectomy",
        "Avoid unnecessary removal of breast when feasible and preserve symmetry",
      ]}
      process={[
        { step: "Technique selection", description: "Dr. Swathika plans the most appropriate oncoplastic approach – from simple tissue rearrangement to more complex reshaping – ensuring safe tumour removal with the best cosmetic outcome possible." },
        { step: "The Surgery", description: "Performed under general anaesthesia, typically taking 1–3 hours. The tumour is removed with a surrounding margin of healthy tissue, and the breast is actively reshaped. Sentinel node biopsy or axillary dissection is often performed simultaneously." },
        { step: "Post-operative Care", description: "Most patients go home the next day. Radiation therapy is typically recommended afterwards. Regular follow-up ensures optimal healing, oncological safety, and aesthetic satisfaction." },
      ]}
      faqs={[]}
      proofOfWork={[
        { stat: "700+", label: "Total Procedures" },
        { stat: "MCh", label: "UK Qualification" },
        { stat: "UK", label: "Certified Professional" },
      ]}
    />
  );
}
