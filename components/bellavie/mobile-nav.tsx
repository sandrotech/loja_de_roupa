"use client";

import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  ArrowLeftRight,
  AlertTriangle,
  BarChart3,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

const navItems = [
  { id: "dashboard", label: "Início", icon: LayoutDashboard },
  { id: "pdv", label: "PDV", icon: ShoppingCart },
  { id: "estoque", label: "Estoque", icon: Package },
  { id: "logistica", label: "Logística", icon: ArrowLeftRight },
  { id: "metas", label: "Metas", icon: BarChart3 },
];

export function MobileNav({ activeScreen, onNavigate, onLogout }: MobileNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-border/60 shadow-[0_-4px_20px_-4px_rgba(154,122,143,0.15)]">
      <div className="flex items-center justify-around px-1 py-2 safe-area-bottom">
        {navItems.map((item) => {
          const isActive = activeScreen === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-200 min-w-[56px]",
                isActive
                  ? "bg-[#F9DDE5] text-[#9A7A8F]"
                  : "text-muted-foreground hover:text-[#9A7A8F]"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-transform duration-200",
                  isActive && "scale-110"
                )}
              />
              <span
                className={cn(
                  "text-[10px] font-semibold tracking-tight leading-none",
                  isActive ? "text-[#9A7A8F]" : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Botão de sair */}
        <button
          onClick={onLogout}
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-200 min-w-[56px] text-muted-foreground hover:text-destructive"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-[10px] font-semibold tracking-tight leading-none">Sair</span>
        </button>
      </div>
    </nav>
  );
}
