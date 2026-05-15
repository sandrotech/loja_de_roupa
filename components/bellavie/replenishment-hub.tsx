"use client";

import { AlertTriangle, MessageCircle, Package } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/data";

export function ReplenishmentHub() {
  const outOfStockProducts = products.filter(
    (p) => p.stockJangurussu + p.stockLCavalcante === 0
  );

  const lowStockProducts = products.filter((p) => {
    const total = p.stockJangurussu + p.stockLCavalcante;
    return total > 0 && total <= 3;
  });

  const generateWhatsAppLink = (product: typeof products[0]) => {
    const message = encodeURIComponent(
      `Olá! Preciso repor o estoque do produto:\n\n` +
      `📦 ${product.name}\n` +
      `🏷️ Código: ${product.code}\n` +
      `📁 Categoria: ${product.category}\n` +
      `🎨 Cor: ${product.color}\n` +
      `📏 Tamanho: ${product.size}\n\n` +
      `Por favor, confirme disponibilidade e prazo de entrega.`
    );
    return `https://wa.me/?text=${message}`;
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Hub de Reposição</h1>
          <p className="text-muted-foreground">
            Produtos que precisam de atenção urgente
          </p>
        </div>
      </div>

      {/* Out of Stock Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="destructive" className="rounded-lg">
            Ruptura Total
          </Badge>
          <span className="text-sm text-muted-foreground">
            {outOfStockProducts.length} produtos sem estoque
          </span>
        </div>

        {outOfStockProducts.length === 0 ? (
          <Card className="p-8 rounded-2xl shadow-[0_2px_10px_-3px_rgba(154,122,143,0.1)] text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-green-500" />
            <h3 className="font-semibold text-foreground text-lg mb-2">
              Estoque em dia! 🎉
            </h3>
            <p className="text-muted-foreground">
              Nenhum produto em ruptura total no momento.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {outOfStockProducts.map((product) => (
              <Card
                key={product.id}
                className="p-5 rounded-2xl shadow-[0_2px_10px_-3px_rgba(154,122,143,0.1)] border-l-4 border-l-red-500 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground">{product.name}</h4>
                    <p className="text-xs text-muted-foreground font-mono">
                      {product.code}
                    </p>
                  </div>
                  <Badge variant="destructive" className="rounded-lg text-xs">
                    0 un.
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <span>{product.category}</span>
                  <span>•</span>
                  <span>{product.color}</span>
                  <span>•</span>
                  <span>{product.size}</span>
                </div>

                <Button
                  asChild
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-300"
                >
                  <a
                    href={generateWhatsAppLink(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Pedir à Fábrica/Fornecedor
                  </a>
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Low Stock Section */}
      <div className="space-y-4 mt-8">
        <div className="flex items-center gap-2">
          <Badge className="bg-amber-100 text-amber-700 rounded-lg">
            Estoque Baixo
          </Badge>
          <span className="text-sm text-muted-foreground">
            {lowStockProducts.length} produtos com estoque baixo
          </span>
        </div>

        {lowStockProducts.length === 0 ? (
          <Card className="p-8 rounded-2xl shadow-[0_2px_10px_-3px_rgba(154,122,143,0.1)] text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-green-500" />
            <p className="text-muted-foreground">
              Nenhum produto com estoque baixo.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lowStockProducts.map((product) => {
              const total = product.stockJangurussu + product.stockLCavalcante;
              return (
                <Card
                  key={product.id}
                  className="p-5 rounded-2xl shadow-[0_2px_10px_-3px_rgba(154,122,143,0.1)] border-l-4 border-l-amber-500 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-foreground">{product.name}</h4>
                      <p className="text-xs text-muted-foreground font-mono">
                        {product.code}
                      </p>
                    </div>
                    <Badge className="bg-amber-100 text-amber-700 rounded-lg text-xs">
                      {total} un.
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <span>{product.category}</span>
                    <span>•</span>
                    <span>{product.color}</span>
                    <span>•</span>
                    <span>{product.size}</span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span>Jangurussu: <strong className="text-foreground">{product.stockJangurussu}</strong></span>
                    <span>L. Cavalcante: <strong className="text-foreground">{product.stockLCavalcante}</strong></span>
                  </div>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-xl border-amber-300 text-amber-700 hover:bg-amber-50 transition-all duration-300"
                  >
                    <a
                      href={generateWhatsAppLink(product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Solicitar Reposição
                    </a>
                  </Button>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
