describe('API - Create Account', () => {
  it('should create a new account successfully', () => {
    const uniqueEmail = `sinwanapi${Date.now()}@test.com`

    cy.request({
      method: 'POST',
      url: '/api/createAccount',
      form: true,
      body: {
        name: 'Sinwan API Test',
        email: uniqueEmail,
        password: 'Test@1234',
        title: 'Mr',
        birth_date: '10',
        birth_month: '5',
        birth_year: '2000',
        firstname: 'Sinwan',
        lastname: 'Sher',
        address1: 'House 123',
        country: 'Pakistan',
        zipcode: '25000',
        state: 'KPK',
        city: 'Peshawar',
        mobile_number: '03001234567'
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.responseCode).to.eq(201)
      expect(response.body.message).to.eq('User created!')
    })
  })

  it('should not create account with an email that already exists', () => {
    cy.request({
      method: 'POST',
      url: '/api/createAccount',
      form: true,
      failOnStatusCode: false,
      body: {
        name: 'Duplicate Test',
        email: 'sinwansherqa@gmail.com',
        password: 'Test@1234'
      }
    }).then((response) => {
      expect(response.body.responseCode).to.eq(400)
      expect(response.body.message).to.eq('Email already exists!')
    })
  })

  it('should fail when required fields are missing', () => {
    cy.request({
      method: 'POST',
      url: '/api/createAccount',
      form: true,
      failOnStatusCode: false,
      body: {
        name: 'Incomplete Test'
      }
    }).then((response) => {
      expect(response.body.responseCode).to.eq(400)
    })
  })
})