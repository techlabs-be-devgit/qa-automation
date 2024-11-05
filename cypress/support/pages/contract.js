import { Action } from "../actions/action";

class Contract {
    static action = new Action();

    elements = {
        clientRecord: (clientName) => Contract.action.getElementContaining('span', clientName),
        sowContractNavigation: () => Contract.action.getElementContaining('div', 'SOWContract'),
        contractsNavigation: () => Contract.action.getElementContaining('div', 'Contracts'),
        contractsHeader: () => Contract.action.getElementContaining('p', 'Contracts'),
        addContractButton: () => Contract.action.getElementContaining('button', 'Add Contract'),
        estimationNameSelect: () => Contract.action.getElementWithAttribute('role', 'combobox', 0),
        pricingNameSelect: () => Contract.action.getElementWithAttribute('role', 'combobox', 1),
        contractTypeSelect: () => Contract.action.getElementWithAttribute('role', 'combobox', 2),
        paymentTermsSelect: () => Contract.action.getElementWithAttribute('role', 'combobox', 3),
    }
}