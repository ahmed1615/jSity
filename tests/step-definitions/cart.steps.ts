import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('I navigate to the cart page', async function (this: CustomWorld) {
  await this.cartPage!.navigate();
});

When('I proceed to checkout', async function (this: CustomWorld) {
  await this.cartPage!.proceedToCheckout();
});

When(
  'I remove {string} from the cart',
  async function (this: CustomWorld, productName: string) {
    await this.cartPage!.removeItem(productName);
  },
);

Then(
  'the cart should contain {string}',
  async function (this: CustomWorld, productName: string) {
    const names = await this.cartPage!.getCartItemNames();
    expect(names).toContain(productName);
  },
);

Then(
  'the cart should not contain {string}',
  async function (this: CustomWorld, productName: string) {
    const names = await this.cartPage!.getCartItemNames();
    expect(names).not.toContain(productName);
  },
);

Then('the cart should have {int} items', async function (this: CustomWorld, expected: number) {
  const count = await this.cartPage!.getCartItemCount();
  expect(count).toBe(expected);
});

Then('the cart should be empty', async function (this: CustomWorld) {
  const count = await this.cartPage!.getCartItemCount();
  expect(count).toBe(0);
});

Then(
  'the cart item price should match the inventory price for {string}',
  async function (this: CustomWorld, productName: string) {
    const inventoryNames = await this.inventoryPage!.getProductNames();
    const inventoryPrices = await this.inventoryPage!.getProductPrices();
    const idx = inventoryNames.indexOf(productName);
    const expectedPrice = inventoryPrices[idx];

    const cartNames = await this.cartPage!.getCartItemNames();
    const cartPrices = await this.cartPage!.getCartItemPrices();
    const cartIdx = cartNames.indexOf(productName);
    expect(cartPrices[cartIdx]).toBe(expectedPrice);
  },
);
