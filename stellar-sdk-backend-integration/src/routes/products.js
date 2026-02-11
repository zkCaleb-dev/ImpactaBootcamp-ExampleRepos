import { Router } from "express";
import { getContractClientForSigner } from "../config/stellar.js";
import { formatProduct } from "../types/product.js";

const router = Router();

// POST /products - Registrar un nuevo producto (retorna unsignedTx)
router.post("/", async (req, res) => {
  try {
    const { name, description, price, initial_stock, signer } = req.body;

    if (!signer) {
      return res.status(400).json({
        error: "Falta campo requerido: signer (public key de la wallet)",
      });
    }

    if (
      !name ||
      !description ||
      price === undefined ||
      initial_stock === undefined
    ) {
      return res.status(400).json({
        error:
          "Faltan campos requeridos: name, description, price, initial_stock",
      });
    }

    const client = await getContractClientForSigner(signer);

    const tx = await client.register_product({
      name: String(name),
      description: String(description),
      price: BigInt(price),
      initial_stock: Number(initial_stock),
    });

    // Retornar la transacción sin firmar como XDR
    // El frontend debe firmar con la wallet y luego enviarla via POST /transactions/send
    const unsignedTx = tx.toXDR();

    // tx.result contiene el producto simulado (resultado de la simulación)
    const product = formatProduct(tx.result);

    // ANTIGUO: firma server-side (comentado)
    // const { result } = await tx.signAndSend();
    // res.status(201).json({
    //   message: "Producto registrado exitosamente",
    //   product: formatProduct(result),
    // });

    res.status(200).json({ unsignedTx, product });
  } catch (error) {
    console.error("Error construyendo transacción de registro:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET /products/:id - Obtener un producto por ID (lectura, no requiere firma)
router.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    if (isNaN(productId)) {
      return res.status(400).json({ error: "ID de producto inválido" });
    }

    const signer = req.query.signer;

    if (!signer) {
      return res.status(400).json({
        error:
          "Falta query param requerido: signer (public key de la wallet)",
      });
    }

    const client = await getContractClientForSigner(signer);

    const tx = await client.get_product({
      product_id: BigInt(productId),
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

// PUT /products/:id/stock - Actualizar stock (retorna unsignedTx)
router.put("/:id/stock", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const { quantity, operation, signer } = req.body;

    if (!signer) {
      return res.status(400).json({
        error: "Falta campo requerido: signer (public key de la wallet)",
      });
    }

    if (isNaN(productId)) {
      return res.status(400).json({ error: "ID de producto inválido" });
    }

    if (quantity === undefined || !operation) {
      return res.status(400).json({
        error: "Faltan campos requeridos: quantity, operation (add/sub)",
      });
    }

    if (operation !== "add" && operation !== "sub") {
      return res.status(400).json({
        error: "Operación inválida. Usar 'add' o 'sub'",
      });
    }

    const client = await getContractClientForSigner(signer);

    const tx = await client.update_stock({
      product_id: BigInt(productId),
      quantity: quantity,
      operation: operation,
    });

    const unsignedTx = tx.toXDR();

    // ANTIGUO: firma server-side (comentado)
    // const { result } = await tx.signAndSend();
    // res.json({
    //   message: "Stock actualizado exitosamente",
    //   product: formatProduct(result),
    // });

    res.status(200).json({ unsignedTx });
  } catch (error) {
    console.error("Error construyendo transacción de stock:", error);
    res.status(500).json({ error: error.message });
  }
});

// PUT /products/:id/price - Actualizar precio (retorna unsignedTx)
router.put("/:id/price", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const { new_price, signer } = req.body;

    if (!signer) {
      return res.status(400).json({
        error: "Falta campo requerido: signer (public key de la wallet)",
      });
    }

    if (isNaN(productId)) {
      return res.status(400).json({ error: "ID de producto inválido" });
    }

    if (new_price === undefined) {
      return res.status(400).json({
        error: "Falta campo requerido: new_price",
      });
    }

    const client = await getContractClientForSigner(signer);

    const tx = await client.update_price({
      product_id: BigInt(productId),
      new_price: BigInt(new_price),
    });

    const unsignedTx = tx.toXDR();

    // ANTIGUO: firma server-side (comentado)
    // const { result } = await tx.signAndSend();
    // res.json({
    //   message: "Precio actualizado exitosamente",
    //   product: formatProduct(result),
    // });

    res.status(200).json({ unsignedTx });
  } catch (error) {
    console.error("Error construyendo transacción de precio:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
