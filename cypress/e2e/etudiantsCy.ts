describe("Etudiants API", () => {
  let token: string;
  let createdId: number;

  before(() => {
    cy.request("POST", "/auth/login", {
      username: "admin",
      password: "admin123",
    }).then((res) => {
      token = res.body.data.token;
    });
  });

  it("refuse l'accès sans token", () => {
    cy.request({
      method: "GET",
      url: "/etudiants",
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(401);
    });
  });

  it("refuse l'accès avec un token invalide", () => {
    cy.request({
      method: "GET",
      url: "/etudiants",
      failOnStatusCode: false,
      headers: { Authorization: "Bearer token_invalide" },
    }).then((res) => {
      expect(res.status).to.eq(403);
    });
  });

  it("liste les étudiants", () => {
    cy.request({
      method: "GET",
      url: "/etudiants",
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.data).to.be.an("array");
    });
  });

  it("crée un étudiant", () => {
    cy.request({
      method: "POST",
      url: "/etudiants",
      headers: { Authorization: `Bearer ${token}` },
      body: {
        nom: "Test",
        prenom: "Cypress",
        email: `cypress${Date.now()}@mail.com`,
        age: 25,
      },
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body.data).to.have.property("id");
      createdId = res.body.data.id;
    });
  });

  it("refuse la création avec des champs manquants", () => {
    cy.request({
      method: "POST",
      url: "/etudiants",
      failOnStatusCode: false,
      headers: { Authorization: `Bearer ${token}` },
      body: { nom: "Incomplet" },
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it("récupère l'étudiant créé par son id", () => {
    cy.request({
      method: "GET",
      url: `/etudiants/${createdId}`,
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.data.id).to.eq(createdId);
    });
  });

  it("retourne 404 pour un id inexistant", () => {
    cy.request({
      method: "GET",
      url: "/etudiants/999999",
      failOnStatusCode: false,
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      expect(res.status).to.eq(404);
    });
  });

  it("remplace entièrement l'étudiant (PUT)", () => {
    cy.request({
      method: "PUT",
      url: `/etudiants/${createdId}`,
      headers: { Authorization: `Bearer ${token}` },
      body: {
        nom: "TestMaj",
        prenom: "Cypress",
        email: `cypressmaj${Date.now()}@mail.com`,
        age: 26,
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.data.nom).to.eq("TestMaj");
    });
  });

  it("modifie partiellement l'étudiant (PATCH)", () => {
    cy.request({
      method: "PATCH",
      url: `/etudiants/${createdId}`,
      headers: { Authorization: `Bearer ${token}` },
      body: { age: 27 },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.data.age).to.eq(27);
    });
  });

  it("supprime l'étudiant", () => {
    cy.request({
      method: "DELETE",
      url: `/etudiants/${createdId}`,
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      expect(res.status).to.eq(204);
    });
  });

  it("retourne 404 pour l'étudiant supprimé", () => {
    cy.request({
      method: "GET",
      url: `/etudiants/${createdId}`,
      failOnStatusCode: false,
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      expect(res.status).to.eq(404);
    });
  });
});
