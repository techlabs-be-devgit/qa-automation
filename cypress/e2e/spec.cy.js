import { login } from "../support/auth";

// describe('template spec', () => {
//   it('TC_LF_001', () => {

//     cy.visit(DEMO_URL)
//     cy.get('button').click()

//     cy.origin(LOGIN_URL, /*{ args: [USER_EMAIL, PASSWORD] },*/ ( /* {args} */ ) =>  {
//       cy.get('input[type="email"]').type('c2c_demo@matchps.com')
//       cy.get('input[type="submit"]').click()
//       cy.get('input[type="password"]').type('GunsR0s3sBlvd')
//       cy.get('input[type="submit"]').click()
//       cy.get('input[type="submit"]').click()
//     })
//     cy.url().should('include', '/dashboard')
//     cy.pause()

    
//   })
// })

// describe ('Azure Active Directory Login', () => {
//   beforeEach(() => {
//     cy.visit(DEMO_URL)
//     cy.get('button').click()
//     cy.loginToAAD(Cypress.env('aad_username'), Cypress.env('aad_password'))
//   })

//   it('TC_LF_001', () => {
//     cy.url().should('include', '/dashboard')
//     cy.pause()
//   })
// })

context("viewDashboard", () => {
  beforeEach(() => {
    login();
  });
  
  it("goes to dashboard", () => {
    cy.visit("/")
    cy.visit("/dashboard")
  })
})