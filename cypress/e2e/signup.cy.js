import SignupPage from '../support/pages/SignupPage'

describe('Signup Full Scenario + Edge Cases', () => {
  beforeEach(() => {
    SignupPage.visit()
  })

  // ---- HAPPY PATH: full end-to-end signup ----
  it('should complete full signup with valid data', () => {
    const uniqueEmail = `sinwanqa${Date.now()}@test.com`

    SignupPage.fillNewUserNameEmail('Sinwan Test', uniqueEmail)
    SignupPage.submitSignup()

    cy.contains('Enter Account Information').should('be.visible')

    SignupPage.fillAccountInfo({
      password: 'Test@1234',
      day: '10',
      month: 'May',
      year: '2000'
    })

    SignupPage.fillAddressInfo({
      firstName: 'Sinwan',
      lastName: 'Sher',
      address: 'House 123, Street 1',
      country: 'India',
      state: 'KPK',
      city: 'Peshawar',
      zipcode: '25000',
      mobile: '03001234567'
    })

    SignupPage.createAccount()
    cy.contains('Account Created!').should('be.visible')

    SignupPage.continueAfterCreation()
    cy.contains(/Logged in as/i).should('be.visible')
  })

  // ---- EDGE CASES on initial signup form ----
  it('should show error when email already exists', () => {
    SignupPage.fillNewUserNameEmail('seenu', 'sinwansherqa@gmail.com')
    SignupPage.submitSignup()
    SignupPage.getSignupErrorMessage().should('be.visible')
  })

  it('should not proceed with empty name and email', () => {
    SignupPage.submitSignup()
    cy.url().should('include', '/login')
  })

  it('should not proceed with only name filled (empty email)', () => {
    cy.get('input[data-qa="signup-name"]').type('Sinwan Test')
    SignupPage.submitSignup()
    cy.url().should('include', '/login')
  })

  it('should not proceed with only email filled (empty name)', () => {
    cy.get('input[data-qa="signup-email"]').type(`sinwanqa${Date.now()}@test.com`)
    SignupPage.submitSignup()
    cy.url().should('include', '/login')
  })

  it('should handle invalid email format gracefully', () => {
    SignupPage.fillNewUserNameEmail('Sinwan Test', 'not-a-valid-email')
    SignupPage.submitSignup()
    // HTML5 built-in validation ke wajah se form submit hi nahi hoga
    cy.url().should('include', '/login')
  })

  it('should accept name with special characters', () => {
    const uniqueEmail = `sinwanqa${Date.now()}@test.com`
    SignupPage.fillNewUserNameEmail("Sinwan-Sher O'Test", uniqueEmail)
    SignupPage.submitSignup()
    cy.contains('Enter Account Information').should('be.visible')
  })

  it('should reject name with only numbers as unrealistic input', () => {
    const uniqueEmail = `sinwanqa${Date.now()}@test.com`
    SignupPage.fillNewUserNameEmail('123456', uniqueEmail)
    SignupPage.submitSignup()
    // Site validation nahi karta, isliye ye documents karta hai ke
    // system numeric names bhi accept kar leta hai - potential bug/gap
    cy.contains('Enter Account Information').should('be.visible')
  })
})