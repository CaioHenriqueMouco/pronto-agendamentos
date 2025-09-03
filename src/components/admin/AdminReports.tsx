import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Download, 
  Calendar, 
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  FileText
} from "lucide-react";

const reportCards = [
  {
    title: "Relatório Financeiro",
    description: "Receita, faturamento e métricas financeiras detalhadas",
    icon: DollarSign,
    period: "Mensal",
    lastGenerated: "Há 2 horas",
    actions: ["Visualizar", "Exportar PDF", "Exportar Excel"]
  },
  {
    title: "Análise de Usuários",
    description: "Dados de crescimento, retenção e comportamento dos usuários",
    icon: Users,
    period: "Semanal",
    lastGenerated: "Ontem",
    actions: ["Visualizar", "Exportar CSV", "Compartilhar"]
  },
  {
    title: "Performance dos Tenants",
    description: "Métricas de uso, agendamentos e satisfação por tenant",
    icon: BarChart3,
    period: "Mensal",
    lastGenerated: "Há 1 dia",
    actions: ["Visualizar", "Exportar PDF", "Agendar"]
  },
  {
    title: "Agendamentos e Ocupação",
    description: "Taxa de ocupação, no-show e otimização de horários",
    icon: Calendar,
    period: "Diário",
    lastGenerated: "Há 6 horas",
    actions: ["Visualizar", "Exportar Excel", "Dashboard"]
  }
];

const kpis = [
  {
    title: "Taxa de Conversão",
    value: "23.5%",
    change: "+5.2%",
    trend: "up",
    description: "Visitantes → Agendamentos"
  },
  {
    title: "CAC Médio",
    value: "R$ 45,20",
    change: "-12%",
    trend: "down",
    description: "Custo de Aquisição de Cliente"
  },
  {
    title: "LTV Médio",
    value: "R$ 890,50",
    change: "+18%",
    trend: "up",
    description: "Lifetime Value por Cliente"
  },
  {
    title: "Churn Rate",
    value: "3.2%",
    change: "-0.8%",
    trend: "down",
    description: "Taxa de Cancelamento Mensal"
  }
];

export const AdminReports = () => {
  return (
    <div className="space-y-6">
      {/* KPIs Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {kpi.title}
              </CardTitle>
              <TrendingUp className={`h-4 w-4 ${
                kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'
              }`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span className={kpi.trend === "up" ? "text-green-500" : "text-red-500"}>
                  {kpi.change}
                </span>
                <span>{kpi.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reports Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {reportCards.map((report) => (
          <Card key={report.title}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <report.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    <CardDescription>{report.description}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline">{report.period}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Última geração:</span>
                <span>{report.lastGenerated}</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {report.actions.map((action) => (
                  <Button key={action} variant="outline" size="sm">
                    {action === "Exportar PDF" && <FileText className="w-3 h-3 mr-1" />}
                    {action === "Exportar Excel" && <Download className="w-3 h-3 mr-1" />}
                    {action === "Exportar CSV" && <Download className="w-3 h-3 mr-1" />}
                    {action}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>
            Gere relatórios personalizados ou agende envios automáticos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button>
              <BarChart3 className="w-4 h-4 mr-2" />
              Relatório Customizado
            </Button>
            <Button variant="outline">
              <Clock className="w-4 h-4 mr-2" />
              Agendar Relatório
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar Dados Brutos
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};