import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCheck, Search, Plus, MoreHorizontal, Eye, Edit, Trash2, Phone, Mail, Clock, Calendar } from "lucide-react";

const mockProfessionals = [
  {
    id: "1",
    name: "Dr. João Santos",
    email: "joao.santos@clinica.com",
    phone: "(11) 99999-0001",
    avatar: "",
    specialties: ["Clínica Geral", "Cardiologia"],
    status: "ativo",
    schedule: "Seg-Sex: 08:00-17:00",
    totalAppointments: 234,
    thisWeekAppointments: 18,
    rating: 4.8,
    registeredAt: "2023-01-15"
  },
  {
    id: "2",
    name: "Dra. Ana Lima",
    email: "ana.lima@clinica.com", 
    phone: "(11) 99999-0002",
    avatar: "",
    specialties: ["Fisioterapia", "Reabilitação"],
    status: "ativo",
    schedule: "Seg-Qua: 09:00-18:00",
    totalAppointments: 156,
    thisWeekAppointments: 12,
    rating: 4.9,
    registeredAt: "2023-03-20"
  },
  {
    id: "3",
    name: "Dr. Carlos Medeiros",
    email: "carlos.medeiros@clinica.com",
    phone: "(11) 99999-0003", 
    avatar: "",
    specialties: ["Neurologia"],
    status: "inativo",
    schedule: "Temporarily suspended",
    totalAppointments: 89,
    thisWeekAppointments: 0,
    rating: 4.6,
    registeredAt: "2023-06-10"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "ativo": return "default";
    case "inativo": return "secondary";
    case "suspenso": return "destructive";
    default: return "default";
  }
};

export const AdminProfessionals = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProfessionals = mockProfessionals.filter(professional =>
    professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    professional.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    professional.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5" />
            Gestão de Profissionais
          </CardTitle>
          <CardDescription>
            Gerencie profissionais, horários e especialidades
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, email ou especialidade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Profissional
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Profissional</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Especialidades</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Horários</TableHead>
                  <TableHead>Agendamentos</TableHead>
                  <TableHead>Avaliação</TableHead>
                  <TableHead className="w-[70px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProfessionals.map((professional) => (
                  <TableRow key={professional.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={professional.avatar} alt={professional.name} />
                          <AvatarFallback>
                            {professional.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{professional.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Desde {professional.registeredAt}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="w-4 h-4" />
                          {professional.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="w-4 h-4" />
                          {professional.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {professional.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline" className="mr-1">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(professional.status)}>
                        {professional.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="w-4 h-4" />
                        {professional.schedule}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">
                          <span className="font-medium">{professional.totalAppointments}</span> total
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {professional.thisWeekAppointments} esta semana
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-medium">⭐ {professional.rating}</div>
                        <div className="text-xs text-muted-foreground">avaliação</div>
                      </div>
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
                            Ver Perfil
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Clock className="mr-2 h-4 w-4" />
                            Horários
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            {professional.status === "ativo" ? "Suspender" : "Reativar"}
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