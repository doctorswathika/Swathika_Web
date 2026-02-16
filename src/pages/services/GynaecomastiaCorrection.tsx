import ServicePageLayout from "@/components/ServicePageLayout";
import heroImg from "@/assets/services/gynaecomastia.jpg";

export default function GynaecomastiaCorrection() {
  return (
    <ServicePageLayout
      title="Gynaecomastia Correction"
      subtitle="Surgical treatment of enlarged male breast tissue for a flatter, more masculine chest contour — restoring confidence and comfort."
      heroImage={heroImg}
      category="Cosmetic"
      metaDescription="Gynaecomastia correction surgery by Dr. Swathika Rajendran in Chennai. Expert male breast reduction by a UK-trained breast specialist for a flatter, masculine chest."
      overview={[
        "Gynaecomastia is a condition characterised by the enlargement of breast tissue in males. It can affect one or both sides and may cause physical discomfort, self-consciousness, and emotional distress. The condition is far more common than many people realise.",
        "Surgical correction involves removing the excess breast tissue and, in some cases, excess skin and fat, to create a flatter, more masculine chest contour. Dr. Swathika's expertise as a breast specialist means she understands the anatomy intimately.",
        "The procedure is tailored to the severity of the condition — ranging from minimally invasive liposuction alone for mild cases to direct excision and skin reduction for more advanced gynaecomastia.",
      ]}
      benefits={[
        "Flatter, more masculine chest appearance",
        "Relief from physical discomfort and tenderness",
        "Significant boost in self-confidence and body image",
        "Minimally invasive options for mild cases",
        "Permanent results when combined with healthy lifestyle",
        "Performed by a specialist breast surgeon for optimal outcomes",
      ]}
      process={[
        { step: "Confidential Consultation", description: "A private, empathetic discussion about your concerns. Dr. Swathika will examine the extent of breast enlargement, assess the tissue composition, and rule out any underlying causes." },
        { step: "Treatment Planning", description: "Based on the assessment, the most appropriate surgical technique is selected — liposuction, direct excision, or a combination. The planned incisions are discussed." },
        { step: "The Procedure", description: "Performed under general anaesthesia, typically taking 1–2 hours. Excess tissue is removed through carefully placed incisions. Drains may be placed for 24–48 hours." },
        { step: "Recovery", description: "A compression garment is worn for 4–6 weeks. Most patients return to work within 1 week and full physical activities within 4–6 weeks. Results are immediately visible." },
      ]}
      faqs={[
        { q: "What causes gynaecomastia?", a: "It can be caused by hormonal imbalances, certain medications, obesity, or may be idiopathic (no identifiable cause). Blood tests are often performed to rule out hormonal causes before surgery." },
        { q: "Will the condition come back after surgery?", a: "Recurrence is rare when the breast tissue is adequately removed. Maintaining a healthy weight and avoiding causative medications helps ensure lasting results." },
        { q: "Are there visible scars?", a: "Incisions are placed around the edge of the areola or in the armpit crease to minimise visibility. Most scars fade significantly over 6–12 months." },
        { q: "Is this covered by insurance?", a: "Some insurance providers cover gynaecomastia surgery when it causes documented physical symptoms. Dr. Swathika can provide the necessary documentation for your claim." },
      ]}
      proofOfWork={[
        { stat: "700+", label: "Total Procedures" },
        { stat: "UK", label: "Specialist Training" },
        { stat: "97%", label: "Satisfaction Rate" },
        { stat: "GMC", label: "Registered" },
      ]}
    />
  );
}
