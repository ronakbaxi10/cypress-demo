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
    //Save original Tag Description as Alias to use later
    ViewEditTagDetailsPage.saveElementTextAsAlias(ViewEditTagDetailsPage.descriptionDeployedValueLabel,'originalTagDescription');
    ViewEditTagDetailsPage.clickOnElement(ViewEditTagDetailsPage.editTagButton);
    ViewEditTagDetailsPage.checkTagStatus('In Draft');
    ViewEditTagDetailsPage.editTagValue('Description',newDescription);
    ViewEditTagDetailsPage.submitAndSignRevision();

    //Check the details on the View/Edit Revision Page
    ViewEditTagDetailsPage.checkTagStatus('Ready For Approval');
    //Save NEW Tag Revision and then compare to the original
    ViewEditTagDetailsPage.saveElementTextAsAlias(ViewEditTagDetailsPage.tagRevisionNumberLabel,'newTagRevision');  
    ViewEditTagDetailsPage.assertTagRevisionHasIncreased('originalTagRevision','newTagRevision');
    //Check the NEW description is shown
    ViewEditTagDetailsPage.assertValue('Description', newDescription);
    
    //Return to the Project View Page
    ViewEditTagDetailsPage.clickBackButton();
    ProjectViewPage.enterAndCheckFilterValue('Tag Name','A1001');
    //Check the edited tag is shown as Signed and has a Ready for Approval Status
    ProjectViewPage.checkRow1ColumnFieldContainsValue('Signed','1')
    ProjectViewPage.checkRow1ColumnFieldContainsValue('Status','ReadyForApproval')
    //Get the new Tag Revision from the alias we saved earlier and check it is shown correctly on the Project View page
    cy.get('@newTagRevision').then((tagRevision) => {
      ProjectViewPage.checkRow1ColumnFieldContainsValue('Revision',tagRevision)       
    });

    //Move to the Master Database
    HomePage.clickAndCheckLeftHandMenuLink('Master Database');
    //Add the description column if not already shown
    MasterDatabasePage.addColumnIfNotAlreadyShown('Description');
    //Locate the tag and check the description has NOT yet been updated as it hasn't been Approved
    MasterDatabasePage.enterAndCheckFilterValue('Tag Name','A1001');
    //Get the original description from the alias we saved earlier and check it has NOT yet changed as it has NOT been approved yet
    cy.get('@originalTagDescription').then((description) => {
      MasterDatabasePage.checkRow1ColumnFieldContainsValue('Description',description)       
    });

    //Now return to View/Edit Revision and APPROVE the change
    MasterDatabasePage.viewFirstTagDetails();
    ViewEditTagDetailsPage.approveRevision();
    ViewEditTagDetailsPage.checkTagStatus('Approved');
    
    //Return to the Master Database
    ViewEditTagDetailsPage.clickBackButton();
    //Locate the tag and check the description HAS now been updated as it HAS been Approved
    MasterDatabasePage.enterAndCheckFilterValue('Tag Name','A1001');
    MasterDatabasePage.checkRow1ColumnFieldContainsValue('Description',newDescription)   

    //Move to the Project View Page
    HomePage.clickAndCheckLeftHandMenuLink('Projects Overview');
    ProjectsOverviewPage.viewAndCheckProject('Test Project');
    ProjectViewPage.enterAndCheckFilterValue('Tag Name','A1001');
    //Check the edited tag is shown as Signed and has a Ready for Approval Status
    ProjectViewPage.checkRow1ColumnFieldContainsValue('Signed','1')
    ProjectViewPage.checkRow1ColumnFieldContainsValue('Status','Approved')
    
    HomePage.logOut();
});
})