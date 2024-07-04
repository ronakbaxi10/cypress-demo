import LogInPage from '../../pageObjects/login/loginPage.js';

let username = Cypress.env('username');
let password = Cypress.env('password');
let invalidLoginErrorMessage = 'Your login attempt was not successful. Please try again.';

describe('Invalid Logins', () => {

  beforeEach(() => {
    cy.visit('/guardian/Default.aspx');
  });


  it('Invalid Login - No Username or Password entered', () => {
    cy.task("log","***************Attempting an Invalid Login - No Username or Password entered***************************"); 
    LogInPage.clickOnLogInButton();
    LogInPage.checkInvalidLoginMessageExists(invalidLoginErrorMessage);
  });
  
  it('Invalid Login - No Password Entered', () => {
    cy.task("log","***************Attempting an Invalid Login - No Password Entered***************************");
    LogInPage.enterUserName(username) 
    LogInPage.clickOnLogInButton();
    LogInPage.checkInvalidLoginMessageExists(invalidLoginErrorMessage);
    });

  it('Invalid Login - No Username Entered', () => {
    cy.task("log","***************Attempting an Invalid Login - No Username Entered***************************");
    LogInPage.enterPassword(password)
    LogInPage.clickOnLogInButton();
    LogInPage.checkInvalidLoginMessageExists(invalidLoginErrorMessage);
    });

  it('Invalid Login - Invalid Username Entered', () => {
    cy.task("log","***************Attempting an Invalid Login - Invalid Username Entered***************************");
    LogInPage.enterUserName('invalid') 
    LogInPage.enterPassword(password)
    LogInPage.clickOnLogInButton();
    LogInPage.checkInvalidLoginMessageExists(invalidLoginErrorMessage);
    });

  it('Invalid Login - Invalid Password Entered', () => {
    cy.task("log","***************Attempting an Invalid Login - Invalid Password Entered***************************");
    LogInPage.enterUserName(username) 
    LogInPage.enterPassword('invalid')
    LogInPage.clickOnLogInButton();
    LogInPage.checkInvalidLoginMessageExists(invalidLoginErrorMessage);
    });
})