import LogInPage from '../../pageObjects/login/loginPage.js';
import HomePage from '../../pageObjects/homePage.js';

let username = Cypress.env('username')
let password = Cypress.env('password')

describe('Check all Top Menu Links are Working', () => {

  it('Check all Top Menu Links are Working', () => {
    cy.visit('/guardian/Default.aspx');  
    LogInPage.login(username,password)
    HomePage.clickLeftHandMenuLink('Projects Overview');
    HomePage.clickLeftHandMenuLink('Master Database');
    HomePage.clickLeftHandMenuLink('Dashboards');
    HomePage.clickLeftHandMenuLink('Reports');
    HomePage.clickLeftHandMenuLink('Action List');
    cy.go('back')
    HomePage.logOut();
});
})