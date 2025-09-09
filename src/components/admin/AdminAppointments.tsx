import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Calendar, Clock, Search, Filter, Plus, MoreHorizontal, Eye, Edit, X, DollarSign } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockAppointments = [
  {
    id: "1",
    client: "Maria Silva",
    professional: "Dr. João Santos",
    service: "Consulta Geral",
    date: "2024-01-15",
    time: "09:00",
    value: 150.00,
    status: "confirmado",
    payment: "pago",
    notes: "Primeira consulta"
  },
  {
    id: "2", 
    client: "Pedro Costa",
    professional: "Dra. Ana Lima",
    service: "Fisioterapia",
    date: "2024-01-15",
    time: "14:30",
    value: 80.00,
    status: "pendente",
    payment: "pendente",
    notes: ""
  },
  {
    id: "3",
    client: "Carlos Oliveira",
    professional: "Dr. João Santos", 
    service: "Retorno",
    date: "2024-01-16",
    time: "10:15",
    value: 100.00,
    status: "cancelado",
    payment: "estornado",
    notes: "Cancelado pelo cliente"
  },
  {
    id: "4",
    client: "Ana Paula",
    professional: "Dra. Ana Lima",
    service: "Consulta Especializada",
    date: "2024-01-17",
    time: "16:00",
    value: 200.00,
    status: "confirmado",
    payment: "pago",
    notes: "Paciente retornando"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmado": return "default";
    case "pendente": return "secondary";
    case "cancelado": return "destructive";
    default: return "default";
  }
};

const getPaymentColor = (payment: string) => {
  switch (payment) {
    case "pago": return "default";
    case "pendente": return "secondary";
    case "estornado": return "destructive";
    default: return "default";
  }
};

export const AdminAppointments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [professionalFilter, setProfessionalFilter] = useState("todos");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filteredAppointments = mockAppointments.filter(appointment => {
    const matchesSearch = appointment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.professional.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || appointment.status === statusFilter;
    const matchesProfessional = professionalFilter === "todos" || appointment.professional === professionalFilter;
    const matchesDateFrom = !dateFrom || appointment.date >= dateFrom;
    const matchesDateTo = !dateTo || appointment.date <= dateTo;
    return matchesSearch && matchesStatus && matchesProfessional && matchesDateFrom && matchesDateTo;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Gestão de Agendamentos
          </CardTitle>
          <CardDescription>
            Visualize e gerencie todos os agendamentos do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por cliente, profissional ou serviço..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Novo Agendamento
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex gap-2">
                <Input
                  type="date"
                  placeholder="Data inicial"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-40"
                />
                <Input
                  type="date"
                  placeholder="Data final"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-40"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os status</SelectItem>
                  <SelectItem value="confirmado">Confirmado</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>

              <Select value={professionalFilter} onValueChange={setProfessionalFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Profissional" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os profissionais</SelectItem>
                  <SelectItem value="Dr. João Santos">Dr. João Santos</SelectItem>
                  <SelectItem value="Dra. Ana Lima">Dra. Ana Lima</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Serviço</TableHead>
                  <TableHead>Profissional</TableHead>
                  <TableHead>Data e Hora</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[70px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">{appointment.client}</TableCell>
                    <TableCell>{appointment.service}</TableCell>
                    <TableCell>{appointment.professional}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-4 h-4" />
                        {appointment.date}
                        <Clock className="w-4 h-4 ml-2" />
                        {appointment.time}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 font-medium">
                        <DollarSign className="w-4 h-4" />
                        {formatPrice(appointment.value)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <X className="mr-2 h-4 w-4" />
                            Cancelar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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