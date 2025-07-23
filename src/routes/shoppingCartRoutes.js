import express from "express";
import {
  addToCart,
  getCartHandler,
  clearCart,
  applyDiscountCoupon,
  updateProduct,
  deleteProduct,
} from "../controllers/shoppingCartController.js";

const router = express.Router();

router.post("/shopping-cart", addToCart);
router.get("/shopping-cart", getCartHandler);
router.delete("/shopping-cart", clearCart);
router.post("/shopping-cart/apply-coupon", applyDiscountCoupon);
router.put("/shopping-cart/:productId", updateProduct);
router.delete("/shopping-cart/:productId", deleteProduct);

export default router;
