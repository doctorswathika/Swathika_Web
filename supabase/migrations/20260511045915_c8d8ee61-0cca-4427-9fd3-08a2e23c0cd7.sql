-- Make is_admin() portable: check by email from JWT instead of hardcoded UUID
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT lower(coalesce(
    (auth.jwt() ->> 'email'),
    ((auth.jwt() -> 'user_metadata') ->> 'email'),
    ''
  )) = 'doctorswathika@gmail.com';
$$;