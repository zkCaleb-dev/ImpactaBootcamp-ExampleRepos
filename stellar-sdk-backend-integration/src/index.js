import "dotenv/config";
import express from "express";
import cors from "cors";
import productsRouter from "./routes/products.js";
import transactionsRouter from "./routes/transactions.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use("/products", productsRouter);
app.use("/transactions", transactionsRouter);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log("Endpoints disponibles:");
  console.log("  POST   /products              - Construir tx de registro (unsignedTx)");
  console.log("  GET    /products/:id          - Obtener producto (lectura)");
  console.log("  PUT    /products/:id/stock    - Construir tx de stock (unsignedTx)");
  console.log("  PUT    /products/:id/price    - Construir tx de precio (unsignedTx)");
  console.log("  POST   /transactions/send     - Enviar transacción firmada");
});
