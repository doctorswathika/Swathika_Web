import ServicePageLayout from "@/components/ServicePageLayout";
import heroImg from "@/assets/services/mastectomy.jpg";

export default function Mastectomy() {
  return (
    <ServicePageLayout
      contentPrefix="svc_mastectomy"
      title="Mastectomy"
      subtitle="Complete removal of breast for cancer treatment or risk reduction, prioritising both safety and aesthetic outcomes."
      heroImage={heroImg}
      category="Clinical"
      metaDescription="Expert mastectomy surgery by Dr. Swathika Rajendran in Chennai. UK-trained breast oncoplastic surgeon with 700+ procedures. Safe, precise breast removal for cancer treatment."
      overview={[
        "Mastectomy is a surgical procedure to remove one or both breasts completely. It is most commonly performed as a treatment for breast cancer when breast conservation is not possible, but may also be done as a preventive measure for women at high risk of developing the disease.",
        "Dr. Swathika Rajendran brings her UK-trained expertise to every mastectomy procedure, ensuring meticulous surgical technique that prioritises complete cancer removal at the same time offering immediate breast reconstruction.",
        "Modern mastectomy techniques have evolved significantly. Skin-sparing and nipple-sparing approaches, when oncologically safe, allow for superior reconstructive outcomes. Dr. Swathika evaluates each patient individually to determine the most appropriate technique.",
      ]}
      benefits={[
        "Complete removal of cancerous tissue and breast tissues",
        "Reduced risk of cancer recurrence",
        "Option for immediate reconstruction in suitable cases",
        "When breast conservation is not possible due to the breast size and cancer size",
        "Performed by a UK-trained oncoplastic specialist makes the scar suitable for using external prosthesis",
        "Can decide on delayed reconstruction at a later date",
      ]}
      process={[
        { step: "The Procedure", description: "The surgery is performed under general anaesthesia. Depending on the type of mastectomy, the procedure typically takes 1–3 hours. Drains may be placed to prevent fluid collection." },
        { step: "Recovery & Follow-up", description: "Hospital stay is usually between 1–3 days. You will receive detailed aftercare instructions, wound care guidance, and scheduled follow-up appointments to monitor healing and discuss further treatment if needed." },
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
