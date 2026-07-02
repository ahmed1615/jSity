import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
Given('I am on the saucedemo login page', async function (this: CustomWorld) {
  await this.loginPage!.navigate();
});

Given('I am logged in as {string}', async function (this: CustomWorld, _username: string) {
  await this.page!.goto(`${process.env.BASE_URL}/inventory.html`);
  if (!this.page!.url().includes('inventory')) {
    await this.loginPage!.navigate();
    await this.loginPage!.login(process.env.VALID_USERNAME!, process.env.VALID_PASSWORD!);
  }
});

When(
  'I sign in with username {string} and password {string}',
  async function (this: CustomWorld, username: string, password: string) {
    await this.loginPage!.login(username, password);
  },
);

When('I click the login button without entering credentials', async function (this: CustomWorld) {
  await this.loginPage!.loginButton.click();
});

Then('I should be on the inventory page', async function (this: CustomWorld) {
  await expect(this.page!).toHaveURL(/inventory\.html/);
});

Then('I should see the login logo', async function (this: CustomWorld) {
  await expect(this.loginPage!.loginLogo).toBeVisible();
});

Then(
  'I should see a login error containing {string}',
  async function (this: CustomWorld, text: string) {
    const error = await this.loginPage!.getErrorMessage();
    expect(error).toContain(text);
  },
);
