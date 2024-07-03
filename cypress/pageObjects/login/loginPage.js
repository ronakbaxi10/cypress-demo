import BasePage from '../basePage';

class loginPage extends BasePage {

  get usernameTextBox() {
		return cy.get('#ctl00_Main_login_UserName');
	} 

  get passwordTextBox() {
		return cy.get('#ctl00_Main_login_Password');
	} 

  get logInButton() {
		return cy.get('#ctl00_Main_login_LoginButton');
	} 

  get warningBox() {
		return cy.get('#ctl00_Main_login_warningBox');
	} 

  get rememberMeCheckBox() {
		return cy.get('#ctl00_Main_login_RememberMe');
	}  

  get analyserVersionField() {
		return cy.get('span[id="ctl00_Main_labVersion"]');
	}  

  login(username,password){
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
    this.logoutLink
    .should('exist')
    this.userIcon
    .should('be.visible')
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

  assertAnalyserVersion(expectedAnalyserVersion){
    this.analyserVersionField
    .should('be.visible')
    .should('have.text',expectedAnalyserVersion);
  }
}  

export default new loginPage();
