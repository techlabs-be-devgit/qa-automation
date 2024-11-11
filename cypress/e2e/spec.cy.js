import { Action } from "../support/actions/action";
import { ClientManagement } from "../support/pages/client_management";
import { Estimation } from "../support/pages/estimation";
import { Milestone } from "../support/pages/milestone";
import { Pricing } from "../support/pages/pricing";

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

describe("Milestone Module", () => {

	it("should display milestone header", () => {
		const milestone = new Milestone();
        milestone.visit('Client 2');
		Milestone.action.urlShouldContain('/milestone');
        milestone.expectMilestonesHeaderVisible();
	});

	it('should display the Add Milestone button ', () => {
		const milestone = new Milestone();
		milestone.expectAddMilestoneButtonVisible();

	});
    

	it('should display the Add Milestone Header ', () => {
		const milestone = new Milestone();
		milestone.expectAddmilestoneHeaderVisible

	});
	

	it("should display contracts list when contract name dropdown is clicked, containing contract2", () => {
        const milestone = new Milestone();

        // Click on the contract name dropdown
        milestone.openContractNameDropdown();

        // Assert that the specific contract "contract2" is visible in the dropdown
        milestone.expectContractOptionVisible('contract2');
    });

	it("should display message if a milestone already exists for the contract", () => {
        const milestone = new Milestone();

        // Assert that the "milestone exists" message is visible
        milestone.expectMilestoneExistsMessageVisible();
    });

	it("should only accept alphabets and numbers in the Milestone name field", () => {
        const milestone = new Milestone();

        // Assert that the Milestone name field only accepts alphanumeric input
        milestone.expectMilestoneNameFieldAcceptsOnlyAlphanumeric();
    });

	it("should have the Manual button enabled by default", () => {
        const milestone = new Milestone();

        // Assert that the Manual button is enabled by default
        milestone.expectManualButtonEnabled();
    });

	it("should display an error message when a negative amount is entered in the Milestone amount field", () => {
        const milestone = new Milestone();

        // Assert that an error message is displayed for a negative amount input
        milestone.expectMilestoneAmountErrorForNegativeInput();
    });

	it("should display contract start and end dates when a contract is selected", () => {
        const milestone = new Milestone();
        
        
        // Optionally, you can also assert the actual values of the dates
        milestone.expectContractStartDateVisible();
		milestone.expectContractEndDateVisible();
       // milestone.elements.contractEndDate().should('have.text', 'End Date : Fri Nov 29 2024');
    });

	it("should display total and remaining contract amounts when a contract is selected", () => {
        const milestone = new Milestone();
    
		
        milestone.elements.totalContractAmount().should('have.text', 'Total Contract Amount: 19219.2');
        milestone.elements.remainingContractAmount().should('have.text', 'Remaining Contract Amount: 19219.20');
    });

    it("should display an error message when the entered amount exceeds the remaining contract amount", () => {
        const milestone = new Milestone();
        
        
        // enter an amount that exceeds the remaining contract amount
        // For example, assume the total contract amount is 19219.2
        const enteredAmount = 20000; // Amount exceeding the remaining contract amount
        enterMilestoneAmountAndVerifyError(data.milestone.enteredAmount);
        milestone.elements.errorMessage().should('have.text', 'The entered amount cannot exceed the remaining contract amount.');
    });
     

	it("should display an error message when the entered date does not follow the correct format", () => {
        const milestone = new Milestone();
        
        
        //  enter an incorrect date format
        // For example, entering "12/12/2024" instead of "2024-12-12"
        const enteredIncorrectDate = '12/12/2024';
        milestone.elements.milestoneDateInput().clear().type(enteredIncorrectDate);

        // Verify if the date entered matches the correct format (yyyy-mm-dd)
        milestone.expectMilestoneDateFormatCorrect();
        
        // Optionally, you could check for an error message if your application shows one when the format is incorrect
    });


	
});


// it("Adds a new client", () => {
//   const client = new ClientManagement();
//     client.visit();
//     client.openAddClientPopup();
//     client.fillClientName(data.client.name);
//     client.fillClientAddress(data.client.address);
//     client.selectClientCountry(data.client.country);
//     client.selectClientState(data.client.state);
//     client.selectClientCity(data.client.city);
//     client.fillClientZipCode(data.client.zipCode);
//     client.clickNextButton();
//     client.fillContractName(data.orgLevelContract.name);
//     client.selectContractType(data.orgLevelContract.type);
//     client.fillContractStartDate(data.orgLevelContract.startDate);
//     client.clickNextButton();
//     client.clickCreateClientButton();
//     action.waitFor(6000);
//     client.expectClientAdded(data.client.name);

// });

// it(("Creates a new Estimation"), () => {

//   const estimation = new Estimation();
//   estimation.visit(data.client.name);
//   estimation.clickAddEstimationButton();
//   estimation.fillEstimationName(data.estimation.name);
//   estimation.selectBillingType(data.estimation.billing);
//   estimation.checkClientName(data.client.name);
//   estimation.selectResourceRole(data.resourceRoles.uxEng);
//   estimation.selectResourceSkill(data.estimation.skill);
//   estimation.selectResourceRegion(data.estimation.region);
//   estimation.fillContractStartDate(data.estimation.startDate);
//   estimation.fillContractEndDate(data.estimation.endDate);
//   estimation.selectFullTime();
//   estimation.clickAddResource();
//   estimation.clickCreateEstimation();
// })

// it(("Opens the pricings for a client"), () => {
//   const pricing = new Pricing();
//   pricing.visit(data.client.name);
// })

it(("Opens the milestones for a client"), () => {
	const milestone = new Milestone();
	milestone.visit("Client 2");
	milestone.clickAddMilestoneButton();
	milestone.selectContractName(data.milestone.contractName);
	// milestone.contractStartDate(data.milestone.startDate);
	// milestone.contractEndDate(data.milestone.endDate
	milestone.fillMilestoneName(data.milestone.name);
	//  milestone.switchToAutoFill();
	milestone.clickOnManualTab();
	action.waitFor(5000);
	milestone.fillMilestoneAmount(data.milestone.amount);
	milestone.fillMilestoneDate(data.milestone.milestoneDate);
	milestone.fillMilestoneDeliverables(data.milestone.deliverables);
	milestone.clickOnAddMilestoneButton();
	milestone.switchToAutoFill();
	milestone.fillMilestoneAmountTwo(data.milestone.amountTwo);
	milestone.fillMilestoneDeliverablesTwo(data.milestone.deliverablesTwo);
	milestone.clickOnEveryWeek();
	milestone.clickOnSplitAmount();
	milestone.clickOnCreateMilestoneButton();
	milestone.deleteMilestone(data.milestone.name);

})








// after(() => {
//   const client = new ClientManagement();
//   client.visit();
//   client.deleteClient(data.client.name)
//   client.expectClientDeleted(data.client.name);
// });



