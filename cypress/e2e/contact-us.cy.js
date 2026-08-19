import ContactPage from '../support/pages/ContactPage'

describe('Contact Us Form - Regression', () => {
  beforeEach(() => {
    ContactPage.visit()
  })

  it('should submit the contact form successfully with valid data', () => {
    ContactPage.fillForm({
      name: 'Sinwan Sher',
      email: 'sinwanqa@test.com',
      subject: 'Test Inquiry',
      message: 'This is a test message for automation practice.'
    })
    ContactPage.submit()
    ContactPage.getSuccessMessage().should('be.visible')
  })

  it('should not submit with empty required fields', () => {
    ContactPage.clickSubmit()
cy.get('input[data-qa="email"]:invalid')  })
})