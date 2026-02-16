/**
 * Convierte un producto del contrato (con BigInt) a formato JSON serializable
 * @param {Object} product - Producto del contrato Soroban
 * @returns {Object} Producto formateado con Number en lugar de BigInt
 */
export function formatProduct(product) {
  return {
    id: Number(product.id),
    name: product.name,
    description: product.description,
    price: Number(product.price),
    stock: Number(product.stock),
  };
}
