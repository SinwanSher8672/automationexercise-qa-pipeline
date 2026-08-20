describe('API - Create Account', () => {
  const duplicateEmail = `sinwandup${Date.now()}@test.com`

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
      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body
      expect(response.status).to.eq(200)
      expect(body.responseCode).to.eq(201)
      expect(body.message).to.eq('User created!')
    })
  })

  // Alag test - pehle account banata hai
  it('should first create the account for duplicate test', () => {
    cy.request({
      method: 'POST',
      url: '/api/createAccount',
      form: true,
      body: {
        name: 'First Account',
        email: duplicateEmail,
        password: 'Test@1234',
        title: 'Mr',
        birth_date: '1',
        birth_month: '1',
        birth_year: '1995',
        firstname: 'First',
        lastname: 'Account',
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

  // Alag test - ab duplicate try karta hai
it('should not create account with an email that already exists', () => {
  cy.request({
    method: 'POST',
    url: '/api/createAccount',
    form: true,
    failOnStatusCode: false,
    body: {
      name: 'Duplicate Test',
      email: duplicateEmail,
      password: 'Test@1234',
      title: 'Mr',
      birth_date: '1',
      birth_month: '1',
      birth_year: '1995',
      firstname: 'Duplicate',
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
    expect(body.responseCode).to.eq(400)
    expect(body.message).to.eq('Email already exists!')
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
      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body
      expect(body.responseCode).to.eq(400)
    })
  })
})