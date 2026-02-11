import axios from "axios";
import type {
  RegisterProductRequest,
  UpdateStockRequest,
  UpdatePriceRequest,
  Product,
  UnsignedTxResponse,
  SendTransactionRequest,
  SendTransactionResponse,
} from "@/types/product";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// -- Endpoints de escritura: retornan unsignedTx --

export async function registerProduct(
  data: RegisterProductRequest
): Promise<UnsignedTxResponse> {
  const res = await api.post<UnsignedTxResponse>("/products", data);
  return res.data;
}

export async function updateStock(
  id: number,
  data: UpdateStockRequest
): Promise<UnsignedTxResponse> {
  const res = await api.put<UnsignedTxResponse>(
    `/products/${id}/stock`,
    data
  );
  return res.data;
}

export async function updatePrice(
  id: number,
  data: UpdatePriceRequest
): Promise<UnsignedTxResponse> {
  const res = await api.put<UnsignedTxResponse>(
    `/products/${id}/price`,
    data
  );
  return res.data;
}

// -- Endpoint de lectura: retorna producto directamente --

export async function getProduct(
  id: number,
  signer: string
): Promise<Product> {
  const res = await api.get<Product>(`/products/${id}`, {
    params: { signer },
  });
  return res.data;
}

// -- Enviar transacción firmada --

export async function sendTransaction(
  signedTx: string
): Promise<SendTransactionResponse> {
  const res = await api.post<SendTransactionResponse>(
    "/transactions/send",
    { signedTx } satisfies SendTransactionRequest
  );
  return res.data;
}
