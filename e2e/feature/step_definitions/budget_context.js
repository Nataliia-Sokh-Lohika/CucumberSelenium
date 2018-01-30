var {After, When, Then, Before} = require('cucumber');
var {URL, build_driver} = require('../../test/basic_test');
var BudgetPage = require('../../pages/BudgetPage');
var assert = require('cucumber-assert');
var budgetPage = null;
var driver = null;

Before(function () {
  driver = build_driver();
  budgetPage = new BudgetPage(driver);
  budgetPage.open(URL);

});

After(function () {
  budgetPage.driver.quit();
});

When('I am on {string} URI', function (string) {
  budgetPage.open(string);
});

When(/^I go to the server$/, function () {
  budgetPage.open(URL);

});

When(/^The page title should be "([^"]*)"$/, function (expectedTitle, done) {

  budgetPage.getTitle().then(function (actualTitle) {
    assert.equal(actualTitle, expectedTitle, done, "Title is not correct! Expected is - "+expectedTitle
    + " but Actual is "+ actualTitle)
  });


});

Then(/^"([^"]*)" tab is active$/, function (tab, done) {
   budgetPage.isBudgetTabActive().then(function (actual_result) {
    assert.equal(actual_result, true, done, "Budget tab is not active")
  })
});


When(/^I click on tab "([^"]*)"$/, function (tab) {

  budgetPage.clickBudgetButton();

});

Then(/^I should see Budget table$/, function (done) {

  budgetPage.isBudgetTableDisplayed().then(function (actual_result) {
    assert.equal(actual_result, true, done, "Budget table is not displayed");
  });

});

Then(/^"([^"]*)" table should have column (.*)$/, function (arg1, callback) {
});

Then(/^"([^"]*)" table should have record (.*)$/, function (arg1, callback) {
});

When(/^I click on "([^"]*)" dropdown$/, function (arg1, callback) {
  callback(null, 'reason why pending');
});

Then(/^I should see the list of categories$/, function (callback) {
  callback(null, 'reason why pending');
});

  Then(/^I add a record with "([^"]*)"$/, function (arg1) {
    return budgetPage.addNewRecord(arg1);
});

  Then(/^I check number of records is (\d+)$/, function (expectedNumberOfRecords, callback) {
     budgetPage.getNumberOfRecords().then(function (actualNumberOfRecords) {
      assert.equal(actualNumberOfRecords,expectedNumberOfRecords, callback, "Number of records is not matching! " +
        "expected to be "+ expectedNumberOfRecords + " but actual number is " + actualNumberOfRecords);
    })

});

  Then(/^I refresh the page$/, function () {
     return driver.navigate().refresh();
});
