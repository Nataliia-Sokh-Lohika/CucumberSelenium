Feature: Budget Page is working due to requirements
  User can add different catigories of incomes and outcomes
  All the transactions are displayed in the balance and report

  Background: I go to the server

  @budget
  Scenario: Check Budget page title
    Then The page title should be "Budgeting App - Educational React App"

  @budget
  Scenario: Check Budget tab is active by default
    When I click on tab "Budget"
    Then "Budget" tab is active

  @budget
  Scenario: Check Budget table is displayed
    When I click on tab "Budget"
    Then I should see Budget table

  @fail @budget @test2
  Scenario: Check records are present after page refresh
    When I add a record with "12345"
    And I check number of records is 9
    And I refresh the page
    Then I check number of records is 9

  @budget
  Scenario Outline: : Check Budget table has correct columns
    When I click on tab "Budget"
    Then "Budget" table should have column <columnName>
  Examples:
  |columnName|
  |Category  |
  |Description|
  |Amount     |

  @budget
  Scenario Outline: Check Budget table has preset records
    When I click on tab "Budget"
    Then "Budget" table should have record <Category>
  Examples:
  |Category|
  |Groceries|
  |Travel  |
  |Income|
  |Entertainment|
  |Misc|
  |Income|

  @budget
  Scenario: Check ability to select a budget category
    When I click on tab "Budget"
    And I click on "Catrgory" dropdown
    Then I should see the list of categories

  @todo @budget
  Scenario: Check the list of categories

  @todo @budget
  Scenario: Check ability to add a description of record

  @todo @budget
  Scenario: Check ability to ad a value

  @todo @budget
  Scenario: Check add button is disable when value is not set

  @todo @budget
  Scenario: Check value is enable when value is set

  @todo @budget
  Scenario: Set value then unset it(check add button inactive)

  @todo @budget
  Scenario: Set value +123 for consumption

  @todo @budget
  Scenario: Check record was added with description

  @todo @budget @test2
  Scenario: Check record was added w\o description

  @todo @budget @test2
  Scenario: Check only numbers for amount are availiable

  @todo @budget
  Scenario: Set value with decimals  - see the alert

  @todo @budget @test2
  Scenario: Set 16 digits number
# there is the rounding issue
  @todo @budget
  Scenario: Check the record was added to the table

  @todo @budget @test2
  Scenario: check the record affected the balance records correct

  @todo @budget
  Scenario: Check negative balance should be with “-“
#  Failed
  @todo @budget @test2
  Scenario: check Star button is displayed and clickable

  @todo @budget @test2
  Scenario: check Fork button is displayed and clickable

  @todo @budget @test2
  Scenario: check logo is displayed







