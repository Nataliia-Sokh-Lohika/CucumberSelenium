let assert = require('chai').assert;
let webdriver = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');
let test = require('selenium-webdriver/testing');

module.exports = {

  URL:process.env.URL || "http://localhost:3000",
  build_driver: function(){return new webdriver.Builder()
    .forBrowser("chrome")
    .build()},
  test,
  chrome,
  assert,
  webdriver
};



