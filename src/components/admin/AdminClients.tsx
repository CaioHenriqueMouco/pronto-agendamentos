import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Search, Plus, MoreHorizontal, Eye, Edit, Trash2, Phone, Mail, Calendar } from "lucide-react";

const mockClients = [
  {
    id: "1",
    name: "Maria Silva",
    email: "maria.silva@email.com",
    phone: "(11) 99999-9999",
    avatar: "",
    status: "ativo",
    totalAppointments: 12,
    lastAppointment: "2024-01-10",
    registeredAt: "2023-06-15",
    category: "vip"
  },
  {
    id: "2",
    name: "Pedro Costa",
    email: "pedro.costa@email.com", 
    phone: "(11) 88888-8888",
    avatar: "",
    status: "ativo",
    totalAppointments: 5,
    lastAppointment: "2024-01-08",
    registeredAt: "2023-12-01",
    category: "regular"
  },
  {
    id: "3",
    name: "Carlos Oliveira",
    email: "carlos.oliveira@email.com",
    phone: "(11) 77777-7777", 
    avatar: "",
    status: "inativo",
    totalAppointments: 2,
    lastAppointment: "2023-11-15",
    registeredAt: "2023-10-05",
    category: "novo"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "ativo": return "default";
    case "inativo": return "secondary";
    case "bloqueado": return "destructive";
    default: return "default";
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "vip": return "default";
    case "regular": return "secondary";
    case "novo": return "outline";
    default: return "secondary";
  }
};

export const AdminClients = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Gerenciamento de Clientes
          </CardTitle>
          <CardDescription>
            Gerencie informações dos clientes e histórico de agendamentos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, email ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Cliente
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome Completo</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Nº de Agendamentos</TableHead>
                  <TableHead className="w-[70px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={client.avatar} alt={client.name} />
                          <AvatarFallback>
                            {client.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{client.name}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {client.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {client.phone}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-medium">{client.totalAppointments}</span>
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
                            <Calendar className="mr-2 h-4 w-4" />
                            Ver Histórico
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Desativar
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