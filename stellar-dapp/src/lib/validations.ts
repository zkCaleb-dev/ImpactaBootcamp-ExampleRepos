import { z } from "zod";

export const registerProductSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  price: z
    .number({ error: "Ingresa un número válido" })
    .positive("El precio debe ser mayor a 0"),
  initial_stock: z
    .number({ error: "Ingresa un número válido" })
    .int("El stock debe ser un número entero")
    .min(0, "El stock no puede ser negativo"),
});

export const searchProductSchema = z.object({
  product_id: z
    .number({ error: "Ingresa un número válido" })
    .int("El ID debe ser un número entero")
    .min(0, "El ID no puede ser negativo"),
});

export const updateStockSchema = z.object({
  quantity: z
    .number({ error: "Ingresa un número válido" })
    .int("La cantidad debe ser un número entero")
    .positive("La cantidad debe ser mayor a 0"),
  operation: z.enum(["add", "sub"], {
    error: "Selecciona una operación",
  }),
});

export const updatePriceSchema = z.object({
  new_price: z
    .number({ error: "Ingresa un número válido" })
    .positive("El precio debe ser mayor a 0"),
});

export type RegisterProductValues = z.infer<typeof registerProductSchema>;
export type SearchProductValues = z.infer<typeof searchProductSchema>;
export type UpdateStockValues = z.infer<typeof updateStockSchema>;
export type UpdatePriceValues = z.infer<typeof updatePriceSchema>;
