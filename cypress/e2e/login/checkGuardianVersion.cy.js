import LogInPage from '../../pageObjects/login/loginPage.js';

//*******THE EXPECTED GUARDIAN VERSION COMES FROM cypress.config.js - so update it there if required*************** */
let guardianVersion = Cypress.env('guardianVersion')

describe('Check the expected version of Guardian is shown on the Login Page', () => {

  it('Successful Login', () => {
    cy.visit('/guardian/Default.aspx');  
    LogInPage.assertGuardianVersion(guardianVersion)
});
})