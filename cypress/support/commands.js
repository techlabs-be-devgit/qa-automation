import { login } from './auth'

Cypress.Commands.add('login', () => {
    return login();
});