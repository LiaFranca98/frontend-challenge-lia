import { test, expect } from '@playwright/test';

test.describe('Advanced Flows', () => {


  test('Auth - Validação e Sessão Falha', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[type="email"]', 'wrong@email.com');
    await page.fill('input[type="password"]', '123');
    await page.locator('form').getByRole('button', { name: 'Entrar' }).click();

    await expect(page.getByText('Invalid credentials')).toBeVisible();

    // Signup first time to create the user
    await page.getByRole('button', { name: 'Criar conta' }).first().click();
    await page.fill('input[placeholder="Seu nome"]', 'Jane Doe');
    await page.fill('input[type="email"]', 'duplicate@example.com');
    await page.fill('input[type="password"]', 'pass');
    await page.locator('form').getByRole('button', { name: 'Criar conta' }).click();
    
    // Wait for redirect to home
    await page.waitForURL('**/');
    
    // Go back to login and try signing up with same email
    await page.goto('/login');
    await page.getByRole('button', { name: 'Criar conta' }).first().click();
    await page.fill('input[placeholder="Seu nome"]', 'Jane Doe');
    await page.fill('input[type="email"]', 'duplicate@example.com');
    await page.fill('input[type="password"]', 'pass');
    await page.locator('form').getByRole('button', { name: 'Criar conta' }).click();
    await expect(page.getByText('Email already in use')).toBeVisible();
  });

  test('Checkout - Simula falha 500 no backend', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[type="email"]', 'demo@example.com');
    await page.fill('input[type="password"]', 'pass');
    await page.locator('form').getByRole('button', { name: 'Entrar' }).click();
    await page.waitForURL('**/');

    // Add to cart
    await page.getByRole('link', { name: /Emerald Ape #042/i }).first().click();
    await page.waitForURL('**/nfts/*');
    await page.getByRole('button', { name: 'Comprar' }).click();

    // Trigger 500 error
    await page.evaluate(() => localStorage.setItem('simulate-error', '500'));

    await page.locator('header').locator('button').filter({ hasText: '1' }).click();
    // Wait for cart drawer items to load
    await page.waitForSelector('text=Emerald Ape #042', { state: 'visible', timeout: 10000 });
    await page.getByText('Conectar e finalizar').click();
    await page.waitForURL('**/checkout');

    await page.getByRole('button', { name: 'Confirmar compra' }).click();

    // Await error state on UI
    await expect(page.getByText(/Erro|Internal Server Error/i)).toBeVisible({ timeout: 15000 });
  });

  test('Busca e Histórico - Filtros e restauração pela URL', async ({ page }) => {
    await page.goto('/');
    
    // Fill search using the desktop sidebar input
    const searchInput = page.getByPlaceholder(/Buscar colecionáveis/i);
    await searchInput.fill('Emerald');
    
    // Submit the search form
    await page.locator('form').getByRole('button', { name: 'IR' }).click();
    
    // Wait for the query to execute and URL to update
    await page.waitForURL('**/?q=Emerald*');
    
    // Assert Emerald is visible
    await expect(page.getByText('Emerald Ape #042')).toBeVisible();
    
    // Navigate to a detail page
    await page.getByRole('link', { name: /Emerald Ape #042/i }).first().click();
    await page.waitForURL('**/nfts/*');
    
    // Go back and check if filters are restored
    await page.goBack();
    await page.waitForURL('**/?q=Emerald*');
    await expect(searchInput).toHaveValue('Emerald');
  });

  test('Carrinho e Cupons - Falha no cupom e persistência', async ({ page }) => {
    // We don't have to login just to add to cart
    await page.goto('/');
    await page.getByRole('link', { name: /Emerald Ape #042/i }).first().click();
    await page.getByRole('button', { name: 'Comprar' }).click();

    // Reload page to test persistence
    await page.reload();
    await page.waitForSelector('text=Emerald Ape', { state: 'visible' });
    await page.locator('header').locator('button').filter({ hasText: /\d/ }).click();
    // Wait for cart items to load from MSW
    await page.waitForSelector('text=Emerald Ape #042', { state: 'visible', timeout: 10000 });
    await page.getByText('Conectar e finalizar').click();
    await page.waitForURL('**/checkout');

    // Try invalid coupon
    const couponInput = page.getByPlaceholder(/código promocional/i);
    await couponInput.fill('INVALID');
    await page.getByRole('button', { name: 'Aplicar' }).click();
    
    // We expect the MSW to return 'Cupom inválido' and the UI to show it
    await expect(page.getByText('Cupom inválido')).toBeVisible();
  });

  test('Checkout - Pagamento Recusado e Timeout', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[type="email"]', 'demo@example.com');
    await page.fill('input[type="password"]', 'pass');
    await page.locator('form').getByRole('button', { name: 'Entrar' }).click();
    await page.waitForURL('**/');

    await page.getByRole('link', { name: /Emerald Ape #042/i }).first().click();
    await page.getByRole('button', { name: 'Comprar' }).click();

    // Set timeout
    await page.evaluate(() => localStorage.setItem('simulate-error', 'timeout'));
    await page.locator('header').locator('button').filter({ hasText: /\d/ }).click();
    // Wait for cart drawer items to load
    await page.waitForSelector('text=Emerald Ape #042', { state: 'visible', timeout: 10000 });
    await page.getByText('Conectar e finalizar').click();
    await page.waitForURL('**/checkout');
    
    await page.getByRole('button', { name: 'Confirmar compra' }).click();
    await expect(page.getByText(/Erro|Timeout|Gateway/i)).toBeVisible({ timeout: 15000 });

    // Set payment declined
    await page.evaluate(() => localStorage.setItem('simulate-error', 'payment_declined'));
    await page.getByRole('button', { name: 'Confirmar compra' }).click();
    
    // UI should show some error or redirect to a failed state. For now we just expect an error.
    await expect(page.getByText(/Erro|refused|Pagamento recusado/i)).toBeVisible({ timeout: 15000 });
  });

});
