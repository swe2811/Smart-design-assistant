/*
  # Create design requests and results tables

  1. New Tables
    - `design_requests` - Stores user's design project information
      - `id` (uuid, primary key)
      - `content_type` (text) - poster, website, ad, etc.
      - `description` (text) - what the content is about
      - `feeling` (text) - desired feeling/emotion
      - `theme` (text) - nature, minimal, luxury, etc.
      - `style_preferences` (text[]) - array of selected styles
      - `created_at` (timestamp)
    
    - `design_palettes` - Stores generated color palettes
      - `id` (uuid, primary key)
      - `request_id` (uuid, foreign key)
      - `palette_number` (integer) - 1, 2, or 3
      - `palette_name` (text)
      - `primary_color` (text) - HEX value
      - `secondary_color` (text) - HEX value
      - `accent_color` (text) - HEX value
      - `primary_usage` (text)
      - `secondary_usage` (text)
      - `accent_usage` (text)
      - `created_at` (timestamp)
    
    - `design_fonts` - Stores font recommendations
      - `id` (uuid, primary key)
      - `request_id` (uuid, foreign key)
      - `heading_font` (text)
      - `body_font` (text)
      - `heading_fallback` (text)
      - `body_fallback` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public insert/read access (public design tool)
*/

CREATE TABLE IF NOT EXISTS design_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type text NOT NULL,
  description text NOT NULL,
  feeling text NOT NULL,
  theme text NOT NULL,
  style_preferences text[] NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS design_palettes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL REFERENCES design_requests(id) ON DELETE CASCADE,
  palette_number integer NOT NULL,
  palette_name text NOT NULL,
  primary_color text NOT NULL,
  secondary_color text NOT NULL,
  accent_color text NOT NULL,
  primary_usage text NOT NULL,
  secondary_usage text NOT NULL,
  accent_usage text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS design_fonts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL REFERENCES design_requests(id) ON DELETE CASCADE,
  heading_font text NOT NULL,
  body_font text NOT NULL,
  heading_fallback text NOT NULL,
  body_fallback text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE design_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE design_palettes ENABLE ROW LEVEL SECURITY;
ALTER TABLE design_fonts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "design_requests_public_insert" ON design_requests FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "design_requests_public_read" ON design_requests FOR SELECT TO public USING (true);

CREATE POLICY "design_palettes_public_insert" ON design_palettes FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "design_palettes_public_read" ON design_palettes FOR SELECT TO public USING (true);

CREATE POLICY "design_fonts_public_insert" ON design_fonts FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "design_fonts_public_read" ON design_fonts FOR SELECT TO public USING (true);
