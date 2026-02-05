build:
	stellar contract build

deploy: build
	stellar contract deploy \
	  --wasm target/wasm32v1-none/release/products.wasm \
	  --source-account zkCaleb \
	  --network testnet \
	  --alias products

test-register:
	stellar contract invoke \
	  --id CCFFNRMOVQPSUIQWMIBWRJC56WN7BWHKDKDCIEUMXNDMVFMEOG5JOSVM \
	  --source-account zkCaleb \
	  --network testnet \
	  -- \
	  register_product \
	  --name "Laptop Gaming" \
	  --description "Laptop 16GB RAM RTX 4060" \
	  --price 1500 \
	  --initial_stock 10

test-stock-add:
	stellar contract invoke \
	  --id CCFFNRMOVQPSUIQWMIBWRJC56WN7BWHKDKDCIEUMXNDMVFMEOG5JOSVM \
	  --source-account zkCaleb \
	  --network testnet \
	  -- \
	  update_stock \
	  --product_id 0 \
	  --quantity 5 \
	  --operation "add"

test-stock-sub:
	stellar contract invoke \
	  --id CCFFNRMOVQPSUIQWMIBWRJC56WN7BWHKDKDCIEUMXNDMVFMEOG5JOSVM \
	  --source-account zkCaleb \
	  --network testnet \
	  -- \
	  update_stock \
	  --product_id 0 \
	  --quantity 3 \
	  --operation "sub"

test-price:
	stellar contract invoke \
	  --id CCFFNRMOVQPSUIQWMIBWRJC56WN7BWHKDKDCIEUMXNDMVFMEOG5JOSVM \
	  --source-account zkCaleb \
	  --network testnet \
	  -- \
	  update_price \
	  --product_id 0 \
	  --new_price 1200

test-get:
	stellar contract invoke \
	  --id CCFFNRMOVQPSUIQWMIBWRJC56WN7BWHKDKDCIEUMXNDMVFMEOG5JOSVM \
	  --source-account zkCaleb \
	  --network testnet \
	  -- \
	  get_product \
	  --product_id 0

clean:
	cargo clean