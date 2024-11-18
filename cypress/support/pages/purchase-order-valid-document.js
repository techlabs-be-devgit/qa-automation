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
        selectPurchaseOrderButton: () => PurchaseOrder.action.getElementContaining('button', 'Create Purchase Order'),
        // poNameInput: () => PurchaseOrder.action.getElementWithXpath('//label[contains(., "PO Name")]/following-sibling::div[1]/input'),
        // poOrderInput: () => PurchaseOrder.action.getElementWithXpath('//label[contains(., "Purchase Order")]/following-sibling::div[1]/input'),
        // poAmountInput: () => PurchaseOrder.action.getElementWithXpath('//label[.//div[contains(text(), "PO Amount")]]/following-sibling::div[1]//input'),
        // poStartDateInput: () => PurchaseOrder.action.getElementWithAttribute('placeholder', 'yyyy-mm-dd'),
        // poEndDateInput: () => PurchaseOrder.action.getElementWithAttribute('placeholder', 'yyyy-mm-dd', 1),
        // selectPurchaseOrderButton: () => PurchaseOrder.action.getElementContaining('button', 'Create Purchase Order'),
        // addPurchaseOrderButton2: () => PurchaseOrder.action.getElementContaining('button', 'Add Purchase Order'),


     
        }

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

        clickOnCreatePurchaseOrderButton() {
            this.elements.selectPurchaseOrderButton().clickElement();
        }
        
    

    }   