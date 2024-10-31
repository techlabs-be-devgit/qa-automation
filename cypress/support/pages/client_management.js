import { Action } from '../actions/action';

class ClientManagement {
    static action = new Action();
    static url = '/dashboard';

    /**
     * Define the elements for the Client Management page
     * *Input parameters are the elements that are text boxes
     * *Select parameters are the elements that are dropdowns
     */
    elements = {
        clientManagementHeader : () => ClientManagement.action.getElementMatching('p', 'Client Management'),
        addClientPopupButton : () => ClientManagement.action.getElementMatching('button', 'Add Client'),
        clientNameInput : () => ClientManagement.action.getElementWithId('outlined-adornment-clientname'),
        clientAddressInput : () => ClientManagement.action.getElementWithId('outlined-adornment-clientaddress'),
        countrySelect : () => ClientManagement.action.getElementWithId('country-select'),
        stateSelect : () => ClientManagement.action.getElementWithId('state-select'),
        citySelect : () => ClientManagement.action.getElementWithId('city-select'),
        clientZipCodeInput : () => ClientManagement.action.getElementWithId('outlined-adornment-zipcode'),
        nextButton : () => ClientManagement.action.getElementMatching('button', 'Next'),
        contractNameInput : () => ClientManagement.action.getElementWithId('outlined-adornment-contractname'),
        contractTypeSelect : () => ClientManagement.action.getElementWithId('demo-simple-select'),
        contractStartDateInput : () => ClientManagement.action.getElementWithId('\\:ro\\:'),
        contractEndDateInput : () => ClientManagement.action.getElementWithId('\\:rp\\:'),
        createClientButton : () => ClientManagement.action.getElementMatching('button', 'Create Client'),
    }

    visit(){
        ClientManagement.action.visitPage(ClientManagement.url);
    }

    openAddClientPopup(){
        this
            .elements
            .addClientPopupButton()
            .clickElement();
    }

    fillClientName(clientName){
        this
            .elements
            .clientNameInput()
            .typeText('Test Client');
    }

    fillClientAddress(clientAddress){
        this
            .elements
            .clientAddressInput()
            .typeText(clientAddress);
    }

    selectClientCountry(clientCountry){
        this
            .elements
            .countrySelect()
            .selectFromDropdown(clientCountry);
    }

    selectClientState(clientState){
        this
            .elements
            .stateSelect()
            .selectFromDropdown(clientState);
    }

    selectClientCity(clientCity){
        this
            .elements
            .citySelect()
            .selectFromDropdown(clientCity);
    }
    
    fillClientZipCode(clientZipCode){
        this
            .elements
            .clientZipCodeInput()
            .typeText(clientZipCode);
    }

    clickNextButton(){
        this
            .elements
            .nextButton()
            .clickElement();
    }

    fillContractName(orgLevelContractName){
        this
            .elements
            .contractNameInput()
            .typeText(orgLevelContractName);
    }

    selectContractType(contractType){
        this
            .elements
            .contractTypeSelect()
            .selectFromDropdown(contractType);
    }

    fillContractStartDate(day, month, year){
        this
            .elements
            .contractStartDateInput()
            .inputDate(day, month, year);
    }

    fillContractEndDate(day, month, year){
        this
            .elements
            .contractEndDateInput()
            .inputDate(day, month, year);
    }

    clickCreateClientButton(){
        this
            .elements
            .createClientButton()
            .clickElement();
    }
}

export { ClientManagement };