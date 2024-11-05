import { Action } from '../actions/action';

class Estimation {
    static action = new Action();


    /**
     * Define the elements for the Client Management page
     * *Input parameters are the elements that are text boxes
     * *Select parameters are the elements that are dropdowns
     */

    elements = {
        clientRecord: (clientName) => Estimation.action.getElementContaining('span', clientName),
        effortEstimationTab: () => Estimation.action.getElementMatching('div', 'Estimation'),
        estimationTab: () => Estimation.action.getElementMatching('div', 'Effort Estimation'),
        addEstimationButton: () => Estimation.action.getElementContaining('button', 'Add Estimation'),
        estimationNameInput: () => Estimation.action.getElementWithAttribute('type', 'text'),
        billingTypeSelect: () => Estimation.action.getElementWithId('outlined-select-contract-term'),
        clientName: (clientName) => Estimation.action.getElementWithAttribute('value', clientName),
        resourceRole: () => Estimation.action.getElementWithId('tags-outlined'),
        selectSkill: () => Estimation.action.getElementWithId('demo-multiple-checkbox'),
        invisibleOverlay: () => Estimation.action.getElementWithId('menu-'),
        resourceRegion: (IND) => Estimation.action.getElementWithAttribute('role', 'combobox', -1),
        contractStartDateInput: () => Estimation.action.getElementWithAttribute('placeholder', 'yyyy-mm-dd', 0),
        contractEndDateInput: () => Estimation.action.getElementWithAttribute('placeholder', 'yyyy-mm-dd', 1),
        estimationHours: () => Estimation.action.getElementMatching('div', 'Estimation Hrs'),
        fullTime: () => Estimation.action.getElementMatching('p', 'Full Time').getNthSibling(),
        selectAddResourceButton: () => Estimation.action.getElementMatching('button', 'Add Resources'),
        selectCreateEstimationButton: () => Estimation.action.getElementMatching('button', 'Create Estimation'),


    }

    visit(clientName) {
        Estimation.action.visitPage('/dashboard')
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
            .estimationTab()
            .clickElement();
    }



    clickAddEstimationButton() {
        this
            .elements
            .addEstimationButton()
            .clickElement();
    }

    fillEstimationName(estimationName) {
        this
            .elements
            .estimationNameInput().clickElement()
            .typeText(estimationName);

    }

    selectBillingType(billingType) {
        this
            .elements
            .billingTypeSelect()
            .selectFromDropdown(billingType);
    }

    checkClientName(clientName) {
        this
            .elements
            .clientName(clientName)
            .shouldBeVisible();
    }
    selectResourceRole(resourceRole) {
        this
            .elements
            .resourceRole()
            .selectFromDropdown(resourceRole);

    }

    selectResourceSkill(selectSkill) {
        this
            .elements
            .selectSkill()
            .selectFromDropdown(selectSkill);
        this
            .elements
            .invisibleOverlay().clickElement('top');
    }

    invisibleOverlay

    selectResourceRegion(resourceRegion) {
        this
            .elements
            .resourceRegion()
            .selectFromDropdown(resourceRegion);
    }
    fillContractStartDate(date) {
        this
            .elements
            .contractStartDateInput()
            .typeText(date);
    }
    fillContractEndDate(date) {
        this
            .elements
            .contractEndDateInput()
            .typeText(date);
    }

    selectFullTime(fullTime) {
        this
            .elements
            .fullTime()
            .clickElement()
    }

    clickAddResource(addResource) {
        this
            .elements
            .selectAddResourceButton()
            .clickElement()

    }

    clickCreateEstimation(createEstimation) {
        this
            .elements
            .selectCreateEstimationButton()
            .clickElement()
    }








}

export { Estimation }