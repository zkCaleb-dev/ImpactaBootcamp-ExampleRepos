import { Router } from "express";
import { getContractClient } from "../config/stellar.js";

const router = Router();

// Helper para convertir BigInt a Number en el producto
function formatProduct(product) {
    return {
        id: Number(product.id),
        name: product.name,
        description: product.description,
        price: Number(product.price),
        stock: Number(product.stock)
    };
}

// POST /products - Registrar un nuevo producto
router.post("/", async (req, res) => {
    try {
        const { name, description, price, initial_stock } = req.body;

        if (!name || !description || price === undefined || initial_stock === undefined) {
            return res.status(400).json({
                error: "Faltan campos requeridos: name, description, price, initial_stock"
            });
        }

        const client = await getContractClient();

        const tx = await client.register_product({
            name: String(name),
            description: String(description),
            price: BigInt(price),
            initial_stock: Number(initial_stock)
        });

        const { result } = await tx.signAndSend();

        res.status(201).json({
            message: "Producto registrado exitosamente",
            product: formatProduct(result)
        });
    } catch (error) {
        console.error("Error registrando producto:", error);
        res.status(500).json({ error: error.message });
    }
});

// GET /products/:id - Obtener un producto por ID
router.get("/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id);

        if (isNaN(productId)) {
            return res.status(400).json({ error: "ID de producto inválido" });
        }

        const client = await getContractClient();

        const tx = await client.get_product({
            product_id: BigInt(productId)
        });

        const product = tx.result;

        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.json(formatProduct(product));
    } catch (error) {
        console.error("Error obteniendo producto:", error);
        res.status(500).json({ error: error.message });
    }
});

// PUT /products/:id/stock - Actualizar stock de un producto
router.put("/:id/stock", async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const { quantity, operation } = req.body;

        if (isNaN(productId)) {
            return res.status(400).json({ error: "ID de producto inválido" });
        }

        if (quantity === undefined || !operation) {
            return res.status(400).json({
                error: "Faltan campos requeridos: quantity, operation (add/sub)"
            });
        }

        if (operation !== "add" && operation !== "sub") {
            return res.status(400).json({
                error: "Operación inválida. Usar 'add' o 'sub'"
            });
        }

        const client = await getContractClient();

        const tx = await client.update_stock({
            product_id: BigInt(productId),
            quantity: quantity,
            operation: operation
        });

        const { result } = await tx.signAndSend();

        res.json({
            message: "Stock actualizado exitosamente",
            product: formatProduct(result)
        });
    } catch (error) {
        console.error("Error actualizando stock:", error);
        res.status(500).json({ error: error.message });
    }
});

// PUT /products/:id/price - Actualizar precio de un producto
router.put("/:id/price", async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const { new_price } = req.body;

        if (isNaN(productId)) {
            return res.status(400).json({ error: "ID de producto inválido" });
        }

        if (new_price === undefined) {
            return res.status(400).json({
                error: "Falta campo requerido: new_price"
            });
        }

        const client = await getContractClient();

        const tx = await client.update_price({
            product_id: BigInt(productId),
            new_price: BigInt(new_price)
        });

        const { result } = await tx.signAndSend();

        res.json({
            message: "Precio actualizado exitosamente",
            product: formatProduct(result)
        });
    } catch (error) {
        console.error("Error actualizando precio:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
