import ServicePageLayout from "@/components/ServicePageLayout";
import heroImg from "@/assets/services/mastectomy.jpg";

export default function Mastectomy() {
  return (
    <ServicePageLayout
      contentPrefix="svc_mastectomy"
      title="Mastectomy"
      subtitle="Involves complete removal of the breast with precise and careful scar placement."
      heroImage={heroImg}
      category="Cancer Care"
      metaDescription="Expert mastectomy surgery by Dr. Swathika Rajendran in Chennai. UK trained breast oncoplastic surgeon with 700+ procedures. Safe & precise breast removal for cancer treatment."
      overview={[
        "Mastectomy is a surgical procedure to remove one or both breasts completely. It is most commonly performed as a treatment for breast cancer when breast conservation is not possible, but may also be done as a preventive measure for women at high risk of developing the disease.",
        "Modern mastectomy techniques have evolved significantly. Skin sparing and nipple sparing approaches, when oncologically safe, allow for superior reconstructive outcomes. Each patient is evaluated individually to determine the most appropriate technique.",
      ]}
      benefits={[
        "Complete removal of tumor.",
        "When breast conservation is not feasible.",
        "Option for immediate reconstruction in suitable cases.",
        "Skin sparing and nipple sparing techniques when appropriate.",
        "Performed by a UK trained oncoplastic specialist.",
        "Personalised surgical plan for every patient.",
      ]}
      process={[
        {
          step: "Pre-operative Planning",
          description:
            "Dr. Swathika works with the multidisciplinary team to finalise the treatment plan, including the role of chemotherapy and radiation.",
        },
        {
          step: "The Procedure",
          description:
            "The surgery is performed under general anaesthesia. Depending on the type of mastectomy, the procedure typically takes 1–3 hours. Drains may be placed to prevent fluid collection.",
        },
        {
          step: "Recovery & Follow up",
          description:
            "Hospital stay is usually between 1–3 days. You will receive detailed aftercare instructions, wound care guidance and scheduled follow up appointments to monitor healing and discuss further treatment if needed.",
        },
      ]}
      faqs={[]}
      proofOfWork={[
        { stat: "700+", label: "Total Procedures" },
        { stat: "UK", label: "Trained & Certified" },
        { stat: "MCh", label: "UK Qualification" },
      ]}
    />
  );
}
