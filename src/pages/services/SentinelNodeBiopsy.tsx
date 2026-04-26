import ServicePageLayout from "@/components/ServicePageLayout";
import heroImg from "@/assets/services/sentinel-node.jpg";

export default function SentinelNodeBiopsy() {
  return (
    <ServicePageLayout
      contentPrefix="svc_sentinel"
      title="Sentinel Node Biopsy"
      subtitle="A minimally invasive technique to accurately stage the spread of breast cancer to the axillary lymph nodes."
      heroImage={heroImg}
      category="Clinical"
      metaDescription="Sentinel node biopsy for breast cancer staging by Dr. Swathika Rajendran in Chennai. Minimally invasive lymph node assessment by a UK-trained specialist."
      overview={[
        "Sentinel Node Biopsy (SNB) is a minimally invasive procedure used to determine whether breast cancer has spread to the lymph nodes under the arm (axilla). The sentinel node is the first lymph node to which cancer cells are most likely to spread from the primary tumour.",
        "By identifying and removing only the sentinel node in eligible patients, unnecessary extensive surgery can be avoided, thereby significantly reducing the risk of complications like lymphoedema.",
        "This technique has revolutionised breast cancer surgery, allowing patients to receive precise staging information while preserving arm function and reducing morbidity, with proven efficacy and comparable outcomes.",
      ]}
      benefits={[
        "Accurate cancer staging with minimal invasiveness",
        "Significantly lower risk of lymphoedema compared to full axillary clearance",
        "Faster recovery and less post-operative discomfort",
        "Preserves arm function and mobility",
        "Guides personalised treatment planning",
      ]}
      process={[
        {
          step: "Pre-operative Mapping",
          description:
            "A small amount of radioactive tracer and/or blue dye is injected in the breast to identify the sentinel lymph node(s). This is done on the day of surgery.",
        },
        {
          step: "Identification & Removal",
          description:
            "The sentinel node(s) are identified during surgery and are then carefully removed through a small incision in the armpit.",
        },
        {
          step: "Follow-up",
          description:
            "If the sentinel node is clear of cancer, no further axillary surgery is needed. If cancer is found, further treatment options are discussed with the multidisciplinary team.",
        },
      ]}
      faqs={[]}
      proofOfWork={[
        { stat: "700+", label: "Total Procedures" },
        { stat: "UK", label: "Advanced Training" },
        { stat: "MCh", label: "UK Qualification" },
      ]}
    />
  );
}
