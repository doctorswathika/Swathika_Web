import ServicePageLayout from "@/components/ServicePageLayout";
import heroImg from "@/assets/services/mastectomy.jpg";

export default function Mastectomy() {
  return (
    <ServicePageLayout
      contentPrefix="svc_mastectomy"
      title="Mastectomy"
      subtitle="Complete breast removal performed with meticulous surgical technique for cancer treatment or risk reduction, prioritising both safety and aesthetic outcomes."
      heroImage={heroImg}
      category="Clinical"
      metaDescription="Expert mastectomy surgery by Dr. Swathika Rajendran in Chennai. UK-trained breast oncoplastic surgeon with 700+ procedures. Safe, precise breast removal for cancer treatment."
      overview={[
        "Mastectomy is a surgical procedure to remove one or both breasts, partially or completely. It is most commonly performed as a treatment for breast cancer, but may also be done as a preventive measure for women at high risk of developing the disease.",
        "Dr. Swathika Rajendran brings her UK-trained expertise to every mastectomy procedure, ensuring meticulous surgical technique that prioritises complete cancer removal while preserving as much healthy tissue as possible. Her oncoplastic training means she considers the aesthetic outcome from the very first incision.",
        "Modern mastectomy techniques have evolved significantly. Skin-sparing and nipple-sparing approaches, when oncologically safe, allow for superior reconstructive outcomes. Dr. Swathika evaluates each patient individually to determine the most appropriate technique.",
      ]}
      benefits={[
        "Complete removal of cancerous tissue for improved survival",
        "Reduced risk of cancer recurrence",
        "Option for immediate reconstruction in suitable cases",
        "Skin-sparing and nipple-sparing techniques when appropriate",
        "Performed by a UK-trained oncoplastic specialist",
        "Personalised surgical plan for every patient",
      ]}
      process={[
        { step: "Initial Consultation", description: "A thorough assessment including clinical examination, review of imaging and biopsy results, and a detailed discussion about surgical options tailored to your specific diagnosis." },
        { step: "Pre-operative Planning", description: "Dr. Swathika works with the multidisciplinary team to finalise the surgical plan, including decisions about the extent of surgery, sentinel node biopsy, and potential immediate reconstruction." },
        { step: "The Procedure", description: "The surgery is performed under general anaesthesia. Depending on the type of mastectomy, the procedure typically takes 1–3 hours. Drains may be placed to prevent fluid collection." },
        { step: "Recovery & Follow-up", description: "Hospital stay is usually 1–3 days. You will receive detailed aftercare instructions, wound care guidance, and scheduled follow-up appointments to monitor healing and discuss further treatment if needed." },
      ]}
      faqs={[
        { q: "How long does recovery take after a mastectomy?", a: "Most patients recover within 4–6 weeks. You can typically return to light activities within 2 weeks, but heavy lifting should be avoided for 6 weeks. Dr. Swathika provides personalised recovery guidance." },
        { q: "Can I have breast reconstruction at the same time?", a: "Yes, immediate reconstruction is often possible and is one of Dr. Swathika's specialities. This is discussed during your initial consultation based on your clinical situation." },
        { q: "Will I need chemotherapy or radiation after surgery?", a: "This depends on the pathology results and is decided by the multidisciplinary team. Dr. Swathika coordinates closely with oncologists to ensure seamless care." },
        { q: "What type of mastectomy will I need?", a: "This is determined by the size, location, and type of cancer, along with your personal preferences. Options include simple mastectomy, skin-sparing, and nipple-sparing mastectomy." },
      ]}
      proofOfWork={[
        { stat: "700+", label: "Total Procedures" },
        { stat: "UK", label: "Trained & Certified" },
        { stat: "GMC", label: "Registered" },
        { stat: "99%", label: "Patient Satisfaction" },
      ]}
    />
  );
}
