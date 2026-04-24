import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, MessageCircle, Send, Trash2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import type { User } from "@supabase/supabase-js";

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
      <main className="pt-24 pb-16 min-h-screen bg-background">
        <article className="max-w-3xl mx-auto px-6">
          {/* Back */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Button variant="ghost" onClick={() => navigate("/blog")} className="mb-8 gap-2 text-muted-foreground">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Button>
          </motion.div>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Badge variant="secondary" className="mb-4">{post.category}</Badge>
            <h1 className="font-serif-display text-3xl lg:text-5xl font-semibold text-foreground mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground font-sans-body mb-8">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(post.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.read_time}</span>
              <span>By {post.author}</span>
            </div>
          </motion.div>

          {/* Cover image */}
          {post.image_url && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl overflow-hidden mb-10">
              <img src={post.image_url} alt={post.title} className="w-full aspect-video object-cover" />
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg max-w-none font-sans-body text-foreground leading-relaxed mb-16 [&_h1]:font-serif-display [&_h2]:font-serif-display [&_h3]:font-serif-display [&_a]:text-primary [&_blockquote]:border-l-primary/50 [&_img]:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

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
