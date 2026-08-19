describe('API - Update & Delete Account', () => {
  it('should create, update, then delete an account (full lifecycle)', () => {
    const email = `sinwanlifecycle${Date.now()}@test.com`

    cy.request({
      method: 'POST',
      url: '/api/createAccount',
      form: true,
      body: {
        name: 'Lifecycle Test',
        email: email,
        password: 'Test@1234',
        title: 'Mr',
        birth_date: '1',
        birth_month: '1',
        birth_year: '1995',
        firstname: 'Lifecycle',
        lastname: 'Test',
        address1: 'Test Address',
        country: 'Pakistan',
        zipcode: '25000',
        state: 'KPK',
        city: 'Peshawar',
        mobile_number: '03001234567'
      }
    }).then((createResponse) => {
      const createBody = createResponse.body && typeof createResponse.body === 'object'
        ? createResponse.body
        : JSON.parse(createResponse.body)

      expect(createBody.responseCode).to.eq(201)

      cy.request({
        method: 'PUT',
        url: '/api/updateAccount',
        form: true,
        body: {
          name: 'Updated Name',
          email: email,
          password: 'Test@1234',
          title: 'Mr',
          birth_date: '1',
          birth_month: '1',
          birth_year: '1995',
          firstname: 'Updated',
          lastname: 'Name',
          address1: 'Updated Address',
          country: 'Pakistan',
          zipcode: '25000',
          state: 'KPK',
          city: 'Peshawar',
          mobile_number: '03009876543'
        }
      }).then((updateResponse) => {
        const updateBody = updateResponse.body && typeof updateResponse.body === 'object'
          ? updateResponse.body
          : JSON.parse(updateResponse.body)

        expect(updateBody.responseCode).to.eq(200)
        expect(updateBody.message).to.eq('User updated!')

        cy.request({
          method: 'DELETE',
          url: '/api/deleteAccount',
          form: true,
          body: { email: email }
        }).then((deleteResponse) => {
          const deleteBody = deleteResponse.body && typeof deleteResponse.body === 'object'
            ? deleteResponse.body
            : JSON.parse(deleteResponse.body)

          expect(deleteBody.responseCode).to.eq(200)
          expect(deleteBody.message).to.eq('Account deleted!')
        })
      })
    })
  })

  it('should fail to delete a non-existent account', () => {
    cy.request({
      method: 'DELETE',
      url: '/api/deleteAccount',
      form: true,
      failOnStatusCode: false,
      body: { email: 'thisEmailDoesNotExist@test.com' }
    }).then((response) => {
      const body = response.body && typeof response.body === 'object'
        ? response.body
        : JSON.parse(response.body)

      expect(body.responseCode).to.eq(404)
      expect(body.message).to.eq('Account not found!')
    })
  })
})