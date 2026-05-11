-- Make is_admin() portable: check by email from auth.users directly.
-- This is much more reliable than parsing the JWT, because SECURITY DEFINER
-- allows this function to securely read the auth.users table for the current user.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() 
    AND lower(email) = 'doctorswathika@gmail.com'
  );
$$;