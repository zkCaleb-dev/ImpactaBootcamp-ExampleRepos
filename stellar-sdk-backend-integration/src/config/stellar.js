import { Keypair, contract, Networks, rpc, TransactionBuilder } from "@stellar/stellar-sdk";

// const { basicNodeSigner } = contract;

const CONTRACT_ID =
  process.env.CONTRACT_ID ||
  "CB67JJXMXIIDUE2DCXMQZTPAHUU73CYHFDRK2WVX3EVULBDHRWOVXKH4";
const RPC_URL = process.env.RPC_URL || "https://soroban-testnet.stellar.org";
const NETWORK_PASSPHRASE = process.env.NETWORK_PASSPHRASE || Networks.TESTNET;

// =============================================================================
// ANTIGUO: Firma server-side con secret key (comentado)
// =============================================================================

// let clientInstance = null;
// let keypairInstance = null;
//
// export async function getKeypair() {
//   if (!keypairInstance) {
//     const secretKey = process.env.STELLAR_SECRET_KEY;
//     if (!secretKey) {
//       throw new Error(
//         "STELLAR_SECRET_KEY no está configurada en las variables de entorno",
//       );
//     }
//     keypairInstance = Keypair.fromSecret(secretKey);
//   }
//   return keypairInstance;
// }
//
// export async function getContractClient() {
//   if (!clientInstance) {
//     const keypair = await getKeypair();
//
//     const server = new rpc.Server(RPC_URL, {
//       allowHttp: false,
//     });
//
//     const signer = basicNodeSigner(keypair, NETWORK_PASSPHRASE);
//
//     const clientOptions = {
//       publicKey: keypair.publicKey(),
//       contractId: CONTRACT_ID,
//       networkPassphrase: NETWORK_PASSPHRASE,
//       rpcUrl: RPC_URL,
//       allowHttp: false,
//       ...signer,
//     };
//
//     clientInstance = await contract.Client.from(clientOptions);
//     console.log("✅ Cliente creado exitosamente");
//   }
//
//   return clientInstance;
// }

// =============================================================================
// NUEVO: Firma client-side - el backend solo construye transacciones sin firmar
// =============================================================================

/**
 * Crea un contract client para un signer específico (public key del frontend).
 * NO firma transacciones - solo simula y construye el XDR sin firmar.
 * No se cachea como singleton porque cada request puede tener diferente signer.
 */
export async function getContractClientForSigner(publicKey) {
  const clientOptions = {
    publicKey,
    contractId: CONTRACT_ID,
    networkPassphrase: NETWORK_PASSPHRASE,
    rpcUrl: RPC_URL,
    allowHttp: false,
  };

  const clientInstance = await contract.Client.from(clientOptions);
  console.log(`✅ Cliente creado para signer: ${publicKey.substring(0, 8)}...`);
  return clientInstance;
}

/**
 * Retorna una instancia del servidor RPC de Soroban.
 * Se usa para enviar transacciones firmadas y consultar resultados.
 */
export function getRpcServer() {
  return new rpc.Server(RPC_URL, { allowHttp: false });
}

export { CONTRACT_ID, RPC_URL, NETWORK_PASSPHRASE, TransactionBuilder };
