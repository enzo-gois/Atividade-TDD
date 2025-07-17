import express from "express"
import database from "./src/config/database.js";

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}!`);
});
