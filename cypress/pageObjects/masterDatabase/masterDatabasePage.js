import BasePage from '../basePage';

class masterDatabasePage extends BasePage {
  
  //Filter Text Boxes
  get tagNameFilterTextBox() {
    return cy.get('#MainContent_callbackPanel_dataGridView_DXFREditorcol1_I');
  }
  get projectNameFilterTextBox() {
    return cy.get('#MainContent_callbackPanel_dataGridView_DXFREditorcol4_I');
  }

  get tagStatusFilterTextBox() {
    return cy.get('#MainContent_callbackPanel_dataGridView_DXFREditorcol5_I');
  }

  get templateNameFilterTextBox() {
    return cy.get('#MainContent_callbackPanel_dataGridView_DXFREditorcol8_I');
  }

  get hasAlarmsFilterTextBox() {
    return cy.get('#MainContent_callbackPanel_dataGridView_DXFREditorcol10_I');
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Row 1 of Results Selectors = For checking values
get tagNameRow1Result() {
  return cy.get('#MainContent_callbackPanel_dataGridView_DXDataRow0 td:nth-of-type(3)[class*="dxgv"]');
}
get projectNameRow1Result() {
  return cy.get('#MainContent_callbackPanel_dataGridView_DXDataRow0 td:nth-of-type(4)[class*="dxgv"]');
}
get tagStatusRow1Result() {
  return cy.get('#MainContent_callbackPanel_dataGridView_DXDataRow0 td:nth-of-type(5)[class*="dxgv"]');
}
get templateNameRow1Result() {
  return cy.get('#MainContent_callbackPanel_dataGridView_DXDataRow0 td:nth-of-type(6)[class*="dxgv"]');
}
get  hasAlarmsRow1ResultIsChecked() {
  return cy.get('#MainContent_callbackPanel_dataGridView_DXDataRow0 td:nth-of-type(7)[class*="dxgv"] .fa-solid');
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

enterFilterValue(filterName, filterValue){
  let valueToEnter=filterValue+'{enter}'
  switch (filterName.toLowerCase()) {
    case 'tag name':
      this.tagNameFilterTextBox.should('be.visible');
      this.tagNameFilterTextBox
      .click()
      .type(valueToEnter); 
      //Check the correct filter is shown at the bottom
      this.checkSelectedFiltersValue(filterValue)
      break; 
    case 'project name':
      this.projectNameFilterTextBox.should('be.visible');
      this.projectNameFilterTextBox
      .click()
      .type(valueToEnter); 
      //Check the correct filter is shown at the bottom
      this.checkSelectedFiltersValue(filterValue)
      break; 
    case 'tag status':
      this.tagStatusFilterTextBox.should('be.visible');
      this.tagStatusFilterTextBox
      .click()
      .type(valueToEnter); 
      //Check the correct filter is shown at the bottom
      this.checkSelectedFiltersValue(filterValue)
      break; 
    case 'template name':
      this.templateNameFilterTextBox.should('be.visible');
      this.templateNameFilterTextBox
      .click()
      .type(valueToEnter); 
      //Check the correct filter is shown at the bottom
      this.checkSelectedFiltersValue(filterValue)
      break; 
    case 'has alarms':
      this.hasAlarmsFilterTextBox.should('be.visible');
      this.hasAlarmsFilterTextBox
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
    case 'tag name':
      this.tagNameRow1Result
        .should('be.visible')
        .should('contain',expectedValue);
      break; 
    case 'project name':
      this.projectNameRow1Result
        .should('be.visible')
        .should('contain',expectedValue);
      break; 
    case 'tag status':
      this.tagStatusRow1Result
        .should('be.visible')
        .should('contain',expectedValue);
      break; 
    case 'template name':
      this.templateNameRow1Result
        .should('be.visible')
        .should('contain',expectedValue);
    break; 
    case 'has alarms':
      if (expectedValue.toLowerCase() == 'checked') {
        this.hasAlarmsRow1ResultIsChecked.should('be.visible');
      }
      else if (expectedValue.toLowerCase() == 'unchecked') {
        this.hasAlarmsRow1ResultIsChecked.should('not.exist');
      }
    break; 
    default:
      cy.get('body').then(() => {
        throw new Error('ERROR! No items in the switch statement match the passed in value of: ' + columnName +'.');
      }) 
  }  
}

}
export default new masterDatabasePage();
