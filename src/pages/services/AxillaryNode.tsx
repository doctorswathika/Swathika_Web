import ServicePageLayout from "@/components/ServicePageLayout";
import heroImg from "@/assets/services/axillary-node.jpg";

export default function AxillaryNode() {
  return (
    <ServicePageLayout
      contentPrefix="svc_axillary"
      title="Axillary Node Surgery"
      subtitle="Precise assessment and management of axillary lymph nodes a critical step in staging and treating breast cancer with expert surgical care."
      heroImage={heroImg}
      category="Cancer Care"
      metaDescription="Axillary node surgery by Dr. Swathika Rajendran in Chennai. UK trained breast surgeon specialising in axillary lymph node dissection and management as part of comprehensive breast cancer treatment."
      overview={[
        "The axillary lymph nodes located in the armpit, is the main drainage site for breast and plays a key role in breast cancer staging and treatment planning. Determining the  spread of cancer to these nodes is essential for effective treatment planning.",
        "Axillary node surgery involves a sentinel lymph node biopsy a minimally invasive surgery or an axillary lymph node dissection (ALND) when a more extensive procedure is required.",
        "Dr. Swathika Rajendran aims to give an evidence based, patient centred approach to minimising complications such as lymphoedema while ensuring thorough oncological safety.",
      ]}
      benefits={[
        "Accurate cancer staging to guide the overall treatment plan",
        "Minimally invasive options with sentinel node technique where appropriate",
        "Reduced risk of lymphoedema with careful surgical technique",
        "Combined with breast surgery in a single operation when possible",
        "Evidence based approach aligned with international guidelines",
        "Expert aftercare and lymphoedema prevention advice",
      ]}
      process={[
        {
          step: "Pre operative Assessment",
          description:
            "Ultrasound and biopsy of suspicious axillary nodes are performed to evaluate the extent of nodal involvement before surgery. This helps in deciding whether sentinel node biopsy or complete axillary dissection is appropriate.",
        },
        {
          step: "Surgical Planning",
          description:
            "The type of axillary surgery will be decided based on imaging findings, clinical staging and patient conditions.",
        },
        {
          step: "The Surgery",
          description:
            "Axillary node surgery is performed under general anaesthesia, typically alongside the breast procedure. The sentinel node technique uses a tracer to identify and remove the key nodes for assessment with minimal disruption.",
        },
        {
          step: "Post operative Care & Monitoring",
          description:
            "Recovery is closely monitored. Patients receive guidance on arm exercises, lymphoedema prevention and wound care. Histology results guide any further oncological treatment such as chemotherapy or radiotherapy.",
        },
      ]}
      faqs={[]}
      proofOfWork={[
        { stat: "700+", label: "Breast Procedures" },
        { stat: "MCh", label: "UK Qualification" },
        { stat: "ABS", label: "Member" },
      ]}
    />
  );
}
