import BasePage from '../basePage';

class viewEditTagDetailsPage extends BasePage {

  get editTagButton() {
    return cy.get('#MainContent_editButton');
  }

  get descriptionTextBox() {
    return cy.get('#MainContent_UC1_TextBox_1_I');
  }

  get submitAndSignButton() {
    return cy.get('#MainContent_submitButton_CD');
  }

  get confirmSubmitConfirmationButton() {
    return cy.get('#MainContent_submitConfirmationPopup_confirmSignButton_CD');
  }

  get revisionSignedSuccessfullyAlert() {
    return cy.xpath('//p[text()="Revision is signed successfully."]',{timeout: 30000});
  }  

  get tagStatusLabel() {
    return cy.get('#MainContent_revisionDetailsCallbackPanel_objectStatusLabel');
  } 
  
  get tagRevisionNumberLabel() {
    return cy.get('#MainContent_revisionDetailsCallbackPanel_revisionNumberLabel');
  }
  
  get tagDescriptionLabel() {
    return cy.get('#MainContent_UC1_1517');
  } 
  
  get backButton() {
    return cy.get('#MainContent_backButton');
  }   

  editTagValue(itemToChange, newvalue) {
    switch (itemToChange) {
      case 'Description':
        this.descriptionTextBox
        .should('be.visible')
        .click()
        .clear()
        .type(newvalue); 
        break;  
      default:
        cy.get('body').then(() => {
          throw new Error('ERROR! No items in the switch statement match the passed in value of: ' + itemToChange +'.');
        }) 
    }  
    this.clickOnElement(this.submitAndSignButton);
    this.clickOnElement(this.confirmSubmitConfirmationButton);
    this.revisionSignedSuccessfullyAlert.should('be.visible');
  }  

  checkTagStatus(expectedStatus){
    this.tagStatusLabel
      .should('be.visible')
      .should('contain',expectedStatus);
  }

  saveCurrentTagRevisionNumberAsAlias(aliasName){
    this.tagRevisionNumberLabel.then((el) => {
      return el.text();
    }).as(aliasName);
    cy.get(`@${aliasName}`).then((tagRevision) => {
      cy.task("log","****************I have saved an alias called: "+aliasName+", that has the value: "+tagRevision+". ***************************");        
    });
  }

  assertTagRevisionHasIncreased(originalTagRevisionAlias, newTagRevisionAlias){
    //Remove the '0.' from the beginning of the version number, convert to Float and then compare
    cy.get(`@${originalTagRevisionAlias}`).then((originalTagVersion) => {
      cy.get(`@${newTagRevisionAlias}`).then((newTagVersion) => {
        expect(parseFloat(newTagVersion.replace('0.',''))).to.eq(parseFloat(originalTagVersion.replace('0.','')) + 1);
      });
    });
  }

  assertValue(fieldToCheck, expectedDescription){
    switch (fieldToCheck) {
      case 'Description':
        this.tagDescriptionLabel
          .should('be.visible')
          .should('have.text',expectedDescription);
        break;  
      default:
        cy.get('body').then(() => {
          throw new Error('ERROR! No items in the switch statement match the passed in value of: ' + fieldToCheck +'.');
      }) 
    }  
  }  
}
export default new viewEditTagDetailsPage();
