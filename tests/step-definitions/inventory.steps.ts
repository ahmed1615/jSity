import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When(
  'I add {string} to the cart from home page',
  async function (this: CustomWorld, productName: string) {
    await this.inventoryPage!.addProductToCart(productName);
  },
);

When(
  'I remove {string} from the cart from home page',
  async function (this: CustomWorld, productName: string) {
    await this.inventoryPage!.removeFromCart(productName);
  },
);

When(
  'I sort the home page by {string}',
  async function (this: CustomWorld, option: string) {
    await this.inventoryPage!.sortBy(option);
  },
);

Then(
  'I should see {int} products on the home page',
  async function (this: CustomWorld, expected: number) {
    const count = await this.inventoryPage!.getProductCount();
    expect(count).toBe(expected);
  },
);

Then('the product names should be sorted alphabetically ascending', async function (this: CustomWorld) {
  const names = await this.inventoryPage!.getProductNames();
  const firstName = await this.inventoryPage!.getFirstProductName();
  const firstLetter = firstName[0].toUpperCase();
  const minLetter = [...names].map(n => n[0].toUpperCase()).sort()[0];
  expect(firstLetter).toBe(minLetter);
});

Then('the product names should be sorted alphabetically descending', async function (this: CustomWorld) {
  const names = await this.inventoryPage!.getProductNames();
  const firstName = await this.inventoryPage!.getFirstProductName();
  const firstLetter = firstName[0].toUpperCase();
  const maxLetter = [...names].map(n => n[0].toUpperCase()).sort().reverse()[0];
  expect(firstLetter).toBe(maxLetter);
});

Then('the product prices should be sorted ascending', async function (this: CustomWorld) {
  const prices = await this.inventoryPage!.getProductPrices();
  const firstPrice = await this.inventoryPage!.getFirstProductPrice();
  expect(firstPrice).toBe(Math.min(...prices));
});

Then('the product prices should be sorted descending', async function (this: CustomWorld) {
  const prices = await this.inventoryPage!.getProductPrices();
  const firstPrice = await this.inventoryPage!.getFirstProductPrice();
  expect(firstPrice).toBe(Math.max(...prices));
});

Then('the cart badge should not be visible', async function (this: CustomWorld) {
  const count = await this.inventoryPage!.getCartBadgeCount();
  expect(count).toBe(0);
});

Then('the cart badge should show {int}', async function (this: CustomWorld, expected: number) {
  const count = await this.inventoryPage!.getCartBadgeCount();
  expect(count).toBe(expected);
});

Then('I should see the inventory list with multiple items', async function (this: CustomWorld) {
  await expect(this.inventoryPage!.inventoryList).toBeVisible();
  const count = await this.inventoryPage!.inventoryItems.count();
  expect(count).toBeGreaterThan(1);
});
