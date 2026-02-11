"use client";

import { useMutation } from "@tanstack/react-query";
import { getProduct } from "@/lib/api";
import { useProductContext } from "./use-product-context";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useWalletContext } from "@/providers/WalletProvider";

export function useSearchProduct() {
  const { setProduct } = useProductContext();
  const { walletAddress } = useWalletContext();

  return useMutation({
    mutationFn: (id: number) => {
      if (!walletAddress) {
        throw new Error("Conecte su Wallet");
      }
      return getProduct(id, walletAddress);
    },
    onSuccess: (data) => {
      setProduct(data);
      toast.success("Producto encontrado");
    },
    onError: (error: AxiosError<{ error: string }>) => {
      const message = error.response?.data?.error || error.message;
      toast.error(message);
    },
  });
}
