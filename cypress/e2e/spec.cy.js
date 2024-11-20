
import { Action } from "../support/actions/action";
import { ClientManagement } from "../support/pages/client_management";
import { Estimation } from "../support/pages/estimation";
import { Pricing } from "../support/pages/pricing";
import { Contract } from "../support/pages/contract";
import { Milestone } from "../support/pages/milestone";
import { PurchaseOrder } from "../support/pages/purchase-order";
import { Allocations } from "../support/pages/allocations";

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

describe("PurchaseOrder Module", () => {
	const purchaseOrder = new PurchaseOrder(); 
	it("visits purchase order page", () => {
		purchaseOrder.visit("Client 2");
	});

	it("opens purchase order popup", () => {
		purchaseOrder.clickAddPurchaseOrderButton();
	});

	it("check assert message is visible", () => {
		purchaseOrder.expectPoAlertMessage();

	});

	it("uploads invalid po document", () => {
		purchaseOrder.uploadPurchaseOrderFile('purchaseorder-document.pdf');
		purchaseOrder.action.waitFor(10000);
	});

	it("uploads Po document", () => {
		purchaseOrder.clickOnProceedButton();
		purchaseOrder.action.waitFor(10000);
	});

	it("it inputs PO name ", () => {
		purchaseOrder.fillPoName(data.purchaseOrder.name);
		purchaseOrder.action.waitFor(5000);

	});

	it("it inputs Po id", () => {
		purchaseOrder.fillPoOrder(data.purchaseOrder.orderID);
	});

	it("input po amount", () => {
		purchaseOrder.fillPoAmount(data.purchaseOrder.amount);
	});


	it("inputs po start date", () => {
		purchaseOrder.fillPoStartDate(data.purchaseOrder.startDate);
	});

	it("inputs po end date", () => {
		purchaseOrder.fillPoEndDate(data.purchaseOrder.endDate);
		purchaseOrder.clickOnCreatePurchaseOrderButton
	});

	it("creates Purchase order", () => {
		purchaseOrder.clickOnCreatePurchaseOrderButton();
	});

	it("Verifies purchase order details", () => {

		purchaseOrder.clickOnEditIcon();
		purchaseOrder.expectedContractNameToBe(data.purchaseOrder.contractName);
		purchaseOrder.expectedPoNameToBe(data.purchaseOrder.name);
		purchaseOrder.expectedpurchaseOrderToBe(data.purchaseOrder.orderID);
		purchaseOrder.expectedpoAmountToBe(data.purchaseOrder.amount);
		purchaseOrder.expectedOrderDateToBe(data.purchaseOrder.startDate);
		purchaseOrder.expectedPrintDateToBe(data.purchaseOrder.endDate);
		purchaseOrder.clickOnBackIcon();
		purchaseOrder.action.waitFor(5000);

	})

	it("Deletes the purchase order", () => {

		purchaseOrder.deletePurchaseOrder(data.purchaseOrder.name);
		
	});

	it("verify valid po document", () => {
		purchaseOrder.clickAddPurchaseOrderButton();

	});

	it("uploads valid po document", () => {
		purchaseOrder.uploadValidPurchaseOrderFile('valid-po-document.pdf');
		purchaseOrder.action.waitFor(5000);

	});
	it("it inputs PO name ", () => {
		purchaseOrder.fillPoName(data.purchaseOrder.name);
		purchaseOrder.clickOnCreatePurchaseOrderButton();

	});

	it("Verifies purchase order details", () => {

		purchaseOrder.clickOnEditIcon();
		purchaseOrder.expectedContractNameToBe(data.purchaseOrder.contractName);
		purchaseOrder.expectedPoNameToBe(data.purchaseOrder.name);
		purchaseOrder.expectedpurchaseOrderToBe(data.purchaseOrder.purchaseOrderNumber);
		purchaseOrder.expectedpoAmountToBe(data.purchaseOrder.validPoAmount);
		purchaseOrder.expectedOrderDateToBe(data.purchaseOrder.validPoOrderDate);
		purchaseOrder.expectedPrintDateToBe(data.purchaseOrder.validPoPrintDate);
		purchaseOrder.clickOnBackIcon();
		purchaseOrder.action.waitFor(5000);

	})

})

describe("allocations Module", () => {
	const allocations = new Allocations();

	it("visits allocations page", () => {
		allocations.visit("Client 2");

	});


	it("selects allocations button", () => {
		allocations.clickAddAllocationButton()
	});



	it("selects contract from dropdown", () => {
		allocations.selectAllocationContractOption()
	});

	it("it inputs allocation name", () => {
		allocations.fillAllocationName(data.allocation.allocationName);
	});

	it("it clicks on resource select ", () => {
		allocations.clickOnSelectResource();
	});

	it("it selects resource from dropdown", () => {
		allocations.selectResourceFromDropdown(data.allocation.ResourceName);
	});

	it("it creates allocations", () => {
		allocations.clickOnCreateAllocationButton();
	});

	it("click on edit icon", () => {
		allocations.clickOnEditIcon();
	});

	it("verify Allocation details", () => {

		allocations.expectedAllocationContractNameToBe(data.allocation.allocationContractName);
		allocations.expectedAllocationEstimationNameToBe(data.allocation.estimationName);
		allocations.expectedAllocationNameToBe(data.allocation.allocationName);
		allocations.expectedAllocationCountToBe(data.allocation.allocationCount);
		allocations.expectedAllocationStartDateToBe(data.allocation.startDate);
		allocations.expectedAllocationEndDateToBe(data.allocation.endDate);
		allocations.expectedTotalBillHrsToBe(data.allocation.totalBillableHours);
		allocations.clickOnBackIcon();
		allocations.action.waitFor(5000);

	});

	it("check error messasge", () => {
		allocations.clickAddAllocationButton();
		allocations.selectAllocationContractOption();
		allocations.expectedErrorMessageToBe();
		allocations.clickOnHyperLinkToView();
		allocations.clickOnBackIcon();
	})

	it("Deletes the Allocation", () => {

		allocations.deleteAllocation(data.allocation.allocationName);

	})

});