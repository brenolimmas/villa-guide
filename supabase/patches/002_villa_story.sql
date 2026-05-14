ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS villa_story_eyebrow TEXT,
  ADD COLUMN IF NOT EXISTS villa_story_text     TEXT;

UPDATE properties SET
  villa_story_eyebrow = 'Um espaço pensado para receber momentos especiais.',
  villa_story_text    = 'Desde 2024, a Villa Mariz nasceu do sonho de uma família apaixonada por acolher bem. Cada detalhe do espaço foi pensado para proporcionar conforto, qualidade e tranquilidade aos nossos hóspedes.'
WHERE slug = 'villa-mariz';
