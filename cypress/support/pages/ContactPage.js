class ContactPage {
  visit() {
    cy.visit('/contact_us')
  }

  fillForm({ name, email, subject, message }) {
    cy.get('input[data-qa="name"]').type(name)
    cy.get('input[data-qa="email"]').type(email)
    cy.get('input[data-qa="subject"]').type(subject)
    cy.get('textarea[data-qa="message"]').type(message)
  }

  submit() {
    cy.on('window:confirm', () => true)
    cy.get('input[data-qa="submit-button"]').click()
  }

  clickSubmit(){
    cy.get('input[data-qa="submit-button"]').click()
  }

  getSuccessMessage() {
    return cy.contains('Success! Your details have been submitted successfully.')
  }
}

export default new ContactPage()