import ServicePageLayout from "@/components/ServicePageLayout";
import heroImg from "@/assets/services/sentinel-node.jpg";

export default function SentinelNodeBiopsy() {
  return (
    <ServicePageLayout
      title="Sentinel Node Biopsy"
      subtitle="A minimally invasive technique to accurately stage breast cancer and guide further treatment decisions — avoiding unnecessary extensive surgery."
      heroImage={heroImg}
      category="Clinical"
      metaDescription="Sentinel node biopsy for breast cancer staging by Dr. Swathika Rajendran in Chennai. Minimally invasive lymph node assessment by a UK-trained specialist."
      overview={[
        "Sentinel Node Biopsy (SNB) is a minimally invasive procedure used to determine whether breast cancer has spread to the lymph nodes under the arm (axilla). The sentinel node is the first lymph node to which cancer cells are most likely to spread from the primary tumour.",
        "By identifying and removing only the sentinel node(s) for examination, Dr. Swathika can accurately stage the cancer without performing a full axillary lymph node dissection — significantly reducing the risk of complications such as lymphoedema.",
        "This technique has revolutionised breast cancer surgery, allowing patients to receive precise staging information while preserving arm function and reducing morbidity.",
      ]}
      benefits={[
        "Accurate cancer staging with minimal invasiveness",
        "Significantly lower risk of lymphoedema compared to full axillary clearance",
        "Faster recovery and less post-operative discomfort",
        "Preserves arm function and mobility",
        "Guides personalised treatment planning",
        "Performed as part of breast cancer surgery — no separate procedure needed",
      ]}
      process={[
        { step: "Pre-operative Mapping", description: "A small amount of radioactive tracer and/or blue dye is injected near the tumour to identify the sentinel lymph node(s). This is done on the day of or the day before surgery." },
        { step: "Identification & Removal", description: "During surgery, Dr. Swathika uses a specialised probe to locate the sentinel node(s), which are then carefully removed through a small incision in the armpit." },
        { step: "Pathological Analysis", description: "The removed nodes are sent for detailed pathological examination to check for the presence of cancer cells. Results guide decisions about further treatment." },
        { step: "Follow-up", description: "If the sentinel node is clear of cancer, no further axillary surgery is needed. If cancer is found, further treatment options are discussed with the multidisciplinary team." },
      ]}
      faqs={[
        { q: "Is sentinel node biopsy painful?", a: "The procedure is performed under general anaesthesia as part of your breast surgery, so you won't feel any pain during the procedure. Post-operative discomfort is usually mild." },
        { q: "What is the risk of lymphoedema with SNB?", a: "The risk of lymphoedema after sentinel node biopsy is approximately 5–7%, much lower than the 20–30% risk associated with full axillary clearance." },
        { q: "What happens if cancer is found in the sentinel node?", a: "Further treatment options, which may include additional surgery, radiation, or systemic therapy, are discussed by the multidisciplinary team based on individual circumstances." },
        { q: "Will I have a visible scar?", a: "The incision is small (2–3cm) and placed in the armpit crease, making it barely visible once healed." },
      ]}
      proofOfWork={[
        { stat: "700+", label: "Total Procedures" },
        { stat: "97%", label: "Detection Rate" },
        { stat: "UK", label: "Advanced Training" },
        { stat: "<5%", label: "Complication Rate" },
      ]}
    />
  );
}
