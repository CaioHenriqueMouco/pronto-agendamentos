-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create tenants table (multi-tenant support)
CREATE TABLE public.tenants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  domain TEXT UNIQUE,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create plans table
CREATE TABLE public.plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price_monthly INTEGER DEFAULT 0, -- in cents
  price_yearly INTEGER DEFAULT 0, -- in cents
  features JSONB DEFAULT '{}',
  limits JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create feature_flags table
CREATE TABLE public.feature_flags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  flag_key TEXT NOT NULL,
  flag_value TEXT NOT NULL,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(tenant_id, flag_key)
);

-- Create clientes table
CREATE TABLE public.clientes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  nome TEXT NOT NULL,
  email TEXT,
  telefone TEXT,
  tipo TEXT NOT NULL DEFAULT 'guest' CHECK (tipo IN ('guest', 'registered')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profissionais table
CREATE TABLE public.profissionais (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  nome TEXT NOT NULL,
  email TEXT,
  telefone TEXT,
  especialidades TEXT[],
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create horarios_disponiveis table
CREATE TABLE public.horarios_disponiveis (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  profissional_id UUID REFERENCES public.profissionais(id) ON DELETE CASCADE,
  data DATE NOT NULL,
  hora TIME NOT NULL,
  disponivel BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(profissional_id, data, hora)
);

-- Create agendamentos table
CREATE TABLE public.agendamentos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  profissional_id UUID REFERENCES public.profissionais(id) ON DELETE CASCADE,
  cliente_id UUID REFERENCES public.clientes(id) ON DELETE CASCADE,
  horario_id UUID REFERENCES public.horarios_disponiveis(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'agendado' CHECK (status IN ('agendado', 'confirmado', 'cancelado', 'concluido')),
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  agendamento_id UUID REFERENCES public.agendamentos(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL CHECK (tipo IN ('email', 'whatsapp', 'sms')),
  destinatario TEXT NOT NULL,
  assunto TEXT,
  conteudo TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'enviado', 'falhou')),
  tentativas INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_horarios_profissional_data ON public.horarios_disponiveis(profissional_id, data);
CREATE INDEX idx_horarios_disponivel ON public.horarios_disponiveis(disponivel) WHERE disponivel = true;
CREATE INDEX idx_agendamentos_profissional ON public.agendamentos(profissional_id);
CREATE INDEX idx_agendamentos_cliente ON public.agendamentos(cliente_id);
CREATE INDEX idx_agendamentos_status ON public.agendamentos(status);
CREATE INDEX idx_notifications_status ON public.notifications(status) WHERE status = 'pendente';
CREATE INDEX idx_tenants_domain ON public.tenants(domain);
CREATE INDEX idx_feature_flags_tenant ON public.feature_flags(tenant_id, flag_key);

-- Create atomic booking function
CREATE OR REPLACE FUNCTION public.create_agendamento(
  p_profissional_id UUID,
  p_cliente_id UUID,
  p_horario_id UUID
) RETURNS TABLE(
  agendamento_id UUID,
  success BOOLEAN,
  message TEXT
) AS $$
DECLARE
  v_horario_disponivel BOOLEAN;
  v_tenant_id UUID;
  v_new_agendamento_id UUID;
BEGIN
  -- Lock the specific time slot for update to prevent double booking
  SELECT disponivel, tenant_id INTO v_horario_disponivel, v_tenant_id
  FROM public.horarios_disponiveis 
  WHERE id = p_horario_id 
  FOR UPDATE;
  
  -- Check if slot exists
  IF NOT FOUND THEN
    RETURN QUERY SELECT NULL::UUID, FALSE, 'Horário não encontrado'::TEXT;
    RETURN;
  END IF;
  
  -- Check if slot is available
  IF NOT v_horario_disponivel THEN
    RETURN QUERY SELECT NULL::UUID, FALSE, 'Horário não está disponível'::TEXT;
    RETURN;
  END IF;
  
  -- Create the appointment
  INSERT INTO public.agendamentos (tenant_id, profissional_id, cliente_id, horario_id)
  VALUES (v_tenant_id, p_profissional_id, p_cliente_id, p_horario_id)
  RETURNING id INTO v_new_agendamento_id;
  
  -- Mark the slot as unavailable
  UPDATE public.horarios_disponiveis 
  SET disponivel = FALSE, updated_at = now()
  WHERE id = p_horario_id;
  
  -- Insert notification request
  INSERT INTO public.notifications (tenant_id, agendamento_id, tipo, destinatario, assunto, conteudo)
  SELECT 
    v_tenant_id,
    v_new_agendamento_id,
    'email',
    c.email,
    'Agendamento Confirmado',
    'Seu agendamento foi confirmado com sucesso!'
  FROM public.clientes c
  WHERE c.id = p_cliente_id AND c.email IS NOT NULL;
  
  RETURN QUERY SELECT v_new_agendamento_id, TRUE, 'Agendamento criado com sucesso'::TEXT;
END;
$$ LANGUAGE plpgsql;

-- Insert seed data for plans
INSERT INTO public.plans (id, name, description, price_monthly, price_yearly, features, limits) VALUES 
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
);

-- Insert seed tenant
INSERT INTO public.tenants (id, name, domain, plan) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Clínica Teste', 'teste.agendaflow.com', 'pro');

-- Insert seed professional
INSERT INTO public.profissionais (id, tenant_id, nome, email, telefone, especialidades) VALUES 
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 
 'Dr. João Silva', 'joao@clinicateste.com', '(11) 99999-9999', 
 ARRAY['Clínico Geral', 'Cardiologia']);

-- Insert seed client
INSERT INTO public.clientes (id, tenant_id, nome, email, telefone, tipo) VALUES 
('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000',
 'Maria Santos', 'maria@email.com', '(11) 88888-8888', 'registered');

-- Insert available time slots for the next 2 days
DO $$
DECLARE
  i INTEGER;
  current_date DATE;
  time_slot TIME;
BEGIN
  -- Generate slots for today and tomorrow
  FOR i IN 0..1 LOOP
    current_date := CURRENT_DATE + i;
    
    -- Generate slots from 9:00 to 17:00 (every hour)
    FOR hour_val IN 9..16 LOOP
      time_slot := (hour_val || ':00')::TIME;
      
      INSERT INTO public.horarios_disponiveis (tenant_id, profissional_id, data, hora)
      VALUES (
        '550e8400-e29b-41d4-a716-446655440000',
        '550e8400-e29b-41d4-a716-446655440001',
        current_date,
        time_slot
      );
      
      -- Also add 30-minute slots
      time_slot := (hour_val || ':30')::TIME;
      
      INSERT INTO public.horarios_disponiveis (tenant_id, profissional_id, data, hora)
      VALUES (
        '550e8400-e29b-41d4-a716-446655440000',
        '550e8400-e29b-41d4-a716-446655440001',
        current_date,
        time_slot
      );
    END LOOP;
  END LOOP;
END $$;

-- Add triggers for updated_at
CREATE TRIGGER update_tenants_updated_at
  BEFORE UPDATE ON public.tenants
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_clientes_updated_at
  BEFORE UPDATE ON public.clientes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profissionais_updated_at
  BEFORE UPDATE ON public.profissionais
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_horarios_updated_at
  BEFORE UPDATE ON public.horarios_disponiveis
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_agendamentos_updated_at
  BEFORE UPDATE ON public.agendamentos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_feature_flags_updated_at
  BEFORE UPDATE ON public.feature_flags
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add notification trigger for new appointments
CREATE OR REPLACE FUNCTION public.notify_new_agendamento()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify('new_agendamento', json_build_object(
    'agendamento_id', NEW.id,
    'tenant_id', NEW.tenant_id,
    'profissional_id', NEW.profissional_id,
    'cliente_id', NEW.cliente_id
  )::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER notify_agendamento_created
  AFTER INSERT ON public.agendamentos
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_agendamento();