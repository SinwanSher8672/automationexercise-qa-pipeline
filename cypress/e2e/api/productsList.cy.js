describe('API - Products List', () => {
  it('should return 200 and a list of products', () => {
    cy.request({
      method: 'GET',
      url: '/api/productsList'
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.responseCode).to.eq(200)
      expect(response.body.products).to.be.an('array')
      expect(response.body.products.length).to.be.greaterThan(0)
    })
  })

  it('should return 405 for unsupported POST method', () => {
    cy.request({
      method: 'POST',
      url: '/api/productsList',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.body.responseCode).to.eq(405)
      expect(response.body.message).to.eq('This request method is not supported.')
    })
  })
})