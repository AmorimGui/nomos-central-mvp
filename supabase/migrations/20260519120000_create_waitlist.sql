-- Waitlist for landing page lead capture.
-- Public anon inserts are allowed (RLS) with basic email shape validation.
-- No SELECT policy: the list is only readable from the Supabase dashboard.

CREATE TABLE public.waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  source text DEFAULT 'landing',
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX waitlist_created_at_idx ON public.waitlist (created_at DESC);

ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join waitlist"
  ON public.waitlist FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND length(email) < 256
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  );
