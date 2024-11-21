import { login } from './utils/auth'


Cypress.Commands.add('login', (user) => {
    return login(user);
});
