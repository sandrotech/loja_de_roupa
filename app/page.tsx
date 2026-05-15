"use client";

import { useState } from "react";
import { Sidebar } from "@/components/bellavie/sidebar";
import { Dashboard } from "@/components/bellavie/dashboard";
import { StockControl } from "@/components/bellavie/stock-control";
import { Logistics } from "@/components/bellavie/logistics";
import { PDV } from "@/components/bellavie/pdv";
import { ReplenishmentHub } from "@/components/bellavie/replenishment-hub";
import { GoalsReports } from "@/components/bellavie/goals-reports";

export default function BellavieHub() {
  const [activeScreen, setActiveScreen] = useState("dashboard");

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
    <div className="h-screen overflow-hidden flex bg-slate-50">
      <Sidebar activeScreen={activeScreen} onNavigate={setActiveScreen} />
      <main className="flex-1 overflow-y-auto">
        {renderScreen()}
      </main>
    </div>
  );
}
