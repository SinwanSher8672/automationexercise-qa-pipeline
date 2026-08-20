describe('API - Update & Delete Account', () => {
  const email = `sinwanlifecycle${Date.now()}@test.com`
  const originalPassword = 'Test@1234'

  const accountData = {
    name: 'Lifecycle Test',
    email: email,
    password: originalPassword,
    title: 'Mr',
    birth_date: '1',
    birth_month: '1',
    birth_year: '1995',
    firstname: 'Lifecycle',
    lastname: 'Test',
    company: 'TestCo',
    address1: 'Test Address',
    address2: 'Suite 1',
    country: 'Pakistan',
    zipcode: '25000',
    state: 'KPK',
    city: 'Peshawar',
    mobile_number: '03001234567'
  }

  it('should create the account first', () => {
    cy.request({
      method: 'POST',
      url: '/api/createAccount',
      form: true,
      body: accountData
    }).then((response) => {
      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body
      cy.log('CREATE RESPONSE: ' + JSON.stringify(body))
      expect(body.responseCode).to.eq(201)
    })
  })

  it('should update the same account', () => {
    const updatedData = { ...accountData, name: 'Updated Name', firstname: 'Updated' }

    cy.request({
      method: 'PUT',
      url: '/api/updateAccount',
      form: true,
      failOnStatusCode: false,
      body: updatedData
    }).then((response) => {
      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body
      cy.log('UPDATE RESPONSE: ' + JSON.stringify(body))
      expect(body.responseCode).to.eq(200)
    })
  })
})