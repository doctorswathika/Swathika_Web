import ServicePageLayout from "@/components/ServicePageLayout";
import heroImg from "@/assets/services/oncoplastic.jpg";

export default function BreastConservingOncoplastic() {
  return (
    <ServicePageLayout
      contentPrefix="svc_bco"
      title="Breast Conserving & Oncoplastic Surgery"
      subtitle="Precise tumour removal combining oncological safety with cosmetic excellence for breast reshaping to give the best possible outcome."
      heroImage={heroImg}
      category="Clinical"
      metaDescription="Breast conserving and oncoplastic surgery by Dr. Swathika Rajendran in Chennai. UK-trained specialist combining lumpectomy with aesthetic reshaping for superior oncological and cosmetic results."
      overview={[
        "This is one of Dr. Swathika's area of expertise — to remove tumours while maintaining the breast's appearance, using volume displacement or volume replacement techniques.",
        "Dr. Swathika Rajendran holds a specialised MCh in Breast Oncoplastic & Reconstructive Surgery from the UK — one of the few surgeons in India with this level of dedicated training that has shaped her expertise in this area due to the high volume of breast conservation procedures done in the western world.",
        "Studies consistently show that BCS combined with radiation therapy provides survival outcomes equivalent to mastectomy for appropriately selected patients.",
      ]}
      benefits={[
        "Superior cosmetic results compared to standard mastectomy",
        "Avoid unnecessary removal of breast when feasible and preserve symmetry",
      ]}
      process={[
        { step: "Technique Selection", description: "Dr. Swathika plans the most appropriate oncoplastic approach — ranging from simple tissue rearrangement to complex reshaping — ensuring tumour removal with the best cosmetic outcome possible." },
        { step: "The Surgery", description: "Performed under general anaesthesia, typically taking 1–3 hours. The tumour is removed with a surrounding margin of healthy tissue, and the breast is actively reshaped. Sentinel node biopsy or axillary dissection is often performed simultaneously." },
        { step: "Post-operative Care", description: "Most patients go home the next day. Radiation therapy is typically recommended afterwards. Regular follow-up ensures optimal healing, oncological safety, and aesthetic satisfaction." },
      ]}
      faqs={[
        { q: "What is the difference between breast conserving and oncoplastic surgery?", a: "Breast conserving surgery removes the tumour while preserving the breast. Oncoplastic surgery adds plastic surgery reshaping techniques on top of this, resulting in a better cosmetic appearance without compromising cancer treatment." },
        { q: "Will my breast look different after surgery?", a: "With oncoplastic techniques, Dr. Swathika aims to reshape the remaining tissue to maintain a natural, symmetrical appearance. Most patients are very satisfied with the cosmetic outcome. Expectations must be realistic as oncological safety takes priority." },
      ]}
      proofOfWork={[
        { stat: "700+", label: "Total Procedures" },
        { stat: "98%", label: "Clear Margins Rate" },
        { stat: "MCh", label: "UK Qualification" },
        { stat: "GMC", label: "Registered" },
      ]}
    />
  );
}
