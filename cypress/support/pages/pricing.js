import { Action } from "../actions/action";

class Pricing {
    static action = new Action();

    elements = {
        clientRecord: (clientName) => Pricing.action.getElementContaining('span', clientName),
        effortEstimationTab: () => Pricing.action.getElementMatching('div', 'Estimation'),
        pricingTab: () => Pricing.action.getElementMatching('div', 'Pricing'),
        pricingHeader: () => Pricing.action.getElementMatching('p', 'Pricing'),
        pricingOverviewHeader: (pricingName) => Pricing.action.getElementMatching('p', pricingName + ' Overview'),
        addPricingButton: () => Pricing.action.getElementMatching('button', 'Add Pricing'),
        addPricingHeader: () => Pricing.action.getElementMatching('span', 'Add Pricing'),
        pricingNameInput: () => Pricing.action.getElementWithAttribute('name', 'pricingName'),
        estimationNameSelect: () => Pricing.action.getElementWithAttribute('role', 'combobox'),
        discountInput: () => Pricing.action.getElementWithAttribute('name', 'discount'),
        createPricingButton: () => Pricing.action.getElementMatching('button', 'Create Pricing'),
        pricingRecord: (pricingName) => Pricing
                                        .action
                                        .getElementContaining('span', pricingName),
        pricingDeleteButton: (pricingName) => Pricing
                                                .action
                                                .getElementWithXpath(`//span[text()="${pricingName}"]/ancestor::td/ancestor::tr//td//span//button`),
        deleteConfirmButton: () => ClientManagement.action.getElementContaining('button', 'Delete'),
        pricingDetails: {
            pricingName: () => Pricing.action.getElementContaining('p', 'Pricing Name').getNthSibling(),
            estimationName: () => Pricing.action.getElementContaining('p', 'Estimation Name').getNthSibling(),
        }
    }

    visit(clientName) {
        Pricing.action.visitPage('/dashboard')
        this
            .elements
            .clientRecord(clientName)
            .clickElement();
        this
            .elements
            .effortEstimationTab()
            .clickElement();
        this
            .elements
            .pricingTab()
            .clickElement();
    }

    clickAddPricingButton() {
        this
            .elements
            .addPricingButton()
            .clickElement();
    }

    fillPricingName(pricingName) {
        this
            .elements
            .pricingNameInput()
            .typeText(pricingName);
    }

    selectEstimationName(estimationName) {
        this
            .elements
            .estimationNameSelect()
            .selectFromDropdown(estimationName);
    }

    fillDiscount(discount) {
        this
            .elements
            .discountInput()
            .typeText(discount);
    }

    clickCreatePricingButton() {
        this
            .elements
            .createPricingButton()
            .clickElement();
    }

    deletePricing(pricingName) {
        this
            .elements
            .pricingDeleteButton(pricingName)
            .clickElement()
            .getElementMatching('button', 'Delete')
            .clickElement()
    }

    expectPricingHeaderVisible() {
        this
            .elements
            .pricingHeader()
            .shouldBeVisible();
    }

    expectPricingOverviewHeaderVisible(pricingName) {
        this
            .elements
            .pricingOverviewHeader(pricingName)
            .shouldBeVisible();
    }

    expectPricingAdded(pricingName) {
        this
            .elements
            .pricingRecord(pricingName)
            .shouldBeVisible();
    }

    expectPricingDeleted(pricingName) {
        this
            .elements
            .pricingRecord(pricingName)
            .shouldNotExist();
    }

    openPricingDetails(pricingName) {
        this
            .elements
            .pricingRecord(pricingName)
            .clickElement();
    }

    expectPricingNameToBe(pricingName) {
        this
            .elements
            .pricingDetails.pricingName()
            .shouldContain(pricingName);
    }

    expectEstimationNameToBe(estimationName) {
        this
            .elements
            .pricingDetails.estimationName()
            .shouldContain(estimationName);
    }
}

export { Pricing };