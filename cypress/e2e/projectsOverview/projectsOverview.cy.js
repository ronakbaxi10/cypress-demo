import LogInPage from '../../pageObjects/login/loginPage.js';
import HomePage from '../../pageObjects/homePage.js';
import ProjectsOverviewPage from '../../pageObjects/projects/projectsOverviewPage.js';

let username = Cypress.env('username')
let password = Cypress.env('password')

describe('Test Projects Overview', () => {

  it('Test Projects Overview', () => {
    cy.visit('/guardian/Default.aspx');  
    LogInPage.login(username,password)
    HomePage.clickAndCheckLeftHandMenuLink('Projects Overview');
    ProjectsOverviewPage.viewProject('Test Project');
    HomePage.logOut();
});
})