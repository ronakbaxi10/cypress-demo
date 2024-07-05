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

get row1ResultFieldsArray() {
  return cy.get('#MainContent_callbackPanel_dataGridView_DXDataRow0 td');
}

get  hasAlarmsRow1ResultIsChecked() {
  return cy.get('#MainContent_callbackPanel_dataGridView_DXDataRow0 td:nth-of-type(7)[class*="dxgv"] .fa-solid');
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

enterFilterValue(filterName, filterValue){
  let valueToEnter=filterValue+'{enter}'
  switch (filterName) {
    case 'Tag Name':
      this.getColumnNumberAndEnterFilterText(filterName,valueToEnter)
      //Check the correct filter is shown at the bottom
      this.checkSelectedFiltersValue(filterValue)
      break; 
    case 'Project Name':
      this.getColumnNumberAndEnterFilterText(filterName,valueToEnter)
      //Check the correct filter is shown at the bottom
      this.checkSelectedFiltersValue(filterValue)
      break; 
    case 'Tag Status':
      this.getColumnNumberAndEnterFilterText(filterName,valueToEnter)
      //Check the correct filter is shown at the bottom
      this.checkSelectedFiltersValue(filterValue)
      break; 
    case 'Template Name':
      this.getColumnNumberAndEnterFilterText(filterName,valueToEnter)
      //Check the correct filter is shown at the bottom
      this.checkSelectedFiltersValue(filterValue)
      break; 
    case 'Has Alarms':
      this.getColumnNumberAndEnterFilterText(filterName,valueToEnter)
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
  switch (columnName) {
    case 'Tag Name':
      this.getColumnNumberAndCheckValue(columnName, expectedValue);
      break; 
    case 'Project Name':
      this.getColumnNumberAndCheckValue(columnName, expectedValue);
      break; 
    case 'Tag Status':
      this.getColumnNumberAndCheckValue(columnName, expectedValue);
      break; 
    case 'Template Name':
      this.getColumnNumberAndCheckValue(columnName, expectedValue);
      break; 
    case 'Has Alarms':
      this.getColumnNumberAndCheckValue(columnName, expectedValue);
    break; 
    default:
      cy.get('body').then(() => {
        throw new Error('ERROR! No items in the switch statement match the passed in value of: ' + columnName +'.');
      }) 
  }  
}

getColumnNumberAndCheckValue(filterTitle, expectedValue){
  this.filterTitlesRowArray.each(($ele, index) => {
    if ($ele.text().includes(filterTitle)) {
      cy.log("************"+filterTitle+" = Column "+((parseInt(index))-1) +"***************")
      if(expectedValue != 'Checked' && expectedValue != "Unchecked") {
      this.row1ResultFieldsArray.eq(((parseInt(index))))
      .should('be.visible')
      .should('contain',expectedValue);
      }
  else {
    switch (expectedValue) {
      case 'Checked':
        this.row1ResultFieldsArray.eq(((parseInt(index))))
        .should('be.visible')
        .find('.fa-solid').should('exist');
        break; 
      case 'Unchecked':
        this.row1ResultFieldsArray.eq(((parseInt(index))))
        .should('be.visible')
        .find('.fa-solid').should('not.exist');
        break; 
      default:
      cy.get('body').then(() => {
        throw new Error('ERROR! No items in the switch statement match the passed in value of: ' + expectedValue +'.');
      }) 
  }
  }
}})
}
}
export default new masterDatabasePage();
