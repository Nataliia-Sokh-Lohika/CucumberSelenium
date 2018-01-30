let {test, build_driver, assert, URL} = require('./basic_test');
let ReportsPage = require('../pages/ReportsPage');
let driver = null;
let reportsPage = null;
  /**
 * Simple Reports example test Suite
 */
test.describe('Reports tests', function() {
  this.timeout(20000);

  test.beforeEach(function() {
    driver = build_driver();
    reportsPage = new ReportsPage(driver);
    });

  test.it('Check title is correct', function() {
    reportsPage.open(URL);
    reportsPage.clickReportsButton();
    reportsPage.isLoaded();
    reportsPage.getTitle().then(function (result) {
      assert.equal(result, 'Budgeting App - Educational React App',
        'Title is not correct');
    });
  });

  test.it('Check Reports chart is displayed', function() {
    reportsPage.open(URL);
    reportsPage.clickReportsButton();
    reportsPage.isReportsChartDisplayed().then(function(result){
      assert.isTrue(result, 'Chart is  not visible');
    });
  });

  test.afterEach(function() {
     driver.quit();
    });

});
