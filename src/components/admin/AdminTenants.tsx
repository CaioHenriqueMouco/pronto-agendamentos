import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Building2, Search, MoreHorizontal, Eye, Edit, UserX, CreditCard } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockTenants = [
  {
    id: "1",
    companyName: "Clínica Saúde Bem-Estar",
    responsible: "Dr. José Silva",
    email: "jose@clinicasaude.com.br",
    plan: "Pro",
    registrationDate: "2023-03-15",
    status: "ativo"
  },
  {
    id: "2",
    companyName: "Fisioterapia Total",
    responsible: "Ana Costa",
    email: "ana@fisiototal.com.br", 
    plan: "Enterprise",
    registrationDate: "2023-01-10",
    status: "ativo"
  },
  {
    id: "3",
    companyName: "Consultório Dr. Pedro",
    responsible: "Dr. Pedro Oliveira",
    email: "pedro@drpedro.com.br",
    plan: "Gratuito",
    registrationDate: "2023-12-05",
    status: "pagamento_pendente"
  },
  {
    id: "4",
    companyName: "Estética Avançada",
    responsible: "Carla Mendes",
    email: "carla@estetica.com.br",
    plan: "Pro",
    registrationDate: "2023-06-20",
    status: "inativo"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "ativo": return "default";
    case "inativo": return "secondary";
    case "pagamento_pendente": return "destructive";
    default: return "secondary";
  }
};

const getPlanColor = (plan: string) => {
  switch (plan) {
    case "Gratuito": return "outline";
    case "Pro": return "secondary";
    case "Enterprise": return "default";
    default: return "outline";
  }
};

export const AdminTenants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [planFilter, setPlanFilter] = useState("todos");
  const [statusFilter, setStatusFilter] = useState("todos");

  const filteredTenants = mockTenants.filter(tenant => {
    const matchesSearch = tenant.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.responsible.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = planFilter === "todos" || tenant.plan === planFilter;
    const matchesStatus = statusFilter === "todos" || tenant.status === statusFilter;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Gerenciamento de Contas (Tenants)
          </CardTitle>
          <CardDescription>
            Gerencie todas as contas e organizações do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome da empresa ou responsável..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por plano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os planos</SelectItem>
                <SelectItem value="Gratuito">Gratuito</SelectItem>
                <SelectItem value="Pro">Pro</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="inativo">Inativo</SelectItem>
                <SelectItem value="pagamento_pendente">Pagamento Pendente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome da Empresa</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead>Data de Inscrição</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[70px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTenants.map((tenant) => (
                  <TableRow key={tenant.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{tenant.companyName}</div>
                        <div className="text-sm text-muted-foreground">{tenant.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{tenant.responsible}</TableCell>
                    <TableCell>
                      <Badge variant={getPlanColor(tenant.plan)}>
                        {tenant.plan}
                      </Badge>
                    </TableCell>
                    <TableCell>{tenant.registrationDate}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(tenant.status)}>
                        {tenant.status === "pagamento_pendente" ? "Pag. Pendente" : tenant.status}
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
                            <CreditCard className="mr-2 h-4 w-4" />
                            Alterar Plano
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <UserX className="mr-2 h-4 w-4" />
                            Suspender Conta
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