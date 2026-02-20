import ServicePageLayout from "@/components/ServicePageLayout";
import heroImg from "@/assets/services/axillary-node.jpg";

export default function AxillaryNode() {
  return (
    <ServicePageLayout
      title="Axillary Node Surgery"
      subtitle="Precise assessment and management of axillary lymph nodes — a critical step in staging and treating breast cancer with expert surgical care."
      heroImage={heroImg}
      category="Clinical"
      metaDescription="Axillary node surgery by Dr. Swathika Rajendran in Chennai. UK-trained breast surgeon specialising in axillary lymph node dissection and management as part of comprehensive breast cancer treatment."
      overview={[
        "The axillary lymph nodes, located in the armpit, are the primary drainage site for the breast and play a central role in breast cancer staging. Determining whether cancer has spread to these nodes is essential for planning the most effective treatment.",
        "Dr. Swathika Rajendran performs axillary node surgery as part of a comprehensive breast cancer treatment plan. This may include sentinel lymph node biopsy — a minimally invasive technique to assess the first nodes in the lymphatic chain — or axillary lymph node dissection (ALND) when indicated.",
        "As a UK-trained oncoplastic surgeon, Dr. Swathika brings an evidence-based, patient-centred approach to axillary surgery, minimising complications such as lymphoedema while ensuring thorough oncological clearance.",
      ]}
      benefits={[
        "Accurate cancer staging to guide the overall treatment plan",
        "Minimally invasive options with sentinel node technique where appropriate",
        "Reduced risk of lymphoedema with careful surgical technique",
        "Combined with breast surgery in a single operation when possible",
        "Evidence-based approach aligned with international guidelines",
        "Expert aftercare and lymphoedema prevention advice",
      ]}
      process={[
        { step: "Pre-operative Assessment", description: "Ultrasound and biopsy of suspicious axillary nodes are performed to evaluate the extent of nodal involvement before surgery. This informs whether sentinel node biopsy or full dissection is most appropriate." },
        { step: "Surgical Planning", description: "Dr. Swathika determines the optimal axillary surgical approach based on imaging findings, clinical staging, and the planned breast operation, ensuring alignment with oncological guidelines." },
        { step: "The Surgery", description: "Axillary node surgery is performed under general anaesthesia, typically alongside the breast procedure. The sentinel node technique uses a tracer to identify and remove the key nodes for assessment with minimal disruption." },
        { step: "Post-operative Care & Monitoring", description: "Recovery is closely monitored. Patients receive guidance on arm exercises, lymphoedema prevention, and wound care. Histology results guide any further oncological treatment such as chemotherapy or radiotherapy." },
      ]}
      faqs={[
        { q: "What is the difference between sentinel node biopsy and axillary lymph node dissection?", a: "Sentinel node biopsy removes only the first one to three lymph nodes to check for cancer spread — a minimally invasive approach with fewer complications. Axillary lymph node dissection removes more nodes and is reserved for cases where cancer has been confirmed in the nodes." },
        { q: "Will axillary surgery cause lymphoedema?", a: "Lymphoedema (arm swelling) is a potential side effect of axillary surgery, particularly with more extensive dissection. Dr. Swathika uses careful techniques to minimise this risk and provides expert guidance on prevention and management." },
        { q: "Can axillary node surgery be performed at the same time as breast surgery?", a: "Yes, in most cases axillary node surgery is performed simultaneously with the breast procedure (mastectomy or breast conserving surgery) under a single anaesthetic." },
        { q: "How will I know if my lymph nodes have cancer?", a: "Results from sentinel node biopsy are available within days of surgery. Your full pathology report will be discussed at a follow-up appointment to plan any further treatment." },
      ]}
      proofOfWork={[
        { stat: "700+", label: "Breast Procedures" },
        { stat: "MCh", label: "UK Qualification" },
        { stat: "GMC", label: "Registered" },
        { stat: "ABS", label: "Member" },
      ]}
    />
  );
}
