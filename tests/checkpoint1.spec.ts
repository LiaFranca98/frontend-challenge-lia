import { test, expect } from '@playwright/test';

const SIZES = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

test.describe('Checkpoint 1: Catálogo, Detalhe e Carrinho', () => {
  for (const size of SIZES) {
    test(`captura screenshots para ${size.name}`, async ({ page }) => {
      await page.setViewportSize({ width: size.width, height: size.height });
      
      // 1. Catálogo
      await page.goto('/');
      // Aguardar carregamento dos mocks MSW e React Query
      await page.waitForSelector('text=Emerald Ape', { state: 'visible' });
      
      // Screenshot catálogo
      await page.screenshot({ 
        path: `/Users/lia/.gemini/antigravity-ide/brain/a948781e-a012-4571-8496-0bcf1d7bb847/scratch/catalog-${size.name}.png`,
        fullPage: true 
      });

      // Validar persistência na URL e paginação
      const desktopFilterInput = page.locator('form').getByPlaceholder('Buscar colecionáveis...');
      const mobileFilterInput = page.locator('form').getByPlaceholder('Explorar coleções');
      
      if (await desktopFilterInput.isVisible()) {
        await desktopFilterInput.fill('Emerald');
        await page.locator('form').getByRole('button', { name: 'IR' }).click();
        await page.waitForURL('**/?q=Emerald*');
        await page.waitForSelector('text=Emerald Ape', { state: 'visible' });
        
        await page.screenshot({ 
          path: `/Users/lia/.gemini/antigravity-ide/brain/a948781e-a012-4571-8496-0bcf1d7bb847/scratch/catalog-filtered-${size.name}.png`,
          fullPage: true 
        });

        // Limpar filtros para voltar
        await page.getByRole('button', { name: 'Limpar Filtros' }).click();
        await page.waitForURL('**/?page=1');
      } else if (await mobileFilterInput.isVisible()) {
        // Mobile search: just fill and submit (press Enter)
        await mobileFilterInput.fill('Emerald');
        await mobileFilterInput.press('Enter');
        await page.waitForURL('**/?q=Emerald*');
        await page.waitForSelector('text=Emerald Ape', { state: 'visible' });
        
        await page.screenshot({ 
          path: `/Users/lia/.gemini/antigravity-ide/brain/a948781e-a012-4571-8496-0bcf1d7bb847/scratch/catalog-filtered-${size.name}.png`,
          fullPage: true 
        });
        
        // Navigate back to clear
        await page.goto('/');
        await page.waitForSelector('text=Emerald Ape', { state: 'visible' });
      }

      // 2. Navegar para detalhe
      await page.goto('/');
      await page.waitForSelector('text=Emerald Ape', { state: 'visible' });
      await page.getByText('Emerald Ape').first().click();
      await page.waitForURL('**/nfts/nft-1');
      await page.waitForSelector('text=Comprar', { state: 'visible' });

      await page.screenshot({ 
        path: `/Users/lia/.gemini/antigravity-ide/brain/a948781e-a012-4571-8496-0bcf1d7bb847/scratch/detail-${size.name}.png`,
        fullPage: true 
      });

      // 3. Adicionar ao carrinho
      await page.getByRole('button', { name: 'Comprar' }).click();
      
      // O Header tem o contador no ícone de carrinho
      // Devemos esperar o MSW responder (isAdding -> Carrinho (1))
      await expect(page.locator('header').getByText('1')).toBeVisible();

      await page.screenshot({ 
        path: `/Users/lia/.gemini/antigravity-ide/brain/a948781e-a012-4571-8496-0bcf1d7bb847/scratch/detail-added-cart-${size.name}.png`,
        fullPage: true 
      });
    });
  }
});
