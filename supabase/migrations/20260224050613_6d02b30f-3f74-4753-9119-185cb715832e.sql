
-- Google reviews table
CREATE TABLE public.google_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  review_id TEXT UNIQUE,
  author_name TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  text TEXT NOT NULL DEFAULT '',
  profile_photo_url TEXT,
  relative_time TEXT,
  review_time BIGINT,
  is_displayed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.google_reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can view displayed reviews (for homepage)
CREATE POLICY "Anyone can view displayed reviews"
  ON public.google_reviews FOR SELECT
  USING (is_displayed = true);

-- Admin can manage all reviews
CREATE POLICY "Admin can manage google reviews"
  ON public.google_reviews FOR ALL
  USING ((auth.jwt() ->> 'email'::text) = 'bbm.genai@gmail.com'::text)
  WITH CHECK ((auth.jwt() ->> 'email'::text) = 'bbm.genai@gmail.com'::text);

-- Add Google API settings
INSERT INTO public.site_settings (key, value, label) VALUES
  ('GOOGLE_PLACES_API_KEY', '', 'Google Places API Key'),
  ('GOOGLE_PLACE_ID', '', 'Google Place ID');
