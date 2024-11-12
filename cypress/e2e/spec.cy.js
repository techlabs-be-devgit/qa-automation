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
	const milestone = new Milestone();
	it("should display milestone header", () => {
		milestone.visit('Client 2');
		Milestone.action.urlShouldContain('/milestone');
	});

	it('should display the Add Milestone button ', () => {
			milestone.expectAddMilestoneButtonVisible();
	});

	it('should display the Add Milestone Header ', () => {
		milestone.expectAddmilestoneHeaderVisible
	});
	it(("Visits the Milestone page"), () => {
		milestone.visit("Client 2");
		milestone.clickAddMilestoneButton();
	});

	it(("select contract2 from dropdown"), () => {
		
		milestone.selectContractName(data.milestone.contractName);
		milestone.expectContractNameVisible("contract2");
    });

	it(("fill milestone name"), () => {
		milestone.fillMilestoneName(data.milestone.name);

    });

	it(("check start date "), () => {
		milestone.expectContractStartDateToBe(data.milestone.contractStartDate);
	});

    it(("check total contract amount "), () => {
		milestone.fillMilestoneAmount(data.milestone.amount);
		milestone.expectTotalContractAmountToBe(data.milestone.totalContractAmount);
	});

    it(("check  end dates"), () => {
		milestone.expectContractEndDateToBe(data.milestone.contractEndDate);
	});

    it(("click on manual tab and fills milestone amount"), () => {
		milestone.clickOnManualTab();
		Milestone.action.waitFor(5000);
		milestone.fillMilestoneAmount(data.milestone.amount);
		milestone.expectMilestoneAmountErrorMessageVisible(data.milestone.errorMessage);
	});

    it(("fill milestoneDate and deliverables"), () => {
		milestone.fillMilestoneDate(data.milestone.milestoneDate);
		milestone.fillMilestoneDeliverables(data.milestone.deliverables);
	});

	it(("click on Add button and switch to auto fill"), () => {
		milestone.clickOnAddMilestoneButton();
		milestone.switchToAutoFill();
		milestone.fillMilestoneAmountTwo(data.milestone.amountTwo);
		milestone.clickOnEveryWeek();
		milestone.clickOnSplitAmount();
		milestone.expectSplitRows(5);
		milestone.clickOnCreateMilestoneButton();
	})

	it(("verify milestone details page"), () => {
		milestone.openMilestoneDetails();
		milestone.expectMilestoneNameToBe(data.milestone.name);
		milestone.expectContractNameToBe(data.milestone.contractName);
		milestone.expectMilestoneAmountToBe(data.milestone.amountTwo);
		milestone.expectMilestoneRows(5);
	})
});