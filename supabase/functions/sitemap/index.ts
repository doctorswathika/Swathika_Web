// Dynamic XML sitemap. Includes all static routes + every published blog post.
// Public endpoint — no auth required.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const SITE = "https://drswathikarajendran.com";

const STATIC_ROUTES: { loc: string; changefreq: string; priority: string }[] = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/about", changefreq: "monthly", priority: "0.9" },
  { loc: "/blog", changefreq: "daily", priority: "0.9" },
  { loc: "/book-consultation", changefreq: "monthly", priority: "0.8" },
  { loc: "/services/mastectomy", changefreq: "monthly", priority: "0.8" },
  { loc: "/services/breast-conserving-oncoplastic", changefreq: "monthly", priority: "0.8" },
  { loc: "/services/oncoplastic-surgery", changefreq: "monthly", priority: "0.8" },
  { loc: "/services/sentinel-node-biopsy", changefreq: "monthly", priority: "0.7" },
  { loc: "/services/axillary-node", changefreq: "monthly", priority: "0.7" },
  { loc: "/services/breast-reduction-augmentation", changefreq: "monthly", priority: "0.8" },
  { loc: "/services/lipomodelling", changefreq: "monthly", priority: "0.7" },
  { loc: "/services/implant-reconstruction", changefreq: "monthly", priority: "0.8" },
  { loc: "/services/gynaecomastia-correction", changefreq: "monthly", priority: "0.7" },
];

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

Deno.serve(async () => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
    );

    const { data: posts } = await supabase
      .from("blog_posts")
      .select("slug, updated_at, created_at")
      .eq("published", true)
      .order("updated_at", { ascending: false });

    const now = new Date().toISOString();

    const urls: string[] = [];

    for (const r of STATIC_ROUTES) {
      urls.push(
        `<url><loc>${SITE}${r.loc}</loc><lastmod>${now}</lastmod><changefreq>${r.changefreq}</changefreq><priority>${r.priority}</priority></url>`,
      );
    }

    for (const p of posts ?? []) {
      const lastmod = (p.updated_at ?? p.created_at ?? now);
      urls.push(
        `<url><loc>${SITE}/blog/${escape(p.slug)}</loc><lastmod>${new Date(lastmod).toISOString()}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`,
      );
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

    return new Response(xml, {
      headers: {
        "content-type": "application/xml; charset=utf-8",
        "cache-control": "public, max-age=600, s-maxage=3600",
      },
    });
  } catch (err) {
    return new Response(`error: ${(err as Error).message}`, { status: 500 });
  }
});
