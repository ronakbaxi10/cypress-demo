import BasePage from '../basePage';

class projectViewPage extends BasePage {

  get projectNameLabel() {
    return cy.get('#MainContent_projectNameLabel');
  }
  
  //Filter Text Boxes
  get updatedDateFilterTextBox() {
    return cy.get('#MainContent_callbackPanel_projectViewGridView_DXFREditorcol5_I');
  }
  get tagNameFilterTextBox() {
    return cy.get('#MainContent_callbackPanel_projectViewGridView_DXFREditorcol6_I');
  }

  get tagDescriptionFilterTextBox() {
    return cy.get('#MainContent_callbackPanel_projectViewGridView_DXFREditorcol7_I');
  }

  get hasAlarmFilterTextBox() {
    return cy.get('#MainContent_callbackPanel_projectViewGridView_DXFREditorcol8_I');
  }

  get templateFilterTextBox() {
    return cy.get('#MainContent_callbackPanel_projectViewGridView_DXFREditorcol9_I');
  }

  get revisionFilterTextBox() {
    return cy.get('#MainContent_callbackPanel_projectViewGridView_DXFREditorcol10_I');
  }
  get underReviewByFilterTextBox() {
    return cy.get('#MainContent_callbackPanel_projectViewGridView_DXFREditorcol12_I');
  }

  get signedFilterTextBox() {
    return cy.get('#MainContent_callbackPanel_projectViewGridView_DXFREditorcol13_I');
  }

  get statusFilterTextBox() {
    return cy.get('#MainContent_callbackPanel_projectViewGridView_DXFREditorcol14_I');
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Row 1 of Results Selectors = For checking values
get updatedDateRow1Result() {
  return cy.get('#MainContent_callbackPanel_projectViewGridView_DXDataRow0 td:nth-of-type(2)[class*="dxgv"]');
}
get tagNameRow1Result() {
  return cy.get('#MainContent_callbackPanel_projectViewGridView_DXDataRow0 td:nth-of-type(3)[class*="dxgv"]');
}
get tagDescriptionRow1Result() {
  return cy.get('#MainContent_callbackPanel_projectViewGridView_DXDataRow0 td:nth-of-type(4)[class*="dxgv"]');
}
get hasAlarmRow1Result() {
  return cy.get('#MainContent_callbackPanel_projectViewGridView_DXDataRow0 td:nth-of-type(5)[class*="dxgv"]');
}
get templateRow1Result() {
  return cy.get('#MainContent_callbackPanel_projectViewGridView_DXDataRow0 td:nth-of-type(6)[class*="dxgv"]');
}
get revisionRow1Result() {
  return cy.get('#MainContent_callbackPanel_projectViewGridView_DXDataRow0 td:nth-of-type(7)[class*="dxgv"]');
}
get underReviewByRow1Result() {
  return cy.get('#MainContent_callbackPanel_projectViewGridView_DXDataRow0 td:nth-of-type(8)[class*="dxgv"]');
}
get signedRow1Result() {
  return cy.get('#MainContent_callbackPanel_projectViewGridView_DXDataRow0 td:nth-of-type(9)[class*="dxgv"]');
}
get statusRow1Result() {
  return cy.get('#MainContent_callbackPanel_projectViewGridView_DXDataRow0 td:nth-of-type(10)[class*="dxgv"]');
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

enterFilterValue(filterName, filterValue){
  let valueToEnter=filterValue+'{enter}'
  switch (filterName.toLowerCase()) {
    case 'updated date':
      this.updatedDateFilterTextBox.should('be.visible');
      this.updatedDateFilterTextBox
      .click()
      .type(valueToEnter); 
      //Check the correct filter is shown at the bottom
      this.checkSelectedFiltersValue("[Updated Date] Is greater than or equal to")
      break; 
    case 'tag name':
      this.tagNameFilterTextBox.should('be.visible');
      this.tagNameFilterTextBox
      .click()
      .type(valueToEnter); 
      //Check the correct filter is shown at the bottom
      this.checkSelectedFiltersValue(filterValue)
      break; 
    case 'tag description':
      this.tagDescriptionFilterTextBox.should('be.visible');
      this.tagDescriptionFilterTextBox
      .click()
      .type(valueToEnter); 
      //Check the correct filter is shown at the bottom
      this.checkSelectedFiltersValue(filterValue)
      break; 
    case 'has alarm':
      this.hasAlarmFilterTextBox.should('be.visible');
      this.hasAlarmFilterTextBox
      .click()
      .type(valueToEnter); 
      //Check the correct filter is shown at the bottom
      this.checkSelectedFiltersValue(filterValue)
      break; 
    case 'template':
      this.templateFilterTextBox.should('be.visible');
      this.templateFilterTextBox
      .click()
      .type(valueToEnter); 
      //Check the correct filter is shown at the bottom
      this.checkSelectedFiltersValue(filterValue)
      break; 
    case 'revision':
      this.revisionFilterTextBox.should('be.visible');
      this.revisionFilterTextBox
      .click()
      .type(valueToEnter); 
      //Check the correct filter is shown at the bottom
      this.checkSelectedFiltersValue(filterValue)
      break; 
    case 'under review by':
      this.underReviewByFilterTextBox.should('be.visible');
      this.underReviewByFilterTextBox
      .click()
      .type(valueToEnter); 
      //Check the correct filter is shown at the bottom
      this.checkSelectedFiltersValue(filterValue)
      break; 
    case 'signed':
      this.signedFilterTextBox.should('be.visible');
      this.signedFilterTextBox
      .click()
      .type(valueToEnter); 
      //Check the correct filter is shown at the bottom
      this.checkSelectedFiltersValue(filterValue)
      break; 
    case 'status':
      this.statusFilterTextBox.should('be.visible');
      this.statusFilterTextBox
      .click()
      .type(valueToEnter); 
      //Check the correct filter is shown at the bottom
      this.checkSelectedFiltersValue(filterValue)
      break; 
    default:
      cy.get('body').then(() => {
        throw new Error('ERROR! No items in the switch statement match the passed in value of: ' + filterName +'.');
      }) 
  }  
  //The filter selected checkbox should now be displayed:
  this.filterSelectedCheckBox.should('be.visible')
}

checkRow1ColumnFieldContainsValue(columnName, expectedValue){
  switch (columnName.toLowerCase()) {
    case 'updated date':
      this.updatedDateRow1Result
        .should('be.visible')
        .should('contain',expectedValue);
      break; 
    case 'tag name':
      this.tagNameRow1Result 
        .should('be.visible')
        .should('contain',expectedValue);
      break; 
    case 'tag description':
      this.tagDescriptionRow1Result
        .should('be.visible')
        .should('contain',expectedValue);
      break; 
    case 'has alarm':
      this.hasAlarmRow1Result
        .should('be.visible')
        .should('contain',expectedValue);
    break; 
    case 'template':
      this.templateRow1Result
        .should('be.visible')
        .should('contain',expectedValue);
    break; 
    case 'revision':
      this.revisionRow1Result
        .should('be.visible')
        .should('contain',expectedValue);
    break;
    case 'under review by':
      this.underReviewByRow1Result
        .should('be.visible')
        .should('contain',expectedValue);
    break;
    case 'signed':
      this.signedRow1Result
        .should('be.visible')
        .should('contain',expectedValue);
    break;
    case 'status':
      this.statusRow1Result
        .should('be.visible')
        .should('contain',expectedValue);
    break;
    default:
      cy.get('body').then(() => {
        throw new Error('ERROR! No items in the switch statement match the passed in value of: ' + columnName +'.');
      }) 
  }  
}

}
export default new projectViewPage();
