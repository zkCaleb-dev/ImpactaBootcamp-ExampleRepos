# Proyecto Soroban

## Estructura del Proyecto

Este repositorio utiliza la estructura recomendada para un proyecto Soroban:

```text
.
├── contracts
│   └── products
│       ├── src
│       │   ├── lib.rs
│       │   └── test.rs
│       └── Cargo.toml
├── Cargo.toml
├── Makefile
└── README.md
```

- Los contratos Soroban se ubican en `contracts`, cada uno en su propio directorio.
- Cada contrato tiene su propio `Cargo.toml` que depende del `Cargo.toml` del workspace principal.

## Comandos del Makefile

```bash
make build          # Compilar contratos
make deploy         # Desplegar en testnet
make clean          # Limpiar archivos compilados
```

> **Importante:** Antes de ejecutar `make deploy`, debes modificar el `Makefile` y cambiar `--source-account zkCaleb` por tu propia cuenta configurada en Stellar CLI.

## Funciones del Contrato Products

> **Nota:** En los comandos de prueba, el parámetro `--id` puede ser:
> - `products` - Si usaste el alias al hacer deploy (recomendado)
> - El Contract ID directamente (ej: `CBXYZ...`) - Si ya hiciste deploy y conoces el ID
>
> También debes cambiar `--source-account zkCaleb` por tu propia cuenta.

### Registrar Producto

**Linux/macOS (Bash):**
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

**Windows (PowerShell):**
```powershell
stellar contract invoke `
  --id products `
  --source-account zkCaleb `
  --network testnet `
  -- `
  register_product `
  --name "Laptop Gaming" `
  --description "Laptop 16GB RAM RTX 4060" `
  --price 1500 `
  --initial_stock 10
```

### Actualizar Stock

**Linux/macOS (Bash):**
```bash
# Agregar stock
stellar contract invoke \
  --id products \
  --source-account zkCaleb \
  --network testnet \
  -- \
  update_stock \
  --product_id 0 \
  --quantity 5 \
  --operation "add"

# Restar stock
stellar contract invoke \
  --id products \
  --source-account zkCaleb \
  --network testnet \
  -- \
  update_stock \
  --product_id 0 \
  --quantity 3 \
  --operation "sub"
```

**Windows (PowerShell):**
```powershell
# Agregar stock
stellar contract invoke `
  --id products `
  --source-account zkCaleb `
  --network testnet `
  -- `
  update_stock `
  --product_id 0 `
  --quantity 5 `
  --operation "add"

# Restar stock
stellar contract invoke `
  --id products `
  --source-account zkCaleb `
  --network testnet `
  -- `
  update_stock `
  --product_id 0 `
  --quantity 3 `
  --operation "sub"
```

### Actualizar Precio

**Linux/macOS (Bash):**
```bash
stellar contract invoke \
  --id products \
  --source-account zkCaleb \
  --network testnet \
  -- \
  update_price \
  --product_id 0 \
  --new_price 1200
```

**Windows (PowerShell):**
```powershell
stellar contract invoke `
  --id products `
  --source-account zkCaleb `
  --network testnet `
  -- `
  update_price `
  --product_id 0 `
  --new_price 1200
```

### Obtener Producto

**Linux/macOS (Bash):**
```bash
stellar contract invoke \
  --id products \
  --source-account zkCaleb \
  --network testnet \
  -- \
  get_product \
  --product_id 0
```

**Windows (PowerShell):**
```powershell
stellar contract invoke `
  --id products `
  --source-account zkCaleb `
  --network testnet `
  -- `
  get_product `
  --product_id 0
```
