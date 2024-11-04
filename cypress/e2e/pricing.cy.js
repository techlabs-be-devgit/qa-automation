import { Action } from '../support/actions/action';
import { Pricing } from '../support/pages/pricing';

describe('Estimation', () => {
    const action = new Action();
    before(() => {
        action.c2cLogin();
        action
            .loadFixture('clientData.json')
            .then((clientData) => {
                data = clientData;
            });
    });

    it("Visits the Pricing page for a client", () => {
        const testPricing = new Pricing();
        testPricing.visit(data.client.name);
    });
});