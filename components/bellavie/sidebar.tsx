"use client";

import { useState } from "react";
import Image from "next/image";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  ArrowLeftRight,
  AlertTriangle,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

const menuItems = [
  {
    category: "VISÃO GERAL",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    category: "OPERAÇÃO DAS LOJAS",
    items: [
      { id: "pdv", label: "PDV Expresso", icon: ShoppingCart, isNew: true },
      { id: "estoque", label: "Controle de Estoque", icon: Package },
      { id: "logistica", label: "Logística & Transferências", icon: ArrowLeftRight },
    ],
  },
  {
    category: "INTELIGÊNCIA",
    items: [
      { id: "reposicao", label: "Hub de Reposição", icon: AlertTriangle },
      { id: "metas", label: "Metas e Relatórios", icon: BarChart3 },
    ],
  },
];

export function Sidebar({ activeScreen, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "h-screen bg-white/80 backdrop-blur-md border-r border-border flex flex-col transition-all duration-300 shadow-[0_2px_10px_-3px_rgba(154,122,143,0.1)]",
        collapsed ? "w-20" : "w-72"
      )}
    >
      {/* Logo */}
      <div className="p-6 flex items-center justify-between border-b border-border/50">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <Image
              src="/logo_bellavie.jpeg"
              alt="Bellavie"
              width={140}
              height={45}
              className="object-contain"
            />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="hover:bg-secondary/50 rounded-xl"
        >
          {collapsed ? <Menu className="w-5 h-5 text-primary" /> : <ChevronLeft className="w-5 h-5 text-primary" />}
        </Button>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        {menuItems.map((section) => (
          <div key={section.category}>
            {!collapsed && (
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
                {section.category}
              </p>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = activeScreen === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group",
                      isActive
                        ? "bg-secondary text-[#9A7A8F] shadow-sm"
                        : "hover:bg-secondary/50 text-foreground hover:-translate-y-0.5"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5 transition-colors",
                        isActive ? "text-[#9A7A8F]" : "text-muted-foreground group-hover:text-[#9A7A8F]"
                      )}
                    />
                    {!collapsed && (
                      <>
                        <span className="font-medium text-sm">{item.label}</span>
                        {item.isNew && (
                          <span className="ml-auto text-[10px] font-bold bg-[#9A7A8F] text-white px-2 py-0.5 rounded-full">
                            NOVO
                          </span>
                        )}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border/50">
        <div
          className={cn(
            "flex items-center gap-3 p-3 rounded-xl bg-secondary/30",
            collapsed && "justify-center"
          )}
        >
          <Avatar className="w-10 h-10 border-2 border-[#9A7A8F]/20">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback className="bg-[#9A7A8F] text-white font-semibold">
              AN
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-foreground truncate">Ana Silva</p>
              <p className="text-xs text-muted-foreground truncate">Gerente Jangurussu</p>
            </div>
          )}
        </div>
        {!collapsed && (
          <div className="flex gap-2 mt-3">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-xl"
            >
              <Settings className="w-4 h-4 mr-2" />
              Config
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
}
