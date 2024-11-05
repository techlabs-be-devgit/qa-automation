import { Action } from '../support/actions/action';
import { Pricing } from '../support/pages/pricing';

describe('Estimation', () => {
    const action = new Action();
    let data;
    before(() => {
        action.c2cLogin();
        action
            .loadFixture('clientData.json')
            .then((clientData) => {
                data = clientData;
            });
    });

    it("Visits the Pricing page for a client", () => {
        action
            .visitPage('/dashboard')
            .getElementContaining('span', 'Test 1')
            .clickElement();
        action
            .getElementContaining('div', 'Estimation')
            .clickElement();
        action
            .getElementContaining('div', 'Effort Estimation')
            .clickElement();
        action
            .getElementContaining('button', 'Add Estimation')
            .clickElement();
        action
            .getElementWithId('tags-outlined')
            .selectFromDropdown('UX Engineer');
        action
            .getElementWithAttribute('role', 'combobox', -2)
            .selectFromDropdown('Prototyping');
        action
            .getElementWithId('menu-')
            .clickElement('top');
        action
            .getElementWithAttribute('role', 'combobox', -1)
            .clickElement();
    });

    // it("Adds a new pricing", () => {
    //     const testPricing = new Pricing();
    //     testPricing.expectPricingAdded('P1');
    // });

    // it("Opens the pricing details for a client", () => {
    //     const testPricing = new Pricing();
    //     testPricing.openPricingDetails('P1');
    //     testPricing.expectPricingOverviewHeaderVisible();
    // });

    // it("Confirms pricing details for a client", () => {
    //     const testPricing = new Pricing();
    //     testPricing.expectPricingNameToBe('P1');
    //     testPricing.expectEstimationNameToBe('E1');
    // });
});