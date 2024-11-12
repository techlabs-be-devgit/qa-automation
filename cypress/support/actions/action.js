/**
 * @abstract Base class for high level actions.
 * Most functions return an instance of the Action class, allowing chaining of actions.
 */
import 'cypress-file-upload';

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
    clickElement(position = '') {
        if (this.element) {
            if (position == ''){
                this.element.click({force:true});
            }
            else{
                this.element.click(position);
            }
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
     * Additionally, pass the type of element to select as a string and the index in case of multiple matches as an integer
     */
    getElementWithAttribute(attribute, value, ...args) {
        let element = '';
        let index = 0;
        args.forEach(arg => {
            if (typeof arg === 'string') {
                element = arg;
            } else if (typeof arg === 'number') {
                index = arg;
            }
        });
        this.element = cy.get(`${element}[${attribute}="${value}"]`).eq(index);
        return this;
    }

    /**
     *          
     * Return an element with @xpath
     * In case of multiple matches, select the @index th match.
     */
    getElementWithXpath(xpath, index = 0) {
        this.element = cy.xpath(xpath).eq(index);
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

    waitFor(milliseconds){
        this.element = cy.wait(milliseconds);
        return this;
    }

    loadFixture(fixtureName) {
        return cy.fixture(fixtureName);
    }

    clearField(){
        if (this.element) {
            this.element.clear();
        } else {
            throw new Error('No element selected to clear')
        }
    }

    uploadFile(fileName) {
        if (this.element) {
            this.element.selectFile(`cypress/fixtures/${fileName}`, {force: true});
        } else {
            throw new Error ('No element selected to upload file')
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

    shouldBeEnabled() {
        if (this.element) {
            this.element.should('be.enabled');
        } else {
            throw new Error('No element selected');
        }
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

    shouldHaveLength(length) {
        if (this.element) {
            this.element.should('have.length', length);
        } else {
            throw new Error('No element selected')
        }
        return this;
    }

   
}

export { Action };
