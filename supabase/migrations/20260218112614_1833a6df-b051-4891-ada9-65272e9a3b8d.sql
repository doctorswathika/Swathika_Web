
-- Create site_content table for editable website text
CREATE TABLE public.site_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  section_label TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Anyone can read site content
CREATE POLICY "Anyone can view site content"
ON public.site_content FOR SELECT
USING (true);

-- Admin can manage site content
CREATE POLICY "Admin can manage site content"
ON public.site_content FOR ALL
USING (auth.jwt() ->> 'email' = 'bbm.genai@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'bbm.genai@gmail.com');

CREATE TRIGGER update_site_content_updated_at
BEFORE UPDATE ON public.site_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed with default editable sections
INSERT INTO public.site_content (section_key, section_label, content) VALUES
  ('hero_headline', 'Hero Headline', 'Advanced Breast Surgery with Precision & Compassion'),
  ('hero_subheadline', 'Hero Subheadline', 'UK Trained Breast Oncoplastic & Reconstructive Surgeon'),
  ('about_title', 'About Section Title', 'Meet Dr. Swathika Rajendran'),
  ('about_description', 'About Section Description', 'A UK-trained Breast Oncoplastic & Reconstructive Surgeon based in Chennai with over 700 procedures performed.'),
  ('awareness_title', 'Awareness Section Title', 'Breast Health Awareness'),
  ('awareness_description', 'Awareness Section Description', 'Early detection saves lives. Learn about the importance of regular screening and self-examination.'),
  ('footer_tagline', 'Footer Tagline', 'Advanced Breast Surgery with Precision & Compassion');
