/// <reference types="Cypress" />

const url = Cypress.config().baseUrl;

export class WeathershopperPage {

     navigateToWeathershopperWebsite() {
        cy.visit(`${url}/`);
      }

      verifyWeatherShopperPage() {
        //Assertion to verify the page header
        cy.get('h2').should('have.text', 'Current temperature');

      }

      clickAndVerifyYourTask() {
        cy.get('span.octicon.octicon-info').click();
        cy.get('.popover-body').should('have.text', 'Shop for moisturizers if the weather is below 19 degrees. Shop for suncreens if the weather is above 34 degrees.')
      }

     verifyTempratureAndNavigate() {
      return cy.get('#temperature').then(($temperatureElement) => {
        // Extract the temperature value from the text and convert it to an integer
        const temperatureString = $temperatureElement.text();
        const temperature = parseInt(temperatureString);
  
        // Log the temperature to the Cypress console (optional)
        cy.log(`Current temperature: ${temperature} degrees`);
      
        if (temperature <= 19) {
          //By using Promise.resolve() to return the values asynchronously and then handling them with .then() in the test file
          return Promise.resolve('moisturizer');
        } else {
          // Click on "sunscreens" if the temperature is above 34 degrees
          return Promise.resolve('sunscreen');
        }

      });
     }

      navigateToMoisturizerPage() {
        cy.get('a[href="/moisturizer"] button.btn.btn-primary').click();
      }

      navigateToSunscreenPage() {
        cy.get('a[href="/sunscreen"] button.btn.btn-primary').click();
      }

}