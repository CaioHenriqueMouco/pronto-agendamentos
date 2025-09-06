import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, TrendingDown, Calendar, CreditCard, Download, Filter } from "lucide-react";

const mockFinancialData = {
  summary: {
    totalRevenue: 45750.00,
    monthlyRevenue: 8950.00,
    pendingPayments: 2450.00,
    monthlyGrowth: 12.5
  },
  transactions: [
    {
      id: "1",
      client: "Maria Silva",
      service: "Consulta Geral",
      amount: 150.00,
      status: "pago",
      method: "cartao",
      date: "2024-01-15",
      appointmentId: "AGD001"
    },
    {
      id: "2",
      client: "Pedro Costa", 
      service: "Fisioterapia",
      amount: 80.00,
      status: "pendente",
      method: "dinheiro",
      date: "2024-01-15",
      appointmentId: "AGD002"
    },
    {
      id: "3",
      client: "Carlos Oliveira",
      service: "Retorno",
      amount: 100.00,
      status: "estornado",
      method: "pix",
      date: "2024-01-14",
      appointmentId: "AGD003"
    }
  ]
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "pago": return "default";
    case "pendente": return "secondary";
    case "estornado": return "destructive";
    default: return "default";
  }
};

const getMethodIcon = (method: string) => {
  switch (method) {
    case "cartao": return <CreditCard className="w-4 h-4" />;
    case "pix": return "💳";
    case "dinheiro": return "💵";
    default: return <CreditCard className="w-4 h-4" />;
  }
};

export const AdminFinancial = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(mockFinancialData.summary.totalRevenue)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(mockFinancialData.summary.monthlyRevenue)}
            </div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              +{mockFinancialData.summary.monthlyGrowth}% vs mês anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagamentos Pendentes</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(mockFinancialData.summary.pendingPayments)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <div className="text-xs text-muted-foreground">
              Pagamentos vs Agendamentos
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Transações Recentes
              </CardTitle>
              <CardDescription>
                Histórico de pagamentos e movimentações financeiras
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Serviço</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>ID Agendamento</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockFinancialData.transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.client}
                    </TableCell>
                    <TableCell>{transaction.service}</TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getMethodIcon(transaction.method)}
                        <span className="capitalize">{transaction.method}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell className="text-muted-foreground font-mono text-sm">
                      {transaction.appointmentId}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};