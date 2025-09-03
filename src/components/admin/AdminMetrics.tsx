import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Building, 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Clock,
  AlertTriangle
} from "lucide-react";

const metrics = [
  {
    title: "Total de Tenants",
    value: "247",
    change: "+12%",
    trend: "up",
    icon: Building,
    description: "vs. mês anterior"
  },
  {
    title: "Usuários Ativos",
    value: "8,549",
    change: "+23%",
    trend: "up",
    icon: Users,
    description: "usuários únicos este mês"
  },
  {
    title: "Agendamentos",
    value: "15,234",
    change: "+8%",
    trend: "up",
    icon: Calendar,
    description: "agendamentos este mês"
  },
  {
    title: "Receita Total",
    value: "R$ 89,450",
    change: "-3%",
    trend: "down",
    icon: DollarSign,
    description: "receita recorrente mensal"
  }
];

const plansUsage = [
  { plan: "Gratuito", count: 156, percentage: 63, color: "bg-muted" },
  { plan: "Pro", count: 67, percentage: 27, color: "bg-primary" },
  { plan: "Enterprise", count: 24, percentage: 10, color: "bg-accent" }
];

export const AdminMetrics = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              {metric.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={metric.trend === "up" ? "text-green-500" : "text-red-500"}>
                {metric.change}
              </span>
              <span>{metric.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Card className="md:col-span-2 lg:col-span-2">
        <CardHeader>
          <CardTitle>Distribuição de Planos</CardTitle>
          <CardDescription>
            Uso dos planos pelos tenants ativos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {plansUsage.map((plan) => (
            <div key={plan.plan} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded ${plan.color}`} />
                  <span className="text-sm font-medium">{plan.plan}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {plan.count} tenants
                  </span>
                  <Badge variant="outline">{plan.percentage}%</Badge>
                </div>
              </div>
              <Progress value={plan.percentage} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2 lg:col-span-2">
        <CardHeader>
          <CardTitle>Alertas do Sistema</CardTitle>
          <CardDescription>
            Monitore a saúde da plataforma
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <div>
              <p className="text-sm font-medium">3 tenants próximos do limite</p>
              <p className="text-xs text-muted-foreground">Plano gratuito - agendamentos</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Backup automático concluído</p>
              <p className="text-xs text-muted-foreground">Há 2 horas</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <div>
              <p className="text-sm font-medium">Performance otimizada</p>
              <p className="text-xs text-muted-foreground">Tempo de resposta -15%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};