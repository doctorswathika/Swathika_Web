import ServicePageLayout from "@/components/ServicePageLayout";
import heroImg from "@/assets/services/gynaecomastia.jpg";

export default function GynaecomastiaCorrection() {
  return (
    <ServicePageLayout
      contentPrefix="svc_gynae"
      title="Gynaecomastia Correction"
      subtitle="Effective and precise correction of male breast enlargement restoring a natural masculine chest contour with minimal downtime. "
      heroImage={heroImg}
      category="Cosmetic"
      metaDescription="Gynaecomastia correction surgery by Dr. Swathika Rajendran in Chennai. Expert male breast reduction by a UK trained breast specialist for a flatter, masculine chest."
      overview={[
        "Gynaecomastia is a condition characterised by the enlargement of breast tissue in males. It usually affects both breasts and can cause physical & psychological discomfort and emotional distress.",
        "Surgical correction involves removing the excess fat & breast tissue to create a flatter and more masculine chest.",
      ]}
      benefits={[
        "Flatter & more masculine chest appearance",
        "Relief from physical discomfort and tenderness",
        "Significant boost in self confidence and body image",
        "Minimally invasive option",
        "Permanent results when combined with healthy lifestyle",
        "Performed by a specialist breast surgeon for optimal outcomes",
      ]}
      process={[
        {
          step: "Confidential Consultation",
          description:
            "Dr. Swathika will have a private and empathetic consultation about your concerns, along with an examination to assess the extent of breast enlargement. ",
        },
        {
          step: "Treatment Planning",
          description:
            "Based on the assessment, the most appropriate surgical technique is selected liposuction, direct excision or a combination. The planned incisions are discussed.",
        },
        {
          step: "The Procedure",
          description:
            "Performed under general anaesthesia, typically taking 1–2 hours. Excess tissue is removed through carefully placed incisions.",
        },
        {
          step: "Recovery",
          description:
            "A compression garment is worn for 4–6 weeks. Most patients return to work within 1–2 weeks and full physical activities after 6 weeks. Results are immediately visible.",
        },
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
