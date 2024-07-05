import BasePage from '../basePage';

class masterDatabasePage extends BasePage {
  
//Filter Text Boxes
get filterTitlesRowArray() {
  return cy.get('[id*="MainContent_callbackPanel_dataGridView_col"]');
}  
get filterInputFieldsArray() {
  return cy.get('#MainContent_callbackPanel_dataGridView_DXFilterRow td[class="dxgv"]');
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
      this.getColumnNumberAndEnterFilterText('Tag Name',valueToEnter)
      //Check the correct filter is shown at the bottom
      this.checkSelectedFiltersValue(filterValue)
      break; 
    case 'project name':
      this.getColumnNumberAndEnterFilterText('Project Name',valueToEnter)
      //Check the correct filter is shown at the bottom
      this.checkSelectedFiltersValue(filterValue)
      break; 
    case 'tag status':
      this.getColumnNumberAndEnterFilterText('Tag Status',valueToEnter)
      //Check the correct filter is shown at the bottom
      this.checkSelectedFiltersValue(filterValue)
      break; 
    case 'template name':
      this.getColumnNumberAndEnterFilterText('Template Name',valueToEnter)
      //Check the correct filter is shown at the bottom
      this.checkSelectedFiltersValue(filterValue)
      break; 
    case 'has alarms':
      this.getColumnNumberAndEnterFilterText('Has Alarms',valueToEnter)
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

getColumnNumberAndEnterFilterText(filterTitle, valueToEnter){
  this.filterTitlesRowArray.each(($ele, index) => {
    if ($ele.text().includes(filterTitle)) {
      cy.log("************"+filterTitle+" = Column "+((parseInt(index))-1) +"***************")
    this.filterInputFieldsArray.eq(((parseInt(index))-1))
        .should('be.visible')
        .click()
        .type(valueToEnter);
    }
  })
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
