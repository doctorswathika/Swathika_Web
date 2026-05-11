-- 1) Create new admin user (email pre-confirmed) if not exists
DO $$
DECLARE
  new_admin_id uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'doctorswathika@gmail.com') THEN
    new_admin_id := gen_random_uuid();
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, created_at, updated_at,
      raw_app_meta_data, raw_user_meta_data, is_super_admin, confirmation_token,
      email_change, email_change_token_new, recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      new_admin_id,
      'authenticated','authenticated',
      'doctorswathika@gmail.com',
      crypt('Sw@thika-Admin-2026!Xq7', gen_salt('bf')),
      now(), now(), now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{}'::jsonb,
      false, '', '', '', ''
    );
    INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
    VALUES (gen_random_uuid(), new_admin_id,
      jsonb_build_object('sub', new_admin_id::text, 'email', 'doctorswathika@gmail.com', 'email_verified', true),
      'email', new_admin_id::text, now(), now(), now());
  END IF;
END $$;

-- 2) Replace RLS policies on all admin-managed tables
-- blog_posts
DROP POLICY IF EXISTS "Admin can manage blog posts" ON public.blog_posts;
CREATE POLICY "Admin can manage blog posts" ON public.blog_posts
  FOR ALL USING ((auth.jwt() ->> 'email') = 'doctorswathika@gmail.com')
  WITH CHECK ((auth.jwt() ->> 'email') = 'doctorswathika@gmail.com');

-- blog_comments
DROP POLICY IF EXISTS "Admin can delete comments" ON public.blog_comments;
CREATE POLICY "Admin can delete comments" ON public.blog_comments
  FOR DELETE USING ((auth.jwt() ->> 'email') = 'doctorswathika@gmail.com');

-- bookings
DROP POLICY IF EXISTS "Admin can manage bookings" ON public.bookings;
CREATE POLICY "Admin can manage bookings" ON public.bookings
  FOR ALL USING ((auth.jwt() ->> 'email') = 'doctorswathika@gmail.com')
  WITH CHECK ((auth.jwt() ->> 'email') = 'doctorswathika@gmail.com');

-- google_reviews
DROP POLICY IF EXISTS "Admin can manage google reviews" ON public.google_reviews;
CREATE POLICY "Admin can manage google reviews" ON public.google_reviews
  FOR ALL USING ((auth.jwt() ->> 'email') = 'doctorswathika@gmail.com')
  WITH CHECK ((auth.jwt() ->> 'email') = 'doctorswathika@gmail.com');

-- site_content
DROP POLICY IF EXISTS "Admin can manage site content" ON public.site_content;
CREATE POLICY "Admin can manage site content" ON public.site_content
  FOR ALL USING ((auth.jwt() ->> 'email') = 'doctorswathika@gmail.com')
  WITH CHECK ((auth.jwt() ->> 'email') = 'doctorswathika@gmail.com');

-- testimonials
DROP POLICY IF EXISTS "Admin can manage testimonials" ON public.testimonials;
CREATE POLICY "Admin can manage testimonials" ON public.testimonials
  FOR ALL USING ((auth.jwt() ->> 'email') = 'doctorswathika@gmail.com')
  WITH CHECK ((auth.jwt() ->> 'email') = 'doctorswathika@gmail.com');

-- 3) Remove the previous admin user
DELETE FROM auth.users WHERE email = 'bbm.genai@gmail.com';