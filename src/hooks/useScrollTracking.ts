/**
 * useScrollTracking.ts
 *
 * Watches elements marked with [data-section] inside a container (default: document.body)
 * and fires a GA4 "section_view" event the FIRST TIME each section becomes 40 % visible.
 *
 * Usage in any page component:
 *   useScrollTracking();          // watches all [data-section] elements on the page
 *
 * Each section element must have a data-section attribute with a human-readable label:
 *   <section data-section="Services"> ... </section>
 */

import { useEffect } from "react";
import { trackSectionView } from "@/lib/analytics";

export function useScrollTracking(threshold = 0.4) {
  useEffect(() => {
    const seen = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const sectionName =
            (entry.target as HTMLElement).dataset.section ?? "Unknown";

          if (seen.has(sectionName)) return; // fire only once per section per page load
          seen.add(sectionName);

          trackSectionView(sectionName);
        });
      },
      { threshold }
    );

    // Observe every element that declares a data-section attribute
    const targets = document.querySelectorAll("[data-section]");
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold]);
}
