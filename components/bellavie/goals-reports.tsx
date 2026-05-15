"use client";

import { BarChart3, Target, TrendingUp, TrendingDown, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const weeklyData = [
  { name: "Sem 1", vendas: 145, meta: 150 },
  { name: "Sem 2", vendas: 162, meta: 150 },
  { name: "Sem 3", vendas: 138, meta: 150 },
  { name: "Sem 4", vendas: 178, meta: 150 },
];

const categoryData = [
  { name: "Blusas", value: 35 },
  { name: "Vestidos", value: 25 },
  { name: "Calças", value: 20 },
  { name: "Saias", value: 12 },
  { name: "Outros", value: 8 },
];

const storeComparison = [
  { name: "Jan", jangurussu: 85, lcavalcante: 65 },
  { name: "Fev", jangurussu: 92, lcavalcante: 78 },
  { name: "Mar", jangurussu: 88, lcavalcante: 82 },
  { name: "Abr", jangurussu: 105, lcavalcante: 90 },
  { name: "Mai", jangurussu: 98, lcavalcante: 95 },
];

const topSellers = [
  { name: "Maria Silva", sales: 48, avatar: "MS" },
  { name: "Juliana Costa", sales: 42, avatar: "JC" },
  { name: "Carla Oliveira", sales: 38, avatar: "CO" },
  { name: "Ana Paula", sales: 35, avatar: "AP" },
];

const COLORS = ["#9A7A8F", "#F9DDE5", "#c4a7b8", "#fce7ef", "#2D1D25"];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export function GoalsReports() {
  const monthlyTarget = 150000;
  const monthlyCurrent = 112500;
  const monthlyProgress = (monthlyCurrent / monthlyTarget) * 100;

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-[#9A7A8F]/10 flex items-center justify-center">
          <BarChart3 className="w-6 h-6 text-[#9A7A8F]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Metas e Relatórios</h1>
          <p className="text-muted-foreground">
            Acompanhe o desempenho das lojas
          </p>
        </div>
      </div>

      {/* Main Goal Card */}
      <Card className="p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(154,122,143,0.1)] bg-gradient-to-r from-[#9A7A8F]/5 to-[#F9DDE5]/20">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-5 h-5 text-[#9A7A8F]" />
              <h3 className="font-semibold text-foreground">Meta Mensal - Maio 2024</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Faltam 8 dias para o fim do mês
            </p>
          </div>
          <Badge className="bg-amber-100 text-amber-700 rounded-lg">
            <TrendingUp className="w-3 h-3 mr-1" />
            75% atingido
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-bold text-foreground">
              {formatCurrency(monthlyCurrent)} / {formatCurrency(monthlyTarget)}
            </span>
          </div>
          <Progress value={monthlyProgress} className="h-4 bg-secondary" />
          <p className="text-sm text-muted-foreground">
            Faltam <span className="font-bold text-[#9A7A8F]">{formatCurrency(monthlyTarget - monthlyCurrent)}</span> para bater a meta! 💪
          </p>
        </div>
      </Card>

      {/* Grid of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Performance */}
        <Card className="p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(154,122,143,0.1)]">
          <h3 className="font-semibold text-foreground mb-4">
            Desempenho Semanal (Peças)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
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
                <Bar dataKey="vendas" fill="#9A7A8F" radius={[8, 8, 0, 0]} />
                <Bar dataKey="meta" fill="#F9DDE5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-[#9A7A8F]" />
              <span className="text-xs text-muted-foreground">Vendas</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-[#F9DDE5]" />
              <span className="text-xs text-muted-foreground">Meta</span>
            </div>
          </div>
        </Card>

        {/* Store Comparison */}
        <Card className="p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(154,122,143,0.1)]">
          <h3 className="font-semibold text-foreground mb-4">
            Comparativo por Loja
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={storeComparison}>
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
                <Line
                  type="monotone"
                  dataKey="jangurussu"
                  stroke="#9A7A8F"
                  strokeWidth={3}
                  dot={{ fill: "#9A7A8F", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="lcavalcante"
                  stroke="#F9DDE5"
                  strokeWidth={3}
                  dot={{ fill: "#F9DDE5", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-[#9A7A8F]" />
              <span className="text-xs text-muted-foreground">Jangurussu</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-[#F9DDE5]" />
              <span className="text-xs text-muted-foreground">L. Cavalcante</span>
            </div>
          </div>
        </Card>

        {/* Category Distribution */}
        <Card className="p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(154,122,143,0.1)]">
          <h3 className="font-semibold text-foreground mb-4">
            Vendas por Categoria
          </h3>
          <div className="h-64 flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {categoryData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Top Sellers */}
        <Card className="p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(154,122,143,0.1)]">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-[#9A7A8F]" />
            <h3 className="font-semibold text-foreground">
              Top Vendedoras do Mês
            </h3>
          </div>
          <div className="space-y-4">
            {topSellers.map((seller, index) => (
              <div
                key={seller.name}
                className="flex items-center gap-4 p-3 rounded-xl bg-secondary/30"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#9A7A8F]/10 text-[#9A7A8F] font-bold text-sm">
                  {index + 1}º
                </div>
                <Avatar className="w-10 h-10 border-2 border-[#9A7A8F]/20">
                  <AvatarFallback className="bg-[#9A7A8F] text-white font-semibold text-sm">
                    {seller.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{seller.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {seller.sales} vendas este mês
                  </p>
                </div>
                {index === 0 && (
                  <Badge className="bg-amber-100 text-amber-700 rounded-lg">
                    🏆 Líder
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 rounded-2xl shadow-[0_2px_10px_-3px_rgba(154,122,143,0.1)] hover:-translate-y-1 transition-all duration-300">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            Ticket Médio
          </p>
          <p className="text-2xl font-bold text-foreground">{formatCurrency(185.90)}</p>
          <div className="flex items-center gap-1 mt-1 text-green-600">
            <TrendingUp className="w-3 h-3" />
            <span className="text-xs">+12% vs mês anterior</span>
          </div>
        </Card>
        <Card className="p-4 rounded-2xl shadow-[0_2px_10px_-3px_rgba(154,122,143,0.1)] hover:-translate-y-1 transition-all duration-300">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            Itens por Venda
          </p>
          <p className="text-2xl font-bold text-foreground">2.4</p>
          <div className="flex items-center gap-1 mt-1 text-green-600">
            <TrendingUp className="w-3 h-3" />
            <span className="text-xs">+5% vs mês anterior</span>
          </div>
        </Card>
        <Card className="p-4 rounded-2xl shadow-[0_2px_10px_-3px_rgba(154,122,143,0.1)] hover:-translate-y-1 transition-all duration-300">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            Taxa de Conversão
          </p>
          <p className="text-2xl font-bold text-foreground">68%</p>
          <div className="flex items-center gap-1 mt-1 text-red-600">
            <TrendingDown className="w-3 h-3" />
            <span className="text-xs">-3% vs mês anterior</span>
          </div>
        </Card>
        <Card className="p-4 rounded-2xl shadow-[0_2px_10px_-3px_rgba(154,122,143,0.1)] hover:-translate-y-1 transition-all duration-300">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            Giro de Estoque
          </p>
          <p className="text-2xl font-bold text-foreground">4.2x</p>
          <div className="flex items-center gap-1 mt-1 text-green-600">
            <TrendingUp className="w-3 h-3" />
            <span className="text-xs">Excelente!</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
