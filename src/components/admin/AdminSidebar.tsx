import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NavLink, useLocation } from "react-router-dom";
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
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Calendar, label: "Agendamentos", path: "/admin/agendamentos" },
  { icon: Users, label: "Clientes", path: "/admin/clientes" },
  { icon: Shield, label: "Profissionais", path: "/admin/profissionais" },
  { icon: Settings, label: "Serviços", path: "/admin/servicos" },
  { icon: CreditCard, label: "Financeiro", path: "/admin/financeiro" },
  { icon: Building, label: "Tenants", path: "/admin/tenants" },
  { icon: Users, label: "Usuários", path: "/admin/usuarios" },
  { icon: BarChart3, label: "Relatórios", path: "/admin/relatorios" },
  { icon: Settings, label: "Configurações", path: "/admin/configuracoes" },
];

export const AdminSidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-card border-r border-border min-h-screen">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold text-foreground">Admin Panel</h2>
        <p className="text-sm text-muted-foreground">Sistema de Agendamento</p>
      </div>
      
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path === "/admin" && location.pathname === "/admin");
          
          return (
            <NavLink key={item.path} to={item.path}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive && "bg-primary text-primary-foreground"
                )}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};