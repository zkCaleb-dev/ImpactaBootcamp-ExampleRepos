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

const STELLAR_EXPERT_BASE = "https://stellar.expert/explorer/testnet";

export function ProductCard() {
  const { product, txHash, contractId } = useProductContext();

  if (!product) return null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <Badge variant="secondary">ID: {product.id}</Badge>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4 space-y-3">
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

        {(contractId || txHash) && (
          <>
            <Separator />
            <div className="space-y-1 text-xs">
              {contractId && (
                <a
                  href={`${STELLAR_EXPERT_BASE}/contract/${contractId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-500 hover:underline truncate"
                >
                  Ver contrato en Stellar Expert
                </a>
              )}
              {txHash && (
                <a
                  href={`${STELLAR_EXPERT_BASE}/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-500 hover:underline truncate"
                >
                  Ver transaccion: {txHash.substring(0, 16)}...
                </a>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
