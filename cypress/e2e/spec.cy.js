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
        client.fillClientName(data.clientName);
        client.fillClientAddress(data.clientAddress);
        client.selectClientCountry(data.country);
        client.selectClientState(data.state);
        client.selectClientCity(data.city);
        client.fillClientZipCode(data.zipCode);
        client.clickNextButton();
        client.fillContractName(data.contractName);
        client.selectContractType(data.contractType);
        client.fillContractStartDate(data.contractStartDate);
        client.clickNextButton();
        client.clickCreateClientButton();
        client.expectClientAdded(data.clientName);
  });

  it(("Opens the pricings for a client"), () => {
    
  })


  after(() => {
        const client = new ClientManagement();
        client.visit();
        client.deleteClient(data.clientName)
        client.expectClientDeleted(data.clientName);
  });
})

