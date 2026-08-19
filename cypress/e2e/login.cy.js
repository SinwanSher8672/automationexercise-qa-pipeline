import LoginPage from '../support/pages/LoginPage'

describe('Login Smoke Suite', () => {
  const validEmail = 'sinwansherqa@gmail.com'
  const validPassword = '123456'

  beforeEach(() => {
    LoginPage.visit()
  })

  it('should display the login form', () => {
    cy.contains('Login to your account').should('be.visible')
  })

  it('should login successfully with valid credentials', () => {
    LoginPage.login(validEmail, validPassword)
    cy.contains(/Logged in as/i).should('be.visible')
  })

  it('should show error with invalid password', () => {
    LoginPage.login(validEmail, 'WrongPassword123')
    LoginPage.getErrorMessage().should('be.visible')
  })

  it('should show error with unregistered email', () => {
    LoginPage.login('notregistered@test.com', 'anypassword')
    LoginPage.getErrorMessage().should('be.visible')
  })

  it('should not login with empty fields', () => {
    LoginPage.submit()
    cy.url().should('include', '/login')
  })
})