import { contract } from "@stellar/stellar-sdk";

const xlm = await contract.Client.from({
    contractId: "CAXADSZB4QN6DKEXV6HXWTQTS23IRFWPOD24Z4ZICWZJ3FIDXHGWN6WQ",
    networkPassphrase: "Test SDF Network ; September 2015",
    rpcUrl: "https://soroban-testnet.stellar.org",
});

console.log("Cliente conectado:", xlm);