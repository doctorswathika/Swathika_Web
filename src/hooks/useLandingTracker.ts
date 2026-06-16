/**
 * useLandingTracker.ts
 *
 * Fires trackLanding() exactly once per browser session.
 * Uses sessionStorage so navigating between pages within the same visit
 * does NOT re-fire — only brand-new sessions trigger it.
 *
 * Usage: call useLandingTracker() inside App.tsx (or any top-level component).
 */

import { useEffect } from "react";
import { trackLanding } from "@/lib/analytics";

const SESSION_KEY = "dr_swathika_landing_tracked";

export function useLandingTracker() {
  useEffect(() => {
    // Already tracked this session — skip
    if (sessionStorage.getItem(SESSION_KEY)) return;

    trackLanding();
    sessionStorage.setItem(SESSION_KEY, "1");
  }, []); // empty deps = runs once on mount
}
