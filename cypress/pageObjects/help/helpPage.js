import BasePage from '../basePage';

class helpPage extends BasePage {

  get helpTitle() {
		return cy.get('#topic_header_text');
	}

  get helpIFrame() {
		return cy.iframe('frame[name="FrameMain"]');
	}

  clickAndCheckLeftHandMenuHelpLink(expectedHelpPage){
    this.helpLeftHandMenuLink            
      .should('be.visible')
      .invoke('removeAttr', 'target')
      .click();
      switch (expectedHelpPage.toLowerCase()) {
        case 'projects overview':
          cy.url()
            .should('include', 'Help')
            .and('include', 'ProjectsOverview.html');
          this.checkTitleOnHelpPage('Projects Overview');
          break; 
        case 'master database':
          cy.url()
            .should('include', 'Help')
            .and('include', 'MasterDatabase.html');
          this.checkTitleOnHelpPage('Master Database');
        break; 
        case 'dashboards':
          cy.url()
            .should('include', 'Help')
            .and('include', 'Dashboard.html');
          this.checkTitleOnHelpPage('Dashboard');
          break;  
        case 'reports':
          cy.url()
            .should('include', 'Help')
            .and('include', 'Reports.html');
          this.checkTitleOnHelpPage('Reports');
          break;  
        case 'action list':
          cy.url()
            .should('include', 'Help')
            .and('include', 'Actions.html');
          this.checkTitleOnHelpPage('Action Lists');
          break;  
        case 'admin - project manager':
          cy.url()
            .should('include', 'Help')
            .and('include', 'ProjectManager.html');
          this.checkTitleOnHelpPage('Project Manager');
          break; 
        case 'admin - datasource manager':
          cy.url()
            .should('include', 'Help')
            .and('include', 'DatasourceManager.html');
          this.checkTitleOnHelpPage('Datasource Manager');
          break; 
        case 'admin - template manager':
          cy.url()
            .should('include', 'Help')
            .and('include', 'TemplateManager.html');
          this.checkTitleOnHelpPage('Template Manager');
          break; 
        case 'admin - import/export manager':
          cy.url()
            .should('include', 'Help')
            .and('include', 'ImportExportManager.html');
          this.checkTitleOnHelpPage('Import/Export Manager');
          break; 
        case 'admin - priority manager':
          cy.url()
            .should('include', 'Help')
            .and('include', 'PriorityManager.html');
          this.checkTitleOnHelpPage('Priority Manager');
          break; 
        case 'admin - user manager':
          cy.url()
            .should('include', 'Help')
            .and('include', 'UserManager.html');
          this.checkTitleOnHelpPage('User Manager');
          break; 
        case 'system - system activity':
          cy.url()
            .should('include', 'Help')
            .and('include', 'SystemActivity.html');
          this.checkTitleOnHelpPage('System Activity'); 
          break; 
        case 'system - system event':
          cy.url()
            .should('include', 'Help')
            .and('include', 'SystemEventLog.html');
          this.checkTitleOnHelpPage('System Event Log'); 
          break; 
        default:
          cy.get('body').then(() => {
            throw new Error('ERROR! No items in the switch statement match the passed in value of: ' + expectedHelpPage +'.');
          }) 
      }  
    }   

    checkTitleOnHelpPage(expectedTitle){
      this.helpIFrame.within(() => {
        this.helpTitle
          .should('be.visible')
          .should('have.text', expectedTitle);
      })
    }
}  

export default new helpPage();
