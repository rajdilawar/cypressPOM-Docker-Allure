/// <reference types="Cypress" />

const url = Cypress.config().baseUrl;

export class MoisturizerPage {
  navigateToMoisturizerPage() {
    cy.visit(`${url}/moisturizer`);
  }

  verifyMoisturizerPageHeader() {
    //Assertion to verify the page header
    cy.get('h2').should('have.text', 'Moisturizers');
  }

  clickAndVerifyYourTaskForMoisturizers() {
    cy.get('span.octicon.octicon-info').click();
    cy.get('.popover-body').should(
      'have.text',
      'Add two moisturizers to your cart. First, select the least expensive mositurizer that contains Aloe. For your second moisturizer, select the least expensive moisturizer that contains almond. Click on cart when you are done.'
    );
  }

  selectLeastExpensiveAloeMoisturizer() {
    cy.xpath("//div[@class='text-center col-4']//*[contains(text(),'Aloe')]").then(
      ($aloeElements) => {
        if ($aloeElements.length > 0) {
          let lowestPrice = Number.MAX_SAFE_INTEGER;
          let aloeElementWithLowestPrice;

          $aloeElements.each((index, element) => {
            const $parentDiv = Cypress.$(element).parents('.text-center.col-4');
            const priceText = $parentDiv.find("p:contains('Price:')").text().trim();
            const price = parseInt(priceText.split('Rs.')[1]);
            if (price < lowestPrice) {
              lowestPrice = price;
              aloeElementWithLowestPrice = $parentDiv;
            }
          });

          if (aloeElementWithLowestPrice) {
            cy.log('Lowest Price: Rs. ' + lowestPrice);
            // Click on the button associated with the element with the lowest price
            //aloeElementWithLowestPrice.find('button.btn.btn-primary').click();
            cy.wait(1000);
            cy.wrap(aloeElementWithLowestPrice).scrollIntoView().find('button.btn.btn-primary').click();

          } else {
            cy.log("No element with the text 'aloe' found.");
          }
        }
      }
    );
  }

  selectLeastExpensiveAlmondMoisturizer() {
    cy.wait(2000);
    cy.xpath("//div[@class='text-center col-4']//*[contains(text(),'Almond')]").then(
      ($almondElements) => {
        if ($almondElements.length > 0) {
          let lowestAlmondPrice = Number.MAX_SAFE_INTEGER;
          let almondElementWithLowestPrice;

          $almondElements.each((index, element) => {
            const $parentDiv = Cypress.$(element).parents('.text-center.col-4');
            const priceText = $parentDiv.find("p:contains('Price:')").text().trim();
            const price = parseInt(priceText.split('Rs.')[1]);

            if (price < lowestAlmondPrice) {
              lowestAlmondPrice = price;
              almondElementWithLowestPrice = $parentDiv;
            }
          });

          if (almondElementWithLowestPrice) {
            // Log the lowest almond price
            cy.log('Lowest Almond Price: Rs. ' + lowestAlmondPrice);

            // Click on the button associated with the element with the lowest price
            //almondElementWithLowestPrice.find('button.btn.btn-primary').click();
            cy.wait(1000);
            cy.wrap(almondElementWithLowestPrice).scrollIntoView().find('button.btn.btn-primary').click();
          } else {
            cy.log("No element with the text 'almond' found.");
          }
        }
      }
    );
  }


  navigateToCartPageButton() {
    cy.get('button.thin-text.nav-link').click();
  }
}
