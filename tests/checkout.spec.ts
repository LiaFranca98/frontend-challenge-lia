import { test, expect } from '@playwright/test';

test.describe('Checkout Flow', () => {
  test('completes a guest checkout', async ({ page }) => {
    // Navigate to catalog
    await page.goto('/');
    await page.waitForSelector('text=Midnight Blossom', { state: 'visible' });

    // Go to detail
    await page.getByText('Midnight Blossom').first().click();
    await page.waitForURL('**/nfts/nft-6');
    
    // Add to cart
    await page.getByRole('button', { name: 'Comprar' }).click();

    // Verify cart count updated (Header)
    await expect(page.locator('header').getByText('1')).toBeVisible();

    // Open Cart Drawer
    await page.locator('header').locator('button').filter({ hasText: '1' }).click();

    // Verify drawer is open and item is there
    await expect(page.getByText('Seu Carrinho')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Midnight Blossom' })).toBeVisible();

    // Go to checkout
    await page.getByRole('button', { name: 'Finalizar Compra' }).click();
    await page.waitForURL('**/checkout');

    // Verify checkout page
    await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible();
    await expect(page.getByText('Midnight Blossom')).toBeVisible();

    // Confirm purchase
    await page.getByRole('button', { name: 'Confirmar Compra' }).click();

    // Wait for success screen
    await expect(page.getByText('Compra Confirmada!')).toBeVisible();
  });
});
