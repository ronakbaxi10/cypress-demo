import LogInPage from '../../pageObjects/login/loginPage.js';

//*******THE EXPECTED ANALYSER VERSION COMES FROM cypress.config.js - so update it there if required*************** */
let analyserVersion = Cypress.env('analyserVersion')

describe('Check the expected version of Analyser is shown on the Login Page', () => {

  it('Successful Login', () => {
    cy.visit('/analyser/Default.aspx');  
    LogInPage.assertAnalyserVersion(analyserVersion)
});
})