import { Router } from "express";
import {
  getRpcServer,
  NETWORK_PASSPHRASE,
  TransactionBuilder,
  CONTRACT_ID,
} from "../config/stellar.js";

const router = Router();

// POST /transactions/send - Enviar una transacción firmada a la red
router.post("/send", async (req, res) => {
  try {
    const { signedTx } = req.body;

    if (!signedTx) {
      return res.status(400).json({
        error: "Falta campo requerido: signedTx (XDR de la transacción firmada)",
      });
    }

    const server = getRpcServer();

    // Deserializar la transacción firmada desde XDR
    const transaction = TransactionBuilder.fromXDR(
      signedTx,
      NETWORK_PASSPHRASE,
    );

    // Enviar la transacción a la red
    const sendResponse = await server.sendTransaction(transaction);

    console.log(`📡 Transacción enviada - Hash: ${sendResponse.hash}, Status: ${sendResponse.status}`);

    // Si la transacción fue rechazada inmediatamente
    if (sendResponse.status === "ERROR") {
      return res.status(400).json({
        error: "La transacción fue rechazada por la red",
        status: sendResponse.status,
        hash: sendResponse.hash,
      });
    }

    // Hacer polling hasta que la transacción sea confirmada
    let getResponse = await server.getTransaction(sendResponse.hash);
    const maxAttempts = 30;
    let attempts = 0;

    while (
      getResponse.status === "NOT_FOUND" &&
      attempts < maxAttempts
    ) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      getResponse = await server.getTransaction(sendResponse.hash);
      attempts++;
    }

    if (getResponse.status === "SUCCESS") {
      console.log(`✅ Transacción confirmada - Hash: ${sendResponse.hash}`);

      res.json({
        status: "SUCCESS",
        hash: sendResponse.hash,
        ledger: getResponse.ledger,
        contractId: CONTRACT_ID,
        resultXdr: getResponse.resultXdr?.toXDR("base64"),
      });
    } else if (getResponse.status === "FAILED") {
      console.error(`❌ Transacción fallida - Hash: ${sendResponse.hash}`);

      res.status(400).json({
        status: "FAILED",
        hash: sendResponse.hash,
        error: "La transacción falló en la red",
        resultXdr: getResponse.resultXdr?.toXDR("base64"),
      });
    } else {
      // NOT_FOUND después de todos los intentos (timeout)
      res.status(408).json({
        status: "TIMEOUT",
        hash: sendResponse.hash,
        error: "La transacción no fue confirmada a tiempo. Puede seguir pendiente.",
      });
    }
  } catch (error) {
    console.error("Error enviando transacción:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
