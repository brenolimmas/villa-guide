export interface Host {
  id: string;
  email: string;
  name: string;
  whatsapp?: string;
}

export interface Property {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  hero_image?: string;
  hero_badge_image?: string;
  location?: string;
  wifi_name?: string;
  wifi_pass?: string;
  safe_code?: string;
  checkin_time?: string;
  checkout_time?: string;
  whatsapp?: string;
  lat?: number;
  lon?: number;
  google_review_url?: string;
  instagram_url?: string;
  villa_story_eyebrow?: string | null;
  villa_story_text?: string | null;
}

export interface Reservation {
  id: string;
  guest_name: string;
  checkin_date: string;
  checkout_date: string;
  guests_count: number;
}

export interface HouseRule {
  id: string;
  category: 'critical' | 'warning' | 'info';
  icon_svg?: string;
  title: string;
  description?: string;
  sort_order: number;
}

export interface Faq {
  id: string;
  question: string;
  answer?: string;
  sort_order: number;
  faq_steps: FaqStep[];
  icon_svg?:   string | null;
  media_url?:  string | null;
  media_type?: string | null;
}

export interface FaqStep {
  id: string;
  step_text: string;
  sort_order: number;
}

export interface VillaSlide {
  id: string;
  image_url: string;
  caption_title?: string;
  caption_desc?: string;
  sort_order: number;
}

export interface CommercePlace {
  id: string;
  category: string;
  name: string;
  image_url?: string;
  address?: string;
  phone?: string;
  maps_url?: string;
  drive_minutes?: number;
  walk_minutes?: number;
  sort_order: number;
  commerce_hours: CommerceHour[];
}

export interface CommerceHour {
  id: string;
  day_label: string;
  hours: string;
  sort_order: number;
}

export interface Route {
  id: string;
  title: string;
  subtitle?: string;
  image_url?: string;
  distance_km?: number;
  description?: string;
  sort_order: number;
}

export interface Service {
  id: string;
  category: string;
  name: string;
  description?: string;
  is_available: boolean;
  sort_order: number;
}

export interface EmergencyContact {
  id: string;
  label: string;
  sub_label?: string;
  phone: string;
  is_primary: boolean;
  sort_order: number;
}

export interface PropertyPageData {
  property: Property;
  reservation: Reservation | null;
  rules: HouseRule[];
  faqs: Faq[];
  villa_slides: VillaSlide[];
  commerce: CommercePlace[];
  routes: Route[];
  services: Service[];
  emergency_contacts: EmergencyContact[];
}
