import LogInPage from '../../pageObjects/login/loginPage.js';
import HomePage from '../../pageObjects/homePage.js';

let username = Cypress.env('username')
let password = Cypress.env('password')

describe('Test that the Remember Me checkbox is working correctly', () => {
  it('Log in with Remember Me Checkbox selected - you should be auto logged in when you leave and return', () => {
    cy.visit('/analyser/Default.aspx');  
    LogInPage.clickRememberMeCheckbox();
    LogInPage.login(username,password);
    //Leave Analyser and then return - you should be taken straight back in without having to log in again
    cy.visit('https://www.processvue.com');   
    cy.visit('/analyser/Default.aspx'); 
    LogInPage.confirmLoggedIn();
    LogInPage.usernameTextBox.should('not.exist');
    LogInPage.passwordTextBox.should('not.exist');
    HomePage.logout();  
});
  it('Log in with Remember Me Checkbox NOT selected - you should be taken to the Log In page when you leave and return', () => {
    cy.visit('/analyser/Default.aspx');  
    LogInPage.login(username,password);
    //Leave Analyser and then return - you should have to log in again
    cy.visit('https://www.processvue.com');   
    cy.visit('/analyser/Default.aspx'); 
    //Check the Username and Password fields are visible:
    LogInPage.usernameTextBox.should('be.visible');
    LogInPage.passwordTextBox.should('be.visible');
  });
})