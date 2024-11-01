import { login } from "../support/auth";

context("viewDashboard", () => {
  beforeEach(() => {
    login();
  });
  
  it("goes to dashboard", () => {
    cy.visit("/dashboard")
    cy.wait(1000)
    cy.url().should("include", "/dashboard");
    cy.get('p')
  })
})