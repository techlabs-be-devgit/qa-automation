import { Action } from '../actions/action';

class Contract {
    static action = new Action();
    static existingContractWarning = "This estimation and pricing combination has already "+
                                    "been assigned to a contract. You cannot create a new contract "+
                                    "using the same configuration.";

    elements = {
        clientRecord: (clientName) => Contract.action.getElementContaining('span', clientName),
        sowContractNavigation: () => Contract.action.getElementContaining('div', 'SOWContract'),
        contractsNavigation: () => Contract.action.getElementContaining('div', 'Contracts'),
        contractsHeader: () => Contract.action.getElementContaining('p', 'Contracts'),
        addContractButton: () => Contract.action.getElementContaining('button', 'Add Contract'),
        addContractHeader: () => Contract.action.getElementContaining('h4', 'Add Contract'),
        estimationNameSelect: () => Contract.action.getElementWithAttribute('role', 'combobox', 0),
        pricingNameSelect: () => Contract.action.getElementWithAttribute('role', 'combobox', 1),
        contractTypeSelect: () => Contract.action.getElementWithAttribute('role', 'combobox', 2),
        paymentTermsSelect: () => Contract.action.getElementWithAttribute('role', 'combobox', 3),
        contractNameInput: () => Contract.action.getElementWithXpath('//div[contains(text(), "Contract Name")]/parent::*/parent::*'),
        contractRecord: (contractName) => Contract.action.getElementContaining('span', contractName),
        contractEditButton: () => Contract.action.getElementContaining('button', 'Edit'),
        existingContractWarning: () => Contract.action.getElementContaining('p', Contract.existingContractWarning),
        autoPopulatedField: (fieldLabel) => Contract
                                            .action
                                            .getElementWithXpath(`//label[contains(text(), "${fieldLabel}")]/following-sibling::div/input`),
        contractDeleteButton : (contractName) => Contract
                                        .action
                                        .getElementWithXpath(`//span[text()="${contractName}"]/ancestor::td/ancestor::tr//td//span//button`),
        confirmDeleteButton: () => Contract.action.getElementContaining('button', 'Delete'),
        contractDetails: {
            contractName: () => Contract.action.getElementContaining('p', 'Contract Name').getNthSibling(),
            estimationName: () => Contract.action.getElementContaining('p', 'Estimation Name').getNthSibling(),
            pricingName: () => Contract.action.getElementContaining('p', 'Pricing Name').getNthSibling(),
            contractType: () => Contract.action.getElementContaining('p', 'Contract Type').getNthSibling(),
            paymentTerms: () => Contract.action.getElementContaining('p', 'Payment Terms Contract').getNthSibling(),
            startDate: () => Contract.action.getElementContaining('p', 'Start Date').getNthSibling(),
            endDate: () => Contract.action.getElementContaining('p', 'End Date').getNthSibling(),
        },
        contractUploadSection: {
            uploadField: () => Contract.action.getElementWithAttribute('type', 'file', 'input'),
            sowAmountField: () => Contract.action.getElementContaining('p', 'SOW Amount'),
            startDateField: () => Contract.action.getElementContaining('p', 'Start Date'),
            endDateField: () => Contract.action.getElementContaining('p', 'End Date'),
            uploadConfirmationMessage: () => Contract.action.getElementContaining('div', 'Total contract amount'),
            uploadConfirmButton: () => Contract.action.getElementContaining('button', 'Confirm'),
        },
        createContractButton: () => Contract.action.getElementContaining('button', 'Create Contract'),
    }

    visit(clientName) {
        Contract.action.visitPage('/dashboard')
        this
           .elements
           .clientRecord(clientName)
           .clickElement();
        this
           .elements
           .sowContractNavigation()
           .clickElement();
        this
           .elements
           .contractsNavigation()
           .clickElement();
    }

    openAddContractPopup() {
        this
           .elements
           .addContractButton()
           .clickElement();
    }

    fillContractName(contractName) {
        this
            .elements
            .contractNameInput()
            .clickElement()
            .typeText(contractName);
    }

    selectEstimationName(estimationName) {
        this
           .elements
           .estimationNameSelect()
           .selectFromDropdown(estimationName);
    }

    selectPricingName(pricingName) {
        this
           .elements
           .pricingNameSelect()
           .selectFromDropdown(pricingName);
    }

    selectContractType(contractType) {
        this
           .elements
           .contractTypeSelect()
           .selectFromDropdown(contractType);
    }

    selectPaymentTerms(paymentTerms) {
        this
           .elements
           .paymentTermsSelect()
           .selectFromDropdown(paymentTerms);
    }

    openContractDetails(contractName) {
        this
           .elements
           .contractRecord(contractName)
           .clickElement();
    }

    uploadContractFile(fileName) {
        this
           .elements
           .contractUploadSection.uploadField()
           .uploadFile(fileName);
    }

    deleteContract(contractName) {
        this
            .elements
            .contractDeleteButton(contractName)
            .clickElement();
        this
            .elements
            .confirmDeleteButton()
            .clickElement();
    }

    clickCreateContractButton() {
        this
           .elements
           .createContractButton()
           .clickElement();
    }

    clickConfirmUploadButton() {
        this
           .elements
           .contractUploadSection.uploadConfirmButton()
           .clickElement();
    }

    expectContractAdded(contractName) {
        this
            .elements
            .contractRecord(contractName)
            .shouldBeVisible();
    }

    expectContractDeleted(contractName) {
        this
            .elements
            .contractRecord(contractName)
            .shouldNotExist();
    }

    expectContractsHeaderVisible() {
        this
           .elements
           .contractsHeader()
           .shouldBeVisible();
    }

    expectAddContractHeaderVisible() {
        this
           .elements
           .addContractHeader()
           .shouldBeVisible();
    }

    expectPopulatedContractAmountToBe(sowAmount) {
        this
           .elements
           .autoPopulatedField('Total Contract Amount')
    }

    expectPopulatedStartDateToBe(startDate) {
        this
           .elements
           .autoPopulatedField('Contract Start Date')
           .shouldContain(startDate);
    }

    expectPopulatedEndDateToBe(endDate) {
        this
           .elements
           .autoPopulatedField('Contract End Date')
           .shouldContain(endDate);
    }

    expectContractNameToBe(contractName) {
        this
           .elements
           .contractDetails.contractName()
           .shouldContain(contractName);
    }

    expectEstimationNameToBe(estimationName) {
        this
           .elements
           .contractDetails.estimationName()
           .shouldContain(estimationName);
    }

    expectPricingNameToBe(pricingName) {
        this
           .elements
           .contractDetails.pricingName()
           .shouldContain(pricingName);
    }

    expectContractTypeToBe(contractType) {
        this
           .elements
           .contractDetails.contractType()
           .shouldContain(contractType);
    }

    expectPaymentTermsToBe(paymentTerms) {
        this
           .elements
           .contractDetails.paymentTerms()
           .shouldContain(paymentTerms);
    }

    expectStartDateToBe(startDate) {
        this
           .elements
           .contractDetails.startDate()
           .shouldContain(startDate);
    }

    expectEndDateToBe(endDate) {
        this
           .elements
           .contractDetails.endDate()
           .shouldContain(endDate);
    }

    expectExistingContractWarning() {
        this
            .elements
            .existingContractWarning()
            .shouldBeVisible();
    }

    expectParsedSOWAmountToBe(sowAmount) {
        this
            .elements
            .contractUploadSection.sowAmountField()
            .shouldContain(sowAmount);
    }

    expectParsedStartDateToBe(startDate) {
        this
            .elements
            .contractUploadSection.startDateField()
            .shouldContain(startDate);
    }

    expectParsedEndDateToBe(endDate) {
        this
            .elements
            .contractUploadSection.endDateField()
            .shouldContain(endDate);
    }

    expectUploadConfirmationMessageVisible() {
        this
            .elements
            .contractUploadSection.uploadConfirmationMessage()
            .shouldBeVisible();
    }

    expectUploadConfirmationMessageToHave(contractAmount){
        this
           .elements
           .contractUploadSection.uploadConfirmationMessage()
           .shouldContain(contractAmount);
    }
}

export { Contract };