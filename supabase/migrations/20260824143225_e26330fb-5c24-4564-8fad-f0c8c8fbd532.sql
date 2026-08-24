CREATE TABLE public.interest_progress (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  slug text NOT NULL,
  section text NOT NULL,
  step_index integer NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (user_id, slug, section, step_index)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.interest_progress TO authenticated;
GRANT ALL ON public.interest_progress TO service_role;

ALTER TABLE public.interest_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own interest progress" ON public.interest_progress
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$
LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_interest_progress_updated_at
BEFORE UPDATE ON public.interest_progress
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();