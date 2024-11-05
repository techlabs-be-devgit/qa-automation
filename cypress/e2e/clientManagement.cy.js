import { Action } from "../support/actions/action";
import { ClientManagement } from "../support/pages/client_management";

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
		testClient.fillContractEndDate(data.orgLevelContract.endDate);
		testClient.clickNextButton();
	})

	it("Creates new client", () => {
		const testClient = new ClientManagement();
		testClient.clickCreateClientButton();
		testClient.expectClientAdded(data.client.name);
	})

	it("Verifies client details", () => {
		const testClient = new ClientManagement();
		testClient.openClientDetails(data.client.name);
        testClient.expectClientNameToBe(data.client.name);
		testClient.expectClientAddressToBe(data.client.address);
		testClient.expectClientCityToBe(data.client.city);
		testClient.expectClientStateToBe(data.client.state);
		testClient.expectClientCountryToBe(data.client.countryShort);
		testClient.expectClientZipCodeToBe(data.client.zipCode);
	})

	after(() => {
		const testClient = new ClientManagement();
		testClient.visit();
		testClient.deleteClient(data.client.name)
		testClient.expectClientDeleted(data.client.name);
	});
});