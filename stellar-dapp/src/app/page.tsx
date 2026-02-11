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

export default function Home() {
  const { product } = useProductContext();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Stellar Products
          </h1>
          <p className="mt-2 text-muted-foreground">
            Gestión de productos en Soroban
          </p>
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
            <>
              <ProductCard />

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Actualizar Stock
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <UpdateStockForm />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Actualizar Precio
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <UpdatePriceForm />
                  </CardContent>
                </Card>
              </div>
            </>
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
