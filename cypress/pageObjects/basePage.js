import SharedFunctions from './sharedFunctions';

//Put any shared Page Objects in here so they can be accessed in any page file.
//Shared functions go in sharedFunctions.js (which is linked to basePage.js)

class BasePage extends SharedFunctions {

  
  get userProfileIcon() {
		return cy.get('#userProfileImageUserMenu');
	} 

  get logOutButton() {
		return cy.get('#loginStatus');
	}   

  get topPageTitle() {
    return cy.get('.content-header > h1');
  }

  get coverWhilePageFullyLoads() {
    return cy.get('#cover');
  }

  get noDataMessage() {
    return cy.xpath('//div[contains(text(),"No data to display")]');
  }
  
  get updatingGridPopUp() {
    return cy.get('#MainContent_callbackPanel_TL');
  }
  
//Left Hand menu links

get projectsOverviewLeftHandMenuLink() {
  return cy.get('.sidebar-menu > li:nth-child(2) span');
} 

get masterDatabaseLeftHandMenuLink() {
  return cy.get('.sidebar-menu > li:nth-child(3) span');
} 

get dashboardsLeftHandMenuLink() {
  return cy.get('.sidebar-menu > li:nth-child(4) span');
} 

get reportsLeftHandMenuLink() {
  return cy.get('.sidebar-menu > li:nth-child(5) span');
} 

get actionListLeftHandMenuLink() {
  return cy.get('.sidebar-menu > li:nth-child(6) span');
} 

get adminLeftHandMenuLink() {
  return cy.get('#adminMenu');
} 

get systemLeftHandMenuLink() {
  return cy.get('#systemMenu');  
} 

get systemTreeViewMenu() {
  return cy.get('ul[id=systemViewLinks]');
} 

get helpLeftHandMenuLink() {
  return cy.get('a[href*="../Help/"]');
} 

//Admin Sub Menu Links

get admin_ProjectManagerLink() {
  return cy.get('#adminViewLinks > li:nth-child(1) span');
} 

get admin_DatasourceManagerLink() {
  return cy.get('#adminViewLinks > li:nth-child(2) span');
} 

get admin_TemplateManagerLink() {
  return cy.get('#adminViewLinks > li:nth-child(3) span');
} 

get admin_ImportExportManagerLink() {
  return cy.get('#adminViewLinks > li:nth-child(4) span');
} 

get admin_PriorityManagerLink() {
  return cy.get('#adminViewLinks > li:nth-child(5) span');
} 

get admin_UserManagerLink() {
  return cy.get('#adminViewLinks > li:nth-child(6) span');
} 

//System Sub Menu Links

get system_SystemActivityLink() {
  return cy.get('.menu-open > li:nth-child(2) span');
} 

get system_SystemEventLogLink() {
  return cy.get('.menu-open > li:nth-child(3) span');
} 

///////////////////////////////////////////////////////////////////////
//Shared Filters elements
get filterSelectedCheckBox() {
  return cy.get('.dxWeb_edtCheckBoxChecked_DevEx');
}

get selectedFiltersText() {
  return cy.get('.dxgvFilterBarLink_DevEx');
}

get clearFiltersHyperlink() {
  return cy.xpath('//a[contains(text(),"Clear")]');
}
///////////////////////////////////////////////////////////////////////


hoverOverElement(element){
  //Hovers are very temporamental so added a wait here to help
    cy.wait(2000);
    element
      .should('be.visible')
      //If you are already hovered over the element, the sub menu will not appear, so I move the mouse away so you are definitely NOT already hovering over it
      .realMouseMove(50, 50, { position: "center" });
    element.realHover();
}

clickOnElement(element){
    element
      .should('be.visible')
      .click();
}

checkSelectedFiltersValue(expectedValueInFilter) {
  //If the filter text is small is is just stored as the element's inner text. If it is long it creates
//a new 'title' attribute so I have written code to cope with both scenarios:
this.selectedFiltersText.then($element => {
    var attr = $element.attr('title');
  // For some browsers, `attr` is undefined; for others,
  // `attr` is false.  Check for both.
    if (typeof attr !== 'undefined' && attr !== false) {
      //Get the Filter Value from the title attribute
      this.selectedFiltersText.invoke('attr', 'title').should('include', expectedValueInFilter);
    }
    else {
      //Get the Filter Value from the embedded text
      this.selectedFiltersText.should('contain', expectedValueInFilter);
    }        
    })  
}

clearSelectedFilters(){
  this.clearFiltersHyperlink
  .should('be.visible')
  .click()
  this.selectedFiltersText
  .should('not.exist');
}

clickAndCheckLeftHandMenuLink(linkToTest){
  switch (linkToTest.toLowerCase()) {
        case 'projects overview':
          this.projectsOverviewLeftHandMenuLink
          .should('be.visible')
          .click();
          cy.url().should('include', 'ProjectsOverview');
          this.topPageTitle.should('contain','Projects Overview')  
          break; 
        case 'master database':
          this.masterDatabaseLeftHandMenuLink
          .should('be.visible')
          .click();
          cy.url().should('include', 'MasterDataViewer');
          this.topPageTitle.should('contain','Master Database');
          this.coverWhilePageFullyLoads.should('not.be.visible');
          this.noDataMessage.should('not.be.visible');
          this.updatingGridPopUp.should('not.be.visible'); 
          break;  
        case 'dashboards':
          this.dashboardsLeftHandMenuLink
          .should('be.visible')
          .click();
          cy.url().should('include', 'Dashboards');
          this.topPageTitle.should('contain','Dashboards')  
          break;  
        case 'reports':
          this.reportsLeftHandMenuLink
          .should('be.visible')
          .click();
          cy.url().should('include', 'Reports');
          this.topPageTitle.should('contain','Reports')  
          break;  
        case 'action list':
          this.actionListLeftHandMenuLink
          .should('be.visible')
          .click();
          cy.url().should('include', 'Actions');
          this.topPageTitle.should('contain','Action List')  
          break;  
        default:
          cy.get('body').then(() => {
            throw new Error('ERROR! No items in the switch statement match the passed in value of: ' + linkToTest +'.');
          }) 
      }   
    }

  clickAndCheckLeftHandMenuLink_AdminSubMenu(linkToTest){
    //Open the Admin Drop Down menu if it is not already open
    this.coverWhilePageFullyLoads.should('not.be.visible');
    this.adminLeftHandMenuLink.then($element => {
      var attr = $element.attr('class');
      if (attr == 'treeview') {
        cy.task("log","The admin menu is NOT already open - so opening it");
        this.adminLeftHandMenuLink
        .should('be.visible')
        .click(); 
    }
    else {
      cy.task("log","The admin menu IS already open!");
    }
  })   
    switch (linkToTest.toLowerCase()) {
          case 'project manager':
            this.admin_ProjectManagerLink
            .should('be.visible')
            .click();
            cy.url().should('include', 'Projects');
            this.topPageTitle.should('contain','Project Manager')  
            break; 
          case 'datasource manager':
            this.admin_DatasourceManagerLink
            .should('be.visible')
            .click();
            cy.url().should('include', 'Datasource');
            this.topPageTitle.should('contain','Datasource Manager')  
            break;  
          case 'template manager':
            this.admin_TemplateManagerLink
            .should('be.visible')
            .click();
            cy.url().should('include', 'Templates');
            this.topPageTitle.should('contain','Template Manager')  
            break;  
          case 'import/export manager':
            this.admin_ImportExportManagerLink
            .should('be.visible')
            .click();
            cy.url().should('include', 'ImportExport');
            this.topPageTitle.should('contain','Import/Export Manager')  
            break;  
          case 'priority manager':
            this.admin_PriorityManagerLink
            .should('be.visible')
            .click();
            cy.url().should('include', 'Priority');
            this.topPageTitle.should('contain','Priority Manager')  
            break;  
          case 'user manager':
            this.admin_UserManagerLink
            .should('be.visible')
            .click();
            cy.url().should('include', 'Users');
            this.topPageTitle.should('contain','User Manager')  
            break; 
          default:
            cy.get('body').then(() => {
              throw new Error('ERROR! No items in the switch statement match the passed in value of: ' + linkToTest +'.');
            }) 
      } 
      } 

  clickAndCheckLeftHandMenuLink_SystemSubMenu(linkToTest){
      //Open the Admin Drop Down menu if it is not already open
      this.coverWhilePageFullyLoads.should('not.be.visible');
      this.systemLeftHandMenuLink.then($element => {
        var attr = $element.attr('class');
        if (attr == 'treeview') {
          cy.task("log","The system menu is NOT already open - so opening it");
          this.systemLeftHandMenuLink
          .should('be.visible')
          .click(); 
      }
      else {
        cy.task("log","The system menu IS already open!");
      }
    }) 
    switch (linkToTest.toLowerCase()) {
          case 'system activity':
            this.system_SystemActivityLink
            .should('be.visible')
            .click()
            cy.url().should('include', 'Activity');
            this.topPageTitle.should('contain','System Activity')  
            break; 
          case 'system event':
            this.system_SystemEventLogLink
            .should('be.visible')
            .click()
            cy.url().should('include', 'EventLog');
            this.topPageTitle.should('contain','System Event')  
            break;  
          default:
            cy.get('body').then(() => {
              throw new Error('ERROR! No items in the switch statement match the passed in value of: ' + linkToTest +'.');
            }) 
        }   
      } 
}

export default BasePage;
