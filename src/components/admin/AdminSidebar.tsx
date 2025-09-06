import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings, 
  BarChart3, 
  CreditCard, 
  Building, 
  Shield,
  Palette,
  Bell
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Calendar, label: "Agendamentos", id: "appointments" },
  { icon: Users, label: "Clientes", id: "clients" },
  { icon: Shield, label: "Profissionais", id: "professionals" },
  { icon: Settings, label: "Serviços", id: "services" },
  { icon: CreditCard, label: "Financeiro", id: "financial" },
  { icon: Building, label: "Tenants", id: "tenants" },
  { icon: Users, label: "Usuários", id: "users" },
  { icon: BarChart3, label: "Relatórios", id: "reports" },
  { icon: Settings, label: "Configurações", id: "settings" },
];

export const AdminSidebar = () => {
  return (
    <div className="w-64 bg-card border-r border-border min-h-screen">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold text-foreground">Admin Panel</h2>
        <p className="text-sm text-muted-foreground">Sistema de Agendamento</p>
      </div>
      
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={item.id === "dashboard" ? "default" : "ghost"}
            className={cn(
              "w-full justify-start",
              item.id === "dashboard" && "bg-primary text-primary-foreground"
            )}
          >
            <item.icon className="w-4 h-4 mr-3" />
            {item.label}
          </Button>
        ))}
      </nav>
    </div>
  );
};