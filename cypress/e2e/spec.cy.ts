describe("Check search validation", () => {
  it("Visits the search page", () => {
    cy.visit(Cypress.env("baseUrl"));

    // enter search query
    cy.get("#search").type("Titan");

    // verify that the value has been updated
    cy.get("#search").should("have.value", "Titan");

    // Search
    cy.get("input:submit").click();

    // find a specific search result
    cy.get("a#link-0").click();

    // intercept api request to get the image
    cy.intercept({
      method: "GET",
      url: "https://images-api.nasa.gov/asset/*",
    }).as("getImage");
    // wait for the request to complete
    cy.wait("@getImage");
    // check if an image has been loaded on the page
    cy.get("img").should("exist");
    // locate the back button
    cy.contains("Back").click();
    // check the current url
    cy.url().should("equal", Cypress.env("baseUrl"));
  });
});
