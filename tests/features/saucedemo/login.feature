@saucedemo @login
Feature: Login
  As a user
  I want to authenticate on saucedemo.com
  So that I can access the product inventory

  Background:
    Given I am on the saucedemo login page

  @smoke
  Scenario: I can see the login logo when I open the page
    Then I should see the login logo

  @smoke
  Scenario: I can log in with my correct username and password
    When I sign in with username "standard_user" and password "secret_sauce"
    Then I should be on the inventory page
    And I should see the inventory list with multiple items

  @negative
  Scenario: I get an error when I type the wrong username or password
    When I sign in with username "invalid_user" and password "invalid_pass"
    Then I should see a login error containing "Username and password do not match"

  @negative
  Scenario: I cannot log in because my account has been locked
    When I sign in with username "locked_out_user" and password "secret_sauce"
    Then I should see a login error containing "locked out"

  @negative
  Scenario: I try to log in without typing anything
    When I click the login button without entering credentials
    Then I should see a login error containing "Epic sadface: Username is required"

  @negative
  Scenario: I forget to type my username before logging in
    When I sign in with username "" and password "secret_sauce"
    Then I should see a login error containing "Username is required"

  @negative
  Scenario: I forget to type my password before logging in
    When I sign in with username "standard_user" and password ""
    Then I should see a login error containing "Password is required"
