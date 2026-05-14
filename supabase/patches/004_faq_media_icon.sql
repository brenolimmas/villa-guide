ALTER TABLE faqs
  ADD COLUMN IF NOT EXISTS icon_svg   TEXT,
  ADD COLUMN IF NOT EXISTS media_url  TEXT,
  ADD COLUMN IF NOT EXISTS media_type TEXT; -- 'image' | 'video'
