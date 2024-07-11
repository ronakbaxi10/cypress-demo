import BasePage from '../basePage';

class revisionViewBatchEditTagPage extends BasePage {
  
  get selectFieldsToReviewIcon() {
    return cy.get('#settingsButton');
  }  

  get closeButton() {
    return cy.get('#MainContent_applyButton');
  }

  get descriptionTextBox() {
    return cy.get('#MainContent_UC6401_TextBox_6401_I');
  }

  get submitAndSignButton() {
    return cy.get('#MainContent_submitButton_CD');
  }

  get confirmSubmitConfirmationButton() {
    return cy.get('#MainContent_confirmationPopup_confirmButton');
  }

  get finishButton() {
    return cy.get('#MainContent_progressPanelPopup_progressFinishButton_CD');
  } 

  enterNewValue(itemToChange,newValue){
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
      this.progressBar
        .should('be.visible')
        .should('have.text','100%');
      this.clickOnElement(this.finishButton);
  }
}

export default new revisionViewBatchEditTagPage();
