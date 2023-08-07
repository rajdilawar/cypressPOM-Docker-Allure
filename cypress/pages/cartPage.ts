/// <reference types="Cypress" />

const url = Cypress.config().baseUrl;

const getIframeDocument = () => {
  return cy
    .get('iframe[class="stripe_checkout_app"')
    .its('0.contentDocument')
    .should('exist');
};

const getIframeBody = () => {
  // get the document
  return (
    getIframeDocument()
      // automatically retries until body is loaded
      .its('body')
      .should('not.be.undefined')
      // wraps "body" DOM element to allow
      // chaining more Cypress commands, like ".find(...)"
      .then(cy.wrap)
  );
};

// Using the getIframeDocument and getIframeBody functions to interact with elements inside the iframe. 
// This way, one can easily handle elements in the iframe context and perform actions like typing and clicking on elements.

export class CartPage {
  navigateToCartPage() {
    cy.visit(`${url}/cart`);
  }

  verifyCartPageHeader() {
    // Assertion to verify the page header
    cy.get('h2').should('have.text', 'Checkout');
  }

  clickAndVerifyYourTaskonCartPage() {
    cy.get('span.octicon.octicon-info').click();
    cy.get('.popover-body').should(
      'have.text',
      "Verify that the shopping cart looks correct. Then, fill out your payment details and submit the form. You can Google for 'Stripe test card numbers' to use valid cards. Note: The payment screen will error 5% of the time by design"
    );
  }

  verifyCartArticles() {
    // cy.get('tbody > :nth-child(1) > :nth-child(1)').contains('Aloe');
    cy.get(".table-striped tbody tr td:nth-child(2)").then(($prices) => {
      let total = 0;

      // Calculate total from item prices
      $prices.each((index, price) => {
        total += Number(price.textContent);
      });

      // Verify if total is correct
      cy.log(`Total: Rupees ${total}`);
      cy.get("#total").should("have.text", `Total: Rupees ${total}`);
    });
  }

  fillPaymentInfo() {
    cy.contains('Pay with Card').click();
    getIframeBody().find('#email').should('exist').type('rajdilawar@test.de', { force: true });
    getIframeBody().find("#card_number").type('4242424242424242', { force: true });
    getIframeBody().find("#cc-exp").type('12/23', { force: true });
    getIframeBody().find("#cc-csc").type('123', { force: true });
    getIframeBody().find("#billing-zip").type('12345', { force: true });
    getIframeBody().find('#submitButton').click();
  }
}