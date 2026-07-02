import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When(
  'I fill checkout info with first name {string} last name {string} postal code {string}',
  async function (this: CustomWorld, firstName: string, lastName: string, postalCode: string) {
    await this.checkoutPage!.fillShippingInfo(firstName, lastName, postalCode);
  },
);

When('I continue to checkout step two', async function (this: CustomWorld) {
  await this.checkoutPage!.continue();
});

When('I finish the order', async function (this: CustomWorld) {
  await this.checkoutPage!.finish();
});

Then('I should be on the checkout overview page', async function (this: CustomWorld) {
  await expect(this.page!).toHaveURL(/checkout-step-two/);
});

Then('the order total should equal subtotal plus tax', async function (this: CustomWorld) {
  const subtotalText = await this.checkoutPage!.itemTotal.innerText();
  const taxText = await this.checkoutPage!.tax.innerText();
  const totalText = await this.checkoutPage!.getOrderTotal();

  const subtotal = parseFloat(subtotalText.replace(/[^0-9.]/g, ''));
  const tax = parseFloat(taxText.replace(/[^0-9.]/g, ''));
  const total = parseFloat(totalText.replace(/[^0-9.]/g, ''));

  expect(total).toBeCloseTo(subtotal + tax, 2);
});

Then('I should see the order confirmation message', async function (this: CustomWorld) {
  const text = await this.checkoutPage!.getConfirmationText();
  expect(text).toContain('Thank you for your order');
});

Then(
  'I should see a checkout error containing {string}',
  async function (this: CustomWorld, text: string) {
    const error = await this.checkoutPage!.getErrorMessage();
    expect(error).toContain(text);
  },
);
