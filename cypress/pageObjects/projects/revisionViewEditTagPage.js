import BasePage from '../basePage';

class revisionViewEditTagPage extends BasePage {

  get editTagButton() {
    return cy.get('#MainContent_editButton');
  }

  get descriptionTextBox() {
    return cy.get('#MainContent_UC1_TextBox_1_I');
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

  get copyPropertyTagNameTextBox() {
    return cy.get('#MainContent_copyPopup_copyPopupCallbackPanel_objectsGridViewCallbackPanel_objectsGridView_DXFREditorcol1_I');
  }  

  get copyPropertyRow1ResultsTagCheckBox() {
    return cy.get('#MainContent_copyPopup_copyPopupCallbackPanel_objectsGridViewCallbackPanel_objectsGridView_DXSelBtn0_D');
  }  

  get copyPropertySelectTagRow1ResultsTagNameField() {
    return cy.get('[id*="objectsGridView_DXDataRow0"] td:nth-child(2)');
  } 
  
  get copyPropertyApproveImmediatelyCheckbox() {
    return cy.get('#MainContent_copyPopup_copyPopupCallbackPanel_copyActionCallbackPanel_isImmediateApprove_S_D');
  }  

  get copyPropertyFinishButton() {
    return cy.get('#MainContent_copyPopup_copyPopupCallbackPanel_wizardFinishButton_CD > .dx-vam');
  }

  get copyPropertyFinalFinishButton() {
    return cy.get('#MainContent_progressPanelPopup_progressFinishButton_CD > .dx-vam');
  }  

  get copyPropertyStatusLabel() {
    return cy.get('#statusLabel');
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

  copyPropertyToTag(propertyName,tagCopyTo){
    this.clickOnElement(this.copyButton);
    this.clickOnElement(cy.xpath(`(//td[@class='dxtl dxtl__B0' and text()='${propertyName}'])[1]/preceding-sibling::td[1]`));
    this.clickOnElement(this.nextButton);
    this.copyPropertyTagNameTextBox
      .click()
      .type(tagCopyTo+'{enter}'); 
    this.loadingSpinner.should('not.be.visible');
    this.clearFiltersHyperlink.should('be.visible');
    this.copyPropertySelectTagRow1ResultsTagNameField
      .should('be.visible')
      .should('have.text',tagCopyTo);
    this.clickOnElement(this.copyPropertyRow1ResultsTagCheckBox);
    this.clickOnElement(this.nextButton);
    this.clickOnElement(cy.xpath(`(//td[@class='dxtl dxtl__B0' and text()='${propertyName}'])[2]/preceding-sibling::td[1]`));
    this.clickOnElement(this.nextButton);
    this.clickOnElement(this.copyPropertyApproveImmediatelyCheckbox);    
    this.clickOnElement(this.nextButton);
    cy.scrollTo('top', { duration: 1000 });
    this.clickOnElement(this.copyPropertyFinishButton);
    this.progressBar
      .should('be.visible')
      .should('have.text','100%');
    this.copyPropertyStatusLabel
      .should('be.visible')
      .should('have.text','1 fields values were copied to 1 Tags successfully.');
    this.clickOnElement(this.copyPropertyFinalFinishButton);    
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
export default new revisionViewEditTagPage();
