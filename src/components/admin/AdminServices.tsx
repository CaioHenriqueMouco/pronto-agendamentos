import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Settings, Search, Plus, MoreHorizontal, Eye, Edit, Trash2, Clock, DollarSign } from "lucide-react";

const mockServices = [
  {
    id: "1",
    name: "Consulta Geral",
    description: "Consulta médica geral com avaliação completa",
    duration: 60,
    price: 150.00,
    category: "Consultas",
    status: "ativo",
    professionals: ["Dr. João Santos", "Dra. Ana Lima"],
    totalBookings: 145
  },
  {
    id: "2", 
    name: "Fisioterapia",
    description: "Sessão de fisioterapia especializada",
    duration: 45,
    price: 80.00,
    category: "Terapias",
    status: "ativo",
    professionals: ["Dra. Ana Lima"],
    totalBookings: 89
  },
  {
    id: "3",
    name: "Retorno",
    description: "Consulta de retorno para acompanhamento",
    duration: 30,
    price: 100.00,
    category: "Consultas",
    status: "ativo",
    professionals: ["Dr. João Santos"],
    totalBookings: 67
  },
  {
    id: "4",
    name: "Exame Especializado",
    description: "Exame médico especializado - Temporariamente suspenso",
    duration: 90,
    price: 250.00,
    category: "Exames",
    status: "inativo",
    professionals: [],
    totalBookings: 12
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

export const AdminServices = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = mockServices.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <Settings className="w-5 h-5" />
            Gestão de Serviços
          </CardTitle>
          <CardDescription>
            Configure serviços, preços e disponibilidade para agendamentos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, descrição ou categoria..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Serviço
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Serviço</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Duração</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Profissionais</TableHead>
                  <TableHead>Agendamentos</TableHead>
                  <TableHead className="w-[70px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{service.name}</div>
                        <div className="text-sm text-muted-foreground max-w-[300px] truncate">
                          {service.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{service.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {service.duration}min
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 font-medium">
                        <DollarSign className="w-4 h-4" />
                        {formatPrice(service.price)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(service.status)}>
                        {service.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {service.professionals.length > 0 ? (
                          service.professionals.map((prof, index) => (
                            <div key={index} className="text-sm">
                              {prof}
                            </div>
                          ))
                        ) : (
                          <span className="text-sm text-muted-foreground">Nenhum</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-medium">{service.totalBookings}</span>
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
                            <Trash2 className="mr-2 h-4 w-4" />
                            {service.status === "ativo" ? "Desativar" : "Remover"}
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