"use client";

import { useMutation } from "@tanstack/react-query";
import { getProduct } from "@/lib/api";
import { useProductContext } from "./use-product-context";
import { toast } from "sonner";
import { AxiosError } from "axios";

// TODO: Reemplazar con la public key de la wallet conectada
const PLACEHOLDER_SIGNER =
  "GAWVVSA6OUB2T2A6Q4E4YS75PO32YK7TKQJQDODA4GAY7SHGQOETVYPD";

export function useSearchProduct() {
  const { setProduct } = useProductContext();

  return useMutation({
    mutationFn: (id: number) => getProduct(id, PLACEHOLDER_SIGNER), // TODO: usar wallet real
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
