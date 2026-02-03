#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Env, String};

// Struct para almacenar los datos del producto
#[contracttype]
#[derive(Clone)]
pub struct Product {
    pub id: u64,
    pub name: String,
    pub description: String,
    pub price: u64,
    pub stock: u32,
}

// Enum para las claves de storage
#[contracttype]
pub enum DataKey {
    Product(u64),
    Counter,
}

#[contract]
pub struct Contract;

#[contractimpl]
impl Contract {
    pub fn register_product(
        env: Env,
        name: String,
        description: String,
        price: u64,
        initial_stock: u32,
    ) -> Product {
        // Obtener el contador actual o iniciar en 0
        let id: u64 = env
            .storage()
            .instance()
            .get(&DataKey::Counter)
            .unwrap_or(0);

        // Incrementar el contador para el próximo producto
        env.storage()
            .instance()
            .set(&DataKey::Counter, &(id + 1));

        // Crear el producto
        let product = Product {
            id,
            name,
            description,
            price,
            stock: initial_stock,
        };

        // Almacenar en persistent storage
        env.storage()
            .persistent()
            .set(&DataKey::Product(id), &product);

        // Retornar copia del producto almacenado
        product
    }

    /// Actualiza el stock de un producto
    /// operation: "add" para agregar, "sub" para restar
    pub fn update_stock(
        env: Env,
        product_id: u64,
        quantity: u32,
        operation: String,
    ) -> Product {
        // Obtener el producto del storage
        let mut product: Product = env
            .storage()
            .persistent()
            .get(&DataKey::Product(product_id))
            .expect("Product not found");

        // Comparar operación y actualizar stock
        let add_op = String::from_str(&env, "add");
        let sub_op = String::from_str(&env, "sub");

        if operation == add_op {
            // Agregar al stock
            product.stock = product.stock.checked_add(quantity).expect("Stock overflow");
        } else if operation == sub_op {
            // Restar del stock
            product.stock = product.stock.checked_sub(quantity).expect("Insufficient stock");
        } else {
            panic!("Invalid operation: use 'add' or 'sub'");
        }

        // Guardar el producto actualizado
        env.storage()
            .persistent()
            .set(&DataKey::Product(product_id), &product);

        product
    }

    /// Actualiza el precio de un producto
    pub fn update_price(
        env: Env,
        product_id: u64,
        new_price: u64,
    ) -> Product {
        // Obtener el producto del storage
        let mut product: Product = env
            .storage()
            .persistent()
            .get(&DataKey::Product(product_id))
            .expect("Product not found");

        // Actualizar el precio
        product.price = new_price;

        // Guardar el producto actualizado
        env.storage()
            .persistent()
            .set(&DataKey::Product(product_id), &product);

        product
    }

    /// Obtiene un producto por su ID
    pub fn get_product(env: Env, product_id: u64) -> Product {
        env.storage()
            .persistent()
            .get(&DataKey::Product(product_id))
            .expect("Product not found")
    }
}

mod test;
