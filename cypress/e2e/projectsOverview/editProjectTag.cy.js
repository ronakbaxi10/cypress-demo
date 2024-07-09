import LogInPage from '../../pageObjects/login/loginPage.js';
import HomePage from '../../pageObjects/homePage.js';
import ProjectsOverviewPage from '../../pageObjects/projects/projectsOverviewPage.js';
import ProjectViewPage from '../../pageObjects/projects/projectViewPage.js';
import ViewEditTagDetailsPage from '../../pageObjects/projects/viewEditTagDetailsPage';
import UsefulFunctions from '../../helpers/usefulFunctions.js';

let username = Cypress.env('username')
let password = Cypress.env('password')
let newDescription = 'This is Analogue point A1001' + UsefulFunctions.generateRandomStringLettersOnly(10);

describe('Edit Project Tags', () => {

  it('Check you can edit Project Tags', () => {
    cy.visit('/guardian/Default.aspx');  
    LogInPage.login(username,password)
    HomePage.clickAndCheckLeftHandMenuLink('Projects Overview');
    ProjectsOverviewPage.viewAndCheckProject('Test Project');
    ProjectViewPage.enterFilterValue('Tag Name','A1001');
    ProjectViewPage.clickViewTagDetailsButton();
    ViewEditTagDetailsPage.clickOnElement(ViewEditTagDetailsPage.editTagButton);
    ViewEditTagDetailsPage.saveCurrentTagRevisionNumberAsAlias('originalTagRevision');    
    //ViewEditTagDetailsPage.checkTagStatus('Initialised');
    ViewEditTagDetailsPage.editTagValue('Description',newDescription);
    ViewEditTagDetailsPage.checkTagStatus('Ready For Approval');
    ViewEditTagDetailsPage.saveCurrentTagRevisionNumberAsAlias('newTagRevision');
    ViewEditTagDetailsPage.assertTagRevisionHasIncreased('originalTagRevision','newTagRevision')
    HomePage.logOut();
});
})