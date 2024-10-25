const { defineConfig } = require("cypress");
 
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://c2c-demo.matchps.com", // Set base URL for your application under test
    chromeWebSecurity: false, // Disable chrome web security to handle cross-origin issues
    experimentalSessionAndOrigin: true, // Enable experimental feature to handle multiple origins
    experimentalModifyObstructiveThirdPartyCode : true,
    experimentalStudio: true,
  },
});

