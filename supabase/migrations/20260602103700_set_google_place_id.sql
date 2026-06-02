-- Upsert the Google Place ID into site_settings so the edge function can use it
INSERT INTO public.site_settings (key, value)
VALUES ('GOOGLE_PLACE_ID', 'ChIJC1sLCkVnUjoRLLPpTzSPNmc')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
