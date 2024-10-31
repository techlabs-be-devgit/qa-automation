import { Action } from "../support/actions/action";
import { ClientManagement } from "../support/page_objects/client_management";

context("viewDashboard", () => {
  const action = new Action();
  beforeEach(() => {
    action.c2cLogin();
  });

  it("Successfully logs in", () => {
    const cm = new ClientManagement();
    cm.visit();
    cm.openAddClientPopup();
    cm.fillClientName("Test Client");
    cm.fillClientAddress("Test Address");
    cm.selectClientCountry("India");
    cm.selectClientState("Kerala");
    cm.selectClientCity("Thiruvananthapuram");
    cm.fillClientZipCode("678901");
    cm.clickNextButton();
    cm.fillContractName("Test Contract");
    cm.selectContractType('PSA')
    cm.fillContractStartDate(15, 7, 2022);
    cm.fillContractEndDate(20, 7, 2023);
    cm.clickNextButton();
    cm.clickCreateClientButton();
  })
})

