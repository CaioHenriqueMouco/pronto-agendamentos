import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminMetrics } from "./AdminMetrics";
import { AdminTenants } from "./AdminTenants";
import { AdminUsers } from "./AdminUsers";
import { AdminReports } from "./AdminReports";

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
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="tenants">Tenants</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <AdminMetrics />
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
      </Tabs>
    </div>
  );
};