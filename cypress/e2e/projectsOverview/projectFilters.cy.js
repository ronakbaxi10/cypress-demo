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
    ProjectViewPage.enterFilterValue('Updated Date','02/07/2024 00:00');
    ProjectViewPage.checkRow1ColumnFieldContainsValue('Updated Date','02/07/2024');
    ProjectViewPage.clearSelectedFilters();
    ProjectViewPage.enterFilterValue('Tag Name','A1001');
    ProjectViewPage.checkRow1ColumnFieldContainsValue('Tag Name','A1001');
    ProjectViewPage.clearSelectedFilters();
    ProjectViewPage.enterFilterValue('Tag Description','D1002');
    ProjectViewPage.checkRow1ColumnFieldContainsValue('Tag Description','D1002');
    ProjectViewPage.clearSelectedFilters();
    ProjectViewPage.enterFilterValue('Has Alarm','Checked');
    //ProjectViewPage.checkRow1ColumnFieldContainsValue('Has Alarm','Checked'); //No date returned at the time of writing
    ProjectViewPage.clearSelectedFilters();
    ProjectViewPage.enterFilterValue('Template','Digital');
    ProjectViewPage.checkRow1ColumnFieldContainsValue('Template','Digital');
    ProjectViewPage.clearSelectedFilters();
    ProjectViewPage.enterFilterValue('Revision','0.0');
    ProjectViewPage.checkRow1ColumnFieldContainsValue('Revision','0.0');
    ProjectViewPage.clearSelectedFilters();
    ProjectViewPage.enterFilterValue('Under Review By','pvadmin');
    //ProjectViewPage.checkRow1ColumnFieldContainsValue('Under Review By','Matt');  //No date returned at the time of writing
    ProjectViewPage.clearSelectedFilters();
    ProjectViewPage.enterFilterValue('Signed','signed');
    //ProjectViewPage.checkRow1ColumnFieldContainsValue('Signed','signed');  //No date returned at the time of writing
    ProjectViewPage.clearSelectedFilters();
    ProjectViewPage.enterFilterValue('Status','Approved');
    //ProjectViewPage.checkRow1ColumnFieldContainsValue('Status','Approved'); //No date returned at the time of writing
    ProjectViewPage.clearSelectedFilters();
    HomePage.logOut();
});
})