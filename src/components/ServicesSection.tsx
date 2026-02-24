import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/hooks/useSiteContent";

import mastectomyImg from "@/assets/services/mastectomy.jpg";
import breastConservingImg from "@/assets/services/breast-conserving.jpg";
import sentinelNodeImg from "@/assets/services/sentinel-node.jpg";
import reductionAugmentationImg from "@/assets/services/reduction-augmentation.jpg";
import lipomodellingImg from "@/assets/services/lipomodelling.jpg";
import implantReconstructionImg from "@/assets/services/implant-reconstruction.jpg";
import gynaecomastiaImg from "@/assets/services/gynaecomastia.jpg";
import axillaryNodeImg from "@/assets/services/axillary-node.jpg";

const clinicalServices = [
  { title: "Mastectomy", img: mastectomyImg, slug: "mastectomy" },
  { title: "Breast Conserving & Oncoplastic Surgery", img: breastConservingImg, slug: "breast-conserving-oncoplastic" },
  { title: "Sentinel Node Biopsy", img: sentinelNodeImg, slug: "sentinel-node-biopsy" },
  { title: "Axillary Node Surgery", img: axillaryNodeImg, slug: "axillary-node" },
];

const cosmeticServices = [
  { title: "Breast Reduction & Augmentation", img: reductionAugmentationImg, slug: "breast-reduction-augmentation" },
  { title: "Lipomodelling", img: lipomodellingImg, slug: "lipomodelling" },
  { title: "Implant Reconstruction", img: implantReconstructionImg, slug: "implant-reconstruction" },
  { title: "Gynaecomastia Correction", img: gynaecomastiaImg, slug: "gynaecomastia-correction" },
];

function ServiceCard({ title, img, slug, index, isVisible }: { title: string; img: string; slug: string; index: number; isVisible: boolean }) {
  return (
    <Link to={`/services/${slug}`} onClick={() => window.scrollTo(0, 0)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
        className="group glass rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/15 transition-shadow duration-500 cursor-pointer"
      >
        <div className="aspect-square overflow-hidden relative">
          <motion.div
            className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: "radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.15), transparent 70%)",
            }}
          />
          <motion.img
            src={img}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 0.8 }}
            whileHover={{ scale: 1.08, transition: { duration: 0.5 } }}
          />
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 40%, hsl(0 0% 100% / 0.12) 50%, transparent 60%)",
            }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 + 2, repeatDelay: 3 }}
          />
        </div>
        <div className="p-4 text-center">
          <motion.h3
            className="relative font-serif-display text-lg font-semibold text-foreground inline-block"
            whileHover={{ scale: 1.02 }}
          >
            {title}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] gradient-rose-gold group-hover:w-full transition-all duration-300" />
          </motion.h3>
        </div>
      </motion.div>
    </Link>
  );
}

export default function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { getText, getAlignClass } = useSiteContent();

  const subtitle = getText("services_subtitle", "Our Services");
  const title = getText("services_title", "Signature <span class=\"text-gradient-rose italic\">Treatments</span>");
  const clinicalHeading = getText("services_clinical_heading", "Clinical");
  const cosmeticHeading = getText("services_cosmetic_heading", "Cosmetic");

  return (
    <section id="services" className="py-24 lg:py-32 bg-background relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className={`mb-16 ${getAlignClass("services_title")}`}
        >
          <p className={`text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans-body mb-3 ${getAlignClass("services_subtitle")}`}
            dangerouslySetInnerHTML={{ __html: subtitle }} />
          <h2 className="font-serif-display text-4xl lg:text-5xl font-semibold text-foreground"
            dangerouslySetInnerHTML={{ __html: title }} />
        </motion.div>

        {/* Clinical Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <h3 className={`font-serif-display text-2xl lg:text-3xl font-semibold text-foreground mb-8 ${getAlignClass("services_clinical_heading")}`}
            dangerouslySetInnerHTML={{ __html: clinicalHeading }} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clinicalServices.map((s, i) => (
              <ServiceCard key={s.title} title={s.title} img={s.img} slug={s.slug} index={i} isVisible={isVisible} />
            ))}
          </div>
        </motion.div>

        {/* Cosmetic Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className={`font-serif-display text-2xl lg:text-3xl font-semibold text-foreground mb-8 ${getAlignClass("services_cosmetic_heading")}`}
            dangerouslySetInnerHTML={{ __html: cosmeticHeading }} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cosmeticServices.map((s, i) => (
              <ServiceCard key={s.title} title={s.title} img={s.img} slug={s.slug} index={i + 4} isVisible={isVisible} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
