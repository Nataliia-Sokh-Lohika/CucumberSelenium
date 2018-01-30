var {After, When, Then, Before} = require('cucumber');
var {URL, build_driver} = require('../../test/basic_test');
var ReportsPage = require('../../pages/ReportsPage');
var assert = require('cucumber-assert');
var driver = null;
var reportsPage = null;

// Before(function () {
//   driver = build_driver();
//   reportsPage = new ReportsPage(driver);
//   reportsPage.open(URL);
// });

// After(function () {
//   reportsPage.driver.quit();
// });

When(/^I click on tab Report$/, function () {
  return reportsPage.clickReportsButton();
});

Then(/^Report tab is not active$/, function (done) {
  reportsPage.isReportsChartDisplayed().then(function (actualResult) {
    assert.equal(actualResult, true, done, "Reports tab is not displayed");
  });
});

Then(/^I should see Report Chart$/, function (done) {
  reportsPage.isReportsChartDisplayed().then(function (actualResult) {
    assert.equal(actualResult, true, done, "Reports tab is not displayed");
  });
});
