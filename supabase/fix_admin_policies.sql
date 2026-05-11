-- Revert Admin RLS Policies to use email check instead of a hardcoded UID
-- This prevents 403 Forbidden errors if the admin user's UID changes.

-- public.google_reviews
DROP POLICY IF EXISTS "Admin can manage google reviews" ON public.google_reviews;
CREATE POLICY "Admin can manage google reviews" ON public.google_reviews FOR ALL 
USING ((auth.jwt() ->> 'email'::text) = 'doctorswathika@gmail.com'::text) 
WITH CHECK ((auth.jwt() ->> 'email'::text) = 'doctorswathika@gmail.com'::text);

-- public.testimonials
DROP POLICY IF EXISTS "Admin can manage testimonials" ON public.testimonials;
CREATE POLICY "Admin can manage testimonials" ON public.testimonials FOR ALL 
USING ((auth.jwt() ->> 'email'::text) = 'doctorswathika@gmail.com'::text) 
WITH CHECK ((auth.jwt() ->> 'email'::text) = 'doctorswathika@gmail.com'::text);

-- public.bookings
DROP POLICY IF EXISTS "Admin can manage bookings" ON public.bookings;
CREATE POLICY "Admin can manage bookings" ON public.bookings FOR ALL 
USING ((auth.jwt() ->> 'email'::text) = 'doctorswathika@gmail.com'::text) 
WITH CHECK ((auth.jwt() ->> 'email'::text) = 'doctorswathika@gmail.com'::text);

-- public.site_content
DROP POLICY IF EXISTS "Admin can manage site content" ON public.site_content;
CREATE POLICY "Admin can manage site content" ON public.site_content FOR ALL 
USING ((auth.jwt() ->> 'email'::text) = 'doctorswathika@gmail.com'::text) 
WITH CHECK ((auth.jwt() ->> 'email'::text) = 'doctorswathika@gmail.com'::text);

-- public.blog_posts
DROP POLICY IF EXISTS "Admin can manage blog posts" ON public.blog_posts;
CREATE POLICY "Admin can manage blog posts" ON public.blog_posts FOR ALL 
USING ((auth.jwt() ->> 'email'::text) = 'doctorswathika@gmail.com'::text) 
WITH CHECK ((auth.jwt() ->> 'email'::text) = 'doctorswathika@gmail.com'::text);

-- public.blog_comments
DROP POLICY IF EXISTS "Admin can delete comments" ON public.blog_comments;
CREATE POLICY "Admin can delete comments" ON public.blog_comments FOR DELETE 
USING ((auth.jwt() ->> 'email'::text) = 'doctorswathika@gmail.com'::text);

-- storage.objects (blog-images)
DROP POLICY IF EXISTS "Admin can upload blog images" ON storage.objects;
CREATE POLICY "Admin can upload blog images" ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'blog-images' AND (auth.jwt() ->> 'email'::text) = 'doctorswathika@gmail.com'::text);

DROP POLICY IF EXISTS "Admin can update blog images" ON storage.objects;
CREATE POLICY "Admin can update blog images" ON storage.objects FOR UPDATE 
USING (bucket_id = 'blog-images' AND (auth.jwt() ->> 'email'::text) = 'doctorswathika@gmail.com'::text);

DROP POLICY IF EXISTS "Admin can delete blog images" ON storage.objects;
CREATE POLICY "Admin can delete blog images" ON storage.objects FOR DELETE 
USING (bucket_id = 'blog-images' AND (auth.jwt() ->> 'email'::text) = 'doctorswathika@gmail.com'::text);
