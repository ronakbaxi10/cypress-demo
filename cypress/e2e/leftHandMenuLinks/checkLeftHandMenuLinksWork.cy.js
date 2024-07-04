import LogInPage from '../../pageObjects/login/loginPage.js';
import HomePage from '../../pageObjects/homePage.js';

let username = Cypress.env('username')
let password = Cypress.env('password')

describe('Check all Top Menu Links are Working', () => {

  it('Check all Top Menu Links are Working', () => {
    cy.visit('/guardian/Default.aspx');  
    LogInPage.loginRememberMe(username,password)
    HomePage.clickAndCheckLeftHandMenuLink('Projects Overview');
    HomePage.clickAndCheckLeftHandMenuLink('Master Database');
    HomePage.clickAndCheckLeftHandMenuLink('Dashboards');
    HomePage.clickAndCheckLeftHandMenuLink('Reports');
    HomePage.clickAndCheckLeftHandMenuLink('Action List');
    //Test the Admin Sub Menus
    HomePage.clickAndCheckLeftHandMenuLink_AdminSubMenu('Project Manager');
    HomePage.clickAndCheckLeftHandMenuLink_AdminSubMenu('Datasource Manager');
    HomePage.clickAndCheckLeftHandMenuLink_AdminSubMenu('Template Manager');
    HomePage.clickAndCheckLeftHandMenuLink_AdminSubMenu('Import/Export Manager');
    HomePage.clickAndCheckLeftHandMenuLink_AdminSubMenu('Priority Manager');
    HomePage.clickAndCheckLeftHandMenuLink_AdminSubMenu('User Manager');
    //Test the System Sub Menus
    HomePage.clickAndCheckLeftHandMenuLink_SystemSubMenu('System Activity');
    HomePage.clickAndCheckLeftHandMenuLink_SystemSubMenu('System Event');
    HomePage.logOut();
});
})