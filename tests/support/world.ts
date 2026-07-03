import * as dotenv from 'dotenv';
import * as fs from 'fs';
dotenv.config();
import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium, Page } from '@playwright/test';
import { LoginPage } from '../../pages/saucedemo/LoginPage';
import { SESSION_FILE } from './hooks';
import { InventoryPage } from '../../pages/saucedemo/InventoryPage';
import { CartPage } from '../../pages/saucedemo/CartPage';
import { CheckoutPage } from '../../pages/saucedemo/CheckoutPage';

export class CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  loginPage?: LoginPage;
  inventoryPage?: InventoryPage;
  cartPage?: CartPage;
  checkoutPage?: CheckoutPage;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async init(): Promise<void> {
    const storageState = fs.existsSync(SESSION_FILE) ? SESSION_FILE : undefined;
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext({
      storageState,
      viewport: { width: 1280, height: 720 },
    });
    this.page = await this.context.newPage();
    this.loginPage = new LoginPage(this.page);
    this.inventoryPage = new InventoryPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
  }

  async close(): Promise<void> {
    await this.context?.close();
    await this.browser?.close();
  }
}

setWorldConstructor(CustomWorld);
