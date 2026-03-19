
-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  image_url TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  author TEXT NOT NULL DEFAULT 'Dr. Swathika Rajendran',
  read_time TEXT DEFAULT '5 min read',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog_comments table
CREATE TABLE public.blog_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id UUID NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

-- Blog posts: anyone can read published posts
CREATE POLICY "Anyone can view published blog posts"
ON public.blog_posts FOR SELECT
USING (published = true);

-- Admin can do everything with blog posts (service role bypasses RLS)
-- For admin auth users, allow full access
CREATE POLICY "Admin can manage blog posts"
ON public.blog_posts FOR ALL
USING (auth.jwt() ->> 'email' = 'bbm.genai@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'bbm.genai@gmail.com');

-- Comments: anyone can read
CREATE POLICY "Anyone can view comments"
ON public.blog_comments FOR SELECT
USING (true);

-- Anyone can add comments (no auth required)
CREATE POLICY "Anyone can add comments"
ON public.blog_comments FOR INSERT
WITH CHECK (true);

-- Admin can delete comments
CREATE POLICY "Admin can delete comments"
ON public.blog_comments FOR DELETE
USING (auth.jwt() ->> 'email' = 'bbm.genai@gmail.com');

-- Update trigger for blog_posts
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);

-- Storage policies for blog images
CREATE POLICY "Anyone can view blog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

CREATE POLICY "Admin can upload blog images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'blog-images' AND auth.jwt() ->> 'email' = 'bbm.genai@gmail.com');

CREATE POLICY "Admin can update blog images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'blog-images' AND auth.jwt() ->> 'email' = 'bbm.genai@gmail.com');

CREATE POLICY "Admin can delete blog images"
ON storage.objects FOR DELETE
USING (bucket_id = 'blog-images' AND auth.jwt() ->> 'email' = 'bbm.genai@gmail.com');

-- Index for faster queries
CREATE INDEX idx_blog_posts_published ON public.blog_posts(published, created_at DESC);
CREATE INDEX idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_comments_post ON public.blog_comments(blog_post_id, created_at DESC);
