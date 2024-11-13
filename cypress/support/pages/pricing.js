import { Action } from "../actions/action";

class Pricing {
    static action = new Action();

    elements = {
        clientRecord: (clientName) => Pricing.action.getElementContaining('span', clientName),
        effortEstimationTab: () => Pricing.action.getElementMatching('div', 'Estimation'),
        pricingTab: () => Pricing.action.getElementMatching('div', 'Pricing'),
        pricingHeader: () => Pricing.action.getElementMatching('p', 'Pricing'),
        addPricingHeader: () => Pricing.action.getElementMatching('p', 'Add Pricing'),
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
        deleteConfirmButton: () => Pricing.action.getElementContaining('button', 'Delete'),
        addPricing: {
            prePopulatedField: (fieldLabel) => Pricing.action.getElementWithXpath(`//label[text()="${fieldLabel}"]/following-sibling::div/input`),
        },
        pricingDetails: {
            pricingName: () => Pricing.action.getElementContaining('p', 'Pricing Name').getNthSibling(),
            estimationName: () => Pricing.action.getElementContaining('p', 'Estimation Name').getNthSibling(),
            totalCostToCompany: () => Pricing.action.getElementContaining('p', 'Total Cost to company').getNthSibling(),
            totalBillAmount: () => Pricing.action.getElementContaining('p', 'Total Bill Amount(Customer)').getNthSibling(),
            grossMargin: () => Pricing.action.getElementContaining('p', 'Gross Margin').getNthSibling(),
            discount: () => Pricing.action.getElementContaining('p', 'Discount %').getNthSibling(),
            finalOfferPrice: () => Pricing.action.getElementContaining('p', 'Final Offer Price').getNthSibling(),
            finalOfferGrossMargin: () => Pricing.action.getElementContaining('p', 'Final Offer Gross Margin').getNthSibling(),
            finalOfferGrossMarginPercent : () => Pricing.action.getElementContaining('p', 'Final Offer Gross Margin(%)').getNthSibling(),
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

    openAddPricingPopup() {
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

    async getTotalCostToCompany() {
        return this.elements
                    .addPricing.prePopulatedField('Total Cost to Company')
                    .getAttributeValue('value');
        // return value;
    }

    async getTotalBillAmount() {
        const value = await this.elements
                                .addPricing.prePopulatedField('Total Bill Amount(Customer)')
                                .getAttributeValue('value');
        return value;
    }

    async getGrossMargin() {
        const value = await this.elements
                                .addPricing.prePopulatedField('Gross Margin')
                                .getAttributeValue('value');
        return value;
    }

    async getFinalOfferPrice() {
        const value = await this.elements
                                .addPricing.prePopulatedField('Final Offer Price')
                                .getAttributeValue('value');
        return value;

    }

    async getFinalOfferGrossMargin() {
        const value = await this.elements
                                .addPricing.prePopulatedField('Final Offer Gross Margin')
                                .getAttributeValue('value');
        return value;
    }

    async getFinalOfferGrossMarginPercent() {
        const value =  this.elements
                            .addPricing.prePopulatedField('Final Offer Gross Margin %')
                            .getAttributeValue('value');
        return value;
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
        this
            .elements
            .deleteConfirmButton('button', 'Delete')
            .clickElement()
    }

    openPricingDetails(pricingName) {
        this
            .elements
            .pricingRecord(pricingName)
            .clickElement();
    }

    expectPricingHeaderVisible() {
        this
            .elements
            .pricingHeader()
            .shouldBeVisible();
    }

    expectAddPricingHeaderVisible() {
        this
            .elements
            .addPricingHeader()
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

    expectTotalCostToCompanyToBe(totalCostToCompany) {
        this
            .elements
            .pricingDetails.totalCostToCompany()
            .shouldContain(totalCostToCompany);
    }

    expectTotalBillAmountToBe(totalBillAmount) {
        this
            .elements
            .pricingDetails.totalBillAmount()
            .shouldContain(totalBillAmount);
    }

    expectGrossMarginToBe(grossMargin) {
        this
            .elements
            .pricingDetails.grossMargin()
            .shouldContain(grossMargin);
    }

    expectDiscountToBe(discount) {
        this
            .elements
            .pricingDetails.discount()
            .shouldContain(discount);
    }

    expectFinalOfferPriceToBe(finalOfferPrice) {
        this
            .elements
            .pricingDetails.finalOfferPrice()
            .shouldContain(finalOfferPrice);
    }

    expectFinalOfferGrossMarginToBe(finalOfferGrossMargin) {
        this
            .elements
            .pricingDetails.finalOfferGrossMargin()
            .shouldContain(finalOfferGrossMargin);
    }

    expectFinalOfferGrossMarginPercentToBe(finalOfferGrossMarginPercent) {
        this
            .elements
            .pricingDetails.finalOfferGrossMarginPercent()
            .shouldContain(finalOfferGrossMarginPercent);
    }
}

export { Pricing };