# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout.spec.ts >> Checkout Flow >> completes a guest checkout
- Location: tests/checkout.spec.ts:5:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Emerald Ape')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText('Emerald Ape') with timeout 5000ms
  - waiting for getByText('Emerald Ape')

```

```yaml
- banner:
  - link "Kurio":
    - /url: /
  - navigation:
    - link "Início":
      - /url: /
    - link "Mercado":
      - /url: /
    - link "Criadores":
      - /url: /
    - link "Aprenda":
      - /url: /
  - button "Buscar"
  - button "1 Carrinho"
  - link "Entrar":
    - /url: /login
    - button "Entrar"
- main:
  - heading "Checkout" [level=1]
  - heading "Itens do Pedido" [level=2]
  - heading "Informações de Pagamento" [level=2]
  - heading "Comprando como Visitante" [level=3]
  - paragraph: Para associar os NFTs à sua conta, recomendamos fazer login antes de finalizar a compra.
  - button "Fazer Login"
  - heading "Resumo" [level=2]
  - text: Subtotal (1 itens) 0.00 ETH Taxa da Rede (Gás) 0.005 ETH Total 0.005 ETH
  - button "Confirmar Compra"
- contentinfo:
  - text: W
  - heading "Segurança da carteira" [level=4]
  - paragraph: Proteja sua carteira e colecione arte digital verificada com confiança.
  - text: C
  - heading "Criadores em destaque" [level=4]
  - paragraph: Conheça artistas, estúdios e comunidades que moldam a cultura digital na rede.
  - text: D
  - heading "Alertas de lançamentos" [level=4]
  - paragraph: Receba calendários de cunhagem, novidades de listas de acesso e análises do mercado.
  - heading "Antecipe-se ao próximo lançamento" [level=4]
  - textbox "digite seu e-mail..."
  - button "Enviar"
  - paragraph: Receba lançamentos selecionados, histórias de criadores e novidades do mercado.
  - text: KURIO Feito para colecionadores, criadores e cultura contato@email.com +55 11 4002 8922
  - heading "Meu perfil" [level=4]
  - list:
    - listitem:
      - link "Meu perfil":
        - /url: /
    - listitem:
      - link "Minha coleção":
        - /url: /
    - listitem:
      - link "Atividade":
        - /url: /
    - listitem:
      - link "Estúdio do criador":
        - /url: /
    - listitem:
      - link "Lista de interesse":
        - /url: /
  - heading "Central de ajuda" [level=4]
  - list:
    - listitem:
      - link "Central de ajuda":
        - /url: /
    - listitem:
      - link "Como comprar NFTs":
        - /url: /
    - listitem:
      - link "Carteira e segurança":
        - /url: /
    - listitem:
      - link "Política do mercado":
        - /url: /
    - listitem:
      - link "Denunciar item":
        - /url: /
  - heading "Coleções" [level=4]
  - list:
    - listitem:
      - link "Arte digital":
        - /url: /
    - listitem:
      - link "Fotografia":
        - /url: /
    - listitem:
      - link "Música":
        - /url: /
    - listitem:
      - link "Arte 3D":
        - /url: /
    - listitem:
      - link "Utilidade":
        - /url: /
  - heading "Redes sociais" [level=4]
  - img
  - img
  - img
  - img
  - img
  - heading "Carteiras compatíveis" [level=4]
  - text: UNISWAP MULTICHAIN CARDANO © 2026 Kurio. Propriedade digital para todos.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import * as fs from 'fs';
  3  | 
  4  | test.describe('Checkout Flow', () => {
  5  |   test('completes a guest checkout', async ({ page }) => {
  6  |     // Navigate to catalog
  7  |     await page.goto('/');
  8  |     await page.waitForSelector('text=Emerald Ape', { state: 'visible' });
  9  | 
  10 |     // Go to detail page and add to cart
  11 |     await page.getByRole('link', { name: /Emerald Ape #042/i }).first().click();
  12 |     await page.waitForURL('**/nfts/*');
  13 |     await page.getByRole('button', { name: 'Comprar' }).click();
  14 | 
  15 |     // Verify cart count updated (Header)
  16 |     await expect(page.locator('header').getByText('1')).toBeVisible();
  17 | 
  18 |     // Open Cart Drawer
  19 |     await page.locator('header').locator('button').filter({ hasText: '1' }).click();
  20 | 
  21 |     // Verify drawer is open and item is there
  22 |     await expect(page.getByRole('heading', { name: 'Seu Carrinho' })).toBeVisible();
  23 |     await expect(page.locator('h3', { hasText: 'Emerald Ape #042' }).first()).toBeVisible();
  24 | 
  25 |     // Go to checkout
  26 | 
  27 |     await page.locator('text=Finalizar Compra').click();
  28 |     await page.waitForURL('**/checkout');
  29 | 
  30 |     // Verify checkout page
  31 |     await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible();
> 32 |     await expect(page.getByText('Emerald Ape')).toBeVisible();
     |                                                 ^ Error: expect(locator).toBeVisible() failed
  33 | 
  34 |     // Confirm purchase
  35 |     await page.getByRole('button', { name: 'Confirmar Compra' }).click();
  36 | 
  37 |     // Wait for success screen
  38 |     await expect(page.getByText('Compra Confirmada!')).toBeVisible();
  39 |   });
  40 | });
  41 | 
```