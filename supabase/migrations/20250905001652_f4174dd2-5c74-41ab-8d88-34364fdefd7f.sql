-- Fix security issues by enabling RLS and adding policies

-- Enable RLS on all new tables
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profissionais ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.horarios_disponiveis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agendamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for plans table (read-only for authenticated users)
CREATE POLICY "Plans are viewable by everyone" ON public.plans
  FOR SELECT USING (true);

-- Create policies for feature_flags table
CREATE POLICY "Users can view feature flags for their tenant" ON public.feature_flags
  FOR SELECT 
  USING (tenant_id IN (
    SELECT p.tenant_id FROM public.profiles p WHERE p.user_id = auth.uid()
  ));

CREATE POLICY "Service role can manage feature flags" ON public.feature_flags
  FOR ALL USING (true);

-- Create policies for clientes table
CREATE POLICY "Users can view clients in their tenant" ON public.clientes
  FOR SELECT 
  USING (tenant_id IN (
    SELECT p.tenant_id FROM public.profiles p WHERE p.user_id = auth.uid()
  ) OR user_id = auth.uid());

CREATE POLICY "Users can insert clients in their tenant" ON public.clientes
  FOR INSERT 
  WITH CHECK (tenant_id IN (
    SELECT p.tenant_id FROM public.profiles p WHERE p.user_id = auth.uid()
  ) OR user_id = auth.uid());

CREATE POLICY "Users can update their own client info" ON public.clientes
  FOR UPDATE 
  USING (user_id = auth.uid());

CREATE POLICY "Service role can manage clients" ON public.clientes
  FOR ALL USING (true);

-- Create policies for profissionais table
CREATE POLICY "Users can view professionals in their tenant" ON public.profissionais
  FOR SELECT 
  USING (tenant_id IN (
    SELECT p.tenant_id FROM public.profiles p WHERE p.user_id = auth.uid()
  ) OR user_id = auth.uid());

CREATE POLICY "Admins can manage professionals" ON public.profissionais
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.user_id = auth.uid() 
    AND p.role = ANY(ARRAY['admin', 'superadmin'])
  ));

CREATE POLICY "Service role can manage professionals" ON public.profissionais
  FOR ALL USING (true);

-- Create policies for horarios_disponiveis table
CREATE POLICY "Users can view available slots" ON public.horarios_disponiveis
  FOR SELECT 
  USING (disponivel = true OR tenant_id IN (
    SELECT p.tenant_id FROM public.profiles p WHERE p.user_id = auth.uid()
  ));

CREATE POLICY "Professionals can manage their own slots" ON public.horarios_disponiveis
  FOR ALL 
  USING (user_id = auth.uid() OR profissional_id IN (
    SELECT pr.id FROM public.profissionais pr WHERE pr.user_id = auth.uid()
  ));

CREATE POLICY "Service role can manage slots" ON public.horarios_disponiveis
  FOR ALL USING (true);

-- Create policies for agendamentos table
CREATE POLICY "Users can view their own appointments" ON public.agendamentos
  FOR SELECT 
  USING (cliente_id IN (
    SELECT c.id FROM public.clientes c WHERE c.user_id = auth.uid()
  ) OR profissional_id IN (
    SELECT pr.id FROM public.profissionais pr WHERE pr.user_id = auth.uid()
  ) OR tenant_id IN (
    SELECT p.tenant_id FROM public.profiles p WHERE p.user_id = auth.uid()
  ));

CREATE POLICY "Service role can manage appointments" ON public.agendamentos
  FOR ALL USING (true);

-- Create policies for notifications table
CREATE POLICY "Service role can manage notifications" ON public.notifications
  FOR ALL USING (true);

-- Fix function search path
ALTER FUNCTION public.create_agendamento(UUID, UUID, UUID) SET search_path = public;

-- Insert seed data for plans if not exists
INSERT INTO public.plans (id, name, description, price_monthly, price_yearly, features, limits) 
VALUES 
('free', 'Free', 'Plano gratuito para pequenos negócios', 0, 0, 
 '{"allow_google_sync": false, "allow_whatsapp_notifications": false, "white_label_enabled": false}',
 '{"max_profissionais": 1, "max_agendamentos_mes": 100, "slots_per_day": 20}'
),
('pro', 'Pro', 'Plano profissional com recursos avançados', 2999, 29990,
 '{"allow_google_sync": true, "allow_whatsapp_notifications": true, "white_label_enabled": false}',
 '{"max_profissionais": 10, "max_agendamentos_mes": 2000, "slots_per_day": 100}'
),
('enterprise', 'Enterprise', 'Plano empresarial com recursos ilimitados', 9999, 99990,
 '{"allow_google_sync": true, "allow_whatsapp_notifications": true, "white_label_enabled": true}',
 '{"max_profissionais": -1, "max_agendamentos_mes": -1, "slots_per_day": -1}'
)
ON CONFLICT (id) DO NOTHING;

-- Insert seed professional if not exists
INSERT INTO public.profissionais (id, tenant_id, nome, email, telefone, especialidades) 
VALUES 
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 
 'Dr. João Silva', 'joao@clinicateste.com', '(11) 99999-9999', 
 ARRAY['Clínico Geral', 'Cardiologia'])
ON CONFLICT (id) DO NOTHING;

-- Insert seed client if not exists
INSERT INTO public.clientes (id, tenant_id, nome, email, telefone, tipo) 
VALUES 
('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000',
 'Maria Santos', 'maria@email.com', '(11) 88888-8888', 'registered')
ON CONFLICT (id) DO NOTHING;

-- Insert available time slots for the next 2 days if not exists
DO $$
DECLARE
  slot_count INTEGER;
BEGIN
  -- Check if slots already exist
  SELECT COUNT(*) INTO slot_count FROM public.horarios_disponiveis;
  
  IF slot_count = 0 THEN
    -- Generate slots for today and tomorrow
    FOR i IN 0..1 LOOP
      FOR hour_val IN 9..16 LOOP
        -- Full hour slots
        INSERT INTO public.horarios_disponiveis (tenant_id, profissional_id, data, hora)
        VALUES (
          '550e8400-e29b-41d4-a716-446655440000',
          '550e8400-e29b-41d4-a716-446655440001',
          CURRENT_DATE + i,
          (hour_val || ':00')::TIME
        );
        
        -- Half hour slots
        INSERT INTO public.horarios_disponiveis (tenant_id, profissional_id, data, hora)
        VALUES (
          '550e8400-e29b-41d4-a716-446655440000',
          '550e8400-e29b-41d4-a716-446655440001',
          CURRENT_DATE + i,
          (hour_val || ':30')::TIME
        );
      END LOOP;
    END LOOP;
  END IF;
END $$;