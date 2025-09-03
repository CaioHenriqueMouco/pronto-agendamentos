import { Button } from "@/components/ui/button";
import { Calendar, Menu, Settings, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Calendar className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">AgendaFlow</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Recursos
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Preços
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contato
            </a>
            <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
              <User className="h-4 w-4 mr-2" />
              Entrar
            </Button>
            <Button variant="hero" size="default" onClick={() => navigate("/login")}>
              Começar Grátis
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-muted-foreground hover:text-foreground">
                Recursos
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground">
                Preços
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground">
                Contato
              </a>
              <div className="flex flex-col gap-2 pt-2">
                <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                  <User className="h-4 w-4 mr-2" />
                  Entrar
                </Button>
                <Button variant="hero" size="default" onClick={() => navigate("/login")}>
                  Começar Grátis
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}