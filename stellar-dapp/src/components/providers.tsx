"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductProvider } from "@/context/product-context";
import { Toaster } from "@/components/ui/sonner";
import { WalletProvider } from "./tw-blocks/providers/WalletProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
          },
        },
      })
  );

  return (
    <WalletProvider>
      <QueryClientProvider client={queryClient}>
        <ProductProvider>
          {children}
          <Toaster richColors position="top-right" />
        </ProductProvider>
      </QueryClientProvider>
    </WalletProvider>
  );
}
