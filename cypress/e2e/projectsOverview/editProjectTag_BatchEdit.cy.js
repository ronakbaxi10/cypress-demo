import LogInPage from '../../pageObjects/login/loginPage.js';
import HomePage from '../../pageObjects/homePage.js';
import ProjectsOverviewPage from '../../pageObjects/projects/projectsOverviewPage.js';
import ProjectViewPage from '../../pageObjects/projects/projectViewPage.js';
import UsefulFunctions from '../../helpers/usefulFunctions.js';
import MasterDatabasePage from '../../pageObjects/masterDatabase/masterDatabasePage.js';
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
    ProjectViewPage.enterAndCheckFilterValue('Tag Name','D100');
    ProjectViewPage.clickOnElement(ProjectViewPage.selectAllIcon);
    cy.wait(2000);
    ProjectViewPage.clickOnElement(ProjectViewPage.batchEditSelectedTagsIcon);
    RevisionViewBatchEditTagPage.clickOnElement(RevisionViewBatchEditTagPage.selectFieldsToReviewIcon);
    RevisionViewBatchEditTagPage.clickOnElement(cy.xpath(`(//td[@class='dxtl dxtl__B0' and text()='${propertyName}'])[1]/preceding-sibling::td[1]`));
    cy.wait(2000);
    RevisionViewBatchEditTagPage.clickOnElement(RevisionViewBatchEditTagPage.closeButton);
    RevisionViewBatchEditTagPage.enterNewValue('Description',newDescription)
    RevisionViewBatchEditTagPage.submitAndSignRevision();
    HomePage.logOut();
});
})