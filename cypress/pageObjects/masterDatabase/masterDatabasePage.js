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

get customiseViewButton() {
  return cy.get('#settingsButton');
}

get customiseMasterDatabaseTitle() {
  return cy.xpath('//h4[text()="Filter view based on"]')
}

get filterIcon() {
  return cy.get('.dxGridView_gvFilterRowButton_Glass')
}

get applyButton() {
  return cy.xpath('//span[text()="Apply"]');
}

get searchFiltersTextBox() {
  return cy.get('#MainContent_propertiesCallbackPanel_propertiesGridView_DXFREditorcol1_I');
}

get viewFirstTagIcon() {
  return cy.get('[id="viewLink_1"]');
}

get viewRevisionIcon() {
  return cy.get('span[title="View latest revision"]');
}

viewFirstTagDetails(){
  this.clickOnElement(this.viewFirstTagIcon);
  this.clickOnElement(this.viewRevisionIcon);
  this.topPageTitle
    .should('be.visible')
    .should('contain','Revision View/Edit');
}

addColumnIfNotAlreadyShown(column){
  this.updatingGridPopUp.should('not.be.visible');
  cy.get("body").then($body => {
    if ($body.find(`td.dx-ellipsis:contains('${column}')`).length > 0) {   
      cy.task("log","***************Column is already shown - nothing to do here***************************");
    }
    else {
      cy.task("log","***************Adding the column***************************").then(() => {
      this.clickCustomiseViewButton();
      this.customiseViewAddColumn(column);
      this.checkColumnTitleIsDisplayed(column);
      })
    }
  });
}

removeColumnIfShown(column){
  this.updatingGridPopUp.should('not.be.visible');
  cy.get("body").then($body => {
    if ($body.find(`td.dx-ellipsis:contains('${column}')`).length > 0) {   
      cy.task("log","***************Removing the column***************************").then(() => {
      this.clickCustomiseViewButton();
      this.customiseViewRemoveColumn(column);
      this.checkColumnTitleIsNotDisplayed(column);
    })
    }
    else {
      cy.task("log","***************Column is NOT shown - nothing to do here***************************");
      }
  });
}

clickCustomiseViewButton(){
  this.clickOnElement(this.customiseViewButton);
  this.customiseMasterDatabaseTitle.should('be.visible');
  this.filterIcon.should('be.visible');
}

enterTextInDataFieldSearchTextBox(searchText){
  this.searchFiltersTextBox
    .should('be.visible')
    .click()
    .clear()
    .type(searchText+'{enter}');
    this.loadingSpinner.should('not.be.visible');
    this.clearFiltersHyperlink.should('be.visible');
    this.checkSelectedFiltersValue(searchText)
}

customiseViewAddColumn(columnToAdd){
  this.enterTextInDataFieldSearchTextBox(columnToAdd);
  //See if the checkbox is already checked - if not check it
  let checkBoxElementSelector = `//td[text()="${columnToAdd}"]/preceding-sibling::td[1]/span`;
  cy.xpath(checkBoxElementSelector)
    .then(($element) => {
    var attr = $element.attr('class');
    if (attr.includes('Unchecked')) {
      this.clickOnElement(cy.xpath(checkBoxElementSelector));
    }
    else
    {
      cy.task("log","******************************The "+columnToAdd+" column is already selected - nothing to do here!***************************");
    }
  })
  this.clickOnElement(this.applyButton);
  this.topPageTitle.should('contain','Master Database');
  this.coverWhilePageFullyLoads.should('not.be.visible');
  this.noDataMessage.should('not.be.visible');
  this.updatingGridPopUp.should('not.be.visible');    
}

customiseViewRemoveColumn(columnToRemove){
  this.enterTextInDataFieldSearchTextBox(columnToRemove);
  //See if the checkbox is already UNchecked - if not UNcheck it
  let checkBoxElementSelector = `//td[text()="${columnToRemove}"]/preceding-sibling::td[1]/span`;
  cy.xpath(checkBoxElementSelector)
    .then(($element) => {
    var attr = $element.attr('class');
    if (attr.includes('Unchecked')) {
      cy.task("log","******************************The "+columnToRemove+" column is already NOT selected - nothing to do here!***************************");
    }
    else
    {
      this.clickOnElement(cy.xpath(checkBoxElementSelector));
    }
  })
  this.clickOnElement(this.applyButton);
  this.topPageTitle.should('contain','Master Database');
  this.coverWhilePageFullyLoads.should('not.be.visible');
  this.noDataMessage.should('not.be.visible');
  this.updatingGridPopUp.should('not.be.visible');
}

checkColumnTitleIsDisplayed(columnTitleToCheck){
  this.updatingGridPopUp.should('not.be.visible');
  cy.xpath(`//td[contains(@class,"dx-ellipsis") and text()="${columnTitleToCheck}"]`)
    .should('be.visible');
}

checkColumnTitleIsNotDisplayed(columnTitleToCheck){
  this.updatingGridPopUp.should('not.be.visible');
  cy.xpath(`//td[contains(@class,"dx-ellipsis") and text()="${columnTitleToCheck}"]`)
    .should('not.exist');
}

enterAndCheckFilterValue(filterName, filterValue){
  let valueToEnter=filterValue+'{enter}'
    this.getColumnNumberAndEnterFilterText(filterName,valueToEnter);
    //Check the correct filter is shown at the bottom
    this.checkSelectedFiltersValue(filterValue);
  //The filter selected checkbox should now be displayed:
  this.filterSelectedCheckBox.should('be.visible');
}

getColumnNumberAndEnterFilterText(filterTitle, valueToEnter){
  //Find the column number by searching for the passed in Title. Error if no matching column title found
  //Once we know the column number we use that to select the correct filterInput field and then enter the value

  let matchingTitle = false;
  this.filterTitlesRowArray.each(($ele, index) => {
      if ($ele.text().includes(filterTitle)) {
        cy.log("************"+filterTitle+" = Column "+((parseInt(index))-1) +"***************")
        this.filterInputFieldsArray.eq(((parseInt(index))-1))
          .should('be.visible')
          .clear()
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
  //Find the column number by searching for the passed in Title and check the value. Error if no matching column title found
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
