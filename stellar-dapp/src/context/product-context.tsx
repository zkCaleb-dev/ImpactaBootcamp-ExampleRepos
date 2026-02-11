"use client";

import { createContext, useState, useCallback, type ReactNode } from "react";
import type { Product } from "@/types/product";

export interface ProductContextValue {
  product: Product | null;
  setProduct: (product: Product) => void;
  clearProduct: () => void;
}

export const ProductContext = createContext<ProductContextValue | null>(null);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [product, setProductState] = useState<Product | null>(null);

  const setProduct = useCallback((p: Product) => {
    setProductState(p);
  }, []);

  const clearProduct = useCallback(() => {
    setProductState(null);
  }, []);

  return (
    <ProductContext.Provider value={{ product, setProduct, clearProduct }}>
      {children}
    </ProductContext.Provider>
  );
}
