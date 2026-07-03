import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly productItems: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly inventoryList: Locator;
  readonly inventoryItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.inventoryList = page.locator('[data-test="inventory-list"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
  }

  async getProductCount(): Promise<number> {
    return this.productItems.count();
  }

  async sortBy(value: string): Promise<void> {
    await this.sortDropdown.selectOption({ value });
  }

  async addProductToCart(productName: string): Promise<void> {
    const inputName = productName.toLowerCase().replace(/\s+/g, '-');
    await this.page.locator(`[data-test="add-to-cart-${inputName}"]`).click();
  }

  async getCartBadgeCount(): Promise<number> {
    const isVisible = await this.cartBadge.isVisible();
    if (!isVisible) return 0;
    const text = await this.cartBadge.innerText();
    return parseInt(text, 10);
  }

  async getProductNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allInnerTexts();
  }

  async getFirstProductName(): Promise<string> {
    return this.page.locator('.inventory_item_name').first().innerText();
  }

  async getProductPrices(): Promise<number[]> {
    const texts = await this.page.locator('.inventory_item_price').allInnerTexts();
    return texts.map(t => parseFloat(t.replace('$', '')));
  }

  async getFirstProductPrice(): Promise<number> {
    const text = await this.page.locator('.inventory_item_price').first().innerText();
    return parseFloat(text.replace('$', ''));
  }

  async removeFromCart(productName: string): Promise<void> {
    const inputName = productName.toLowerCase().replace(/\s+/g, '-');
    await this.page.locator(`[data-test="remove-${inputName}"]`).click();
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }
}
