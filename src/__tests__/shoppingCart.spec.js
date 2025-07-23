import request from "supertest";
import { app } from "../../app.js";

describe("Carrinho de compras", () => {
  it("Deve enviar uma lista de produtos ao carrinho e retornar 204", async () => {
    const products = [
      { id: 249, name: "Monitor 24 Polegadas", price: 600.0, quantity: 1 },
      { id: 1025, name: "Mac Book Pro", price: 3400.0, quantity: 1 },
    ];
    const res = await request(app).post("/shopping-cart").send(products);
    expect(res.statusCode).toEqual(204);
  });
});
