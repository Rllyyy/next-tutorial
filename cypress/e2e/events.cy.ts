/// <reference types="cypress" />

describe("Events spec", () => {
  it("should show events page when navigating to events url", () => {
    cy.visit("/events");
    cy.contains("h1", "Events").should("exist");
    cy.contains("label", "Filter by Type").should("exist");
    cy.get("select").should("have.value", "");
    cy.get("article").should("have.length", 10);
  });

  it("should update the output when changing the select value", () => {
    cy.visit("/events");
    cy.get("select").select("Sports").should("have.value", "sports");
    cy.get("article").should("have.length", 3);
    cy.contains("h2", "Marathon Race").should("exist");
  });

  it("should update the shown events when clicking on a chip inside an event", () => {
    cy.visit("/events");
    cy.get("article#4").find("a").click();

    // Test select
    cy.get("select").should("have.value", "technology");

    // output
    cy.get("article").should("have.length", 2);
    cy.contains("Tech Conference").should("exist");
  });

  it("should show events when entering url with search params", () => {
    cy.visit("/events?category=art");
    cy.get("select").should("have.value", "art");

    // select
    cy.get("article").should("have.length", 2);

    // output
    cy.contains("Art Fair").should("exist");
  });
});

export {};

//Directly
