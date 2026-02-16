import ServicePageLayout from "@/components/ServicePageLayout";
import heroImg from "@/assets/services/breast-conserving.jpg";

export default function BreastConservingSurgery() {
  return (
    <ServicePageLayout
      title="Breast Conserving Surgery"
      subtitle="Precise tumour removal while preserving the natural breast shape and appearance — combining oncological safety with cosmetic excellence."
      heroImage={heroImg}
      category="Clinical"
      metaDescription="Breast conserving surgery (lumpectomy) by Dr. Swathika Rajendran in Chennai. UK-trained oncoplastic surgeon specialising in tumour removal with excellent cosmetic outcomes."
      overview={[
        "Breast Conserving Surgery (BCS), also known as lumpectomy or wide local excision, involves removing the cancerous tumour along with a margin of healthy tissue while preserving the rest of the breast. It is a proven alternative to mastectomy for early-stage breast cancers.",
        "Dr. Swathika's oncoplastic training allows her to combine cancer surgery with breast reshaping techniques, ensuring that the breast maintains a natural, symmetrical appearance after tumour removal. This is the hallmark of oncoplastic breast conserving surgery.",
        "Studies consistently show that BCS combined with radiation therapy provides survival outcomes equivalent to mastectomy for appropriately selected patients, making it the preferred option when feasible.",
      ]}
      benefits={[
        "Preserves the natural breast with minimal scarring",
        "Equivalent survival outcomes to mastectomy when combined with radiation",
        "Shorter recovery time compared to mastectomy",
        "Oncoplastic techniques ensure excellent cosmetic results",
        "Less psychological impact — retaining your natural breast",
        "Tailored approach for each patient's unique anatomy",
      ]}
      process={[
        { step: "Diagnostic Assessment", description: "Comprehensive evaluation of tumour size, location, and breast size to determine suitability for breast conserving surgery. Imaging and biopsy results guide the surgical plan." },
        { step: "Surgical Planning", description: "Dr. Swathika plans the incision placement and reshaping technique to achieve the best cosmetic outcome while ensuring complete tumour removal with clear margins." },
        { step: "The Surgery", description: "Performed under general anaesthesia, typically taking 1–2 hours. The tumour is removed with a surrounding margin of healthy tissue. Sentinel node biopsy is often performed simultaneously." },
        { step: "Post-operative Care", description: "Most patients go home the same day or the next day. Radiation therapy is typically recommended afterwards. Regular follow-up ensures optimal healing and monitoring." },
      ]}
      faqs={[
        { q: "Am I a candidate for breast conserving surgery?", a: "Suitability depends on tumour size relative to breast size, tumour location, and whether clear margins can be achieved. Dr. Swathika will assess this during your consultation." },
        { q: "Will my breast look different after surgery?", a: "With oncoplastic techniques, Dr. Swathika reshapes the remaining tissue to maintain a natural appearance. Most patients are very satisfied with the cosmetic outcome." },
        { q: "Is radiation therapy always needed after BCS?", a: "In most cases, yes. Radiation therapy significantly reduces the risk of local recurrence and is a standard part of breast conserving treatment." },
        { q: "How long until I can return to normal activities?", a: "Most patients return to daily activities within 1–2 weeks. Full recovery typically takes 3–4 weeks." },
      ]}
      proofOfWork={[
        { stat: "700+", label: "Total Procedures" },
        { stat: "98%", label: "Clear Margins Rate" },
        { stat: "UK", label: "Oncoplastic Training" },
        { stat: "GMC", label: "Registered" },
      ]}
    />
  );
}
