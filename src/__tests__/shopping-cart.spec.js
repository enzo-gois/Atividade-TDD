import request from "supertest";
import { app } from "../../app.js";

describe("Carrinho de compras", () => {
  it("Deve enviar os produtos do carrinho", async () => {
    const res = await request(app).post("/shopping-cart");
    expect(res.statusCode).toEqual(204);
  });
});
