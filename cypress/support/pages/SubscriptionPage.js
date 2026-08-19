class SubscriptionPage {
  subscribeWithEmail(email) {
    cy.get('#susbscribe_email').type(email)
    cy.get('#subscribe').click()
  }

  getSuccessMessage() {
    return cy.contains('You have been successfully subscribed!')
  }
}

export default new SubscriptionPage()