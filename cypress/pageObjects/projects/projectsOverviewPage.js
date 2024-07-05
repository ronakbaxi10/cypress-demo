import BasePage from '../basePage';
import ProjectViewPage from './projectViewPage';

class projectsOverviewPage extends BasePage {

  viewAndCheckProject(projectName){
    cy.xpath(`(//a[contains(text(),"${projectName}")])[1]`)
      .should('be.visible')
      .click();
    cy.url().should('include', 'ProjectView?');
    ProjectViewPage.projectNameLabel
      .should('be.visible')
      .should('contain',projectName);
  }
}
export default new projectsOverviewPage();
