"use client";

import { useMutation } from "@tanstack/react-query";
import { updatePrice } from "@/lib/api";
import { toast } from "sonner";
import { AxiosError } from "axios";
import type { UpdatePriceValues } from "@/lib/validations";

// TODO: Reemplazar con la public key de la wallet conectada
const PLACEHOLDER_SIGNER =
  "GAWVVSA6OUB2T2A6Q4E4YS75PO32YK7TKQJQDODA4GAY7SHGQOETVYPD";

export function useUpdatePrice() {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePriceValues }) =>
      updatePrice(id, {
        new_price: data.new_price,
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
