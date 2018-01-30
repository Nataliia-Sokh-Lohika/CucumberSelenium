Feature: Report Page is working due to requirements
  All the transactions are displayed in the balance and report

  Background: I go to the server

  @reports
  Scenario: Check Report page title
    When I click on tab Report
    Then The page title should be "Budgeting App - Educational React App"

  @reports
  Scenario: Check Report tab is not active by default
    When I click on tab Report
    Then Report tab is not active

  @reports
  Scenario: Check Report chart is displayed
    When I click on tab Report
    Then I should see Report Chart

  @todo @reports
  Scenario: Check check Inflow vs active by default

  @todo @reports
  Scenario: Check inflow tab has 2 rect  charts

  @todo @reports
  Scenario: Check Spending by categories has 1 chart

  @todo @reports
  Scenario: Check categories names

  @todo @reports
  Scenario: Check ability to ad a value

  @todo @reports
  Scenario: Check incomes shown in reports

  @todo @reports
  Scenario: Check value is enable when value is set

  @todo @reports
  Scenario: check outcomes are displayed on reports

