import { contract } from "@stellar/stellar-sdk";

const xlm = await contract.Client.from({
    contractId: "CBLE6YZZ23QN5KBA34X4YNCFP6BENY4VPVGLK3GIKLLTIEWJYL7QLODZ",
    networkPassphrase: "Test SDF Network ; September 2015",
    rpcUrl: "https://soroban-testnet.stellar.org",
});

console.log("Cliente conectado:", xlm);