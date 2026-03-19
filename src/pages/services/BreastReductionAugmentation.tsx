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
        "Breast reduction surgery removes excess breast tissue, fat, and skin to achieve a breast size proportionate to your body. It relieves physical discomfort such as back pain, neck pain, and skin irritation while improving body proportions.",
        "Breast augmentation enhances breast size and shape using implants or fat transfer techniques. Dr. Swathika's oncoplastic training gives her a unique advantage — understanding breast anatomy at the deepest level allows her to achieve natural, harmonious results.",
        "Whether you're seeking relief from oversized breasts or enhancement for improved confidence, Dr. Swathika provides personalised surgical plans that prioritise both your physical comfort and aesthetic goals.",
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
        { step: "Personal Consultation", description: "A confidential discussion about your goals, concerns, and expectations. Dr. Swathika will examine your breast anatomy and recommend the most suitable approach." },
        { step: "Customised Planning", description: "Detailed surgical planning including incision patterns, implant selection (for augmentation), or tissue removal volume (for reduction). Pre-operative photographs and measurements guide the plan." },
        { step: "The Surgery", description: "Performed under general anaesthesia, typically taking 2–3 hours. Dr. Swathika uses proven techniques to achieve symmetrical, natural-looking results with minimal scarring." },
        { step: "Recovery", description: "Initial recovery takes 1–2 weeks. A surgical bra is worn for support. Final results become apparent over 3–6 months as swelling settles and scars mature." },
      ]}
      faqs={[
        { q: "Will I lose nipple sensation after breast reduction?", a: "Some temporary changes in sensation are common but usually resolve over weeks to months. Dr. Swathika uses techniques that preserve the nerve supply to the nipple." },
        { q: "What implant types are available for augmentation?", a: "Both silicone and saline implants are available in various shapes and profiles. Fat transfer augmentation is also an option. The best choice depends on your anatomy and goals." },
        { q: "How long do results last?", a: "Reduction results are long-lasting, though weight changes and ageing can affect breast shape. Augmentation implants typically last 10–15 years before potential replacement." },
        { q: "Can I breastfeed after breast reduction?", a: "Many women can still breastfeed after reduction, though there may be some reduction in milk supply. This should be discussed during consultation." },
      ]}
      proofOfWork={[
        { stat: "700+", label: "Total Procedures" },
        { stat: "UK", label: "Trained Surgeon" },
        { stat: "98%", label: "Satisfaction Rate" },
        { stat: "10+", label: "Years Experience" },
      ]}
    />
  );
}
