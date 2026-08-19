class SignupPage {
  visit() {
    cy.visit('https://automationexercise.com/login')
  }

  fillNewUserNameEmail(name, email) {
    cy.get('input[data-qa="signup-name"]').clear().type(name)
    cy.get('input[data-qa="signup-email"]').clear().type(email)
  }

  submitSignup() {
    cy.get('button[data-qa="signup-button"]').click()
  }

  getSignupErrorMessage() {
    return cy.contains('Email Address already exist!')
  }

  // Naye methods - Account Information step ke liye
  fillAccountInfo({ password, day, month, year }) {
    cy.get('#id_gender1').check() // Mr
    cy.get('#password').type(password)
    cy.get('#days').select(day)
    cy.get('#months').select(month)
    cy.get('#years').select(year)
    cy.get('#newsletter').check()
    cy.get('#optin').check()
  }

  fillAddressInfo({ firstName, lastName, address, country, state, city, zipcode, mobile }) {
    cy.get('#first_name').type(firstName)
    cy.get('#last_name').type(lastName)
    cy.get('#address1').type(address)
    cy.get('#country').select(country)
    cy.get('#state').type(state)
    cy.get('#city').type(city)
    cy.get('#zipcode').type(zipcode)
    cy.get('#mobile_number').type(mobile)
  }

  createAccount() {
    cy.get('button[data-qa="create-account"]').click()
  }

  continueAfterCreation() {
    cy.get('a[data-qa="continue-button"]').click()
  }
}

export default new SignupPage()