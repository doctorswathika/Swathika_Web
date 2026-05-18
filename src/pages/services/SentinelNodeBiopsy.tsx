import ServicePageLayout from "@/components/ServicePageLayout";
import heroImg from "@/assets/services/sentinel-node.jpg";

export default function SentinelNodeBiopsy() {
  return (
    <ServicePageLayout
      contentPrefix="svc_sentinel"
      title="Sentinel Node Biopsy"
      subtitle="A minimally invasive technique to accurately check if breast cancer has spread to the lymph nodes under the arm."
      heroImage={heroImg}
      category="Cancer Care"
      metaDescription="Sentinel node biopsy for breast cancer staging by Dr. Swathika Rajendran in Chennai. Minimally invasive lymph node assessment by a UK trained specialist."
      overview={[
        "Sentinel Node Biopsy (SNB) is a minimally invasive procedure used to determine whether breast cancer has spread to the lymph nodes under the arm (axilla). The sentinel node is the first lymph node to which cancer cells are most likely to spread from the primary tumour.",
        "By examining only the sentinel node, we can appropriately stage breast cancer with the aim to avoid full axillary lymph node dissection complications associated with, such as lymphoedema.",
        "Dr. Swathika performs this procedure using radio-isotope and/or blue dye mapping techniques, in line with international guidelines.",
      ]}
      benefits={[
        "Accurate cancer staging with minimal invasiveness",
        "Significantly lower risk of lymphoedema compared to full axillary clearance",
        "Faster recovery and less post operative discomfort",
        "Preserves arm function and mobility",
      ]}
      process={[
        {
          step: "Pre operative Mapping",
          description:
            "A small amount of radioactive tracer and/or blue dye is injected in the breast to identify the sentinel lymph node(s). This is done on the day of surgery.",
        },
        {
          step: "Identification & Removal",
          description:
            "During surgery, Dr. Swathika uses a specialised technique to locate the sentinel node(s), which are then carefully removed through a small incision.",
        },
        {
          step: "Follow up",
          description:
            "Based on the sentinel node biopsy reports, the required further treatment options are discussed.",
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
