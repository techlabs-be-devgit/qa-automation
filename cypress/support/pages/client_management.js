import { Action } from '../actions/action';

class ClientManagement {
    static url = '/dashboard';
    static action = new Action();
    static  streetAddressLeadingTrailingSpacesWarning = 'Street address should not have leading or trailing spaces.';
    static emptyAddressFieldWarning = 'Street address cannot be empty. Please enter a valid address.';
    static randomCharactersInAddressFieldWarning = 'Address appears to contain random characters. Please enter a valid address.';
    static invalidZipCodeWarning = 'Zip code should be min 5 or max 8 digits (alphanumeric) long.';

    /**
     * Define the elements for the Client Management page
     * *Input parameters are the elements that are text boxes
     * *Select parameters are the elements that are dropdowns
     */
    elements = {
        clientManagementHeader : () => ClientManagement.action.getElementMatching('p', 'Client Management'),
        addClientHeader : () => ClientManagement.action.getElementMatching('span', 'Add Client'),
        addClientPopupButton : () => ClientManagement.action.getElementMatching('button', 'Add Client'),
        clientNameInput : () => ClientManagement.action.getElementWithId('outlined-adornment-clientname'),
        clientAddressInput : () => ClientManagement.action.getElementWithId('outlined-adornment-clientaddress'),
        addressLeadingTrailingSpacesWarning : () => ClientManagement
                                                    .action
                                                    .getElementContaining('p', ClientManagement.streetAddressLeadingTrailingSpacesWarning),
        emptyAddressFieldWarning : () => ClientManagement
                                            .action
                                            .getElementMatching('p', ClientManagement.emptyAddressFieldWarning),
        randomCharactersInAddressFieldWarning : () => ClientManagement
                                                    .action
                                                    .getElementMatching('p', ClientManagement.randomCharactersInAddressFieldWarning),
        countrySelect : () => ClientManagement.action.getElementWithId('country-select'),
        stateSelect : () => ClientManagement.action.getElementWithId('state-select'),
        citySelect : () => ClientManagement.action.getElementWithId('city-select'),
        clientZipCodeInput : () => ClientManagement.action.getElementWithId('outlined-adornment-zipcode'),
        invalidZipCodeWarning : () => ClientManagement
                                        .action
                                        .getElementContaining('p', ClientManagement.invalidZipCodeWarning),
        nextButton : () => ClientManagement.action.getElementMatching('button', 'Next'),
        contractNameInput : () => ClientManagement.action.getElementWithId('outlined-adornment-contractname'),
        contractTypeSelect : () => ClientManagement.action.getElementWithId('demo-simple-select'),
        contractStartDateInput : () => ClientManagement.action.getElementWithAttribute('placeholder', 'yyyy-mm-dd'),
        contractEndDateInput : () => ClientManagement.action.getElementWithAttribute('placeholder', 'yyyy-mm-dd', 1),
        createClientButton : () => ClientManagement.action.getElementMatching('button', 'Create Client'),
        clientDeleteButton : (clientName) => ClientManagement
                                            .action
                                            .getElementWithXpath(`//span[text()="${clientName}"]/ancestor::td/ancestor::tr//td//span//button`),
        deleteConfirmButton : () => ClientManagement.action.getElementContaining('button', 'Delete'),
        clientRecord : (clientName) => ClientManagement.action.getElementContaining('span', clientName),
        clientDetails : {
            clientName : () => ClientManagement.action.getElementContaining('p', 'Client Name').getNthSibling(),
            clientAddress : () => ClientManagement.action.getElementContaining('p', 'Client Address').getNthSibling(),
            clientCity : () => ClientManagement.action.getElementContaining('p', 'City').getNthSibling(),
            clientState : () => ClientManagement.action.getElementContaining('p', 'State').getNthSibling(),
            clientCountry : () => ClientManagement.action.getElementContaining('p', 'Country').getNthSibling(),
            clientZipCode : () => ClientManagement.action.getElementContaining('p', 'ZipCode').getNthSibling(),
        }
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
            .typeText(clientName);
    }

    fillClientAddress(clientAddress){
        this
            .elements
            .clientAddressInput()
            .typeText(clientAddress);
    }

    clearClientAddressField() {
        this
            .elements
            .clientAddressInput()
            .clearField();
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

    clearZipCodeField() {
        this
            .elements
            .clientZipCodeInput()
            .clearField();
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

    fillContractStartDate(date){
        this
            .elements
            .contractStartDateInput()
            .typeText(date);
    }

    fillContractEndDate(date){
        this
            .elements
            .contractEndDateInput()
            .typeText(date);
    }

    clickCreateClientButton(){
        this
            .elements
            .createClientButton()
            .clickElement();
    }

    
    deleteClient(clientName){
        ClientManagement.action.waitFor(2000)
        this
            .elements
            .clientDeleteButton(clientName)
            .clickElement();
        this
            .elements
            .deleteConfirmButton()
            .clickElement();
    }
    
    expectClientAdded(clientName){
        this
            .elements
            .clientRecord(clientName)
            .shouldBeVisible();
    }

    expectClientDeleted(clientName){
        this
            .elements
            .clientRecord(clientName)
            .shouldNotExist();
    }

    expectClientManagementHeaderVisible(){
        this
            .elements
            .clientManagementHeader()
            .shouldBeVisible();
    }

    expectAddClientHeaderVisible(){
        this
            .elements
            .addClientHeader()
            .shouldBeVisible();
    }

    expectEmptyAddressFieldWarning(){
        this
            .elements
            .emptyAddressFieldWarning()
            .shouldBeVisible();
    }

    expectRandomCharactersInAddressFieldWarning(){
        this
            .elements
            .randomCharactersInAddressFieldWarning()
            .shouldBeVisible();
    }

    expectLeadingTrailingSpacesWarning(){
        this
            .elements
            .addressLeadingTrailingSpacesWarning()
            .shouldBeVisible();
    }

    expectInvalidZipCodeWarning() {
        ClientManagement.action.waitFor(2000);
        this
            .elements
            .invalidZipCodeWarning()
            .shouldBeVisible();
    }

    openClientDetails(clientName){
        this.visit();
        this
            .elements
            .clientRecord(clientName)
            .clickElement();
    }

    expectClientNameToBe(clientName){
        this
            .elements
            .clientDetails.clientName()
            .shouldContain(clientName);
    }

    expectClientAddressToBe(clientAddress){
        this
            .elements
            .clientDetails.clientAddress()
            .shouldContain(clientAddress);
    }

    expectClientCityToBe(clientCity){
        this
            .elements
            .clientDetails.clientCity()
            .shouldContain(clientCity);
    }

    expectClientStateToBe(clientState){
        this
            .elements
            .clientDetails.clientState()
            .shouldContain(clientState);
    }

    expectClientCountryToBe(clientCountry){
        this
            .elements
            .clientDetails.clientCountry()
            .shouldContain(clientCountry);
    }

    expectClientZipCodeToBe(clientZipCode){
        this
            .elements
            .clientDetails.clientZipCode()
            .shouldContain(clientZipCode);
    }
}

export { ClientManagement };