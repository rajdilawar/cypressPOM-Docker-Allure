/// <reference types="Cypress" />

const url = Cypress.config().baseUrl;

export class PaymentSuccessPagePage {

  verifyPaymentSuccessPageHeader() {
    cy.wait(2000);
    //Assertion to verify successful payment
    cy.get('h2').should('have.text', 'PAYMENT SUCCESS');
    cy.get('.text-justify').should('have.text', 'Your payment was successful. You should receive a follow-up call from our sales team.')
  }
}
