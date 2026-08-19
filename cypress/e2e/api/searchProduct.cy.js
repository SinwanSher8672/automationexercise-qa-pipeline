describe('API - Search Product', () => {
  it('should return matching products for a valid search term', () => {
    cy.request({
      method: 'POST',
      url: '/api/searchProduct',
      form: true,
      body: {
        search_product: 'Dress'
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.responseCode).to.eq(200)
      expect(response.body.products).to.be.an('array')
      expect(response.body.products.length).to.be.greaterThan(0)
    })
  })

  it('should return empty results for a non-existent product', () => {
    cy.request({
      method: 'POST',
      url: '/api/searchProduct',
      form: true,
      body: {
        search_product: 'zzzznonexistentproduct123'
      }
    }).then((response) => {
      expect(response.body.responseCode).to.eq(200)
      expect(response.body.products).to.have.length(0)
    })
  })

  it('should fail when search_product parameter is missing', () => {
    cy.request({
      method: 'POST',
      url: '/api/searchProduct',
      form: true,
      failOnStatusCode: false,
      body: {}
    }).then((response) => {
      expect(response.body.responseCode).to.eq(400)
      expect(response.body.message).to.eq('Bad request, search_product parameter is missing in POST request.')
    })
  })

  it('should return 405 for GET method', () => {
    cy.request({
      method: 'GET',
      url: '/api/searchProduct',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.body.responseCode).to.eq(405)
    })
  })
})