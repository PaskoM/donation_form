// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import "cypress-axe";

Cypress.Commands.add("iframe", (iframeSelector: string) => {
  cy.get(`iframe${iframeSelector}`, { timeout: 10000 }).then(($iframe) => {
    const body = $iframe.contents().find("body");
    cy.wrap(body);
  });
});

Cypress.Commands.add("checkAccessibility", (context = null, options = {}) => {
  cy.injectAxe();
  cy.checkA11y(
    context,
    options,
    (violations) => {
      violations.forEach((violation) => {
        const nodes = Cypress.$(
          violation.nodes.map((node) => node.target).join(",")
        );
        cy.log("Accessibility violation", violation);
        cy.log("Affected elements", nodes);
      });
    },
    true
  ); 
});


