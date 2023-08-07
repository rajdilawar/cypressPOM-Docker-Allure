/// <reference types="Cypress" />

const url = Cypress.config().baseUrl;

export class SunscreenPage {
  navigateToMoisturizerPage() {
    cy.visit(`${url}/sunscreen`);
  }

  verifySunscreensPageHeader() {
    //Assertion to verify the page header
    cy.get('h2').should('have.text', 'Sunscreens');
  }

  clickAndVerifyYourTaskForSunscreens() {
    // cy.get('span.octicon.octicon-info').click();
    // cy.get('.popover-body').contains('Add two sunscreens to your cart. First, select the least expensive sunscreen that is SPF-50. For your second sunscreen, select the least expensive sunscreen that is SPF-30. Click on the cart when you are done.'
    // );
  }

  selectLeastExpensivespf50Sunscreen() {
    cy.xpath("//div[@class='text-center col-4']//*[contains(text(),'SPF-50')]").then(
      ($spf50Elements) => {
        if ($spf50Elements.length > 0) {
          let lowestPrice = Number.MAX_SAFE_INTEGER;
          let spf50ElementWithLowestPrice;

          $spf50Elements.each((index, element) => {
            const $parentDiv = Cypress.$(element).parents('.text-center.col-4');
            const priceText = $parentDiv.find("p:contains('Price:')").text().trim();
            const price = parseInt(priceText.split('Rs.')[1]);
            if (price < lowestPrice) {
              lowestPrice = price;
              spf50ElementWithLowestPrice = $parentDiv;
            }
          });

          if (spf50ElementWithLowestPrice) {
            cy.log('Lowest Price: Rs. ' + lowestPrice);
            // Click on the button associated with the element with the lowest price
            //spf50ElementWithLowestPrice.find('button.btn.btn-primary').click();
            cy.wait(1000);
            cy.wrap(spf50ElementWithLowestPrice).scrollIntoView().find('button.btn.btn-primary').click();

          } else {
            cy.log("No element with the text 'SPF-50' found.");
          }
        }
      }
    );
  }

  selectLeastExpensiveSpf30Sunscreen() {
    cy.wait(2000);
    cy.xpath("//div[@class='text-center col-4']//*[contains(text(),'SPF-30')]").then(
      ($spf30Elements) => {
        if ($spf30Elements.length > 0) {
          let lowestspf30Price = Number.MAX_SAFE_INTEGER;
          let spf30ElementWithLowestPrice;

          $spf30Elements.each((index, element) => {
            const $parentDiv = Cypress.$(element).parents('.text-center.col-4');
            const priceText = $parentDiv.find("p:contains('Price:')").text().trim();
            const price = parseInt(priceText.split('Rs.')[1]);

            if (price < lowestspf30Price) {
              lowestspf30Price = price;
              spf30ElementWithLowestPrice = $parentDiv;
            }
          });

          if (spf30ElementWithLowestPrice) {
            // Log the lowest almond price
            cy.log('Lowest Almond Price: Rs. ' + lowestspf30Price);

            // Click on the button associated with the element with the lowest price
            //spf30ElementWithLowestPrice.find('button.btn.btn-primary').click();
            cy.wait(1000);
            cy.wrap(spf30ElementWithLowestPrice).scrollIntoView().find('button.btn.btn-primary').click();

          } else {
            cy.log("No element with the text 'SPF-30' found.");
          }
        }
      }
    );
  }


  navigateToCartPageButton() {
    cy.get('button.thin-text.nav-link').click();
  }
}
