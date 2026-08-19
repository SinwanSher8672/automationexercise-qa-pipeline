class LoginPage {
  visit() {
    cy.visit('https://automationexercise.com/login')
  }

  fillEmail(email) {
    cy.get('input[data-qa="login-email"]').clear().type(email)
  }

  fillPassword(password) {
    cy.get('input[data-qa="login-password"]').clear().type(password)
  }

  submit() {
    cy.get('button[data-qa="login-button"]').click()
  }

  login(email, password) {
    this.fillEmail(email)
    this.fillPassword(password)
    this.submit()
  }

  getErrorMessage() {
    return cy.contains('Your email or password is incorrect!')
  }
}

export default new LoginPage()