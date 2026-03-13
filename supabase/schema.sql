-- =====================================================================
-- MedTrans — Supabase SQL Schema
-- Run this in your Supabase project: SQL Editor → New Query → Run
-- =====================================================================

CREATE TABLE IF NOT EXISTS transport_requests (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name       TEXT        NOT NULL,
  phone           TEXT        NOT NULL,
  pickup          TEXT        NOT NULL,
  dropoff         TEXT        NOT NULL,
  transport_date  DATE        NOT NULL,
  transport_time  TIME        NOT NULL,
  wheelchair      BOOLEAN     NOT NULL DEFAULT FALSE,
  stretcher       BOOLEAN     NOT NULL DEFAULT FALSE,
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE transport_requests ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT (booking form is public)
CREATE POLICY "Allow public inserts"
  ON transport_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users (admins) can SELECT / UPDATE / DELETE
CREATE POLICY "Allow admin select"
  ON transport_requests
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow admin update"
  ON transport_requests
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow admin delete"
  ON transport_requests
  FOR DELETE
  TO authenticated
  USING (true);

-- Optional: index on created_at for dashboard queries
CREATE INDEX IF NOT EXISTS idx_transport_requests_created_at
  ON transport_requests (created_at DESC);
