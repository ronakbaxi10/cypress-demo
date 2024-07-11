import LogInPage from '../../pageObjects/login/loginPage.js';
import HomePage from '../../pageObjects/homePage.js';
import MasterDatabasePage from '../../pageObjects/masterDatabase/masterDatabasePage.js';

let username = Cypress.env('username')
let password = Cypress.env('password')

describe('Check Master Database Filters work correctly', () => {

  it('Check Master Database Filters work correctly', () => {
    cy.visit('/guardian/Default.aspx');  
    LogInPage.login(username,password)
    HomePage.clickAndCheckLeftHandMenuLink('Master Database');
    MasterDatabasePage.enterAndCheckFilterValue('Tag Name','D10099');
    MasterDatabasePage.checkRow1ColumnFieldEqualsValue('Tag Name','D10099');
    MasterDatabasePage.clearSelectedFilters();
    MasterDatabasePage.enterAndCheckFilterValue('Project Name','Test Project');
    MasterDatabasePage.checkRow1ColumnFieldEqualsValue('Project Name','Test Project');
    MasterDatabasePage.clearSelectedFilters();
    MasterDatabasePage.enterAndCheckFilterValue('Tag Status','Deployed');
    MasterDatabasePage.checkRow1ColumnFieldEqualsValue('Tag Status','Deployed');
    MasterDatabasePage.clearSelectedFilters();
    MasterDatabasePage.enterAndCheckFilterValue('Template Name','Digital');
    MasterDatabasePage.checkRow1ColumnFieldEqualsValue('Template Name','Digital'); 
    MasterDatabasePage.clearSelectedFilters();
    MasterDatabasePage.enterAndCheckFilterValue('Has Alarms','Checked');
    MasterDatabasePage.checkRow1ColumnFieldEqualsValue('Has Alarms','Checked');
    MasterDatabasePage.clearSelectedFilters();
    HomePage.logOut();
});
})