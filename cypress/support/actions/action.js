/**
 * @abstract Base class for high level actions.
 * Most functions return an instance of the Action class, allowing chaining of actions.
 */

class Action {

    constructor() {
        this.element = null;
    }

    c2cLogin(){
        this.element = cy.login();
        return this;
    }

    /**
     * 
     * @param url The url to visit.
     */
    visitPage(url){
        this.element = cy.visit(url).wait(2000);
        return this;
    }
    

    clickElement(){
        if(this.element){
            this.element.click();
        }
        else{
            throw new Error('No element selected to click.')   
        }
        return this;
    }

    /**
     * 
     * @param {*} element HTML tag of the element to find.
     * @param {*} label Label of the element to find.
     * @returns 
     */
    getElementByLabel(element, label){
        this.element = cy.get(element).contains(label)
        return this;
    }

    /**
     * 
     * @param {*} id ID of the element to find.
     * @returns 
     */
    getElementById(id){
        this.element = cy.get(`#${id}`)
        return this;
    }

    /**
     * 
     * @param {*} text Text to type into the element.
     * @returns 
     */
    typeText(text){
        if (this.element){
            this.element.type(text);
        } else {
            throw new Error('No element selected to type in');
        }
        return this;
    }

    selectDateFromDropdown(){
        if(this.element){
            this.element.select();
        }
        else{
            throw new Error('No dropdown selected to select.')   
        }
        return this;
    } 

    shouldBeVisible(){
        if(this.element){
            this.element.should('be.visible');
        }
        else {
            throw new Error('No element selected')
        }
        return this;
    }

    shouldContain(text){
        if(this.element){
            this.element.should('contain', text);
        }
        else {
            throw new Error('No element selected')
        }
        return this;
    }
}

export { Action };
