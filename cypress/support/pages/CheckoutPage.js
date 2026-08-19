class CheckoutPage {
  proceedToCheckout() {
    cy.contains('Proceed To Checkout').click()
  }

  getCartTotal() {
    return cy.get('.cart_total_price').last()
  }

  addOrderComment(comment) {
    cy.get('textarea[name="message"]').type(comment)
  }

  placeOrder() {
    cy.contains('Place Order').click()
  }

  fillPaymentDetails({ nameOnCard, cardNumber, cvc, expiryMonth, expiryYear }) {
    cy.get('input[data-qa="name-on-card"]').type(nameOnCard)
    cy.get('input[data-qa="card-number"]').type(cardNumber)
    cy.get('input[data-qa="cvc"]').type(cvc)
    cy.get('input[data-qa="expiry-month"]').type(expiryMonth)
    cy.get('input[data-qa="expiry-year"]').type(expiryYear)
  }

  confirmOrder() {
    cy.get('#submit').click()
  }

  getOrderSuccessMessage() {
    return cy.contains('Congratulations! Your order has been confirmed!')
  }
}

export default new CheckoutPage()