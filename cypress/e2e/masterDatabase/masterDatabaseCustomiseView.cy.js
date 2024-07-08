import LogInPage from '../../pageObjects/login/loginPage.js';
import HomePage from '../../pageObjects/homePage.js';
import MasterDatabasePage from '../../pageObjects/masterDatabase/masterDatabasePage.js';

let username = Cypress.env('username')
let password = Cypress.env('password')

describe('Check you can customise the Master Database View', () => {

  it('Check you can customise the Master Database View', () => {
    cy.visit('/guardian/Default.aspx');  
    LogInPage.login(username,password)
    HomePage.clickAndCheckLeftHandMenuLink('Master Database');
    MasterDatabasePage.clickCustomiseViewButton();
    MasterDatabasePage.customiseViewAddColumn('Point Type Text');
    MasterDatabasePage.checkColumnTitleIsDisplayed('Point Type Text');
    MasterDatabasePage.clickCustomiseViewButton();
    MasterDatabasePage.customiseViewRemoveColumn('Point Type Text');
    MasterDatabasePage.checkColumnTitleIsNotDisplayed('Point Type Text');
    HomePage.logOut();
});
})