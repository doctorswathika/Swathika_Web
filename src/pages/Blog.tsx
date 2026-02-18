import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";

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
        <title>Blog — Dr. Swathika Rajendran</title>
        <meta name="description" content="Read articles on breast health, oncoplastic surgery, and patient recovery by Dr. Swathika Rajendran." />
        <link rel="canonical" href="https://drswathika.com/blog" />
      </Helmet>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans-body">Blog</p>
            </div>
            <h1 className="font-serif-display text-4xl lg:text-5xl font-semibold text-foreground">
              All <span className="text-gradient-rose italic">Articles</span>
            </h1>
            <div className="w-24 h-[2px] mx-auto mt-6 gradient-rose-gold" />
          </motion.div>

          {/* Filters */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap items-center justify-center gap-2 mb-12">
            <Filter className="w-4 h-4 text-muted-foreground mr-1" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-sans-body tracking-wide uppercase transition-all ${
                  filter === cat
                    ? "gradient-rose-gold text-foreground font-medium"
                    : "bg-muted/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Posts grid */}
          {loading ? (
            <p className="text-center text-muted-foreground font-sans-body">Loading...</p>
          ) : posts.length === 0 ? (
            <p className="text-center text-muted-foreground font-sans-body py-16">No articles found.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  className="group glass rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
                >
                  {post.image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-6">
                    <Badge variant="secondary" className="text-xs mb-3">{post.category}</Badge>
                    <h2 className="font-serif-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground font-sans-body leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-xs text-muted-foreground font-sans-body">
                        {new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · {post.read_time}
                      </span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
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
