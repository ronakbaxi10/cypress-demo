import SharedFunctions from './sharedFunctions';

//Put any shared Page Objects in here so they can be accessed in any page file.
//Shared functions go in sharedFunctions.js (which is linked to basePage.js)

class BasePage extends SharedFunctions {

  
  get userProfileIcon() {
		return cy.get('#userProfileImageUserMenu');
	} 

  get logOutButton() {
		return cy.get('#loginStatus');
	}   

  //Side menu links

///////////////////////////////////////////////////////////////////////

logOut(){
    this.userProfileIcon
      .should('be.visible')
      .click();
    this.logOutButton
    .should('be.visible')
    .click();
}

hoverOverElement(element){
  //Hovers are very temporamental so added a wait here to help
    cy.wait(2000);
    element
      .should('be.visible')
      //If you are already hovered over the element, the sub menu will not appear, so I move the mouse away so you are definitely NOT already hovering over it
      .realMouseMove(50, 50, { position: "center" });
    element.realHover();
}

clickOnElement(element){
    element
      .should('be.visible')
      .click();
    this.loadingSpinner.should('not.be.visible');
}

}

export default BasePage;
