import express from "express";
import { addToCart, getCart, clearCart } from "../controllers/shoppingCartController.js";

const router = express.Router();

router.post("/shopping-cart", addToCart);
router.get("/shopping-cart", getCart);
router.delete("/shopping-cart", clearCart);

export default router;
