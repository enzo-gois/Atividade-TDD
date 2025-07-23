import {
  addProductToCart,
  getCart,
  clearCartMemory,
  applyCoupon,
  updateProductQuantity,
  removeProduct,
} from "../models/shoppingCartModel.js";

export function addToCart(req, res) {
  const body = req.body;
  if (Array.isArray(body)) {
    body.forEach((product) => addProductToCart(product));
  } else {
    addProductToCart(body);
  }

  return res.status(204).send();
}

export function getCartHandler(req, res) {
  const cart = getCart();
  return res.status(200).json({
    items: cart.items,
    total: cart.total,
  });
}

export function clearCart(req, res) {
  clearCartMemory();
  return res.status(204).send();
}

export function applyDiscountCoupon(req, res) {
  const { couponCode } = req.body;
  const newTotal = applyCoupon(couponCode);
  const cart = getCart();
  return res.status(200).json({ ...cart, total: newTotal });
}

export function updateProduct(req, res) {
  const { productId } = req.params;
  const { quantity } = req.body;

  updateProductQuantity(productId, quantity);
  const cart = getCart();
  res.status(200).json(cart);
}

export function deleteProduct(req, res) {
  const { id } = req.params;

  removeProduct(id);
  res.status(204).send();
}
