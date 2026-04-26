import ServicePageLayout from "@/components/ServicePageLayout";
import heroImg from "@/assets/services/oncoplastic.jpg";

export default function OncoplasticSurgery() {
  return (
    <ServicePageLayout
      title="Oncoplastic Surgery"
      subtitle="The gold standard in breast cancer surgery — combining complete cancer removal with expert breast reshaping for optimal oncological and aesthetic outcomes."
      heroImage={heroImg}
      category="Clinical"
      metaDescription="Oncoplastic breast surgery by Dr. Swathika Rajendran in Chennai. UK-trained specialist combining cancer surgery with aesthetic breast reshaping for the best outcomes."
      overview={[
        "Oncoplastic surgery is an advanced surgical technique that combines oncological (cancer) surgery with plastic surgery principles. It allows surgeons to remove larger tumours while maintaining or improving the appearance of the breast.",
        "Dr. Swathika Rajendran holds a specialised MCh in Breast Oncoplastic & Reconstructive Surgery from the UK — one of the few surgeons in India with this level of dedicated training. This expertise allows her to offer techniques that were previously available only at top international centres.",
        "The oncoplastic approach means that rather than simply removing tissue, the breast is actively reshaped during the cancer operation. This can involve volume displacement (rearranging breast tissue) or volume replacement (using tissue from nearby areas) techniques.",
      ]}
      benefits={[
        "Allows removal of larger tumours while preserving the breast",
        "Superior cosmetic outcomes compared to standard breast surgery",
        "No compromise on cancer treatment for aesthetic results",
        "Reduces need for secondary corrective procedures",
        "Bilateral symmetry can be achieved in one operation",
        "World-class technique delivered by a UK-trained specialist",
      ]}
      process={[
        { step: "Comprehensive Assessment", description: "Dr. Swathika evaluates tumour characteristics, breast size, and patient goals to design the optimal oncoplastic approach. 3D planning may be used for complex cases." },
        { step: "Technique Selection", description: "Based on the assessment, the most appropriate oncoplastic technique is selected — ranging from simple tissue rearrangement to complex flap-based reconstructions." },
        { step: "Combined Surgery", description: "Cancer removal and breast reshaping are performed in a single operation under general anaesthesia. Contralateral (opposite) breast surgery for symmetry may be performed simultaneously." },
        { step: "Recovery & Monitoring", description: "Recovery is similar to standard breast surgery. Close follow-up ensures both oncological safety and aesthetic satisfaction, with adjustments if needed." },
      ]}
      faqs={[]}
      proofOfWork={[
        { stat: "700+", label: "Breast Procedures" },
        { stat: "MCh", label: "UK Qualification" },
        { stat: "UK", label: "Certified Professional" },
      ]}
    />
  );
}
