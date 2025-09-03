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
import { MoreHorizontal, Eye, Edit, Ban, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const users = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@barbearia.com",
    role: "Admin",
    tenant: "Barbearia do João",
    status: "Ativo",
    lastLogin: "2 horas atrás",
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Dr. Maria Santos",
    email: "maria@clinica.com",
    role: "Prestador",
    tenant: "Clínica Saúde Vital",
    status: "Ativo",
    lastLogin: "1 dia atrás",
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Ana Costa",
    email: "ana@email.com",
    role: "Cliente",
    tenant: "Estética Bella",
    status: "Ativo",
    lastLogin: "3 dias atrás",
    avatar: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Carlos Oliveira",
    email: "carlos@academia.com",
    role: "Admin",
    tenant: "Academia FitLife",
    status: "Suspenso",
    lastLogin: "1 semana atrás",
    avatar: "/placeholder.svg"
  }
];

const getRoleColor = (role: string) => {
  switch (role) {
    case "Admin": return "default";
    case "Prestador": return "secondary";
    case "Cliente": return "outline";
    default: return "default";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Ativo": return "default";
    case "Suspenso": return "destructive";
    case "Inativo": return "secondary";
    default: return "default";
  }
};

export const AdminUsers = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Gestão de Usuários</CardTitle>
            <CardDescription>
              Gerencie todos os usuários da plataforma
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar usuários..." 
                className="pl-10 w-64"
              />
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Usuário
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuário</TableHead>
              <TableHead>Papel</TableHead>
              <TableHead>Tenant</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Último Login</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getRoleColor(user.role)}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {user.tenant}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(user.status)}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {user.lastLogin}
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
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Ban className="mr-2 h-4 w-4" />
                        Suspender
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