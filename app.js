import shoppingCartRoutes from "./src/routes/shoppingCartRoutes.js";
import express from "express"

export const app = express();

const PORT = 3000;

app.use(express.json());
app.use(shoppingCartRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}!`);
});
