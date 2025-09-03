import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown } from "lucide-react";

const plans = [
  {
    name: "Gratuito",
    price: "R$ 0",
    period: "/mês",
    description: "Perfeito para começar",
    icon: Star,
    popular: false,
    features: [
      "Até 50 agendamentos/mês",
      "1 prestador de serviços",
      "Agendamento online básico",
      "Notificações por email",
      "Suporte por email",
      "Marca AgendaFlow visível"
    ],
    limitations: [
      "Sem WhatsApp automático",
      "Sem pagamentos online",
      "Sem personalização"
    ]
  },
  {
    name: "Pro",
    price: "R$ 97",
    period: "/mês",
    description: "Para negócios em crescimento",
    icon: Zap,
    popular: true,
    features: [
      "Agendamentos ilimitados",
      "Até 5 prestadores",
      "WhatsApp automático",
      "Pagamentos online (PIX/Cartão)",
      "Calendário Google/Outlook",
      "Marca personalizada",
      "Relatórios avançados",
      "Campos customizados",
      "Suporte prioritário"
    ],
    limitations: []
  },
  {
    name: "Enterprise",
    price: "R$ 297",
    period: "/mês",
    description: "Para empresas estabelecidas",
    icon: Crown,
    popular: false,
    features: [
      "Tudo do Pro +",
      "Prestadores ilimitados",
      "Multi-localização",
      "API personalizada",
      "Split de pagamentos",
      "Domínio próprio",
      "Templates de email customizados",
      "Integrações avançadas",
      "Suporte dedicado com SLA",
      "Backup prioritário"
    ],
    limitations: []
  }
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Crown className="h-4 w-4" />
            Planos Flexíveis
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Escolha o plano ideal para{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              seu negócio
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comece grátis e evolua conforme sua empresa cresce. 
            Todos os planos incluem 30 dias de trial gratuito.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative border-border hover:shadow-lg transition-all duration-200 ${
                plan.popular ? 'ring-2 ring-primary shadow-primary/20' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  Mais Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <plan.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {plan.description}
                </CardDescription>
                <div className="pt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-success shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations.map((limitation, limitationIndex) => (
                    <div key={limitationIndex} className="flex items-center gap-3 opacity-60">
                      <div className="h-4 w-4 rounded-full border border-muted-foreground shrink-0"></div>
                      <span className="text-sm text-muted-foreground line-through">{limitation}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant={plan.popular ? "hero" : "outline"} 
                  size="lg" 
                  className="w-full"
                >
                  {plan.name === "Gratuito" ? "Começar Grátis" : `Testar ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-background rounded-2xl p-8 lg:p-12 border border-border">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Perguntas Frequentes
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                Posso cancelar a qualquer momento?
              </h4>
              <p className="text-muted-foreground text-sm">
                Sim, você pode cancelar sua assinatura a qualquer momento. 
                Não há taxas de cancelamento ou multas.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                Como funciona o trial gratuito?
              </h4>
              <p className="text-muted-foreground text-sm">
                Todos os planos pagos incluem 30 dias grátis com acesso completo. 
                Não é necessário cartão de crédito para começar.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                Posso mudar de plano depois?
              </h4>
              <p className="text-muted-foreground text-sm">
                Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. 
                As mudanças são aplicadas no próximo ciclo de cobrança.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                Os dados ficam seguros?
              </h4>
              <p className="text-muted-foreground text-sm">
                Seus dados são protegidos com criptografia de ponta e backup automático. 
                Somos totalmente compatíveis com a LGPD.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}