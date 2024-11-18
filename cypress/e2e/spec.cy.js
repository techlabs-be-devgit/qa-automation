import { Action } from "../support/actions/action";
import { ClientManagement } from "../support/pages/client_management";
import { Estimation } from "../support/pages/estimation";
import { Pricing } from "../support/pages/pricing";
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


describe("Client Management Module", () => {
	const testClient = new ClientManagement();
	
	it("Visits the client management page", () => {
		testClient.visit();
		testClient.action.urlShouldContain('/dashboard');
		testClient.expectClientManagementHeaderVisible();
	});
	
	it("Opens the add client popup", () => {
		testClient.openAddClientPopup();
		testClient.expectAddClientHeaderVisible();
	});

	it("Inputs client details", () => {
		testClient.fillClientName(data.client.name);
		testClient.fillClientAddress(data.client.address + " ");
		testClient.expectLeadingTrailingSpacesWarning();
		testClient.clearClientAddressField();
		testClient.fillClientAddress("qwerty");
		testClient.expectRandomCharactersInAddressFieldWarning();
		testClient.clearClientAddressField();
		testClient.fillClientAddress(data.client.address);
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
		testClient.fillContractName(data.orgLevelContract.name);
		testClient.selectContractType(data.orgLevelContract.type);
		testClient.fillContractStartDate(data.orgLevelContract.startDate);
		testClient.clickNextButton();
	});

	it("Creates new client", () => {
		testClient.clickCreateClientButton();
		testClient.expectClientAdded(data.client.name);
	});

	it("Verifies client details", () => {
		testClient.openClientDetails(data.client.name);
        testClient.expectClientNameToBe(data.client.name);
		testClient.expectClientAddressToBe(data.client.address);
		testClient.expectClientCityToBe(data.client.city);
		testClient.expectClientStateToBe(data.client.state);
		testClient.expectClientCountryToBe(data.client.countryShort);
		testClient.expectClientZipCodeToBe(data.client.zipCode);
	});

	it.skip("Deletes the test client", () => {
		testClient.visit(data.client.name);
		testClient.deleteClient(data.client.name);
		testClient.expectClientDeleted(data.client.name);
	});
});


describe("Estimation Module", () => {
	const testEstimation = new Estimation();
	it(("Goes to client estimations"), () => {
		testEstimation.visit(data.client.name);
		testEstimation.expectEstimationsHeaderVisible();
		testEstimation.action.urlShouldContain('/client/estimation');
	});

	it(("Opens the add estimation popup"), () => {
        testEstimation.openAddEstimationPopup();
        testEstimation.expectEfforEstimationHeaderVisible();
	});

	it("Fills out estimation data", () => {
        testEstimation.fillEstimationName(data.estimation.name);
        testEstimation.selectBillingType(data.billing.enterprise);
		testEstimation.expectPopulatedClientNameToBe(data.client.name);
		testEstimation.selectResourceRole(data.resourceRole.uxEng);
		testEstimation.selectResourceSkill(data.estimation.skill);
		testEstimation.selectResourceRegion(data.region.ind);
		testEstimation.fillResourceStartDate(data.estimation.startDate);
		testEstimation.fillResourceEndDate(data.estimation.endDate);
		testEstimation.expectEstimatedHoursToBe(data.estimation.totalWorkingDays * 8);
		testEstimation.selectFullTime();
	});

	it("Invalid monthly split - not enough minumum hours per month", () => {
		testEstimation.openEstimationCalendar();
		testEstimation.switchToMonthlyTab();
		testEstimation.expectMonthlyTabActive();
		let totalHours = data.estimation.totalWorkingDays * 8;
		let minHours = 0;
		let maxHours = 175;
		testEstimation.fillSplitHours(totalHours);
		testEstimation.fillMinHours(minHours);
		testEstimation.fillMaxHours(maxHours);
		testEstimation.selectAllOption();
		testEstimation.splitHours();
		testEstimation.expectInvalidSplitWarning();
		testEstimation.closeEstimationCalendar();
	});

	it("Invalid monthly split - minimum hours per month too high", () => {
		testEstimation.openEstimationCalendar();
		testEstimation.switchToMonthlyTab();
		testEstimation.expectMonthlyTabActive();
		let totalHours = data.estimation.totalWorkingDays * 8;
		let minHours = 176;
		let maxHours = 250;
		testEstimation.fillSplitHours(totalHours);
		testEstimation.fillMinHours(minHours);
		testEstimation.fillMaxHours(maxHours);
		testEstimation.selectAllOption();
		testEstimation.splitHours();
		testEstimation.expectInvalidSplitWarning();
		testEstimation.closeEstimationCalendar();
	});

	it("Invalid monthly split - maximum hours per month too low", () => {
		testEstimation.openEstimationCalendar();
		testEstimation.switchToMonthlyTab();
		testEstimation.expectMonthlyTabActive();
		let totalHours = data.estimation.totalWorkingDays * 8;
		let minHours = 175;
		let maxHours = 176;
		testEstimation.fillSplitHours(totalHours);
		testEstimation.fillMinHours(minHours);
		testEstimation.fillMaxHours(maxHours);
		testEstimation.selectAllOption();
		testEstimation.splitHours();
		testEstimation.expectInvalidSplitWarning();
		testEstimation.closeEstimationCalendar();
	});

	it("Valid monthly split", () => {
		testEstimation.openEstimationCalendar();
		testEstimation.switchToMonthlyTab();
		testEstimation.expectMonthlyTabActive();
		let totalHours = 900;
		let minHours = 0;
		let maxHours = 184;
		testEstimation.fillSplitHours(totalHours);
		testEstimation.fillMinHours(minHours);
		testEstimation.fillMaxHours(maxHours);
		testEstimation.selectAllOption();
		testEstimation.splitHours();
		testEstimation.validateSplit(totalHours, minHours, maxHours);
		testEstimation.closeEstimationCalendar();
	});

	it("Adds the new estimation.", () => {
		testEstimation.clickAddResourceButton();
		testEstimation.clickCreateEstimationButton();
		testEstimation.expectEstimationCreated(data.estimation.name);
	});
});

describe("Pricing Module", () => {
	const testPricing = new Pricing();
	let totalCostToCompany;
	let totalBillAmount;
	let grossMarginPercent;
	let finalOfferPrice;
	let finalOfferGrossMargin;
	let finalOfferGrossMarginPercent;

	it("Goes to client pricing", () => {
		testPricing.visit(data.client.name);
        testPricing.expectPricingHeaderVisible();
		testPricing.action.urlShouldContain('/estimation/pricing');
	});

	it("Opens the add pricing popup", () => {
		testPricing.openAddPricingPopup();
        testPricing.expectAddPricingHeaderVisible();
	});

	it("Enters pricing name", () => {
		testPricing.fillPricingName(data.pricing.name);
	});
	
	it("Selects estimation name", () => {
		testPricing.selectEstimationName(data.estimation.name);
		testPricing.fillDiscount(data.pricing.discount);
	});

	it("Creates new pricing", () => {
		testPricing.clickCreatePricingButton();
		testPricing.expectPricingAdded(data.pricing.name);
	});

	it("Opens pricing details", () => {
		testPricing.openPricingDetails(data.pricing.name);
        testPricing.expectPricingOverviewHeaderVisible(data.pricing.name);
	});

	it.skip("Verifies pricing details", () => {
		testPricing.expectPricingNameToBe(data.pricing.name);
        testPricing.expectEstimationNameToBe(data.estimation.name);
		testPricing.expectTotalCostToCompanyToBe(totalCostToCompany);
		testPricing.expectTotalBillAmountToBe(totalBillAmount);
		testPricing.expectDiscountToBe(data.pricing.discount);
		testPricing.expectFinalOfferPriceToBe(finalOfferPrice);
		testPricing.expectFinalOfferGrossMarginToBe(finalOfferGrossMargin);
		testPricing.expectFinalOfferGrossMarginPercentToBe(finalOfferGrossMarginPercent);
	});
});

describe("Contract Module", () => {
	const testContract = new Contract();
    it("Opens the contracts for a client", () => {
		testContract.visit(data.client.name);
        testContract.expectContractsHeaderVisible();
		testContract.action.urlShouldContain('/contracts');
    });

    it("Opens the add contract popup", () => {
        testContract.openAddContractPopup();
		testContract.expectAddContractHeaderVisible();
    });

    it("Selects estimation and pricing", () => {
		testContract.selectEstimationName(data.estimation.name);
		testContract.selectPricingName(data.pricing.name);
    });

    it("Fills out contract details", () => {
        testContract.fillContractName(data.contract.name);
		testContract.selectContractType(data.contractType.fixed);
		testContract.selectPaymentTerms(data.paymentTerm.net45);
    });

	it.skip("Verifies contract amount, start and end dates", () => {
		testContract.expectPopulatedContractAmountToBe('');
		testContract.expectPopulatedStartDateToBe(data.estimation.startDate);
		testContract.expectPopulatedEndDateToBe(data.estimation.endDate);
	});

	it("Uploads the SOW Contract file", () => {
		testContract.uploadContractFile('sowContractFile.pdf');
	});

	it("Confirms success SOW Contract file upload", () => {
		testContract.expectUploadConfirmationMessageVisible();
		testContract.expectUploadConfirmationMessageToHave(data.contract.parsedData.sowAmount);
		testContract.clickConfirmUploadButton();
	});

	it("Verifies the parsed details for SOW Contract file", () => {
		testContract.expectParsedSOWAmountToBe(data.contract.parsedData.sowAmount);
		testContract.expectParsedStartDateToBe(data.contract.parsedData.startDate);
		testContract.expectParsedEndDateToBe(data.contract.parsedData.endDate);
	});

    it("Creates new contract", () => {
        testContract.clickCreateContractButton();
		testContract.expectContractAdded(data.contract.name);
    });
});


describe("Test cleanup", () => {
	it("Deletes the test contract", () => {
		const testContract = new Contract();
        testContract.visit(data.client.name);
        testContract.deleteContract(data.contract.name);
        testContract.expectContractDeleted(data.contract.name);
	});

	it("Deletes the test pricing", () => {
		const testPricing = new Pricing();
        testPricing.visit(data.client.name);
        testPricing.deletePricing(data.pricing.name)
        testPricing.expectPricingDeleted(data.pricing.name);
	});

	it("Deletes the test estimation", () => {
		const testEstimation = new Estimation();
        testEstimation.visit(data.client.name);
        testEstimation.deleteEstimation(data.estimation.name)
        testEstimation.expectEstimationDeleted(data.estimation.name);
	});

	it("Deletes the test client", () => {
		const testClient = new ClientManagement();
        testClient.visit();
        testClient.deleteClient(data.client.name)
        testClient.expectClientDeleted(data.client.name);
	});
});
