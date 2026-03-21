
-- Insert admin roles for existing admin users
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM auth.users 
WHERE email IN ('geetxteam@gmail.com', 'iscillatechnologies@gmail.com')
ON CONFLICT (user_id, role) DO NOTHING;

-- Also ensure they have profiles
INSERT INTO public.profiles (user_id, display_name)
SELECT id, COALESCE(raw_user_meta_data->>'full_name', email) FROM auth.users
WHERE email IN ('geetxteam@gmail.com', 'iscillatechnologies@gmail.com')
ON CONFLICT (user_id) DO NOTHING;

-- Add unique constraint on profiles.username if not exists
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'profiles_username_key') THEN
    ALTER TABLE public.profiles ADD CONSTRAINT profiles_username_key UNIQUE (username);
  END IF;
END $$;
