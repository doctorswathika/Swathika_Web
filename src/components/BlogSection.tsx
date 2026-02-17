import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { BookOpen, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "Understanding Breast Cancer: Early Detection Saves Lives",
    excerpt: "Learn about the importance of regular screening and self-examination in catching breast cancer at its earliest, most treatable stage.",
    date: "Feb 10, 2026",
    readTime: "5 min read",
    category: "Awareness",
  },
  {
    title: "Oncoplastic Surgery: Combining Cancer Treatment with Aesthetics",
    excerpt: "How modern oncoplastic techniques allow surgeons to remove cancer while preserving the natural appearance of the breast.",
    date: "Jan 28, 2026",
    readTime: "7 min read",
    category: "Procedures",
  },
  {
    title: "Life After Mastectomy: Reconstruction Options Explained",
    excerpt: "A comprehensive guide to breast reconstruction options available after mastectomy, from implants to autologous tissue transfer.",
    date: "Jan 15, 2026",
    readTime: "6 min read",
    category: "Recovery",
  },
  {
    title: "Gynaecomastia: Breaking the Stigma Around Male Breast Conditions",
    excerpt: "Understanding the causes, treatment options, and emotional impact of gynaecomastia in men of all ages.",
    date: "Dec 30, 2025",
    readTime: "4 min read",
    category: "Education",
  },
];

export default function BlogSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="blog" className="py-24 lg:py-32 bg-background relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans-body">Blog</p>
          </div>
          <h2 className="font-serif-display text-4xl lg:text-5xl font-semibold text-foreground">
            Insights & <span className="text-gradient-rose italic">Articles</span>
          </h2>
          <div className="w-24 h-[2px] mx-auto mt-6 gradient-rose-gold" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group glass rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <div>
                <span className="inline-block px-2.5 py-1 rounded-full bg-primary/10 text-xs font-sans-body text-primary tracking-wide uppercase mb-3">
                  {post.category}
                </span>
                <h3 className="font-serif-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground font-sans-body leading-relaxed line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="text-xs text-muted-foreground font-sans-body">
                  <span>{post.date}</span> · <span>{post.readTime}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
