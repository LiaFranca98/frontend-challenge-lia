import { test, expect } from '@playwright/test';

test.describe('Authenticated Checkout Flow', () => {
  test('authenticates and completes checkout', async ({ page }) => {
    // 1. Go to Login
    await page.goto('/login');
    await page.fill('input[type="email"]', 'demo@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.locator('main').getByRole('button', { name: 'Entrar' }).click();
    
    // Wait for redirect to home
    await page.waitForURL('**/');
    
    // 2. Go to NFT detail
    await page.getByRole('link', { name: /Emerald Ape #042/i }).first().click();
    await page.waitForURL('**/nfts/*');
    await page.getByRole('button', { name: 'Comprar' }).click();
    
    // 3. Open Cart and Proceed to Checkout
    await page.locator('header').locator('button').filter({ hasText: '1' }).click();
    await page.locator('text=Finalizar Compra').click();
    
    // 4. In Checkout, verify UI
    await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible();
    
    // 5. Submit Order
    await page.getByRole('button', { name: 'Confirmar Compra' }).click();
    
    // 6. Confirm success
    await expect(page.getByText('Compra Confirmada!')).toBeVisible();
  });
});
