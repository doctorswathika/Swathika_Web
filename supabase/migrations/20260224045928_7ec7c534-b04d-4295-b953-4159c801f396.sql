
-- Key-value store for API keys and other settings
CREATE TABLE public.site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  label TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Only authenticated users (admin) can read/write
CREATE POLICY "Authenticated users can read settings"
  ON public.site_settings FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert settings"
  ON public.site_settings FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update settings"
  ON public.site_settings FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Seed the two API key rows
INSERT INTO public.site_settings (key, value, label) VALUES
  ('YOUTUBE_API_KEY', '', 'YouTube Data API v3 Key'),
  ('INSTAGRAM_ACCESS_TOKEN', '', 'Instagram Graph API Token');
