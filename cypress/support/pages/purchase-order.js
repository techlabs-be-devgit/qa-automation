import { Action } from "../actions/action";

class PurchaseOrder {
    static action = new Action();

    elements = {
        clientRecord: (clientName) => PurchaseOrder.action.getElementContaining('span', clientName),
        sowContractTab: () => PurchaseOrder.action.getElementContaining('div', 'SOWContract'),
        purchaseOrderTab: () => PurchaseOrder.action.getElementContaining('div', 'Purchase Orders'),
        addPurchaseOrderButton: () => PurchaseOrder.action.getElementContaining('button', 'Add Purchase Order'),
        checkPoAlertMessage: () => PurchaseOrder.action.getElementContaining('h6', 'Please begin by uploading your Purchase Order (PO).'),
        uploadField: () => PurchaseOrder.action.getElementWithAttribute('type', 'file', 'input'),
        selectProceedButton: () => PurchaseOrder.action.getElementContaining('button', 'Proceed'),
        poNameInput: () => PurchaseOrder.action.getElementWithXpath('//label[contains(., "PO Name")]/following-sibling::div[1]/input'),
        poOrderInput: () => PurchaseOrder.action.getElementWithXpath('//label[contains(., "Purchase Order")]/following-sibling::div[1]/input'),
        poAmountInput: () => PurchaseOrder.action.getElementWithXpath('//label[.//div[contains(text(), "PO Amount")]]/following-sibling::div[1]//input'),
        poStartDateInput: () => PurchaseOrder.action.getElementWithAttribute('placeholder', 'yyyy-mm-dd'),
        poEndDateInput: () => PurchaseOrder.action.getElementWithAttribute('placeholder', 'yyyy-mm-dd', 1),
        selectPurchaseOrderButton: () => PurchaseOrder.action.getElementContaining('button', 'Create Purchase Order'),
        addPurchaseOrderButton2: () => PurchaseOrder.action.getElementContaining('button', 'Add Purchase Order'),

       // Assign purchase order code
        selectAssignPurchaseOrderButton: () => PurchaseOrder.action.getElementContaining('button', 'Assign Purchase Order'),
        selectContractName: () => PurchaseOrder.action.getElementWithAttribute('role', 'combobox', 0),
        selectPoName: () => PurchaseOrder.action.getElementWithAttribute('role', 'combobox', 1),
        //assignAmount : () => PurchaseOrder.action.getElementWithAttribute('type','number'),
       // assignAmount: () => cy.get('input[type="number"][data-cy="assign-amount"]'),
       // assignAmount: () => PurchaseOrder.action.getElementWithAttribute('value','0'),
       //assignAmount: () => cy.get('[id="r74"]'), // Replace the selector with the actual one
       assignAmount : () => PurchaseOrder.action.getElementWithAttribute('type','number',4),

            
            

        purchaseOrderDetails: {
            editIcon: () => PurchaseOrder.action.getElementWithAttribute('data-testid', 'ArrowForwardIosIcon'),
            contractName: () => PurchaseOrder.action.getElementContaining('p', 'Contract Name').getNthSibling(),
            poName: () => PurchaseOrder.action.getElementContaining('p', 'PO Name').getNthSibling(),
            purchaseOrder: () => PurchaseOrder.action.getElementContaining('p', 'Purchase Order').getNthSibling(),
            poAmount: () => PurchaseOrder.action.getElementContaining('p', 'PO Amount').getNthSibling(),
            orderDate: () => PurchaseOrder.action.getElementContaining('p', 'Order Date').getNthSibling(),
            printDate: () => PurchaseOrder.action.getElementContaining('p', 'Print Date').getNthSibling(),
            backIcon: () => PurchaseOrder.action.getElementWithAttribute('alt', 'BackIcon'),
        },

       
    };

    visit(clientName) {
        PurchaseOrder.action.visitPage('/dashboard');
        this.elements.clientRecord(clientName).clickElement();
        this.elements.sowContractTab().clickElement();
        this.elements.purchaseOrderTab().clickElement();
    }

    clickAddPurchaseOrderButton() {
        this.elements.addPurchaseOrderButton().clickElement();
    }

    expectPoAlertMessage() {
        this.elements.checkPoAlertMessage().shouldBeVisible();
    }

    uploadPurchaseOrderFile(filePath) {
        this.elements.uploadField().uploadFile(filePath);
    }

    clickOnProceedButton() {
        this.elements.selectProceedButton().clickElement();
    }

    fillPoName(purchaseOrderName) {
        this.elements.poNameInput().typeText(purchaseOrderName, { force: true });
    }

    fillPoOrder(purchaseOrderNumber) {
        this.elements.poOrderInput().typeText(purchaseOrderNumber, { force: true });
    }

    fillPoAmount(poAmount) {
        this.elements.poAmountInput().typeText(poAmount, { force: true });
    }

    fillPoStartDate(date) {
        this.elements.poStartDateInput().typeText(date);
    }

    fillPoEndDate(date1) {
        this.elements.poEndDateInput().typeText(date1);
    }

    clickOnCreatePurchaseOrderButton() {
        this.elements.selectPurchaseOrderButton().clickElement();
    }

    clickOnEditIcon() {
        this.elements.purchaseOrderDetails.editIcon().clickElement();
    }

    expectedContractNameToBe(poCntractName) {
        this.elements.purchaseOrderDetails.contractName().shouldContain(poCntractName);
    }

    expectedPoNameToBe(purchaseOrderName) {
        this.elements.purchaseOrderDetails.poName().shouldContain(purchaseOrderName);
    }

    expectedpurchaseOrderToBe(POorder) {
        this.elements.purchaseOrderDetails.purchaseOrder().shouldContain(POorder);
    }

    expectedpoAmountToBe(POAmount) {
        this.elements.purchaseOrderDetails.poAmount().shouldContain(POAmount);
    }

    expectedOrderDateToBe(poOrderDate) {
        this.elements.purchaseOrderDetails.orderDate().shouldContain(poOrderDate);
    }

    expectedPrintDateToBe(PoPrintDate) {
        this.elements.purchaseOrderDetails.printDate().shouldContain(PoPrintDate);
    }

    clickOnBackIcon() {
        this.elements.purchaseOrderDetails.backIcon().clickElement();
    }

    //creating PO /asserting po details from valid document
    clickAddPurchaseOrderButton2() {
        this.elements.addPurchaseOrderButton2().clickElement();
    }
 


   // assign purchase order methods
    clickOnAssignPurchaseOrderButton() {
        this.elements.selectAssignPurchaseOrderButton().clickElement();
    }

    selectContractNameFromDropDown(contractName) {
        this.elements.selectContractName().clickElement({ force: true });
        cy.wait(500);
        cy.contains(contractName).click({ force: true });
    }

        selectPoNameFromDropDown(purchaseName) {
            this.elements.selectPoName().clickElement({ force: true });
            cy.wait(500);
            cy.get('li') 
                .contains(purchaseName)
                .should('be.visible')
                .click({ force: true });
        }

        // fillAssignAmount(totalContractAmount) {
        //     const amount = totalContractAmount.toString();

        //     this.elements.assignAmount()
        //      .should('exist')
        //      .should('be.visible')
        //      .clear({ force: true })
        //      .type(amount, { force: true, delay: 50 })
        //      .blur()
        //      .should('have.value', amount);
        //     }  
    fillAssignAmount(totalContractAmount) {
     const amount = totalContractAmount.toString();
    this.elements.assignAmount()
    //.should('exist')
    //.should('be.visible')
    // .clear({ force: true })
    // .type(amount, { force: true, delay: 50 });
    }

}
 


export { PurchaseOrder };
