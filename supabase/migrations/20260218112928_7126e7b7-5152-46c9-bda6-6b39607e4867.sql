
-- Remove old seed data and re-seed with comprehensive section content
DELETE FROM public.site_content;

INSERT INTO public.site_content (section_key, section_label, content) VALUES
-- Hero Section
('hero_headline', 'Hero — Main Headline', 'Your Breast Health, <em class="text-[hsl(270,60%,50%)]">in Expert Hands</em>'),
('hero_description', 'Hero — Description', 'UK-trained Breast Oncoplastic & Reconstructive Surgeon with 700+ successful surgeries — bringing world-class precision, personalised care, and the confidence you deserve.'),
('hero_trust_indicators', 'Hero — Trust Indicators (comma-separated)', 'MCh (UK) Trained,GMC Registered,700+ Surgeries,Oncology + Aesthetics'),

-- About Section
('about_greeting', 'About — Greeting', 'Hi, I''m'),
('about_name', 'About — Name', 'DR. SWATHIKA'),
('about_tagline', 'About — Tagline', 'I''m a UK-trained Breast Oncoplastic & Reconstructive Surgeon and Medical Educator.'),
('about_paragraph_1', 'About — Paragraph 1', 'With over 700 successful procedures and training from both India and the UK, I''ve seen first-hand the fear, frustration and uncertainty that my patients go through when facing breast health concerns.'),
('about_paragraph_2', 'About — Paragraph 2', 'As a breast specialist with global experience, I understand finding the right information, processing a diagnosis, understanding treatment options and getting accurate, practical advice can be really overwhelming.'),
('about_subheading', 'About — Subheading', 'But I''m here to help.'),
('about_paragraph_3', 'About — Paragraph 3', 'Many people think that as a Breast Specialist Surgeon, I just do surgery. But that''s far from the truth. My approach combines oncology precision with aesthetic sensibility — because your confidence matters as much as your health.'),
('about_paragraph_4', 'About — Paragraph 4', 'I believe every patient deserves care that heals, restores, and empowers. That''s exactly what I bring — world-class expertise with compassion, right here in Chennai.'),

-- Services Section
('services_subtitle', 'Services — Subtitle', 'Our Services'),
('services_title', 'Services — Title', 'Signature <span class="text-gradient-rose italic">Treatments</span>'),
('services_clinical_heading', 'Services — Clinical Heading', 'Clinical'),
('services_cosmetic_heading', 'Services — Cosmetic Heading', 'Cosmetic'),

-- Awareness Section
('awareness_subtitle', 'Awareness — Subtitle', 'Breast Health Awareness'),
('awareness_title', 'Awareness — Title', 'What Every Woman <span class="text-gradient-rose italic">Should Know</span>'),
('awareness_description', 'Awareness — Description', 'Awareness saves lives. Understanding the signs, knowing what to do, and taking timely action can make all the difference in your breast health journey.'),
('awareness_symptoms', 'Awareness — Warning Signs (one per line)', 'A new lump or thickening in the breast or underarm
Change in breast size, shape, or symmetry
Skin dimpling, puckering, or redness on the breast
Nipple discharge (especially if bloody), retraction, or inversion
Persistent breast pain not linked to your menstrual cycle
Swelling or warmth in part of the breast'),
('awareness_dos', 'Awareness — Do''s (one per line)', 'Perform monthly breast self-examinations after age 20
Get annual clinical breast exams from age 30+
Schedule regular mammograms as recommended by your doctor
Maintain a healthy weight and stay physically active
Discuss your family history with your surgeon
Seek a second opinion — it''s your right and it matters'),
('awareness_donts', 'Awareness — Don''ts (one per line)', 'Don''t ignore a lump — even if it''s painless
Don''t delay a doctor''s visit out of fear
Don''t rely on self-diagnosis from the internet
Don''t assume young women can''t get breast cancer
Don''t skip follow-up appointments after treatment
Don''t let stigma prevent you from seeking care'),

-- Testimonials Section
('testimonials_subtitle', 'Testimonials — Subtitle', 'Testimonials'),
('testimonials_title', 'Testimonials — Title', 'Trust & <span class="text-gradient-rose italic">Transformation</span>'),

-- Footer Section
('footer_brand_description', 'Footer — Brand Description', 'UK Trained Breast Oncoplastic & Reconstructive Surgeon. Combining global expertise with compassionate, patient-centred care.'),
('footer_disclaimer', 'Footer — Medical Disclaimer', 'Medical Disclaimer: This website is for informational purposes only and does not constitute medical advice. Please consult a qualified healthcare professional for diagnosis and treatment.'),
('footer_address', 'Footer — Address', 'Chennai, Tamil Nadu, India'),
('footer_phone', 'Footer — Phone Number', '+91 98765 43210'),
('footer_email', 'Footer — Email', 'contact@drswathika.com'),
('footer_whatsapp', 'Footer — WhatsApp Number', '919876543210'),

-- Consultation Modal
('consultation_title', 'Consultation Modal — Title', 'Schedule Your <span class="text-gradient-rose">Private Consultation</span>'),
('consultation_description', 'Consultation Modal — Description', 'Take the first step towards expert care.');
