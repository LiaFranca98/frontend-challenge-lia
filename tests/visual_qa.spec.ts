import { test, expect } from '@playwright/test';

test.describe('Visual QA for Mobile & Desktop', () => {
  test('Capture Mobile Views (390x844)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    // 1. Mobile Home
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: '/Users/lia/.gemini/antigravity-ide/brain/a948781e-a012-4571-8496-0bcf1d7bb847/.tempmediaStorage/screenshot_mobile_home.png' });

    // 2. Mobile NFT Details
    await page.goto('http://localhost:5173/nfts/nft-1');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: '/Users/lia/.gemini/antigravity-ide/brain/a948781e-a012-4571-8496-0bcf1d7bb847/.tempmediaStorage/screenshot_mobile_details.png' });

    // 3. Mobile Cart Drawer
    await page.click('button[aria-label="Adicionar ao carrinho"]');
    await page.waitForTimeout(600);
    await page.screenshot({ path: '/Users/lia/.gemini/antigravity-ide/brain/a948781e-a012-4571-8496-0bcf1d7bb847/.tempmediaStorage/screenshot_mobile_cart.png' });

    // 4. Mobile Checkout
    await page.goto('http://localhost:5173/checkout');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: '/Users/lia/.gemini/antigravity-ide/brain/a948781e-a012-4571-8496-0bcf1d7bb847/.tempmediaStorage/screenshot_mobile_checkout.png' });
  });

  test('Capture Desktop Views (1440x900)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 1. Desktop Home
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: '/Users/lia/.gemini/antigravity-ide/brain/a948781e-a012-4571-8496-0bcf1d7bb847/.tempmediaStorage/screenshot_desktop_home.png' });

    // 2. Desktop NFT Details
    await page.goto('http://localhost:5173/nfts/nft-1');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: '/Users/lia/.gemini/antigravity-ide/brain/a948781e-a012-4571-8496-0bcf1d7bb847/.tempmediaStorage/screenshot_desktop_details.png' });

    // Add item for desktop checkout
    await page.getByRole('button', { name: 'Comprar' }).click();
    await page.waitForTimeout(400);

    // 3. Desktop Checkout
    await page.goto('http://localhost:5173/checkout');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: '/Users/lia/.gemini/antigravity-ide/brain/a948781e-a012-4571-8496-0bcf1d7bb847/.tempmediaStorage/screenshot_desktop_checkout.png' });
  });
});
