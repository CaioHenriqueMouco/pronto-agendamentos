-- Create profiles table for user management
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'cliente' CHECK (role IN ('cliente', 'prestador', 'admin', 'superadmin')),
  tenant_id UUID,
  avatar_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(email)
);

-- Create tenants table
CREATE TABLE public.tenants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  domain TEXT UNIQUE,
  plan TEXT NOT NULL DEFAULT 'gratuito' CHECK (plan IN ('gratuito', 'pro', 'enterprise')),
  status TEXT NOT NULL DEFAULT 'ativo' CHECK (status IN ('ativo', 'suspenso', 'cancelado')),
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add foreign key for tenant_id in profiles
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_tenant_id_fkey 
FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON DELETE SET NULL;

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.user_id = auth.uid() 
    AND p.role IN ('admin', 'superadmin')
  )
);

CREATE POLICY "Admins can manage all profiles" 
ON public.profiles 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.user_id = auth.uid() 
    AND p.role IN ('admin', 'superadmin')
  )
);

-- Create policies for tenants
CREATE POLICY "Admins can view all tenants" 
ON public.tenants 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.user_id = auth.uid() 
    AND p.role IN ('admin', 'superadmin')
  )
);

CREATE POLICY "Admins can manage all tenants" 
ON public.tenants 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.user_id = auth.uid() 
    AND p.role IN ('admin', 'superadmin')
  )
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tenants_updated_at
BEFORE UPDATE ON public.tenants
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.tenants (id, name, domain, plan, status) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Barbearia do João', 'barbearia-joao.agendaki.com', 'pro', 'ativo'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Clínica Saúde Vital', 'clinica-vital.agendaki.com', 'enterprise', 'ativo'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Estética Bella', 'estetica-bella.agendaki.com', 'gratuito', 'ativo'),
  ('550e8400-e29b-41d4-a716-446655440004', 'Academia FitLife', 'academia-fitlife.agendaki.com', 'pro', 'suspenso');

-- Insert sample profiles
INSERT INTO public.profiles (user_id, first_name, last_name, email, phone, role, tenant_id, is_active) VALUES
  ('550e8400-e29b-41d4-a716-446655440011', 'Admin', 'Sistema', 'admin@agendaki.com', '+55 11 99999-9999', 'superadmin', NULL, true),
  ('550e8400-e29b-41d4-a716-446655440012', 'João', 'Silva', 'joao@barbearia.com', '+55 11 98888-8888', 'admin', '550e8400-e29b-41d4-a716-446655440001', true),
  ('550e8400-e29b-41d4-a716-446655440013', 'Dr. Maria', 'Santos', 'maria@clinica.com', '+55 11 97777-7777', 'prestador', '550e8400-e29b-41d4-a716-446655440002', true),
  ('550e8400-e29b-41d4-a716-446655440014', 'Ana', 'Costa', 'ana@email.com', '+55 11 96666-6666', 'cliente', '550e8400-e29b-41d4-a716-446655440003', true),
  ('550e8400-e29b-41d4-a716-446655440015', 'Carlos', 'Oliveira', 'carlos@academia.com', '+55 11 95555-5555', 'admin', '550e8400-e29b-41d4-a716-446655440004', false);