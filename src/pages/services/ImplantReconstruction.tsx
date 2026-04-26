import ServicePageLayout from "@/components/ServicePageLayout";
import heroImg from "@/assets/services/implant-reconstruction.jpg";

export default function ImplantReconstruction() {
  return (
    <ServicePageLayout
      contentPrefix="svc_implant"
      title="Implant Reconstruction"
      subtitle="Restoring breast form and shape after mastectomy using advanced implant techniques tailored to your individual needs and preferences."
      heroImage={heroImg}
      category="Cosmetic"
      metaDescription="Breast implant reconstruction by Dr. Swathika Rajendran in Chennai. Expert breast restoration after mastectomy by a UK-trained oncoplastic and reconstructive surgeon."
      overview={[
        "Implant-based breast reconstruction restores the shape and volume of the breast after mastectomy. It is one of the most common methods of breast reconstruction and can be performed immediately (at the time of mastectomy) or as a delayed procedure.",
        "Modern implant reconstruction offers a wide range of options including different implant types, sizes, and profiles to fit the patient’s needs.",
      ]}
      benefits={[
        "Restores breast shape and body symmetry after mastectomy",
        "Can be performed immediately — reducing the number of operations",
        "No donor site complications as seen in autologous flap reconstruction",
        "Shorter surgery compared to autologous (flap) reconstruction",
        "Improved psychological well-being and body confidence",
      ]}
      process={[
        { step: "Reconstruction Planning", description: "Detailed discussion about reconstruction options, timing, implant choices, and expected outcomes. Dr. Swathika uses her expertise to recommend the best approach for your situation." },
        { step: "Refinement & Follow-up", description: "Secondary procedures such as nipple reconstruction, fat grafting for contour refinement, or symmetry adjustments may be performed. Regular follow-up ensures long-term satisfaction." },
      ]}
      faqs={[]}
      proofOfWork={[
        { stat: "700+", label: "Total Procedures" },
        { stat: "MCh", label: "Reconstructive Training" },
        { stat: "UK", label: "NHS Experience" },
      ]}
    />
  );
}
