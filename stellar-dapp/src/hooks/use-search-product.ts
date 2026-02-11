"use client";

import { useMutation } from "@tanstack/react-query";
import { getProduct } from "@/lib/api";
import { useProductContext } from "./use-product-context";
import { toast } from "sonner";
import { AxiosError } from "axios";

export function useSearchProduct() {
  const { setProduct } = useProductContext();

  return useMutation({
    mutationFn: (id: number) => getProduct(id),
    onSuccess: (data) => {
      setProduct(data);
      toast.success("Producto encontrado");
    },
    onError: (error: AxiosError<{ error: string }>) => {
      const message =
        error.response?.data?.error || error.message;
      toast.error(message);
    },
  });
}
