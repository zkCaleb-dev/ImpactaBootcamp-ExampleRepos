"use client";

import { useMutation } from "@tanstack/react-query";
import { updateStock } from "@/lib/api";
import { useProductContext } from "./use-product-context";
import { toast } from "sonner";
import { AxiosError } from "axios";
import type { UpdateStockRequest } from "@/types/product";

export function useUpdateStock() {
  const { setProduct } = useProductContext();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateStockRequest }) =>
      updateStock(id, data),
    onSuccess: (data) => {
      setProduct(data.product);
      toast.success(data.message);
    },
    onError: (error: AxiosError<{ error: string }>) => {
      const message =
        error.response?.data?.error || error.message;
      toast.error(message);
    },
  });
}
