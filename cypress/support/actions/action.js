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

    /**
     * 
     * Visit page at @url
     */
    visit(url) {
        this.element = cy.visit(url);
        return this;
    }

    /**
     * 
     * Click selected element
     */
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
     * Select an @element with text @label in it.
     * */

    getElementContaining(element, label) {
        if(typeof label ==='string'){
            this.element = cy.get(element).contains(label);
        } else {
            this.element = cy.get(element).contains(label.element, label.value);
        }
        return this;
    }

    /**
     * 
     * Select an element with @id
     */
    getElementWithId(id) {
        this.element = cy.get(`#${id}`)
        return this;
    }

    /**
     * 
     * Select an element with @attribute that has @value.
     * Additionally, pass the type of element to select as a string and the index in case of multiple matches as an integer
     * To get all possible matches without a specific index, pass false as the third argument.
     */
    getElementWithAttribute(attribute, value, ...args) {
        let element = '';
        let index = 0;
        let useIndex = true;
        args.forEach(arg => {
            if (typeof arg === 'string') {
                element = arg;
            } 
            if (typeof arg === 'number') {
                index = arg;
            }
            if (arg === false) {
                useIndex = arg;
            }
        });
        this.element = cy.get(`${element}[${attribute}="${value}"]`)
        if (useIndex) {
            this.element = this.element.eq(index);
        }
        return this;
    }

    /**
     *          
     * Return an element with @xpath
     * In case of multiple matches, select the @index th match.
     */
    getElementWithXpath(xpath, index = 0) {
        if (index == 0){
            this.element = cy.xpath(xpath);
        }
        else {
            this.element = cy.xpath(xpath).eq(index);
        }
        return this;
    }

    /**
     * 
     *  Select the @n th sibling of the selected element.
     */
    getNthSibling(n = 0){
        this.element = this.element.siblings().eq(n);
        return this;
    }
    
    /**
     * 
     * Type @text into the selected element.
     */
    typeText(text) {
        if (this.element) {
            this.element.type(text);
        } else {
            throw new Error('No element selected to type in');
        }
        return this;
    }

    /**
     * 
     * input Date with @day @month and @year
     */
    inputDate(day, month, year) {
        const dateString = `${String(year)}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        this.element.scrollIntoView().type(dateString);
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
            .element.scrollIntoView().click();
        return this;
    }

    waitFor(milliseconds){
        this.element = cy.wait(milliseconds);
        return this;
    }

    loadFixture(fixtureName) {
        return cy.fixture(fixtureName);
    }

    clearField(){
        if (this.element) {
            this.element.scrollIntoView().clear();
        } else {
            throw new Error('No element selected to clear')
        }
        return this;
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

    // Assertions
    shouldBeVisible() {
        if (this.element) {
            this.element.scrollIntoView().should('be.visible');
        }
        else {
            throw new Error('No element selected')
        }
        return this;
    }

    shouldContain(text) {
        if (this.element) {
            this.element.scrollIntoView().should('contain', text);
        }
        else {
            throw new Error('No element selected')
        }
        return this;
    }

    urlShouldContain(url) {
        if(this.element){
            this.element.url().should('contain', url);
        }
        else {
            throw new Error('No element selected')
        }
        return this;
    }

    shouldNotExist() {
        if (this.element) {
            this.element.should('not.exist');
        }
        else {
            throw new Error('No element selected')
        }
    }

    shouldHaveAttributeValue(attribute, value) {
        if (this.element) {
            this.element.should('have.attr', attribute, value);
        } else {
            throw new Error('No element selected')
        }
        return this;
    }

    shouldBeGTE(value) {
        if (this.element) {
            this.element.should('be.gte', value);
        } else {
            throw new Error('No element selected')
        }
        return this;
    }

    shouldBeLTE(value) {
        if (this.element) {
            this.element.should('be.lte', value);
        } else {
            throw new Error('No element selected')
        }
        return this;
    }

    shouldEqual(value) {
        if (this.element) {
            this.element.should('equal', value);
        } else {
            throw new Error('No element selected')
        }
        return this;
    }

    shouldHaveLength(length) {
        if (this.element) {
            this.element.should('have.length', length);
        } else {
            throw new Error('No element selected')
        }
        return this;
    }

    /**
     * 
     * Checks if the the selected element has CSS @property with @value
     */
    shouldHaveCSSProperty(property, value) {
        if (property.includes('color') && value.includes('#')) {
            const rgb = this.hexToRGB(value);
            value = rgb;
        }
        if (this.element) {
            this.element.should('have.css', property, value);
        } else {
            throw new Error('No element selected')
        }
        return this;
    }

    wrap(item) {
        this.element = cy.wrap(item);
        return this;
    }
}

export { Action };
