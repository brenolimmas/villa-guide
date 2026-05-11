-- ================================================================
-- Villa Guide — Schema inicial
-- ================================================================

CREATE TABLE hosts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  whatsapp    TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE properties (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id         UUID REFERENCES hosts(id) ON DELETE CASCADE,
  slug            TEXT UNIQUE NOT NULL,
  name            TEXT NOT NULL,
  subtitle        TEXT,
  hero_image      TEXT,
  hero_badge_image TEXT,
  location        TEXT,
  wifi_name       TEXT,
  wifi_pass       TEXT,
  safe_code       TEXT,
  checkin_time    TEXT,
  checkout_time   TEXT,
  whatsapp        TEXT,
  lat             NUMERIC,
  lon             NUMERIC,
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE reservations (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id   UUID REFERENCES properties(id) ON DELETE CASCADE,
  guest_name    TEXT NOT NULL,
  checkin_date  DATE NOT NULL,
  checkout_date DATE NOT NULL,
  guests_count  INT DEFAULT 1,
  active        BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE house_rules (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  category    TEXT NOT NULL CHECK (category IN ('critical','warning','info')),
  icon_svg    TEXT,
  title       TEXT NOT NULL,
  description TEXT,
  sort_order  INT DEFAULT 0
);

CREATE TABLE faqs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  question    TEXT NOT NULL,
  answer      TEXT,
  sort_order  INT DEFAULT 0
);

CREATE TABLE faq_steps (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  faq_id     UUID REFERENCES faqs(id) ON DELETE CASCADE,
  step_text  TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

CREATE TABLE villa_slides (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id   UUID REFERENCES properties(id) ON DELETE CASCADE,
  image_url     TEXT NOT NULL,
  caption_title TEXT,
  caption_desc  TEXT,
  sort_order    INT DEFAULT 0
);

CREATE TABLE commerce_places (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id   UUID REFERENCES properties(id) ON DELETE CASCADE,
  category      TEXT NOT NULL,
  name          TEXT NOT NULL,
  image_url     TEXT,
  address       TEXT,
  phone         TEXT,
  maps_url      TEXT,
  drive_minutes INT,
  walk_minutes  INT,
  sort_order    INT DEFAULT 0
);

CREATE TABLE commerce_hours (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  place_id   UUID REFERENCES commerce_places(id) ON DELETE CASCADE,
  day_label  TEXT NOT NULL,
  hours      TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

CREATE TABLE routes (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id  UUID REFERENCES properties(id) ON DELETE CASCADE,
  title        TEXT NOT NULL,
  subtitle     TEXT,
  image_url    TEXT,
  distance_km  NUMERIC,
  description  TEXT,
  sort_order   INT DEFAULT 0
);

CREATE TABLE services (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id  UUID REFERENCES properties(id) ON DELETE CASCADE,
  category     TEXT NOT NULL,
  name         TEXT NOT NULL,
  description  TEXT,
  is_available BOOLEAN DEFAULT true,
  sort_order   INT DEFAULT 0
);

CREATE TABLE emergency_contacts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  label       TEXT NOT NULL,
  sub_label   TEXT,
  phone       TEXT NOT NULL,
  is_primary  BOOLEAN DEFAULT false,
  sort_order  INT DEFAULT 0
);

-- ================================================================
-- Row Level Security
-- ================================================================

ALTER TABLE hosts               ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties          ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations        ENABLE ROW LEVEL SECURITY;
ALTER TABLE house_rules         ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs                ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_steps           ENABLE ROW LEVEL SECURITY;
ALTER TABLE villa_slides        ENABLE ROW LEVEL SECURITY;
ALTER TABLE commerce_places     ENABLE ROW LEVEL SECURITY;
ALTER TABLE commerce_hours      ENABLE ROW LEVEL SECURITY;
ALTER TABLE routes              ENABLE ROW LEVEL SECURITY;
ALTER TABLE services            ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_contacts  ENABLE ROW LEVEL SECURITY;

-- Public read (hóspedes sem login)
CREATE POLICY "public_read_properties"         ON properties         FOR SELECT USING (true);
CREATE POLICY "public_read_reservations"       ON reservations       FOR SELECT USING (true);
CREATE POLICY "public_read_house_rules"        ON house_rules        FOR SELECT USING (true);
CREATE POLICY "public_read_faqs"               ON faqs               FOR SELECT USING (true);
CREATE POLICY "public_read_faq_steps"          ON faq_steps          FOR SELECT USING (true);
CREATE POLICY "public_read_villa_slides"       ON villa_slides       FOR SELECT USING (true);
CREATE POLICY "public_read_commerce_places"    ON commerce_places    FOR SELECT USING (true);
CREATE POLICY "public_read_commerce_hours"     ON commerce_hours     FOR SELECT USING (true);
CREATE POLICY "public_read_routes"             ON routes             FOR SELECT USING (true);
CREATE POLICY "public_read_services"           ON services           FOR SELECT USING (true);
CREATE POLICY "public_read_emergency_contacts" ON emergency_contacts FOR SELECT USING (true);

-- Host write (requer auth)
CREATE POLICY "host_write_properties"
  ON properties FOR ALL
  USING (host_id = auth.uid())
  WITH CHECK (host_id = auth.uid());
