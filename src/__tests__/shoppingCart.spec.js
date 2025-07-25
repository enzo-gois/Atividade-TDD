import request from "supertest";
import { app } from "../../app.js";
import { clearCartMemory } from "../models/shoppingCartModel.js";

describe("Carrinho de compras", () => {
  beforeEach(() => {
    clearCartMemory();
  });

  it("Deve adicionar produtos ao carrinho e retornar seu conteúdo com total calculado", async () => {
    const products = [
      { id: 249, name: "Monitor 24 Polegadas", price: 600.0, quantity: 1 },
      { id: 1025, name: "Mac Book Pro", price: 3400.0, quantity: 1 },
    ];

    const postRes = await request(app).post("/shopping-cart").send(products);
    expect(postRes.statusCode).toBe(204);

    const getRes = await request(app).get("/shopping-cart");
    expect(getRes.statusCode).toBe(200);
    expect(getRes.body).toHaveProperty("items");
    expect(getRes.body).toHaveProperty("total");
    expect(getRes.body.items.length).toBe(2);
    expect(getRes.body.total).toBe(4000);
  });

  it("Deve retornar um carrinho vazio se nenhum produto foi adicionado", async () => {
    const res = await request(app).get("/shopping-cart");

    expect(res.statusCode).toEqual(200);
    expect(res.body.items).toEqual([]);
    expect(res.body.total).toEqual(0);
  });

  it("Deve aplicar um cupom de desconto válido e recalcular o total", async () => {
    await request(app)
      .post("/shopping-cart")
      .send({ id: "produto-caro", price: 100.00, quantity: 1 });

    const res = await request(app)
      .post("/shopping-cart/apply-coupon")
      .send({ couponCode: "DESCONTO10" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.total).toEqual(90);
  });

  it("Deve atualizar a quantidade de um produto que já está no carrinho", async () => {
    const id = "prod-xyz";
    await request(app).post("/shopping-cart").send({ id, price: 200, quantity: 1 });

    const res = await request(app)
      .put(`/shopping-cart/${id}`)
      .send({ quantity: 5 });

    expect(res.statusCode).toEqual(200);
    expect(res.body.items[0].quantity).toBe(5);
  });

  it("Deve remover um produto do carrinho com sucesso", async () => {
    const productId = "prod-to-delete";

    await request(app).post("/shopping-cart").send({ id: productId, price: 100, quantity: 1 });

    const res = await request(app).delete(`/shopping-cart/${productId}`);

    expect(res.statusCode).toEqual(204);

    const carrinhoAtualizado = await request(app).get("/shopping-cart");
    expect(carrinhoAtualizado.body.items.find(item => item.id === productId)).toBeUndefined();
  });
});
