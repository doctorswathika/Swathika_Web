-- Update Admin RLS Policies to use new Admin ID
-- public.google_reviews
DROP POLICY IF EXISTS "Admin can manage google reviews" ON public.google_reviews;
CREATE POLICY "Admin can manage google reviews" ON public.google_reviews FOR ALL USING (auth.uid() = '6c699a7c-d104-41fb-b26f-b93ee25245e3') WITH CHECK (auth.uid() = '6c699a7c-d104-41fb-b26f-b93ee25245e3');

-- public.testimonials
DROP POLICY IF EXISTS "Admin can manage testimonials" ON public.testimonials;
CREATE POLICY "Admin can manage testimonials" ON public.testimonials FOR ALL USING (auth.uid() = '6c699a7c-d104-41fb-b26f-b93ee25245e3') WITH CHECK (auth.uid() = '6c699a7c-d104-41fb-b26f-b93ee25245e3');

-- public.bookings
DROP POLICY IF EXISTS "Admin can manage bookings" ON public.bookings;
CREATE POLICY "Admin can manage bookings" ON public.bookings FOR ALL USING (auth.uid() = '6c699a7c-d104-41fb-b26f-b93ee25245e3') WITH CHECK (auth.uid() = '6c699a7c-d104-41fb-b26f-b93ee25245e3');

-- public.site_content
DROP POLICY IF EXISTS "Admin can manage site content" ON public.site_content;
CREATE POLICY "Admin can manage site content" ON public.site_content FOR ALL USING (auth.uid() = '6c699a7c-d104-41fb-b26f-b93ee25245e3') WITH CHECK (auth.uid() = '6c699a7c-d104-41fb-b26f-b93ee25245e3');

-- public.blog_posts
DROP POLICY IF EXISTS "Admin can manage blog posts" ON public.blog_posts;
CREATE POLICY "Admin can manage blog posts" ON public.blog_posts FOR ALL USING (auth.uid() = '6c699a7c-d104-41fb-b26f-b93ee25245e3') WITH CHECK (auth.uid() = '6c699a7c-d104-41fb-b26f-b93ee25245e3');

-- public.blog_comments
DROP POLICY IF EXISTS "Admin can delete comments" ON public.blog_comments;
CREATE POLICY "Admin can delete comments" ON public.blog_comments FOR DELETE USING (auth.uid() = '6c699a7c-d104-41fb-b26f-b93ee25245e3');

-- storage.objects
DROP POLICY IF EXISTS "Admin can upload blog images" ON storage.objects;
CREATE POLICY "Admin can upload blog images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'blog-images' AND auth.uid() = '6c699a7c-d104-41fb-b26f-b93ee25245e3');

DROP POLICY IF EXISTS "Admin can update blog images" ON storage.objects;
CREATE POLICY "Admin can update blog images" ON storage.objects FOR UPDATE USING (bucket_id = 'blog-images' AND auth.uid() = '6c699a7c-d104-41fb-b26f-b93ee25245e3');

DROP POLICY IF EXISTS "Admin can delete blog images" ON storage.objects;
CREATE POLICY "Admin can delete blog images" ON storage.objects FOR DELETE USING (bucket_id = 'blog-images' AND auth.uid() = '6c699a7c-d104-41fb-b26f-b93ee25245e3');
