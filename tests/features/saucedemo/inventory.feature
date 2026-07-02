@saucedemo @home-page
Feature: Home Page
  As a logged-in user
  I want to browse the product list
  So that I can find and select items to purchase

  Background:
    Given I am logged in as "standard_user"

  @smoke
  Scenario: I can see all 6 products when I open the shop
    Then I should see 6 products on the home page

  @sorting
  Scenario: I sort the products from A to Z by name
    When I sort the home page by "az"
    Then the product names should be sorted alphabetically ascending

  @sorting
  Scenario: I sort the products from Z to A by name
    When I sort the home page by "za"
    Then the product names should be sorted alphabetically descending

  @sorting
  Scenario: I sort the products from cheapest to most expensive
    When I sort the home page by "lohi"
    Then the product prices should be sorted ascending

  @sorting
  Scenario: I sort the products from most expensive to cheapest
    When I sort the home page by "hilo"
    Then the product prices should be sorted descending

  Scenario: My cart is empty before I add anything
    Then the cart badge should not be visible

  Scenario: I add one product and my cart shows 1 item
    When I add "Sauce Labs Backpack" to the cart from home page
    Then the cart badge should show 1

  Scenario: I add two products and my cart shows 2 items
    When I add "Sauce Labs Backpack" to the cart from home page
    And I add "Sauce Labs Bike Light" to the cart from home page
    Then the cart badge should show 2

  Scenario: I add 5 products and my cart shows 5 items
    When I add "Sauce Labs Backpack" to the cart from home page
    And I add "Sauce Labs Bike Light" to the cart from home page
    And I add "Sauce Labs Bolt T-Shirt" to the cart from home page
    And I add "Sauce Labs Fleece Jacket" to the cart from home page
    And I add "Sauce Labs Onesie" to the cart from home page
    Then the cart badge should show 5

  Scenario: I add 5 products then remove 2 and my cart goes down to 3
    When I add "Sauce Labs Backpack" to the cart from home page
    And I add "Sauce Labs Bike Light" to the cart from home page
    And I add "Sauce Labs Bolt T-Shirt" to the cart from home page
    And I add "Sauce Labs Fleece Jacket" to the cart from home page
    And I add "Sauce Labs Onesie" to the cart from home page
    Then the cart badge should show 5
    When I remove "Sauce Labs Fleece Jacket" from the cart from home page
    And I remove "Sauce Labs Onesie" from the cart from home page
    Then the cart badge should show 3
