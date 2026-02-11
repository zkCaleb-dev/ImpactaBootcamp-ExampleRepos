import axios from "axios";
import type {
  RegisterProductRequest,
  UpdateStockRequest,
  UpdatePriceRequest,
  Product,
  ProductResponse,
} from "@/types/product";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export async function registerProduct(
  data: RegisterProductRequest
): Promise<ProductResponse> {
  const res = await api.post<ProductResponse>("/products", data);
  return res.data;
}

export async function getProduct(id: number): Promise<Product> {
  const res = await api.get<Product>(`/products/${id}`);
  return res.data;
}

export async function updateStock(
  id: number,
  data: UpdateStockRequest
): Promise<ProductResponse> {
  const res = await api.put<ProductResponse>(`/products/${id}/stock`, data);
  return res.data;
}

export async function updatePrice(
  id: number,
  data: UpdatePriceRequest
): Promise<ProductResponse> {
  const res = await api.put<ProductResponse>(`/products/${id}/price`, data);
  return res.data;
}
