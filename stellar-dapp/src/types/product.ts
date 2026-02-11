export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface RegisterProductRequest {
  name: string;
  description: string;
  price: number;
  initial_stock: number;
}

export interface UpdateStockRequest {
  quantity: number;
  operation: "add" | "sub";
}

export interface UpdatePriceRequest {
  new_price: number;
}

export interface ProductResponse {
  message: string;
  product: Product;
}
