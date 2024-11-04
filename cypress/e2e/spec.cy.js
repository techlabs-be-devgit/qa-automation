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
  
  it("Adds a new client", () => {
    const client = new ClientManagement();
      client.visit();
      client.openAddClientPopup();
      client.fillClientName(data.client.name);
      client.fillClientAddress(data.client.address);
      client.selectClientCountry(data.client.country);
      client.selectClientState(data.client.state);
      client.selectClientCity(data.client.city);
      client.fillClientZipCode(data.client.zipCode);
      client.clickNextButton();
      client.fillContractName(data.orgLevelContract.name);
      client.selectContractType(data.orgLevelContract.type);
      client.fillContractStartDate(data.orgLevelContract.startDate);
      client.clickNextButton();
      client.clickCreateClientButton();
      client.expectClientAdded(data.client.name);
  });

  it(("Opens the pricings for a client"), () => {
    const pricing = new Pricing();
    pricing.visit(data.client.name);
  })


  after(() => {
    const client = new ClientManagement();
    client.visit();
    client.deleteClient(data.client.name)
    client.expectClientDeleted(data.client.name);
  });
})

