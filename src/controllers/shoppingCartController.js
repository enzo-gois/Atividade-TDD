import {
  addProductToCart,
  getCart,
  clearCartMemory,
  applyCoupon,
  updateProductQuantity,
  removeProduct,
} from "../models/shoppingCartModel.js";

export function addToCart(req, res) {
  try {
    const products = Array.isArray(req.body) ? req.body : [req.body];

    if (!products.every(p => p.id && p.price != null)) {
      return res.status(400).json({ message: "Produto inválido. 'id' e 'price' são obrigatórios." });
    }

    products.forEach(addProductToCart);
    return res.sendStatus(204);
  } catch {
    return res.status(500).json({ message: "Erro ao adicionar produto ao carrinho." });
  }
}

export function getCartHandler(_req, res) {
  try {
    return res.status(200).json(getCart());
  } catch {
    return res.status(500).json({ message: "Erro ao recuperar carrinho." });
  }
}

export function clearCart(_req, res) {
  try {
    clearCartMemory();
    return res.sendStatus(204);
  } catch {
    return res.status(500).json({ message: "Erro ao limpar o carrinho." });
  }
}

export function applyDiscountCoupon(req, res) {
  try {
    const { couponCode } = req.body;
    if (!couponCode) {
      return res.status(400).json({ message: "Código do cupom é obrigatório." });
    }

    const applied = applyCoupon(couponCode);
    if (!applied) {
      return res.status(400).json({ message: "Cupom inválido." });
    }

    return res.status(200).json(getCart());
  } catch {
    return res.status(500).json({ message: "Erro ao aplicar cupom." });
  }
}

export function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Quantidade inválida." });
    }

    const updated = updateProductQuantity(id, quantity);
    if (!updated) {
      return res.status(404).json({ message: "Produto não encontrado no carrinho." });
    }

    return res.status(200).json(getCart());
  } catch {
    return res.status(500).json({ message: "Erro ao atualizar quantidade." });
  }
}

export function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const removed = removeProduct(id);
    if (!removed) {
      return res.status(404).json({ message: "Produto não encontrado no carrinho." });
    }

    return res.sendStatus(204);
  } catch {
    return res.status(500).json({ message: "Erro ao remover produto." });
  }
}
