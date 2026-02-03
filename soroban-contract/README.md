# Soroban Project

## Project Structure

This repository uses the recommended structure for a Soroban project:

```text
.
├── contracts
│   └── hello_world
│       ├── src
│       │   ├── lib.rs
│       │   └── test.rs
│       └── Cargo.toml
├── Cargo.toml
└── README.md
```

- New Soroban contracts can be put in `contracts`, each in their own directory. There is already a `hello_world` contract in there to get you started.
- If you initialized this project with any other example contracts via `--with-example`, those contracts will be in the `contracts` directory as well.
- Contracts should have their own `Cargo.toml` files that rely on the top-level `Cargo.toml` workspace for their dependencies.
- Frontend libraries can be added to the top-level directory as well. If you initialized this project with a frontend template via `--frontend-template` you will have those files already included.


### Invoke Register Function

```bash
stellar contract invoke \
       --id products \
       --source-account zkCaleb \
       --network testnet \
       -- \
       register_product \
       --name "Laptop Gaming" \
       --description "Laptop 16GB RAM RTX 4060" \
       --price 1500 \
       --initial_stock 10
```

### Invoke Update Stock


