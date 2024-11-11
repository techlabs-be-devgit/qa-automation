import { Action } from "../actions/action";

class Milestone {
    static action = new Action();

    elements = {
        clientRecord: (clientName) => Milestone.action.getElementContaining('span', clientName),
        sowContractTab: () => Milestone.action.getElementContaining('div', 'SOWContract'),
        milestoneTab: () => Milestone.action.getElementContaining('div', 'Milestones'),
        addMilestoneButton: () => Milestone.action.getElementContaining('button', 'Add Milestone'),
        addMilestoneHeader: () => Milestone.action.getElementContaining('h5','Add Milestone'),
        contractNameSelect: () => Milestone.action.getElementWithAttribute('role', 'combobox'),
        contractOption : (contractName) => Milestone.action.getElementWithAttribute('li', contractName),
        totalContractAmount: () => Milestone.action.getElementContaining('p', 'Total Contract Amount:'),
        remainingContractAmount: () => Milestone.action.getElementContaining('p', 'Remaining Contract Amount:'),
        addMilestoneName: () => Milestone.action.getElementWithAttribute('type', 'text',0),
        selectManualTab: () => Milestone.action.getElementContaining('button', 'Manual'),
        milestoneAmountInput: () => Milestone.action.getElementWithAttribute('type', 'number'),
        errorMessage: () => Milestone.action.getElementContaining('p', 'The entered amount cannot exceed the remaining contract amount.'),
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
       milestonesHeader : () => Milestone.action.getElementContaining('p', 'Milestones'),
       milestoneExistsMessage: () => Milestone.action.getElementContaining('p', 'For this contract the milestone is already exists.'),
       milestoneAmountError: () => Milestone.action.getElementContaining('p', 'Milestone amount must be non-negative'),
       contractStartDate: () => Milestone.action.getElementContaining('p', 'Start Date :'),
       contractEndDate: () => Milestone.action.getElementContaining('p', 'End Date :'),

       milestoneDeleteButton : (milestoneName) => Milestone.action.getElementWithXpath(`//span[text()="${milestoneName}"]/ancestor::td/ancestor::tr//td//span//button`),
       deleteConfirmButton : () => Milestone.action.getElementContaining('button', 'Delete'),
    
       //getMilestoneAmountErrorMessage :() => Milestone.action.getElementContaining('p','Milestone amount must be non-negative'),
    //    milestoneNameField: () => Milestone.action.getElementWithAttribute('type', 'text', 0),
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

    deleteMilestone(milestoneName){
        this
            .elements
            .milestoneDeleteButton(milestoneName)
            .clickElement();

       this
            .elements
            .deleteConfirmButton(milestoneName)
            .clickElement();
            
    }

    

    //Asserations
    expectMilestonesHeaderVisible(){
        this
            .elements
            .milestonesHeader()
            .shouldBeVisible();
    }
    expectAddMilestoneButtonVisible(){
        this
             .elements
             .addMilestoneButton()
             .shouldBeVisible();
    
    }
    expectAddmilestoneHeaderVisible(){
        this
             .elements
             .addMilestoneHeader()
             .shouldBeVisible();

    }
    openContractNameDropdown(){
        this
            .elements
            .contractNameSelect()
            .clickElement();
        
    }

    expectContractOptionVisible(contractName) {
         this 
             .elements
             .contractOption(contractName).shouldBeVisible();
       
    }

    expectMilestoneExistsMessageVisible() {
        this.elements.milestoneExistsMessage().shouldBeVisible();
    }

    // Method to assert that the Milestone name field ignores special characters and accepts only alphabets and numbers
   
   expectMilestoneNameFieldAcceptsOnlyAlphanumeric() {
    

    // Try entering special characters
    addMilestoneName.clear().type('!@#$%^&*');
    addMilestoneName.should('have.value', ''); // Expecting the field to remain empty

    // Try entering alphabets
    addMilestoneName.clear().type('MilestoneName');
    addMilestoneName.should('have.value', 'MilestoneName'); // Expecting the field to accept alphabets

    // Try entering numbers
    addMilestoneName.clear().type('12345');
    addMilestoneName.should('have.value', '12345'); // Expecting the field to accept numbers

    // Try entering alphanumeric characters
    addMilestoneName.clear().type('Milestone123');
    addMilestoneName.should('have.value', 'Milestone123'); // Expecting the field to accept alphanumeric input
}

   expectManualButtonEnabled() {
    this
   .elements
   .selectManualTab().shouldBeEnabled(); // Assert that the button is enabled
   }

   expectMilestoneAmountErrorForNegativeInput() {
    this
        .elements
        .milestoneAmountInput.clear().type('-100')
        .milestoneAmountError.shouldBeVisible();
   }
    // Assertion to check if the start date is displayed
   expectContractStartDateVisible() {
     this
         .elements
         .contractStartDate().shouldBeVisible();// Ensure that the start date is visible
     
}

// Assertion to check if the end date is displayed
expectContractEndDateVisible() {
     this
         .elements
         .contractEndDate().shouldBeVisible();// Ensure that the end date is visible

}

 // Assertion to check if the total contract amount is visible
 expectTotalContractAmountVisible() {
     this
         .elements
         .totalContractAmount().shouldBeVisible(); // Ensure that the total contract amount is visible
}

// Assertion to check if the remaining contract amount is visible
expectRemainingContractAmountVisible() {
     this
         .elements
         .remainingContractAmount().shouldBeVisible(); // Ensure that the remaining contract amount is visible
}

 // Assertion to check if the error message is visible
 expectAmountExceedsErrorMessageVisible() {
     this
        .elements
        .errorMessage().shouldBeVisible(); // Ensure that the error message is visible
}

// Method to enter amount in the milestone amount field and check for error message
enterMilestoneAmountAndVerifyError(amount) {
    this 
        .elements
        .milestoneAmountInput().clear().type(amount); // Enter the amount in the milestone amount field
    
    // Check if the error message is displayed when the entered amount exceeds the total contract amount
    this.expectAmountExceedsErrorMessageVisible();
}

expectMilestoneDateFormatCorrect() {
    this 
        .elements 
        .milestoneDateInput().invoke('val').should('match', /^\d{4}-\d{2}-\d{2}$/);
    
    // Check that the value matches the 'yyyy-mm-dd' format using regex
  // Matches 'yyyy-mm-dd' format
}


// Assertion to check if "Add" button is disabled when any field is empty
expectAddButtonDisabledForEmptyFields() {
    // Ensure each field is empty
    this.elements.contractNameSelect().should('have.value', '');
    this.elements.addMilestoneName().should('have.value', '');
    this.elements.milestoneAmountInput().should('have.value', '');
    this.elements.milestoneDateInput().should('have.value', '');
    this.elements.addMilestoneDeliverables().should('have.value', '');

    // Check that the "Add" button is disabled
    this.elements.selectAddButton().should('be.disabled');
}

 

}
export { Milestone };