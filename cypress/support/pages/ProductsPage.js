class ProductsPage {
  visit() {
    cy.visit('https://automationexercise.com/products')
  }

  searchProduct(productName) {
    cy.get('#search_product').clear().type(productName)
    cy.get('#submit_search').click()
  }

  getSearchResultsHeading() {
    return cy.contains('Searched Products')
  }

  addFirstProductToCart() {
    cy.get('.product-image-wrapper').first().trigger('mouseover')
    cy.get('.product-overlay .add-to-cart').first().click({ force: true })
  }

  continueShopping() {
    cy.contains('Continue Shopping').click()
  }

  viewCart() {
    cy.contains('View Cart').click()
  }

  removeFromCart() {
    cy.get('.cart_quantity_delete').first().click()
  }

  updateCartQuantity(index, quantity) {
    cy.get('.cart_quantity input').eq(index).clear().type(quantity)
  }
}

export default new ProductsPage()