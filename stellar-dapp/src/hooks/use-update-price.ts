"use client";

import { useMutation } from "@tanstack/react-query";
import { updatePrice, sendTransaction, getProduct } from "@/lib/api";
import { signTransaction } from "@/components/tw-blocks/wallet-kit/wallet-kit";
import { useProductContext } from "./use-product-context";
import { useWalletContext } from "@/components/tw-blocks/providers/WalletProvider";
import { toast } from "sonner";
import { AxiosError } from "axios";
import type { UpdatePriceValues } from "@/lib/validations";

export function useUpdatePrice() {
  const { setProduct, setTxInfo } = useProductContext();
  const { walletAddress } = useWalletContext();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdatePriceValues }) => {
      if (!walletAddress) {
        throw new Error("Conecte su Wallet");
      }

      // 1. Build
      const { unsignedTx } = await updatePrice(id, {
        new_price: data.new_price,
        signer: walletAddress,
      });

      // 2. Sign
      const signedTx = await signTransaction({
        unsignedTransaction: unsignedTx,
        address: walletAddress,
      });

      // 3. Send
      const result = await sendTransaction(signedTx);

      // 4. Re-fetch product actualizado
      const product = await getProduct(id, walletAddress);

      return { ...result, product };
    },
    onSuccess: (data) => {
      setProduct(data.product);
      setTxInfo(data.hash, data.contractId);
      toast.success("Precio actualizado exitosamente");
    },
    onError: (error: AxiosError<{ error: string }>) => {
      const message = error.response?.data?.error || error.message;
      toast.error(message);
    },
  });
}
