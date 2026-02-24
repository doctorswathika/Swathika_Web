import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ContentEntry {
  content: string;
  alignment: string;
}

type SiteContentMap = Record<string, ContentEntry>;

let cachedContent: SiteContentMap | null = null;
let fetchPromise: Promise<SiteContentMap> | null = null;

async function fetchAllContent(): Promise<SiteContentMap> {
  const { data } = await supabase.from("site_content").select("section_key, content, alignment");
  const map: SiteContentMap = {};
  if (data) {
    data.forEach((row) => {
      map[row.section_key] = { content: row.content, alignment: row.alignment };
    });
  }
  return map;
}

/**
 * Fetches all site_content rows once (cached across components).
 * Returns helpers to get content and alignment classes by section_key.
 */
export function useSiteContent() {
  const [content, setContent] = useState<SiteContentMap>(cachedContent ?? {});
  const [loading, setLoading] = useState(!cachedContent);

  useEffect(() => {
    let isMounted = true;

    if (!fetchPromise) {
      fetchPromise = fetchAllContent().finally(() => {
        fetchPromise = null;
      });
    }

    fetchPromise
      .then((map) => {
        cachedContent = map;
        if (isMounted) {
          setContent(map);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  /** Get content string for a key, with optional fallback */
  const getText = (key: string, fallback: string = ""): string =>
    content[key]?.content || fallback;

  /** Get Tailwind text-align class for a key */
  const getAlignClass = (key: string): string => {
    const a = content[key]?.alignment ?? "left";
    return a === "center" ? "text-center" : a === "right" ? "text-right" : "text-left";
  };

  return { content, loading, getText, getAlignClass };
}
