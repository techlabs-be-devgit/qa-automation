import { Action } from "../actions/action";

class Allocations {
    static action = new Action();

    elements = {
        clientRecord: (clientName) => Allocations.action.getElementContaining('span', clientName),
        allocationTab: () => Allocations.action.getElementContaining('div', 'Allocations'),
        addAllocationButton: () => Allocations.action.getElementContaining('button', 'Add Allocation'),
        selectContractOption : () => Allocations.action.getElementWithAttribute('role','combobox',0),
        allocationNameInput : () => Allocations.action.getElementWithAttribute('type', 'text',1),
        clickResourceselect : () => Allocations.action.getElementWithId('dropdown-basic'),
        selectResourceOption: (resourceName) => Allocations.action.getElementContaining('a.dropdown-item', resourceName),
        selectCreateAllocationButton : () => Allocations.action.getElementContaining('button', 'Create Allocation'),
        editIcon : () => Allocations.action.getElementWithAttribute('data-testid','ArrowForwardIosIcon'),

        AllocationDetails : {

            contractName : () => Allocations.action.getElementContaining('p','Contract Name',0).getNthSibling(),
            estimationName: () => Allocations.action.getElementContaining('p',' Estimation Name​',1).getNthSibling(),
            allocationName : () => Allocations.action.getElementContaining('p','Allocation Name',2).getNthSibling(),
            allocationCount : () => Allocations.action.getElementContaining('p','Allocation Count',3).getNthSibling(),
            startDate : () => Allocations.action.getElementContaining('p','Start Date',4).getNthSibling(),
            endDate : () => Allocations.action.getElementContaining('p','End Date',5).getNthSibling(),
            totalBilableHours : () => Allocations.action.getElementContaining('p','Total Billable Hours',6).getNthSibling(),
         },
        
       
    };

    visit(clientName) {
        Allocations.action.visitPage('/dashboard');
        this.elements.clientRecord(clientName).clickElement();
        this.elements.allocationTab().clickElement();
        
    }

    clickAddAllocationButton() {
        this.elements.addAllocationButton().clickElement();
    }

    selectAllocationContractOption() {
        this.elements.selectContractOption()
        .selectFromDropdown('contract2')
    }

    

    fillAllocationName(allocationName) {
        this.elements.allocationNameInput().clickElement().typeText(allocationName, { force: true });
    }

   clickOnSelectResource(){
    this.elements.clickResourceselect().clickElement();
    
   } 

   selectResourceFromDropdown(resourceName) {
    this.elements.selectResourceOption(resourceName).clickElement(); 
   }
  clickOnCreateAllocationButton(){
    this.elements.selectCreateAllocationButton().clickElement(); 
  }

  clickOnEditIcon(){
    this.elements.editIcon().clickElement(); 
  }

  
  expectedAllocationContractNameToBe(contractName) {
    this.elements.AllocationDetails.contractName().shouldContain(contractName);
}
expectedAllocationEstimationNameToBe(poCntractName) {
    this.elements.AllocationDetails.estimationName().shouldContain(poCntractName);
}
expectedAllocationNameToBe(allocationName) {
    this.elements.AllocationDetails.allocationName().shouldContain(allocationName);
}
expectedAllocationCountToBe(allocationCount) {
    this.elements.AllocationDetails.allocationCount().shouldContain(allocationCount);
}
expectedAllocationStartDateToBe(startDate) {
    this.elements.AllocationDetails.startDate().shouldContain(startDate);
}
expectedAllocationEndDateToBe(endDate) {
    this.elements.AllocationDetails.endDate().shouldContain(endDate);
}
expectedTotalBillHrsToBe(totalBillHours) {
    this.elements.AllocationDetails.totalBilableHours().shouldContain(totalBillHours);
}

  


}  

export { Allocations };






