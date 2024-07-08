import BasePage from './basePage';
import LoginPage from './login/loginPage'

class homePage extends BasePage {

    logOut(){
        this.userProfileIcon
          .should('be.visible')
          .click();
        this.logOutButton
        .should('be.visible')
        .click();
        LoginPage.usernameTextBox
        .should('be.visible')
    }
}

export default new homePage();
