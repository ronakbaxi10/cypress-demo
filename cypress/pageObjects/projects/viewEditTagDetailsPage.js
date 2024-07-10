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

  get approveButton() {
    return cy.get('#MainContent_approveButton');
  }

  get rejectButton() {
    return cy.get('#MainContent_rejectButton');
  }

  get confirmApproveOrRejectButton() {
    return cy.get('#MainContent_popup_confirmButton_CD');
  }

  get copyButton() {
    return cy.get('#MainContent_copyButton');
  }  

  get revisionSignedSuccessfullyAlert() {
    return cy.xpath('//p[text()="Revision is signed successfully."]');
  }  

  get revisionApprovedSuccessfullyAlert() {
    return cy.xpath('//p[text()="Revision is approved successfully."]');
  } 

  get revisionRejectedSuccessfullyAlert() {
    return cy.xpath('//p[text()="Revision is rejected successfully."]');
  }   

  get tagStatusLabel() {
    return cy.get('#MainContent_revisionDetailsCallbackPanel_objectStatusLabel');
  } 
  
  get tagRevisionNumberLabel() {
    return cy.get('#MainContent_revisionDetailsCallbackPanel_revisionNumberLabel');
  }
  
  get tagDescriptionLabel() {
    return cy.xpath('//label[text()="Description"]/../following-sibling::label[1]');
  } 
  
  get backButton() {
    return cy.get('#MainContent_backButton');
  } 
  
  get descriptionDeployedValueLabel() {
    return cy.get('#MainContent_UC1_textBoxDeployedValueDiv');
  }   
  
  clickBackButton(){
    this.clickOnElement(this.backButton);
    this.coverWhilePageFullyLoads.should('not.be.visible');
  }

  editTagValue(itemToChange, newValue) {
    switch (itemToChange) {
      case 'Description':
        this.descriptionTextBox
        .should('be.visible')
        .click()
        .clear()
        .type(newValue); 
        break;  
      default:
        cy.get('body').then(() => {
          throw new Error('ERROR! No items in the switch statement match the passed in value of: ' + itemToChange +'.');
        }) 
    }  
  } 
  
  submitAndSignRevision(){
    this.clickOnElement(this.submitAndSignButton);
    this.clickOnElement(this.confirmSubmitConfirmationButton);
    this.revisionSignedSuccessfullyAlert.should('be.visible');
  }

  approveRevision(){
    this.clickOnElement(this.approveButton);
    this.clickOnElement(this.confirmApproveOrRejectButton);
    this.revisionApprovedSuccessfullyAlert.should('be.visible');
  }

  rejectRevision(){
    this.clickOnElement(this.rejectButton);
    this.clickOnElement(this.confirmApproveOrRejectButton);
    this.revisionRejectedSuccessfullyAlert.should('be.visible');
  }

  checkTagStatus(expectedStatus){
    this.tagStatusLabel
      .should('be.visible')
      .should('contain',expectedStatus);
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
