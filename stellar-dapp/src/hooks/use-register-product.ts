"use client";

import { useMutation } from "@tanstack/react-query";
import { registerProduct } from "@/lib/api";
import { useProductContext } from "./use-product-context";
import { toast } from "sonner";
import { AxiosError } from "axios";

export function useRegisterProduct() {
  const { setProduct } = useProductContext();

  return useMutation({
    mutationFn: registerProduct,
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
