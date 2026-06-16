import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { trackPageView } from "@/lib/analytics";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Report the broken URL to GA4 as a custom event
    trackPageView(location.pathname, `404 — ${location.pathname}`);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
