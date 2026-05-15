"use client";

import { useState } from "react";
import { Search, MoreHorizontal, Edit, ArrowLeftRight, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { products, categories, colors, stores } from "@/lib/data";
import { cn } from "@/lib/utils";

interface StockControlProps {
  onTransferClick: () => void;
}

export function StockControl({ onTransferClick }: StockControlProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Todas");
  const [colorFilter, setColorFilter] = useState("Todas");
  const [storeFilter, setStoreFilter] = useState("Todas");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "Todas" || product.category === categoryFilter;
    const matchesColor =
      colorFilter === "Todas" || product.color === colorFilter;
    const matchesStore =
      storeFilter === "Todas" ||
      (storeFilter === "Jangurussu" && product.stockJangurussu > 0) ||
      (storeFilter === "L. Cavalcante" && product.stockLCavalcante > 0);

    return matchesSearch && matchesCategory && matchesColor && matchesStore;
  });

  const getStockStatus = (total: number) => {
    if (total === 0) return "ruptura";
    if (total <= 4) return "baixo";
    return "ok";
  };

  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      Blusas: "bg-pink-100 text-pink-700",
      Vestidos: "bg-purple-100 text-purple-700",
      Calças: "bg-blue-100 text-blue-700",
      Saias: "bg-amber-100 text-amber-700",
      Macacões: "bg-teal-100 text-teal-700",
      Shorts: "bg-indigo-100 text-indigo-700",
    };
    return colorMap[category] || "bg-slate-100 text-slate-700";
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Inventário Global</h1>
        
        {/* Filters */}
        <Card className="p-4 rounded-2xl shadow-[0_2px_10px_-3px_rgba(154,122,143,0.1)]">
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-xl border-border/50 focus:border-[#9A7A8F] focus:ring-[#9A7A8F]/20"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40 rounded-xl">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={colorFilter} onValueChange={setColorFilter}>
              <SelectTrigger className="w-40 rounded-xl">
                <SelectValue placeholder="Cor" />
              </SelectTrigger>
              <SelectContent>
                {colors.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={storeFilter} onValueChange={setStoreFilter}>
              <SelectTrigger className="w-40 rounded-xl">
                <SelectValue placeholder="Loja" />
              </SelectTrigger>
              <SelectContent>
                {stores.map((store) => (
                  <SelectItem key={store} value={store}>
                    {store}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>
      </div>

      {/* Table */}
      <Card className="rounded-2xl shadow-[0_2px_10px_-3px_rgba(154,122,143,0.1)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/30 hover:bg-secondary/30">
              <TableHead className="font-semibold text-foreground">Código</TableHead>
              <TableHead className="font-semibold text-foreground">Produto</TableHead>
              <TableHead className="font-semibold text-foreground">Categoria</TableHead>
              <TableHead className="font-semibold text-foreground">Cor</TableHead>
              <TableHead className="font-semibold text-foreground">Tamanho</TableHead>
              <TableHead className="font-semibold text-foreground text-center">Jangurussu</TableHead>
              <TableHead className="font-semibold text-foreground text-center">L. Cavalcante</TableHead>
              <TableHead className="font-semibold text-foreground text-center">Total</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => {
              const total = product.stockJangurussu + product.stockLCavalcante;
              const status = getStockStatus(total);

              return (
                <TableRow
                  key={product.id}
                  className={cn(
                    "transition-colors",
                    status === "ruptura" && "bg-red-50 hover:bg-red-100"
                  )}
                >
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {product.code}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 border border-secondary">
                        <AvatarFallback className="bg-secondary text-[#9A7A8F] text-xs font-semibold">
                          {product.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-foreground">{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={cn("rounded-lg font-medium", getCategoryColor(product.category))}
                    >
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-foreground">{product.color}</TableCell>
                  <TableCell className="text-foreground">{product.size}</TableCell>
                  <TableCell className="text-center font-medium text-foreground">
                    {product.stockJangurussu}
                  </TableCell>
                  <TableCell className="text-center font-medium text-foreground">
                    {product.stockLCavalcante}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      {status === "ok" && (
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                        </span>
                      )}
                      {status === "baixo" && (
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      )}
                      {status === "ruptura" && (
                        <Badge variant="destructive" className="text-xs rounded-lg">
                          Ruptura
                        </Badge>
                      )}
                      <span
                        className={cn(
                          "font-bold",
                          status === "ruptura" && "text-destructive"
                        )}
                      >
                        {total}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-xl hover:bg-secondary"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl">
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                          <Edit className="w-4 h-4" />
                          Editar Produto
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer" onClick={onTransferClick}>
                          <ArrowLeftRight className="w-4 h-4" />
                          Transferir Rápido
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer text-amber-600">
                          <AlertTriangle className="w-4 h-4" />
                          Solicitar Reposição
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      {/* Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground px-2">
        <p>
          Exibindo {filteredProducts.length} de {products.length} produtos
        </p>
        <p>
          Total em estoque:{" "}
          <span className="font-bold text-[#9A7A8F]">
            {filteredProducts.reduce(
              (acc, p) => acc + p.stockJangurussu + p.stockLCavalcante,
              0
            )}{" "}
            peças
          </span>
        </p>
      </div>
    </div>
  );
}
