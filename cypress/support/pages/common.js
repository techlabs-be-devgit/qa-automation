/// <reference types="Cypress" />

import { Action } from '../actions/action';

class Common {
    elements = {
        addClientButton : () => this.action.get('button').contains('Add Client'),
        addEstimationButton : () => this.action.get('button').contains('Add Estimation'),
        addPricingButton : () => this.action.get('button').contains('Add Pricing'),
        addContractButton : () => this.action.get('button').contains('Add Contract'),
        addMilestoneButton : () => this.action.get('button').contains('Add Milestone'),
        addPurchaseOrderButton : () => this.action.get('button').contains('Add Purchase Order'),
        addAllocationButton : () => this.action.get('button').contains('Add Allocation'),
        clientRecord: (clientName) => this.action.get('span').contains(clientName),
        effortEstimationNavigation: () => this.action.get('div').contains('Effort Estimation'),
        estimationNavigation: () => this.action.get('div').contains('Estimation'),
        pricingNavigation: () => this.action.get('div').contains('Pricing'),
        sowContractNavigation: () => this.action.get('div').contains('SOWContract'),
        contractsNavigation: () => this.action.get('div').contains('Contracts'),
        milestoneNavigation: () => this.action.get('div').contains('Milestones'),
        purchaseOrderNavigation: () => this.action.get('div').contains('Purchase Orders'),
        allocationNavigation: () => this.action.get('div').contains('Allocations'),
        editButton: () => this.action.get('button').contains('Edit'),
        deleteButton: (recordLabel) => this
                                        .action
                                        .xpath(`//span[text()="${recordLabel}"]/ancestor::td/ancestor::tr//td//span//button`),
    };

    constructor() {
        this.action = new Action();
    }

    visitDashboard() {
        this.action.visit('/dashboard');
    }

    visitEstimation(clientName) {
        this.visitDashboard();
        this.elements.clientRecord(clientName).click();
        this.elements.estimationNavigation().click();
        this.elements.effortEstimationNavigation().click();
    }

    visitPricing(clientName) {
        this.visitDashboard();
        this.elements.clientRecord(clientName).click();
        this.elements.estimationNavigation().click();
        this.elements.pricingNavigation().click();
    }

    visitContracts(clientName) {
        this.visitDashboard();
        this.elements.clientRecord(clientName).click();
        this.elements.sowContractNavigation().click();
        this.elements.contractsNavigation().click();
    }

    visitMilestone(clientName) {
        this.visitDashboard();
        this.elements.clientRecord(clientName).click();
        this.elements.sowContractNavigation().click();
        this.elements.milestoneNavigation().click();
    }

    visitPurchaseOrder(clientName) {
        this.visitDashboard();
        this.elements.clientRecord(clientName).click();
        this.elements.sowContractNavigation().click();
        this.elements.purchaseOrderNavigation().click();
    }

    visitAllocations(clientName) {
        this.visitDashboard();
        this.elements.clientRecord(clientName).click();
        this.elements.allocationNavigation().click();
    }

    expectUrlToContain(url) {
        this.action.url().should('contain', url);
    }
}

export { Common };
