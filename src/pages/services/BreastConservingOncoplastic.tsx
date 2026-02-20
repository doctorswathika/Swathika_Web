import ServicePageLayout from "@/components/ServicePageLayout";
import heroImg from "@/assets/services/oncoplastic.jpg";

export default function BreastConservingOncoplastic() {
  return (
    <ServicePageLayout
      title="Breast Conserving & Oncoplastic Surgery"
      subtitle="Precise tumour removal with expert breast reshaping — combining oncological safety with cosmetic excellence for the best possible outcome."
      heroImage={heroImg}
      category="Clinical"
      metaDescription="Breast conserving and oncoplastic surgery by Dr. Swathika Rajendran in Chennai. UK-trained specialist combining lumpectomy with aesthetic reshaping for superior oncological and cosmetic results."
      overview={[
        "Breast Conserving Surgery (BCS), also known as lumpectomy or wide local excision, involves removing the cancerous tumour along with a margin of healthy tissue while preserving the rest of the breast. It is a proven alternative to mastectomy for early-stage breast cancers.",
        "Oncoplastic surgery takes this a step further — combining cancer surgery with plastic surgery principles to actively reshape the breast during the operation. This allows Dr. Swathika to remove larger tumours while maintaining or improving the breast's appearance, using volume displacement or volume replacement techniques.",
        "Dr. Swathika Rajendran holds a specialised MCh in Breast Oncoplastic & Reconstructive Surgery from the UK — one of the few surgeons in India with this level of dedicated training. Studies consistently show that BCS combined with radiation therapy provides survival outcomes equivalent to mastectomy for appropriately selected patients.",
      ]}
      benefits={[
        "Preserves the natural breast with minimal scarring",
        "Equivalent survival outcomes to mastectomy when combined with radiation",
        "Superior cosmetic results compared to standard breast surgery",
        "Allows removal of larger tumours while conserving the breast",
        "Bilateral symmetry can be achieved in a single operation",
        "Shorter recovery time compared to mastectomy",
        "World-class oncoplastic technique by a UK-trained specialist",
      ]}
      process={[
        { step: "Diagnostic Assessment", description: "Comprehensive evaluation of tumour size, location, and breast size to determine suitability for breast conserving surgery. Imaging and biopsy results guide the surgical plan." },
        { step: "Technique Selection", description: "Dr. Swathika plans the most appropriate oncoplastic approach — ranging from simple tissue rearrangement to complex reshaping — ensuring the best cosmetic outcome while guaranteeing complete tumour removal with clear margins." },
        { step: "The Surgery", description: "Performed under general anaesthesia, typically taking 1–3 hours. The tumour is removed with a surrounding margin of healthy tissue, and the breast is actively reshaped. Sentinel node biopsy is often performed simultaneously." },
        { step: "Post-operative Care", description: "Most patients go home the same day or the next day. Radiation therapy is typically recommended afterwards. Regular follow-up ensures optimal healing, oncological safety, and aesthetic satisfaction." },
      ]}
      faqs={[
        { q: "What is the difference between breast conserving and oncoplastic surgery?", a: "Breast conserving surgery removes the tumour while preserving the breast. Oncoplastic surgery adds plastic surgery reshaping techniques on top of this, resulting in a better cosmetic appearance without compromising cancer treatment." },
        { q: "Am I a candidate for this approach?", a: "Suitability depends on tumour size relative to breast size, tumour location, and whether clear margins can be achieved. Dr. Swathika will assess this thoroughly during your consultation." },
        { q: "Will my breast look different after surgery?", a: "With oncoplastic techniques, Dr. Swathika reshapes the remaining tissue to maintain a natural, symmetrical appearance. Most patients are very satisfied with the cosmetic outcome." },
        { q: "Is radiation therapy always needed after breast conserving surgery?", a: "In most cases, yes. Radiation therapy significantly reduces the risk of local recurrence and is a standard part of breast conserving treatment." },
        { q: "How experienced is Dr. Swathika in oncoplastic surgery?", a: "Dr. Swathika holds a dedicated MCh in Breast Oncoplastic Surgery from the UK and has performed over 700 breast procedures, making her one of the most qualified oncoplastic surgeons in Chennai." },
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
