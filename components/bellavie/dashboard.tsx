"use client";

import { Plus, Sun, Cloud, CloudRain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { dailyGoal, stockMetrics, movements, salesData } from "@/lib/data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Simulated weather - in production this would come from an API
const getWeatherIcon = () => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 18) return <Sun className="w-5 h-5 text-amber-500" />;
  return <Cloud className="w-5 h-5 text-slate-400" />;
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const formatTimeAgo = (date: Date) => {
  const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
  if (minutes < 60) return `${minutes}min atrás`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h atrás`;
};

interface DashboardProps {
  onNewSale: () => void;
}

export function Dashboard({ onNewSale }: DashboardProps) {
  const progressPercentage = (dailyGoal.current / dailyGoal.target) * 100;

  return (
    <div className="p-8 space-y-6">
      {/* Header with greeting */}
      <Card className="p-6 bg-gradient-to-r from-[#9A7A8F]/10 to-[#F9DDE5]/30 border-none rounded-2xl shadow-[0_2px_10px_-3px_rgba(154,122,143,0.15)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getWeatherIcon()}
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {getGreeting()}, Equipe!
              </h1>
              <p className="text-muted-foreground">
                O clima em Fortaleza está ótimo para batermos metas hoje! ☀️
              </p>
            </div>
          </div>
          <Button
            onClick={onNewSale}
            className="bg-[#9A7A8F] hover:bg-[#9A7A8F]/90 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nova Venda
          </Button>
        </div>
      </Card>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Goal Progress - Wide Card */}
        <Card className="col-span-full lg:col-span-2 p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(154,122,143,0.1)] hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-[#9A7A8F] rounded-full animate-pulse" />
            <h3 className="font-semibold text-foreground">Radar de Metas</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Meta semanal</span>
              <span className="font-bold text-[#9A7A8F]">
                {dailyGoal.current}/{dailyGoal.target} peças
              </span>
            </div>
            <Progress
              value={progressPercentage}
              className="h-3 bg-secondary"
            />
            <p className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-xl">
              {dailyGoal.message}
            </p>
          </div>
        </Card>

        {/* Metric Cards */}
        <Card className="p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(154,122,143,0.1)] hover:-translate-y-1 transition-all duration-300">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Valor em Estoque
          </p>
          <p className="text-2xl font-bold text-foreground">
            {formatCurrency(stockMetrics.totalValue)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {stockMetrics.totalProducts} produtos cadastrados
          </p>
        </Card>

        <Card className="p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(154,122,143,0.1)] hover:-translate-y-1 transition-all duration-300">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Peças Jangurussu
          </p>
          <p className="text-2xl font-bold text-[#9A7A8F]">
            {stockMetrics.totalJangurussu}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            <p className="text-xs text-muted-foreground">Estoque saudável</p>
          </div>
        </Card>

        {/* Stock by Store - Second Row */}
        <Card className="p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(154,122,143,0.1)] hover:-translate-y-1 transition-all duration-300">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Peças L. Cavalcante
          </p>
          <p className="text-2xl font-bold text-[#9A7A8F]">
            {stockMetrics.totalLCavalcante}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <span className="w-2 h-2 bg-amber-500 rounded-full" />
            <p className="text-xs text-muted-foreground">Verificar reposição</p>
          </div>
        </Card>

        {/* Sales Chart */}
        <Card className="col-span-full lg:col-span-2 p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(154,122,143,0.1)] hover:-translate-y-1 transition-all duration-300">
          <h3 className="font-semibold text-foreground mb-4">
            Giro de Produtos (Semana)
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar
                  dataKey="vendas"
                  fill="#9A7A8F"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Activity Feed */}
        <Card className="col-span-full lg:col-span-1 p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(154,122,143,0.1)] hover:-translate-y-1 transition-all duration-300">
          <h3 className="font-semibold text-foreground mb-4">
            Últimas Movimentações
          </h3>
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {movements.slice(0, 5).map((movement) => (
              <div key={movement.id} className="flex items-start gap-3">
                <Avatar className="w-8 h-8 border border-secondary">
                  <AvatarFallback className="bg-secondary text-[#9A7A8F] text-xs font-semibold">
                    {movement.user.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground line-clamp-2">
                    <span className="font-semibold">{movement.user}</span>{" "}
                    {movement.description.replace(movement.user, "").trim()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatTimeAgo(movement.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
