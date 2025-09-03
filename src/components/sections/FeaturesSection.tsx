import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar, 
  Clock, 
  CreditCard, 
  Globe, 
  MessageSquare, 
  Palette, 
  Shield, 
  Smartphone,
  Users,
  BarChart3,
  Zap,
  Settings
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Agendamento Inteligente",
    description: "Calendário intuitivo com disponibilidade automática, bloqueios e horários personalizados."
  },
  {
    icon: MessageSquare,
    title: "Notificações Automáticas",
    description: "WhatsApp, SMS e email automáticos para confirmações, lembretes e follow-ups."
  },
  {
    icon: CreditCard,
    title: "Pagamentos Online",
    description: "Receba pagamentos antecipados, sinais ou valor total via PIX, cartão e mais."
  },
  {
    icon: Palette,
    title: "Marca Personalizada",
    description: "Logo, cores, textos e domínio próprio para uma experiência white-label completa."
  },
  {
    icon: Smartphone,
    title: "PWA Responsivo",
    description: "App móvel nativo com funcionamento offline e notificações push."
  },
  {
    icon: BarChart3,
    title: "Relatórios Avançados",
    description: "Dashboards com métricas, receita, no-show, LTV e exportação de dados."
  },
  {
    icon: Users,
    title: "Multi-usuário",
    description: "Equipe com diferentes permissões, agendamentos paralelos e gestão centralizada."
  },
  {
    icon: Globe,
    title: "Integração de Calendários",
    description: "Sincronização bidirecional com Google Calendar e Outlook para evitar conflitos."
  },
  {
    icon: Shield,
    title: "LGPD Compliant",
    description: "Proteção de dados, consentimento e direitos de portabilidade garantidos."
  }
];

const sectors = [
  { name: "Barbearias", description: "Cortes, barbas e tratamentos" },
  { name: "Clínicas", description: "Consultas médicas e exames" },
  { name: "Estética", description: "Procedimentos e tratamentos" },
  { name: "Consultoria", description: "Reuniões e atendimentos" },
  { name: "Manutenção", description: "Serviços técnicos" },
  { name: "Aulas", description: "Ensino e treinamentos" }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap className="h-4 w-4" />
            Recursos Completos
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Tudo que você precisa para{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              crescer
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Uma plataforma completa com todas as ferramentas necessárias para automatizar 
            seus agendamentos e fazer seu negócio decolar.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="border-border hover:shadow-md transition-all duration-200">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sectors */}
        <div className="bg-muted/50 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Ideal para diversos setores
            </h3>
            <p className="text-muted-foreground">
              Configurações pré-definidas e campos personalizados para cada tipo de negócio
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {sectors.map((sector, index) => (
              <div key={index} className="text-center">
                <div className="bg-background rounded-lg p-4 shadow-sm border border-border mb-3">
                  <Settings className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-foreground text-sm">{sector.name}</h4>
                </div>
                <p className="text-xs text-muted-foreground">{sector.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="accent" size="lg">
              Ver Todas as Configurações
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}