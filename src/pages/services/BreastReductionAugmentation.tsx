import ServicePageLayout from "@/components/ServicePageLayout";
import heroImg from "@/assets/services/reduction-augmentation.jpg";

export default function BreastReductionAugmentation() {
  return (
    <ServicePageLayout
      contentPrefix="svc_reduction"
      title="Breast Reduction & Augmentation"
      subtitle="Aesthetic and functional breast surgery for improved comfort, symmetry, and confidence — performed with surgical precision and artistic sensibility."
      heroImage={heroImg}
      category="Cosmetic"
      metaDescription="Breast reduction and augmentation surgery by Dr. Swathika Rajendran in Chennai. UK-trained breast surgeon offering expert cosmetic breast procedures."
      overview={[
        "Breast reduction surgery is performed to remove excess breast tissue, fat, and skin, achieving a breast size proportionate to the body. It helps relieve symptoms such as back and neck pain, bra strap indentations, and recurrent skin infections, while improving posture and overall comfort.",
        "Breast augmentation is performed to enhance breast size and shape using implants or fat transfer techniques.",
        "With UK-trained oncoplastic expertise, Dr. Swathika combines a detailed understanding of breast anatomy with advanced surgical techniques to achieve natural, balanced results.",
        "Each treatment plan is individualised, focusing on both functional improvement and aesthetically realistic outcomes.",
      ]}
      benefits={[
        "Relief from back, neck, and shoulder pain (reduction)",
        "Improved body proportions and clothing fit",
        "Enhanced confidence and self-image",
        "Natural-looking results with expert technique",
        "Scarring minimised through careful incision placement",
        "Combined oncoplastic expertise for superior outcomes",
      ]}
      process={[
        { step: "Personal Consultation", description: "A confidential discussion to understand your goals, concerns, and expectations, followed by a detailed clinical examination and personalised recommendations tailored to your needs." },
        { step: "Customised Planning", description: "Detailed surgical planning including incision patterns, implant selection (for augmentation), or tissue removal volume (for reduction). Pre-operative photographs and measurements guide the plan." },
        { step: "The Surgery", description: "Performed under general anaesthesia, typically taking 2–3 hours. Dr. Swathika uses proven techniques to achieve symmetrical, natural-looking results with minimal scarring." },
        { step: "Recovery", description: "Initial recovery takes 1–2 weeks. A surgical bra is worn for support. Final results become apparent over 3–6 months as swelling settles and scars mature." },
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
