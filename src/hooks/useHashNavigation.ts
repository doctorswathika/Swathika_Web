import { useNavigate, useLocation } from "react-router-dom";
import { useCallback, useEffect } from "react";

/**
 * Centralised smooth-scroll hash navigation.
 * Handles three scenarios:
 *  1. Route link (e.g. /about) → navigate directly
 *  2. Hash link on current page (e.g. #services) → smooth scroll
 *  3. Hash link from another page → navigate to /, then scroll after mount
 */
export function useHashNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  // On mount / route change, scroll to hash if present
  useEffect(() => {
    if (location.hash) {
      const timeout = setTimeout(() => {
        document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [location]);

  const handleNav = useCallback(
    (href: string, isRoute?: boolean) => {
      if (isRoute) {
        navigate(href);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (location.pathname !== "/") {
        // Navigate home with hash — the useEffect above will scroll
        navigate("/" + href);
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [navigate, location.pathname],
  );

  return handleNav;
}
