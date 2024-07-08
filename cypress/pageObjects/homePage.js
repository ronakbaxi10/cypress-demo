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
        //Make sure it is fully logged out!
        LoginPage.usernameTextBox
        .should('be.visible')
        .click();
    }
}

export default new homePage();
