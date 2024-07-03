let assert = require('assert');

//Any simple functions that you want to use in any of your page files put in here - they can then used in any page file simply be using 
// this.nameoffunction - you DON'T NEED TO IMPORT THEM INTO EACH PAGE FILE.

//If they are more complicated you might want to create a separate .js file for them any put them in the helpers folder - you WOULD then 
//need to IMPORT them into the specific page file you want to use them in.

class SharedFunctions {
    selectTextFromDropDown(dropDownElement, textToSelect) {
        dropDownElement
          .should('be.visible')
          .select(textToSelect)
        //Validate the correct option has been selected:  
        cy.get("select option:selected")
          .invoke("text")
          .should("eq", textToSelect)
      }
  
}

export default SharedFunctions;
