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

  it("Deve aplicar um cupom de desconto válido e recalcular o total", async () => {
    await request(app)
      .post("/shopping-cart")
      .send({ productId: "produto-caro", price: 100, quantity: 1 });

    const res = await request(app)
      .post("/shopping-cart/apply-coupon")
      .send({ couponCode: "DESCONTO10" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.total).toEqual(90);
  });

  it("Deve atualizar a quantidade de um produto que já está no carrinho", async () => {
    const productId = "prod-xyz";
    await request(app).post("/shopping-cart").send({ productId, quantity: 1 });

    const res = await request(app)
      .put(`/shopping-cart/${productId}`)
      .send({ quantity: 5 });

    expect(res.statusCode).toEqual(200);
    expect(res.body.items[0].quantity).toBe(5);
  });
});
