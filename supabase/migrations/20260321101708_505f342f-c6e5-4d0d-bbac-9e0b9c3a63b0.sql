-- Allow any authenticated user to create their own agents
DROP POLICY IF EXISTS "Admins can manage agents" ON public.ai_agents;

-- Admins can do everything
CREATE POLICY "Admins can manage all agents"
ON public.ai_agents FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Any authenticated user can create agents they own
CREATE POLICY "Users can create own agents"
ON public.ai_agents FOR INSERT TO authenticated
WITH CHECK (auth.uid() = created_by);

-- Users can update their own agents
CREATE POLICY "Users can update own agents"
ON public.ai_agents FOR UPDATE TO authenticated
USING (auth.uid() = created_by);

-- Users can delete their own agents
CREATE POLICY "Users can delete own agents"
ON public.ai_agents FOR DELETE TO authenticated
USING (auth.uid() = created_by);

-- Users can read their own unpublished agents
CREATE POLICY "Users can read own agents"
ON public.ai_agents FOR SELECT TO authenticated
USING (auth.uid() = created_by);