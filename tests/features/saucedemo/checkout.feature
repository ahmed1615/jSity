@saucedemo @checkout
Feature: Checkout
  As a user with items in my cart
  I want to complete the checkout process
  So that I can place my order successfully

  Background:
    Given I am logged in as "standard_user"
    And I add "Sauce Labs Backpack" to the cart from home page
    And I navigate to the cart page
    And I proceed to checkout

  @negative
  Scenario: I forget to enter my first name and get an error
    When I fill checkout info with first name "" last name "Doe" postal code "12345"
    And I continue to checkout step two
    Then I should see a checkout error containing "First Name is required"

  @negative
  Scenario: I forget to enter my last name and get an error
    When I fill checkout info with first name "John" last name "" postal code "12345"
    And I continue to checkout step two
    Then I should see a checkout error containing "Last Name is required"

  @negative
  Scenario: I forget to enter my postal code and get an error
    When I fill checkout info with first name "John" last name "Doe" postal code ""
    And I continue to checkout step two
    Then I should see a checkout error containing "Postal Code is required"

  @smoke
  Scenario: I fill in my details and move to the order summary
    When I fill checkout info with first name "John" last name "Doe" postal code "12345"
    And I continue to checkout step two
    Then I should be on the checkout overview page

  Scenario: The total I pay includes the item price and tax
    When I fill checkout info with first name "John" last name "Doe" postal code "12345"
    And I continue to checkout step two
    Then the order total should equal subtotal plus tax

  @smoke
  Scenario: I complete my order and see a confirmation message
    When I fill checkout info with first name "John" last name "Doe" postal code "12345"
    And I continue to checkout step two
    And I finish the order
    Then I should see the order confirmation message
