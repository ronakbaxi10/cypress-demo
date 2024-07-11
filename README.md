# ProcessVue-Test-Automation-Framework

# Pre-requisites

-	You must have node 18 or later installed:
  Open a command prompted and type: node -v
  If it is installed it will show you the version - make sure it is at least 18. If it is not installed go to the following link, download
  the file and then install it:

 https://nodejs.org/en/download/prebuilt-installer

Confirm it has been installed by typing node - v and a version should now be shown.

- You also need npm which should have been installed with node. Check this by opening a command prompt and typing npm -v. A version number should be shown.

- You need git installed in order to clone the code. Instructions on how to install here:
https://www.simplilearn.com/tutorials/git-tutorial/git-installation-on-windows

-	Visual Studio code installed
- Install the ESLINT extension into Visual Studio Code (View - Extensions - Search for ESLINT and it not already installed - install it)

-------------------------------------------------------------------------------------------------------------------------------------------------

# How to install

- Clone the code
- Open a terminal in visual studio and type: npm install
- You are now ready to run the tests!

-------------------------------------------------------------------------------------------------------------------------------------------------
# How to run the tests

## Method 1: Through Cypress UI

To run the tests through the Cypress UI use this command:

npx Cypress open
Then select the test you want to run

## Method 2: From the command line

If you don't want to go into Cypress UI and just run them from the terminal use commands such as this:
npx cypress run --browser chrome                    *All of the tests will be ran in chrome in headless mode (i.e. you won't see anything happening)*
npx cypress run --browser chrome --headed           *All of the tests will be ran in chrome in headed mode (i.e. you WILL see it running)*
npx cypress run --browser chrome --headed --spec "cypress/e2e/login/invalidLogin.cy.js"   *A SPECIFIC TEST will be ran*
npx cypress run --browser chrome --headed --spec "cypress/e2e/login/*"      *All tests in a folder will be ran*

## Method 3: Set up NPM Shortcuts

Finally you can go into package.json and set up some npm shortcuts as shown in the example below

  "scripts": {
    "chrome": "npx cypress run --browser chrome --headed",
    "edge": "npx cypress run --browser edge --headed"
    "electron": "npx cypress run --browser electron --headed"
  },

You can then go to the terminal and simply type 'npm run chrome' and it will run the saved command e.g. npx cypress run --browser chrome --headed

-------------------------------------------------------------------------------------------------------------------------------------------------

# Cypress HTML Test Report

*Note: The report does NOT get generated when you run tests inside Cypress UI*

After you run a test a HTML Test REport should be written and the console should show you where as per the following:

Create HTML report
HTML report successfully created!
C:\dev\repositories\processvue-guardian-test-automation-framework\cypress\reports\html\index.html

For info in how I added and configured this report read this:

https://www.browserstack.com/guide/cypress-html-reporter

I have configured it to create a simple shareable file
-------------------------------------------------------------------------------------------------------------------------------------------------

# Javascript v TypeScript

This project is configured to use Javascript hence why the test file names end with .js

If you want to use typescript instead, the files need to end with .ts

You also need to install the Typescript package and configure Cypress to use it as follows:


Run this command to install typescript: npm install typescript --save-dev
Run this command to create a typescript config file: npx tsc --init

Replace the contents of the new tsconfig.json file with this:

{
  "compilerOptions": {
    "target": "es5",
    "lib": ["es5", "dom"],
    "types": ["cypress", "node"]
  },
  "include": ["**/*.ts"]
}

And as mentioned above, your test files will need to end with .ts instead of .js

For further info on using typescript with Cypress, read this:

https://www.codemotion.com/magazine/frontend/web-developer/how-to-set-up-a-cypress-typescript-project/
-------------------------------------------------------------------------------------------------------------------------------------------------

# ESLINT

ESLINT can be used to highlight instantly errors in your javascript code as you are writing it.

The packages have been added to this solution, however you also need to add the extension to your version of Visual Studio for this to work:

•	Go to: View – Extensions
•	See if ESLint is listed – if not install it.

Now, as you type it should auto run in the background and alert you when it finds any syntax errors.

The config file for eslint is .eslintrc.js.

I have just set this to look for default eslint/cypress coding errors.

If you want to make it more specific you can add your own personal rules into the file and tell it exactly what to check for or what NOT to check for.

For more info, read this: 

https://www.digitalocean.com/community/tutorials/linting-and-formatting-with-eslint-in-vs-code

Note: If ESLINT doesn't seem to be working correctly, on the terminal click on the 'OUTPUT' tab and choose 'ESLint' from the drop-down. This will
show if it isn't working correctly. Also if you click on the PROBLEMS tab, you can see all of the current syntax problems that ESLint has found.

-------------------------------------------------------------------------------------------------------------------------------------------------
# Help with finding selectors

If you are struggling to find an element selector there is a great Chrome add on called Selenium IDE that you can use to record the action
you want to do and then look at the selector it used - it provides a selection of different selectors you could try.

You can test your element selectors by opening Chrome Developer Tools, clicking on the elements tab, press Ctrl_F to search and then 
entering your element selector - it should find one result only.

-------------------------------------------------------------------------------------------------------------------------------------------------
# Writing to the console

If you are running your tests through the Cypress UI, you can simply use cy.log as shown in the example below:

cy.log("Hello");

You will then see this in the Cypress UI.
 
However, this will NOT write anything to the Visual Studio terminal, so if you are running it headless from the command line you won’t see anything.

If you want to write logging to the visual studio terminal you need to use cytask as shown below:

cytask("log","your message here");

as shown in this example:

cy.task("log","******************************This is console log : Navigated to home page***************************");



Note: In order to get cytask to write logs to the terminal I had to follow the steps shown below - however this is done now so doesn't need to
be done again:

In order to get it to write to the command line you have to add this: 

on('task', {
        log(message){
          console.log(message)
          return null
        }

into the setupNodeEvents section of cypress.config.js (all of them if you have one for each environment!) as shown here:

e2e: {
    baseUrl:'https://risk.lexisnexis.co.uk',

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


-------------------------------------------------------------------------------------------------------------------------------------------------

# BaseUrl

Base Url goes in cypress.config.js in the e2e section as shown below:

  e2e: {
    baseUrl:'https://risk.lexisnexis.co.uk',

Each test should start with a:

cy.visit('') 

command. This will automatically open the baseUrl

or if you want to go to another path you would use:

cy.visit('/path/to/your/url') 

This would open:

https://risk.lexisnexis.co.uk/path/to/your/url

-------------------------------------------------------------------------------------------------------------------------------------------------

# Accessing values you have saved in cypress.config.js

# Method 1: env

Variables should be added to cypress.config.js in an ‘env’ section as shown below:

e2e: {
    baseUrl:'https://www.skysports.com',

    //Anything you put in here can be accessed anywhere in the code using Cypress.env('name of the env')
    env: {
      mattTest: 'abcd'
    },

These values can then be access anywhere in the code using:
Cypress.env('name of variable') e.g. Cypress.env('mattTest')

This could then be written to the Cypress UI window using this:
cy.log('**************************'+Cypress.env('mattTest')+'***********');

Or to the Visual Studio console using this:

cy.task("log","*****************"+Cypress.env('mattTest')+"***************");


# Method 2: config

Anything you put in the root of this file can be accessed using

Cypress.config('name of variable') e.g. Cypress.config('mattTest')

module.exports = defineConfig(
  {
  //Anything you put in here can be accessed anywhere in the code using Cypress.config('name of the env')
  mattTest : "abcd",
  reporter: 'cypress-mochawesome-reporter',
  video: false,

This could then be written to the Cypress UI window using this:
cy.log('**************************'+Cypress.config('mattTest')+'***********');

Or to the Visual Studio console using this:

cy.task("log","***************"+Cypress.config('mattTest')+"***************");

-------------------------------------------------------------------------------------------------------------------------------------------------
# How I got xPath to work with Cypress

Cypress doesn't inherently support xPath - it is CSS only. But you can add xPath support as follows:

I added this package to package.json and ran npm install:


   "cypress-xpath": "^2.0.1"

I added this line to support/e2e.js

require('cypress-xpath');


I could then find elements using xpath like this:

  get chooseYourIndustryLink() {
    return cy.xpath('//a[contains(text(),"Choose Your Industry")]');
  }

-------------------------------------------------------------------------------------------------------------------------------------------------

# How to make sure an element is visible before clicking it

To make the system wait for element before trying to click in add .should('be.visisble') before clicking it as shown below:

  get chooseYourIndustryLink() {
		return cy.xpath('//a[contains(text(),"Choose Your Industry")]');
	}

  clickOnChooseYourIndustryLink() {
    this.chooseYourIndustryLink
      .should('be.visible')
      .click();    
  }


-------------------------------------------------------------------------------------------------------------------------------------------------

# Wait for element not existing

this.acceptCookiesPopUp.should('not.exist');

-------------------------------------------------------------------------------------------------------------------------------------------------

# Check if elements exists/visible

cy.get(selector).should('exist')

cy.get(selector).should('not.exist')

cy.get(selector).should('be.visible')

cy.get(selector).should('not.be.visible')

-------------------------------------------------------------------------------------------------------------------------------------------------

# Code to clear cookies

If the popup DEFINITELY appears you can use this:

  clearCookies() {
    this.acceptCookiesPopUp
      .should('be.visible')
      .click()
      .should('not.be.visible');
  }

If it MIGHT be there but it might not, you can use this:

  clearCookies() {
            this.acceptCookiesPopUp.then($element => {
            if ($element.is(':visible')){
              cy.task("log","***************The cookie popup IS visible***************************");
              this.acceptCookiesPopUp 
                .click()
                .should('not.be.visible');
            }
            else {
                cy.task("log","***************The cookie popup IS NOT visible***************************");
            }
        })  


(Note: if ($element.is(':visible') is using JQuery)

-------------------------------------------------------------------------------------------------------------------------------------------------

# If element is/is NOT visible

Note: In order for the following to work, the element MUST exist. If it doesn't exist it won't work.
So this tests if an existing element is visible or not - e.g. a popup alert.

(Note: if ($element.is(':visible') is using JQuery)

All you need to do is change the element shown at the beginning i.e. change this.newShiftCreationAlertCloseButton to your own element:

        this.newShiftCreationAlertCloseButton.then($element => {
            if ($element.is(':visible')){
                cy.task("log","***************Element IS visible***************************");
            }
            else {
                cy.task("log","***************Element is NOT visible***************************");
            }
        })  


(Note: if ($element.is(':visible') is using JQuery)

****Note: The following code does *NOT* work - it will FAIL the test if the element does NOT exist:**
                                                      if (this.acceptCookiesPopUp.should('be.visible') == true)
                                                        {
                                                          //Element IS visible - write code here
                                                        }
                                                      else
                                                      {
                                                        //Element is NOT visible - write code here
                                                      }

-------------------------------------------------------------------------------------------------------------------------------------------------

# If element does/does NOT exist

NOTE: Checking if an element exists does NOT wait for 4 seconds to see if it exists - it does it there and then - so if it is not there straight
away this while fail unless you update the code to wait or check a few times until it appears.
Checking for visibility DOES wait for 4 seconds!

The following code works in BOTH scenarios - if the element exist AND if the element does NOT exist.

All you have to change is the selector in body.find. Also the actual selector has to be there - you can't pass in an element e.g. this.cancelButton - as that will fail if the element isn't there.

		cy.get("body").then($body => {
			if ($body.find("#ctl00_Main_EmptyShiftAlertPopUp_HCB-1").length > 0) {   
				cy.task("log","***************Element Exists***************************");
			}
			else {
				cy.task("log","***************Element does NOT Exist***************************");
			}
		});

    
Note: I don't really like the selector being hard coded here and an element selector should really only be used once in your code in case it changes.
So a way around this is, on your page file, at the top before the word 'class', save the element selector string as a variable. In the example below, I have named
the variable newShiftCreationAlertCloseButtonSelector.

import BasePage from './basePage';
let newShiftCreationAlertCloseButtonSelector = '#ctl00_Main_EmptyShiftAlertPopUp_HCB-1 > .dxWeb_pcCloseButton_DevEx'

class workListsPage extends BasePage {

Then when you save the element itself you can use that variable instead of writing the actual selector string as shown below:

    get newShiftCreationAlertCloseButton() {
        return cy.get(newShiftCreationAlertCloseButtonSelector);
    } 

And in your code to see if the element exists, you would use the variable again - so the actual element selector string is only written in your code once:

    cy.get("body").then($body => {
      if ($body.find(newShiftCreationAlertCloseButtonSelector).length > 0) {   
        cy.task("log","***************Element Exists***************************");
      }
      else {
        cy.task("log","***************Element does NOT Exist***************************");
      }
    });

****Note: The following code does *NOT* work - it will FAIL the test if the element does NOT exist:**
                                                        if (this.yourelement.should('exist'))
                                                          {
                                                        else
                                                        {
                                                        }

-------------------------------------------------------------------------------------------------------------------------------------------------

# The support folder - commands.js/e2e.js

The support folder is a default Cypress folder. It contains 2 files:

commands.js - Cypress says you can put custom commmands in here (although we put them in sharedFunctions.js instead as we are using
pageObject model)

e2e.js - This file can be used for storing variables/properties. You can also put variables/properties in the e2e section of cypress.config.js

-------------------------------------------------------------------------------------------------------------------------------------------------

# Cypress Assertions

Here is the full documentation on assertions:

https://docs.cypress.io/guides/references/assertions

You can use the keyword 'should', when you type .should(‘ all of the assertions you can use are then listed for you.

*Check if a field is empty or not*
LogInPage.usernameTextBox.should('be.empty')
LogInPage.usernameTextBox.should('not.be.empty')


*Check if text box has a certain value in it:*
LogInPage.usernameTextBox.should('have.value','username');


*Check if elements exist/don't exist*
LogInPage.usernameTextBox.should('exist')
LogInPage.usernameTextBox.should('not.exist')


*Check if elements are visible or not*
LogInPage.usernameTextBox.should('be.visible')
LogInPage.usernameTextBox.should('not.be.visible')


*Check if checkbox elements are CHECKED or not*
LogInPage.usernameCheckboxBox.should('be.checked')
LogInPage.usernameCheckboxBox.should('not.be.checked')


*To assert inner text on on any element that is NOT an <input> i.e NOT a textbox:
this.analyserVersionField
.should('have.text', expectedAnalyserVersion)    //exact match
.should('contain', expectedAnalyserVersion)      //partial match


*To assert the value in an <input> field i.e. a textbox
LogInPage.usernameTextBox.should('have.value','matt'); //exact match
LogInPage.usernameTextBox
    .invoke('val')
    .should('contains','matt');
  });                                                  //partial match

-------------------------------------------------------------------------------------------------------------------------------------------------

# How to enter Text

Use 'type' as shown here:

  enterUserName(username) {
    this.usernameTextBox
      .should('be.visible')
      .type(username)   
  }

-------------------------------------------------------------------------------------------------------------------------------------------------

# Assert the value/text of an element

I wanted to check that an element <h1> contained the value/text 'Error!' as shown below:

<h1 class="title">Error!</h1>

This is how I did it:

  assertError() {
    this.errorTitle
      .should('be.visible')
      .should('contain','Error!')
  }

-------------------------------------------------------------------------------------------------------------------------------------------------

# Scroll element into view

this.errorTitle.scrollIntoView()

-------------------------------------------------------------------------------------------------------------------------------------------------

# Scroll to top or bottom of page

cy.scrollTo('top', { duration: 1000 });

cy.scrollTo('bottom', { duration: 1000 });

-------------------------------------------------------------------------------------------------------------------------------------------------

# #How to check and uncheck checkboxes and assert they have correctly been checked/unchecked:
  checkAndUncheckSanderCheckBox() {
    this.sanderCheckBox
      .should('exist')
      .scrollIntoView()
      .should('be.visible')
      .check()
      .should('be.checked')
      .uncheck()
      .should('not.be.checked')
  }

-------------------------------------------------------------------------------------------------------------------------------------------------

# How to get a video of your tests

To get a video of your tests, in cypress.config.js the 'video' value should be set to true as shown below:

  video: true,

After running your test the video will then be saved to cypress/videos
-------------------------------------------------------------------------------------------------------------------------------------------------

# CSS selectors v XPath Selectors in PageObject

CSS selectors (cypress's preference) used cy.get:
  get dropDown() {
		return cy.get('select#dropdown');
	} 

XPath selectors (cypress's preference) used cy.xpath:
  get sanderCheckBox() {
		return cy.xpath('//label[contains(text(),"Sander")]/input');
	} 
  
-------------------------------------------------------------------------------------------------------------------------------------------------
# Function to select a value from a dropDown by text

I have put this function in sharedFunctions so it can be used by any page:

  selectTextFromDropDown(dropDownElement, textToSelect) {
    dropDownElement
      .should('be.visible')
      .select(textToSelect)
    //Validate the correct option has been selected:  
    cy.get("select option:selected")
      .invoke("text")
      .should("eq", textToSelect)
  }

  To use this function use something like this: HomePage.selectTextFromDropDown(HomePage.dropDown,'Option 2');

  Note, you can also check the value if you like: .invoke("val")

  You can select an item from the dropdown using its VALUE in EXACTLY the same way: 

      dropDownElement
      .select(valueToSelect)

  And you can select by id using this:

      dropDownElement
      .select(1)

-------------------------------------------------------------------------------------------------------------------------------------------------

# Retries

If you want Cypress to automatically retry failed tests, set the value in cypress.config.ts as shown below:

reporter: 'cypress-mochawesome-reporter',
  video: false,
  retries: 2,

-------------------------------------------------------------------------------------------------------------------------------------------------

# Change timeout for one request

The default timeout for commands in Cypress is 4000.

You can override that for one command by sending a timeoutvalue as shown below:

cy.get('.result',{ timeout: 10000 }).should('be.visible');

-------------------------------------------------------------------------------------------------------------------------------------------------

# Fixtures

There is a Fixtures folder that contains a file called example.json

Fixures are for storing static data e.g. if you have a data file you want to load in.

An example would be if you want to store a requestBody - you would save the file in the fixtures folder called requestBody.json for example.

You could then use it in your test with the following:

let requestBody = require("../fixtures/requestBody.json");
-------------------------------------------------------------------------------------------------------------------------------------------------

# Default Cypress Timeouts

These are the DEFAULT Cypress Timeouts:

Option	              Default	Description
defaultCommandTimeout	4000	  Time, in milliseconds, to wait until most DOM based commands are considered timed out.
execTimeout	          60000	  Time, in milliseconds, to wait for a system command to finish executing during a cy.exec() command.
taskTimeout	          60000	  Time, in milliseconds, to wait for a task to finish executing during a cy.task() command.
pageLoadTimeout	      60000	  Time, in milliseconds, to wait for page transition events or cy.visit(), cy.go(), cy.reload() commands to fire their page load events. 

Network requests are limited by the underlying operating system, and may still time out if this value is increased.
requestTimeout	      5000	  Time, in milliseconds, to wait for a request to go out in a cy.wait() command.
responseTimeout	      30000	  Time, in milliseconds, to wait until a response in a cy.request(), cy.wait(), cy.fixture(), cy.getCookie(), cy.getCookies(), cy.setCookie(), cy.clearCookie(), cy.clearCookies(), and cy.screenshot() commands.

-------------------------------------------------------------------------------------------------------------------------------------------------

# How to OVERRIDE any of the timeouts

You can override any of the above timeouts by adding a new value anywhere in cypress.config.js

For example to override the defaultCommandTimeout to 15 seconds, put this anywhere in in cypress.config.js:

defaultCommandTimeout: 15000,

-------------------------------------------------------------------------------------------------------------------------------------------------

# Hooks - Where to put code that runs before every test

In the support folder is a javascript file called e2e.js

This file is read BEFORE each test so is a great place to put things like this:

beforeEach(() => {
    cy.task("log","****************I run before every test in every spec file!!!!!!****************");
  })
*/


---------------------------------------------------------------------------------------------------------------------------------

# How to open an exe in Cypress

Probably the best way to open an exe before you run your tests is to do it OUTSIDE of Cypress, e.g. you could add it to your npm
scripts to start the exe before you run your tests and then close it afterwards.

However you CAN open an exe in cypress.config.js - (DON'T DO IT IN CYPRESS TESTs), however it would still be left open after the tests have finished.

If you put the following code in cypress.config.js, it would start notepad.exe ONCE before ALL of the tests start.
Note that is goes in between the let { defineConfig } = require("cypress"); and module.exports = defineConfig( lines:

let { defineConfig } = require("cypress");

var { exec } = require("child_process");
console.log("*************************This should only appear once*************************")
exec("C:\\Windows\\notepad.exe");

module.exports = defineConfig(

Note: I tried using the following but it doesn't work - it is a known bug:

  on('before:run', (details) => {
        console.log("*********************************************before:run triggered")
    })

   on('after:run', (results) => {
       console.log("********************************************after:run triggered")
   })  

-----------------------------------------------------------------------------------------------------------------------------------

# How to switch to a different window in Cypress

Cypress doesn't actually support switching windows - but there are some workarounds here:

https://stackoverflow.com/questions/47749956/access-a-new-window-cypress-io

The easiest way is simply to STOP the new window opening and make it use the current window instead as shown below. The way to do this is 
to inspect the element and you should see that it has an ATTRIBUTE called 'target' as shown here: target="_blank". It is this attribute
that forces a new window to open when you click on it. So as a workaround, you can REMOVE this attribute and the new page will then load
in the CURRENT window so can then continue as normal. 

To do this you use .invoke('removeAttr', 'target') as shown below:

//Remove the 'target' attribute from this element so that the Help page opens in the CURRENT window rather than a new one:

          this.helpLink
          .should('be.visible')
          .invoke('removeAttr', 'target')
          .click()
          cy.url().should('include', 'AnalyserHelp');


-----------------------------------------------------------------------------------------------------------------------------------

# How to force Cypress to click an element that is in the DOM but not currently visible

It's not great practice but if you can't get the element to appear and if it is not crucial to the test you can use {force: true}
and the element will be clicked even if it is not currently visible.

For example:

logOut(){
  this.logOutButton
  .click({force: true})
}

-----------------------------------------------------------------------------------------------------------------------------------

# How to test a Cypress command manually

Create a test that runs to the point you want to manually test your command
Run: npx Cypress open 
Select your test so that it runs and stops at the
Once it has ran, type F12 so that Chrome Developer Tools runs in Cypress
Click on the Console tab

You can now run Cypress commands manually by typing them into the console.
The command must begin with Cypress.$('yourSelector) then the normal Cypress command:

Cypress.$('yourSelector').rightclick()

e.g. Cypress.$('.fa.fa-user.fa-lg.whiteColor').rightclick()

NOTE: This only seems to work for NATIVE Cyress commands - e.g. we can't run commands from the cypress-real-events package in this way!

-----------------------------------------------------------------------------------------------------------------------------------

# How to handle hover with cypress-real-events

**NOTE: Cypress-real-events only works in CHROME, EDGE and Electron - Not in Firefox!**

Cypress doesn't have an inbuilt hover function, so if you need to hover over an element to see a menu for example, you need to 
install a package called cypress-real-events which is documented here:

https://www.npmjs.com/package/cypress-real-events

- Add the latest cypress-real-events package to package.json e.g.:

    "cypress-real-events": "^1.12.0"

- In the terminal type: npm install to install it

- In support/e2e.js add this line:

import "cypress-real-events";

You can now use this command to hover over an element:

hoverOverElement(element){
  //Hovers are very temporamental so added a wait here to help
  cy.wait(2000);
    element
      .should('be.visible')
      //If you are already hovered over the element, the sub menu will not appear, so I move the mouse away so you are definitely NOT already hovering over it
      .realMouseMove(50, 50, { position: "center" });
    element.realHover();
}

Here are some other real events you can do with this package:

Here is an overview of the available real event commands:

cy.realClick
cy.realHover
cy.realPress
cy.realTouch
cy.realType
cy.realSwipe
cy.realMouseDown
cy.realMouseUp
cy.realMouseMove
cy.realMouseWheel

-----------------------------------------------------------------------------------------------------------------------------------

# Uncaught exception error

My test was failing due to an 'Uncaught exception error' in the actual website code.
I didn't want this to fail my test so added the following into e2e.js:

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

-----------------------------------------------------------------------------------------------------------------------------------


# Alternative to using 'type'

I was having problems with one of my cy.type commands.

So instead I used the realType command from cypress-real-events

as shown here:

cy.realType(valueToEnter);

That fixed the problem

-----------------------------------------------------------------------------------------------------------------------------------

# How select the FIRST element when several elements are returned with your selector

THIS CAN ONLY BE DONE WITH XPATH - with CSS there is no way of selecting one element when several are returned!

I was using this selector:

//img[@class="dxGridView_gvHeaderFilter_DevEx dxgv__hfb dx-vam"]

It returned 10 elements - I wanted to use the FIRST one:

This is how I did it - NOTE: It must have brackets at the beginning and end:

(//img[@class="dxGridView_gvHeaderFilter_DevEx dxgv__hfb dx-vam"])[1]')

This is how I saved the selector in the Page Object Model:

return cy.xpath('(//img[@class="dxGridView_gvHeaderFilter_DevEx dxgv__hfb dx-vam"])[1]');

-----------------------------------------------------------------------------------------------------------------------------------

# How to run the tests on a schedule

If you want to run the tests automatically at a certain time you can do it in either of the following 2 ways:

*Method 1: Using your CI/CD Tool to schedule the task*

If your Cypress tests are plugged into your CI/CD tool e.g. Dev Azure, GitHub, GitLab etc you could use the inbuild task scheduler

*Method 2: Using Window Task Scheduler*

If you want to run the tests on a schedule on your local machine, you can run the tests using Windows Task Scheduler.
First you need to create the file that you want Windows Task Scheduler. You could use a cmd, bat or Powershell (ps1) file to do this.

e.g. create a file with the extension .cmd e.g. cypressScheduled.cmd
In it put the command to move to your Cypress folder and the command you want it to run:

cd C:\dev\repositories\processvue-analyser-test-automation-framework
npx cypress run

Then in the window search bar, type 'Task'
***RIGHT CLICK on Task Scheduler and choose 'Run as Administrator***
Choose 'Create Task'
Give it a Name
On the 'Triggers' tab, choose 'New' and configure when you want it to run
On the 'Actions' tab choose 'New' 
Leave 'Action' set to 'Start a Program'
Click the 'Browse' button and browse to the file you create above
Check the rest of the config and then save

At the scheduled time your tests should now auto run!

-----------------------------------------------------------------------------------------------------------------------------------

# Using different config files for different environments

The default config file = cypress.config.js

If you want to have a different config file for different environments you can follow this example:

I created the following 2 config files:

•	cypress.sit.config.js
•	cypress.uat.config.js

These files IMPORT cypress.config.js and OVERWRITE any values that you set.
So any values applicable to ALL environments should go in cypress.config.js
Any values specific to a particular environment should go in the specific environment config file

Then in packages.json I wrote a command telling it which one to use, using –config-file and then the name of the file I want it to use as shown below:

    "chrome-headed-uat": "npx cypress run --browser chrome --config-file cypress.uat.config.js --headed",
    "chrome-headed-sit": "npx cypress run --browser chrome --config-file cypress.sit.config.js --headed"

-------------------------------------------------------------------------------------------------------------------------------------------------

# How to run tests in parallel on your local machine

## Note I didn't manage to sort out merging the test report - so if you follow these steps to run in parallel you will end up with MANY
## html reports instead of just one

Add the following package to package.json:

"cypress-parallel": "^0.14.0"

Type npm install


Go into cypress.config.js and set the setupNodeEvents section to look like this (otherwise you won't get reports):

setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        log(message){
          console.log(message)
          return null
        }
      }),
      config.reporter = "mochawesome";
      // Specify the reporter options for mochawesome
      let reporterOptions = {
        reportDir: 'cypress/reports',
        charts: true,
        overwrite: false,
        reportPageTitle: "custom-title",
        embeddedScreenshots: true,
        inlineAssets: true,
        saveAllAttempts: false,
        html: true,
        json: false,
      };
      // Update the reporterOptions for mochawesome
      config.reporterOptions = Object.assign(
        {},
        config.reporterOptions,
        reporterOptions
      );
      // Return the updated config
      return config;
    },


Add a command in package.json called somethign like run_parallel, that calls one of your other commands (in the example below it calls chrome-headed-uat):

    "chrome-headed-uat": "npx cypress run --browser chrome --config-file cypress.uat.config.js --headed",
    "run_parallel" : "cypress-parallel -s chrome-headed-uat -t 4 -d 'cypress/e2e/*'"

In the above command, using cypress-parallel plugin to execute cypress tests. This command contains three parts

-s <npm script> – the existing npm script you want to call (in the exaple above chome-headed-uat)
-t <number of threads>
-d <spec file path>

You can then run this from the terminal with this command:


npm run run_parallel

---------------------------------------------------------------------------------------------------------------------

# How to clear text in a text field

To clear existing text in a text field use .clear().

In the example below, I clear the text, then click on the text box and enter some new text:


  this.filterNameTextBox
    .should('be.visible')
    .clear()
    .click()
    .type(newFilterName);

---------------------------------------------------------------------------------------------------------------------

# If element has a certain attribute do one thing else do another

I wanted to check if an element contained an an attribute called 'title'. If it did, do one thing, else do another.
(Note this code uses JQuery)

The name of the element is selectedFiltersText, so we get this element and then use JQuery to look for the attribute 'title',
if this exists and so DOESN'T return undefined or false, we do no one thing - if it doesn't exist we do something else.

So to reuse the code, change the name of the element (selectedFiltersText) and change the the attribute you are looking for (title)

  this.selectedFiltersText.then($element => {
      var attr = $element.attr('title');
      // For some browsers, `attr` is undefined; for others, `attr` is false.  Check for both.
      if (typeof attr !== 'undefined' && attr !== false) {
        cy.task("log","******************************The title attribute EXISTS!***************************");  
      }
      else {
        cy.task("log","******************************The title attribute does NOT EXIST!***************************"); 
      }        
      })  
---------------------------------------------------------------------------------------------------------------------

# How to check if an element has an attribute that EQUALS a string or CONTAINS a string

The following code gets an element. It then gets its attribute called 'alt'.
It then checks to see if the value of the attribute alt = "Expand"
  
    this.folderElementToOpen.then($element => {
    //Check if the folder is already expanded by seeing if it has an attribute of alt="Collapse" - if not expand it
    var attr = $element.attr('alt');
    if (attr == 'Expand') {
      this.folderElementToOpen.click();
    }
  })  
  }


  This does the same but checks if the value CONTAINS a string rather than EQUALS a string:

    this.folderElementToOpen.then($element => {
    //Check if the folder is already expanded by seeing if it has an attribute of alt="Collapse" - if not expand it
    var attr = $element.attr('alt');
    if (attr.includes('Expand')) {
      this.folderElementToOpen.click();
    }
  })  
  }

------------------------------------------------------------------------------------------------------------------ 
# How I checked an element’s attribute CONTAINED a value

I had an element that contained a ‘title’ attribute. I wanted to check that the title CONTAINED this text: "[EventDateTime] Is greater than or equal to");

This is how I did it:

this.selectedFiltersText.invoke('attr', 'title').should('include', "[EventDateTime] Is greater than or equal to");

------------------------------------------------------------------------------------------------------------------ 

# How to extract inner text and write it to the console.log

Just change the name of the element you want to read the inner text from (eventDateTimeRow1Result):

    this.eventDateTimeRow1Result.invoke('text').then((text) => {
      cy.task("log","******************************The extracted text= "+text+" ***************************");
    });

---------------------------------------------------------------------------------------------------------------------
# Using Aliases to store values in Cypress

In Cypress when you want to store a value to be used later in the test, you need to save it as an ALIAS.

Here I extract the inner text and store it as an alias called yourAliasName.

    this.tagRevisionNumberLabel.then((el) => {
      return el.text();
    }).as('yourAliasName');


The inner text can then be used in other commands by getting the alias as shown here:

    cy.get('@yourAliasName').then((tagRevision) => {
      cy.task("log","****************I have saved an alias called: "+yourAliasName+", that has the value: "+tagRevision+". ***************************");        
    });

Note 'tagRevision' can be anything - it just means whatever is stored in your alias so make it something meaningful


NOTE I have now created the following function on the basePage to get text from an element and store it as an alias:

saveElementTextAsAlias(element, aliasName){
  element.then((el) => {
    return el.text();
  }).as(aliasName);
  cy.get(`@${aliasName}`).then((text) => {
    cy.task("log","****************I have saved an alias called: "+aliasName+", that has the value: "+text+". ***************************");        
  });
}

You can use it like this:

ViewEditTagDetailsPage.saveElementTextAsAlias(ViewEditTagDetailsPage.tagRevisionNumberLabel,'newTagRevision');  

You need to pass in the element you want to extract the text from and the name you want the alias to be called

You can call it and use it your test as follows:

cy.get('@originalTagDescription').then((description) => {
  ProjectViewPage.checkRow1ColumnFieldEqualsValue('Tag Description',description)       
});
------------------------------------------------------------------------------------------------------------------
# How to compare aliases

I had alreay created 2 aliaes - originalTagVersion and newTagVersion.

To compare them I had to get one, next use the 'then' keyword and get the other one. I could then compare them as shown here:

    cy.get(`@${originalTagRevisionAlias}`).then((originalTagVersion) => {
      cy.get(`@${newTagRevisionAlias}`).then((newTagVersion) => {
        expect(parseFloat(newTagVersion.replace('0.',''))).to.eq(parseFloat(originalTagVersion.replace('0.','')) + 1);
      });
    });

------------------------------------------------------------------------------------------------------------------    
# How to compare dates

To compare dates in Cypress you can use ".to.be.lessThan" ("to.be.lt" (which is short for lessThan).
Or you can use .to.be.lte which is less than or equal to

expect(originalDate).to.be.lt(todayDate); //Original Date is BEFORE today's date

------------------------------------------------------------------------------------------------------------------  

# How to chain code/commands

If you want to chain some code so that it is done AFTER something else rather than asychronously, you need to use
.then in format shown below:

.then((anything you want to pass down goes here) => {
    your code here          
      })

------------------------------------------------------------------------------------------------------------------  
# How to compare 2 variables in Cypress

Just use the keyword 'expect' at the beginning:

expect(numberOfResultsAfterExpanding).not.equal(numberOfResultsBeforeExpanding)

------------------------------------------------------------------------------------------------------------------ 
# CSS id contains a string / id ENDS with a partial string

a[id*='partialStringAnywhere'] //All a elements that contain the partial string ANYWHERE

a[id*='partialStringatEnd'] // All a elements that contain the partial string at the END

a[id^='partialStringatBeginning'] // All a elements that contain the partial string at the BEGINNING

a[id^='partialStringatBeginning'][id*='partialStringAnywhere'] 
// All a elements that contain the partial string 'partialStringatBeginning' at the BEGINNING AND 'partialStringAnywhere' ANYWHERE

e.g. 

[id^="ctl00_Main"][id*="DisplayTitle"]

Or put an asterix at the front which means any element with those id attributes:

*[id^="ctl00_Main"][id*="DisplayTitle"]

------------------------------------------------------------------------------------------------------------------ 
# How to increase the wait time for a should assertion

The element dashboardsCustomPageTitle sometimes took more that 4 seconds to appear so I wanted to increase
the timeout from the default of 4 seconds for this command:

this.dashboardsCustomPageTitle.should('be.visible')

To do this you have to put the timeout on the get command of the element on the page class as shown below.
This timeout is then passed down into the assertion:

get dashboardsCustomPageTitle() {
  return cy.xpath('//div[text()="System Overview"]',{timeout: 10000});
}
------------------------------------------------------------------------------------------------------------------ 
# How to choose randonly from a list of strings

let reportType = 'MostFrequentAlarmsByTag'; ['Pie', 'Multi', 'Doc','List','Custom','Bars'][Math.floor(Math.random() * 6)];

The number at the end must match the number of strings to choose from

------------------------------------------------------------------------------------------------------------------ 
# How to run Cypress in a Docker

(1) Install Docker Desktop from here: https://docs.docker.com/desktop/install/windows-install/
(2) Download the latest Cypress docker image using this commands:

docker pull cypress/included

This image contains the linux operating system, Cypress itself plus Chrome, Firefox and Edge Browsers

(3) Make sure Docker Deskop is running

(4) Stop and Remove any existing Dockers either by deleting them from the Docker Dashboard or by running the following commands (otherwise they fill up your c drive!):
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)

(5) Make sure you are in the root of your Cypress solution either in a command prompt, Powershell or Visual Studio Terminal

(6) Run this command to run ALL of the tests in your Cypress e2e folder:

docker run -it -v ${PWD}:/autotests -w /autotests cypress/included --spec cypress/e2e --browser chrome

(7) Run this command to run a SPECIFIC test:

docker run -it -v ${PWD}:/autotests -w /autotests cypress/included --spec cypress/e2e/login/invalidLogin.cy.js

(8) If you want to specificy a SPECIFIC version of the cypress/included image you have downloaded instead of just the latest, use this command:

docker run -it -v ${PWD}:/autotests -w / autotests cypress/included:3.2.0

(9) You can see the test report in the NORMAL place on your *LOCAL* machine
e.g. C:\dev\repositories\processvue-analyser-test-automation-framework\cypress\reports\html\index.html

Although you are running the tests in the Docker window, as you have created a link between the volume in the Docker Container and the folder on your local machine it will also WRITE files back to your local machine.

So you can just look in the normal place on your c drive for the report.

(10) If you actually want to see the files in the Docker Container, you need to open it in Docker Desktop

------------------------------------------------------------------------------------------------------------------ 
# iFrames

To get iFrames to work I installed the Cypress Iframe package:

I added this to package.json

    "cypress-iframe": "^1.0.1"

Then within e2e.js I added this line:

import 'cypress-iframe';


After installing the above package, this is how I worked with iFrames:

get helpIFrame() {
		return cy.iframe('frame[name="FrameMain"]');
	}          

this.helpIFrame.within(() => {
            //Any code you do here will be done WITHIN the iframe
            this.helpTitle
              .should('be.visible')
              .should('have.text', 'Projects Overview');
          })


So wihin your element selectors section of your page you get the iFrame using the command cy.iframe.
You can get the iFrame and use the keyword 'within' and all code written within that block will be done
INSIDE the iframe.
------------------------------------------------------------------------------------------------------------------
# How to throw an error and fail the test

If you want to throw an error at any point in your code and fail the test, use this:

cy.get('body').then(() => {
  throw new Error('ERROR! No items in the switch statement match the passed in value of: ' + columnName +'.');

------------------------------------------------------------------------------------------------------------------  

# How I looped through title columns to find a matching title

I created an element selector that matching ALL of the column titles (rather than a unique selector!)
Cypress saves these as an array

The code then loops through the array searching for the passed in title

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

------------------------------------------------------------------------------------------------------------------
# How to find an element within an element

You can use the keyword find plus the element selector, to find an element within an element as shown below:

this.row1ResultFields
            .should('be.visible')
            .find('.fa-solid').should('exist'); 

------------------------------------------------------------------------------------------------------------------ 
# xpath to find sibling elements

To find sibling elements in xpath you can use the keywords:

- preceding-sibling
- following-sibling

For example: I had 2 td sibling elements. I searched for the first one by its text of 'Point Type Text' I then used preceding-sibling
to get the checkbox which was to the left of it as shown here:

//td[text()="Point Type Text"]/preceding-sibling::td[1]

The value one means I was the FIRST preceding sibling from my started point.
------------------------------------------------------------------------------------------------------------------ 
# Only use cy.wait() as a last resort - try throttling the network to see what is causing you to need to wait

Sometimes there is strange behaviour and it seems that the only way to fix it is adding a cy.wait() for a couple of seconds.

cy.waits are frowned upon and are not good practice. You should try to wait for actual things to happen.

Sometimes throttling the network can show you what is causing the problem.

Go into chrome developer tools and click on the network tab.

Click on the down arrow which shows the available throttle settings. I've made a few custom ones e.g. 1kb download, 20, 50, 100 etc.

Select one of these so that the network is slowed down.

Then perform the action that is causing you a problem.

You may then see that there is a loading spinner or something similar that you don't see in normal time.
You could then get the element selector for that element and add some code to wait for that NOT to be visible.

Add this to the test and hopefully it might fix your problem and you can do away with the cy.wait()

------------------------------------------------------------------------------------------------------------------ 
# How I added a afterEach hook to force logout if a test fails

I was getting locked out when a test failed as it didn't log out or I was running out of licences.

So I added an afterEach to logout if the test had not logged out.

In e2e.js I added the following:

import HomePage from '../pageObjects/homePage.js';

afterEach(() => {
  //Everything in here runs after EACH test i.e. each IT block
  //If the test failed and didn't log out - log out so the user account doesn't get locked out
  cy.get("body").then($body => {
    if ($body.find("#userProfileImageUserMenu").length > 0) {   
        HomePage.forceLogOutAfterFailedTest();
    }
  });
});


Note you have to use body.find followed by the element selector to check if an element exists - or it will fail it not there.


On the homePage I added the following function:

    //This should only be used by the afterEach hook when a test fails
    forceLogOutAfterFailedTest(){
    this.logOutButton.click({ force: true });
    //Make sure it is fully logged out!
    LoginPage.usernameTextBox
    .should('be.visible')
    .click();
    }


Note I added the { force: true } command so I could just click it without having to open the menu first.
------------------------------------------------------------------------------------------------------------------ 
# css selector looking for 2 different classes (OR)

Use use a COMMA to signify OR

So in the selector before we look for .dxgvFilterBarLink_Glass OR .dxgvFilterBarLink_DevEx

get selectedFiltersText() {
  return cy.get('.dxgvFilterBarLink_Glass,.dxgvFilterBarLink_DevEx');
}

------------------------------------------------------------------------------------------------------------------ 
# css selector - search for muliple attributes within an element (AND)

The following searches for an input element that has:
- type attribute of 'text' AND
- an id attribute that CONTAINS 'MainContent_UC' AND
- it has a maxlength attribute (with any value as we haven't specified it)
- An autocomplate attribute (with any value as we haven't specified it)

input[type='text'][id*=MainContent_UC][maxlength][autocomplete]

I used the above to find this element:

<input class="dxeEditArea_Moderno dxeEditAreaSys" id="MainContent_UC6402_TextBox_6402_I" name="ctl00$MainContent$UC6402$TextBox_6402" onchange="ASPx.EValueChanged('MainContent_UC6402_TextBox_6402')" type="text" maxlength="80" autocomplete="off">

------------------------------------------------------------------------------------------------------------------ 
# Storing variables to store values in Cypress

*Note the following is for INFO only – in Cypress you should store values that are required later in the test as ALIASES.*

In Cypress you don’t store values as variables, all commands are asynchronous so you can’t save a value and use it later on.

For example, if you tried the following:

  it(THIS WILL NOT WORK, () => {
    let text = "no value set yet";
    cy.visit('/analyser/Default.aspx');  

    LogInPage.analyserVersionField.invoke("text").then((textValue) => {
      text = textValue;
      cy.task("log","***********Inner Val= "+text+" *****************"); 
    })

    cy.task("log","******Inner Val= "+text+" *********************"); 

This prints out the following:

************************Inner Val= V4.0.0.124 ***************************
************************Inner Val= no value set yet ***********************

So we initially created  a variable called ‘text’ with the value ‘no value set yet’.
When we run the code we have a function that changes the value of ‘text’ to V4.0.0.124 and when we print the value of text WITHIN that function, the value has changed.

However, outside of that function, when we print the value of ‘text’ it is still set to ‘no value set yet’.

This is because the commands are asynchronous – so you can’t change the value of a variable in during the test and re-use the changed value in a different command.

The only way you could get this to work using a saved variable would be to have another ‘it’ function – you would change the value of the varible in the first ‘it’ and that value WOULD then be used in the 2nd ‘it’ as that was the value when it started running:

describe('SOE Historical - Expand Test', () => {
let text = "no value set yet";

  it('Check the SOE Historial Expand Functionality is working correctly', () => {
    cy.visit('/analyser/Default.aspx');  

    LogInPage.analyserVersionField.invoke("text").then((textValue) => {
      text = textValue;
      cy.task("log","***********Inner Val= "+text+" *****************"); 
    })

});
it('The changed variable will be shown here', () => {
  cy.task("log","******Inner Val= "+text+" *********************"); 

});
});

This prints out the following:

POST /__cypress/add-verified-command 204 0.532 ms - -
***********Inner Val= V4.0.0.124 *****************
POST /__cypress/add-verified-command 204 1.085 ms - -
******Inner Val= V4.0.0.124 *********************

However, this is NOT the way Cypress wants you to save variables – it wants you to store them as ALIASES.
