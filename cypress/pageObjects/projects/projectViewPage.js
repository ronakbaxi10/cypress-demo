import BasePage from '../basePage';

class projectViewPage extends BasePage {

  get projectNameLabel() {
    return cy.get('#MainContent_projectNameLabel');
  } 

}
export default new projectViewPage();
