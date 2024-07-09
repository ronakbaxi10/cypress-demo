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
    ProjectViewPage.enterAndCheckFilterValue('Tag Name','A1001');
    //Save original Tag Description as an Alias to use later
    ProjectViewPage.saveElementTextAsAlias(ProjectViewPage.tagDescriptionRow1Result,'originalTagDescription');
    ProjectViewPage.clickViewTagDetailsButton();
    ViewEditTagDetailsPage.clickOnElement(ViewEditTagDetailsPage.editTagButton);
    //Save original Tag Revision as an Alias to use later
    ViewEditTagDetailsPage.saveElementTextAsAlias(ViewEditTagDetailsPage.tagRevisionNumberLabel,'originalTagRevision');    
    ViewEditTagDetailsPage.editTagValueAndSign('Description',newDescription);
    ViewEditTagDetailsPage.checkTagStatus('Ready For Approval');
    //Save NEW Tag Revision so we can compare to the original
    ViewEditTagDetailsPage.saveElementTextAsAlias(ViewEditTagDetailsPage.tagRevisionNumberLabel,'newTagRevision');  
    ViewEditTagDetailsPage.assertTagRevisionHasIncreased('originalTagRevision','newTagRevision');
    ViewEditTagDetailsPage.assertValue('Description', newDescription);
    //Return to the Project View Page.
    ViewEditTagDetailsPage.clickOnElement(ViewEditTagDetailsPage.backButton);
    ProjectViewPage.enterAndCheckFilterValue('Tag Name','A1001');
    //Check the edited tag is shown as Signed and has a Ready for Approval Status
    ProjectViewPage.checkRow1ColumnFieldContainsValue('Signed','1')
    ProjectViewPage.checkRow1ColumnFieldContainsValue('Status','ReadyForApproval')
    //Get the original description from the alias we saved earlier and check it has NOT yet changed as it has NOT been approved yet
    cy.get('@originalTagDescription').then((description) => {
      ProjectViewPage.checkRow1ColumnFieldContainsValue('Tag Description',description)       
    });
    HomePage.logOut();
});
})