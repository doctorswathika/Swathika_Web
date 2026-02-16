import ServicePageLayout from "@/components/ServicePageLayout";
import heroImg from "@/assets/services/implant-reconstruction.jpg";

export default function ImplantReconstruction() {
  return (
    <ServicePageLayout
      title="Implant Reconstruction"
      subtitle="Restoring breast form and confidence after mastectomy using advanced implant techniques tailored to your individual anatomy and preferences."
      heroImage={heroImg}
      category="Cosmetic"
      metaDescription="Breast implant reconstruction by Dr. Swathika Rajendran in Chennai. Expert breast restoration after mastectomy by a UK-trained oncoplastic and reconstructive surgeon."
      overview={[
        "Implant-based breast reconstruction restores the shape and volume of the breast after mastectomy. It is one of the most common methods of breast reconstruction and can be performed immediately (at the time of mastectomy) or as a delayed procedure.",
        "Dr. Swathika's dual expertise in oncology and reconstruction means she understands both sides of the equation — ensuring complete cancer treatment while planning the optimal reconstructive outcome from the very beginning.",
        "Modern implant reconstruction offers a wide range of options including different implant types, sizes, and profiles, as well as techniques like pre-pectoral (above the muscle) and sub-pectoral (below the muscle) placement. Dr. Swathika tailors each reconstruction to the individual patient.",
      ]}
      benefits={[
        "Restores breast shape and body symmetry after mastectomy",
        "Can be performed immediately — reducing the number of operations",
        "Wide range of implant options for personalised results",
        "Shorter surgery compared to autologous (flap) reconstruction",
        "Improved psychological well-being and body confidence",
        "Expert performed by a UK-trained reconstructive specialist",
      ]}
      process={[
        { step: "Reconstruction Planning", description: "Detailed discussion about reconstruction options, timing, implant choices, and expected outcomes. Dr. Swathika uses her expertise to recommend the best approach for your situation." },
        { step: "Tissue Expansion (if needed)", description: "In some cases, a tissue expander is placed first to gradually stretch the skin and muscle. This is filled over several weeks before being replaced with the permanent implant." },
        { step: "Implant Placement", description: "The permanent implant is placed in the optimal position — above or below the pectoral muscle — to achieve the most natural shape and feel. The procedure takes 1–2 hours." },
        { step: "Refinement & Follow-up", description: "Secondary procedures such as nipple reconstruction, fat grafting for contour refinement, or symmetry adjustments may be performed. Regular follow-up ensures long-term satisfaction." },
      ]}
      faqs={[
        { q: "Should I choose immediate or delayed reconstruction?", a: "Immediate reconstruction is preferred when oncologically safe, as it achieves better cosmetic outcomes and reduces the psychological impact. Dr. Swathika will advise based on your cancer treatment plan." },
        { q: "How long do breast implants last?", a: "Modern implants are designed to last 10–15 years or longer. They don't have a fixed expiry date, but monitoring through regular check-ups is recommended." },
        { q: "Will the reconstructed breast feel natural?", a: "While a reconstructed breast won't feel identical to a natural breast, modern techniques achieve a result that looks natural in clothing and feels comfortable. Sensation may partially return over time." },
        { q: "What are the risks of implant reconstruction?", a: "Risks include infection, capsular contracture, implant malposition, and the need for revision surgery. Dr. Swathika discusses all risks thoroughly during consultation." },
      ]}
      proofOfWork={[
        { stat: "700+", label: "Total Procedures" },
        { stat: "MCh", label: "Reconstructive Training" },
        { stat: "UK", label: "NHS Experience" },
        { stat: "98%", label: "Satisfaction Rate" },
      ]}
    />
  );
}
