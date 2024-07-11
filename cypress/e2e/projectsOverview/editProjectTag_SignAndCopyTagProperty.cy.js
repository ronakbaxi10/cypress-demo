import LogInPage from '../../pageObjects/login/loginPage.js';
import HomePage from '../../pageObjects/homePage.js';
import ProjectsOverviewPage from '../../pageObjects/projects/projectsOverviewPage.js';
import ProjectViewPage from '../../pageObjects/projects/projectViewPage.js';
import ViewEditTagDetailsPage from '../../pageObjects/projects/viewEditTagDetailsPage.js';
import UsefulFunctions from '../../helpers/usefulFunctions.js';
import MasterDatabasePage from '../../pageObjects/masterDatabase/masterDatabasePage.js';

let username = Cypress.env('username')
let password = Cypress.env('password')
let newDescription = 'This is Analogue point A1001' + UsefulFunctions.generateRandomStringLettersOnly(10);

describe('Edit a Project Tag and Sign it. Then COPY it', () => {

  it('Edit a Project Tag and Sign it. Then COPY it', () => {
    cy.visit('/guardian/Default.aspx');  
    LogInPage.login(username,password)
    HomePage.clickAndCheckLeftHandMenuLink('Projects Overview');
    ProjectsOverviewPage.viewAndCheckProject('Test Project');
    //Look up and save the original Tag Revision of the Tag we are going to copy TO as an Alias to use later
    ProjectViewPage.enterAndCheckFilterValue('Tag Name','A1002');
    //Save original Tag Revision as Alias to use later
    ProjectViewPage.saveElementTextAsAlias(ProjectViewPage.revisionRow1Result,'originalTagRevision');    

    //Now look up and change the tag we are going to copy FROM
    ProjectViewPage.enterAndCheckFilterValue('Tag Name','A1001');
    ProjectViewPage.clickViewTagDetailsButton();
    ViewEditTagDetailsPage.clickOnElement(ViewEditTagDetailsPage.editTagButton);
    ViewEditTagDetailsPage.editTagValue('Description',newDescription);
    ViewEditTagDetailsPage.submitAndSignRevision();
    ViewEditTagDetailsPage.approveRevision();
    ViewEditTagDetailsPage.checkTagStatus('Approved');

    //Now copy the changed tag
    ViewEditTagDetailsPage.copyPropertyToTag('Description','A1002');
    
    //Move to to the Master Database
    HomePage.clickAndCheckLeftHandMenuLink('Master Database');
    //Locate the tag and check the copied description has been updated
    MasterDatabasePage.enterAndCheckFilterValue('Tag Name','A1002');
    MasterDatabasePage.checkRow1ColumnFieldContainsValue('Description',newDescription)   

    //Move to the Project View Page
    HomePage.clickAndCheckLeftHandMenuLink('Projects Overview');
    ProjectsOverviewPage.viewAndCheckProject('Test Project');
    ProjectViewPage.enterAndCheckFilterValue('Tag Name','A1002');
    //Save NEW Tag Revision and then compare to the original
    ProjectViewPage.saveElementTextAsAlias(ProjectViewPage.revisionRow1Result,'newTagRevision');   
    ViewEditTagDetailsPage.assertTagRevisionHasIncreased('originalTagRevision','newTagRevision');
    //Check the edited tag is shown as Signed and has a Ready for Approval Status
    ProjectViewPage.checkRow1ColumnFieldContainsValue('Signed','1')
    ProjectViewPage.checkRow1ColumnFieldContainsValue('Status','Approved')
    HomePage.logOut();
});
})