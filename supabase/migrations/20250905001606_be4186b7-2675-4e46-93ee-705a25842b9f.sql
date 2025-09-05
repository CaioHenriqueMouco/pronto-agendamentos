-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create plans table
CREATE TABLE IF NOT EXISTS public.plans (
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
CREATE TABLE IF NOT EXISTS public.feature_flags (
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
CREATE TABLE IF NOT EXISTS public.clientes (
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
CREATE TABLE IF NOT EXISTS public.profissionais (
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
CREATE TABLE IF NOT EXISTS public.horarios_disponiveis (
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
CREATE TABLE IF NOT EXISTS public.agendamentos (
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
CREATE TABLE IF NOT EXISTS public.notifications (
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
CREATE INDEX IF NOT EXISTS idx_horarios_profissional_data ON public.horarios_disponiveis(profissional_id, data);
CREATE INDEX IF NOT EXISTS idx_horarios_disponivel ON public.horarios_disponiveis(disponivel) WHERE disponivel = true;
CREATE INDEX IF NOT EXISTS idx_agendamentos_profissional ON public.agendamentos(profissional_id);
CREATE INDEX IF NOT EXISTS idx_agendamentos_cliente ON public.agendamentos(cliente_id);
CREATE INDEX IF NOT EXISTS idx_agendamentos_status ON public.agendamentos(status);
CREATE INDEX IF NOT EXISTS idx_notifications_status ON public.notifications(status) WHERE status = 'pendente';
CREATE INDEX IF NOT EXISTS idx_feature_flags_tenant ON public.feature_flags(tenant_id, flag_key);

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