let {test, build_driver, assert, URL} = require('./basic_test');
let BudgetPage = require('../pages/BudgetPage');
let ReportsPage = require('../pages/ReportsPage');
let driver = null;
let budgetPage = null;
let reportsPage = null;
  /**
 * Simple Budget example test Suite
 */
test.describe('Budget tests', function() {
  this.timeout(20000);

  test.beforeEach(function() {
    driver = build_driver();
    budgetPage = new BudgetPage(driver);
    reportsPage = new ReportsPage(driver);
    reportsPage.open(URL);
    });

  test.it('Check title is correct', function() {
    budgetPage.open(URL);
    budgetPage.isLoaded();
    budgetPage.getTitle().then(function (result) {
      assert.equal(result, 'Budgeting App - Educational React App',
        'Title is  not correct');
    });
  });

  test.it('Check Budget table is displayed', function() {
    budgetPage.open(URL);
    budgetPage.isBudgetTableDisplayed().then(function(result){
      assert.isTrue(result, 'Table is not visible');
    });
  });

  test.afterEach(function() {
     driver.quit();
    });

});
