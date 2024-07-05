// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-mochawesome-reporter/register';

// Alternatively you can use CommonJS syntax:
// require('./commands')

//This must be here for xpath to work:
require('cypress-xpath');
//This must be here for cypress-real-events to work e.g. hover
import "cypress-real-events";
//This must here to use the cypress=-iframe plugin
import 'cypress-iframe';

//This stops uncaught:exceptions in the website code from failing teh Cypress tests:
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

beforeEach(() => {
  //Everything in here runs before EACH test i.e. each IT block
  cy.clearCookies()
  cy.clearLocalStorage()
  cy.clearAllSessionStorage({log: true})
});


