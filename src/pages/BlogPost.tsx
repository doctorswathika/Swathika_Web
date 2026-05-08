import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Calendar, Clock, MessageCircle, Send, Trash2, ArrowRight, Sparkles } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { User } from "@supabase/supabase-js";

function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[80] gradient-rose-gold"
    />
  );
}

interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string;
  image_url: string | null;
  author: string;
  read_time: string | null;
  created_at: string;
}

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  const isAdmin = user?.id === "6c699a7c-d104-41fb-b26f-b93ee25245e3";

  useEffect(() => {
    if (!slug) return;
    const fetchPost = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();
      setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  const fetchComments = async () => {
    if (!post) return;
    const { data } = await supabase
      .from("blog_comments")
      .select("*")
      .eq("blog_post_id", post.id)
      .order("created_at", { ascending: false });
    setComments(data || []);
  };

  useEffect(() => { if (post) fetchComments(); }, [post]);

  const handleSubmitComment = async () => {
    if (!commentName.trim() || !commentText.trim() || !post) {
      toast({ title: "Please fill in your name and comment.", variant: "destructive" });
      return;
    }
    if (commentName.trim().length > 100 || commentText.trim().length > 1000) {
      toast({ title: "Name or comment is too long.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("blog_comments").insert({
      blog_post_id: post.id,
      author_name: commentName.trim(),
      content: commentText.trim(),
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setCommentName("");
      setCommentText("");
      toast({ title: "Comment posted!" });
      fetchComments();
    }
    setSubmitting(false);
  };

  const handleDeleteComment = async (id: string) => {
    await supabase.from("blog_comments").delete().eq("id", id);
    fetchComments();
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-background">
          <p className="text-muted-foreground font-sans-body">Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
          <p className="text-muted-foreground font-sans-body text-lg">Blog post not found.</p>
          <Button variant="outline" onClick={() => navigate("/blog")}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} — Dr. Swathika Rajendran</title>
        <meta name="description" content={post.excerpt || post.title} />
        <link rel="canonical" href={`https://drswathika.com/blog/${post.slug}`} />
      </Helmet>
      <Navbar />
      <ReadingProgress />
      <main className="pt-28 pb-20 min-h-screen bg-background">
        <header className="max-w-3xl mx-auto px-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Button variant="ghost" onClick={() => navigate("/blog")} className="mb-10 gap-2 text-muted-foreground -ml-3">
              <ArrowLeft className="w-4 h-4" /> Back to Journal
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px w-10 bg-foreground/40" />
              <p className="text-[11px] tracking-[0.5em] uppercase text-foreground/70 font-sans-body font-medium">
                {post.category}
              </p>
            </div>
            <h1 className="font-serif-display text-[2.5rem] sm:text-5xl lg:text-[3.75rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground mb-8">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="font-serif-display italic text-xl lg:text-2xl text-foreground/75 leading-[1.5] font-light border-l-2 border-[hsl(var(--rose-gold))] pl-6 mb-10">
                {post.excerpt}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-foreground/65 font-sans-body pb-8 border-b border-border/60">
              <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" />{new Date(post.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              {post.read_time && <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" />{post.read_time}</span>}
              <span className="tracking-[0.15em] uppercase text-[11px] text-foreground/55">By {post.author}</span>
            </div>
          </motion.div>
        </header>

        {post.image_url && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl mx-auto px-6 mt-12 mb-14"
          >
            <div className="rounded-[20px] overflow-hidden shadow-luxe">
              <img src={post.image_url} alt={post.title} className="w-full aspect-[16/9] object-cover" />
            </div>
          </motion.div>
        )}

        <article className="max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="prose prose-lg max-w-none font-sans-body text-foreground/90 leading-[1.85] [&_p]:text-[17px] [&_p]:font-light [&_h1]:font-serif-display [&_h2]:font-serif-display [&_h2]:font-light [&_h2]:text-3xl [&_h2]:mt-12 [&_h2]:mb-5 [&_h3]:font-serif-display [&_h3]:font-light [&_a]:text-primary [&_a]:no-underline [&_a]:border-b [&_a]:border-primary/40 hover:[&_a]:border-primary [&_blockquote]:border-l-2 [&_blockquote]:border-[hsl(var(--rose-gold))] [&_blockquote]:font-serif-display [&_blockquote]:italic [&_blockquote]:text-foreground/80 [&_blockquote]:text-xl [&_img]:rounded-[14px] [&_img]:my-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-20 mb-16 relative overflow-hidden rounded-[22px] border border-border/60 bg-gradient-to-br from-[hsl(340_70%_96%/0.6)] via-background to-[hsl(20_60%_95%/0.5)] p-8 lg:p-10"
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[hsl(340_70%_90%/0.5)] blur-3xl pointer-events-none" />
            <div className="relative flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-background shadow-elegant">
                <img src="/images/dr-swathika-about.jpeg" alt="Dr. Swathika Rajendran" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] tracking-[0.5em] uppercase text-foreground/65 font-sans-body font-medium mb-2">
                  Written by
                </p>
                <h3 className="font-serif-display text-2xl lg:text-[1.75rem] font-light text-foreground tracking-[-0.01em] mb-3">
                  Dr. Swathika Rajendran
                </h3>
                <p className="text-[14.5px] text-foreground/75 font-sans-body font-light leading-[1.75] mb-5 max-w-xl">
                  UK-trained Breast Oncoplastic & Reconstructive Surgeon. Over 700 procedures, blending oncology precision with aesthetic sensibility.
                </p>
                <Link
                  to="/book-consultation"
                  onClick={() => window.scrollTo(0, 0)}
                  className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full gradient-rose-gold font-sans-body font-semibold text-[13px] tracking-[0.05em] text-foreground hover:scale-[1.02] transition-all duration-500 shadow-elegant"
                >
                  <Sparkles className="w-4 h-4" />
                  Schedule a Private Consultation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.aside>

          {/* Comments Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="border-t border-border pt-10"
          >
            <div className="flex items-center gap-2 mb-8">
              <MessageCircle className="w-5 h-5 text-primary" />
              <h2 className="font-serif-display text-2xl font-semibold text-foreground">
                Comments ({comments.length})
              </h2>
            </div>

            {/* Comment form */}
            <div className="glass rounded-2xl p-6 mb-8 space-y-4">
              <Input
                placeholder="Your name"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                maxLength={100}
              />
              <Textarea
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={3}
                maxLength={1000}
              />
              <div className="flex justify-end">
                <Button onClick={handleSubmitComment} disabled={submitting} className="gap-2">
                  <Send className="w-4 h-4" />
                  {submitting ? "Posting..." : "Post Comment"}
                </Button>
              </div>
            </div>

            {/* Comment list */}
            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-muted-foreground font-sans-body text-center py-8">No comments yet. Be the first to comment!</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="glass rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full gradient-rose-gold flex items-center justify-center text-xs font-semibold text-foreground">
                          {comment.author_name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-sans-body font-medium text-sm text-foreground">{comment.author_name}</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            {new Date(comment.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </span>
                        </div>
                      </div>
                      {isAdmin && (
                        <button onClick={() => handleDeleteComment(comment.id)} className="text-destructive hover:text-destructive/80 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <p className="font-sans-body text-sm text-foreground/90 pl-10">{comment.content}</p>
                  </div>
                ))
              )}
            </div>
          </motion.section>
        </article>
      </main>
      <Footer />
    </>
  );
}
