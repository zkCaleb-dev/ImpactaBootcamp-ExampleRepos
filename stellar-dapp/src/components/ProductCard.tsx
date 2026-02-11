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
import { DollarSign, Package } from "lucide-react";

const STELLAR_EXPERT_BASE = "https://stellar.expert/explorer/testnet";

export function ProductCard() {
  const { product, txHash, contractId } = useProductContext();

  if (!product) return null;

  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
        <Badge variant="secondary" className="font-mono text-xs">
          ID: {product.id}
        </Badge>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4 space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {product.description}
        </p>
        <div className="flex flex-wrap gap-4 sm:gap-6">
          <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
            <DollarSign className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden />
            <span className="text-sm">
              <span className="text-muted-foreground">Precio</span>{" "}
              <strong className="text-foreground">${product.price}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
            <Package className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden />
            <span className="text-sm">
              <span className="text-muted-foreground">Stock</span>{" "}
              <strong className="text-foreground">{product.stock}</strong>{" "}
              <span className="text-muted-foreground">unidades</span>
            </span>
          </div>
        </div>

        {(contractId || txHash) && (
          <>
            <Separator />
            <div className="space-y-1.5 text-xs">
              {contractId && (
                <a
                  href={`${STELLAR_EXPERT_BASE}/contract/${contractId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-primary hover:underline truncate font-medium"
                >
                  Ver contrato en Stellar Expert →
                </a>
              )}
              {txHash && (
                <a
                  href={`${STELLAR_EXPERT_BASE}/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-primary hover:underline truncate font-medium"
                >
                  Ver transacción: {txHash.substring(0, 16)}... →
                </a>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
