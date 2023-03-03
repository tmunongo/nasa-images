/// <reference types="Cypress" />

describe("Check that the search function works", () => {
  it("Visits the search page and attempts a search", () => {
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
    cy.get("input:submit").click();

    // find a specific search result
    cy.get("a#link-0").should("exist");
  });
});
