import LogInPage from '../../pageObjects/login/loginPage.js';
import HomePage from '../../pageObjects/homePage.js';
import ProjectsOverviewPage from '../../pageObjects/projects/projectsOverviewPage.js';
import ProjectViewPage from '../../pageObjects/projects/projectViewPage.js';
import UsefulFunctions from '../../helpers/usefulFunctions.js';
import RevisionViewEditTagPage from '../../pageObjects/projects/revisionViewEditTagPage.js';
import RevisionViewBatchEditTagPage from '../../pageObjects/projects/revisionViewBatchEditTagPage.js';

let username = Cypress.env('username')
let password = Cypress.env('password')
let newDescription = 'Batch Edit Test Descriptions' + UsefulFunctions.generateRandomStringLettersOnly(10);
let propertyName = 'Description';

describe('Batch Edit some Project Tags', () => {

  it('Batch Edit some Project Tags', () => {
    cy.visit('/guardian/Default.aspx');  
    LogInPage.login(username,password)
    HomePage.clickAndCheckLeftHandMenuLink('Projects Overview');
    ProjectsOverviewPage.viewAndCheckProject('Test Project');
    
    //Save the originnal Tag Revisions of the items we we going to bulk edit
    ProjectViewPage.enterAndCheckFilterValue('Tag Name','D1001');
    ProjectViewPage.saveElementTextAsAlias(ProjectViewPage.revisionRow1Result,'D1001_OriginalTagRevision');  
    ProjectViewPage.enterAndCheckFilterValue('Tag Name','D1002');
    ProjectViewPage.saveElementTextAsAlias(ProjectViewPage.revisionRow1Result,'D1002_OriginalTagRevision');  
    ProjectViewPage.enterAndCheckFilterValue('Tag Name','D1003');
    ProjectViewPage.saveElementTextAsAlias(ProjectViewPage.revisionRow1Result,'D1003_OriginalTagRevision');  
    ProjectViewPage.enterAndCheckFilterValue('Tag Name','D1004');
    ProjectViewPage.saveElementTextAsAlias(ProjectViewPage.revisionRow1Result,'D1004_OriginalTagRevision');  
    ProjectViewPage.enterAndCheckFilterValue('Tag Name','D1005');
    ProjectViewPage.saveElementTextAsAlias(ProjectViewPage.revisionRow1Result,'D1005_OriginalTagRevision');   

    //Add a filter value so the Tags you want to select are shown then select the specific ones you want
    ProjectViewPage.enterAndCheckFilterValue('Tag Name','D100');
    ProjectViewPage.selectSpecificTagFromTagName('D1001');
    ProjectViewPage.selectSpecificTagFromTagName('D1002');
    ProjectViewPage.selectSpecificTagFromTagName('D1003');
    ProjectViewPage.selectSpecificTagFromTagName('D1004');
    ProjectViewPage.selectSpecificTagFromTagName('D1005');
    ProjectViewPage.clickOnElement(ProjectViewPage.batchEditSelectedTagsIcon);
    RevisionViewBatchEditTagPage.clickOnElement(RevisionViewBatchEditTagPage.selectFieldsToReviewIcon);
    RevisionViewBatchEditTagPage.clickOnElement(cy.xpath(`(//td[@class='dxtl dxtl__B0' and text()='${propertyName}'])[1]/preceding-sibling::td[1]`));
    RevisionViewBatchEditTagPage.clickOnElement(RevisionViewBatchEditTagPage.closeButton);
    RevisionViewBatchEditTagPage.enterNewValue('Description',newDescription)
    RevisionViewBatchEditTagPage.submitAndSignRevision();

    //Get the Tag Revisions have increased, the Signed & Status values are correct and the description has updated for each Tag
    ProjectViewPage.enterAndCheckFilterValue('Tag Name','D1001');
    ProjectViewPage.saveElementTextAsAlias(ProjectViewPage.revisionRow1Result,'D1001_NewTagRevision');  
    ProjectViewPage.checkRow1ColumnFieldEqualsValue('Signed','1');
    ProjectViewPage.checkRow1ColumnFieldEqualsValue('Status','ReadyForApproval');
    ProjectViewPage.assertTagRevisionHasIncreased('D1001_OriginalTagRevision','D1001_NewTagRevision');
    ProjectViewPage.clickViewTagDetailsButton();
    RevisionViewEditTagPage.tagNameTitle.should('have.text','D1001');
    RevisionViewEditTagPage.assertValue('Description', newDescription);
    RevisionViewEditTagPage.clickBackButton();

    ProjectViewPage.enterAndCheckFilterValue('Tag Name','D1002');
    ProjectViewPage.checkRow1ColumnFieldEqualsValue('Signed','1');
    ProjectViewPage.checkRow1ColumnFieldEqualsValue('Status','ReadyForApproval');
    ProjectViewPage.saveElementTextAsAlias(ProjectViewPage.revisionRow1Result,'D1002_NewTagRevision');  
    ProjectViewPage.assertTagRevisionHasIncreased('D1002_OriginalTagRevision','D1002_NewTagRevision');
    ProjectViewPage.clickViewTagDetailsButton();
    RevisionViewEditTagPage.tagNameTitle.should('have.text','D1002');
    RevisionViewEditTagPage.assertValue('Description', newDescription);
    RevisionViewEditTagPage.clickBackButton();

    ProjectViewPage.enterAndCheckFilterValue('Tag Name','D1003');
    ProjectViewPage.checkRow1ColumnFieldEqualsValue('Signed','1');
    ProjectViewPage.checkRow1ColumnFieldEqualsValue('Status','ReadyForApproval');
    ProjectViewPage.saveElementTextAsAlias(ProjectViewPage.revisionRow1Result,'D1003_NewTagRevision');  
    ProjectViewPage.assertTagRevisionHasIncreased('D1003_OriginalTagRevision','D1003_NewTagRevision');
    ProjectViewPage.clickViewTagDetailsButton();
    RevisionViewEditTagPage.tagNameTitle.should('have.text','D1003');
    RevisionViewEditTagPage.assertValue('Description', newDescription);
    RevisionViewEditTagPage.clickBackButton();

    ProjectViewPage.enterAndCheckFilterValue('Tag Name','D1004');
    ProjectViewPage.checkRow1ColumnFieldEqualsValue('Signed','1');
    ProjectViewPage.checkRow1ColumnFieldEqualsValue('Status','ReadyForApproval');
    ProjectViewPage.saveElementTextAsAlias(ProjectViewPage.revisionRow1Result,'D1004_NewTagRevision');  
    ProjectViewPage.assertTagRevisionHasIncreased('D1004_OriginalTagRevision','D1004_NewTagRevision');
    ProjectViewPage.clickViewTagDetailsButton();
    RevisionViewEditTagPage.tagNameTitle.should('have.text','D1004');
    RevisionViewEditTagPage.assertValue('Description', newDescription);
    RevisionViewEditTagPage.clickBackButton();

    ProjectViewPage.enterAndCheckFilterValue('Tag Name','D1005');
    ProjectViewPage.checkRow1ColumnFieldEqualsValue('Signed','1');
    ProjectViewPage.checkRow1ColumnFieldEqualsValue('Status','ReadyForApproval');
    ProjectViewPage.saveElementTextAsAlias(ProjectViewPage.revisionRow1Result,'D1005_NewTagRevision');   
    ProjectViewPage.assertTagRevisionHasIncreased('D1005_OriginalTagRevision','D1005_NewTagRevision');
    ProjectViewPage.clickViewTagDetailsButton();
    RevisionViewEditTagPage.tagNameTitle.should('have.text','D1005');
    RevisionViewEditTagPage.assertValue('Description', newDescription);
    RevisionViewEditTagPage.clickBackButton();
    
    HomePage.logOut();
});
})