export function addToCart(req, res) {
  const products = req.body;

  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: "Products array is required" });
  }

  addProductsToCart(products);
  return res.status(204).send();
}

export function getCart(req, res) {
  const products = getProductsFromCart();
  return res.status(200).json(products);
}

export function clearCart(req, res) {
  clearCartMemory();
  return res.status(204).send();
}
