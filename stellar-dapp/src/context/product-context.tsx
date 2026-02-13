"use client";

import { createContext, useState, useCallback, type ReactNode } from "react";
import type { Product } from "@/types/product";

export interface ProductContextValue {
  product: Product | null;
  txHash: string | null;
  contractId: string | null;
  setProduct: (product: Product) => void;
  clearProduct: () => void;
  setTxInfo: (hash: string, contractId: string) => void;
}

export const ProductContext = createContext<ProductContextValue | null>(null);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [product, setProductState] = useState<Product | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [contractId, setContractId] = useState<string | null>(null);

  const setProduct = useCallback((p: Product) => {
    setProductState(p);
  }, []);

  const clearProduct = useCallback(() => {
    setProductState(null);
    setTxHash(null);
    setContractId(null);
  }, []);

  const setTxInfo = useCallback((hash: string, cId: string) => {
    setTxHash(hash);
    setContractId(cId);
  }, []);

  return (
    <ProductContext.Provider
      value={{ product, txHash, contractId, setProduct, clearProduct, setTxInfo }}
    >
      {children}
    </ProductContext.Provider>
  );
}
