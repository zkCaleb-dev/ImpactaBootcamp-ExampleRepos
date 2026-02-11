"use client";

import { useMutation } from "@tanstack/react-query";
import { registerProduct, sendTransaction } from "@/lib/api";
import { signTransaction } from "@/components/tw-blocks/wallet-kit/wallet-kit";
import { useProductContext } from "./use-product-context";
import { useWalletContext } from "@/components/tw-blocks/providers/WalletProvider";
import { toast } from "sonner";
import { AxiosError } from "axios";
import type { RegisterProductValues } from "@/lib/validations";

export function useRegisterProduct() {
  const { setTxInfo } = useProductContext();
  const { walletAddress } = useWalletContext();

  return useMutation({
    mutationFn: async (values: RegisterProductValues) => {
      if (!walletAddress) {
        throw new Error("Conecte su Wallet");
      }

      // 1. Build: obtener unsignedTx del backend
      const { unsignedTx } = await registerProduct({
        ...values,
        signer: walletAddress,
      });

      // 2. Sign: firmar con la wallet
      const signedTx = await signTransaction({
        unsignedTransaction: unsignedTx,
        address: walletAddress,
      });

      // 3. Send: enviar la transacción firmada
      const result = await sendTransaction(signedTx);

      return result;
    },
    onSuccess: (data) => {
      setTxInfo(data.hash, data.contractId);
      toast.success("Producto registrado exitosamente");
    },
    onError: (error: AxiosError<{ error: string }>) => {
      const message = error.response?.data?.error || error.message;
      toast.error(message);
    },
  });
}
