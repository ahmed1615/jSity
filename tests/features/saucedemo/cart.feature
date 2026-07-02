@saucedemo @cart
Feature: Cart
  As a logged-in user
  I want to manage items in my cart
  So that I can review and adjust my selection before checkout

  Background:
    Given I am logged in as "standard_user"

  @smoke
  Scenario: I can see the product I added when I open my cart
    When I add "Sauce Labs Backpack" to the cart from home page
    And I navigate to the cart page
    Then the cart should contain "Sauce Labs Backpack"

  Scenario: I add two products and both appear in my cart
    When I add "Sauce Labs Backpack" to the cart from home page
    And I add "Sauce Labs Bike Light" to the cart from home page
    And I navigate to the cart page
    Then the cart should have 2 items

  Scenario: I remove the only item and my cart becomes empty
    When I add "Sauce Labs Backpack" to the cart from home page
    And I navigate to the cart page
    And I remove "Sauce Labs Backpack" from the cart
    Then the cart should be empty

  Scenario: I remove one item and the other one stays in my cart
    When I add "Sauce Labs Backpack" to the cart from home page
    And I add "Sauce Labs Bike Light" to the cart from home page
    And I navigate to the cart page
    And I remove "Sauce Labs Backpack" from the cart
    Then the cart should contain "Sauce Labs Bike Light"
    And the cart should not contain "Sauce Labs Backpack"

  Scenario: The price I see in my cart matches what I saw in the shop
    When I add "Sauce Labs Backpack" to the cart from home page
    And I navigate to the cart page
    Then the cart item price should match the inventory price for "Sauce Labs Backpack"
