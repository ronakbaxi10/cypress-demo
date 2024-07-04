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
  return cy.get('.sidebar-menu > li:nth-child(8) span');
} 

get systemLeftHandMenuLink() {
  return cy.get('.sidebar-menu > li:nth-child(9) span');
} 

get helpLeftHandMenuLink() {
  return cy.get('.sidebar-menu > li:nth-child(11) span');
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
  return cy.get('.menu-open > li:nth-child(2) span');
} 


///////////////////////////////////////////////////////////////////////

logOut(){
    this.userProfileIcon
      .should('be.visible')
      .click();
    this.logOutButton
    .should('be.visible')
    .click();
}

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
    this.loadingSpinner.should('not.be.visible');
}

clickLeftHandMenuLink(linkToTest){
  switch (linkToTest.toLowerCase()) {
        case 'projects overview':
          this.projectsOverviewLeftHandMenuLink
          .should('be.visible')
          .click()
          cy.url().should('include', 'ProjectsOverview');
          this.topPageTitle.should('contain','Projects Overview')  
          break; 
        case 'master database':
          this.masterDatabaseLeftHandMenuLink
          .should('be.visible')
          .click()
          cy.url().should('include', 'MasterDataViewer');
          this.topPageTitle.should('contain','Master Database')  
          break;  
        case 'dashboards':
          this.dashboardsLeftHandMenuLink
          .should('be.visible')
          .click()
          cy.url().should('include', 'Dashboards');
          this.topPageTitle.should('contain','Dashboards')  
          break;  
        case 'reports':
          this.reportsLeftHandMenuLink
          .should('be.visible')
          .click()
          cy.url().should('include', 'Reports');
          this.topPageTitle.should('contain','Reports')  
          break;  
        case 'action list':
          this.actionListLeftHandMenuLink
          .should('be.visible')
          .click()
          cy.url().should('include', 'Actions');
          this.topPageTitle.should('contain','Action List')  
          break;  
        default:
          cy.get('body').then(() => {
            throw new Error('ERROR! No items in the switch statement match the passed in value of: ' + linkToTest +'.');
          }) 
      }    
}

}

export default BasePage;
