let cart = [];
let appliedCoupon = null;

const coupons = {
  DESCONTO10: 0.1,
};

export function clearCartMemory() {
  cart = [];
  appliedCoupon = null;
}

export function getCart() {
  return {
    items: cart,
    total: calculateTotal(),
  };
}

export function addProductToCart(product) {
  const existing = cart.find(p => p.id === product.id);
  if (existing) {
    existing.quantity += product.quantity ?? 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name ?? "Produto",
      price: product.price ?? 0,
      quantity: product.quantity ?? 1,
    });
  }
}

export function updateProductQuantity(id, quantity) {
  const product = cart.find(p => p.id === id);
  if (!product) return false;
  product.quantity = quantity;
  return true;
}

export function removeProduct(id) {
  const initialLength = cart.length;
  cart = cart.filter(p => p.id !== id);
  return cart.length < initialLength;
}

export function applyCoupon(code) {
  if (!coupons[code]) return false;
  appliedCoupon = coupons[code];
  return true;
}

function calculateTotal() {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return appliedCoupon ? Math.round(subtotal * (1 - appliedCoupon)) : subtotal;
}
