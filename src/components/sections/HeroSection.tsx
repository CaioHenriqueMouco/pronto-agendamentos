import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, Star } from "lucide-react";
import heroImage from "@/assets/hero-dashboard.jpg";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-subtle py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Star className="h-4 w-4" />
                Plataforma #1 em Agendamentos
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Transforme seu{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  negócio
                </span>{" "}
                com agendamentos inteligentes
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Plataforma completa para prestadores de serviços gerenciarem agendamentos, 
                clientes e pagamentos. Personalize sua marca e aumente sua receita.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-success shrink-0" />
                <span className="text-foreground">Agendamento 24/7</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-success shrink-0" />
                <span className="text-foreground">Pagamentos online</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-success shrink-0" />
                <span className="text-foreground">WhatsApp automático</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-success shrink-0" />
                <span className="text-foreground">Marca personalizada</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="hero" className="sm:w-auto">
                <Calendar className="mr-2 h-5 w-5" />
                Começar Grátis Agora
              </Button>
              <Button variant="outline" size="lg" className="sm:w-auto">
                Ver Demonstração
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">10k+</div>
                <div className="text-sm text-muted-foreground">Empresas ativas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">99,9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">4.9/5</div>
                <div className="text-sm text-muted-foreground">Avaliação</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src={heroImage}
                alt="Dashboard do AgendaFlow mostrando calendário e agendamentos"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            {/* Background decoration */}
            <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-primary rounded-2xl opacity-20 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}