"use client";

import { useState } from "react";
import { Login } from "@/components/bellavie/login";
import { Sidebar } from "@/components/bellavie/sidebar";
import { MobileNav } from "@/components/bellavie/mobile-nav";
import { Dashboard } from "@/components/bellavie/dashboard";
import { StockControl } from "@/components/bellavie/stock-control";
import { Logistics } from "@/components/bellavie/logistics";
import { PDV } from "@/components/bellavie/pdv";
import { ReplenishmentHub } from "@/components/bellavie/replenishment-hub";
import { GoalsReports } from "@/components/bellavie/goals-reports";

interface User {
  name: string;
  role: string;
  store: string;
}

export default function BellavieHub() {
  const [user, setUser] = useState<User | null>(null);
  const [activeScreen, setActiveScreen] = useState("dashboard");

  // Tela de login se não autenticado
  if (!user) {
    return <Login onLogin={setUser} />;
  }

  const handleLogout = () => {
    setUser(null);
    setActiveScreen("dashboard");
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case "dashboard":
        return <Dashboard onNewSale={() => setActiveScreen("pdv")} />;
      case "pdv":
        return <PDV onBack={() => setActiveScreen("dashboard")} />;
      case "estoque":
        return <StockControl onTransferClick={() => setActiveScreen("logistica")} />;
      case "logistica":
        return <Logistics />;
      case "reposicao":
        return <ReplenishmentHub />;
      case "metas":
        return <GoalsReports />;
      default:
        return <Dashboard onNewSale={() => setActiveScreen("pdv")} />;
    }
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-slate-50">
      {/* Layout principal com sidebar (desktop) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar: visível apenas em md+ */}
        <div className="hidden md:block">
          <Sidebar
            activeScreen={activeScreen}
            onNavigate={setActiveScreen}
            user={user}
            onLogout={handleLogout}
          />
        </div>

        {/* Conteúdo principal */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {renderScreen()}
        </main>
      </div>

      {/* Bottom Nav: visível apenas em mobile */}
      <div className="block md:hidden">
        <MobileNav
          activeScreen={activeScreen}
          onNavigate={setActiveScreen}
          onLogout={handleLogout}
        />
      </div>
    </div>
  );
}
