import { Action } from "../actions/action";

class Milestone {
    static action = new Action();

    elements = {
        clientRecord: (clientName) => Milestone.action.getElementContaining('span', clientName),
        sowContractTab: () => Milestone.action.getElementContaining('div', 'SOWContract'),
        milestoneTab: () => Milestone.action.getElementContaining('div', 'Milestones'),
        addMilestoneButton: () => Milestone.action.getElementContaining('button', 'Add Milestone'),
        addMilestoneHeader: () => Milestone.action.getElementContaining('h5', 'Add Milestone'),
        contractNameSelect: () => Milestone.action.getElementWithAttribute('role', 'combobox'),
        contractOption: (contractName) => Milestone.action.getElementContaining('li', contractName),
        totalContractAmount: () => Milestone.action.getElementContaining('p', 'Total Contract Amount:'),
        contractStartDate: () => Milestone.action.getElementContaining('p', 'Start Date :'),
        contractEndDate: () => Milestone.action.getElementContaining('p', 'End Date :'),
        addMilestoneName: () => Milestone.action.getElementWithAttribute('type', 'text', 0),
        selectManualTab: () => Milestone.action.getElementContaining('button', 'Manual'),
        milestoneAmountInput: () => Milestone.action.getElementWithAttribute('type', 'number'),
        errorMessage: () => Milestone.action.getElementContaining('p', 'The entered amount cannot exceed the remaining contract amount.'),
        milestoneDateInput: () => Milestone.action.getElementWithAttribute('placeholder', 'yyyy-mm-dd'),
        addMilestoneDeliverables: () => Milestone.action.getElementWithAttribute('type', 'text', 1),
        selectAddButton: () => Milestone.action.getElementContaining('button', 'ADD'),
        selectAutofillTab: () => Milestone.action.getElementContaining('button', 'Autofill'),
        milestoneAmountInputTwo: () => Milestone.action.getElementWithAttribute('type', 'number'),
        addMilestoneDeliverablesTwo: () => Milestone.action.getElementContaining('div', 'Milestone Deliverables'),//.find('input').eq(5),
        selectEveryWeek: () => Milestone.action.getElementContaining('span', 'Every Week'),
        selectSplitAmountButton: () => Milestone.action.getElementContaining('button', 'Split Amount'),
        getMilestoneRows: (itemName) => Milestone.action.getElementContaining('p', itemName),
        selectCreateMilestoneButton: () => Milestone.action.getElementContaining('button', 'Create Milestone'),
        // Assertions
        milestonesHeader: () => Milestone.action.getElementContaining('p', 'Milestones'),
        milestoneExistsMessage: () => Milestone.action.getElementContaining('p', 'For this contract the milestone is already exists.'),
        milestoneAmountError: () => Milestone.action.getElementContaining('p', 'Milestone amount must be non-negative'),
        milestoneDeleteButton: (milestoneName) => Milestone.action.getElementWithXpath(`//span[text()="${milestoneName}"]/ancestor::td/ancestor::tr//td//span//button`),
        deleteConfirmButton: () => Milestone.action.getElementContaining('button', 'Delete'),
        selectMilestoneRows: () => Milestone.action.getElementWithXpath("//p[text()='item1']"),
        selectEditIcon: () => Milestone.action.getElementWithAttribute('data-testid', 'ArrowForwardIosIcon'),
        
        milestoneDetails: {
        milestoneName: () => Milestone.action.getElementContaining('p', 'Milestone Name').getNthSibling(),
        contractName: () => Milestone.action.getElementContaining('p', 'Contract Name').getNthSibling(),
        milestoneAmount: () => Milestone.action.getElementContaining('p', 'Milestone Amount').getNthSibling(),
        verifyMilestoneRows: () => Milestone.action.getElementWithXpath("//p[text()='item1']"),

    }
}
visit(clientName) {
    Milestone.action.visitPage('/dashboard');
    this
        .elements
        .clientRecord(clientName)
        .clickElement();

    this
       .elements
       .sowContractTab()
       .clickElement();

    this
        .elements
        .milestoneTab()
        .clickElement();
}

    clickAddMilestoneButton() {
        this
            .elements
            .addMilestoneButton()
            .clickElement();
    }

    selectContractName(contractName) {
        this
            .elements
            .contractNameSelect()
            .selectFromDropdown(contractName);
    }

    fillMilestoneName(milestoneName) {
        this
            .elements
            .addMilestoneName()
            .typeText(milestoneName);
    }

    clickOnManualTab() {
        this
            .elements
            .selectManualTab()
            .clickElement();
    }

    fillMilestoneAmount(milestoneAmount) {
        this
            .elements
            .milestoneAmountInput()
            .typeText(milestoneAmount);
    }

    fillMilestoneDate(date) {
        this
            .elements
            .milestoneDateInput()
            .typeText(date);
    }

    fillMilestoneDeliverables(milestoneDeliverables) {
        this
            .elements
            .addMilestoneDeliverables()
            .typeText(milestoneDeliverables);
    }

    clickOnAddMilestoneButton() {
        this
            .elements
            .selectAddButton()
            .clickElement();
    }

    switchToAutoFill() {
        this
            .elements
            .selectAutofillTab()
            .clickElement();
    }

    fillMilestoneAmountTwo(milestoneAmountTwo) {
        this
            .elements
            .milestoneAmountInputTwo()
            .typeText(milestoneAmountTwo);
    }
    clickOnEveryWeek() {
        this
            .elements
            .selectEveryWeek()
            .clickElement();
    }

    clickOnSplitAmount() {
        this
            .elements
            .selectSplitAmountButton()
            .clickElement();
    }

    clickOnCreateMilestoneButton() {
        this
            .elements
            .selectCreateMilestoneButton()
            .clickElement();
    }
    // Assertions
    expectMilestonesHeaderVisible() {
        this
            .elements
            .milestonesHeader()
            .shouldBeVisible();
    }

    expectAddMilestoneButtonVisible() {
        this
            .elements
            .addMilestoneButton()
            .shouldBeVisible();
    }

    expectAddMilestoneHeaderVisible() {
        this
            .elements
            .addMilestoneHeader()
            .shouldBeVisible();
    }

    openContractNameDropdown() {
        this
            .elements
            .contractNameSelect()
            .clickElement();
    }

    expectContractNameVisible(contractName) {
        this
            .elements
            .contractOption(contractName)
            .shouldBeVisible();
    }

    expectTotalContractAmountToBe(contractAmount) {
        this
            .elements
            .totalContractAmount()
            .shouldContain(contractAmount);
    }

    expectContractStartDateToBe(startDate) {
        this
            .elements
            .contractStartDate()
            .shouldContain(startDate);
    }

    expectContractEndDateToBe(endDate) {
        this
            .elements
            .contractEndDate()
            .shouldContain(endDate);
    }

    expectMilestoneAmountErrorMessageVisible() {
        this
            .elements
            .errorMessage()
            .shouldBeVisible();
    }

    expectSplitRows(length) {
        this
            .elements
            .selectMilestoneRows()
            .shouldHaveLength(length);

    }

    openMilestoneDetails() {
        this
            .elements
            .selectEditIcon()
            .clickElement();

    }
    expectMilestoneNameToBe(milestoneName) {
        this
            .elements
            .milestoneDetails.milestoneName().shouldContain(milestoneName);
    }

    expectContractNameToBe(contractName) {
        this
        .elements.milestoneDetails.contractName().shouldContain(contractName);
    }

    expectMilestoneAmountToBe(milestoneAmount) {
        this
        .elements.milestoneDetails.milestoneAmount().shouldContain(milestoneAmount);
    }

    expectMilestoneRows(length) {
        this
        .elements.milestoneDetails.verifyMilestoneRows().shouldHaveLength(length);
    }
}

export { Milestone };
