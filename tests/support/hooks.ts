import * as fs from 'fs';
import * as path from 'path';
import { Before, After, BeforeAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { CustomWorld } from './world';
import { LoginPage } from '../../pages/saucedemo/LoginPage';

setDefaultTimeout(30 * 1000);

export const SESSION_FILE = path.resolve('.auth/session.json');

BeforeAll(async function () {
  if (!fs.existsSync(SESSION_FILE)) {
    fs.mkdirSync(path.dirname(SESSION_FILE), { recursive: true });
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(process.env.VALID_USERNAME!, process.env.VALID_PASSWORD!);
    await context.storageState({ path: SESSION_FILE });
    await browser.close();
  }
});

Before(async function (this: CustomWorld) {
  await this.init();
});

After(async function (this: CustomWorld) {
  await this.close();
});