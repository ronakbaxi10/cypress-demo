import BasePage from '../basePage';

class loginPage extends BasePage {

  get usernameTextBox() {
		return cy.get('#loginControl_UserName');
	} 

  get passwordTextBox() {
		return cy.get('#loginControl_Password');
	} 

  get logInButton() {
		return cy.get('#loginControl_aspLoginButton');
	} 

  get warningBox() {
		return cy.get('.warning-box');
	} 

  get rememberMeCheckBox() {
		return cy.get('#loginControl_RememberMe');
	}  

  get guardianVersionField() {
		return cy.get('#headerVersionLabel');
	}  

  login(username,password){
    this.enterUserName(username);
    this.enterPassword(password);
    this.clickOnLogInButton();
    this.confirmLoggedIn();
  }

  loginRememberMe(username,password){
    this.clickRememberMeCheckbox();
    this.enterUserName(username);
    this.enterPassword(password);
    this.clickOnLogInButton();
    this.confirmLoggedIn();
  }

  enterUserName(username) {
    this.usernameTextBox
      .should('be.visible')
      .click()
      .type(username);
  }

  enterPassword(password) {
    this.passwordTextBox
      .should('be.visible')
      .click()
      .type(password)  
  }
  

  clickOnLogInButton() {
    this.logInButton
      .should('be.visible')
      .click();    
  }

  confirmLoggedIn(){
    this.logOutButton
    .should('exist');
    this.userProfileIcon
    .should('be.visible');
  }

  checkInvalidLoginMessageExists(expectedMessage) {
    this.warningBox
      .should('be.visible')
      .should('contain',expectedMessage)   
  }

  clickRememberMeCheckbox() {
    this.rememberMeCheckBox
      .should('be.visible')
      .click();    
  }

  assertGuardianVersion(expectedGuardianVersion){
    this.guardianVersionField
    .should('be.visible')
    .should('have.text','Version ' + expectedGuardianVersion);
  }
}  

export default new loginPage();
