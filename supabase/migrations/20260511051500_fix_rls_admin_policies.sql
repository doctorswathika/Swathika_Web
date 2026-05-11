-- ============================================================
-- Fix: RLS admin policies for blog_posts and google_reviews
-- Root cause: is_admin() was checking a hardcoded UUID that
-- may no longer match the current admin user's auth.uid().
-- Solution: Check email in auth.users (SECURITY DEFINER),
-- with a fallback to JWT email claim for maximum compatibility.
-- ============================================================

-- Step 1: Rebuild is_admin() to check BOTH auth.uid()->email
-- AND the raw JWT email claim as a fallback.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT (
    -- Primary: look up the current user's email in auth.users
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
        AND lower(email) = 'doctorswathika@gmail.com'
    )
    OR
    -- Fallback: check JWT email claim directly (works even if uid mismatch)
    lower(auth.jwt() ->> 'email') = 'doctorswathika@gmail.com'
  );
$$;

-- Step 2: Reapply all admin RLS policies using the fixed is_admin()

-- blog_posts
DROP POLICY IF EXISTS "Admin can manage blog posts" ON public.blog_posts;
CREATE POLICY "Admin can manage blog posts"
  ON public.blog_posts FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- blog_comments
DROP POLICY IF EXISTS "Admin can delete comments" ON public.blog_comments;
CREATE POLICY "Admin can delete comments"
  ON public.blog_comments FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- google_reviews
DROP POLICY IF EXISTS "Admin can manage google reviews" ON public.google_reviews;
CREATE POLICY "Admin can manage google reviews"
  ON public.google_reviews FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- bookings
DROP POLICY IF EXISTS "Admin can manage bookings" ON public.bookings;
CREATE POLICY "Admin can manage bookings"
  ON public.bookings FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Step 3: Also ensure the public read policies exist (they may have been lost)
-- blog_posts: anyone can read published posts
DROP POLICY IF EXISTS "Anyone can view published blog posts" ON public.blog_posts;
CREATE POLICY "Anyone can view published blog posts"
  ON public.blog_posts FOR SELECT
  USING (published = true);

-- blog_comments: anyone can read
DROP POLICY IF EXISTS "Anyone can view comments" ON public.blog_comments;
CREATE POLICY "Anyone can view comments"
  ON public.blog_comments FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Anyone can add comments" ON public.blog_comments;
CREATE POLICY "Anyone can add comments"
  ON public.blog_comments FOR INSERT
  WITH CHECK (true);

-- google_reviews: anyone can read
DROP POLICY IF EXISTS "Anyone can view google reviews" ON public.google_reviews;
CREATE POLICY "Anyone can view google reviews"
  ON public.google_reviews FOR SELECT
  USING (true);

-- bookings: anyone can insert (to book an appointment)
DROP POLICY IF EXISTS "Anyone can create a booking" ON public.bookings;
CREATE POLICY "Anyone can create a booking"
  ON public.bookings FOR INSERT
  WITH CHECK (true);

-- Step 4: Storage policies for blog-images bucket
DROP POLICY IF EXISTS "Admin can upload blog images" ON storage.objects;
CREATE POLICY "Admin can upload blog images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'blog-images' AND public.is_admin());

DROP POLICY IF EXISTS "Admin can update blog images" ON storage.objects;
CREATE POLICY "Admin can update blog images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'blog-images' AND public.is_admin());

DROP POLICY IF EXISTS "Admin can delete blog images" ON storage.objects;
CREATE POLICY "Admin can delete blog images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'blog-images' AND public.is_admin());
