describe('API - Verify Login', () => {
  const registeredEmail = `sinwanlogin${Date.now()}@test.com`
  const registeredPassword = 'Test@1234'

  // Pehle ye account khud banate hain, taake login tests
  // kisi manual/external account pe depend na karein
  it('should create the account used for login tests', () => {
    cy.request({
      method: 'POST',
      url: '/api/createAccount',
      form: true,
      body: {
        name: 'Login Test User',
        email: registeredEmail,
        password: registeredPassword,
        title: 'Mr',
        birth_date: '1',
        birth_month: '1',
        birth_year: '1995',
        firstname: 'Login',
        lastname: 'Test',
        address1: 'Test Address',
        country: 'Pakistan',
        zipcode: '25000',
        state: 'KPK',
        city: 'Peshawar',
        mobile_number: '03001234567'
      }
    }).then((response) => {
      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body
      expect(body.responseCode).to.eq(201)
    })
  })

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
      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body
      expect(response.status).to.eq(200)
      expect(body.responseCode).to.eq(200)
      expect(body.message).to.eq('User exists!')
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
      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body
      expect(body.responseCode).to.eq(404)
      expect(body.message).to.eq('User not found!')
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
      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body
      expect(body.responseCode).to.eq(400)
      expect(body.message).to.eq('Bad request, email or password parameter is missing in POST request.')
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
      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body
      expect(body.responseCode).to.eq(400)
    })
  })

  it('should return 405 for GET method (not supported)', () => {
    cy.request({
      method: 'GET',
      url: '/api/verifyLogin',
      failOnStatusCode: false
    }).then((response) => {
      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body
      expect(body.responseCode).to.eq(405)
    })
  })
})