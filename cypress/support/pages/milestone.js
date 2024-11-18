import { Action } from "../actions/action";

class Milestone {
    elements = {
        clientRecord: (clientName) => this.action.get('span').contains(clientName),
        sowContractTab: () => this.action.get('div').contains('SOWContract'),
        milestoneTab: () => this.action.get('div').contains('Milestones'),
        addMilestoneButton: () => this.action.get('button').contains('Add Milestone'),
        addMilestoneHeader: () => this.action.get('h5').contains('Add Milestone'),
        contractNameSelect: () => this.action.get('[role="combobox"]').eq(0),
        contractOption: (contractName) => this.action.get('li').contains(contractName),
        totalContractAmount: () => this.action.get('p').contains('Total Contract Amount:'),
        contractStartDate: () => this.action.get('p').contains('Start Date :'),
        contractEndDate: () => this.action.get('p').contains('End Date :'),
        addMilestoneName: () => this.action.get('[type="text"]').eq(0),
        selectManualTab: () => this.action.get('button').contains('Manual'),
        milestoneAmountInput: () => this.action.get('[type="number"]').eq(0),
        errorMessage: () => this.action.get('p').contains(this.milestoneAmountTooHighWarning),
        milestoneDateInput: () => this.action.get('[placeholder="yyyy-mm-dd"]').eq(0),
        addMilestoneDeliverables: () => this.action.get('[type="text"]').eq(1),
        selectAddButton: () => this.action.get('button').contains('ADD'),
        selectAutofillTab: () => this.action.get('button').contains('Autofill'),
        milestoneAmountInputTwo: () => this.action.get('[type="number"]').eq(0),
        addMilestoneDeliverablesTwo: () => this.action.get('div').contains('Milestone Deliverables'),
        selectEveryWeek: () => this.action.get('span').contains('Every Week'),
        selectSplitAmountButton: () => this.action.get('button').contains('Split Amount'),
        getMilestoneRows: (itemName) => this.action.get('p').contains(itemName),
        selectCreateMilestoneButton: () => this.action.get('button').contains('Create Milestone'),
        milestonesHeader: () => this.action.get('p').contains('Milestones'),
        milestoneExistsMessage: () => this.action.get('p').contains('For this contract the milestone is already exists.'),
        milestoneAmountError: () => this.action.get('p').contains('Milestone amount must be non-negative'),
        milestoneDeleteButton: (milestoneName) => this.action.xpath(`//span[text()="${milestoneName}"]/ancestor::td/ancestor::tr//td//span//button`),
        deleteConfirmButton: () => this.action.get('button').contains('Delete'),
        selectMilestoneRows: () => this.action.xpath("//p[text()='item1']"),
        selectEditIcon: () => this.action.get('[data-testid="ArrowForwardIosIcon"]'),
        milestoneDetails: {
            milestoneName: () => this.action.get('p').contains('Milestone Name').siblings().eq(0),
            contractName: () => this.action.get('p').contains('Contract Name').siblings().eq(0),
            milestoneAmount: () => this.action.get('p').contains('Milestone Amount').siblings().eq(0),
            verifyMilestoneRows: () => this.action.xpath("//p[text()='item1']"),
    }
}

constructor() {
    this.action = new Action();
    this.milestoneAmountTooHighWarning =  'The entered amount cannot exceed the remaining contract amount.';
}

visit(clientName) {
    this.action.visit('/dashboard');
    this
        .elements
        .clientRecord(clientName)
        .click();

    this
       .elements
       .sowContractTab()
       .click();
    this
        .elements
        .milestoneTab()
        .click();
}

    clickAddMilestoneButton() {
        this
            .elements
            .addMilestoneButton()
            .click();
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
            .type(milestoneName);
    }

    clickOnManualTab() {
        this
            .elements
            .selectManualTab()
            .click();
    }

    fillMilestoneAmount(milestoneAmount) {
        this
            .elements
            .milestoneAmountInput()
            .type(milestoneAmount);
    }

    fillMilestoneDate(date) {
        this
            .elements
            .milestoneDateInput()
            .type(date);
    }

    fillMilestoneDeliverables(milestoneDeliverables) {
        this
            .elements
            .addMilestoneDeliverables()
            .type(milestoneDeliverables);
    }

    clickOnAddMilestoneButton() {
        this
            .elements
            .selectAddButton()
            .click();
    }

    switchToAutoFill() {
        this
            .elements
            .selectAutofillTab()
            .click();
    }

    fillMilestoneAmountTwo(milestoneAmountTwo) {
        this
            .elements
            .milestoneAmountInputTwo()
            .type(milestoneAmountTwo);
    }
    clickOnEveryWeek() {
        this
            .elements
            .selectEveryWeek()
            .click();
    }

    clickOnSplitAmount() {
        this
            .elements
            .selectSplitAmountButton()
            .click();
    }

    clickOnCreateMilestoneButton() {
        this
            .elements
            .selectCreateMilestoneButton()
            .click();
    }
    // Assertions
    expectMilestonesHeaderVisible() {
        this
            .elements
            .milestonesHeader()
            .should('be.visible');
    }

    expectAddMilestoneButtonVisible() {
        this
            .elements
            .addMilestoneButton()
            .should('be.visible');
    }

    expectAddMilestoneHeaderVisible() {
        this
            .elements
            .addMilestoneHeader()
            .should('be.visible');
    }

    openContractNameDropdown() {
        this
            .elements
            .contractNameSelect()
            .click();
    }

    expectContractNameVisible(contractName) {
        this
            .elements
            .contractOption(contractName)
            .should('be.visible');
    }

    expectTotalContractAmountToBe(contractAmount) {
        this
            .elements
            .totalContractAmount()
            .should('contain', contractAmount);
    }

    expectContractStartDateToBe(startDate) {
        this
            .elements
            .contractStartDate()
            .should('contain', startDate);
    }

    expectContractEndDateToBe(endDate) {
        this
            .elements
            .contractEndDate()
            .should('contain', endDate);
    }

    expectMilestoneAmountErrorMessageVisible() {
        this
            .elements
            .errorMessage()
            .should('be.visible');
    }

    expectSplitRows(length) {
        this
            .elements
            .selectMilestoneRows()
            .should('have.length', length);

    }

    openMilestoneDetails() {
        this
            .elements
            .selectEditIcon()
            .click();

    }
    expectMilestoneNameToBe(milestoneName) {
        this
            .elements
            .milestoneDetails.milestoneName()
            .should('contain', milestoneName);
    }

    expectContractNameToBe(contractName) {
        this
            .elements
            .milestoneDetails.contractName()
            .should('contain', contractName);
    }

    expectMilestoneAmountToBe(milestoneAmount) {
        this
            .elements
            .milestoneDetails.milestoneAmount()
            .should('contain', milestoneAmount);
    }

    expectMilestoneRows(length) {
        this
            .elements
            .milestoneDetails.verifyMilestoneRows()
            .should('have.length', length);
    }
}

export { Milestone };
