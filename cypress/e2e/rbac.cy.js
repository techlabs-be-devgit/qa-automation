import { Action } from '../support/actions/action';
import { ClientManagement } from '../support/pages/client_management';
import { Common } from '../support/pages/common';

const action = new Action();
const rbac = new Common();
const users = Cypress.env('users');

users.forEach(user => {
    describe("Role based access testing for " + user.email, () => {
        before(() =>{
            action.login(user);
        });

        beforeEach(() => {
            action.window().then((window) => {
                const userData = JSON.parse(window.localStorage.getItem('userData'));
                const userRoles = userData.user_roles;
                action.getUserRoles(userRoles).then(permissions => {
                    action.wrap(permissions).as('userPermissions');
                }); 
            });
            action.get('@userPermissions').should('exist');
        });

        it("Visits client management page", () => {
            action.get('@userPermissions').then(permissions => {
                rbac.visitDashboard();
                if (permissions.client_read) {
                    rbac.expectUrlToContain('/dashboard');
                } else {
                    rbac.expectUrlToContain('/timesheet/empTimesheet');
                }
            });
        });

        it("Adds a new client", () => {
            action.get('@userPermissions').then(permissions => {
                rbac.visitDashboard();
                if (permissions.client_create) {
                    rbac.elements.addClientButton().should('be.visible');
                } else {
                    rbac.elements.addClientButton().should('not.exist');
                }
            });
        });

        it("Edits a client", () => {
            action.get('@userPermissions').then(permissions => {
                rbac.visitDashboard();
                rbac.elements.clientRecord('New test').click();
                if (permissions.client_update) {
                    rbac.elements.editButton().should('be.visible');
                } else {
                    rbac.elements.editButton().should('not.exist');
                }
            });
        });

        it("Deletes a client", () => {
            action.get('@userPermissions').then(permissions => {
                rbac.visitDashboard();
                if (permissions.client_delete) {
                    rbac.elements.deleteButton('New test').should('be.visible');
                } else {
                    rbac.elements.deleteButton('New test').should('not.exist');
                }
            });
        });
    });
});