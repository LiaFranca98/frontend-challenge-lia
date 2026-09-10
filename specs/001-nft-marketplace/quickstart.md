# Quickstart & Validation Guide

## Setup
1. `npm install`
2. `npm run dev` (Starts the Vite development server with MSW enabled)

## Validation Scenarios

### 1. Catalog Discovery
- Open the application.
- Apply a filter and search term.
- Verify the URL updates with query parameters.
- Reload the page; verify the filters and search term are restored and applied.

### 2. Authenticated Checkout
- Add an NFT to the cart.
- Log in with mock credentials.
- Navigate to the checkout page.
- Apply a coupon code (e.g., `DISCOUNT10`).
- Verify the totals are recalculated by the MSW mock.
- Submit the order and verify the success receipt.

### 3. Real-time Updates
- Open the application in two tabs.
- In tab 1, view an NFT detail page.
- (Dev Tools) Trigger a Socket.IO price update event via MSW.
- Verify the price updates immediately on the screen without a page reload.

### 4. E2E Testing
- Run `npx playwright test`
- Verify all critical user journeys pass in headless mode.
