"use client";

import { useProductContext } from "@/hooks/use-product-context";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function ProductCard() {
  const { product } = useProductContext();

  if (!product) return null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <Badge variant="secondary">ID: {product.id}</Badge>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4 space-y-2">
        <p className="text-sm text-muted-foreground">
          {product.description}
        </p>
        <div className="flex justify-between text-sm">
          <span>
            Precio: <strong>${product.price}</strong>
          </span>
          <span>
            Stock: <strong>{product.stock}</strong> unidades
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
