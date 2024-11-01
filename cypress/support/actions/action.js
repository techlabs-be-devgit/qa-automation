/**
 * @abstract Base class for high level actions.
 * Most functions return an instance of the Action class, allowing chaining of actions.
 */

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
    visitPage(url) {
        this.element = cy.visit(url).wait(2000);
        return this;
    }

    /**
     * 
     * Click selected element
     */
    clickElement() {
        if (this.element) {
            this.element.click();
        }
        else {
            throw new Error('No element selected to click.')
        }
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
        this.element = cy.get(element).contains(label)
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
     */
    getElementWithAttribute(attribute, value) {
        this.element = cy.get(`[${attribute}="${value}"]`);
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
        this.element.type(dateString);
        return this;
    }

    /**
     * 
     * Select @option from a dropdown menu
     */
    selectFromDropdown(option) {
        this
            .clickElement()
            .getElementMatching('li', option)
            .element.scrollIntoView().click();
        return this;
    }

    // Assertions
    shouldBeVisible() {
        if (this.element) {
            this.element.should('be.visible');
        }
        else {
            throw new Error('No element selected')
        }
        return this;
    }

    shouldContain(text) {
        if (this.element) {
            this.element.should('contain', text);
        }
        else {
            throw new Error('No element selected')
        }
        return this;
    }
}

export { Action };
