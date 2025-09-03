import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
            <MessageCircle className="h-4 w-4" />
            Fale Conosco
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Pronto para{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              transformar
            </span>{" "}
            seu negócio?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Nossa equipe está pronta para ajudar você a implementar a solução perfeita 
            para seus agendamentos. Entre em contato conosco!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-2xl">Envie uma mensagem</CardTitle>
              <CardDescription>
                Preencha o formulário e retornaremos em até 2 horas úteis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nome</Label>
                  <Input id="firstName" placeholder="Seu nome" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Sobrenome</Label>
                  <Input id="lastName" placeholder="Seu sobrenome" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="seu@email.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" placeholder="(11) 99999-9999" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="business">Tipo de negócio</Label>
                <Input id="business" placeholder="Ex: Barbearia, Clínica, Consultoria..." />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Mensagem</Label>
                <Textarea 
                  id="message" 
                  placeholder="Conte-nos sobre suas necessidades..." 
                  rows={4}
                />
              </div>
              
              <Button variant="hero" size="lg" className="w-full">
                Enviar Mensagem
              </Button>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Outras formas de contato
              </h3>
              <div className="space-y-6">
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Email</h4>
                    <p className="text-muted-foreground">contato@agendaflow.com.br</p>
                    <p className="text-sm text-muted-foreground">Resposta em até 2 horas úteis</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">WhatsApp</h4>
                    <p className="text-muted-foreground">(11) 99999-9999</p>
                    <p className="text-sm text-muted-foreground">Seg-Sex: 9h às 18h</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Endereço</h4>
                    <p className="text-muted-foreground">
                      Av. Paulista, 1000<br />
                      São Paulo, SP - 01310-100
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <Card className="bg-gradient-primary text-primary-foreground border-0">
              <CardContent className="p-8">
                <h4 className="text-xl font-bold mb-4">
                  Prefere uma demonstração ao vivo?
                </h4>
                <p className="mb-6 opacity-90">
                  Agende uma call de 30 minutos com nossos especialistas 
                  e veja como o AgendaFlow pode transformar seu negócio.
                </p>
                <Button variant="secondary" size="lg" className="w-full">
                  Agendar Demonstração
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}