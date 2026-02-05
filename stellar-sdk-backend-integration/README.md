# Stellar SDK Backend Integration

Backend REST API desarrollado en Node.js/Express que se integra con un contrato inteligente Soroban en la red Stellar para la gestión de productos.

## Descripcion

Este proyecto es una API REST que actua como intermediario entre aplicaciones cliente y un smart contract desplegado en Soroban (la plataforma de contratos inteligentes de Stellar). Permite realizar operaciones CRUD sobre productos almacenados en la blockchain.

### Funcionalidades principales

- **Registrar productos**: Crear nuevos productos en el contrato con nombre, descripcion, precio y stock inicial
- **Consultar productos**: Obtener informacion de un producto por su ID
- **Actualizar stock**: Incrementar o decrementar el inventario de un producto
- **Actualizar precio**: Modificar el precio de un producto existente

## Tecnologias

- **Node.js** - Runtime de JavaScript
- **Express 5** - Framework web para la API REST
- **@stellar/stellar-sdk** - SDK oficial de Stellar para interactuar con Soroban
- **dotenv** - Manejo de variables de entorno

## Estructura del proyecto

```
stellar-sdk-backend-integration/
├── package.json
├── .env.example          # Template de variables de entorno
├── .env                  # Variables de entorno (no commitear)
└── src/
    ├── index.js          # Punto de entrada del servidor Express
    ├── config/
    │   └── stellar.js    # Configuracion del cliente Stellar/Soroban
    ├── routes/
    │   └── products.js   # Endpoints de la API de productos
    └── types/
        └── product.js    # Utilidades de formateo de productos
```

## Requisitos previos

- Node.js v18 o superior
- npm o yarn
- Una cuenta de Stellar con fondos en testnet
- Un contrato Soroban desplegado (ver proyecto `soroban-contract`)

## Instalacion

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd stellar-sdk-backend-integration
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```

4. Editar el archivo `.env` con tus credenciales:
```env
STELLAR_PUBLIC_KEY=tu_clave_publica
STELLAR_SECRET_KEY=tu_clave_secreta
CONTRACT_ID=id_del_contrato_desplegado
RPC_URL=https://soroban-testnet.stellar.org
NETWORK_PASSPHRASE=Test SDF Network ; September 2015
PORT=3000
```

## Ejecucion

### Modo desarrollo (con hot-reload)
```bash
npm run dev
```

### Modo produccion
```bash
npm start
```

El servidor estara disponible en `http://localhost:3000`

## Endpoints de la API

### Health Check
```
GET /health
```
Verifica que el servidor este funcionando.

**Respuesta:**
```json
{
  "status": "ok"
}
```

---

### Registrar producto
```
POST /products
```
Crea un nuevo producto en el contrato.

**Body (JSON):**
```json
{
  "name": "Laptop",
  "description": "Laptop gaming 16GB RAM",
  "price": 1500,
  "initial_stock": 10
}
```

**Respuesta (201):**
```json
{
  "id": 1,
  "name": "Laptop",
  "description": "Laptop gaming 16GB RAM",
  "price": 1500,
  "stock": 10
}
```

---

### Obtener producto
```
GET /products/:id
```
Obtiene la informacion de un producto por su ID.

**Parametros:**
- `id` - ID numerico del producto

**Respuesta (200):**
```json
{
  "id": 1,
  "name": "Laptop",
  "description": "Laptop gaming 16GB RAM",
  "price": 1500,
  "stock": 10
}
```

**Error (404):**
```json
{
  "error": "Producto no encontrado"
}
```

---

### Actualizar stock
```
PUT /products/:id/stock
```
Incrementa o decrementa el stock de un producto.

**Parametros:**
- `id` - ID numerico del producto

**Body (JSON):**
```json
{
  "quantity": 5,
  "operation": "add"
}
```
- `operation`: `"add"` para agregar stock, `"sub"` para restar

**Respuesta (200):**
```json
{
  "id": 1,
  "name": "Laptop",
  "description": "Laptop gaming 16GB RAM",
  "price": 1500,
  "stock": 15
}
```

---

### Actualizar precio
```
PUT /products/:id/price
```
Modifica el precio de un producto.

**Parametros:**
- `id` - ID numerico del producto

**Body (JSON):**
```json
{
  "new_price": 1299
}
```

**Respuesta (200):**
```json
{
  "id": 1,
  "name": "Laptop",
  "description": "Laptop gaming 16GB RAM",
  "price": 1299,
  "stock": 15
}
```

## Ejemplos con cURL

```bash
# Health check
curl http://localhost:3000/health

# Registrar producto
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","description":"Gaming laptop","price":1500,"initial_stock":10}'

# Obtener producto
curl http://localhost:3000/products/1

# Agregar stock
curl -X PUT http://localhost:3000/products/1/stock \
  -H "Content-Type: application/json" \
  -d '{"quantity":5,"operation":"add"}'

# Actualizar precio
curl -X PUT http://localhost:3000/products/1/price \
  -H "Content-Type: application/json" \
  -d '{"new_price":1299}'
```

## Como funciona la integracion con Stellar

1. El backend recibe una peticion HTTP
2. El route handler extrae los parametros de la peticion
3. Se obtiene el cliente de contrato Soroban (cacheado para eficiencia)
4. Se invoca el metodo correspondiente del contrato con los parametros convertidos a los tipos correctos (BigInt para numeros en blockchain)
5. La transaccion se firma y envia a la red
6. El resultado se formatea y se devuelve al cliente

## Notas importantes

- **Seguridad**: El archivo `.env` contiene claves privadas sensibles. Nunca lo subas a control de versiones.
- **Red de pruebas**: Por defecto esta configurado para la testnet de Soroban. Para produccion, cambiar `RPC_URL` y `NETWORK_PASSPHRASE`.
- **Tiempos de respuesta**: Las operaciones de blockchain pueden tomar varios segundos debido a la confirmacion de transacciones.

## Proyecto relacionado

Este backend esta disenado para trabajar con el contrato inteligente ubicado en `../soroban-contract/`. Consulta su README para instrucciones de despliegue del contrato.
