import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminMetrics } from "./AdminMetrics";
import { AdminTenants } from "./AdminTenants";
import { AdminUsers } from "./AdminUsers";
import { AdminReports } from "./AdminReports";
import { AdminAppointments } from "./AdminAppointments";
import { AdminClients } from "./AdminClients";
import { AdminServices } from "./AdminServices";
import { AdminProfessionals } from "./AdminProfessionals";
import { AdminFinancial } from "./AdminFinancial";
import { AdminSettings } from "./AdminSettings";

export const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Dashboard Administrativo</h2>
        <p className="text-muted-foreground">
          Visão geral e gestão completa do sistema de agendamento
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
          <TabsTrigger value="clients">Clientes</TabsTrigger>
          <TabsTrigger value="professionals">Profissionais</TabsTrigger>
          <TabsTrigger value="services">Serviços</TabsTrigger>
          <TabsTrigger value="financial">Financeiro</TabsTrigger>
          <TabsTrigger value="tenants">Tenants</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <AdminMetrics />
        </TabsContent>
        
        <TabsContent value="appointments" className="space-y-4">
          <AdminAppointments />
        </TabsContent>
        
        <TabsContent value="clients" className="space-y-4">
          <AdminClients />
        </TabsContent>
        
        <TabsContent value="professionals" className="space-y-4">
          <AdminProfessionals />
        </TabsContent>
        
        <TabsContent value="services" className="space-y-4">
          <AdminServices />
        </TabsContent>
        
        <TabsContent value="financial" className="space-y-4">
          <AdminFinancial />
        </TabsContent>
        
        <TabsContent value="tenants" className="space-y-4">
          <AdminTenants />
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <AdminUsers />
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <AdminReports />
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <AdminSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};