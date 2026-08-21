describe("Auth API", () => {
  it("refuse un login avec de mauvais identifiants", () => {
    cy.request({
      method: "POST",
      url: "/auth/login",
      failOnStatusCode: false,
      body: { username: "admin", password: "wrong" },
    }).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body.success).to.eq(false);
    });
  });

  it("refuse un login avec des champs manquants", () => {
    cy.request({
      method: "POST",
      url: "/auth/login",
      failOnStatusCode: false,
      body: { username: "admin" },
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it("retourne un token JWT avec les bons identifiants", () => {
    cy.request("POST", "/auth/login", {
      username: "admin",
      password: "admin123",
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.data).to.have.property("token");
      expect(res.body.data.token).to.be.a("string");
    });
  });
});
