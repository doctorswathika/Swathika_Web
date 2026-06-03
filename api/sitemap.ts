import { createClient } from "@supabase/supabase-js";

const SITE = "https://drswathikarajendran.com";

const STATIC_ROUTES = [
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

export default async function handler(req: any, res: any) {
  try {
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase environment variables on Vercel.");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

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

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=600, s-maxage=3600");
    res.status(200).send(xml);
  } catch (err: any) {
    res.status(500).send(`error: ${err.message}`);
  }
}
