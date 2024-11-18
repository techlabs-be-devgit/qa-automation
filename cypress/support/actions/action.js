/**
 * @abstract Base class for high level actions.
 * Most functions return an instance of the Action class, allowing chaining of actions.
 */

import { hexToRGB } from "../utils/common";

class Action {

    constructor() {
        this.element = null;
    }

    c2cLogin() {
        this.element = cy.login();
        return this;
    }
    
    visit(url) {
        this.element = cy.visit(url);
        return this;
    }

    click(...args) {
        this.element.click(...args);
        return this;
    }

    get(...args) {
        this.element = cy.get(...args);
        return this;
    }

    eq(index) {
        this.element.eq(index);
        return this;
    }

    should(...args){
        this.element.should(...args);
        return this;
    }

    contains(...args) {
        this.element.contains(...args);
        return this;
    }

    xpath(...args) {
        this.element = cy.xpath(...args);
        return this;
    }

    type(...args) {
        this.element.type(...args);
        return this;
    }

    clear(...args) {
        this.element.clear(...args);
        return this;
    }

    scrollIntoView(...args) {
        this.element.scrollIntoView(...args);
        return this;
    }

    siblings(...args) {
        this.element.siblings(...args);
        return this;
    }

    /**
     * 
     * Select an @element that has the text @label on it - for exact matches.
     */
    getElementMatching(element, label) {
        const regex = new RegExp(`^${label}$`);
        this.element = cy.get(element).contains(regex)
        return this;
    }

    /**
     * 
     * Select @option from a dropdown menu
     */
    selectFromDropdown(option) {
        this
            .click()
            .getElementMatching('li', option)
            .element
            .click();
        return this;
    }

    waitFor(milliseconds){
        this.element = cy.wait(milliseconds);
        return this;
    }

    loadFixture(fixtureName) {
        return cy.fixture(fixtureName);
    }

    uploadFile(fileName, ...args) {
            this.element.selectFile(`cypress/fixtures/${fileName}`, ...args);
    }

    getAttributeValue(attribute) {
        if (this.element) {
            return this
                .element
                .invoke('attr', attribute)
        }
    }

    wrap(item) {
        this.element = cy.wrap(item);
        return this;
    }
}

export { Action };
