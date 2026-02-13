export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  /** Incluido cuando el producto se obtiene por búsqueda (GET) o al crear/actualizar */
  contractId?: string;
}

export interface RegisterProductRequest {
  name: string;
  description: string;
  price: number;
  initial_stock: number;
  signer: string;
}

export interface UpdateStockRequest {
  quantity: number;
  operation: "add" | "sub";
  signer: string;
}

export interface UpdatePriceRequest {
  new_price: number;
  signer: string;
}

// Respuesta de los endpoints de escritura (unsignedTx)
export interface UnsignedTxResponse {
  unsignedTx: string;
  product?: Product;
}

// Request para enviar una transacción firmada
export interface SendTransactionRequest {
  signedTx: string;
}

// Respuesta del endpoint de envío de transacción
export interface SendTransactionResponse {
  status: string;
  hash: string;
  ledger?: number;
  contractId: string;
  resultXdr?: string;
  error?: string;
}

// ANTIGUO: respuesta cuando el backend firmaba (comentado por referencia)
// export interface ProductResponse {
//   message: string;
//   product: Product;
// }
