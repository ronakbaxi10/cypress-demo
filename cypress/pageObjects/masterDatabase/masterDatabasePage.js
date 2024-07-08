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
    this.getColumnNumberAndEnterFilterText(filterName,valueToEnter);
    //Check the correct filter is shown at the bottom
    this.checkSelectedFiltersValue(filterValue);
  //The filter selected checkbox should now be displayed:
  this.filterSelectedCheckBox.should('be.visible');
}

getColumnNumberAndEnterFilterText(filterTitle, valueToEnter){
  //Find the column number by searching for the passed in Title and enter the value. Error if no matching column title found
  let matchingTitle = false;
  this.filterTitlesRowArray.each(($ele, index) => {
      if ($ele.text().includes(filterTitle)) {
        cy.log("************"+filterTitle+" = Column "+((parseInt(index))-1) +"***************")
        this.filterInputFieldsArray.eq(((parseInt(index))-1))
          .should('be.visible')
          .click()
          .type(valueToEnter)
          .then(() => {matchingTitle = true;})
      }
    })
    .then(() => {
      if (matchingTitle == false) {
        cy.get('body').then(() => {
          throw new Error('ERROR! There are no column titles that match the passed in value of: ' + filterTitle +'.');
        }) 
      }
    })
}

checkRow1ColumnFieldContainsValue(filterTitle, expectedValue){
  let matchingTitle = false;
  this.filterTitlesRowArray.each(($ele, index) => {
    if ($ele.text().includes(filterTitle)) {
      cy.log("************"+filterTitle+" = Column "+((parseInt(index))-1) +"***************")
      if(expectedValue != 'Checked' && expectedValue != "Unchecked") {
        this.row1ResultFieldsArray.eq(((parseInt(index))))
        .should('be.visible')
        .should('contain',expectedValue)
        .then(() => {matchingTitle = true;})
      }
      else {
        switch (expectedValue) {
          case 'Checked':
            this.row1ResultFieldsArray.eq(((parseInt(index))))
            .should('be.visible')
            .find('.fa-solid').should('exist')
            .then(() => {matchingTitle = true;})
            break; 
          case 'Unchecked':
            this.row1ResultFieldsArray.eq(((parseInt(index))))
            .should('be.visible')
            .find('.fa-solid').should('not.exist')
            .then(() => {matchingTitle = true;})
            break; 
          default:
          cy.get('body').then(() => {
            throw new Error('ERROR! No items in the switch statement match the passed in value of: ' + expectedValue +'.');
          }) 
        }
      }
    } 
  })
    .then(() => {
      if (matchingTitle == false) {
        cy.get('body').then(() => {
          throw new Error('ERROR! There are no column titles that match the passed in value of: ' + filterTitle +'.');
        }) 
      }
    })
}
}

export default new masterDatabasePage();
