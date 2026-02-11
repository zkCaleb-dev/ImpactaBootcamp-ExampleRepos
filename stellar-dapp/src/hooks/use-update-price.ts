"use client";

import { useMutation } from "@tanstack/react-query";
import { updatePrice } from "@/lib/api";
import { useProductContext } from "./use-product-context";
import { toast } from "sonner";
import { AxiosError } from "axios";
import type { UpdatePriceRequest } from "@/types/product";

export function useUpdatePrice() {
  const { setProduct } = useProductContext();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePriceRequest }) =>
      updatePrice(id, data),
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
