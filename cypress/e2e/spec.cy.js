import { Action } from "../support/actions/action";
import { ClientManagement } from "../support/pages/client_management";
import { Estimation } from "../support/pages/estimation";
import { Contract } from "../support/pages/contract";

let data;
const action = new Action();

before(() => {
	action.c2cLogin();
	action
		.loadFixture('clientData.json')
		.then((clientData) => {
			data = clientData;
		});
});

describe("Client Management", () => {
	it("Visits the client management page", () => {
		const testClient = new ClientManagement();
		testClient.visit();
		ClientManagement.action.urlShouldContain('/dashboard');
		testClient.expectClientManagementHeaderVisible();
	});

	it("Opens the add client popup", () => {
		const testClient = new ClientManagement();
		testClient.openAddClientPopup();
		testClient.expectAddClientHeaderVisible();
	});

	it("Inputs client name and address", () => {
		const testClient = new ClientManagement();
		testClient.fillClientName(data.client.name);
		testClient.fillClientAddress(data.client.address + " ");
		testClient.expectLeadingTrailingSpacesWarning();
		testClient.clearClientAddressField();
		testClient.expectEmptyAddressFieldWarning();
		testClient.fillClientAddress("qwerty");
		testClient.expectRandomCharactersInAddressFieldWarning();
		testClient.clearClientAddressField();
		testClient.fillClientAddress(data.client.address);
	});

	it("Inputs client country, state, city and zip code", () => {
		const testClient = new ClientManagement();
		testClient.selectClientCountry(data.client.country);
		testClient.selectClientState(data.client.state);
		testClient.selectClientCity(data.client.city);
		testClient.fillClientZipCode(data.client.zipCode + "1234567890");
		testClient.expectInvalidZipCodeWarning();
		testClient.clearZipCodeField();
		testClient.fillClientZipCode(data.client.zipCode);
		testClient.clickNextButton();
	});

	it("Inputs Organisation-level contract Details", () => {
		const testClient = new ClientManagement();
		testClient.fillContractName(data.orgLevelContract.name);
		testClient.selectContractType(data.orgLevelContract.type);
		testClient.fillContractStartDate(data.orgLevelContract.startDate);
		testClient.clickNextButton();
	});

	it("Creates new client", () => {
		const testClient = new ClientManagement();
		testClient.clickCreateClientButton();
		testClient.expectClientAdded(data.client.name);
	});

	it("Verifies client details", () => {
		const testClient = new ClientManagement();
		testClient.openClientDetails(data.client.name);
        testClient.expectClientNameToBe(data.client.name);
		testClient.expectClientAddressToBe(data.client.address);
		testClient.expectClientCityToBe(data.client.city);
		testClient.expectClientStateToBe(data.client.state);
		testClient.expectClientCountryToBe(data.client.countryShort);
		testClient.expectClientZipCodeToBe(data.client.zipCode);
	});
});

describe("Estimation", () => {
	
	it.only(("Goes to client estimations"), () => {
		const testEstimation = new Estimation();
		testEstimation.visit('Test 1');
		testEstimation.expectEstimationsHeaderVisible();
	});

	it.only(("Opens the add estimation popup"), () => {
		const testEstimation = new Estimation();
        testEstimation.openAddEstimationPopup();
        testEstimation.expectEfforEstimationHeaderVisible();
	});

	it.only("Fills out estimation data", () => {
		const testEstimation = new Estimation();
        testEstimation.fillEstimationName(data.estimation.name);
        testEstimation.selectBillingType(data.billing.enterprise);
		// testEstimation.expectClientNameToBe(data.client.name);
		testEstimation.selectResourceRole(data.resourceRole.uxEng);
		testEstimation.selectResourceSkill(data.estimation.skill);
		testEstimation.selectResourceRegion(data.region.ind);
		testEstimation.fillResourceStartDate('2024-10-01');
		testEstimation.fillResourceEndDate('2024-11-29');
		testEstimation.expectEstimatedHoursToBe(352);
	});

	it.only("Opens the Estimation Calendar", () => {
		const testEstimation = new Estimation();
        testEstimation.openEstimationCalendar();
	});

	it.only("Splits hours by month", () => {
		const testEstimation = new Estimation();
        testEstimation.switchToMonthlyTab();
		testEstimation.fillSplitHours(120);
		testEstimation.fillMinHours(50);
		testEstimation.fillMaxHours(60);
		testEstimation.selectAllOption();
		testEstimation.splitHours();
		testEstimation.validateSplit();
	});

	it.only("Splits hours by week", () => {
		const testEstimation = new Estimation();
        testEstimation.switchToWeeklyTab();
		testEstimation.expectSplitHoursToBe(60);
		testEstimation.fillMinHours(0);
		testEstimation.fillMaxHours(20);
		testEstimation.selectAllOption();
		testEstimation.splitHours();
		testEstimation.validateSplit();
	});

	it("Splits hours by day", () => {
		const testEstimation = new Estimation();
        testEstimation.switchToDailyTab();
	});
});

describe("Post Test cleanup", () => {
	it("Deletes the created client", () => {
		const testClient = new ClientManagement();
        testClient.visit();
        testClient.deleteClient(data.client.name)
        testClient.expectClientDeleted(data.client.name);
	});
});