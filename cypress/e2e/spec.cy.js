import { Action } from "../support/actions/action";
import { ClientManagement } from "../support/pages/client_management";
import { Estimation } from "../support/pages/estimation";
//import { Milestone } from "../support/pages/milestone";
import { Pricing } from "../support/pages/pricing";
import { PurchaseOrder } from "../support/pages/purchase-order";  // Corrected typo here
import {Allocations} from "../support/pages/allocations";  // Corrected typo here

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


// describe("PurchaseOrder Module", () => {
// 	const purchaseOrder = new PurchaseOrder();  // Corrected typo here
// 	it("visits purchase order page", () => {
// 		purchaseOrder.visit("Client 2");
// 	});

// 	it("opens purchase order popup", () => {
// 		purchaseOrder.clickAddPurchaseOrderButton();
// 	});

// 	it("check assert message is visible", () => {
// 		purchaseOrder.expectPoAlertMessage();

// 	});

// 	it("uploads invalid po document",() => {
// 		purchaseOrder.uploadPurchaseOrderFile('purchaseorder-document.pdf');
// 		PurchaseOrder.action.waitFor(10000);
// 	});

// 	it("uploads Po document",() => {
// 		purchaseOrder.clickOnProceedButton();
// 		PurchaseOrder.action.waitFor(10000);
// 	});

// 	it("it inputs PO name ",() => {
// 		purchaseOrder.fillPoName(data.purchaseOrder.name);
// 		PurchaseOrder.action.waitFor(5000);
		
// 	});

// 	it("it inputs Po id",() => {
//         purchaseOrder.fillPoOrder(data.purchaseOrder.orderID);
//     });

// 	it("input po amount",() => {
// 		purchaseOrder.fillPoAmount(data.purchaseOrder.amount);
// 	});

	
//      it("inputs po start date",() => {
// 		purchaseOrder.fillPoStartDate(data.purchaseOrder.startDate);
// 	 });

// 	 it("inputs po end date",() => {
// 		purchaseOrder.fillPoEndDate(data.purchaseOrder.endDate);
// 		purchaseOrder.clickOnCreatePurchaseOrderButton
// 	 });

// 	 it("creates Purchase order",() => {
// 		purchaseOrder.clickOnCreatePurchaseOrderButton();
// 	 });
	
// 	 it("Verifies purchase order details", () => {
		
// 		purchaseOrder.clickOnEditIcon();
//       purchaseOrder.expectedContractNameToBe(data.purchaseOrder.contractName);
// 		purchaseOrder.expectedPoNameToBe(data.purchaseOrder.name);
// 		purchaseOrder.expectedpurchaseOrderToBe(data.purchaseOrder.orderID);
// 		purchaseOrder.expectedpoAmountToBe(data.purchaseOrder.amount);
// 		purchaseOrder.expectedOrderDateToBe(data.purchaseOrder.startDate);
// 		purchaseOrder.expectedPrintDateToBe(data.purchaseOrder.endDate);
// 		purchaseOrder.clickOnBackIcon();
// 		PurchaseOrder.action.waitFor(5000);
		
// 	})


//       //assign purchase order test cases

// 	it("it assigns purchase order",() => {
// 		purchaseOrder.clickOnAssignPurchaseOrderButton();
// 		purchaseOrder.selectContractNameFromDropDown(data.purchaseOrder.assignContractName);
// 		purchaseOrder.selectPoNameFromDropDown(data.purchaseOrder.poName);
// 		purchaseOrder.fillAssignAmount(data.purchaseOrder.assignPoAmount);

// 	});


	// /assign purchase order test cases

//allocations

describe("allocations Module", () => {
	const allocations = new Allocations();  // Corrected typo here
	it("visits allocations page", () => {
		allocations.visit("Client 2");
	});

it("selects allocations button",() => {
			allocations.clickAddAllocationButton()
		});

		
		
		it("selects contract from dropdown",() => {
			allocations.selectAllocationContractOption()
		});

		it("it inputs allocation name",() => {
			allocations.fillAllocationName(data.allocation.allocationName);
		});

		it("it clicks on resource select ",() => {
			allocations.clickOnSelectResource();
		});

		it("it selects resource from dropdown",() => {
			allocations.selectResourceFromDropdown(data.allocation.ResourceName);
		});

		it("it creates allocations",() => {
			allocations.clickOnCreateAllocationButton();
		});

		it("click on edit icon",() => {
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

		});




			
			

			

			
			

			
			

			

			


			

			


	



});	

	

	
	 


