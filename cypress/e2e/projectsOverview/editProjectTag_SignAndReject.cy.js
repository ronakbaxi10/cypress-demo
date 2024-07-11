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

describe('Edit a Project Tag and Sign it. Then REJECT it', () => {

  it('Edit a Project Tag and Sign it. Then REJECT it', () => {
    cy.visit('/guardian/Default.aspx');  
    LogInPage.login(username,password)
    HomePage.clickAndCheckLeftHandMenuLink('Projects Overview');
    ProjectsOverviewPage.viewAndCheckProject('Test Project');
    ProjectViewPage.enterAndCheckFilterValue('Tag Name','A1001');
    //Save original Tag Revision as Alias to use later
    ProjectViewPage.saveElementTextAsAlias(ProjectViewPage.revisionRow1Result,'originalTagRevision');    
    ProjectViewPage.clickViewTagDetailsButton();
    ViewEditTagDetailsPage.clickOnElement(ViewEditTagDetailsPage.editTagButton);
    ViewEditTagDetailsPage.checkTagStatus('In Draft');
    ViewEditTagDetailsPage.editTagValue('Description',newDescription);
    ViewEditTagDetailsPage.submitAndSignRevision();
    ViewEditTagDetailsPage.rejectRevision();
    ViewEditTagDetailsPage.checkTagStatus('Rejected');

    //Go back to to the Project View Page
    ViewEditTagDetailsPage.clickBackButton();
    HomePage.clickAndCheckLeftHandMenuLink('Projects Overview');
    ProjectsOverviewPage.viewAndCheckProject('Test Project');
    ProjectViewPage.enterAndCheckFilterValue('Tag Name','A1001');
    //Check the edited tag is shown as Signed and has a Ready for Approval Status
    ProjectViewPage.checkRow1ColumnFieldEqualsValue('Signed','0')
    ProjectViewPage.checkRow1ColumnFieldEqualsValue('Status','Rejected')
    
    //Return to the Master Database
    HomePage.clickAndCheckLeftHandMenuLink('Master Database');
    MasterDatabasePage.addColumnIfNotAlreadyShown('Description');
    //Locate the tag and check the description HAS been updated
    MasterDatabasePage.enterAndCheckFilterValue('Tag Name','A1001');
    //Get the description HAS been updated
    MasterDatabasePage.checkRow1ColumnFieldEqualsValue('Description',newDescription)       
    //Remove the column so the test leaves the website in the state it was at the beginning
    MasterDatabasePage.removeColumnIfShown('Description');
   
    HomePage.logOut();
});
})