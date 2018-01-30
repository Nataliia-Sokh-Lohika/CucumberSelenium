'use strict';

let Promise = require('selenium-webdriver').promise;
let Until = require('selenium-webdriver').until;
let WAIT_TIME_PRESENT = 10000;
let WAIT_TIME_BEFORE_RETRY = 500;
let debug = false;
/**
 * Base constructor for a pageobject
 * Takes in a WebDriver object
 * Sets the Webdriver holder in the base page surfacing this to child page objects
 * @param webdriver
 * @constructor
 */
function BasicPage(webdriver) {
  this.driver = webdriver;
}

BasicPage.prototype.open = function(url) {
  this.driver.get(url);
  return this;
};

BasicPage.prototype.waitForDisplayed = function(locator, timeout) {
  timeout = timeout || WAIT_TIME_PRESENT;
  let defer = Promise.defer();
  let driver = this.driver;
  // Explicitly wait for the element to be located
  driver.wait(Until.elementLocated(locator),timeout).then(function () {
    if (debug){console.log('waitForDisplayed::Element is located : ' + locator);}
    // Get the element and explicitly wait for the element to be visible
    let element = driver.findElement(locator);
    driver.wait(Until.elementIsVisible(element),timeout).then(function() {
      if (debug){console.log('waitForEnabled::Element is visible ' + locator);}
      // After it is enabled check if it is really displayed
      return driver.findElement(locator).isDisplayed();
    }, function (err) /* error call back*/ {

      if (err.name === 'StaleElementReferenceError') {
        if (debug){console.log('waitForDisplayed::Element not visible with error : ' + err.name + ' retrying...');}
        driver.sleep(WAIT_TIME_BEFORE_RETRY);
        element = driver.findElement(locator);
        driver.wait(Until.elementIsVisible(element),timeout).then(function() {
          if (debug){console.log('waitForEnabled::Element is visible after retry ' + locator);}
          // After it is enabled check if it is really displayed
          return driver.findElement(locator).isDisplayed();
        }, function (err) /* error call back*/ {
          console.log('waitForDisplayed::Element is still not visible after retry, error : ' + err);
          defer.reject(err + ' : ' + locator)
        }).then(function(displayed){
          if (debug){console.log('waitForDisplayed::Element : ' + locator + ' .isDisplayed() : '+ displayed);}
          defer.fulfill(displayed);
        });
      }
      else {
        console.log('waitForDisplayed::Element is not visible, error : ' + err);
        defer.reject(err + ' : ' + locator)
      }

    }).then(function(displayed){
      if (debug){console.log('waitForDisplayed::Element : ' + locator + ' .isDisplayed() : '+ displayed);}
      defer.fulfill(displayed);
    });
    // Can do it this way too but we are opting for for verboseness in the framework, hence the above
    //.then(defer.fulfill);
  }, function (err) /* error call back*/ {
    console.log('waitForDisplayed::Element was not found, error : ' + err);
    defer.reject(err + ' : ' + locator)
  });
  return defer.promise;
};

BasicPage.prototype.isDisplayed = function(locator, timeout) {
  timeout = timeout || WAIT_TIME_PRESENT;
  let defer = Promise.defer();
  let driver = this.driver;
  // Explicitly wait for the element to be located first
  driver.wait(Until.elementLocated(locator),timeout).then(function() {
    if (debug){console.log('Element is located : ' + locator);}
    // If its located check of if it is visible
    let element = driver.findElement(locator);
    driver.wait(Until.elementIsVisible(element),timeout).then(function() {
      // If it is visible then check if it is displayed
      driver.findElement(locator).isDisplayed().then(function (isDisplayed) {
        if (debug) {console.log('Element is displayed : ' + isDisplayed + locator);}
        defer.fulfill(isDisplayed);
      }, function (err) /* error call back*/ {
        if (debug) {console.log('Element is NOT displayed : ' + locator);}
        defer.fulfill(false);
      });
    }, function (err) /* error call back*/ {
      console.log('Element is not visible, error : ' + err);
      defer.fulfill(false);
    });
  }, function (err) /* error call back*/ {
    console.log('Element is not located, error : ' + err);
    defer.fulfill(false);
  });
  return defer.promise;
};

BasicPage.prototype.waitForEnabled = function(locator, timeout) {
  timeout = timeout || WAIT_TIME_PRESENT;
  let defer = Promise.defer();
  let driver = this.driver;
  driver.sleep(300); // Special case for enabled, wait a bit for stability
  // Explicitly wait for the element to be located
  driver.wait(Until.elementLocated(locator),timeout).then(function () {
    if (debug){console.log('waitForEnabled::Element is located : ' + locator);}
    // Get the element and explicitly wait for the element to be visible
    let element = driver.findElement(locator);
    driver.wait(Until.elementIsVisible(element),timeout).then(function() {
      if (debug){console.log('waitForEnabled::Element is visible : ' + locator);}
      // Get the element again and explicitly wait for it to be enabled
      element = driver.findElement(locator);
      driver.wait(Until.elementIsEnabled(element),timeout).then(function() {
        if (debug){console.log('waitForEnabled::Element is enabled ' + locator);}
        // After it is enabled check if it is really enabled
        return driver.findElement(locator).isEnabled();
      }, function (err) /* error call back*/ {
        console.log('waitForEnabled::Element is not enabled, error : ' + err);
        defer.reject(err + ' : ' + locator);
      }).then(function(enabled){
        if (debug){console.log('waitForEnabled::Element : ' + locator + ' isEnabled() : '+ enabled);}
        defer.fulfill(enabled);
      });
    },function (err) /* error call back*/ {

      if (err.name === 'StaleElementReferenceError') {
        if (debug){console.log('waitForEnabled::Stale element on wait elementIsVisible retrying...');}
        driver.sleep(WAIT_TIME_BEFORE_RETRY);
        element = driver.findElement(locator);
        driver.wait(Until.elementIsVisible(element),timeout).then(function() {
          if (debug){console.log('waitForEnabled::Element is visible after retry : ' + locator);}
          // Get the element again and explicitly wait for it to be enabled
          element = driver.findElement(locator);
          driver.wait(Until.elementIsEnabled(element),timeout).then(function() {
            if (debug){console.log('waitForEnabled::Element is enabled ' + locator);}
            // After it is enabled check if it is really enabled
            return driver.findElement(locator).isEnabled();
          }, function (err) /* error call back*/ {

            if (err.name === 'StaleElementReferenceError') {
              if (debug){console.log('waitForEnabled::Stale element on wait elementIsEnabled retrying...');}
              driver.sleep(WAIT_TIME_BEFORE_RETRY);
              element = driver.findElement(locator);
              driver.wait(Until.elementIsEnabled(element),timeout).then(function() {
                if (debug){console.log('waitForEnabled::Element is enabled after retry ' + locator);}
                // After it is enabled check if it is really enabled
                return driver.findElement(locator).isEnabled();
              }).then(function(enabled){
                if (debug){console.log('waitForEnabled::Element : ' + locator + ' isEnabled() : '+ enabled);}
                defer.fulfill(enabled);
              });
            } else {
              console.log('waitForEnabled::Element is not enabled, error : ' + err);
              defer.reject(err + ' : ' + locator);
            }

          }).then(function(enabled){
            if (debug){console.log('waitForEnabled::Element : ' + locator + ' isEnabled() : '+ enabled);}
            defer.fulfill(enabled);
          });
        },function (err) /* error call back*/ {
          console.log('waitForEnabled::Element is still not visible after retry, error : ' + err);
          defer.reject(err + ' : ' + locator);
        });
      } else {
        console.log('waitForEnabled::Element is not visible, error : ' + err);
        defer.reject(err + ' : ' + locator);
      }

    });
  }, function (err) /* error call back*/ {
    console.log('waitForEnabled::Element was not found, error : ' + err);
    defer.reject(err + ' : ' + locator);
  });
  return defer.promise;
};

module.exports = BasicPage;
