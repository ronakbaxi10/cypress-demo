import LogInPage from '../../pageObjects/login/loginPage.js';
import HomePage from '../../pageObjects/homePage.js';

let username = Cypress.env('username')
let password = Cypress.env('password')

describe('Successful Login', () => {

  it('Successful Login', () => {
    cy.task("log","******************************Attempting a successful Login***************************");
    cy.visit('/analyser/Default.aspx');  
    LogInPage.login(username,password);
    HomePage.logout();  
});
})