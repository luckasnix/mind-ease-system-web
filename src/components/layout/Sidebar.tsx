import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Brain,
  CheckSquare,
  User,
  Settings,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

const navItems = [
  {
    title: "Painel Cognitivo",
    path: "/",
    icon: Brain,
    description: "Controle sua interface",
  },
  {
    title: "Tarefas",
    path: "/tasks",
    icon: CheckSquare,
    description: "Organize suas atividades",
  },
  {
    title: "Perfil",
    path: "/profile",
    icon: User,
    description: "Suas informações",
  },
  {
    title: "Configurações",
    path: "/settings",
    icon: Settings,
    description: "Personalize tudo",
  },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/10 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-3 rounded-xl bg-card shadow-lg border border-border/50 transition-all duration-300 hover:bg-muted"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full bg-sidebar z-50 transition-all duration-500 ease-calm border-r border-sidebar-border",
          isOpen ? "w-72 translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-20"
        )}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <div className="flex items-center gap-3 px-3 py-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span
              className={cn(
                "font-display font-bold text-xl text-sidebar-foreground transition-opacity duration-300",
                !isOpen && "lg:opacity-0 lg:w-0"
              )}
            >
              MindEase
            </span>
          </div>

          {/* Desktop collapse button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border shadow-md items-center justify-center hover:bg-muted transition-colors"
            aria-label={isOpen ? "Recolher menu" : "Expandir menu"}
          >
            <Menu className="w-3 h-3" />
          </button>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5 flex-shrink-0 transition-colors",
                      isActive ? "text-sidebar-primary" : "text-sidebar-foreground"
                    )}
                  />
                  <div
                    className={cn(
                      "flex flex-col transition-opacity duration-300",
                      !isOpen && "lg:opacity-0 lg:w-0 lg:overflow-hidden"
                    )}
                  >
                    <span className="font-medium text-sm">{item.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  </div>
                </NavLink>
              );
            })}
          </nav>

          {/* Footer hint */}
          <div
            className={cn(
              "px-4 py-3 rounded-xl bg-primary-soft transition-opacity duration-300",
              !isOpen && "lg:opacity-0"
            )}
          >
            <p className="text-xs text-muted-foreground leading-relaxed">
              💡 Use o painel cognitivo para ajustar a complexidade da interface ao seu ritmo.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
