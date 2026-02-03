import "dotenv/config";
import express from "express";
import productsRouter from "./routes/products.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rutas
app.use("/products", productsRouter);

// Health check
app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log("Endpoints disponibles:");
    console.log("  POST   /products           - Registrar producto");
    console.log("  GET    /products/:id       - Obtener producto");
    console.log("  PUT    /products/:id/stock - Actualizar stock");
    console.log("  PUT    /products/:id/price - Actualizar precio");
});
