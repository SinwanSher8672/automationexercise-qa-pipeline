import SubscriptionPage from '../support/pages/SubscriptionPage'

describe('Newsletter Subscription - Regression', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should subscribe successfully with a valid unique email', () => {
    const uniqueEmail = `sinwanqa${Date.now()}@test.com`
    SubscriptionPage.subscribeWithEmail(uniqueEmail)
    SubscriptionPage.getSuccessMessage().should('be.visible')
  })

  it('should not subscribe with invalid email format', () => {
    SubscriptionPage.subscribeWithEmail('not-an-email')
    cy.get('#susbscribe_email:invalid').should('exist')
  })
})