import LogInPage from '../../pageObjects/login/loginPage.js';
import HomePage from '../../pageObjects/homePage.js';
import ProjectsOverviewPage from '../../pageObjects/projects/projectsOverviewPage.js';
import ProjectViewPage from '../../pageObjects/projects/projectViewPage.js';
import RevisionViewEditTagPage from '../../pageObjects/projects/revisionViewEditTagPage.js';
import UsefulFunctions from '../../helpers/usefulFunctions.js';
import MasterDatabasePage from '../../pageObjects/masterDatabase/masterDatabasePage.js';

let username = Cypress.env('username')
let password = Cypress.env('password')
let newDescription = 'This is Analogue point A1001' + UsefulFunctions.generateRandomStringLettersOnly(10);

describe('Edit a Project Tag and Sign it. Then APPROVE it', () => {

  it('Edit a Project Tag and Sign it. Then APPROVE it', () => {
    cy.visit('/guardian/Default.aspx');  
    LogInPage.login(username,password)
    HomePage.clickAndCheckLeftHandMenuLink('Projects Overview');
    ProjectsOverviewPage.viewAndCheckProject('Test Project');
    ProjectViewPage.enterAndCheckFilterValue('Tag Name','A1001');
    //Save original Tag Revision as Alias to use later
    ProjectViewPage.saveElementTextAsAlias(ProjectViewPage.revisionRow1Result,'originalTagRevision');    
    ProjectViewPage.clickViewTagDetailsButton();
    RevisionViewEditTagPage.tagNameTitle.should('have.text','A1001');
    RevisionViewEditTagPage.clickOnElement(RevisionViewEditTagPage.editTagButton);
    RevisionViewEditTagPage.checkTagStatus('In Draft');
    RevisionViewEditTagPage.editTagValue('Description',newDescription);
    RevisionViewEditTagPage.submitAndSignRevision();

    //Check the details on the View/Edit Revision Page
    RevisionViewEditTagPage.checkTagStatus('Ready For Approval');
    //Save NEW Tag Revision and then compare to the original
    RevisionViewEditTagPage.saveElementTextAsAlias(RevisionViewEditTagPage.tagRevisionNumberLabel,'newTagRevision');  
    RevisionViewEditTagPage.assertTagRevisionHasIncreased('originalTagRevision','newTagRevision');
    //Check the NEW description is shown
    RevisionViewEditTagPage.assertValue('Description', newDescription);
    
    //Return to the Project View Page
    RevisionViewEditTagPage.clickBackButton();
    ProjectViewPage.enterAndCheckFilterValue('Tag Name','A1001');
    //Check the edited tag is shown as Signed and has a Ready for Approval Status
    ProjectViewPage.checkRow1ColumnFieldEqualsValue('Signed','1')
    ProjectViewPage.checkRow1ColumnFieldEqualsValue('Status','ReadyForApproval')
    //Get the new Tag Revision from the alias we saved earlier and check it is shown correctly on the Project View page
    cy.get('@newTagRevision').then((tagRevision) => {
      ProjectViewPage.checkRow1ColumnFieldEqualsValue('Revision',tagRevision)       
    });

    //Move to the Master Database
    HomePage.clickAndCheckLeftHandMenuLink('Master Database');
    //Add the description column if not already shown
    MasterDatabasePage.addColumnIfNotAlreadyShown('Description');
    //Locate the tag and check the description HAS been updated
    MasterDatabasePage.enterAndCheckFilterValue('Tag Name','A1001');
    MasterDatabasePage.checkRow1ColumnFieldEqualsValue('Description',newDescription);
    //Remove the column so the test leaves the website in the state it was at the beginning
    MasterDatabasePage.removeColumnIfShown('Description');       

    //Now return to View/Edit Revision and APPROVE the change
    MasterDatabasePage.viewFirstTagDetails();
    RevisionViewEditTagPage.approveRevision();
    RevisionViewEditTagPage.checkTagStatus('Approved');

    //Move to the Project View Page
    HomePage.clickAndCheckLeftHandMenuLink('Projects Overview');
    ProjectsOverviewPage.viewAndCheckProject('Test Project');
    ProjectViewPage.enterAndCheckFilterValue('Tag Name','A1001');
    //Check the edited tag is shown as Signed and has a Ready for Approval Status
    ProjectViewPage.checkRow1ColumnFieldEqualsValue('Signed','1')
    ProjectViewPage.checkRow1ColumnFieldEqualsValue('Status','Approved')
    
    HomePage.logOut();
});
})