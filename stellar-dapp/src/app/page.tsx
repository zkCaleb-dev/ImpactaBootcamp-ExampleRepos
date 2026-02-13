"use client";

import { SearchProductForm } from "@/components/SearchProductForm";
import { RegisterProductForm } from "@/components/RegisterProductForm";
import { UpdateStockForm } from "@/components/UpdateStockForm";
import { UpdatePriceForm } from "@/components/UpdatePriceForm";
import { ProductCard } from "@/components/ProductCard";
import { useProductContext } from "@/hooks/use-product-context";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { WalletButton } from "@/components/tw-blocks/wallet-kit/WalletButtons";
import { Package, DollarSign, PackagePlus } from "lucide-react";

export default function Home() {
  const { product } = useProductContext();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Stellar Products
          </h1>
          <p className="mt-2 text-muted-foreground">
            Gestión de productos en Soroban
          </p>

          <div className="flex w-full justify-center mt-4">
            <WalletButton />
          </div>
        </header>

        <div className="space-y-6">
          {/* Search */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Buscar Producto</CardTitle>
            </CardHeader>
            <CardContent>
              <SearchProductForm />
            </CardContent>
          </Card>

          {/* Product details */}
          {product && (
            <section className="space-y-6 rounded-xl border border-border/60 bg-muted/20 p-5 sm:p-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Package className="h-5 w-5" aria-hidden />
                <h2 className="text-sm font-medium uppercase tracking-wider">
                  Detalles del producto
                </h2>
              </div>

              <ProductCard />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Card className="border-border/80 shadow-sm transition-shadow hover:shadow-md">
                  <CardHeader className="flex flex-row items-center gap-3 pb-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <PackagePlus className="h-4 w-4" aria-hidden />
                    </div>
                    <CardTitle className="text-base font-semibold">
                      Actualizar Stock
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <UpdateStockForm />
                  </CardContent>
                </Card>

                <Card className="border-border/80 shadow-sm transition-shadow hover:shadow-md">
                  <CardHeader className="flex flex-row items-center gap-3 pb-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <DollarSign className="h-4 w-4" aria-hidden />
                    </div>
                    <CardTitle className="text-base font-semibold">
                      Actualizar Precio
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <UpdatePriceForm />
                  </CardContent>
                </Card>
              </div>
            </section>
          )}

          <Separator />

          {/* Register */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                Registrar Nuevo Producto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RegisterProductForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
