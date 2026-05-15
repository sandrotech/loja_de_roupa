"use client";

import { useState } from "react";
import { ArrowRight, Search, Minus, Plus, Package } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { products } from "@/lib/data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Store = "Jangurussu" | "L. Cavalcante" | null;

export function Logistics() {
  const [origin, setOrigin] = useState<Store>(null);
  const [destination, setDestination] = useState<Store>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [quantity, setQuantity] = useState(1);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectStore = (store: Store, type: "origin" | "destination") => {
    if (type === "origin") {
      setOrigin(store);
      if (store === destination) setDestination(null);
    } else {
      setDestination(store);
      if (store === origin) setOrigin(null);
    }
  };

  const getAvailableStock = () => {
    if (!selectedProduct || !origin) return 0;
    return origin === "Jangurussu"
      ? selectedProduct.stockJangurussu
      : selectedProduct.stockLCavalcante;
  };

  const getResultingStock = () => {
    if (!selectedProduct || !origin || !destination) return null;

    const originStock = origin === "Jangurussu" ? selectedProduct.stockJangurussu : selectedProduct.stockLCavalcante;
    const destStock = origin === "Jangurussu" ? selectedProduct.stockLCavalcante : selectedProduct.stockJangurussu;

    return {
      originBefore: originStock,
      originAfter: originStock - quantity,
      destBefore: destStock,
      destAfter: destStock + quantity,
    };
  };

  const handleTransfer = () => {
    if (!selectedProduct || !origin || !destination) return;

    toast.success("📦 Peças enviadas!", {
      description: `A loja ${destination} já foi notificada.`,
    });

    // Reset form
    setSelectedProduct(null);
    setQuantity(1);
    setSearchTerm("");
  };

  const resultingStock = getResultingStock();
  const availableStock = getAvailableStock();
  const canTransfer =
    origin &&
    destination &&
    selectedProduct &&
    quantity > 0 &&
    quantity <= availableStock;

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Logística & Transferências</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Store Selection */}
          <Card className="p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(154,122,143,0.1)]">
            <h3 className="font-semibold text-foreground mb-4">Selecionar Lojas</h3>
            
            <div className="flex items-center gap-4">
              {/* Origin */}
              <div className="flex-1 space-y-2">
                <Label className="text-muted-foreground text-sm">Origem</Label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleSelectStore("Jangurussu", "origin")}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all duration-300 text-left",
                      origin === "Jangurussu"
                        ? "border-[#9A7A8F] bg-secondary shadow-md"
                        : "border-border hover:border-[#9A7A8F]/50 hover:bg-secondary/50"
                    )}
                  >
                    <p className="font-semibold text-foreground">Jangurussu</p>
                    <p className="text-xs text-muted-foreground">Unidade 1</p>
                  </button>
                  <button
                    onClick={() => handleSelectStore("L. Cavalcante", "origin")}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all duration-300 text-left",
                      origin === "L. Cavalcante"
                        ? "border-[#9A7A8F] bg-secondary shadow-md"
                        : "border-border hover:border-[#9A7A8F]/50 hover:bg-secondary/50"
                    )}
                  >
                    <p className="font-semibold text-foreground">L. Cavalcante</p>
                    <p className="text-xs text-muted-foreground">Unidade 2</p>
                  </button>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center pt-6">
                <div className="w-12 h-12 rounded-full bg-[#9A7A8F] flex items-center justify-center shadow-lg">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Destination */}
              <div className="flex-1 space-y-2">
                <Label className="text-muted-foreground text-sm">Destino</Label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleSelectStore("Jangurussu", "destination")}
                    disabled={origin === "Jangurussu"}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all duration-300 text-left",
                      destination === "Jangurussu"
                        ? "border-[#9A7A8F] bg-secondary shadow-md"
                        : origin === "Jangurussu"
                        ? "border-border/30 opacity-50 cursor-not-allowed"
                        : "border-border hover:border-[#9A7A8F]/50 hover:bg-secondary/50"
                    )}
                  >
                    <p className="font-semibold text-foreground">Jangurussu</p>
                    <p className="text-xs text-muted-foreground">Unidade 1</p>
                  </button>
                  <button
                    onClick={() => handleSelectStore("L. Cavalcante", "destination")}
                    disabled={origin === "L. Cavalcante"}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all duration-300 text-left",
                      destination === "L. Cavalcante"
                        ? "border-[#9A7A8F] bg-secondary shadow-md"
                        : origin === "L. Cavalcante"
                        ? "border-border/30 opacity-50 cursor-not-allowed"
                        : "border-border hover:border-[#9A7A8F]/50 hover:bg-secondary/50"
                    )}
                  >
                    <p className="font-semibold text-foreground">L. Cavalcante</p>
                    <p className="text-xs text-muted-foreground">Unidade 2</p>
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Product Selection */}
          <Card className="p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(154,122,143,0.1)]">
            <h3 className="font-semibold text-foreground mb-4">Selecionar Produto</h3>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-xl"
              />
            </div>

            {searchTerm && (
              <div className="max-h-48 overflow-y-auto space-y-2 border border-border rounded-xl p-2">
                {filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      setSelectedProduct(product);
                      setSearchTerm("");
                      setQuantity(1);
                    }}
                    className="w-full p-3 rounded-xl hover:bg-secondary transition-colors text-left flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                      <Package className="w-5 h-5 text-[#9A7A8F]" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.code} • {product.category} • {product.color}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {selectedProduct && (
              <div className="mt-4 p-4 bg-secondary/50 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-semibold text-foreground">{selectedProduct.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedProduct.code} • {selectedProduct.category}
                    </p>
                  </div>
                  {origin && (
                    <p className="text-sm text-muted-foreground">
                      Disponível na origem:{" "}
                      <span className="font-bold text-[#9A7A8F]">{availableStock}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground text-sm">Quantidade</Label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="rounded-xl"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(
                          Math.min(
                            availableStock,
                            Math.max(1, parseInt(e.target.value) || 1)
                          )
                        )
                      }
                      className="w-20 text-center rounded-xl font-bold text-lg"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setQuantity(Math.min(availableStock, quantity + 1))
                      }
                      className="rounded-xl"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Right Column - Summary */}
        <div className="space-y-6">
          <Card className="p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(154,122,143,0.1)] sticky top-8">
            <h3 className="font-semibold text-foreground mb-4">
              Resumo da Transferência
            </h3>

            {!origin || !destination || !selectedProduct ? (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">
                  Selecione origem, destino e produto para ver o resumo
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-secondary/50 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Produto</span>
                    <span className="font-semibold text-foreground">
                      {selectedProduct.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Quantidade</span>
                    <span className="font-bold text-[#9A7A8F]">{quantity} peças</span>
                  </div>
                </div>

                {resultingStock && (
                  <>
                    <div className="p-4 border border-amber-200 bg-amber-50 rounded-xl">
                      <p className="text-sm font-medium text-amber-800 mb-2">
                        {origin}
                      </p>
                      <p className="text-xs text-amber-700">
                        Passará de{" "}
                        <span className="font-bold">{resultingStock.originBefore}</span>{" "}
                        para{" "}
                        <span className="font-bold">{resultingStock.originAfter}</span>{" "}
                        peças
                      </p>
                    </div>

                    <div className="p-4 border border-green-200 bg-green-50 rounded-xl">
                      <p className="text-sm font-medium text-green-800 mb-2">
                        {destination}
                      </p>
                      <p className="text-xs text-green-700">
                        Passará de{" "}
                        <span className="font-bold">{resultingStock.destBefore}</span>{" "}
                        para{" "}
                        <span className="font-bold">{resultingStock.destAfter}</span>{" "}
                        peças
                      </p>
                    </div>
                  </>
                )}

                <Button
                  onClick={handleTransfer}
                  disabled={!canTransfer}
                  className="w-full bg-[#9A7A8F] hover:bg-[#9A7A8F]/90 text-white rounded-xl h-12 font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-50"
                >
                  Confirmar Transferência
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
