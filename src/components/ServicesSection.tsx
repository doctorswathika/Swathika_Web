import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

import mastectomyImg from "@/assets/services/mastectomy.jpg";
import breastConservingImg from "@/assets/services/breast-conserving.jpg";
import sentinelNodeImg from "@/assets/services/sentinel-node.jpg";
import reductionAugmentationImg from "@/assets/services/reduction-augmentation.jpg";
import lipomodellingImg from "@/assets/services/lipomodelling.jpg";
import implantReconstructionImg from "@/assets/services/implant-reconstruction.jpg";
import gynaecomastiaImg from "@/assets/services/gynaecomastia.jpg";
import axillaryNodeImg from "@/assets/services/axillary-node.jpg";

const EASE = [0.22, 1, 0.36, 1] as const;

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

function ServiceCard({
  title,
  img,
  slug,
  index,
  isVisible,
}: {
  title: string;
  img: string;
  slug: string;
  index: number;
  isVisible: boolean;
}) {
  return (
    <Link to={`/services/${slug}`} onClick={() => window.scrollTo(0, 0)} className="group block">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.08 + index * 0.07, ease: EASE }}
        className="relative h-full flex flex-col"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-card">
          <motion.img
            src={img}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
            initial={{ scale: 1.04 }}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 1.4, ease: EASE }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/25 to-transparent" />
          {/* Top corner arrow */}
          <div className="absolute top-4 right-4 text-white">
            <ArrowUpRight className="w-4 h-4 opacity-90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" />
          </div>
          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
            <h3 className="font-serif-display text-[1.25rem] lg:text-[1.5rem] font-semibold leading-[1.15] text-white tracking-[-0.005em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]">
              {title}
            </h3>
            <span className="block mt-3 h-px w-8 bg-white/80 group-hover:w-16 transition-all duration-500" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { getText, getAlignClass } = useSiteContent();

  const subtitle = getText("services_subtitle", "Our Services");
  const title = getText(
    "services_title",
    'Signature <span class="text-gradient-rose italic">Treatments</span>',
  );

  return (
    <section
      id="services"
      className="relative py-28 lg:py-44 bg-background overflow-hidden"
      ref={ref}
    >
      <div className="max-w-[88rem] mx-auto px-6 lg:px-10">
        {/* Editorial header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: EASE }}
          className="mb-20 lg:mb-28"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-foreground/40" />
            <p
              className={`text-[10px] tracking-[0.45em] uppercase text-muted-foreground font-sans-body ${getAlignClass(
                "services_subtitle",
              )}`}
              dangerouslySetInnerHTML={{ __html: subtitle }}
            />
          </div>
          <h2
            className={`font-serif-display text-[2.75rem] sm:text-5xl lg:text-[4.25rem] font-light leading-[1.02] tracking-[-0.02em] text-foreground ${getAlignClass(
              "services_title",
            )}`}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </motion.div>

        {/* Clinical */}
        <div className="mb-12 lg:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-sm tracking-[0.2em] uppercase text-foreground font-sans-body font-bold mb-8"
          >
            Clinical
          </motion.p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {clinicalServices.map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i} isVisible={isVisible} />
            ))}
          </div>
        </div>

        {/* Cosmetic */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="text-sm tracking-[0.2em] uppercase text-foreground font-sans-body font-bold mb-8"
          >
            Cosmetic
          </motion.p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {cosmeticServices.map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i + 4} isVisible={isVisible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
