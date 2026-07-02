# SauceDemo QA Automation

End-to-end BDD automation suite for [saucedemo.com](https://www.saucedemo.com) built with **TypeScript**, **Playwright**, and **Cucumber**.

---

## Project Structure

```
jSity/
├── pages/
│   └── saucedemo/
│       ├── LoginPage.ts
│       ├── InventoryPage.ts
│       ├── CartPage.ts
│       └── CheckoutPage.ts
├── tests/
│   ├── features/
│   │   └── saucedemo/
│   │       ├── login.feature
│   │       ├── inventory.feature
│   │       ├── cart.feature
│   │       └── checkout.feature
│   ├── step-definitions/
│   │   ├── login.steps.ts
│   │   ├── inventory.steps.ts
│   │   ├── cart.steps.ts
│   │   └── checkout.steps.ts
│   ├── support/
│   │   ├── world.ts
│   │   └── hooks.ts
│   └── fixtures/
│       └── index.ts
├── cucumber.js
├── playwright.config.ts
└── package.json
```

---

## Setup

**Requirements:** Node.js 18+

```bash
npm install
npx playwright install chromium
```

### Environment Variables

Create a `.env` file in the project root:

```env
BASE_URL=https://www.saucedemo.com
VALID_USERNAME=standard_user
VALID_PASSWORD=secret_sauce
```

---

## Running Tests

### Run all scenarios
```bash
npm run jsity
```

### Run by viewport
```bash
npm run jsity:web     
npm run jsity:mobile  
```

### Run by feature
```bash
npm run jsity:login
npm run jsity:home-page
npm run jsity:cart
npm run jsity:checkout
```

### Run smoke tests only
```bash
npm run jsity:smoke
```

---

## Allure Report

### Run tests and generate report
```bash
npm run allure:run
```

### Open existing report
```bash
npm run allure:open
```

---

## Test Coverage

| Feature | Scenarios | Tags |
|---------|-----------|------|
| Login | 7 | `@login` |
| Home Page | 10 | `@home-page` |
| Cart | 5 | `@cart` |
| Checkout | 6 | `@checkout` |
| **Total** | **28** | |

### What is tested

**Authentication**
- Valid credentials → redirect to inventory
- Invalid credentials → error message
- Locked-out user → specific error
- Empty username / empty password → required field errors

**Home Page**
- 6 products displayed after login
- Sort A–Z, Z–A, price low–high, price high–low
- Cart badge updates when adding or removing items
- Add up to 5 items and verify badge count
- Remove items and verify badge decreases

**Cart**
- Added product appears in cart
- Multiple items tracked correctly
- Remove single item / remove one of many
- Product price preserved from inventory to cart

**Checkout**
- Empty first name / last name / postal code rejected
- Valid info proceeds to order summary
- Order total = subtotal + tax
- Order completion shows confirmation message

**Responsive Behavior**

Tests run on both **Desktop** and **Mobile** viewports using dedicated scripts:

```bash
npm run jsity:web 
npm run jsity:mobile  
```

| Viewport | Width | Height |
|----------|-------|--------|
| Desktop | 1280px | 720px |
| Mobile | 375px | 812px |

---

## Test Users

| User | Username | Password |
|------|----------|----------|
| Standard | `standard_user` | `secret_sauce` |
| Locked out | `locked_out_user` | `secret_sauce` |
| Problem user | `problem_user` | `secret_sauce` |
| Performance glitch | `performance_glitch_user` | `secret_sauce` |

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev) | Browser automation |
| [Cucumber](https://cucumber.io) | BDD framework |
| [TypeScript](https://www.typescriptlang.org) | Type-safe test code |
| [Allure](https://allurereport.org) | Test reporting |
| Page Object Model | Maintainable selectors & actions |
