//NOTE IF YOU ARE USING SPECIFIC config.js files for different environments this will not be used

let { defineConfig } = require("cypress");

/*
///ANYTHING IN THIS SECTION WILL BE RAN ***ONCE*** BEFORE ALL OF THE TESTS HAVE STARTED
///If you want to do things before each test you can use e2e.js and a BEFORE_EACH hook
For example the code below would start notepad.exe ONCE
If you want to 
var { exec } = require("child_process");
//the function acts like a shell, so just use shell commands.
console.log("*************************This should only appear once*************************")
exec("C:\\Windows\\notepad.exe");

*/


module.exports = defineConfig(
  {
  //Anything you put in here can be accessed anywhere in the code using Cypress.config('name of the env')
  reporter: 'cypress-mochawesome-reporter',
  retries: 0,
  viewportWidth: 1920,
  viewportHeight: 1080,
  video: true,
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Cypress Inline Reporter',
    embeddedScreenshots: true,
    inlineAssets: true, //Adds the asserts inline
  },

  //defaultCommandTimeout: 15000,
    
  e2e: {
    chromeWebSecurity: false,
    baseUrl:'http://172.187.168.54',

    //Anything you put in here can be accessed anywhere in the code using Cypress.env('name of the env')
    env: {
      username: 'pvadmin',
      password: 'pvadmin12345#',
      analyserVersion: 'V4.0.0.124'
    },

    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        log(message){
          console.log(message)
          return null
        }
      }),
      require('cypress-mochawesome-reporter/plugin')(on);

    },
  },
});
