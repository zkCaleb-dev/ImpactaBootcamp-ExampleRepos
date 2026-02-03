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
	  --id CB67JJXMXIIDUE2DCXMQZTPAHUU73CYHFDRK2WVX3EVULBDHRWOVXKH4 \
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
	  --id CBQU2RZBGRL7CZUUIEIJFTCU2EW47UVT5KNF3MASJLT6OUJZN5RXRSN2 \
	  --source-account zkCaleb \
	  --network testnet \
	  -- \
	  update_stock \
	  --product_id 0 \
	  --quantity 5 \
	  --operation "add"

test-stock-sub:
	stellar contract invoke \
	  --id CBQU2RZBGRL7CZUUIEIJFTCU2EW47UVT5KNF3MASJLT6OUJZN5RXRSN2 \
	  --source-account zkCaleb \
	  --network testnet \
	  -- \
	  update_stock \
	  --product_id 0 \
	  --quantity 3 \
	  --operation "sub"

test-price:
	stellar contract invoke \
	  --id CBQU2RZBGRL7CZUUIEIJFTCU2EW47UVT5KNF3MASJLT6OUJZN5RXRSN2 \
	  --source-account zkCaleb \
	  --network testnet \
	  -- \
	  update_price \
	  --product_id 0 \
	  --new_price 1200

test-get:
	stellar contract invoke \
	  --id CBQU2RZBGRL7CZUUIEIJFTCU2EW47UVT5KNF3MASJLT6OUJZN5RXRSN2 \
	  --source-account zkCaleb \
	  --network testnet \
	  -- \
	  get_product \
	  --product_id 0

clean:
	cargo clean