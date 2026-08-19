describe('API - Verify Login', () => {
  const registeredEmail = 'sinwansherqa@gmail.com'
  const registeredPassword = '123456'

  it('should login successfully with valid credentials', () => {
    cy.request({
      method: 'POST',
      url: '/api/verifyLogin',
      form: true,
      body: {
        email: registeredEmail,
        password: registeredPassword
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.responseCode).to.eq(200)
      expect(response.body.message).to.eq('User exists!')
    })
  })

  it('should fail login with incorrect password', () => {
    cy.request({
      method: 'POST',
      url: '/api/verifyLogin',
      form: true,
      failOnStatusCode: false,
      body: {
        email: registeredEmail,
        password: 'WrongPassword123'
      }
    }).then((response) => {
      expect(response.body.responseCode).to.eq(404)
      expect(response.body.message).to.eq('User not found!')
    })
  })

  it('should fail login when email is missing', () => {
    cy.request({
      method: 'POST',
      url: '/api/verifyLogin',
      form: true,
      failOnStatusCode: false,
      body: {
        password: registeredPassword
      }
    }).then((response) => {
      expect(response.body.responseCode).to.eq(400)
      expect(response.body.message).to.eq('Bad request, email or password parameter is missing in POST request.')
    })
  })

  it('should fail login when both fields are missing', () => {
    cy.request({
      method: 'POST',
      url: '/api/verifyLogin',
      form: true,
      failOnStatusCode: false,
      body: {}
    }).then((response) => {
      expect(response.body.responseCode).to.eq(400)
    })
  })

  it('should return 405 for GET method (not supported)', () => {
    cy.request({
      method: 'GET',
      url: '/api/verifyLogin',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.body.responseCode).to.eq(405)
    })
  })
})