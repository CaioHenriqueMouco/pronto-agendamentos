import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Agendamento from "./pages/Agendamento";
import NotFound from "./pages/NotFound";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Agendamentos from "./pages/admin/Agendamentos";
import Clientes from "./pages/admin/Clientes";
import Profissionais from "./pages/admin/Profissionais";
import Servicos from "./pages/admin/Servicos";
import Financeiro from "./pages/admin/Financeiro";
import Tenants from "./pages/admin/Tenants";
import Usuarios from "./pages/admin/Usuarios";
import Relatorios from "./pages/admin/Relatorios";
import Configuracoes from "./pages/admin/Configuracoes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/agendamento" element={<Agendamento />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="agendamentos" element={<Agendamentos />} />
            <Route path="clientes" element={<Clientes />} />
            <Route path="profissionais" element={<Profissionais />} />
            <Route path="servicos" element={<Servicos />} />
            <Route path="financeiro" element={<Financeiro />} />
            <Route path="tenants" element={<Tenants />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="relatorios" element={<Relatorios />} />
            <Route path="configuracoes" element={<Configuracoes />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
