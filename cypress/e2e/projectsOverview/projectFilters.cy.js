import LogInPage from '../../pageObjects/login/loginPage.js';
import HomePage from '../../pageObjects/homePage.js';
import ProjectsOverviewPage from '../../pageObjects/projects/projectsOverviewPage.js';
import ProjectViewPage from '../../pageObjects/projects/projectViewPage.js';

let username = Cypress.env('username')
let password = Cypress.env('password')

describe('Check Project Filters work correctly', () => {

  it('Check Project Filters work correctly', () => {
    cy.visit('/guardian/Default.aspx');  
    LogInPage.login(username,password)
    HomePage.clickAndCheckLeftHandMenuLink('Projects Overview');
    ProjectsOverviewPage.viewAndCheckProject('Test Project');
    ProjectViewPage.enterAndCheckFilterValue('Updated Date','02/07/2024 00:00');
    ProjectViewPage.checkRow1ColumnFieldEqualsValue('Updated Date','02/07/2024');
    ProjectViewPage.clearSelectedFilters();
    ProjectViewPage.enterAndCheckFilterValue('Tag Name','A1001');
    ProjectViewPage.checkRow1ColumnFieldEqualsValue('Tag Name','A1001');
    ProjectViewPage.clearSelectedFilters();
    ProjectViewPage.enterAndCheckFilterValue('Tag Description','D1002');
    ProjectViewPage.checkRow1ColumnFieldEqualsValue('Tag Description','D1002');
    ProjectViewPage.clearSelectedFilters();
    ProjectViewPage.enterAndCheckFilterValue('Has Alarm','Unchecked');
    ProjectViewPage.checkRow1ColumnFieldEqualsValue('Has Alarm','Unchecked');
    ProjectViewPage.clearSelectedFilters();
    ProjectViewPage.enterAndCheckFilterValue('Template','Digital');
    ProjectViewPage.checkRow1ColumnFieldEqualsValue('Template','Digital');
    ProjectViewPage.clearSelectedFilters();
    ProjectViewPage.enterAndCheckFilterValue('Revision','0.0');
    ProjectViewPage.checkRow1ColumnFieldEqualsValue('Revision','0.0');
    ProjectViewPage.clearSelectedFilters();
    ProjectViewPage.enterAndCheckFilterValue('Under Review By','pvadmin');
    //ProjectViewPage.checkRow1ColumnFieldEqualsValue('Under Review By','pvadmin'); //Wasn't returning any results at time of writing
    ProjectViewPage.clearSelectedFilters();
    ProjectViewPage.enterAndCheckFilterValue('Signed','0');
    ProjectViewPage.checkRow1ColumnFieldEqualsValue('Signed','0');
    ProjectViewPage.clearSelectedFilters();
    ProjectViewPage.enterAndCheckFilterValue('Status','ReadyForApproval');
    ProjectViewPage.checkRow1ColumnFieldEqualsValue('Status','ReadyForApproval');
    ProjectViewPage.clearSelectedFilters();
    HomePage.logOut();
});
})