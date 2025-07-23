let cart = [];
let appliedCoupon = null;

const coupons = {
  DESCONTO10: 0.1,
};

export function applyCoupon(couponCode) {
  if (coupons[couponCode]) {
    appliedCoupon = coupons[couponCode];
  }
  return calculateTotal();
}

export function addProductToCart(product) {
  const existing = cart.find((p) => p.id === product.id);
  if (existing) {
    existing.quantity += product.quantity ?? 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name || "Produto",
      price: product.price ?? 0,
      quantity: product.quantity ?? 1,
    });
  }
}

export function getCart() {
  return {
    items: cart,
    total: calculateTotal(),
  };
}

export function clearCartMemory() {
  cart = [];
  appliedCoupon = null;
}

export function updateProductQuantity(id, qtd) {
  const product = cart.find((p) => p.id === id);
  if (product) {
    product.quantity = qtd;
  }
}

export function removeProduct(id) {
  cart = cart.filter((p) => p.id !== id);
}

function calculateTotal() {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  if (appliedCoupon) {
    return Math.round(subtotal * (1 - appliedCoupon));
  }
  return subtotal;
}
