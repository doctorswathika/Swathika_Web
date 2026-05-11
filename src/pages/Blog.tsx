import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EASE = [0.22, 1, 0.36, 1] as const;

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string;
  image_url: string | null;
  read_time: string | null;
  created_at: string;
}

const CATEGORIES = ["All", "Awareness", "Procedures", "Recovery", "Education", "General"];

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      let query = supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, category, image_url, read_time, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (filter !== "All") {
        query = query.eq("category", filter);
      }

      const { data } = await query;
      setPosts(data || []);
      setLoading(false);
    };
    setLoading(true);
    fetchPosts();
  }, [filter]);

  return (
    <>
      <Helmet>
        <title>Breast Health Journal | Dr. Swathika Rajendran — Breast Surgeon Chennai</title>
        <meta
          name="description"
          content="Expert insights on breast cancer, oncoplastic surgery, reconstruction and recovery — by Dr. Swathika Rajendran, UK-trained Breast Oncoplastic Surgeon in Chennai."
        />
        <meta name="keywords" content="breast cancer blog, oncoplastic surgery, breast reconstruction, breast health Chennai, Dr Swathika Rajendran" />
        <link rel="canonical" href="https://drswathika.com/blog" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Breast Health Journal | Dr. Swathika Rajendran" />
        <meta property="og:url" content="https://drswathika.com/blog" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Dr. Swathika Rajendran — Breast Health Journal",
          "url": "https://drswathika.com/blog",
          "author": { "@type": "Person", "name": "Dr. Swathika Rajendran" },
          "inLanguage": "en"
        })}</script>
      </Helmet>
      <Navbar />
      <main className="pt-28 lg:pt-36 pb-24 min-h-screen bg-background">
        <div className="max-w-[88rem] mx-auto px-6 lg:px-10">
          {/* Editorial header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
            className="grid lg:grid-cols-12 gap-10 mb-16 lg:mb-24 items-end"
          >
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-foreground/40" />
                <p className="text-[10px] tracking-[0.45em] uppercase text-muted-foreground font-sans-body">
                  Journal
                </p>
              </div>
              <h1 className="font-serif-display text-[2.75rem] sm:text-5xl lg:text-[4.5rem] font-light leading-[1.02] tracking-[-0.02em] text-foreground">
                All <em className="text-gradient-rose">Articles</em>
              </h1>
            </div>
            <div className="lg:col-span-5 lg:pl-10 lg:border-l lg:border-border/60 lg:pb-3">
              <p className="text-[15px] text-muted-foreground font-sans-body font-light leading-[1.9]">
                Quiet, careful writing on breast health, recovery and the questions that matter most — for the
                women who read between the lines.
              </p>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="flex flex-wrap items-center gap-x-7 gap-y-3 mb-16 pb-6 border-b border-border/60"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`relative text-[11px] font-sans-body tracking-[0.3em] uppercase transition-colors duration-500 pb-1 ${
                  filter === cat
                    ? "text-foreground"
                    : "text-muted-foreground/70 hover:text-foreground"
                }`}
              >
                {cat}
                <span
                  className={`absolute left-0 right-0 -bottom-[1.6rem] h-px bg-foreground transition-all duration-500 ${
                    filter === cat ? "opacity-100" : "opacity-0"
                  }`}
                />
              </button>
            ))}
          </motion.div>

          {/* Posts grid */}
          {loading ? (
            <p className="text-center text-muted-foreground font-sans-body font-light py-16">
              Loading...
            </p>
          ) : posts.length === 0 ? (
            <p className="text-center text-muted-foreground font-sans-body font-light py-16">
              No articles found.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
              {posts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: i * 0.05, ease: EASE }}
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  className="group cursor-pointer flex flex-col"
                >
                  {post.image_url && (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] mb-6">
                      <motion.img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.04 }}
                        whileHover={{ scale: 1.07 }}
                        transition={{ duration: 1.2, ease: EASE }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  )}
                  <div className="flex flex-col flex-1 space-y-3">
                    <p className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground font-sans-body">
                      {post.category} ·{" "}
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <h2 className="font-serif-display text-[1.35rem] lg:text-[1.5rem] font-light text-foreground leading-[1.2] tracking-[-0.005em] group-hover:text-primary/90 transition-colors duration-500 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-[14.5px] text-muted-foreground font-sans-body font-light leading-[1.85] line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 pt-2 text-[11px] tracking-[0.3em] uppercase text-foreground/70 font-sans-body group-hover:text-foreground transition-colors">
                      Read · {post.read_time}
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
