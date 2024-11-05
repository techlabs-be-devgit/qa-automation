import { Action } from "../support/actions/action";
import { ClientManagement } from "../support/pages/client_management";
import { Estimation } from "../support/pages/estimation";
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
      action.waitFor(6000);
      client.expectClientAdded(data.client.name);
      
  });

  it(("Creates a new Estimation"), () => {

    const estimation = new Estimation();
    estimation.visit(data.client.name);
    estimation.clickAddEstimationButton();
    estimation.fillEstimationName(data.estimation.name);
    estimation.selectBillingType(data.estimation.billing);
    estimation.checkClientName(data.client.name);
    estimation.selectResourceRole(data.resourceRoles.uxEng);
    estimation.selectResourceSkill(data.estimation.Skill);
    estimation.selectResourceRegion(data.estimation.Region);
    estimation.fillContractStartDate(data.estimation.startDate);
    estimation.fillContractEndDate(data.estimation.endDate);
    estimation.selectFullTime();
    estimation.clickAddResource();
    estimation.clickCreateEstimation();
  })
 
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
 
 
