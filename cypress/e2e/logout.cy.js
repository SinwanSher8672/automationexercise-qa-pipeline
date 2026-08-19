import NavbarPage from '../support/pages/NavbarPage'

describe('Logout Flow - Regression', () => {
  it('should logout successfully and redirect to login page', () => {
    cy.loginBySession('sinwansherqa@gmail.com', '123456')
    cy.visit('/')
    NavbarPage.logout()
    cy.contains('Login to your account').should('be.visible')
  })
})