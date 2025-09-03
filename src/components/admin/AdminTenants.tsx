import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, Trash2, Plus } from "lucide-react";

const tenants = [
  {
    id: 1,
    name: "Barbearia do João",
    domain: "barbearia-joao.agendaki.com",
    plan: "Pro",
    status: "Ativo",
    users: 8,
    appointments: 245,
    revenue: "R$ 89,90",
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Clínica Saúde Vital",
    domain: "clinica-vital.agendaki.com",
    plan: "Enterprise",
    status: "Ativo",
    users: 25,
    appointments: 892,
    revenue: "R$ 299,90",
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Estética Bella",
    domain: "estetica-bella.agendaki.com",
    plan: "Gratuito",
    status: "Ativo",
    users: 3,
    appointments: 67,
    revenue: "R$ 0,00",
    avatar: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Academia FitLife",
    domain: "academia-fitlife.agendaki.com",
    plan: "Pro",
    status: "Suspenso",
    users: 12,
    appointments: 156,
    revenue: "R$ 89,90",
    avatar: "/placeholder.svg"
  }
];

const getPlanColor = (plan: string) => {
  switch (plan) {
    case "Gratuito": return "default";
    case "Pro": return "secondary";
    case "Enterprise": return "default";
    default: return "default";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Ativo": return "default";
    case "Suspenso": return "destructive";
    case "Cancelado": return "secondary";
    default: return "default";
  }
};

export const AdminTenants = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Gestão de Tenants</CardTitle>
            <CardDescription>
              Gerencie todos os tenants da plataforma
            </CardDescription>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Tenant
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tenant</TableHead>
              <TableHead>Domínio</TableHead>
              <TableHead>Plano</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Usuários</TableHead>
              <TableHead>Agendamentos</TableHead>
              <TableHead>Receita</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenants.map((tenant) => (
              <TableRow key={tenant.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={tenant.avatar} />
                      <AvatarFallback>
                        {tenant.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{tenant.name}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {tenant.domain}
                </TableCell>
                <TableCell>
                  <Badge variant={getPlanColor(tenant.plan)}>
                    {tenant.plan}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(tenant.status)}>
                    {tenant.status}
                  </Badge>
                </TableCell>
                <TableCell>{tenant.users}</TableCell>
                <TableCell>{tenant.appointments}</TableCell>
                <TableCell className="font-medium">{tenant.revenue}</TableCell>
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
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};