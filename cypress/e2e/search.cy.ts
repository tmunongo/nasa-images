/// <reference types="Cypress" />

describe("My First Test", () => {
  it("Visits the search page", () => {
    cy.visit(Cypress.env("baseUrl"));

    // enter search query
    cy.get("#search").type("Jupiter");
    cy.get("#startDate").select("2014");
    cy.get("#endDate").select("2022");

    // verify that the value has been updated
    cy.get("#search").should("have.value", "Jupiter");
    cy.get("#startDate").should("have.value", "2014");
    cy.get("#endDate").should("have.value", "2022");

    // Search
    cy.contains("Search").click();

    // find a specific search result
    cy.get("a#link-3").should("exist");
  });
});
