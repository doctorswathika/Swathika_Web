
-- Add alignment column to site_content
ALTER TABLE public.site_content
ADD COLUMN IF NOT EXISTS alignment text NOT NULL DEFAULT 'left';

-- Add a constraint to only allow valid alignment values
ALTER TABLE public.site_content
ADD CONSTRAINT site_content_alignment_check CHECK (alignment IN ('left', 'center', 'right'));
