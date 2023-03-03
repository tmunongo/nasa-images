describe("Check search validation", () => {
  it("Visits the search page", () => {
    cy.visit(Cypress.env("baseUrl"));
    // click the search button
    cy.contains("Search").click();
    // there should be no search results
    cy.url().should("equal", `${Cypress.env("baseUrl")}`);
  });
});
