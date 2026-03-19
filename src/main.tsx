// Preload hero image with correct bundled URL
import heroImg from "@/assets/dr-swathika-hero.jpeg";
const preloadLink = document.createElement("link");
preloadLink.rel = "preload";
preloadLink.as = "image";
preloadLink.href = heroImg;
preloadLink.setAttribute("fetchpriority", "high");
document.head.appendChild(preloadLink);

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PROXY_PREFIX = "/__backend_proxy";

const rewriteToProxyPath = (urlValue: string) => {
  if (!import.meta.env.DEV || !SUPABASE_URL) return urlValue;

  try {
    const parsedUrl = new URL(urlValue, window.location.origin);
    const supabaseOrigin = new URL(SUPABASE_URL).origin;

    if (parsedUrl.origin !== supabaseOrigin) return urlValue;

    return `${SUPABASE_PROXY_PREFIX}${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`;
  } catch {
    return urlValue;
  }
};

const installSupabaseProxyRewrite = () => {
  if (!import.meta.env.DEV || typeof window === "undefined") return;

  const runtimeWindow = window as Window & { __supabaseProxyRewriteInstalled?: boolean };
  if (runtimeWindow.__supabaseProxyRewriteInstalled) return;

  const originalFetch = window.fetch.bind(window);
  window.fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
    if (typeof input === "string") {
      return originalFetch(rewriteToProxyPath(input), init);
    }

    if (input instanceof URL) {
      return originalFetch(rewriteToProxyPath(input.toString()), init);
    }

    const rewrittenUrl = rewriteToProxyPath(input.url);
    if (rewrittenUrl !== input.url) {
      return originalFetch(new Request(rewrittenUrl, input), init);
    }

    return originalFetch(input, init);
  }) as typeof window.fetch;

  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method: string, url: string | URL, ...rest: any[]) {
    const rewrittenUrl = rewriteToProxyPath(String(url));
    return originalOpen.call(this, method, rewrittenUrl, ...rest);
  };

  runtimeWindow.__supabaseProxyRewriteInstalled = true;
};

installSupabaseProxyRewrite();

createRoot(document.getElementById("root")!).render(<App />);
