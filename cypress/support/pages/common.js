/// <reference types="Cypress" />

import { Action } from './action';

class CommonPage {
    elements = {
        navBar: () => this.action.get('div').contains('navBar'), 
        clientRecord: (clientName) => this.action.get('div').contains(clientName),
        effortEstimationNavigation: () => this.action.get('div').contains('Effort Estimation'),
        estimationNavigation: () => this.action.get('div').contains('Estimation'),
        pricingNavigation: () => this.action.get('div').contains('Pricing'),
        sowContractNavigation: () => this.action.get('div').contains('SOWContract'),
        contractsNavigation: () => this.action.get('div').contains('Contracts'),
        milestoneTab: () => this.action.get('div').contains('Milestones'),
        purchaseOrderTab: () => this.action.get('div').contains('Purchase Orders'),
        allocationTab: () => this.action.get('div').contains('Allocations'),
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
        this.elements.milestoneTab().click();
    }

    visitPurchaseOrder(clientName) {
        this.visitDashboard();
        this.elements.clientRecord(clientName).click();
        this.elements.purchaseOrderTab().click();
    }

    visitAllocations(clientName) {
        this.visitDashboard();
        this.elements.clientRecord(clientName).click();
        this.elements.allocationTab().click();
    }
}

export { CommonPage };
