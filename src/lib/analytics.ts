/**
 * analytics.ts
 * Centralised GA4 event helpers.
 * Every event fired from this file will appear in GA4 → Reports → Events.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Safely fire a gtag call — no-ops if the script hasn't loaded yet. */
function gtag(...args: unknown[]) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag(...args);
  }
}

// ─── Page tracking ────────────────────────────────────────────────────────────

/**
 * Send a GA4 page_view event.
 * Call this whenever the React Router location changes.
 *
 * @param path  e.g. "/services/mastectomy"
 * @param title document.title at the time of navigation
 */
export function trackPageView(path: string, title: string) {
  gtag("event", "page_view", {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  });
}

// ─── Section / scroll tracking ────────────────────────────────────────────────

/**
 * Send a GA4 custom event when a homepage section enters the viewport.
 *
 * Appears in GA4 as event name: "section_view"
 * with parameters:
 *   section_name  — human-readable label, e.g. "Services"
 *   page_path     — current route, e.g. "/"
 */
export function trackSectionView(sectionName: string) {
  gtag("event", "section_view", {
    section_name: sectionName,
    page_path: window.location.pathname,
  });
}

// ─── CTA / interaction tracking ───────────────────────────────────────────────

/**
 * Track a button / link click that represents a meaningful user action.
 *
 * Appears in GA4 as event name: "cta_click"
 * with parameters:
 *   cta_label  — e.g. "Book Consultation Hero"
 *   page_path  — current route
 */
export function trackCtaClick(label: string) {
  gtag("event", "cta_click", {
    cta_label: label,
    page_path: window.location.pathname,
  });
}

/**
 * Track a form submission (consultation booking, etc.)
 *
 * Appears in GA4 as event name: "form_submit"
 */
export function trackFormSubmit(formName: string) {
  gtag("event", "form_submit", {
    form_name: formName,
    page_path: window.location.pathname,
  });
}

// ─── Service page tracking ─────────────────────────────────────────────────────

/**
 * Fire once when a service page mounts.
 *
 * Appears in GA4 as event name: "service_page_view"
 * with parameters:
 *   service_name      — e.g. "Mastectomy"
 *   service_category  — "Cancer Care" | "Cosmetic"
 *   page_path         — e.g. "/services/mastectomy"
 *
 * In GA4 → Reports → Events → service_page_view
 * then click the event and filter/group by service_name to see
 * a ranked list of the most-visited service pages.
 */
export function trackServiceView(serviceName: string, serviceCategory: string) {
  gtag("event", "service_page_view", {
    service_name: serviceName,
    service_category: serviceCategory,
    page_path: window.location.pathname,
  });
}

// ─── Landing / traffic-source tracking ────────────────────────────────────────

/**
 * Call ONCE per session when the visitor first arrives.
 * Reads UTM parameters and document.referrer to determine where
 * the visitor came from, then fires a GA4 "site_landing" event.
 *
 * Parameters sent to GA4:
 *   traffic_source  — "google" | "instagram" | "youtube" | "linkedin" |
 *                     "whatsapp" | "facebook" | "twitter" | "referral" | "direct"
 *   utm_source      — raw ?utm_source value (or "(none)")
 *   utm_medium      — raw ?utm_medium value (or "(none)")
 *   utm_campaign    — raw ?utm_campaign value (or "(none)")
 *   referrer_url    — full document.referrer (or "(direct)")
 *   landing_page    — the pathname the visitor landed on
 *
 * In GA4 → Reports → Events → site_landing
 * Click the event → group by "traffic_source" to see ranked platforms.
 */
export function trackLanding() {
  const params = new URLSearchParams(window.location.search);
  const utmSource   = params.get("utm_source")   ?? "";
  const utmMedium   = params.get("utm_medium")   ?? "";
  const utmCampaign = params.get("utm_campaign") ?? "";
  const referrer    = document.referrer;

  // Infer platform from UTM source first, then from referrer domain
  const raw = (utmSource || referrer).toLowerCase();
  let trafficSource = "direct";
  if      (raw.includes("google"))    trafficSource = "google";
  else if (raw.includes("instagram")) trafficSource = "instagram";
  else if (raw.includes("youtube"))   trafficSource = "youtube";
  else if (raw.includes("linkedin"))  trafficSource = "linkedin";
  else if (raw.includes("whatsapp"))  trafficSource = "whatsapp";
  else if (raw.includes("facebook") || raw.includes("fb.")) trafficSource = "facebook";
  else if (raw.includes("twitter") || raw.includes("x.com")) trafficSource = "twitter";
  else if (raw)                        trafficSource = "referral";

  gtag("event", "site_landing", {
    traffic_source:  trafficSource,
    utm_source:      utmSource   || "(none)",
    utm_medium:      utmMedium   || "(none)",
    utm_campaign:    utmCampaign || "(none)",
    referrer_url:    referrer    || "(direct)",
    landing_page:    window.location.pathname,
  });
}
