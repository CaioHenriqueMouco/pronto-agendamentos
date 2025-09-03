import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Calendar, User, Shield } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (userType: string) => {
    setIsLoading(true);
    
    // Simular autenticação
    setTimeout(() => {
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo como ${userType}`,
      });
      
      if (userType === "Admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      setIsLoading(false);
    }, 1000);
  };

  const demoAccounts = [
    {
      type: "Admin",
      email: "admin@agendaki.com",
      password: "admin123",
      icon: Shield,
      description: "Acesso completo ao painel administrativo",
      badge: "Enterprise"
    },
    {
      type: "Prestador",
      email: "prestador@barbearia.com",
      password: "prestador123",
      icon: User,
      description: "Gerenciar serviços e agendamentos",
      badge: "Pro"
    },
    {
      type: "Cliente",
      email: "cliente@email.com",
      password: "cliente123",
      icon: Calendar,
      description: "Agendar serviços e visualizar histórico",
      badge: "Gratuito"
    }
  ];

  const fillDemo = (account: typeof demoAccounts[0]) => {
    setEmail(account.email);
    setPassword(account.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8">
        {/* Login Form */}
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Entrar na Plataforma</CardTitle>
            <CardDescription className="text-center">
              Sistema de Agendamento SaaS
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Cadastro</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => {
                    if (email.includes("admin")) {
                      handleLogin("Admin");
                    } else if (email.includes("prestador")) {
                      handleLogin("Prestador");
                    } else {
                      handleLogin("Cliente");
                    }
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </TabsContent>
              
              <TabsContent value="register" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-register">E-mail</Label>
                  <Input
                    id="email-register"
                    type="email"
                    placeholder="seu@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-register">Senha</Label>
                  <Input
                    id="password-register"
                    type="password"
                    placeholder="Digite sua senha"
                  />
                </div>
                <Button className="w-full">
                  Criar Conta
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card>
          <CardHeader>
            <CardTitle>Contas Demo</CardTitle>
            <CardDescription>
              Teste diferentes níveis de acesso clicando nas contas abaixo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {demoAccounts.map((account) => (
              <div
                key={account.type}
                className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => fillDemo(account)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <account.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{account.type}</h3>
                      <p className="text-sm text-muted-foreground">{account.description}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{account.badge}</Badge>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div><strong>E-mail:</strong> {account.email}</div>
                  <div><strong>Senha:</strong> {account.password}</div>
                </div>
              </div>
            ))}
            
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Como usar:</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Clique em qualquer conta demo para preencher automaticamente</li>
                <li>• Use a conta Admin para acessar o painel administrativo</li>
                <li>• Cada tipo de usuário tem permissões diferentes</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;