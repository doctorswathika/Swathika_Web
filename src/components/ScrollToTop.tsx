import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Fire a GA4 page_view on every client-side navigation
    trackPageView(pathname, document.title);
  }, [pathname]);

  return null;
}
