

import { CartPage } from "../../pages/cartPage";
import { MoisturizerPage } from "../../pages/moisturizerPage";
import { PaymentSuccessPagePage } from "../../pages/paymentSuccessPage";
import { SunscreenPage } from "../../pages/sunscreenPage";
import { WeathershopperPage } from "../../pages/weathershopperPage";

describe('Your Test Suite', () => {
  const weatherShopperPage = new WeathershopperPage();
  const moisturizerPage = new MoisturizerPage();
  const cartPage = new CartPage();
  const sunscreenPage = new SunscreenPage();
  const paymentSuccessPagePage = new PaymentSuccessPagePage();


  beforeEach(() => {
    weatherShopperPage.navigateToWeathershopperWebsite();
    weatherShopperPage.verifyWeatherShopperPage();
    weatherShopperPage.clickAndVerifyYourTask();
  });

  afterEach(() => {
    cartPage.verifyCartPageHeader();
    cartPage.verifyCartArticles();
    cartPage.fillPaymentInfo();
    paymentSuccessPagePage.verifyPaymentSuccessPageHeader();
  });

  it('should navigate to the correct page based on the temperature', () => {
    let lowestAlmondPrice; // Declare lowestAlmondPrice here
        
    // Call verifyTempratureAndNavigate() to get the selected option (moisturizer or sunscreen)
    weatherShopperPage.verifyTempratureAndNavigate().then((selectedOption) => {
        // Use the selected option to navigate to the appropriate page
        if (selectedOption === 'moisturizer') {
          weatherShopperPage.navigateToMoisturizerPage();
          moisturizerPage.verifyMoisturizerPageHeader();
          moisturizerPage.clickAndVerifyYourTaskForMoisturizers();
          moisturizerPage.selectLeastExpensiveAloeMoisturizer();
          moisturizerPage.selectLeastExpensiveAlmondMoisturizer();
          moisturizerPage.navigateToCartPageButton();
        
        } else if (selectedOption === 'sunscreen') {
          weatherShopperPage.navigateToSunscreenPage();
          sunscreenPage.verifySunscreensPageHeader();
          sunscreenPage.clickAndVerifyYourTaskForSunscreens();
          sunscreenPage.selectLeastExpensivespf50Sunscreen();
          sunscreenPage.selectLeastExpensiveSpf30Sunscreen();
          sunscreenPage.navigateToCartPageButton();
        }
      // Add any additional assertions or actions after navigating to the page, if needed
    });
  });
});
