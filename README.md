This project contains automated test script for making a card donation and verify that the donation reference displayed on the thank you page is the same as that in the response of the transaction API call. It uses Cypress and TypeScript. It follows the Page Object Model pattern for organizing test components and also includes accessibility checks.Accessibility violations are logged during the test execution but don't cause the test to fail. 

Prerequisites:
Node.js (Version 12 or higher)
npm (comes with Node.js)

Technologies Used:
Cypress for end-to-end testing
TypeScript for strong typing
Other plugins and integrations as defined in package.json

Getting Started
1.Clone the Repository:
git clone https://github.com/your-username/payment_form.git
cd payment_form
2.Install Dependencies:
npm install
3.Running the Tests:
-Open Cypress Test Runner:
npm run cy:open
-Run tests headlessly:
npm run cy:run

Commands for cross-browser testing are available in the package.json file under the "scripts" section. These allow you to run tests across different browsers.


