import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test.describe('Checkout Flow', () => {
  test('completes a guest checkout', async ({ page }) => {
    // Navigate to catalog
    await page.goto('/');
    await page.waitForSelector('text=Emerald Ape', { state: 'visible' });

    // Go to detail page and add to cart
    await page.getByRole('link', { name: /Emerald Ape #042/i }).first().click();
    await page.waitForURL('**/nfts/*');
    await page.getByRole('button', { name: 'Comprar' }).click();

    // Verify cart count updated (Header)
    await expect(page.locator('header').getByText('1')).toBeVisible();

    // Open Cart Drawer
    await page.locator('header').locator('button').filter({ hasText: '1' }).click();

    // Verify drawer is open and item is there
    await expect(page.getByRole('heading', { name: 'Seu Carrinho' })).toBeVisible();
    await expect(page.locator('h3', { hasText: 'Emerald Ape #042' }).first()).toBeVisible();

    // Go to checkout

    await page.locator('text=Finalizar Compra').click();
    await page.waitForURL('**/checkout');

    // Verify checkout page
    // Verify checkout page
    await expect(page.getByRole('heading', { name: 'Perfil do colecionador' })).toBeVisible();
    await expect(page.getByText('Emerald Ape')).toBeVisible();

    // Confirm purchase
    await page.getByRole('button', { name: 'Confirmar compra' }).click();

    // Wait for success screen
    await expect(page.getByText('Seus NFTs agora estão na sua carteira')).toBeVisible();
  });
});
