import ProductsPage from '../support/pages/ProductsPage'

describe('Product Search + Add to Cart', () => {
  beforeEach(() => {
    ProductsPage.visit()
  })

  it('should display the products page', () => {
    cy.contains('All Products').should('be.visible')
  })

  it('should search for a valid product and show results', () => {
    ProductsPage.searchProduct('Dress')
    ProductsPage.getSearchResultsHeading().should('be.visible')
    cy.get('.product-image-wrapper').should('have.length.greaterThan', 0)
  })

  it('should show no results for a non-existent product', () => {
    ProductsPage.searchProduct('zzzznonexistentproduct123')
    ProductsPage.getSearchResultsHeading().should('be.visible')
    cy.get('.product-image-wrapper').should('have.length', 0)
  })

  it('should not search with empty search field', () => {
    cy.get('#submit_search').click()
    cy.url().should('include', '/products')
  })

  it('should add a product to cart and reflect in cart count', () => {
    ProductsPage.addFirstProductToCart()
    cy.contains('Added!').should('be.visible')
    ProductsPage.viewCart()
    cy.get('#cart_info_table').should('be.visible')
    cy.get('#cart_info_table tbody tr').should('have.length.greaterThan', 0)
  })

  it('should allow continuing shopping after adding to cart', () => {
    ProductsPage.addFirstProductToCart()
    ProductsPage.continueShopping()
    cy.contains('All Products').should('be.visible')
  })
})