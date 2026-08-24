CREATE TABLE public.ai_usage (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  day date not null default (now() at time zone 'utc')::date,
  count integer not null default 0,
  updated_at timestamptz not null default now(),
  unique (user_id, day)
);

GRANT SELECT ON public.ai_usage TO authenticated;
GRANT ALL ON public.ai_usage TO service_role;

ALTER TABLE public.ai_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own AI usage"
ON public.ai_usage FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.increment_ai_usage(_user_id uuid, _limit integer)
RETURNS TABLE (allowed boolean, used integer, day_limit integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  today date := (now() at time zone 'utc')::date;
  current_count integer;
BEGIN
  INSERT INTO public.ai_usage (user_id, day, count)
  VALUES (_user_id, today, 0)
  ON CONFLICT (user_id, day) DO NOTHING;

  SELECT u.count INTO current_count FROM public.ai_usage u
  WHERE u.user_id = _user_id AND u.day = today FOR UPDATE;

  IF current_count >= _limit THEN
    RETURN QUERY SELECT false, current_count, _limit;
  ELSE
    UPDATE public.ai_usage
      SET count = count + 1, updated_at = now()
      WHERE user_id = _user_id AND day = today
      RETURNING count INTO current_count;
    RETURN QUERY SELECT true, current_count, _limit;
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.increment_ai_usage(uuid, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.increment_ai_usage(uuid, integer) TO service_role;