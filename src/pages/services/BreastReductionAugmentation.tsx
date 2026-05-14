import ServicePageLayout from "@/components/ServicePageLayout";
import heroImg from "@/assets/services/reduction-augmentation.jpg";

export default function BreastReductionAugmentation() {
  return (
    <ServicePageLayout
      contentPrefix="svc_reduction"
      title="Breast Reduction & Augmentation"
      subtitle="Aesthetic enhancement of breast for comfort, symmetry, and confidence — with outcomes that complement your natural form."
      heroImage={heroImg}
      category="Cosmetic"
      metaDescription="Breast reduction and augmentation surgery by Dr. Swathika Rajendran in Chennai. UK-trained breast surgeon offering expert cosmetic breast procedures."
      overview={[
        "Breast reduction surgery is performed to remove excess breast tissue, fat, and skin, achieving a breast size proportionate to the body. It helps relieve symptoms such as back and neck pain, bra strap indentations, and recurrent skin infections, while improving posture and overall comfort.",
        "Breast augmentation is performed to enhance breast size and shape using implants or fat transfer techniques. Each treatment plan is tailored to patient needs, focusing on both functional & aesthetical improvement.",
      ]}
      benefits={[
        "Relief from back, neck, and shoulder pain (reduction)",
        "Improved body proportions and clothing fit",
        "Enhanced confidence and self-image",
        "Natural-looking results with expert technique",
        "Minimise Scares through careful incision placement ",
        "Combined oncoplastic expertise for superior outcomes",
      ]}
      process={[
        {
          step: "Personal Consultation",
          description:
            "Dr. Swathika will perform a thorough examination along with a discussion about your goals, concerns, and expectations to recommend suitable options. ",
        },
        {
          step: "Customised Planning",
          description:
            "Detailed surgical planning including incision patterns, implant selection (for augmentation) or volume of tissue removal (for reduction).",
        },
        { step: "The Surgery", description: "Performed under general anaesthesia, typically taking 2–3 hours. " },
        {
          step: "Recovery",
          description:
            "Initial recovery takes 1–2 weeks. A surgical bra is worn for support. Final results become apparent over 3–6 months as swelling settles and scars mature.",
        },
      ]}
      faqs={[]}
      proofOfWork={[
        { stat: "700+", label: "Total Procedures" },
        { stat: "UK", label: "Trained Surgeon" },
        { stat: "MCh", label: "UK Qualification" },
      ]}
    />
  );
}
