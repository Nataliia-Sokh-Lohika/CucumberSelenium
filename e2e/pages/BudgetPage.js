'use strict';

let BasicPage = require('./BasicPage');
let By = require('selenium-webdriver').By;
let Until = require('selenium-webdriver').until;

function BudgetPage(webdriver) {
  BasicPage.call(this, webdriver);
}

BudgetPage.prototype = Object.create(BasicPage.prototype);
BudgetPage.prototype.constructor = BudgetPage;

/**
 * Locators for the elements in this page
 * @type {string}
 */
let BUDGET_LINK = 'a[href="/budget"]';
let BUDGET_TABLE = '.opmhI';
let VALUE_INPU_FIELD = '[name=\'value\']';
let TABLE_RECORDS = 'table.opmhI tr';
let SUBMIT_BUTTON = 'button[type="submit"]';


/**
 * Checks if the Budget page is loaded
 * @returns {BudgetPage}
 */
BudgetPage.prototype.isLoaded = function () {
  this.driver.wait(Until.elementIsVisible(this.driver.findElement(By.css(BUDGET_LINK))));
  this.driver.wait(Until.elementIsVisible(this.driver.findElement(By.css(BUDGET_TABLE))));
  return this;
};

/**
 * Gets the title of the page
 * @returns {!webdriver.promise.Promise.<string>}
 */
BudgetPage.prototype.getTitle = function () {
  return this.driver.getTitle();
};

/**
 * click Budget button
 *
 */
BudgetPage.prototype.clickBudgetButton = function () {
  return this.driver.findElement(By.css(BUDGET_LINK)).click();
};

/**
 * Gets the displayed status of the Budget table
 */
BudgetPage.prototype.isBudgetTableDisplayed = function () {
   return this.driver.findElement(By.css(BUDGET_TABLE)).isDisplayed();
};

/**
 * is Budget tab Active
 *
 */
BudgetPage.prototype.isBudgetTabActive = function () {
  return this.driver.findElement(By.css(BUDGET_LINK)).isEnabled();
};

/**
 * get number of records in the table
 *
 */
BudgetPage.prototype.getNumberOfRecords = function () {
   return this.driver.findElements(By.css(TABLE_RECORDS))
    .then(function (elems) {
      return elems.length;
    });
};

/**
 *add new record to the table
 *
 */
BudgetPage.prototype.addNewRecord = function (arg) {
  this.driver.findElement(By.css(VALUE_INPU_FIELD)).sendKeys(arg);
  this.driver.findElement(By.css(SUBMIT_BUTTON)).click();
  return this;
};

module.exports = BudgetPage;
