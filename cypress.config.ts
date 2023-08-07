import { defineConfig } from "cypress";
const allureWriter = require('@shelex/cypress-allure-plugin/writer');



export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureWriter(on, config);
      return config;
    },
    baseUrl: 'https://weathershopper.pythonanywhere.com',
    chromeWebSecurity: false,
    blockHosts: ["google-analytics.com", "googletagmanager.com", "ampcid.google.com"],
    defaultCommandTimeout: 8000,
    responseTimeout: 12000
  },
});
