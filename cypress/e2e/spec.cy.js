import { Action } from "../support/actions/action";
import { ClientManagement } from "../support/pages/client_management";
import { Pricing } from "../support/pages/pricing";

describe("Client Management", () => {
  const action = new Action();
  let data;
  before(() => {
    action.c2cLogin();
    action
      .loadFixture('clientData.json')
      .then((clientData) => {
        data = clientData;
    });
  });
  
  // it("Adds a new client", () => {
  //   const client = new ClientManagement();
  //       client.visit();
  //       client.openAddClientPopup();
  //       client.fillClientName(data.clientName);
  //       client.fillClientAddress(data.clientAddress);
  //       client.selectClientCountry(data.country);
  //       client.selectClientState(data.state);
  //       client.selectClientCity(data.city);
  //       client.fillClientZipCode(data.zipCode);
  //       client.clickNextButton();
  //       client.fillContractName(data.contractName);
  //       client.selectContractType(data.contractType);
  //       client.fillContractStartDate(1, 11, 2024);
  //       client.clickNextButton();
  //       client.clickCreateClientButton();
  //       client.expectClientAdded(data.clientName);
  // });

  it(("Opens the pricings for a client"), () => {
        const pricing = new Pricing();
        pricing.visit('Test1')
        pricing.clickAddPricingButton();
        pricing.fillPricingName('Fkasjdklfasfasf')
        pricing.selectEstimationName('Testimation')
        pricing.fillDiscount('5')
        pricing.clickCreatePricingButton();
        pricing.expectPricingAdded('Fkasjdklfasfasf');
        pricing.deletePricing('Fkasjdklfasfasf');
        pricing.expectPricingDeleted('Fkasjdklfasfasf');
  })


  // after(() => {
  //       const client = new ClientManagement();
  //       client.visit();
  //       client.deleteClient(data.clientName)
  //       client.expectClientDeleted(data.clientName);
  // });
})

