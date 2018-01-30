'use strict';

var BasicPage = require('./BasicPage');
var By = require('selenium-webdriver').By;
var Until = require('selenium-webdriver').until;

function ReportsPage(webdriver) {
  BasicPage.call(this, webdriver);
}

ReportsPage.prototype = Object.create(BasicPage.prototype);
ReportsPage.prototype.constructor = ReportsPage;

/**
 * Locators for the elements in this page
 * @type {string}
 */
var REPORTS_LINK = 'a[href="/reports"]';
var REPORTS_CHART = '._27stx';


/**
 * Checks if the Reports page is loaded
 * @returns {ReportsPage}
 */
ReportsPage.prototype.isLoaded = function () {
  this.driver.wait(Until.elementIsVisible(this.driver.findElement(By.css(REPORTS_LINK))));
  this.driver.wait(Until.elementIsVisible(this.driver.findElement(By.css(REPORTS_CHART))));
  return this;
};

/**
 * Gets the title of the page
 * @returns {!webdriver.promise.Promise.<string>}
 */
ReportsPage.prototype.getTitle = function () {
  return this.driver.getTitle();
};

/**
 * click Reports button
 *
 */
ReportsPage.prototype.clickReportsButton = function () {
  this.driver.findElement(By.css(REPORTS_LINK)).click();
};

/**
 * Gets the displayed status of the Reports chart
 */
ReportsPage.prototype.isReportsChartDisplayed = function () {
  return this.driver.findElement(By.css(REPORTS_CHART)).isDisplayed();
};

/**
 * is Reports tab Active
 *
 */
ReportsPage.prototype.isReportsTabActive = function () {
  return this.driver.findElement(By.css(REPORTS_LINK)).isEnabled();
};

module.exports = ReportsPage;
