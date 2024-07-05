import LogInPage from '../../pageObjects/login/loginPage.js';
import HomePage from '../../pageObjects/homePage.js';
import MasterDatabasePage from '../../pageObjects/masterDatabase/masterDatabasePage.js';

let username = Cypress.env('username')
let password = Cypress.env('password')

describe('Check Master Database Filters work correctly', () => {

  it('Check aster Database Filters work correctly', () => {
    cy.visit('/guardian/Default.aspx');  
    LogInPage.login(username,password)
    HomePage.clickAndCheckLeftHandMenuLink('Master Database');
    MasterDatabasePage.enterFilterValue('Tag Name','D10099');
    MasterDatabasePage.checkRow1ColumnFieldContainsValue('Tag Name','D10099');
    MasterDatabasePage.clearSelectedFilters();
    MasterDatabasePage.enterFilterValue('Project Name','Test Project');
    MasterDatabasePage.checkRow1ColumnFieldContainsValue('Project Name','Test Project');
    MasterDatabasePage.clearSelectedFilters();
    MasterDatabasePage.enterFilterValue('Tag Status','Deployed');
    MasterDatabasePage.checkRow1ColumnFieldContainsValue('Tag Status','Deployed');
    MasterDatabasePage.clearSelectedFilters();
    MasterDatabasePage.enterFilterValue('Template Name','Digital');
    MasterDatabasePage.checkRow1ColumnFieldContainsValue('Template Name','Digital'); 
    MasterDatabasePage.clearSelectedFilters();
    MasterDatabasePage.enterFilterValue('Has Alarms','Unchecked');
    MasterDatabasePage.checkRow1ColumnFieldContainsValue('Has Alarms','Unchecked');
    MasterDatabasePage.clearSelectedFilters();
    HomePage.logOut();
});
})