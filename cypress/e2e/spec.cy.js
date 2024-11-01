import { Action } from "../support/actions/action";
import { ClientManagement } from "../support/pages/client_management";

describe("Client Management", () => {
  const action = new Action();
  before(() => {
    action.c2cLogin();
  });
  
  it("Adds a new client", () => {
    const client = new ClientManagement();
    ClientManagement
      .action
      .loadFixture('clientData.json')
      .then((data) => {
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
        client.fillContractStartDate(1, 11, 2024);
        client.clickNextButton();
        client.clickCreateClientButton();
        client.expectClientAdded(data.clientName);
      });
  });

  it(("Deletes a client"), () => {
    action
      .loadFixture('clientData.json')
      .then((data) => {
        const client = new ClientManagement();
        client.deleteClient(data.clientName)
        client.expectClientDeleted(data.clientName);
      });
  })
  
})

