
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT auth.uid() = 'b0597f26-c6a1-45ee-80c3-d8e9defeb9c0'::uuid;
$$;

-- google_reviews
DROP POLICY IF EXISTS "Admin can manage google reviews" ON public.google_reviews;
CREATE POLICY "Admin can manage google reviews" ON public.google_reviews FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- testimonials
DROP POLICY IF EXISTS "Admin can manage testimonials" ON public.testimonials;
CREATE POLICY "Admin can manage testimonials" ON public.testimonials FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- bookings
DROP POLICY IF EXISTS "Admin can manage bookings" ON public.bookings;
CREATE POLICY "Admin can manage bookings" ON public.bookings FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- site_content
DROP POLICY IF EXISTS "Admin can manage site content" ON public.site_content;
CREATE POLICY "Admin can manage site content" ON public.site_content FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- blog_posts
DROP POLICY IF EXISTS "Admin can manage blog posts" ON public.blog_posts;
CREATE POLICY "Admin can manage blog posts" ON public.blog_posts FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- blog_comments
DROP POLICY IF EXISTS "Admin can delete comments" ON public.blog_comments;
CREATE POLICY "Admin can delete comments" ON public.blog_comments FOR DELETE TO authenticated USING (public.is_admin());

-- storage.objects (blog-images bucket)
DROP POLICY IF EXISTS "Admin can upload blog images" ON storage.objects;
CREATE POLICY "Admin can upload blog images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'blog-images' AND public.is_admin());

DROP POLICY IF EXISTS "Admin can update blog images" ON storage.objects;
CREATE POLICY "Admin can update blog images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'blog-images' AND public.is_admin());

DROP POLICY IF EXISTS "Admin can delete blog images" ON storage.objects;
CREATE POLICY "Admin can delete blog images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'blog-images' AND public.is_admin());
