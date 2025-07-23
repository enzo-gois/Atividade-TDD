let cart = [];

export function addProductsToCart(products) {
  cart.push(...products);
}

export function getProductsFromCart() {
  return cart;
}

export function clearCartMemory() {
  cart = [];
}
