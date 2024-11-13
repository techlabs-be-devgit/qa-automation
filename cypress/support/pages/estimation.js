import { Action } from '../actions/action';

class Estimation {
    static action = new Action();


    /**
     * Define the elements for the Estimations Module
     * Input parameters are the elements that are text boxes
     * Select parameters are the elements that are dropdowns
     */

    elements = {
        clientRecord: (clientName) => Estimation.action.getElementContaining('span', clientName),
        effortEstimationNavigation: () => Estimation.action.getElementMatching('div', 'Estimation'),
        estimationNavigation: () => Estimation.action.getElementMatching('div', 'Effort Estimation'),
        estimationsHeader: () => Estimation.action.getElementContaining('p', 'Estimations'),
        effortEstimationHeader: () => Estimation.action.getElementContaining('h4', 'Effort Estimation'),
        addEstimationButton: () => Estimation.action.getElementContaining('button', 'Add Estimation'),
        estimationNameInput: () => Estimation.action.getElementWithXpath('//div[contains(text(), "Estimation Name")]/parent::*/following-sibling::div//input'),
        billingTypeSelect: () => Estimation.action.getElementWithId('outlined-select-contract-term'),
        clientNameField: (clientName) => Estimation.action.getElementWithAttribute('value', clientName),
        resourceRoleSelect: () => Estimation.action.getElementWithId('tags-outlined'),
        skillSelect: () => Estimation.action.getElementWithId('demo-multiple-checkbox'),
        invisibleOverlay: () => Estimation.action.getElementWithId('menu-'),
        resourceRegionSelect: (IND) => Estimation.action.getElementWithAttribute('role', 'combobox', -1),
        resourceStartDateInput: () => Estimation.action.getElementWithAttribute('placeholder', 'yyyy-mm-dd', 0),
        resourceEndDateInput: () => Estimation.action.getElementWithAttribute('placeholder', 'yyyy-mm-dd', 1),
        estimationHoursField: (estimatedHours) => Estimation.action.getElementWithAttribute('value', estimatedHours),
        fullTimeSelect: () => Estimation.action.getElementMatching('p', 'Full Time').getNthSibling(),
        addResourceButton: () => Estimation.action.getElementMatching('button', 'Add Resources'),
        createEstimationButton: () => Estimation.action.getElementMatching('button', 'Create Estimation'),
        estimationRecord: (estimationName) => Estimation.action.getElementContaining('span', estimationName),
        estimationDeleteButton: (estimationName) => Estimation.action.getElementWithXpath(`//span[text()="${estimationName}"]/ancestor::td/ancestor::tr//td//span//button`),
        deleteConfirmButton: () => Estimation.action.getElementContaining('button', 'Delete'),
        estimationCalendar: {
            icon: () => Estimation.action.getElementWithAttribute('data-testid', 'DateRangeIcon'),
            monthlyTab: () => Estimation.action.getElementMatching('button', 'Monthly'),
            weeklyTab: () => Estimation.action.getElementMatching('button', 'Weekly'),
            dailyTab: () => Estimation.action.getElementMatching('button', 'Daily'),
            navLeftIcon: () => Estimation.action.getElementWithAttribute('data-testid', 'ChevronLeftIcon'),
            navRightIcon: () => Estimation.action.getElementWithAttribute('data-testid', 'ChevronRightIcon'),
            splitHoursField: () => Estimation.action.getElementWithAttribute('inputmode', 'numeric', 0),
            minHoursField: () => Estimation.action.getElementWithAttribute('inputmode', 'numeric', 1),
            maxHoursField: () => Estimation.action.getElementWithAttribute('inputmode', 'numeric', 2),
            cancelButton: () => Estimation.action.getElementMatching('button', 'Cancel'),
            submitButton: () => Estimation.action.getElementMatching('button', 'Submit'),
            checkBox: (option) => Estimation
                                    .action
                                    .getElementWithXpath(`//p[contains(text(), '${option}')]/preceding-sibling::span/*[@type='checkbox']`),
            numericFields: () => Estimation.action.getElementWithAttribute('inputmode', 'numeric'),
            splitButton: () => Estimation.action.getElementMatching('button', 'Split'),
            invalidSplitWarning: () => Estimation
                                        .action
                                        .getElementContaining('h6', 'Cannot distribute'),
        }
    }

    visit(clientName) {
        Estimation.action.visitPage('/dashboard')
        this
            .elements
            .clientRecord(clientName)
            .clickElement();
        this
            .elements
            .effortEstimationNavigation()
            .clickElement();
        this
            .elements
            .estimationNavigation()
            .clickElement();
    }

    openAddEstimationPopup() {
        this
            .elements
            .addEstimationButton()
            .clickElement();
    }

    fillEstimationName(estimationName) {
        this
            .elements
            .estimationNameInput()
            .clickElement()
            .typeText(estimationName);
    }

    selectBillingType(billingType) {
        this
            .elements
            .billingTypeSelect()
            .selectFromDropdown(billingType);
    }

    expectPopulatedClientNameToBe(clientName) {
        this
            .elements
            .clientNameField(clientName)
            .shouldHaveAttributeValue('value', clientName);
    }

    selectResourceRole(resourceRole) {
        this
            .elements
            .resourceRoleSelect()
            .selectFromDropdown(resourceRole);
    }

    selectResourceSkill(selectSkill) {
        this
            .elements
            .skillSelect()
            .selectFromDropdown(selectSkill);
        this
            .elements
            .invisibleOverlay()
            .clickElement('top');
    }


    selectResourceRegion(resourceRegion) {
        this
            .elements
            .resourceRegionSelect()
            .selectFromDropdown(resourceRegion);
    }

    fillResourceStartDate(startDate) {
        this
            .elements
            .resourceStartDateInput()
            .typeText(startDate);
    }

    fillResourceEndDate(endDate) {
        this
            .elements
            .resourceEndDateInput()
            .typeText(endDate);
    }

    selectFullTime(fullTime) {
        this
            .elements
            .fullTimeSelect()
            .clickElement()
    }

    openEstimationCalendar() {
        this
            .elements
            .estimationCalendar.icon()
            .clickElement();
    }

    switchToMonthlyTab() {
        this
            .elements
            .estimationCalendar.monthlyTab()
            .clickElement();
    }

    expectMonthlyTabActive() {
        this
            .elements
            .estimationCalendar.monthlyTab()
            .shouldHaveCSSProperty('background-color', '#8056F7');
    }

    switchToWeeklyTab() {
        this
            .elements
            .estimationCalendar.weeklyTab()
            .clickElement();
    }

    expectWeeklyTabActive() {
        this
        .elements
        .estimationCalendar.weeklyTab()
        .shouldHaveCSSProperty('background-color', '#8056F7');
    }


    switchToDailyTab() {
        this
            .elements
            .estimationCalendar.dailyTab()
            .clickElement();
    }

    expectDailyTabActive() {
        this
        .elements
        .estimationCalendar.dailyTab()
        .shouldHaveCSSProperty('background-color', '#8056F7');
    }

    clickLeftIcon() {
        this
            .elements
            .estimationCalendar.navLeftIcon()
            .clickElement();
    }

    clickRightIcon() {
        this
            .elements
            .estimationCalendar.navRightIcon()
            .clickElement();
    }

    fillSplitHours(splitHours) {
        this
            .elements
            .estimationCalendar.splitHoursField()
            .clearField()
            .typeText(splitHours);
    }

    fillMinHours(minHours) {
        this
            .elements
            .estimationCalendar.minHoursField()
            .clearField()
            .typeText(minHours);
    }

    fillMaxHours(maxHours) {
        this
            .elements
            .estimationCalendar.maxHoursField()
            .clearField()
            .typeText(maxHours);
    }

    selectAllOption() {
        this
            .elements
            .estimationCalendar.checkBox('Select All')
            .clickElement()
    }

    splitHours() {
        this
            .elements
            .estimationCalendar.splitButton()
            .clickElement()
    }

    submitEstimation() {
        this
            .elements
            .estimationCalendar.submitButton()
            .clickElement()
    }

    closeEstimationCalendar() {
        this
            .elements
            .estimationCalendar.cancelButton()
            .clickElement()
    }

    clickAddResourceButton() {
        this
            .elements
            .addResourceButton()
            .clickElement()
    }

    clickCreateEstimationButton() {
        this
            .elements
            .createEstimationButton()
            .clickElement()
    }

    deleteEstimation(estimationName) {
        this
            .elements
            .estimationDeleteButton(estimationName)
            // .clickElement()
            .clickElement();
        this
            .elements
            .deleteConfirmButton()
            .clickElement();

    }

    expectEstimationsHeaderVisible() {
        this
            .elements
            .estimationsHeader()
            .shouldBeVisible();
    }

    expectEfforEstimationHeaderVisible() {
        this
            .elements
            .effortEstimationHeader()
            .shouldBeVisible();
    }

    expectEstimationCreated(estimationName) {
        this
            .elements
            .estimationRecord(estimationName)
            .shouldBeVisible();
    }

    expectEstimationDeleted(estimationName) {
        this
            .elements
            .estimationRecord(estimationName)
            .shouldNotExist();
    }

    expectEstimatedHoursToBe(estimatedHours) {
        this
            .elements
            .estimationHoursField(estimatedHours)
            .shouldBeVisible();
    }

    expectSplitHoursToBe(splitHours) {
        this
            .elements
            .estimationCalendar.splitHoursField()
            .shouldHaveAttributeValue('value', splitHours);
    }

    expectMinHoursToBe(minHours) {
        this
            .elements
            .estimationCalendar.minHoursField()
            .shouldHaveAttributeValue('value', minHours);
    }

    expectMaxHoursToBe(maxHours) {
        this
            .elements
            .estimationCalendar.maxHoursField()
            .shouldHaveAttributeValue('value', maxHours);
    }

    expectInvalidSplitWarning() {
        this
            .elements
            .estimationCalendar.invalidSplitWarning()
            .shouldBeVisible();
    }

    /**
     * Asserts that the split hours are within the valid range and add up to the total split hours.
     */
    validateSplit(totalHours, minHours, maxHours) {
        Estimation
            .action
            .getElementWithAttribute('inputmode', 'numeric', false)
            .element
            .then(($items) => {
                let totalSplitHours = 0;
                const itemsToCheck = Array.from($items.slice(3));
                
                // Loop over all the items and validate their values
                itemsToCheck.forEach((item) => {
                    // In the daily tab, inactive dates have an attribute "disabled" with no value.
                    if(item.hasAttribute('disabled')) {
                        return;
                    }
                    let itemIntegerValue = parseInt(item.value);
                        Estimation
                            .action
                            .wrap(itemIntegerValue)
                            .shouldBeGTE(minHours);
                        Estimation
                            .action
                            .wrap(itemIntegerValue)
                            .shouldBeLTE(maxHours);
                        totalSplitHours += itemIntegerValue;
                });
                
                // Check if the total hours in the fields match the Split hours field
                this.expectSplitHoursToBe(totalSplitHours);
                this.expectSplitHoursToBe(totalHours);
            });
    }
}

export { Estimation };