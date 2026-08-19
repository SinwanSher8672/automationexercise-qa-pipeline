class NavbarPage {
  logout() {
    cy.contains('Logout').click()
  }

  goToContactUs() {
    cy.contains('Contact us').click()
  }
}

export default new NavbarPage()