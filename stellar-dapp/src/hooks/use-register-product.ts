"use client";

import { useMutation } from "@tanstack/react-query";
import { registerProduct } from "@/lib/api";
import { toast } from "sonner";
import { AxiosError } from "axios";
import type { RegisterProductValues } from "@/lib/validations";

// TODO: Reemplazar con la public key de la wallet conectada
const PLACEHOLDER_SIGNER =
  "GAWVVSA6OUB2T2A6Q4E4YS75PO32YK7TKQJQDODA4GAY7SHGQOETVYPD";

export function useRegisterProduct() {
  return useMutation({
    mutationFn: (values: RegisterProductValues) =>
      registerProduct({
        ...values,
        signer: PLACEHOLDER_SIGNER, // TODO: usar wallet real
      }),
    onSuccess: (data) => {
      toast.success("Transacción construida. Pendiente de firma con wallet.");
      console.log("unsignedTx:", data.unsignedTx);
    },
    onError: (error: AxiosError<{ error: string }>) => {
      const message = error.response?.data?.error || error.message;
      toast.error(message);
    },
  });
}
