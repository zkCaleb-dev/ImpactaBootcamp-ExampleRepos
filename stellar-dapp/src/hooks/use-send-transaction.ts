"use client";

import { useMutation } from "@tanstack/react-query";
import { sendTransaction } from "@/lib/api";
import { toast } from "sonner";
import { AxiosError } from "axios";

/**
 * Hook para enviar una transacción firmada a la red.
 * TODO: Usar este hook después de firmar con la wallet.
 *
 * Flujo:
 * 1. El hook de escritura (register, updateStock, updatePrice) retorna unsignedTx
 * 2. La wallet firma el unsignedTx
 * 3. Este hook envía el signedTx al backend → red Stellar
 */
export function useSendTransaction() {
  return useMutation({
    mutationFn: (signedTx: string) => sendTransaction(signedTx),
    onSuccess: (data) => {
      toast.success(`Transacción confirmada. Hash: ${data.hash}`);
    },
    onError: (error: AxiosError<{ error: string }>) => {
      const message = error.response?.data?.error || error.message;
      toast.error(message);
    },
  });
}
