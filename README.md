# Impacta Bootcamp - Ejemplos de Soroban

Este repositorio contiene ejemplos prácticos desarrollados para el Bootcamp de Impacta, demostrando cómo construir aplicaciones full-stack sobre la blockchain de Stellar utilizando Soroban (contratos inteligentes).

## Descripción del Proyecto

El proyecto implementa un **Sistema de Gestión de Productos** completo que permite:

- Registrar productos con nombre, descripción, precio y stock inicial
- Consultar información de productos almacenados en blockchain
- Actualizar el inventario (agregar o restar stock)
- Modificar precios de productos

Toda la información se almacena de forma permanente en la blockchain de Stellar (Testnet).

## Estructura del Repositorio

```
ImpactaBootcamp-ExampleRepos/
├── soroban-contract/                    # Contrato inteligente (Rust/Soroban)
│   ├── contracts/
│   │   └── products/                    # Contrato de gestión de productos
│   │       ├── src/
│   │       │   ├── lib.rs              # Implementación del contrato
│   │       │   └── test.rs             # Tests unitarios
│   │       └── Cargo.toml
│   ├── Makefile                         # Comandos de build y deploy
│   └── README.md                        # Documentación del contrato
│
├── stellar-sdk-backend-integration/     # Backend REST API (Node.js/Express)
│   ├── src/
│   │   ├── index.js                    # Servidor Express
│   │   ├── config/
│   │   │   └── stellar.js              # Cliente Stellar SDK
│   │   ├── routes/
│   │   │   └── products.js             # Endpoints REST
│   │   └── types/
│   │       └── product.js              # Utilidades de formato
│   ├── .env.example                     # Template de configuración
│   └── README.md                        # Documentación del backend
│
└── README.md                            # Este archivo
```

## Componentes

### 1. Contrato Inteligente (`soroban-contract/`)

Contrato escrito en **Rust** utilizando el **Soroban SDK** que define la lógica de negocio en blockchain.

#### Modelo de Datos

```rust
struct Product {
    id: u64,           // Identificador único auto-incrementado
    name: String,      // Nombre del producto
    description: String, // Descripción
    price: u64,        // Precio en stroops
    stock: u32         // Cantidad en inventario
}
```

#### Funciones del Contrato

| Función | Descripción |
|---------|-------------|
| `register_product` | Crea un nuevo producto con ID auto-generado |
| `get_product` | Obtiene un producto por su ID |
| `update_stock` | Modifica el inventario (operaciones: "add", "sub") |
| `update_price` | Actualiza el precio de un producto |

#### Tecnologías

- **Lenguaje:** Rust
- **Framework:** Soroban SDK v23
- **Compilación:** WebAssembly (WASM)
- **Red:** Stellar Testnet

### 2. Backend REST API (`stellar-sdk-backend-integration/`)

Servidor **Node.js** con **Express** que expone una API REST para interactuar con el contrato inteligente.

#### Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/products` | Registrar un nuevo producto |
| `GET` | `/products/:id` | Obtener producto por ID |
| `PUT` | `/products/:id/stock` | Actualizar stock |
| `PUT` | `/products/:id/price` | Actualizar precio |
| `GET` | `/health` | Estado del servidor |

#### Tecnologías

- **Runtime:** Node.js (v18+)
- **Framework:** Express 5.x
- **SDK:** @stellar/stellar-sdk v14
- **Configuración:** dotenv

## Arquitectura

```
┌─────────────────┐
│  Cliente HTTP   │
└────────┬────────┘
         │ REST API
         ▼
┌─────────────────────────────────────┐
│     Backend (Express + Stellar SDK) │
│  ┌─────────────────────────────────┐│
│  │  routes/products.js             ││
│  │  - Valida requests              ││
│  │  - Convierte tipos              ││
│  └──────────────┬──────────────────┘│
│                 │                    │
│  ┌──────────────▼──────────────────┐│
│  │  config/stellar.js              ││
│  │  - Cliente Soroban              ││
│  │  - Firma transacciones          ││
│  └──────────────┬──────────────────┘│
└─────────────────┼───────────────────┘
                  │ Soroban RPC
                  ▼
┌─────────────────────────────────────┐
│        Stellar Blockchain           │
│  ┌─────────────────────────────────┐│
│  │  Contrato: products             ││
│  │  - Lógica de negocio            ││
│  │  - Almacenamiento persistente   ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

## Flujo de Datos

1. El cliente envía una petición HTTP al backend
2. El backend valida los datos y los convierte a tipos compatibles con Soroban
3. Se invoca la función correspondiente del contrato mediante Stellar SDK
4. El contrato procesa la operación y actualiza el estado en blockchain
5. La respuesta regresa al cliente en formato JSON

**Ejemplo de conversión de tipos:**

```
Cliente  →  { price: 1500 }     (JSON number)
Backend  →  BigInt(1500)        (JavaScript BigInt)
Contrato →  u64                 (Rust unsigned 64-bit)
```

## Stack Tecnológico

| Capa | Tecnología | Versión |
|------|------------|---------|
| Smart Contract | Rust + Soroban SDK | v23 |
| Backend Runtime | Node.js | v18+ |
| Backend Framework | Express | v5.2.1 |
| Blockchain SDK | @stellar/stellar-sdk | v14.0.0 |
| Red Blockchain | Stellar Testnet | - |

## Documentación Adicional

Cada componente tiene su propio README con instrucciones detalladas:

- **Contrato:** [`soroban-contract/README.md`](./soroban-contract/README.md)
- **Backend:** [`stellar-sdk-backend-integration/README.md`](./stellar-sdk-backend-integration/README.md)

## Licencia

Proyecto educativo desarrollado para el Bootcamp de Impacta.
