import { Keypair, contract, Networks } from "@stellar/stellar-sdk";

const CONTRACT_ID = process.env.CONTRACT_ID || "CB67JJXMXIIDUE2DCXMQZTPAHUU73CYHFDRK2WVX3EVULBDHRWOVXKH4";
const RPC_URL = process.env.RPC_URL || "https://soroban-testnet.stellar.org";
const NETWORK_PASSPHRASE = process.env.NETWORK_PASSPHRASE || Networks.TESTNET;

let clientInstance = null;
let keypairInstance = null;

export async function getKeypair() {
    if (!keypairInstance) {
        const secretKey = process.env.STELLAR_SECRET_KEY;
        if (!secretKey) {
            throw new Error("STELLAR_SECRET_KEY no está configurada en las variables de entorno");
        }
        keypairInstance = Keypair.fromSecret(secretKey);
    }
    return keypairInstance;
}

export async function getContractClient() {
    if (!clientInstance) {
        const keypair = await getKeypair();

        clientInstance = await contract.Client.from({
            contractId: CONTRACT_ID,
            networkPassphrase: NETWORK_PASSPHRASE,
            rpcUrl: RPC_URL,
            publicKey: keypair.publicKey(),
            signTransaction: async (tx) => {
                tx.sign(keypair);
                return tx.toXDR();
            },
        });
    }
    return clientInstance;
}

export { CONTRACT_ID, RPC_URL, NETWORK_PASSPHRASE };
