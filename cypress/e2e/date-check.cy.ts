describe("Make sure dates selected correctly", () => {
  it("Checks that start date is before end date", () => {
    cy.visit(Cypress.env("baseUrl"));

    // type a search query
    cy.get("#search").type("Titan");
    // select start date
    cy.get("#startDate").select("2022");
    // select end date
    cy.get("#endDate").select("2010");

    // submit the form
    cy.get("input:submit").click();

    cy.get("#error-message").should("exist");
  });
});
