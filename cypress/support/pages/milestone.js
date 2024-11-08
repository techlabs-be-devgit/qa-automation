import { Action } from "../actions/action";

class Milestone {
    static action = new Action();

    elements = {
        clientRecord: (clientName) => Milestone.action.getElementContaining('span', clientName),
        sowContractTab: () => Milestone.action.getElementContaining('div', 'SOWContract'),
        milestoneTab: () => Milestone.action.getElementContaining('div', 'Milestones'),
        addMilestoneButton: () => Milestone.action.getElementContaining('button', 'Add Milestone'),
        contractNameSelect: () => Milestone.action.getElementWithAttribute('role', 'combobox'),
        addMilestoneName: () => Milestone.action.getElementWithAttribute('type', 'text',0),
        selectManualTab: () => Milestone.action.getElementContaining('button', 'Manual'),
        milestoneAmountInput: () => Milestone.action.getElementWithAttribute('type', 'number'),
        milestoneDateInput: () => Milestone.action.getElementWithAttribute('placeholder', 'yyyy-mm-dd'),
        addMilestoneDeliverables: () => Milestone.action.getElementWithAttribute('type', 'text', 1),
        selectAddButton: () => Milestone.action.getElementContaining('button', 'ADD'),
        selectAutofillTab: () => Milestone.action.getElementContaining('button', 'Autofill'),
        milestoneAmountInputTwo: () => Milestone.action.getElementWithAttribute('type', 'number'),
        addMilestoneDeliverablesTwo: () => cy.contains('div', 'Milestone Deliverables').get('input').eq(5),
        selectEveryWeek: () => Milestone.action.getElementContaining('span', 'Every Week'),
        selectSplitAmountButton: () => Milestone.action.getElementContaining('button', 'Split Amount'),
        selectCreateMilestoneButton: () => Milestone.action.getElementContaining('button', 'Create Milestone'),
        //Assertions
       milestonesHeaderVisible : () => Milestone.action.getElementContaining('p', 'Milestones'),
       addMilestoneButtonVisible: () => Milestone.action.getElementContaining('button', 'Add Milestone'),
       getContractNameSelect: () => Milestone.action.getElementWithAttribute('role', 'combobox'),
       getMilestoneAmountErrorMessage :() => Milestone.action.getElementContaining('p','Milestone amount must be non-negative'),
       milestoneNameField: () => Milestone.action.getElementWithAttribute('type', 'text', 0),
    }

    


    visit(clientName) {
        Milestone.action.visitPage('/dashboard')
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
            .addMilestoneButton().clickElement();
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
            .addMilestoneName().typeText(milestoneName);
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
            .milestoneAmountInput().typeText(milestoneAmount);
        // .clickElement();
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
        //.clickElement();
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
            .milestoneAmountInput().typeText(milestoneAmountTwo);
        // .clickElement();
    }

    fillMilestoneDeliverablesTwo(milestoneDeliverablesTwo) {
        this
            .elements
            .addMilestoneDeliverablesTwo()
            .type(milestoneDeliverablesTwo);
        //.clickElement();
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

}

export { Milestone };