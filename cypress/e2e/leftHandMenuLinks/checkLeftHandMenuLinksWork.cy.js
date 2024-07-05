import LogInPage from '../../pageObjects/login/loginPage.js';
import HomePage from '../../pageObjects/homePage.js';
import HelpPage from '../../pageObjects/help/helpPage.js';

let username = Cypress.env('username')
let password = Cypress.env('password')

describe('Check Left Hand Menu Links are Working', () => {

  it('Check all Left Hand Menu Links are Working', () => {
    cy.visit('/guardian/Default.aspx');  
    LogInPage.login(username,password)
    HomePage.clickAndCheckLeftHandMenuLink('Projects Overview');
    HelpPage.clickAndCheckLeftHandMenuHelpLink('Projects Overview');
    cy.go('back')
    HomePage.clickAndCheckLeftHandMenuLink('Master Database');
    HelpPage.clickAndCheckLeftHandMenuHelpLink('Master Database');
    cy.go('back')
    HomePage.clickAndCheckLeftHandMenuLink('Dashboards');
    HelpPage.clickAndCheckLeftHandMenuHelpLink('Dashboards');
    cy.go('back')
    HomePage.clickAndCheckLeftHandMenuLink('Reports');
    HelpPage.clickAndCheckLeftHandMenuHelpLink('Reports');
    cy.go('back')
    HomePage.clickAndCheckLeftHandMenuLink('Action List');
    //HelpPage.clickAndCheckLeftHandMenuHelpLink('Action List'); - //This currently gives a 404 error
    //cy.go('back')
    //Test the Admin Sub Menus
    HomePage.clickAndCheckLeftHandMenuLink_AdminSubMenu('Project Manager');
    HelpPage.clickAndCheckLeftHandMenuHelpLink('Admin - Project Manager');
    cy.go('back')
    HomePage.clickAndCheckLeftHandMenuLink_AdminSubMenu('Datasource Manager');
    HelpPage.clickAndCheckLeftHandMenuHelpLink('Admin - Datasource Manager');
    cy.go('back')
    HomePage.clickAndCheckLeftHandMenuLink_AdminSubMenu('Template Manager');
    HelpPage.clickAndCheckLeftHandMenuHelpLink('Admin - Template Manager');
    cy.go('back')
    HomePage.clickAndCheckLeftHandMenuLink_AdminSubMenu('Import/Export Manager');
    HelpPage.clickAndCheckLeftHandMenuHelpLink('Admin - Import/Export Manager');
    cy.go('back')
    HomePage.clickAndCheckLeftHandMenuLink_AdminSubMenu('Priority Manager');
    //HelpPage.clickAndCheckLeftHandMenuHelpLink('Admin - Priority Manager'); //This currently doesn't have its own help page
    cy.go('back')
    HomePage.clickAndCheckLeftHandMenuLink_AdminSubMenu('User Manager');
    HelpPage.clickAndCheckLeftHandMenuHelpLink('Admin - User Manager');
    cy.go('back')
    //Test the System Sub Menus
    HomePage.clickAndCheckLeftHandMenuLink_SystemSubMenu('System Activity');
    HelpPage.clickAndCheckLeftHandMenuHelpLink('System - System Activity');
    cy.go('back')
    HomePage.clickAndCheckLeftHandMenuLink_SystemSubMenu('System Event');
    HelpPage.clickAndCheckLeftHandMenuHelpLink('System - System Event');
    cy.go('back')
    HomePage.logOut();
});
})