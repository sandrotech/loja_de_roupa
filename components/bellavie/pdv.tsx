"use client";

import { useState } from "react";
import { Search, Plus, Minus, CreditCard, Smartphone, Banknote, ShoppingBag, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { products } from "@/lib/data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CartItem {
  product: typeof products[0];
  quantity: number;
}

interface PDVProps {
  onBack: () => void;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export function PDV({ onBack }: PDVProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const availableProducts = products.filter(
    (p) => p.stockJangurussu > 0 || p.stockLCavalcante > 0
  );

  const filteredProducts = availableProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: typeof products[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handlePayment = (method: string) => {
    setShowConfetti(true);
    toast.success("Venda finalizada! ✨", {
      description: `Mais uma cliente Bellavie feliz! Pagamento via ${method}.`,
    });

    setTimeout(() => {
      setShowConfetti(false);
      setCart([]);
    }, 3000);
  };

  return (
    <div className="p-8 h-full flex flex-col relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-center animate-bounce">
            <Sparkles className="w-24 h-24 text-[#9A7A8F] mx-auto mb-4" />
            <p className="text-3xl font-bold text-[#9A7A8F]">
              Mais uma cliente Bellavie feliz! ✨
            </p>
          </div>
          {/* Simulated confetti particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full animate-ping"
              style={{
                backgroundColor: i % 2 === 0 ? "#9A7A8F" : "#F9DDE5",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${1 + Math.random()}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">PDV Expresso</h1>
        <Badge className="bg-green-100 text-green-700 rounded-lg">
          Loja: Jangurussu
        </Badge>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        {/* Product Catalog */}
        <div className="lg:col-span-2 flex flex-col min-h-0">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar produto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl text-lg h-12"
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pb-4">
              {filteredProducts.map((product) => {
                const totalStock = product.stockJangurussu + product.stockLCavalcante;
                return (
                  <Card
                    key={product.id}
                    onClick={() => addToCart(product)}
                    className="p-4 rounded-2xl cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-[0_2px_10px_-3px_rgba(154,122,143,0.1)] hover:shadow-lg group"
                  >
                    <div className="aspect-square bg-secondary rounded-xl mb-3 flex items-center justify-center group-hover:bg-[#9A7A8F]/10 transition-colors">
                      <ShoppingBag className="w-12 h-12 text-[#9A7A8F]/40 group-hover:text-[#9A7A8F] transition-colors" />
                    </div>
                    <h4 className="font-semibold text-foreground text-sm line-clamp-1">
                      {product.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {product.size} • {product.color}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#9A7A8F]">
                        {formatCurrency(product.price)}
                      </span>
                      <Badge variant="secondary" className="text-xs rounded-lg">
                        {totalStock} un.
                      </Badge>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cart / Sacola */}
        <Card className="p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(154,122,143,0.1)] flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBag className="w-5 h-5 text-[#9A7A8F]" />
            <h3 className="font-semibold text-foreground">Sacola</h3>
            {cart.length > 0 && (
              <Badge className="bg-[#9A7A8F] text-white rounded-full ml-auto">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </Badge>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <ShoppingBag className="w-16 h-16 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Clique nos produtos para adicionar</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatCurrency(item.product.price)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-lg"
                        onClick={() => updateQuantity(item.product.id, -1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center font-bold text-foreground">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-lg"
                        onClick={() => updateQuantity(item.product.id, 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="mb-4" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-2xl font-bold text-[#9A7A8F]">
                    {formatCurrency(subtotal)}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <Button
                    onClick={() => handlePayment("Cartão")}
                    className="flex-col h-20 bg-[#9A7A8F] hover:bg-[#9A7A8F]/90 text-white rounded-xl transition-all duration-300 hover:shadow-lg"
                  >
                    <CreditCard className="w-6 h-6 mb-1" />
                    <span className="text-xs">Cartão</span>
                  </Button>
                  <Button
                    onClick={() => handlePayment("PIX")}
                    className="flex-col h-20 bg-[#9A7A8F] hover:bg-[#9A7A8F]/90 text-white rounded-xl transition-all duration-300 hover:shadow-lg"
                  >
                    <Smartphone className="w-6 h-6 mb-1" />
                    <span className="text-xs">PIX</span>
                  </Button>
                  <Button
                    onClick={() => handlePayment("Dinheiro")}
                    className="flex-col h-20 bg-[#9A7A8F] hover:bg-[#9A7A8F]/90 text-white rounded-xl transition-all duration-300 hover:shadow-lg"
                  >
                    <Banknote className="w-6 h-6 mb-1" />
                    <span className="text-xs">Dinheiro</span>
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
