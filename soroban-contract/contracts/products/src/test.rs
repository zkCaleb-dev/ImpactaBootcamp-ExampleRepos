#![cfg(test)]

use super::*;
use soroban_sdk::Env;

#[test]
fn test_register_product() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let name = String::from_str(&env, "Laptop");
    let description = String::from_str(&env, "Gaming laptop 16GB RAM");
    let price: u64 = 1500;
    let stock: u32 = 10;

    let product = client.register_product(&name, &description, &price, &stock);

    // Verificar que el producto se creo correctamente
    assert_eq!(product.id, 0);
    assert_eq!(product.name, name);
    assert_eq!(product.description, description);
    assert_eq!(product.price, price);
    assert_eq!(product.stock, stock);

    // Registrar segundo producto - debe tener ID 1
    let product2 = client.register_product(&name, &description, &price, &stock);
    assert_eq!(product2.id, 1);
}

#[test]
fn test_update_stock_add() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    // Crear producto con stock inicial de 10
    let product = client.register_product(
        &String::from_str(&env, "Laptop"),
        &String::from_str(&env, "Gaming laptop"),
        &1500,
        &10,
    );

    // Agregar 5 unidades
    let updated = client.update_stock(
        &product.id,
        &5,
        &String::from_str(&env, "add"),
    );

    assert_eq!(updated.stock, 15);
}

#[test]
fn test_update_stock_sub() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    // Crear producto con stock inicial de 10
    let product = client.register_product(
        &String::from_str(&env, "Laptop"),
        &String::from_str(&env, "Gaming laptop"),
        &1500,
        &10,
    );

    // Restar 3 unidades
    let updated = client.update_stock(
        &product.id,
        &3,
        &String::from_str(&env, "sub"),
    );

    assert_eq!(updated.stock, 7);
}

#[test]
fn test_update_price() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    // Crear producto con precio inicial de 1500
    let product = client.register_product(
        &String::from_str(&env, "Laptop"),
        &String::from_str(&env, "Gaming laptop"),
        &1500,
        &10,
    );

    assert_eq!(product.price, 1500);

    // Actualizar precio a 1200
    let updated = client.update_price(&product.id, &1200);

    assert_eq!(updated.price, 1200);
    // Verificar que los demás campos no cambiaron
    assert_eq!(updated.stock, 10);
    assert_eq!(updated.id, 0);
}

#[test]
fn test_get_product() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let name = String::from_str(&env, "Laptop");
    let description = String::from_str(&env, "Gaming laptop");

    // Crear producto
    let product = client.register_product(&name, &description, &1500, &10);

    // Obtener producto por ID
    let fetched = client.get_product(&product.id);

    assert_eq!(fetched.id, product.id);
    assert_eq!(fetched.name, name);
    assert_eq!(fetched.description, description);
    assert_eq!(fetched.price, 1500);
    assert_eq!(fetched.stock, 10);
}
