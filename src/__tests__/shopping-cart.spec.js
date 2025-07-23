import request from "supertest";
import { app } from "../../app.js";

describe("Carrinho de compras", () => {
  it("Deve enviar os produtos do carrinho", async () => {
    const res = await request(app).post("/shopping-cart");
    expect(res.statusCode).toEqual(204);
  });

  it("Deve retornar o conteúdo completo do carrinho", async () => {
    // Primeiro, adiciona um item para garantir que o carrinho não está vazio
    await request(app)
      .post("/shopping-cart")
      .send({ productId: "prod-abc", quantity: 1 });

    const res = await request(app).get("/shopping-cart");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("items"); // Verifica se a resposta tem a propriedade 'items'
    expect(res.body).toHaveProperty("total"); // E a propriedade 'total'
    expect(res.body.items.length).toBe(1); // Garante que há 1 item no carrinho
  });

  it("Deve retornar um carrinho vazio se nenhum produto foi adicionado", async () => {
    // Assumindo que este teste corre com um carrinho "limpo"
    const res = await request(app).get("/shopping-cart");

    expect(res.statusCode).toEqual(200);
    expect(res.body.items).toEqual([]); // A lista de itens deve ser vazia
    expect(res.body.total).toEqual(0); // O total deve ser zero
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

  it("Deve remover um produto do carrinho com sucesso", async () => {
    const productId = "prod-to-delete";
    // Adiciona o produto que vamos remover
    await request(app).post("/shopping-cart").send({ productId, quantity: 1 });

    const res = await request(app).delete(`/shopping-cart/${productId}`);

    // 204 No Content é o status ideal para um DELETE bem-sucedido
    expect(res.statusCode).toEqual(204);

    // Podes também fazer um GET a seguir para garantir que o produto foi mesmo removido
    const carrinhoAtualizado = await request(app).get("/shopping-cart");
    expect(
      carrinhoAtualizado.body.items.find((item) => item.productId === productId)
    ).toBeUndefined();
  });
});
